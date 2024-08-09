import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Card from '../components/SamvaadPageComponents/NewsletterCard';
import upIcon from '../img/up-icon.png';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import SuccessModal from '../components/SamvaadPageComponents/SuccessModal';

const mailchimpUrl = process.env.GATSBY_MAILCHIMP_URL || '';

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

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { markdownRemark: post } = data;
  if (!post.frontmatter.bannerImage) {
    return '';
  }

  return (
    <div>
      <div className="base-banner-image">
        <img
          alt="banner-image"
          src={
            post?.frontmatter?.bannerImage &&
            post?.frontmatter?.bannerImage?.childImageSharp
              ? post?.frontmatter?.bannerImage?.childImageSharp?.fluid?.src
              : post?.frontmatter?.bannerImage
          }
          width="100%"
          className="banner-image"
        />
        {!mobile && (
          <a href="#samvaad_intro" className="up-icon-banner">
            <img
              src={upIcon}
              alt="Scroll to Samvaad Intro"
              style={{ cursor: 'pointer' }}
            />
            <p>Scroll Down</p>
          </a>
        )}
        <div className="slider-content">
          <div className="title">{post?.frontmatter?.title}</div>
        </div>
      </div>

      <div className="samvaad-intro" id="samvaad_intro">
        <h2>{post?.frontmatter?.heading1}</h2>
        <p>{post?.frontmatter?.subTitle}</p>
      </div>

      <div className="newletter-container">
        <h2>{post?.frontmatter?.heading2}</h2>
        <p>{post?.frontmatter?.description}</p>
        <div className="card-container">
          {post?.frontmatter?.cards?.map((card, index) => (
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
          {/* <p>
            Keep up to date with new products, all the goss, and anything else
            you might have missed on Twitter.
          </p> */}
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
                      if (e.key === 'Enter') {
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
                {status === 'sending' && (
                  <div style={{ color: 'white' }}>sending...</div>
                )}
                {status === 'error' && (
                  <div
                    style={{ color: 'red' }}
                    dangerouslySetInnerHTML={{ __html: message }}
                  />
                )}
                {status === 'success' && setShowSuccess(true)}
                <p className="terms">
                  By clicking Sign Up you're confirming that you agree with our{' '}
                  <a href="#">Terms and Conditions</a>.
                </p>
              </div>
            )}
          />
        </div>
      </div>
      {showSuccess ? <SuccessModal onClose={() => setShowSuccess(false)} />:''}
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
