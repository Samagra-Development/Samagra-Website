import React, { useState } from "react";

export const OurImpactSection = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div className="home-news-section-wrapper our-impact-section-wrapper container" style={{ paddingTop: "50px" }}>
      {data.length ? (
        <div className="title">Our Impact</div>
      ) : null}
      <div className="cards-section row">
        {data.map((impactItem, index) => {
          return (
            <a
              href={impactItem.link || ""}
              className="col-md-4 col-sm-6 col-xs-12"
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={`card-wrapper ${hoveredIndex === index ? "hovered" : ""}`}
                style={{ width: "100%" }}
                onMouseLeave={() => setHoveredIndex(-1)}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <div
                  className="image-section"
                  style={{
                    backgroundImage: `url(${
                      impactItem.image?.childImageSharp?.fluid?.src || ""
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="content-section">
                  <div className="heading">{impactItem.subTitle}</div>
                  <div className="timestamp">{impactItem.description}</div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
