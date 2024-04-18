import React from "react";
import OurWorkCard from "./OurWorkCard";
import Agriculture from "../../../img/home-page/agriculture.png";
import Health from "../../../img/home-page/health.png";
import Education from "../../../img/home-page/education.png";
import ServiceDelivery from "../../../img/home-page/service-delivery.png";
import OdisaMap from "../../../img/home-page/odisha-map.png";
import UpMap from "../../../img/home-page/up-map.png";
import HaryanaMap from "../../../img/home-page/haryana-map.png";
import KonnectLogo from "../../../img/home-page/konnect-logo.png";
import LeapLogo from "../../../img/home-page/leap-logo.png";
import NipunLogo from "../../../img/home-page/nipun-logo.png";
import StrideLogo from "../../../img/home-page/stride-logo.png";
import SaralLogo from "../../../img/home-page/saral-logo.png";

function OurWorkSection() {
  const data = [
    {
      image: Agriculture,
      heading: "Agriculture",
      subHeading: "Transforming ",
      description1:
        "Our work in the agriculture domain spans xx years which has impacted the lives of xx <citizens e.g. farmers> in / across the state/s of xx.",
      map: OdisaMap,
      logo1: KonnectLogo,
      logo2: LeapLogo,
      description2:
        "Increasing farmer income via phased cohort-based enhancement approach for 75 lakh farmers in Odisha",
    },
    {
      image: Education,
      heading: "Education",
      subHeading: "Transforming ",
      description1:
        "Our work in the education domain spans xx years which has impacted the lives of xx <citizens e.g. farmers> in / across the state/s of xx.",
      map: UpMap,
      logo1: NipunLogo,
      description2:
        "Enabling 60 lakh students in grades 1-3 to attain foundational literacy & numeracy in UP",
    },
    {
      image: Health,
      heading: "Health",
      subHeading: "Transforming ",
      description1:
        "Our work in the health domain spans xx years which has impacted the lives of xx <citizens e.g. farmers> in / across the state/s of xx.",
      map: OdisaMap,
      logo1: StrideLogo,
      description2:
        "Establishing systemic enablers for improvement in health & nutrition outcomes of 1 Cr+ tribals in Odisha",
    },
    {
      image: ServiceDelivery,
      heading: "Service Delivery",
      subHeading: "Transforming ",
      description1:
        "Our work in the service delivery domain spans xx years which has impacted the lives of xx <citizens e.g. farmers> in / across the state/s of xx.",
      map: HaryanaMap,
      logo1: SaralLogo,
      description2:
        "Transforming scheme and service delivery for 2.7 Cr citizens in Haryana",
    },
  ];
  return (
    <>
      <div
        style={{
          backgroundColor: "#F2E5CA",
          padding: "72px 60px",
          marginBottom: "105px",
        }}
      >
        <div className="section-heading">Our Work</div>
        <div className="section-description">
          We work with state governments across domains
        </div>
        <div style={{ width: "100%", display: "flex", gap: "120px" }}>
          <div style={{ flex: 1 }}>
            <OurWorkCard
              marginTop={"84px"}
              marginBottom={"84px"}
              data={data[0]}
            />
            <OurWorkCard
              marginTop={"84px"}
              marginBottom={"84px"}
              data={data[1]}
            />
          </div>
          <div style={{ flex: 1 }}>
            <OurWorkCard
              marginTop={"180px"}
              marginBottom={"84px"}
              data={data[2]}
            />
            <OurWorkCard
              marginTop={"84px"}
              marginBottom={"0px"}
              data={data[3]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OurWorkSection;
