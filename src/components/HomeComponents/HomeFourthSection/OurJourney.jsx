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
          margin: "9.5vh 0"
        }}
      >
        <div className='section-heading'>Our Journey</div>
        <div style={{width:"100%",display:"grid", gridTemplateColumns: isMobile? "1fr":gridFlow?"1fr 1fr":"1fr 1fr 1fr", columnGap:"7.5vh",rowGap:"2.5vh",padding:"24px 124px 0"}}>
        {content?.ourJourney?.map((item,i)=>{
            return <div key={i} style={{marginTop:"24px",marginBottom:"24px",display:"flex",flexDirection:"column",gap:"8px"}}>
            <div><img src={item?.image?.childImageSharp ? (item?.image?.childImageSharp?.fluid?.src) : item?.image}/></div>
            <div style={{color:"#D09C0A",fontSize:"25px",lineHeight:"33px"}}>{item.subHeading}</div>
            <div style={{fontSize:"22px",lineHeight:"33px"}}>{item.description}</div>
        </div>
        })}
        </div>
        
      </div>
    </>
  );
}

export default OurJourneySection;
