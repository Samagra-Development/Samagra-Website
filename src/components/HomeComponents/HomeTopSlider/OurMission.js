import React from "react";
import homeVideo from '../../../img/home_updated_video.mp4';

const OurMissionSection = ({data, isMobile}) => {
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
            <source src={data?.baseBannerVideo?.publicURL ? (data?.baseBannerVideo?.publicURL) : data?.baseBannerVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="translucent-dark-overlay" />
        <div className={"container"}>
          <div className={"slider-content"}>
            <div className={"left-text-section"}>
              <div className={`title visible`} >
                <div>{data?.baseBanner?.titleLines[0].text} </div>
                <div>{data?.baseBanner?.titleLines[1].text}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: "7vh" }}>
        <div className="section-heading">{data?.ourMission?.title}</div>
        <div className="section-description">{data?.ourMission?.description}</div>
      </div>
    </>
  );
};

export default OurMissionSection;