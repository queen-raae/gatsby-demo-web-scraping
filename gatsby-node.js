const axios = require("axios");

exports.sourceNodes = async (gatsbyUtils) => {
  const { actions, createNodeId, createContentDigest, reporter } = gatsbyUtils;
  const { createNode } = actions;

  try {
    reporter.info("SOURCE CROWDCAST");

    const { data } = await axios.get("https://app.scrapingbee.com/api/v1", {
      params: {
        api_key: process.env.SCRAPING_BEE_API_KEY,
        url: "https://www.crowdcast.io/raae",
        wait_for: ".profile-name",
        extract_rules: {
          name: ".profile-name",
          webinars: {
            selector: ".event-tile",
            type: "list",
            output: {
              title: ".event-tile__title",
              path: {
                selector: "a",
                output: "@href",
              },
            },
          },
        },
      },
    });

    for (webinar of data.webinars) {
      reporter.info("Create CrowdcastWebinar for " + webinar.path);

      createNode({
        id: createNodeId(webinar.path),
        title: webinar.title,
        url: "https://www.crowdcast.io/" + webinar.path,
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
    reporter.info("SOURCE CROWDCAST Failed" + error.message);
  }
};
