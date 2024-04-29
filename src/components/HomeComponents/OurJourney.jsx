import React, { useEffect, useState } from "react";

function OurJourneySection({content}) {
  
  return (
    <>
      <div
        style={{
          margin: "7.5vh 0"
        }}
      >
        <div className='section-heading'>Our Journey</div>
        <div className="textFade template-column" style={{ columnGap:"6vw",rowGap:"5vh",padding:"48px 8.6vw 0"}}>
        {content?.ourJourney?.map((item,i)=>{
            return <div key={i} style={{display:"flex",flexDirection:"column",textAlign:"center"}}>
            <div style={{paddingBottom:"8px"}}><img src={item?.image?.childImageSharp ? (item?.image?.childImageSharp?.fluid?.src) : item?.image}/></div>
            <div className="our-model-sub-heading" style={{color:"#D09C0A"}}>{item.subHeading}</div>
            <div className="our-model-description">{item.description}</div>
        </div>
        })}
        </div>
        
      </div>
    </>
  );
}

export default OurJourneySection;
