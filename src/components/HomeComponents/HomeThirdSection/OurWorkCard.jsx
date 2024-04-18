import React, { useState } from "react";
import Agriculture from "../../../img/home-page/agriculture.png";

function OurWorkCard({ marginTop, marginBottom, data }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);
  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          borderRadius: "8px",
          height: "58.75rem",
          background: "#ffffff",
          padding: "24px",
          marginTop: marginTop,
          marginBottom: marginBottom,
        }}
      >
        {isFlipped ? (
          <div
            style={{
              borderRadius: "8px",
              border: "solid 4px #D09C0A",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "24px",
                backgroundImage: `url(${data.map})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                padding: "48px",
              }}
            >
              <img src={data.logo1} />
              {data.logo2 && <img src={data.logo2} />}
            </div>
            <div
              style={{
                fontSize: "30.5px",
                lineHeight: "38px",
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {data.description2}
            </div>
            <button
              style={{
                border: "solid 1px #D09C0A",
                borderRadius: "4px",
                padding: "8px",
                margin: "16px 0 8px 0",
                color: "#D09C0A",
                background: "none",
                width: "320px",
              }}
            >
              Learn More{data.logo2 ? "(Konnect)" : ""}
            </button>
            {data.logo2 && (
              <button
                style={{
                  border: "solid 1px #D09C0A",
                  borderRadius: "4px",
                  padding: "8px",
                  marginBottom: "8px",
                  color: "#D09C0A",
                  background: "none",
                  width: "320px",
                }}
              >
                Learn More(Leap)
              </button>
            )}
          </div>
        ) : (
          <div>
            <img src={data.image} alt="agri" style={{ width: "100%" }} />
          </div>
        )}

        <div style={{ padding: "24px 0" }}>
          <div
            style={{
              color: "#D09C0A",
              fontSize: "34px",
              fontWeight: "400",
              lineHeight: "64px",
            }}
          >
            {data.subHeading}
          </div>
          <div
            style={{
              color: "#D09C0A",
              fontSize: "56px",
              fontWeight: "500",
              lineHeight: "64px",
            }}
          >
            {data.heading}
          </div>
        </div>
        <div style={{ fontSize: "22px", lineHeight: "34px" }}>
          {data.description1}
        </div>
      </div>
    </>
  );
}

export default OurWorkCard;
