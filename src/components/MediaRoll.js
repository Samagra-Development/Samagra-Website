import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";

const MediaFilter = ({ mediaHouses, onFilterChange }) => {
  const [mediaHouse, setMediaHouse] = useState("");
  const [sortBy, setSortBy] = useState(""); // Default to "newest"

  const handleMediaHouseChange = (e) => {
    const newMediaHouse = e.target.value;
    setMediaHouse(newMediaHouse);
    onFilterChange({ mediaHouse: newMediaHouse, sortBy });
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    onFilterChange({ mediaHouse, sortBy: newSortBy });
  };

  const clearFilter = (filterType) => {
    if (filterType === "mediaHouse") {
      setMediaHouse("");
      onFilterChange({ mediaHouse: "", sortBy });
    }
    if (filterType === "sortBy") {
      setSortBy("");
      onFilterChange({ mediaHouse, sortBy: "" });
    }
  };

  return (
    <div className="filter-container">
      <div className="dropdown">
        {mediaHouse ? (
          <div className="selected-option">
            {mediaHouse}
            <button onClick={() => clearFilter("mediaHouse")}>×</button>
          </div>
        ) : (
          <select
            onChange={handleMediaHouseChange}
            value={mediaHouse}
          >
            <option value="">Media House</option>
            {mediaHouses.map((house, index) => (
              <option key={index} value={house}>
                {house}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Sort by filter */}
      <div className="dropdown">
        {sortBy ? (
          <div className="selected-option">
            {sortBy === "oldest" ? "Oldest to Newest" : "Newest to Oldest"}
            <button onClick={() => clearFilter("sortBy")}>×</button>
          </div>
        ) : (
          <select onChange={handleSortChange} value={sortBy}>
            <option value="">Sort by</option>

            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
          </select>
        )}
      </div>
    </div>
  );
};

const MediaRollItem = ({ data }) => {
  return (
    <a href={data.link} target="_blank" className="col-sm-6 col-xs-12">
      <div className="blog-wrapper">
        <div
          className="image-wrapper"
          style={{
            backgroundImage: `url(${
              !!(data.image && data.image.childImageSharp)
                ? data.image.childImageSharp.fluid.src
                : data.image
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="content-wrapper">
          <div className="heading" style={{ minHeight: "48px" }}>
            {data.title}
          </div>
          <div className="posted-on">
            {data.mediaHouse} on {data.date}
          </div>
          <div className="read-more">Read More</div>
        </div>
      </div>
    </a>
  );
};

const MediaRoll = ({ data }) => {
  const { allMarkdownRemark: mediaPageContent } = data;
  const media = mediaPageContent.edges;

  // Extract unique media houses for the dropdown
  const mediaHouses = Array.from(
    new Set(media.map((m) => m.node.frontmatter.mediaHouse))
  );

  const [filters, setFilters] = useState({
    mediaHouse: "",
    sortBy: "newest", // Default to "newest"
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters based on mediaHouse and then conditionally apply sorting
  const filteredMedia = media.filter((m) => {
    const { mediaHouse } = m.node.frontmatter;
    // Filter by mediaHouse only if a specific mediaHouse is selected
    return filters.mediaHouse ? mediaHouse === filters.mediaHouse : true;
  });

  // Sort the filtered data based on the selected sortBy option
  const sortedMedia = filteredMedia.sort((a, b) => {
    const dateA = new Date(a.node.frontmatter.date);
    const dateB = new Date(b.node.frontmatter.date);
    return filters.sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div>
      <MediaFilter mediaHouses={mediaHouses} onFilterChange={handleFilterChange} />
      <div className="row">
        {sortedMedia.map((m) => (
          <MediaRollItem key={m.node.id} data={m.node.frontmatter} />
        ))}
      </div>
    </div>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query MediaRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "media-post" } } }
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
                id
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
                date
                linkButtonText
              }
            }
          }
        }
      }
    `}
    render={(data) => <MediaRoll data={data} />}
  />
);
