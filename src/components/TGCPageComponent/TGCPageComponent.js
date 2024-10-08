import React from "react";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";

const TGCPageComponent = ({ content, fromTGC }) => {
  return (
    <div className={"container career-section-second"}>
      <div className="row">
        <div className="col-11 mx-auto">
          <div
            className={
              "mt-4 py-5 text-justify f-24 color-text-primary main-text"
            }
          >
            {content.mainContent.map((c) => {
              return <p>{c.text}</p>;
            })}
          </div>
          {fromTGC ? (
            <div className={" text-center f-24 color-text-primary main-text"}>
              {/* <p>
                                {content.textAboveButton}
                            </p> */}
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
                text={content.buttonText}
              />
            </div>
          )}

          {
            <div
              className={"fw-600 philosophy-title text-center mt-5 pt-4 mb-5"}
            >
              {!fromTGC ? "People Philosophy" : " "}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default TGCPageComponent;
