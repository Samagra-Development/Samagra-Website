import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Card from "../components/SamvaadPageComponents/NewsletterCard";
import upIcon from "../img/up-icon.png";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const url =
  "https://esmagico.us14.list-manage.com/subscribe/post?u=73cb31bbc28f98242c2a62588&amp;id=d839accccf&amp;f_id=00acb1e5f0";

const SamvaadPagePreviewTemplate = ({ data }) => {
  if (
    data &&
    data.markdownRemark &&
    data.markdownRemark.frontmatter &&
    data.markdownRemark.frontmatter.team &&
    data.markdownRemark.frontmatter.team &&
    data.markdownRemark.frontmatter.team[2].name
  ) {
    data.markdownRemark.frontmatter.team.splice(2, 0, {});
  }

  return (
    <Layout>
      <SamvaadPage data={data} />
    </Layout>
  );
};

const SuccessModal = ({ onClose }) => (
  <div className="success-modal" onClick={onClose}>
    <div className="success-modal-content">
      <svg
        width="178"
        height="178"
        viewBox="0 0 178 178"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_410_6044)">
          <path
            d="M177.445 74.9276L89.0002 16.2021L0.555664 74.9276L89.0002 144.331L177.445 74.9276Z"
            fill="#FEE97D"
          />
          <path
            d="M89.0002 26.8794L166.768 82.0173L177.445 74.9276L89.0002 16.2021L0.555664 74.9276L10.2303 81.3515L89.0002 26.8794Z"
            fill="#F4DA6E"
          />
          <path
            d="M147.726 141H30.2744V11.4472C30.2744 5.5504 35.0549 0.769897 40.952 0.769897H137.049C142.946 0.769897 147.726 5.5504 147.726 11.4472V141Z"
            fill="#F9F7F8"
          />
          <path
            d="M137.049 0.769897H126.372C132.269 0.769897 137.049 5.5504 137.049 11.4472V141H147.726V11.4472C147.726 5.5504 142.946 0.769897 137.049 0.769897Z"
            fill="#E5E1E5"
          />
          <path
            d="M166.768 177.659H11.2329C5.33616 177.659 0.555664 172.879 0.555664 166.982V74.9276L89.0002 133.653L177.445 74.9276V166.981C177.445 172.879 172.664 177.659 166.768 177.659Z"
            fill="#FFFBE5"
          />
          <path
            d="M166.768 82.0173V166.981C166.768 172.879 161.987 177.659 156.09 177.659H166.768C172.664 177.659 177.445 172.879 177.445 166.982V74.9276L166.768 82.0173Z"
            fill="#FCECA9"
          />
          <path
            d="M177.445 155.008L100.813 104.126C93.655 99.3728 84.3458 99.3728 77.1877 104.126L0.555664 155.008V166.981C0.555664 172.879 5.33616 177.659 11.2329 177.659H166.767C172.664 177.659 177.445 172.879 177.445 166.982V155.008Z"
            fill="#FEE97D"
          />
          <path
            d="M177.445 166.982V155.009L166.768 147.919V166.982C166.768 172.879 161.987 177.659 156.09 177.659H166.768C172.664 177.659 177.445 172.879 177.445 166.982Z"
            fill="#F4DA6E"
          />
          <path
            d="M56.9809 57.5479L62.9813 66.2372C63.7403 67.3324 65.0155 67.7947 66.2303 67.4146C67.4643 67.0287 68.2617 65.8893 68.2617 64.5115V48.9549C68.2617 47.4807 67.0667 46.2857 65.5925 46.2857C64.1183 46.2857 62.9233 47.4807 62.9233 48.9549V56.7581L56.5079 47.4683C55.8442 46.5072 54.633 46.0895 53.517 46.4367C52.4018 46.7846 51.6421 47.8169 51.6421 48.985V65.0539C51.6421 66.5281 52.8371 67.7232 54.3113 67.7232C55.7855 67.7232 56.9806 66.5281 56.9806 65.0539L56.9809 57.5479Z"
            fill="#00516A"
          />
          <path
            d="M74.074 67.6496H80.7955C82.2696 67.6496 83.4647 66.4545 83.4647 64.9803C83.4647 63.5061 82.2696 62.3111 80.7955 62.3111H76.7436V59.674H80.3C81.7742 59.674 82.9693 58.479 82.9693 57.0048C82.9693 55.5306 81.7742 54.3355 80.3 54.3355H76.7436V51.6984H80.7955C82.2696 51.6984 83.4647 50.5034 83.4647 49.0292C83.4647 47.555 82.2696 46.36 80.7955 46.36H74.074C72.5998 46.36 71.4048 47.555 71.4048 49.0292V64.981C71.4044 66.4545 72.5998 67.6496 74.074 67.6496Z"
            fill="#00516A"
          />
          <path
            d="M126.266 62.0337C126.713 59.5272 125.609 56.2651 121.166 54.6265C119.308 53.9414 117.571 53.1975 116.919 52.9132C116.522 52.454 117.088 51.9272 117.632 51.7634C119.547 51.1868 121.387 52.6126 121.458 52.6686C122.587 53.6 124.257 53.4497 125.2 52.3272C126.149 51.1989 126.003 49.515 124.874 48.5663C123.391 47.3194 119.873 45.5136 116.091 46.6516C113.622 47.3958 111.873 49.3526 111.527 51.7589C111.196 54.0675 112.297 56.7008 114.472 57.6695C114.565 57.7113 116.802 58.707 119.319 59.6353C120.164 59.947 121.113 60.5163 121.01 61.0953C120.917 61.6153 120.165 62.384 118.845 62.384C117.427 62.384 116.069 61.8198 115.213 60.8746C114.223 59.7822 112.535 59.6989 111.442 60.6891C110.35 61.6789 110.267 63.3669 111.257 64.4594C113.136 66.5333 115.902 67.7228 118.845 67.7228C122.557 67.7232 125.677 65.3303 126.266 62.0337Z"
            fill="#00516A"
          />
          <path
            d="M106.672 46.3662C105.226 46.0794 103.821 47.0171 103.533 48.4633L102.175 55.2884L99.9812 48.1689C99.5473 46.76 98.0531 45.9696 96.6445 46.4038C95.7062 46.693 95.0449 47.4531 94.8342 48.3441L92.6842 55.2905L91.3285 48.4367C91.0428 46.9905 89.6391 46.0514 88.1918 46.3361C86.7456 46.6222 85.8052 48.0266 86.0913 49.4728L89.228 65.3299C89.503 66.7147 90.7833 67.7231 92.1888 67.7231H92.2092C93.4992 67.7145 94.6448 66.8877 95.0601 65.6665C95.0681 65.6433 95.0757 65.6202 95.0826 65.5967L97.4288 58.0167L99.7643 65.598C100.152 66.8598 101.343 67.7231 102.658 67.7231H102.679C104.084 67.7231 105.34 66.7122 105.62 65.3282L108.769 49.5053C109.057 48.0594 108.118 46.654 106.672 46.3662Z"
            fill="#00516A"
          />
          <path
            d="M51.0199 89.0642C51.0147 89.0642 51.0095 89.0642 51.0047 89.0642C50.0083 89.0697 48.9615 89.0742 48.0518 89.0763V75.6482C48.0518 74.174 46.8568 72.979 45.3826 72.979C43.9084 72.979 42.7134 74.174 42.7134 75.6482V91.7334C42.7134 93.0331 43.6493 94.1439 44.93 94.3643C45.1207 94.3971 49.2013 94.413 51.0348 94.403C52.509 94.3947 53.6974 93.1927 53.6891 91.7185C53.6809 90.2495 52.4872 89.0642 51.0199 89.0642Z"
            fill="#00516A"
          />
          <path
            d="M66.1705 78.3914C67.6446 78.3914 68.8397 77.1964 68.8397 75.7222C68.8397 74.248 67.6446 73.053 66.1705 73.053H59.449C57.9748 73.053 56.7798 74.248 56.7798 75.7222V91.674C56.7798 93.1482 57.9748 94.3433 59.449 94.3433H66.1705C67.6446 94.3433 68.8397 93.1482 68.8397 91.674C68.8397 90.1998 67.6446 89.0048 66.1705 89.0048H62.1182V86.3677H65.6747C67.1489 86.3677 68.3439 85.1727 68.3439 83.6985C68.3439 82.2243 67.1489 81.0292 65.6747 81.0292H62.1182V78.3921H66.1705V78.3914Z"
            fill="#00516A"
          />
          <path
            d="M115.611 78.3914C117.085 78.3914 118.28 77.1964 118.28 75.7222C118.28 74.248 117.085 73.053 115.611 73.053H108.889C107.415 73.053 106.22 74.248 106.22 75.7222V91.674C106.22 93.1482 107.415 94.3433 108.889 94.3433H115.611C117.085 94.3433 118.28 93.1482 118.28 91.674C118.28 90.1998 117.085 89.0048 115.611 89.0048H111.559V86.3677H115.115C116.589 86.3677 117.784 85.1727 117.784 83.6985C117.784 82.2243 116.589 81.0292 115.115 81.0292H111.559V78.3921H115.611V78.3914Z"
            fill="#00516A"
          />
          <path
            d="M83.3197 72.979H74.429C72.9548 72.979 71.7598 74.174 71.7598 75.6482C71.7598 77.1224 72.9548 78.3175 74.429 78.3175H76.1872V91.7469C76.1872 93.2211 77.3822 94.4161 78.8564 94.4161C80.3306 94.4161 81.5256 93.2211 81.5256 91.7469V78.3178H83.3197C84.7939 78.3178 85.989 77.1228 85.989 75.6486C85.989 74.1744 84.7939 72.979 83.3197 72.979Z"
            fill="#00516A"
          />
          <path
            d="M100.501 72.979H91.6106C90.1364 72.979 88.9414 74.174 88.9414 75.6482C88.9414 77.1224 90.1364 78.3175 91.6106 78.3175H93.3688V91.7469C93.3688 93.2211 94.5639 94.4161 96.038 94.4161C97.5122 94.4161 98.7073 93.2211 98.7073 91.7469V78.3178H100.501C101.976 78.3178 103.171 77.1228 103.171 75.6486C103.171 74.1744 101.976 72.979 100.501 72.979Z"
            fill="#00516A"
          />
          <path
            d="M131.16 86.0502C133.592 84.9629 135.288 82.5881 135.288 79.8321C135.288 76.0532 132.107 72.9787 128.198 72.9787H123.919C123.918 72.9787 123.918 72.9787 123.917 72.9787C123.916 72.9787 123.915 72.9787 123.914 72.9787C122.44 72.9787 121.245 74.1737 121.245 75.6479V91.7469C121.245 93.2211 122.44 94.4161 123.914 94.4161C125.388 94.4161 126.583 93.2211 126.583 91.7469V88.9309L130.614 93.5106C131.591 94.6207 133.278 94.7212 134.381 93.7507C135.488 92.7768 135.595 91.0902 134.621 89.9836L131.16 86.0502ZM128.198 78.3179C129.13 78.3179 129.949 79.0254 129.949 79.8325C129.949 80.6395 129.13 81.3471 128.198 81.3471C127.809 81.3471 127.221 81.3492 126.604 81.3519C126.589 80.037 126.606 79.6694 126.597 78.3182L128.198 78.3179Z"
            fill="#00516A"
          />
          <path
            d="M103.64 33.7014L83.2095 27.6381V17.5703L103.64 11.507C104.552 11.2361 105.468 11.9198 105.468 12.8716V32.3364C105.469 33.2885 104.553 33.9722 103.64 33.7014Z"
            fill="#FEE97D"
          />
          <path
            d="M103.64 11.507L94.7915 14.133V31.075L103.64 33.701C104.553 33.9719 105.469 33.2882 105.469 32.3363V12.8716C105.469 11.9202 104.553 11.2361 103.64 11.507Z"
            fill="#F4DA6E"
          />
          <path
            d="M78.7164 39.5501L76.1263 26.3162C75.8434 24.8694 76.7862 23.467 78.2335 23.1841C79.6807 22.9011 81.0823 23.8439 81.3656 25.2912L83.9557 38.5251C84.2387 39.972 83.2959 41.3739 81.8486 41.6572C80.4314 41.9347 79.0001 41.0115 78.7164 39.5501Z"
            fill="#FEE97D"
          />
          <path
            d="M83.21 17.5703V27.6381H77.5665C74.7863 27.6381 72.5327 25.3845 72.5327 22.6043C72.5327 19.8242 74.7863 17.5706 77.5665 17.5706H83.21V17.5703Z"
            fill="#00516A"
          />
        </g>
        <defs>
          <clipPath id="clip0_410_6044">
            <rect
              width="176.889"
              height="176.889"
              fill="white"
              transform="translate(0.555664 0.769897)"
            />
          </clipPath>
        </defs>
      </svg>

      <h2>Thank you for subscribing to our newsletter!</h2>
      <p>
        You've successfully joined our community. Stay tuned for updates, news,
        and exclusive content delivered right to your inbox.
      </p>
      <hr className="horizontal-success-popup"></hr>
      <div className="follow-us">
        <p>Follow Us</p>
        <div className="social-icons">
          <a href="https://instagram.com">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="https://linkedin.com">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="https://facebook.com">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://youtube.com">
            <i className="fa fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export const SamvaadPage = ({ data }) => {
  const [mobile, setMobile] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { markdownRemark: post } = data;
  if (!post.frontmatter.bannerImage) {
    return "";
  }
  console.log(post.frontmatter);

  return (
    <div>
      <div className="base-banner-image">
        <img
          alt="banner-image"
          src={
            post.frontmatter.bannerImage &&
            post.frontmatter.bannerImage.childImageSharp
              ? post.frontmatter.bannerImage.childImageSharp.fluid.src
              : post.frontmatter.bannerImage
          }
          width="100%"
          className="banner-image"
        />
        {!mobile && (
          <a href="#samvaad_intro" className="up-icon-banner">
            <img
              src={upIcon}
              alt="Scroll to Samvaad Intro"
              style={{ cursor: "pointer" }}
            />
            <p>Scroll Down</p>
          </a>
        )}
        <div className="slider-content">
          <div className="title">{post.frontmatter.title}</div>
        </div>
      </div>
      <div className="samvaad-intro" id="samvaad_intro">
        <h2>{post.frontmatter.heading1}</h2>
        <p>{post.frontmatter.subTitle}</p>
      </div>
      <div className="newletter-container">
        <h2>{post.frontmatter.heading2}</h2>
        <p>{post.frontmatter.description}</p>
        <div className="card-container">
          {post.frontmatter?.cards?.map((card, index) => (
            <Card
              key={index}
              category={card.category}
              title={card.title}
              description={card.description}
              imageUrl={
                card.image && card.image.childImageSharp
                  ? card.image.childImageSharp.fluid.src
                  : card.image
              }
              link={card.link}
            />
          ))}
        </div>
      </div>
      <div className="subscribe-section">
        <div className="subscribe-content">
          <h2>Stay in the loop.</h2>
          <p>
            Keep up to date with new products, all the goss, and anything else
            you might have missed on Twitter.
          </p>
        </div>
        <div className="subscribe-form">
          <MailchimpSubscribe
            url={url}
            render={({ subscribe, status, message }) => (
              <div className="subscribe-form_div">
                <div className="buttons_wrap">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        subscribe({ EMAIL: e.target.value });
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      subscribe({
                        EMAIL: document.querySelector("input[type='email']")
                          .value,
                      })
                    }
                  >
                    Sign Up
                  </button>
                </div>
                {status === "sending" && (
                  <div style={{ color: "blue" }}>sending...</div>
                )}
                {status === "error" && (
                  <div
                    style={{ color: "red" }}
                    dangerouslySetInnerHTML={{ __html: message }}
                  />
                )}
                {status === "success" && (
                  <div style={{ color: "green" }}>Subscribed!</div>
                )}
                {status === "success" && setShowSuccess(true)}
                <p className="terms">
                  By clicking Sign Up you're confirming that you agree with our{" "}
                  <a href="/terms-and-conditions">Terms and Conditions</a>.
                </p>
              </div>
            )}
          />
        </div>
      </div>
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  );
};

export default SamvaadPagePreviewTemplate;

export const samvaadPageQuery = graphql`
  query SamvaadPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        bannerImage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
        subTitle
        heading1
        heading2
        description
        cards {
          category
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 640, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          link
        }
      }
    }
  }
`;
