import React from "react";
import CustomButton from "./CustomButton";
// import Slider from "./Slider";
import "./FilterComponent.css";

import { RangeSlider } from "rsuite";

interface FilterComponentProps {
  range: number[];
  setFilterValue: (min: number, max: number) => void;
  filterValue: { min: number; max: number };
  sortHandler: () => void;
}

const FilterComponent = ({
  range,
  setFilterValue,
  filterValue,
  sortHandler,
}: FilterComponentProps) => {
  const [currentValue, setCurrentValue] = React.useState({
    min: filterValue.min,
    max: filterValue.max,
  });
  const filterHandler = () => {
    setFilterValue(currentValue.min, currentValue.max);
  };

  const onChangeHandler = (value: number[]) => {
    setCurrentValue({ min: value[0], max: value[1] });
  };

  return (
    <>
      <div className="slider_container">
        <RangeSlider
          defaultValue={[filterValue.min, filterValue.max]}
          min={range[0]}
          max={range[1]}
          renderMark={(mark) => {
            return mark;
          }}
          onChangeCommitted={onChangeHandler}
        />
      </div>
      <div className="button_container">
        <CustomButton label="Sort" type="secondary" onClick={sortHandler} />
        <CustomButton label="Filter" type="secondary" onClick={filterHandler} />
      </div>
    </>
  );
};

export default FilterComponent;
