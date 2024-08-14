import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Card from "../components/SamvaadPageComponents/NewsletterCard";
import upIcon from "../img/up-icon.png";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import SuccessModal from "../components/SamvaadPageComponents/SuccessModal";

// const mailchimpUrl = process.env.GATSBY_MAILCHIMP_URL || "";
const mailchimpUrl =
  "https://esmagico.us14.list-manage.com/subscribe/post?u=73cb31bbc28f98242c2a62588&amp;id=d839accccf&amp;f_id=00acb1e5f0";

export const SamvaadPagePreviewTemplate = ({ post }) => {
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

  return (
    <div>
      <div className="base-banner-image">
        <img
          alt="banner-image"
          src={
            post?.bannerImage && post?.bannerImage?.childImageSharp
              ? post?.bannerImage?.childImageSharp?.fluid?.src
              : post?.bannerImage
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
          <div className="title">{post?.title}</div>
        </div>
      </div>

      <div className="samvaad-intro" id="samvaad_intro">
        <h2>{post?.heading1}</h2>
        <p>{post?.subTitle}</p>
      </div>

      <div className="newletter-container">
        <h2>{post?.heading2}</h2>
        <p>{post?.description}</p>
        <div className="card-container">
          {post?.cards?.map((card, index) => (
            <Card
              key={index}
              category={card?.category}
              title={card?.title}
              description={card?.description}
              imageUrl={
                card?.image && card?.image?.childImageSharp
                  ? card?.image?.childImageSharp?.fluid?.src
                  : card?.image
              }
              link={card?.link}
            />
          ))}
        </div>
      </div>

      <div className="subscribe-section">
        <div className="subscribe-content">
          <h2>Stay in the loop.</h2>
          <p>
            Subscribe to <b>Samvaad</b> to stay updated!
          </p>
        </div>
        <div className="subscribe-form">
          <MailchimpSubscribe
            url={mailchimpUrl}
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
                  <div className="status">sending...</div>
                )}
                {status === "error" && (
                  <div
                    className="status"
                    // dangerouslySetInnerHTML={{ __html: message }}
                  >
                    ERROR: Please enter a valid email address to subscribe
                  </div>
                )}
                {status === "success" && setShowSuccess(true)}
                {/* <p className="terms">
                  By clicking Sign Up you're confirming that you agree with our
                </p> */}
              </div>
            )}
          />
        </div>
      </div>
      {showSuccess ? (
        <SuccessModal onClose={() => setShowSuccess(false)} />
      ) : (
        ""
      )}
    </div>
  );
};

const SamvaadPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <SamvaadPagePreviewTemplate post={post.frontmatter} />
    </Layout>
  );
};

export default SamvaadPage;

export const samvaadPageQuery = graphql`
  query SamvaadPage {
    markdownRemark(frontmatter: { templateKey: { eq: "samvaad-page" } }) {
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
