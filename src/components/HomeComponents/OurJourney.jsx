import React, { useEffect, useState } from "react";

function OurJourneySection({content, isMobile}) {
  const [gridFlow, setGridFlow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setGridFlow(true);
      } else {
        setGridFlow(false);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <>
      <div
        style={{
          margin: "7.5vh 0"
        }}
      >
        <div className='section-heading'>Our Journey</div>
        <div className="textFade" style={{width:"100%",display:"grid", gridTemplateColumns: (!gridFlow)? "1fr 1fr 1fr":"1fr 1fr", columnGap:"6vw",rowGap:"5vh",padding:"48px 8.6vw 0"}}>
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
