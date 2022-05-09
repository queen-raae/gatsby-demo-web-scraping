import React from "react";
import { graphql } from "gatsby";

const IndexPage = ({ data }) => {
  return (
    <main>
      <header>
        <h1>
          <span role="img" aria-label="Red circle + women presenter emoji">
            🔴&nbsp;👩‍🏫&nbsp;
          </span>
          Web Scraping Demo
          <span role="img" aria-label="Women presenter + red circle emoji">
            &nbsp;👩‍🏫&nbsp;🔴
          </span>
        </h1>
        <p>
          Sourcing data into the Gatsby Data Layer from{" "}
          <a href="https://www.crowdcast.io/raae">Crowdcast</a> using
          ScrapingBee.
        </p>
        <p>
          Watch us code live with ScrapingBee co-founder{" "}
          <a href="https://twitter.com/PierreDeWulf">Pierre de Wulf</a> on{" "}
          <a href="https://youtu.be/MjcYzjYIFuI">YouTube</a>.
        </p>
      </header>

      <section>
        <header>
          <h2>Webinars</h2>
        </header>

        {data.allCrowdcastWebinar.nodes.map(({ title, url, coverSrc }) => {
          return (
            <article key={url}>
              <h3>{title}</h3>
              <img src={coverSrc} />
              <p>
                <a href={url}>Go to webinar</a>
              </p>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  {
    allCrowdcastWebinar {
      nodes {
        title
        url
        coverSrc
      }
    }
  }
`;
