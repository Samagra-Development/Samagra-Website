import React from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import {graphql, Link} from 'gatsby'
import Layout from '../components/Layout'
import Content, {HTMLContent} from '../components/Content'
import JoinUsBannerImage from "../components/JoinUsPageComponents/JoinUsBannerImage/JoinUsBannerImage";
import JoinUsFormSection from "../components/JoinUsPageComponents/JoinUsFormSection/JoinUsFormSection";


export const JoinUsPreviewTemplate = ({joinUsPageContent}) => {
    return (
        <React.Fragment>
            <JoinUsBannerImage/>
            <JoinUsFormSection joinUsPageContent={joinUsPageContent} infoText1={joinUsPageContent.infoText1} infoText2={joinUsPageContent.infoText2} formAcceptance={joinUsPageContent.formAcceptance} ShowForm={joinUsPageContent.showForm} verticleImage={joinUsPageContent.verticalImage}
                               horizontalImage={joinUsPageContent.horizontalImage} followLinkedin={joinUsPageContent.followLinkedin} postSubInfo={joinUsPageContent.postSubInfo}/>
        </React.Fragment>
    )
};

const JoinUsPage = ({data}) => {
    const {markdownRemark: joinUsPageContent} = data;
    return (
        <Layout>
            <JoinUsPreviewTemplate joinUsPageContent={joinUsPageContent.frontmatter}/>
        </Layout>
    )
};

export default JoinUsPage
export const JoinUsPageQuery = graphql`
  query JoinUsPageQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "joinus-page" } }) {
      html
      frontmatter {
        title
        infoText1
        infoText2
        formAcceptance
        showForm
        postSubInfo {
           heading
           line1text
           line2text
           line3text
           line4text
           line1link
           line2link
           line3link
           line4link
           subHeading
           subHeading2
           videoTitle
           youtubeLink
        }
        verticalImage {
             childImageSharp {
                fluid(maxWidth: 768, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
        }
        horizontalImage {
             childImageSharp {
                fluid(maxWidth: 768, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
        }
        followLinkedin {
             childImageSharp {
                fluid(maxWidth: 768, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
        }
        formsElements {
            label
            required
            placeholder
            type
            validation
            otherOptionAvailable {
                activateOn
                label
                placeholder
            }
            options {
                text
            }
            actionName
            
        }
      }
    }
  }
`;
