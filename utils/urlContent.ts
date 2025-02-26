import * as cheerio from "cheerio";

export const extractContentFromURL = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch URL: ${url}`);

    const html = await response.text();

    const $ = cheerio.load(html);

    $("script, style, nav, footer, header, aside").remove();

    const title = $("title").text().trim() || "";

    let content = $("main, article, #content, .content").text();

    if (!content || content.length < 200) {
      content = $("body").text();
    }

    const textContent = content.replace(/\s+/g, " ").trim().substring(0, 8000); // Limit content to avoid token limits

    const contentSummary =
      textContent.length > 4000
        ? textContent.substring(0, 4000) + "..."
        : textContent;

    return {
      title,
      contentSummary,
    };
  } catch (error) {
    console.error("Error extracting content:", error);
    return null;
  }
};
