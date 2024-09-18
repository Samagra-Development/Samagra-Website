import React from "react";
import { PrimaryButton } from "../../PrimaryButton/PrimaryButton";

const CareerSectionSecond = ({ content, fromC4GT }) => {
  return (
    <div className={"container career-section-second"}>
      <div className="row">
        <div className="col-11 mx-auto">
          <div
            className={
              "mt-4 py-4 text-justify f-18 color-text-primary main-text"
            }
          >
            {content.mainContent.map((c) => {
              return <p>{c.text}</p>;
            })}
          </div>
          {fromC4GT ? (
            <div
              className={" py-4 text-center f-18 color-text-primary main-text"}
            >
              <p>{content.textAboveButton}</p>
              <PrimaryButton
                classes={"py-3 text-uppercase"}
                click={() => {
                  window.open(content.link, "_blank");
                }}
                text={content.buttonText}
              />
            </div>
          ) : (
            <div className={"text-center mt-4"}>
              <PrimaryButton
                classes={"py-3 text-uppercase"}
                click={() => {
                  window.location.href = "/joinus";
                }}
                text={"Apply"}
              />
            </div>
          )}

          {
            <div className={"fw-600 philosophy-title text-center my-5"}>
              {!fromC4GT ? "People Philosophy" : " "}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CareerSectionSecond;
