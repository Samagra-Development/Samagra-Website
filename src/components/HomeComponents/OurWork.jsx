import React, { useEffect, useState } from "react";
import OurWorkCard from "./OurWorkCard";
import LinkedIn from "../../img/linkedIn-icon.png"

function OurWorkSection({workContent, isMobile}) {
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
          backgroundColor: "#F2E5CA",
          padding: "9vh 7vw",
        }}
      ><div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
        <div className="section-heading blue-text text-center">{workContent?.ourWork?.title}</div>
      <div className="section-description text-center black-text-2">{workContent?.ourWork?.description}
      </div>
      </div>
        
        <div className="work-card-layout">
            <OurWorkCard
            marginTop={"0px"}
            marginBottom={"20px"}
              data={workContent?.ourWorkCard[0]}
                isMobile={isMobile}
            />
            <OurWorkCard
               marginTop={gridFlow?"0px":"11vh"}
               marginBottom={"20px"}
              data={workContent?.ourWorkCard[1]}
              isMobile={isMobile}
            />
            <OurWorkCard
             marginTop={"2vh"}
             marginBottom={"20px"}
              data={workContent?.ourWorkCard[2]}
              isMobile={isMobile}
            />
            <OurWorkCard
               marginTop={gridFlow?"0px":"11vh"}
               marginBottom={"20px"}
              data={workContent?.ourWorkCard[3]}
              isMobile={isMobile}
            />
        </div>
      </div>
      {workContent?.linkedInButtonActive &&
        <div style={{margin:"6.5vh",display:"flex", justifyContent:"center",alignItems:"center", flexDirection:"column",gap:"24px",textAlign:"center"}}><div className="section-description text-center black-text-2">For the latest updates related to our work</div>
      <button className="linkedin-button"
      onClick={()=>{
        window.location.href="https://www.linkedin.com/company/samagra-transforming-governance/"
      }}><img className="linkedin-icon" src={LinkedIn} alt="linkedIn"/><span className="linkedin-button-text" style={{color:"#ffffff"}}>Follow us on LinkedIn</span></button></div>
    }
    </>
  );
}

export default OurWorkSection;
