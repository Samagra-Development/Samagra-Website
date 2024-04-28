import React from 'react';
import whoWeAre from '../../img/home-page/who-we-are.png';
import whatWeDo from '../../img/home-page/what-we-do.png';

const OurModelSection = ({homeContent, isMobile}) =>{
  return (
    <div style={{paddingTop:"24px"}}>
    <div className='our-model-section'>
    <div className='section-heading'>{homeContent?.ourModel?.title}</div>
    <div className='animated-text' style={{display:"flex",flexDirection:isMobile ? "column" : "row", gap:"5vw", padding:"0 4vw"}}>
      <div className='model-sub-section'>
        <div><img src={whoWeAre} alt="Sticky Icon" /></div>
        <div>
          <div className='our-model-sub-heading'>{homeContent?.ourModel?.description[0]?.subTitle}</div>
          <div className='our-model-description'>{homeContent?.ourModel?.description[0]?.text}</div>
        </div>
      </div>
      <div className='model-sub-section'>
      <div><img src={whatWeDo} alt="Sticky Icon" /></div>
        <div>
          <div className='our-model-sub-heading'>{homeContent?.ourModel?.description[1]?.subTitle}</div>
          <div className='our-model-description'>{homeContent?.ourModel?.description[1]?.text}</div>
        </div>
      </div>
    </div>
    <div className={'image-section'} style={{padding:isMobile ?"0":"0 16vw"}}>
      <div className="image-background-section" style={{ border: !isMobile ? "solid rgba(208, 156, 10, 1) 4px" : "none", borderRadius:"19.26px"}}>
      <iframe
        className={'our-model-video'}
        src={homeContent?.ourModel?.ourModelVideoLink}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
     </div>
    </div>
  </div>
  </div>
  );
}

export default OurModelSection


