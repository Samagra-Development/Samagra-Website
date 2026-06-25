const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const {createFilePath} = require('gatsby-source-filesystem')
const {fmImagesToRelative} = require('gatsby-remark-relative-images')


exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions

    return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              id
            }
          }
        }
      }
    }
  `).then(result => {
        if (result.errors) {
            result.errors.forEach(e => console.error(e.toString()))
            return Promise.reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges
        posts.forEach(edge => {
            const id = edge.node.id;
            createPage({
                path: edge.node.fields.slug,
                component: path.resolve(
                    `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
                ),
                // additional data can be passed via context
                context: {
                    id
                },
            })
        })
        // Tag pages:
        let tags = []
    })
};

exports.sourceNodes = ({boundActionCreators, getNodes, getNode}) => {
    const {createNodeField} = boundActionCreators;

    const postsOfAuthors = {};
    // iterate thorugh all markdown nodes to link books to author
    // and build author index
    const markdownNodes = getNodes()
        .filter(node => node.internal.type === "MarkdownRemark")
        .forEach(node => {
            // console.log(node);
            // if (node.frontmatter.author) {
            //     const authorNode = getNodes().find(
            //         node2 =>
            //             node2.internal.type === "MarkdownRemark" &&
            //             node2.frontmatter.title === node.frontmatter.author
            //     );
            //
            //     if (authorNode) {
            //         createNodeField({
            //             node,
            //             name: "author",
            //             value: authorNode.id,
            //         });
            //
            //         // if it's first time for this author init empty array for his posts
            //         if (!(authorNode.id in postsOfAuthors)) {
            //             postsOfAuthors[authorNode.id] = [];
            //         }
            //         // add book to this author
            //         postsOfAuthors[authorNode.id].push(node.id);
            //     }
            // }
        });
};

exports.onCreateNode = ({node, actions, getNode}) => {
    const {createNodeField} = actions;
    fmImagesToRelative(node); // convert image paths for gatsby images

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({node, getNode});
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
      type MarkdownRemarkFrontmatter @infer {
        verticalImage: File @fileByRelativePath
        horizontalImage: File @fileByRelativePath

        followLinkedin: File @fileByRelativePath
        textImageSection: MarkdownRemarkFrontmatterTextImageSection
        textCardsSection: MarkdownRemarkFrontmatterTextCardsSection
        textImagesListSection: MarkdownRemarkFrontmatterTextImagesListSection
        assetCard1: MarkdownRemarkFrontmatterAssetCard1
        assetCard2: MarkdownRemarkFrontmatterAssetCard2
        assetCard3: MarkdownRemarkFrontmatterAssetCard3
        assetCard4: MarkdownRemarkFrontmatterAssetCard4
        assetCard5: MarkdownRemarkFrontmatterAssetCard5
      }
      
      type MarkdownRemarkFrontmatterTextImageSection {
        image: File @fileByRelativePath
      }
      
      type MarkdownRemarkFrontmatterTextCardsSection {
        cards: [MarkdownRemarkFrontmatterTextCardsSectionCards]
      }
      
      type MarkdownRemarkFrontmatterTextCardsSectionCards {
        image: File @fileByRelativePath
      }
      
      type MarkdownRemarkFrontmatterTextImagesListSection {
        images: [MarkdownRemarkFrontmatterTextImagesListSectionImages]
      }
      
      type MarkdownRemarkFrontmatterTextImagesListSectionImages {
        image: File @fileByRelativePath
      }
      
      type MarkdownRemarkFrontmatterAssetCard1 {
        icon: File @fileByRelativePath
      }
      type MarkdownRemarkFrontmatterAssetCard2 {
        icon: File @fileByRelativePath
      }
      type MarkdownRemarkFrontmatterAssetCard3 {
        icon: File @fileByRelativePath
      }
      type MarkdownRemarkFrontmatterAssetCard4 {
        icon: File @fileByRelativePath
      }
      type MarkdownRemarkFrontmatterAssetCard5 {
        icon: File @fileByRelativePath
      }
    `;
    createTypes(typeDefs);
};

exports.onPostBuild = async ({ graphql }) => {
    const result = await graphql(`
        {
            allSitePage {
                edges {
                    node {
                        path
                    }
                }
            }
        }
    `);

    if (result.errors) {
        throw result.errors;
    }

    const pages = result.data.allSitePage.edges.filter(edge => {
        const p = edge.node.path;
        return !p.startsWith('/dev-404-page') && !p.startsWith('/offline-plugin-app-shell-fallback');
    });

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
    .map(edge => {
        return `  <url>
    <loc>https://samagragovernance.in${edge.node.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapContent);
    console.log('Sitemap.xml generated successfully in public folder.');
};

