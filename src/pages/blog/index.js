import React from "react";

import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import backgroundImage from "../../img/blog-header-bg.jpg";
export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className={"base-banner-image"}>
          <img
            alt="banner-image"
            src={backgroundImage}
            width={"100%"}
            className="banner-image"
          />
          <div className="slider-content">
            <div className="title">Blog</div>
          </div>
        </div>
        <section className="section">
          <div className="container-fluid">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
