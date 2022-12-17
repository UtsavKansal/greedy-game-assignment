import React from "react";
import FilterComponent from "./FilterComponent";

export type columnType = {
  name: string;
  filterRender?: (
    setFilterValue: (value: { min: number; max: number }, col: string) => void,
    filterValue: { min: number; max: number },
    sortHandler: (col: string) => void
  ) => React.ReactNode;
  value: string;
  render: (item: any, value: string, appData: any) => React.ReactNode;
  filterValue?: {
    max: number;
    min: number;
  };
};

export type columnsObjectType = {
  [key: string]: columnType;
};

export const columnsObject: columnsObjectType = {
  date: {
    name: "Date",
    value: "date",
    render: (item, value, appData) => {
      const date = new Date(item[value]);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  app_id: {
    name: "App",
    value: "app_id",
    render: (item, value, appData) => {
      return appData?.find((app: any) => app.app_id === item.app_id)?.app_name;
    },
  },
  requests: {
    name: "Requests",
    value: "requests",
    render: (item, value, appData) => {
      return item[value]?.toLocaleString("en-US");
    },
    filterValue: {
      max: 1200000,
      min: 1000000,
    },
    filterRender: (setFilterValue, filterValue, sortHandler) => {
      return (
        <FilterComponent
          range={[1000000, 1200000]}
          setFilterValue={(min, max) => {
            setFilterValue({ min: min, max: max }, "requests");
          }}
          filterValue={{ min: filterValue.min, max: filterValue.max }}
          sortHandler={() => {
            sortHandler("requests");
          }}
        />
      );
    },
  },
  responses: {
    name: "Responses",
    value: "responses",
    render: (item, value, appData) => {
      return item[value]?.toLocaleString("en-US");
    },
    filterValue: {
      max: 1200000,
      min: 1000000,
    },
    filterRender: (setFilterValue, filterValue, sortHandler) => {
      return (
        <FilterComponent
          range={[1000000, 1200000]}
          setFilterValue={(min, max) => {
            setFilterValue({ min: min, max: max }, "responses");
          }}
          filterValue={{ min: filterValue.min, max: filterValue.max }}
          sortHandler={() => {
            sortHandler("responses");
          }}
        />
      );
    },
  },
  impressions: {
    name: "Impressions",
    value: "impressions",
    render: (item, value, appData) => {
      return item[value]?.toLocaleString("en-US");
    },
    filterValue: {
      max: 1200000,
      min: 1000000,
    },
    filterRender: (setFilterValue, filterValue, sortHandler) => {
      return (
        <FilterComponent
          range={[1000000, 1200000]}
          setFilterValue={(min, max) => {
            setFilterValue({ min: min, max: max }, "impressions");
          }}
          filterValue={{ min: filterValue.min, max: filterValue.max }}
          sortHandler={() => {
            sortHandler("impressions");
          }}
        />
      );
    },
  },
  clicks: {
    name: "Clicks",
    value: "clicks",
    render: (item, value, appData) => {
      return item[value]?.toLocaleString("en-US");
    },
    filterValue: {
      max: 1200000,
      min: 1000000,
    },
    filterRender: (setFilterValue, filterValue, sortHandler) => {
      return (
        <FilterComponent
          range={[1000000, 1200000]}
          setFilterValue={(min, max) => {
            setFilterValue({ min: min, max: max }, "clicks");
          }}
          filterValue={{ min: filterValue.min, max: filterValue.max }}
          sortHandler={() => {
            sortHandler("clicks");
          }}
        />
      );
    },
  },
  revenue: {
    name: "Revenue",
    value: "revenue",
    render: (item, value, appData) => {
      return item[value]?.toLocaleString("en-US");
    },
    filterValue: {
      max: 1000,
      min: 0,
    },
    filterRender: (setFilterValue, filterValue, sortHandler) => {
      return (
        <FilterComponent
          range={[0, 1000]}
          setFilterValue={(min, max) => {
            setFilterValue({ min: min, max: max }, "revenue");
          }}
          filterValue={{ min: filterValue.min, max: filterValue.max }}
          sortHandler={() => {
            sortHandler("revenue");
          }}
        />
      );
    },
  },
  fill_rate: {
    name: "Fill Rate",
    value: "fill_rate",
    render: (item, value, appData) => {
      return ((item.responses / item.requests) * 100).toFixed(2) + "%";
    },
    filterValue: {
      max: 1000,
      min: 0,
    },
    filterRender: (setFilterValue, filterValue, sortHandler) => {
      return (
        <FilterComponent
          range={[0, 1000]}
          setFilterValue={(min, max) => {
            setFilterValue({ min: min, max: max }, "fill_rate");
          }}
          filterValue={{ min: filterValue.min, max: filterValue.max }}
          sortHandler={() => {
            sortHandler("fill_rate");
          }}
        />
      );
    },
  },
  ctr: {
    name: "CTR",
    value: "ctr",
    render: (item, value, appData) => {
      return ((item.clicks / item.impressions) * 100).toFixed(2) + "%";
    },
    filterValue: {
      max: 1000,
      min: 0,
    },
    filterRender: (setFilterValue, filterValue, sortHandler) => {
      return (
        <FilterComponent
          range={[0, 1000]}
          setFilterValue={(min, max) => {
            setFilterValue({ min: min, max: max }, "ctr");
          }}
          filterValue={{ min: filterValue.min, max: filterValue.max }}
          sortHandler={() => {
            sortHandler("ctr");
          }}
        />
      );
    },
  },
};
