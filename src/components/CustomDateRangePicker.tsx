import React from "react";
import { DateRangePicker } from "rsuite";

import { URLSearchParams } from "url";

import "./CustomDateRangePicker.css";
interface CustomDateRangePickerProps {
  onChange?: (value: any) => void;
  searchParams?: URLSearchParams;
}

const CustomDateRangePicker = ({
  onChange,
  searchParams,
}: CustomDateRangePickerProps) => {
  const startDate = new Date(searchParams?.get("startDate") || "2021-06-01");
  const endDate = new Date(searchParams?.get("endDate") || "2021-06-10");
  return (
    <DateRangePicker
      placeholder="Select Date Range"
      defaultValue={[new Date("2021-06-01"), new Date("2021-06-10")]}
      value={[startDate, endDate]}
      onChange={onChange}
      character=" - "
      format="MMM dd, yyyy"
      size="md"
    />
  );
};

export default CustomDateRangePicker;
