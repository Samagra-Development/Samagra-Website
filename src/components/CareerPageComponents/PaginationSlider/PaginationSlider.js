import React from "react";
import Swiper from "react-id-swiper";

const service = {};
const PaginationSlider = ({ content }) => {
  const params = {
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      bulletClass: "life-at-samagra-page-indicator",
      bulletActiveClass: "life-at-samagra-page-indicator-active",
      clickableClass: "life-at-samagra-bullets",
    },
    slidesPerView: 1,
    autoplay: {
      // Enable autoplay (might require additional configuration)
      delay: 5000, // Set autoplay delay (in milliseconds)
      disableOnInteraction: false, // Allow user interaction to pause/resume
    },
    loop: true,
  };
  return (
    <div className={"container-fluid testimonial-slider"}>
      <div className="row">
        <div className="col-11 mx-auto pt-4">
          <div className={"f-36 fw-600 text-center my-4"}>Life @ Samagra</div>
        </div>
        <div className="col-12 mx-auto pt-4 px-0">
          <Swiper {...params} ContainerEl={"div"}>
            {content.slides.map((item, index) => {
              return (
                <div
                  key={index}
                  className={"life-at-samagra"}
                  style={{ width: "100%" }}
                >
                  <div
                    className={"d-flex flex-wrap w-100 h-100 image-wrapper"}
                    style={{
                      backgroundImage: `url(${
                        !!item.image.childImageSharp
                          ? item.image.childImageSharp.fluid.src
                          : item.image
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div
                      className={
                        "align-self-end f-28 mb-5 ml-5 text-white text-title"
                      }
                      style={{
                        background: "rgba(0,0,0,0.8)",
                        padding: "0 20px",
                      }}
                    >
                      {item.text}
                    </div>
                  </div>
                  -
                </div>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PaginationSlider;
