import React, { useState } from "react";

function OurWorkCard({ marginTop, marginBottom, data }) {
  const [isFlipped, setIsFlipped] = useState(false);

  console.log("hjhjjhjhj",data)

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);
 const getProjectUrl = (projectName) => {
        if (!projectName) {
          return;
        }
        return '/project/' + projectName.replace(/ /g, '-').toLowerCase();
      };
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
                backgroundImage: `url(${data?.backgroundMap?.childImageSharp?.fluid?.src})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                padding: "48px",
              }}
            >
              <img src={data?.workLogo[0]?.logo?.childImageSharp?.fluid?.src} />
              {data?.workLogo[1] && <img src={data?.workLogo[1]?.logo?.childImageSharp?.fluid?.src} />}
            </div>
            <div
              style={{
                fontSize: "30.5px",
                lineHeight: "38px",
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {data?.description2}
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
              onClick={()=>{
                window.location.href= getProjectUrl(data?.projectName[0]?.project) 
              }}
            >
              Learn More{data?.workLogo[1] ? "(Konnect)" : ""}
            </button>
            {data?.workLogo[1] && (
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
                onClick={()=>{
                  window.location.href= getProjectUrl(data?.projectName[1]?.project) 
                }}
              >
                Learn More(Leap)
              </button>
            )}
          </div>
        ) : (
          <div>
            <img src={data?.image?.childImageSharp?.fluid?.src} alt="agri" style={{ width: "100%" }} />
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
            {data?.titleLines[0]?.text}
          </div>
          <div
            style={{
              color: "#D09C0A",
              fontSize: "56px",
              fontWeight: "500",
              lineHeight: "64px",
            }}
          >
            {data?.titleLines[1]?.text}
          </div>
        </div>
        <div style={{ fontSize: "22px", lineHeight: "34px" }}>
          {data?.description1}
        </div>
      </div>
    </>
  );
}

export default OurWorkCard;
