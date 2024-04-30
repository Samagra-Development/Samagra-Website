import React from "react";

const OurMissionSection = ({data}) => {
  return (
    <>
      <div
        className={"home-top-gif"}
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
              <div className={`title`} >
                <div>{data?.baseBanner?.titleLines[0].text} </div>
                <div>{data?.baseBanner?.titleLines[1].text}</div>
              </div>
          </div>
        </div>
      </div>
      <div className='our-mission'>
        <div className="section-heading text-center blue-text">{data?.ourMission?.title}</div>
        <div className="section-description text-center blact-text-1">{data?.ourMission?.description}</div>
      </div>
    </>
  );
};

export default OurMissionSection;