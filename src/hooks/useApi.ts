import { useEffect, useRef, useReducer } from "react";
export const useApi = (api: string) => {
  const cacheData = useRef<any>({});
  const initialState: {
    status: string;
    error: any;
    data: any;
  } = {
    status: "idle",
    error: null,
    data: [],
  };
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" };
      case "FETCHED":
        return { ...initialState, status: "fetched", data: action.payload };
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload };
      default:
        return state;
    }
  }, initialState);
  useEffect(() => {
    let revokeRequest = false;
    if (!api || !api.trim()) return;
    const renderData = async () => {
      dispatch({ type: "FETCHING" });
      if (cacheData.current[api]) {
        const data = cacheData.current[api];
        dispatch({ type: "FETCHED", payload: data });
      } else {
        try {
          const res = await fetch(api, {
            method: "GET",
          });
          const data = await res.json();
          //   console.log("data", data);
          cacheData.current[api] = data;
          if (revokeRequest) return;
          dispatch({ type: "FETCHED", payload: data });
        } catch (error: any) {
          if (revokeRequest) return;
          dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
      }
    };
    renderData();
    return function cleanup() {
      revokeRequest = true;
    };
  }, [api]);
  return state;
};
