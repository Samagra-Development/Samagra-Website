import React from 'react';
import colorWheel from '../../img/home-page/color-wheel.png';
import colorWheel1 from '../../img/home-page/color-wheel1.png';
import colorWheel2 from '../../img/home-page/color-wheel2.png';

const OurApproachSection = ({homeContent, isMobile})=>{
    return (
        <div style={{position:"relative"}}>
            <div style={{padding:"12vh 0",textAlign:"center"}}>
            <div className='section-heading'>{homeContent?.ourApproach?.title}</div>
            <div className='section-description animated-text' style={{ padding:isMobile? "20px":"20px 200px", lineHeight:"160%"}}>{homeContent?.ourApproach?.description}</div>
            <div style={{ display:"flex", alignItems:"center",justifyContent:"center",width:"100%", paddingTop:"4vh"}}>
            <div style={{width:"43vw",height:"38vw"}}>
              <video
                autoPlay 
                muted 
                style={{
                  width: '100%',
                  backgrounColor: 'white',
                  height: '100%',
                }}
                >
                <source src={homeContent?.ourApproach?.approachVideo?.publicURL ? (homeContent?.ourApproach?.approachVideo?.publicURL) : homeContent?.ourApproach?.approachVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
    
        </div>
        </div>
      </div>
      {!isMobile && <><div style={{position:"absolute", top:"0",right:"0"}}><img src={colorWheel} alt='color-wheel'/></div>
      <div style={{position:"absolute", bottom:"0",left:"0"}}><img src={colorWheel1} alt='color-wheel'/></div>
      <div style={{position:"absolute", bottom:"0",right:"0"}}><img src={colorWheel2} alt='color-wheel'/></div></>}
      </div>
    );
}

export default OurApproachSection
