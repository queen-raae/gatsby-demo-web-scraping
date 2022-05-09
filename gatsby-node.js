const axios = require("axios");

const scrapeCrowdcast = async () => {
  try {
    const { data } = await axios.get("https://app.scrapingbee.com/api/v1", {
      params: {
        api_key: process.env.SCRAPING_BEE_API_KEY,
        url: "https://www.crowdcast.io/raae",
        // Wait for there to be at least one
        // non-empty .event-tile element
        wait_for: ".event-tile",
        extract_rules: {
          webinars: {
            // Lets create a list with data
            // extracted from the .event-tile element
            selector: ".event-tile",
            type: "list",
            // Each object in the list should
            output: {
              // have a title lifted from
              // the .event-tile__title element
              title: ".event-tile__title",
              // and a path lifted from
              // the href attribute of the first link element
              path: {
                selector: "a",
                output: "@href",
              },
              style: {
                selector: ".hero",
                output: "@style",
              },
            },
          },
        },
      },
    });

    return data;
  } catch (error) {
    throw new Error("ScrapingBee Error: " + error.message, { cause: error });
  }
};

exports.sourceNodes = async (gatsbyUtils) => {
  const { actions, createNodeId, createContentDigest, reporter } = gatsbyUtils;
  const { createNode } = actions;

  try {
    reporter.info("SOURCE CROWDCAST >> Begin");

    const data = await scrapeCrowdcast();

    for (const webinar of data.webinars) {
      reporter.info("Create CrowdcastWebinar for " + webinar.title);

      // Clean out the search params
      let url = new URL("https://www.crowdcast.io" + webinar.path);
      url = url.origin + url.pathname;

      // Clean out the cover image src
      const regex = new RegExp(/url\(\"(.*?)\"\)/g);
      const result = regex.exec(webinar.style);
      const coverSrc = result[1];

      createNode({
        id: createNodeId(url),
        title: webinar.title,
        url: url,
        coverSrc: coverSrc,
        rawScrape: webinar,
        internal: {
          type: `CrowdcastWebinar`,
          mediaType: `text/json`,
          content: JSON.stringify(webinar),
          contentDigest: createContentDigest(webinar),
        },
      });
    }
  } catch (error) {
    reporter.warn("SOURCE CROWDCAST >>> Failed >>> " + error.message);
  }
};
