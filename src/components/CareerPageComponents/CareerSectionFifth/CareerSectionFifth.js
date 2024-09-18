import React, { useState } from "react";
import { PrimaryButton } from "../../PrimaryButton/PrimaryButton";

const CareerSectionFifth = ({ content }) => {
  const headings = [
    {
      title: "Associate & Senior Associate",
    },
    {
      title: "Consultant & Senior Consultant",
    },
    {
      title: "Manager & Senior Manager",
    },
    {
      title: "Vice President & Senior Vice President",
    },
  ];

  const questions = content.faq;
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(-1);
  return (
    <div className={"container-fluid"}>
      <div className="row">
        <div className={"col-12 my-5 py-4 fw-600 faq-title text-center"}>
          Roles @ Samagra
        </div>

        <div className="container mx-auto">
          <div className="row">
            <div className="col-md-6 col-sm-12 text-center">
              <iframe
                width="100%"
                object-fit="cover"
                height="320px"
                src={content.roles.youtubeLink}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="col-md-6 col-sm-12 roles-section">
              {content.roles.items.map((item, index) => {
                if (selectedRoleIndex > -1 && index !== selectedRoleIndex)
                  return <span />;
                return (
                  <div
                    className={`px-3 py-4 mb-2 content-center role-item samagra-roles-card ${
                      selectedRoleIndex === index ? "active" : ""
                    }`}
                  >
                    <div className="role-title">
                      {item.title}{" "}
                      <i
                        className={`fa ${
                          selectedRoleIndex === index
                            ? "fa-angle-up"
                            : "fa-angle-down"
                        } toggle-arrow ml-auto f-21`}
                        onClick={() => {
                          setSelectedRoleIndex(
                            index === selectedRoleIndex ? -1 : index
                          );
                        }}
                        aria-hidden="true"
                      />
                    </div>

                    {selectedRoleIndex === index ? (
                      <div className={"role-description text-justify"}>
                        {item.description}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="row join-us-btn pt-5">
            <div className="col-12 text-center">
              <PrimaryButton
                classes={"py-3 text-uppercase"}
                click={() => {
                  window.location.href = "/joinus";
                }}
                text={"Join Us"}
              />
            </div>
            <div className="col-12 text-center my-5 py-4 faq-title">
              Frequently Asked Questions
            </div>
            <div className="col-12">
              <div
                id={"custom-scroll"}
                className={"questions-accordion pr-4 mb-5"}
              >
                {questions.map((item) => {
                  return (
                    <AccordionItem classes={"px-3 py-4 mb-4 content-center"}>
                      <div className={"f-18"}>
                        <div className={"mb-3"}>{item.question}</div>
                        <div className={"grey-text"}>{item.answer}</div>
                      </div>
                    </AccordionItem>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerSectionFifth;

const AccordionItem = ({ children, classes }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`samagra-roles-card ${classes ? classes : ""} ${
        isOpen ? "" : "isOpen"
      }`}
    >
      <div className="w-95">{children}</div>
      <i
        className={`fa ${
          isOpen ? "fa-angle-up" : "fa-angle-down"
        } toggle-arrow ml-auto f-21`}
        onClick={setIsOpen.bind(this, !isOpen)}
        aria-hidden="true"
      />
    </div>
  );
};
