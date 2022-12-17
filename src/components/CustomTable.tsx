import React, { useEffect } from "react";
import "./CustomTable.css";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "../store/store";

import { AiFillFilter } from "react-icons/ai";
import { columnType } from "./Columns";
import NoData from "./NoData";
import Loader from "rsuite/Loader";

interface CustomTableProps {
  columns: (columnType | null)[];
  data: any[];
  loading: boolean;
}

const CustomTable = ({ columns, data, loading }: CustomTableProps) => {
  const { data: appData } = useSelector((state: RootState) => state.app) ?? [];
  const [dataInstance, setDataInstance] = React.useState(data);
  const [columnInstance, setColumnInstance] = React.useState(columns);
  useEffect(() => {
    setColumnInstance(columns);
    setDataInstance(data);
  }, [columns, data]);

  // useEffect(() => {
  //   console.log(dataInstance);
  // }, [dataInstance]);

  const setFilterValue = (value: { min: number; max: number }, col: string) => {
    setColumnInstance((prev) => {
      const newColumn: any = [...prev];
      const index = newColumn.findIndex((item: any) => item?.value === col);
      if (index !== undefined && index !== -1) {
        newColumn[index] =
          {
            ...newColumn[index],
            filterValue: value,
          } || null;
      }
      return newColumn;
    });
  };
  const headerValue: { [key: string]: number } = {};

  columnInstance.forEach((item) => {
    if (item) {
      if (!(item.value === "app_id" || item.value === "date")) {
        if (item.value === "fill_rate") {
          headerValue[item.value] =
            dataInstance.reduce((acc: any, curr: any) => {
              return acc + (curr["responses"] / curr["requests"]) * 100;
            }, 0) / dataInstance.length;
        } else if (item.value === "ctr") {
          headerValue[item.value] =
            dataInstance.reduce((acc: any, curr: any) => {
              return acc + (curr["clicks"] / curr["impressions"]) * 100;
            }, 0) / dataInstance.length;
        } else {
          headerValue[item.value] = dataInstance.reduce(
            (acc: any, curr: any) => {
              return acc + curr[item.value];
            },
            0
          );
        }
      }
    }
  });

  useEffect(() => {
    const filteredData = data.filter((item: any) => {
      return columnInstance?.every((col: any) => {
        if (!col) return true;
        if (col.filterValue) {
          if (col.value === "fill_rate") {
            const fillRate = (item.responses / item.requests) * 100;
            return (
              fillRate >= col.filterValue.min && fillRate <= col.filterValue.max
            );
          }
          if (col.value === "ctr") {
            const ctr = (item.clicks / item.impressions) * 100;
            return ctr >= col.filterValue.min && ctr <= col.filterValue.max;
          }
          return (
            item[col.value] >= col.filterValue.min &&
            item[col.value] <= col.filterValue.max
          );
        }
        return true;
      });
    });

    setDataInstance(filteredData);
  }, [columnInstance, data]);

  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const onSort = (col: string) => {
    if (order === "asc") {
      const sortedData = dataInstance.sort((a: any, b: any) => {
        return a[col] > b[col] ? 1 : -1;
      });
      setDataInstance(sortedData);
      setOrder("desc");
    } else {
      const sortedData = dataInstance.sort((a: any, b: any) => {
        return a[col] < b[col] ? 1 : -1;
      });
      setDataInstance(sortedData);
      setOrder("asc");
    }
  };
  if (loading)
    return (
      <div className="loader">
        <Loader size="lg" />
      </div>
    );
  if (dataInstance.length === 0) return <NoData />;

  return (
    <table>
      <thead>
        <tr>
          {columnInstance?.map((item, index) => {
            if (!item) return null;
            return (
              <th key={index}>
                <div className="row_item">
                  <div className="dropdown">
                    <AiFillFilter className="filter_icon" />
                    {item.filterRender && item.filterValue && (
                      <div className="dropdown-content">
                        {item.filterRender(
                          setFilterValue,
                          item.filterValue,
                          onSort
                        )}
                      </div>
                    )}

                    <div className="header_title">
                      <div className="column_name">{item.name}</div>
                      <div>
                        {headerValue[item.value] &&
                          headerValue[item.value].toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {dataInstance?.map((item: any, index) => {
          return (
            <tr key={index} className="row">
              {columnInstance?.map((metric, index) => {
                if (metric) {
                  const render = metric.render(item, metric.value, appData);

                  return (
                    <td key={index}>
                      <div className="row_item">{render}</div>
                    </td>
                  );
                }
                return null;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomTable;
