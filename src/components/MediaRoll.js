import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

const MediaFilter = ({
  mediaHouses,
  programs,
  domains,
  onFilterChange,
  sorting,
  mediaHouseFilter,
  programFilter,
  domainFilter,
}) => {
  const [mediaHouse, setMediaHouse] = useState("");
  const [program, setProgram] = useState("");
  const [domain, setDomain] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const handleMediaHouseChange = (e) => {
    const newMediaHouse = e.target.value;
    setMediaHouse(newMediaHouse);
    onFilterChange({ mediaHouse: newMediaHouse, program, domain, sortBy });
  };

  const handleProgramChange = (e) => {
    const newProgram = e.target.value;
    setProgram(newProgram);
    onFilterChange({ mediaHouse, program: newProgram, domain, sortBy });
  };

  const handleDomainChange = (e) => {
    const newDomain = e.target.value;
    setDomain(newDomain);
    onFilterChange({ mediaHouse, program, domain: newDomain, sortBy });
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    onFilterChange({ mediaHouse, program, domain, sortBy: newSortBy });
  };

  const clearFilter = (filterType) => {
    if (filterType === "mediaHouse") setMediaHouse("");
    if (filterType === "program") setProgram("");
    if (filterType === "domain") setDomain("");
    if (filterType === "sortBy") setSortBy("");
    onFilterChange({
      mediaHouse: filterType === "mediaHouse" ? "" : mediaHouse,
      program: filterType === "program" ? "" : program,
      domain: filterType === "domain" ? "" : domain,
      sortBy: filterType === "sortBy" ? "newest" : sortBy,
    });
  };

  return (
    <div className="filter-container">
      {mediaHouseFilter && (
        <div className="dropdown">
          {mediaHouse ? (
            <div className="selected-option">
              {mediaHouse}
              <button onClick={() => clearFilter("mediaHouse")}>×</button>
            </div>
          ) : (
            <select onChange={handleMediaHouseChange} value={mediaHouse}>
              <option value="">Media House</option>
              {mediaHouses.map((house, index) => (
                <option key={index} value={house}>
                  {house}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
      {programFilter && (
        <div className="dropdown">
          {program ? (
            <div className="selected-option">
              {program}
              <button onClick={() => clearFilter("program")}>×</button>
            </div>
          ) : (
            <select onChange={handleProgramChange} value={program}>
              <option value="">Program</option>
              {programs.map((program, index) => (
                <option key={index} value={program}>
                  {program}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
      {domainFilter && (
        <div className="dropdown">
          {domain ? (
            <div className="selected-option">
              {domain}
              <button onClick={() => clearFilter("domain")}>×</button>
            </div>
          ) : (
            <select onChange={handleDomainChange} value={domain}>
              <option value="">Domain</option>
              {domains.map((domain, index) => (
                <option key={index} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
      {sorting && (
        <div className="dropdown">
          {sortBy ? (
            <div className="selected-option">
              {sortBy === "oldest" ? "Oldest to Newest" : "Newest to Oldest"}
              <button onClick={() => clearFilter("sortBy")}>×</button>
            </div>
          ) : (
            <select onChange={handleSortChange} value={sortBy}>
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          )}
        </div>
      )}
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
              data.image?.childImageSharp
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

const MediaRoll = () => {
  const data = useStaticQuery(graphql`
    query MediaRollAndPageQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "media-post" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              projectId
              author
              link
              tag
              mediaHouse
              image {
                childImageSharp {
                  fluid(maxWidth: 640, quality: 64) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              date
            }
          }
        }
      }
      markdownRemark(frontmatter: { templateKey: { eq: "media-page" } }) {
        frontmatter {
          sorting
          mediaHouseFilter
          programFilter
          domainFilter
        }
      }
    }
  `);

  const mediaPageContent = data.markdownRemark.frontmatter;
  const media = data.allMarkdownRemark.edges;

  const mediaHouses = Array.from(
    new Set(media.map((m) => m.node.frontmatter.mediaHouse))
  );
  const programs = Array.from(
    new Set(media.map((m) => m.node.frontmatter.projectId))
  );
  const domains = Array.from(new Set(media.map((m) => m.node.frontmatter.tag)));

  const [filters, setFilters] = useState({
    mediaHouse: "",
    program: "",
    domain: "",
    sortBy: "newest",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredMedia = media
    .filter((m) => {
      const { mediaHouse, projectId, tag } = m.node.frontmatter;
      return (
        (filters.mediaHouse ? mediaHouse === filters.mediaHouse : true) &&
        (filters.program ? projectId === filters.program : true) &&
        (filters.domain ? tag === filters.domain : true)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.node.frontmatter.date);
      const dateB = new Date(b.node.frontmatter.date);
      return filters.sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div>
      <MediaFilter
        mediaHouses={mediaHouses}
        programs={programs}
        domains={domains}
        onFilterChange={handleFilterChange}
        domainFilter={mediaPageContent.domainFilter}
        programFilter={mediaPageContent.programFilter}
        mediaHouseFilter={mediaPageContent.mediaHouseFilter}
        sorting={mediaPageContent.sorting}
      />
      <div className="row">
        {filteredMedia.length > 0 ? (
          filteredMedia.map((m) => (
            <MediaRollItem key={m.node.id} data={m.node.frontmatter} />
          ))
        ) : (
          <div className="no-results">
            <p>No results found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaRoll;
