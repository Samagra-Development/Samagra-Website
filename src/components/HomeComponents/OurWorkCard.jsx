import React, { useEffect, useRef, useState } from "react";

function OurWorkCard({ marginTop, marginBottom, data, isMobile }) {
  const [isFlipped, setIsFlipped] = useState(false);

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
          borderRadius: "10px",
          height: isMobile ? "auto" :"842px",
          width: isMobile? "auto":"568px",
          background: "#ffffff",
          padding: "24px",
          marginTop: isMobile? "24px" :marginTop,
          marginBottom: isMobile? "24px": marginBottom,
        }}
      >
        {isFlipped ? (
          <div
            style={{
              borderRadius: "10px",
              width:isMobile?"auto":"520px",
              height:isMobile?"auto":"583px",
              border: "solid 4px #D09C0A",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
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
            className="our-model-sub-heading"
            style={{textAlign:"center",maxHeight:"188px",overflow:"hidden",fontSize:isMobile?"16px":"28px"}}
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
                fontWeight:"500",
                fontSize:isMobile?"12px":"20px"
              }}
              className="section-description"
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
                  fontWeight:"500",
                  fontSize:isMobile?"12px":"20px"
                }}
                className="section-description"
                onClick={()=>{
                  window.location.href= getProjectUrl(data?.projectName[1]?.project) 
                }}
              >
                Learn More(Leap)
              </button>
            )}
          </div>
        ) : (
          <div style={{
          minWidth:isMobile?"auto":"520px",
          minHeight:isMobile?"auto":"583px",}}>
            <img src={data?.image?.childImageSharp?.fluid?.src ? (data?.image?.childImageSharp?.fluid?.src) : data?.image} alt="agri" style={{ width:isMobile?"100%":"520px",
          height:isMobile?"auto":"583px",borderRadius: "10px" }} />
          </div>
        )}

        <div style={{ padding: "24px 0" }}>
          <div
            style={{
              color: "#D09C0A",
              fontWeight: "400",
              lineHeight: "160%",
              textAlign:"left",
              fontSize:isMobile?"14px":"20px",
              padding: "0"
            }}
            className="section-description"
          >
            {data?.titleLines[0]?.text}
          </div>
          <div
            style={{
              color: "#D09C0A",
              fontSize:isMobile?"30.5px":"35px",
              fontWeight: "700",
              lineHeight: "100%",
              textAlign:"left",
              padding:"0"
            }}
          >
            {data?.titleLines[1]?.text}
          </div>
        </div>
        <div className="section-description" style={{maxHeight:"100px", lineHeight:"160%",textAlign:"start",overflow:"hidden" ,fontSize:isMobile?"14px":"20px"}}>
          {data?.description1}
        </div>
      </div>
    </>
  );
}

export default OurWorkCard;
