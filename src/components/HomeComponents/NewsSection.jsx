import React, {useState} from "react";
import {graphql, StaticQuery} from "gatsby";
import Swiper from "react-id-swiper";
import LinkIcon from "../../img/external-link.png"

export const NewsSection = ({data}) => {
        const params = {
            pagination: {
                el: '.swiper-news-pagination',
                type: 'bullets',
                clickable: true,
                bulletClass: 'home-page-indicator',
                bulletActiveClass: 'home-page-indicator-active',
                clickableClass: 'home-page-bullets'
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
        <div className={'news-section'}>
            <Swiper {...params} ContainerEl={'div'}>
                        {
                            media.map((item, index) => {
                                return <div key={index} style={{padding:"0 3.5vw"}}>
                                    <div style={{width: '100%', padding:"3vw 3.5vw", display:"flex", flexDirection:"column", gap:"27px",background:"#D09C0A",borderRadius:"29px"}}>
                                    <div style={{display:"flex",justifyContent:"space-between",gap:"34px",maxHeight:"92px"}}>
                                        <div className="our-model-sub-heading" style={{flex:"3.5",color:"#ffffff", fontWeight:"700",paddingBottom:"0",overflow:"hidden"}}>{item.node.frontmatter.title}</div>
                                        <div style={{flex:"1"}}><button style={{display:"flex",gap:"4px",alignItems:"center",color:"#D09C0A",fontSize:"1.25vw",fontWeight:"400",lineHeight:"2vw",background:"#ffffff", border:"none",borderRadius:"4px",padding:"4px 8px"}}
                                        onClick={()=>{
                                            window.location.href=`${item.node.frontmatter.link}`
                                        }}><span>{item.node.frontmatter.linkButtonText}</span><img src={LinkIcon}/>
                                        </button></div>
                                    </div>
                                    <div style={{width:"55.5vw"}}><img src={item?.node?.frontmatter?.image?.childImageSharp?.fluid?.src} width={"100%"} style={{borderRadius:"16px",aspectRatio:"1.85"}}/></div>
                                </div></div>
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

