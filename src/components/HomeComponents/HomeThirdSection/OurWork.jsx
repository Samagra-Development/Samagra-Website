import React from "react";
import OurWorkCard from "./OurWorkCard";

function OurWorkSection({workContent, isMobile}) {
  return (
    <>
      <div
        style={{
          backgroundColor: "#F2E5CA",
          padding: "24px 0",
          marginBottom: "55px",
        }}
      >
        <div className="section-heading">Our Work</div>
        <div className="section-description">{workContent?.ourWorkDescription}</div>
        <div style={{ width: "100%", display: "flex",flexWrap:"wrap" ,justifyContent:"space-around",
        }}>
            <OurWorkCard
            marginTop={"0px"}
            marginBottom={"20px"}
              data={workContent?.ourWork[0]}
                isMobile={isMobile}
            />
            <OurWorkCard
               marginTop={"80px"}
               marginBottom={"0px"}
              data={workContent?.ourWork[1]}
              isMobile={isMobile}
            />
            <OurWorkCard
             marginTop={"0px"}
             marginBottom={"20px"}
              data={workContent?.ourWork[2]}
              isMobile={isMobile}
            />
            <OurWorkCard
               marginTop={"80px"}
               marginBottom={"20px"}
              data={workContent?.ourWork[3]}
              isMobile={isMobile}
            />
        </div>
      </div>
    </>
  );
}

export default OurWorkSection;
