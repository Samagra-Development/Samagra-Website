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
          height: isMobile ? "auto" :"734px",
          width: isMobile? "348px":"498px",
          background: "#ffffff",
          padding: "24px",
          marginTop: isMobile? "24px" :marginTop,
          marginBottom:  marginBottom,
        }}
      >
        {isFlipped ? (
          <div
            style={{
              borderRadius: "10px",
              width:isMobile?"300px":"450px",
              height:isMobile?"337.84px":"501.53px",
              border: "solid 4px #D09C0A",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "18px",
                backgroundImage: `url(${data?.backgroundMap?.childImageSharp?.fluid?.src ? (data?.backgroundMap?.childImageSharp?.fluid?.src) : data?.backgroundMap})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding:"24px",
                backgroundSize: "contain",
                justifyContent:"center",
                alignItems:"center"
              }}
            >
              <img fetchPriority="high" width={data?.workLogo[1]?"35%":"70%"} src={data?.workLogo[0]?.logo?.childImageSharp?.fluid?.src ? (data?.workLogo[0]?.logo?.childImageSharp?.fluid?.src) : data?.workLogo[0]?.logo} />
              {data?.workLogo[1] && <img fetchPriority="high" width={"45%"} src={data?.workLogo[1]?.logo?.childImageSharp?.fluid?.src ? (data?.workLogo[1]?.logo?.childImageSharp?.fluid?.src) : data?.workLogo[1]?.logo} />}
            </div>
            <div
            className="card-hover-description"
            style={{textAlign:"center",height:"134.38px",overflow:"hidden"}}
            >
              {data?.description2}
            </div>
            <button
              className="card-button-text card-button"
              onClick={()=>{
                window.location.href= getProjectUrl(data?.projectName[0]?.project) 
              }}
            >
              Learn More{data?.workLogo[1] ? "(Konnect)" : ""}
            </button>
            {data?.workLogo[1] && (
              <button
                className="card-button-text card-button"
                style={{marginTop:"8px"}}
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
          width:isMobile?"300px":"450px",
          height:isMobile?"337.84px":"501.53px"}}>
            <img src={data?.image?.childImageSharp?.fluid?.src ? (data?.image?.childImageSharp?.fluid?.src) : data?.image} alt="agri" style={{ width:"100%",borderRadius: "10px" }} />
          </div>
        )}
        <div style={{ padding: "16px 0" }}>
          <div
          className='section-description mustard-text'
          >
            {data?.titleLines[0]?.text}
          </div>
          <div
          className="card-heading mustard-text"
          >
            {data?.titleLines[1]?.text}
          </div>
        </div>
        <div className="card-description black-text-2" style={{height:"86.38px",overflow:"hidden"}}>
          {data?.description1}
        </div>
      </div>
    </>
  );
}

export default OurWorkCard;
