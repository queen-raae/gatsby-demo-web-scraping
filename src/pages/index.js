import React from "react";

const IndexPage = () => {
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
    </main>
  );
};

export default IndexPage;
