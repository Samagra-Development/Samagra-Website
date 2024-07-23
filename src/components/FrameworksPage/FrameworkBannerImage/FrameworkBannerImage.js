import React from "react";

const FrameworkBannerImage = ({ bannerContent }) => {
  return (
    <div className={"base-banner-image"}>
      <img
        alt="banner-image"
        src={
          bannerContent.bannerImage.childImageSharp
            ? bannerContent.bannerImage.childImageSharp.fluid.src
            : bannerContent.bannerImage
        }
        width={"100%"}
        className="banner-image"
      />
      <div className={"slider-content"}>
        <div className="title">{bannerContent.title}</div>
      </div>
    </div>
  );
};

export default FrameworkBannerImage;
