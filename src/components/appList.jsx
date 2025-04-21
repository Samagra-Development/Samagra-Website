import React from 'react';

const AppList = ({ section3 }) => {
  if (!section3 || !section3.appList || section3.appList.length === 0) {
    return null;
  }

  return (
    <div className="app-list-container" style={{
      padding: "60px 20px",
      backgroundColor: "white"
    }}>
      <div style={{
        maxWidth: "1300px",
        margin: "0 auto"
      }}>
        <p style={{
          fontWeight: "700",
          fontSize: "44.48px",
          lineHeight: "39px",
          letterSpacing: "0.48px",
          textAlign: "center",
          marginBottom: "40px",
          color: "#880163"
        }}>
        AI in Governance
        </p>
        <p style={{
          fontWeight: "400",
          fontSize: "28px",
          lineHeight: "39px",
          letterSpacing: "0.48px",
          textAlign: "center",
          marginBottom: "40px",
          color: "#676767"
        }}>
          {section3.description}
        </p>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          
          gap: "70px",
justifyContent:"space-around"
        }}>
          {section3.appList.map((item, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: "white",
                border:"1px solid #CCCCCC",
                padding: "25px",
                maxWidth: "586px",
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img 
                src={item.image?.childImageSharp?.fluid?.src || ''} 
                alt={item.text}
                style={{
                  height: "115.13px",
                  borderRadius: "8px",
                  marginBottom: "15px"
                }}
              />
              <h2 style={{
                color: "#0F1A54",
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "12px"
              }}>
                {item.text}
              </h2>
              <p style={{
                color: "#676767",
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "20px"
              }}>
                {item.subText}
              </p>
              {item.applink && (
                <a 
                  href={item.applink}
                  style={{
                    display: "inline-block",
                    color: "#880163",
                    fontWeight: "500",
                    textDecoration: "none",
                    borderBottom: "1px solid #880163"
                  }}
                >
                  Know More
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppList;