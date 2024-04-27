import React, {useState} from "react";
import {graphql, StaticQuery} from "gatsby";
import Swiper from "react-id-swiper";
import LinkIcon from "../../img/external-link.png"

export const NewsSection = ({data}) => {
        const params = {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
                bulletClass: 'life-at-samagra-page-indicator',
                bulletActiveClass: 'life-at-samagra-page-indicator-active',
                clickableClass: 'life-at-samagra-bullets'
            },
            slidesPerView: 1,
            autoplay: { // Enable autoplay (might require additional configuration)
                delay: 4000, // Set autoplay delay (in milliseconds)
                disableOnInteraction: false, // Allow user interaction to pause/resume
            },
            loop: true
        };
    
    const {allMarkdownRemark: mediaPageContent} = data;
    const media = mediaPageContent.edges;
    return (
        <div className={'home-news-section-wrapper'}>
            <Swiper {...params} ContainerEl={'div'}>
                        {
                            media.map((item, index) => {
                                return <div key={index} style={{width: '100%', padding:"6vh 10vh", display:"flex", flexDirection:"column", gap:"36px",background:"#D09C0A",borderRadius:"29px"}}>
                                    <div style={{display:"flex",justifyContent:"space-between",gap:"12px"}}>
                                        <div style={{color:"#ffffff", fontSize:"28px", lineHeight:"42px", fontWeight:"500",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{item.node.frontmatter.title}</div>
                                        <div><button style={{width:"160px",display:"flex",gap:"4px",alignItems:"center",color:"#D09C0A",fontSize:"18px",fontWeight:"400",background:"#ffffff", border:"none",borderRadius:"4px",padding:"4px 8px"}}><span>{item.node.frontmatter.linkButtonText}</span><img src={LinkIcon}/>
                                        </button></div>
                                    </div>
                                    <div style={{width:"146vh", height:"63.5vh"}}><img src={item?.node?.frontmatter?.image?.childImageSharp?.fluid?.src} width={"100%"} height={"100%"} style={{borderRadius:"16px"}}/></div>
                                </div>
                            })
                        }
                    </Swiper>
        </div>
    )
};

export default () => (
    <StaticQuery
        query={graphql`
      query NewsMediaRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 3
          filter: { frontmatter: { templateKey: { eq: "media-post" } , displayOnHomePage: {eq: true} } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                    title
                    projectId
                    author
                    link
                    displayOnHomePage
                    mediaHouse
                    image {
                        childImageSharp {
                            fluid(maxWidth: 640, quality: 64) {
                            ...GatsbyImageSharpFluid
                            }
                        }
                    }
                    date(formatString: "MMMM DD, YYYY")
                    linkButtonText
                }
            }
          }
        }
      }
    `}
        render={(data, count) => <NewsSection data={data}/>}
    />
)

