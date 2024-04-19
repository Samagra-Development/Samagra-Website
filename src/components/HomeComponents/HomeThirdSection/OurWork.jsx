import React from "react";
import OurWorkCard from "./OurWorkCard";

function OurWorkSection({workContent}) {
  return (
    <>
      <div
        style={{
          backgroundColor: "#F2E5CA",
          padding: "72px 60px",
          marginBottom: "55px",
        }}
      >
        <div className="section-heading">Our Work</div>
        <div className="section-description">{workContent?.ourWorkDescription}</div>
        <div style={{ width: "100%", display: "flex", gap: "120px" }}>
          <div style={{ flex: 1 }}>
            <OurWorkCard
              marginTop={"84px"}
              marginBottom={"84px"}
              data={workContent?.ourWork[0]}
            />
            <OurWorkCard
              marginTop={"84px"}
              marginBottom={"84px"}
              data={workContent?.ourWork[1]}
            />
          </div>
          <div style={{ flex: 1 }}>
            <OurWorkCard
              marginTop={"180px"}
              marginBottom={"84px"}
              data={workContent?.ourWork[2]}
            />
            <OurWorkCard
              marginTop={"84px"}
              marginBottom={"0px"}
              data={workContent?.ourWork[3]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OurWorkSection;
