import React from "react";

export const PaertnersBannerImage = ({ bannerImage, title }) => {
  return (
    <div className={"base-banner-image"}>
      <img
        alt="banner-image"
        src={
          bannerImage.childImageSharp
            ? bannerImage.childImageSharp.fluid.src
            : bannerImage
        }
        width={"100%"}
        className="banner-image"
      />
      <div className={"slider-content"}>
        <div className="title">{title}</div>
      </div>
    </div>
  );
};

export default PaertnersBannerImage;
