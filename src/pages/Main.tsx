import React, { useEffect, useState } from "react";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import CustomButton from "../components/CustomButton";
import { GoSettings } from "react-icons/go";
import "./Main.css";
import SettingsPannel from "../components/SettingsPanel";
import CustomTable from "../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { AppActions } from "../store/AppSlice";
import { RootState } from "../store/store";
import { columnsObject } from "../components/Columns";
import { useSearchParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";

const Main = () => {
  const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams({
    startDate: "2021-06-01",
    endDate: "2021-06-10",
  });

  const selectedMetrics = useSelector(
    (state: RootState) => state.metric.selectedMetrics
  );
  const metrics = useSelector((state: RootState) => state.metric.metrics);

  const columns = metrics.map((item: string) => {
    if (selectedMetrics.includes(item)) {
      return columnsObject[item];
    }
    return null;
  });

  const onDateRangeChange = (value: any) => {
    const start = new Date(value[0]).toLocaleDateString().split("/");
    const end = new Date(value[1]).toLocaleDateString().split("/");
    const startDate = `${start[2]}-${
      start[0].length > 1 ? start[0] : "0" + start[0]
    }-${start[1].length > 1 ? start[1] : "0" + start[1]}`;
    const endDate = `${end[2]}-${end[0].length > 1 ? end[0] : "0" + end[0]}-${
      end[1].length > 1 ? end[1] : "0" + end[1]
    }`;

    setSearchParams({ startDate, endDate });
  };

  const url = `https://go-dev.greedygame.com/v3/dummy/report?startDate=${searchParams.get(
    "startDate"
  )}&endDate=${searchParams.get("endDate")}`;

  useEffect(() => {
    fetch("https://go-dev.greedygame.com/v3/dummy/apps", {
      method: "GET",
    })
      .then((res) => {
        res.json().then((data) => {
          // console.log(data);
          dispatch(AppActions.saveAllApps(data ?? []));
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch]);

  const { status, data, error } = useApi(url);

  if (status === "FETCHING") {
    return <div>Loading...</div>;
  } else if (status === "FETCHED") {
    setLoading(false);
  } else if (status === "FETCH_ERROR") {
    setLoading(false);
    console.log(error);
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="main">
      <h4 className="heading">Analytics</h4>
      <div className="top_buttons">
        <CustomDateRangePicker
          onChange={onDateRangeChange}
          searchParams={searchParams}
        />
        <CustomButton
          label="Settings"
          icon={GoSettings}
          type="primary"
          onClick={toggleSettings}
        />
      </div>
      {showSettings && (
        <SettingsPannel
          toggelSettings={toggleSettings}
          showSettings={showSettings}
        />
      )}
      {data.data && (
        <CustomTable data={data.data} columns={columns} loading={loading} />
      )}
    </div>
  );
};

export default Main;
