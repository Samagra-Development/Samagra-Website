import React, { useState } from "react";

function OurWorkCard({ marginTop, marginBottom, data, isMobile }) {
  const [isFlipped, setIsFlipped] = useState(false);

  console.log("hjhjjhjhj",data)

  const handleMouseEnter = () => setIsFlipped(()=>true);
  const handleMouseLeave = () => setIsFlipped(()=>false);
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
          height: isMobile ? "auto" :"910px",
          width: isMobile? "auto":"590px",
          background: "#ffffff",
          padding: "24px",
          marginTop: isMobile? "24px" :marginTop,
          marginBottom: isMobile? "24px": marginBottom,
        }}
      >
        {isFlipped ? (
          <div
            style={{
              borderRadius: "8px",
              minWidth:isMobile?"auto":"540px",
              minHeight:isMobile?"auto":"610px",
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
                backgroundImage: `url(${data?.backgroundMap?.childImageSharp?.fluid?.src ? (data?.backgroundMap?.childImageSharp?.fluid?.src) : data?.backgroundMap})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding:"32px",
                backgroundSize: "contain",
                justifyContent:"center",
                alignItems:"center"
              }}
            >
              <img width={data?.workLogo[1]?"35%":"70%"} src={data?.workLogo[0]?.logo?.childImageSharp?.fluid?.src ? (data?.workLogo[0]?.logo?.childImageSharp?.fluid?.src) : data?.workLogo[0]?.logo} />
              {data?.workLogo[1] && <img width={"45%"} src={data?.workLogo[1]?.logo?.childImageSharp?.fluid?.src ? (data?.workLogo[1]?.logo?.childImageSharp?.fluid?.src) : data?.workLogo[1]?.logo} />}
            </div>
            <div
            className="section-description"
              style={{
                lineHeight: isMobile?"24px":"38px",
                fontWeight: "400",
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
                width: "66%",
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
                  width: "66%",
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
            <img src={data?.image?.childImageSharp?.fluid?.src ? (data?.image?.childImageSharp?.fluid?.src) : data?.image} alt="agri" style={{ width: "100%" }} />
          </div>
        )}

        <div style={{ padding: "24px 0" }}>
          <div
            style={{
              color: "#D09C0A",
              fontWeight: "400",
              lineHeight: isMobile? "48px" : "56px",
              textAlign:"left",
              padding: "0"
            }}
            className="section-description"
          >
            {data?.titleLines[0]?.text}
          </div>
          <div
            style={{
              color: "#D09C0A",
              fontWeight: "500",
              lineHeight: isMobile? "48px":"56px",
              textAlign:"left",
              padding:"0"
            }}
            className="section-heading"
          >
            {data?.titleLines[1]?.text}
          </div>
        </div>
        <div style={{ fontSize: isMobile? "14px":"22px", lineHeight: isMobile?"22px":"34px" }}>
          {data?.description1}
        </div>
      </div>
    </>
  );
}

export default OurWorkCard;
