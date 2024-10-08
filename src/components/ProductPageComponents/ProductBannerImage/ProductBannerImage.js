import React from "react";

const service = {};
export const ProductBannerImage = ({ project }) => {
  return (
    <div
      className={"product-page-banner project-banner"}
      style={{
        height: "100vh",
        overflow: "hidden",
        maxHeight: "100vh",
        backgroundImage: `url(${
          !!(project.backgroundCover && project.backgroundCover.childImageSharp)
            ? project.backgroundCover.childImageSharp.fluid.src
            : project.backgroundCover
        })`,
      }}
    >
      <div className="dummy-header-background" />
      <div className="translucent-dark-overlay">
        <div className="banner-text">
          <div className={`project-name`}>
            <div className="text">{project.title}</div>
          </div>
          <div className="project-tag-line">
            <div className="text">{project.tagLine || ""}</div>
            <img
              src={
                !!project.projectLogoWithState.childImageSharp
                  ? project.projectLogoWithState.childImageSharp.fluid.src
                  : project.projectLogoWithState
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBannerImage;
