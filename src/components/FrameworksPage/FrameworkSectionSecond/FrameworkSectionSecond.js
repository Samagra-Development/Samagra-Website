import React from "react";
import { PrimaryButton } from "../../PrimaryButton/PrimaryButton";

const FrameworkSectionSecond = ({ content }) => {
  return (
    <div className={"container career-section-second"}>
      <div className="row">
        <div className="col-11 mx-auto">
          <div className={"py-5 text-center f-24 color-text-primary main-text"}>
            {content.mainContent.map((c) => {
              return <p>{c.text}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworkSectionSecond;
