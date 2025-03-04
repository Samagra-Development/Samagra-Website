import React from "react";

const service = {};
const CareerSectionThird = ({ content }) => {
  return (
    <div className={"container-fluid philosophy-section"}>
      <div className="row">
        <div className="col-md-6 px-0">
          <ImageCard
            styles={{ backgroundColor: "#343434" }}
            heading={content.philosophy.sectionOne.title}
            classes={"size-2-2"}
            imageUrl={content.philosophy.sectionOne.image}
            subHeading={content.philosophy.sectionOne.description}
          />
        </div>
        <div className="col-md-6 px-0">
          <ImageCard
            styles={{ backgroundColor: "rgba(52,52,52,0.49)" }}
            heading={content.philosophy.sectionTwo.title}
            classes={"size-2-1"}
            imageUrl={content.philosophy.sectionTwo.image}
            subHeading={content.philosophy.sectionTwo.description}
          />
          <ImageCard
            styles={{ backgroundColor: "rgba(52,52,52,0.76)" }}
            heading={content.philosophy.sectionThree.title}
            classes={"size-2-1"}
            imageUrl={content.philosophy.sectionThree.image}
            subHeading={content.philosophy.sectionThree.description}
          />
        </div>
        <div className="col-md-12 px-0">
          <ImageCard
            styles={{ backgroundColor: "rgba(52,52,52,0.85)" }}
            heading={content.philosophy.sectionFour.title}
            classes={"size-4-1"}
            imageUrl={content.philosophy.sectionFour.image}
            subHeading={content.philosophy.sectionFour.description}
          />
        </div>
      </div>
      <div style={{ marginTop: "100px" }}>
        <div className="fw-600 philosophy-title text-center">
          {content?.mainContent2?.title}
        </div>
        <div
          className="py-3 text-justify f-18 color-text-primary main-text mx-auto"
          style={{ maxWidth: "850px" }}
        >
          <p>
          {content?.mainContent2?.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerSectionThird;

const ImageCard = ({ imageUrl, heading, subHeading, classes, styles }) => {
  return (
    <div
      className={`${
        classes ? classes : ""
      } text-white p-5 w-100 d-flex flex-wrap`}
      style={{
        backgroundImage: `url(${
          !!imageUrl.childImageSharp
            ? imageUrl.childImageSharp.fluid.src
            : imageUrl
        })`,
        ...styles,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overlay-philosophy" />
      <div className="align-self-end philosophy-section-text">
        <div className={"f-24 fw-600 mb-3"}>{heading}</div>
        <div className={"f-18"}>{subHeading}</div>
      </div>
    </div>
  );
};
