import React, {useState} from "react";
import {graphql, StaticQuery} from "gatsby";

export const HomeNewsSection = ({data}) => {
    const newsObjects = [
        // {
        //     image: news1Image,
        //     text: 'Let’s step up efforts to get professionals' +
        //         'in governance',
        //     aligned: 'right',
        //     link: 'https://www.livemint.com/opinion/online-views/opinion-let-s-step-up-efforts-to-get-professionals-in-governance-1562089477115.html',
        //     timestamp: '02-Jul-2019'
        // }, {
        //     image: news2Image,
        //     text: 'How this social enterprise is helping the Odisha govt boost agricultural productivity in the State',
        //     link: 'https://yourstory.com/socialstory/2019/06/agritech-startup-samagra-odisha-government-productivity',
        //     timestamp: '28-Jun-2019'
        // }, {
        //     image: news3Image,
        //     text: 'Employment to Agriculture: Meet the Startup Helping States Revolutionise Governance',
        //     link: 'https://www.thebetterindia.com/173957/startup-governance-farmers-job-haryana-odisha/',
        //     timestamp: '4-Mar-2019'
        // }
    ];
    const [hoveredIndex, setHoveredIndex] = useState(
        -1
    );
    const {allMarkdownRemark: mediaPageContent} = data;
    const media = mediaPageContent.edges;
    return (
        <div className={'home-news-section-wrapper'}>
            <div className={'title'}>
                Samagra in News
            </div>
            <div className={'cards-section'}>
                {
                    media.map((news, index) => {
                        return <a href={news.node.frontmatter.link} target="_blank">
                            <div
                                className={`card-wrapper ${hoveredIndex === index ? 'hovered' : ''} `}
                                onMouseLeave={() => setHoveredIndex(-1)}
                                onMouseEnter={() => setHoveredIndex(index)}>
                                <div className={`image-section`}
                                     style={{backgroundImage: `url(${
                                             !!news.node.frontmatter.image.childImageSharp ? news.node.frontmatter.image.childImageSharp.fluid.src : news.node.frontmatter.image
                                     })`}}/>
                                <div className={'content-section'}>
                                    <div className={'heading'} style={{minHeight: '40px'}}>
                                        {news.node.frontmatter.title}
                                    </div>
                                    <div className={'timestamp'}>
                                        {news.node.frontmatter.date}
                                    </div>
                                </div>
                            </div>
                        </a>
                    })
                }
            </div>
        </div>
    )
};

export default () => (
    <StaticQuery
        query={graphql`
      query HomeMediaRollQuery {
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
        render={(data, count) => <HomeNewsSection data={data}/>}
    />
)

