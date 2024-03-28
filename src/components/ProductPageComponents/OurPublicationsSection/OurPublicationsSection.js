import React, {useState} from "react";
import {graphql, StaticQuery} from "gatsby";

const service = {};
export const OurPublicationsSection = ({data, projectId, readMore}) => {

    const [hoveredIndex, setHoveredIndex] = useState(
        -1
    );
    // const publicationsObject = media;
    const {allMarkdownRemark: mediaPageContent} = data;
    const allPublications = mediaPageContent.edges;
    const readMoreTitles = [];
    if (readMore) {
        readMore.forEach(r => {
            readMoreTitles.push(r.text);
        });
    }

    const filteredPublications = [];
    readMoreTitles.forEach((rMT) => {
        const filteredPublication = allPublications.filter(function (item) {
            return rMT.indexOf(item.node.frontmatter.title) > -1;
        });
        if (filteredPublication && filteredPublication.length) {
            filteredPublications.push(filteredPublication[0]);
        }
    });
    return (
        <div className={'home-news-section-wrapper our-publication-section-wrapper container'}
             style={{paddingTop: '50px'}}>
            {
                filteredPublications.length ?
                    <div className={'title'}>
                        Read More
                    </div>
                    : null
            }
            <div className={'cards-section row'}>
                {

                    filteredPublications.map((publication, index) => {
                        if (!publication.node.frontmatter.featuredimage)
                            return <a href={publication.node.frontmatter.link} target="_blank"
                                      className={'col-md-4 col-sm-6 col-xs-12'}>
                                <div
                                    className={`card-wrapper  ${hoveredIndex === index ? 'hovered' : ''}`}
                                    onMouseLeave={() => setHoveredIndex(-1)}
                                    style={{width: '100%'}}
                                    onMouseEnter={() => setHoveredIndex(index)}>
                                    <div className={'image-section'}
                                         style={
                                             {
                                                 backgroundImage: `url(${
                                                     !!publication.node.frontmatter?.image ? publication.node.frontmatter?.image?.childImageSharp?.fluid?.src : publication.node.frontmatter?.image
                                                 })`,
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center'
                                             }}/>
                                    <div className={'content-section'}>
                                        <div className={'heading'}>
                                            {
                                                publication.node.frontmatter.title
                                            }
                                        </div>
                                        <div className={'timestamp'}>
                                            {
                                                publication.node.frontmatter.mediaHouse
                                            }&nbsp;|&nbsp;
                                            {
                                                publication.node.frontmatter.date
                                            }&nbsp;|&nbsp;Media
                                        </div>
                                    </div>
                                </div>
                            </a>;
                        return <a href={publication.node.fields ? publication.node.fields.slug : ''}
                                  className={'col-md-4 col-sm-6 col-xs-12'}>
                            <div
                                className={`card-wrapper  ${hoveredIndex === index ? 'hovered' : ''}`}
                                style={{width: '100%'}}
                                onMouseLeave={() => setHoveredIndex(-1)}
                                onMouseEnter={() => setHoveredIndex(index)}>
                                <div className={'image-section'}
                                     style={
                                         {

                                             backgroundImage: `url(${
                                                 !!(publication.node.frontmatter.featuredimage && publication.node.frontmatter.featuredimage.childImageSharp) ? publication.node.frontmatter.featuredimage.childImageSharp.fluid.src : publication.node.frontmatter.featuredimage
                                             })`,
                                             backgroundSize: 'cover',
                                             backgroundPosition: 'center'
                                         }}/>
                                <div className={'content-section'}>
                                    <div className={'heading'}>
                                        {
                                            publication.node.frontmatter.title
                                        }
                                    </div>
                                    <div className={'timestamp'}>
                                        {
                                            publication.node.frontmatter.author
                                        } &nbsp;|&nbsp;{
                                        publication.node.frontmatter.date
                                    }&nbsp;|&nbsp;Blog
                                    </div>
                                </div>
                            </div>
                        </a>;
                    })
                }
            </div>
        </div>
    )
};

function getSlug(str) {
    let result = '';
    str = str.replace(/ /g, '-').toLowerCase();
    for (let i = 0; i < str.length; i++) {
        if ('abcdefghijklmnopqrstuvwxyz0123456789-'.indexOf(str[i]) > -1) {
            result += str[i];
        }
    }
    return result;
}

export default ({projectId, readMore}) => (
    <StaticQuery
        query={graphql`
      query OurPublicationRollQuery {
        allMarkdownRemark(
          filter: { frontmatter: {templateKey: { in: ["media-post", "blog-post"] } } }
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
                    mediaHouse
                    link
                    author
                    image {
                        childImageSharp {
                            fluid(maxWidth: 640, quality: 64) {
                            ...GatsbyImageSharpFluid
                            }
                        }
                    }
                    featuredimage {
                        childImageSharp {
                            fluid(maxWidth: 640, quality: 64) {
                            ...GatsbyImageSharpFluid
                            }
                        }
                    }
                    date(formatString: "MMMM DD, YYYY")
                }
            }
          }
        }
      }
    `}
        render={(data, count) => <OurPublicationsSection data={data} projectId={projectId} readMore={readMore}/>}
    />
)
