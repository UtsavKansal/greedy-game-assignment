import React from "react";
import NoDataImage from "../assets/images/undraw_no_data_qbuo.svg";
import "./NoData.css";

const NoData = () => {
  return (
    <div className="no_data">
      <img src={NoDataImage} alt="No Data" className="no_data_image" />
      <div className="no_data_text">
        <div className="no_data_text_title">
          Hey! Something’s off! We couldn’t display the given data.
        </div>
        <div className="no_data_text_subtitle">
          Try changing your your filters or selecting a different date.
        </div>
      </div>
    </div>
  );
};

export default NoData;
