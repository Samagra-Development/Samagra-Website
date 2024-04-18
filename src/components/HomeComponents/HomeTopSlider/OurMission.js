import React from "react";
import homeVideo from '../../../img/home_updated_video.mp4';

const OurMissionSection = () => {
  return (
    <>
      <div
        className={"home-top-slider-wrapper home-page-font"}
        style={{ background: "#444444"}}
      >
        <div className="video-background">
          <video
            controls={false}
            muted
            autoplay="autoplay"
            loop={true}
            style={{
              width: "100%",
              backgroundImage: "linear-gradient(rgb(12,10,1), rgb(28,10,3))",
              height: "100vh",
            }}
            autoPlay={true}
          >
            <source src={homeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="translucent-dark-overlay" />
        <div className={"container"}>
          <div className={"slider-content"}>
            <div className={"left-text-section"}>
              <div className={`title visible`} >
                <div>Transforming </div>
                <div>Governance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: "81px" }}>
        <div className="section-heading">Our Mission</div>
        <div className="section-description">
          We are working to improve the quality of life of citizens through
          better governance
        </div>
      </div>
    </>
  );
};

export default OurMissionSection;