import openai from "@/lib/openai";
import { extractContentFromURL } from "@/utils/urlContent";
import { isUserAuthorized } from "@/utils/validateUser";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await isUserAuthorized();
  if (!session) {
    return NextResponse.json(null, { status: 401, statusText: "Unauthorized" });
  }

  const body = await req.json();
  if (!body?.url) {
    return NextResponse.json(null, {
      status: 400,
      statusText: "Bad request",
    });
  }
  const content = await extractContentFromURL(body.url);

  if (!content) {
    return NextResponse.json(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const { title, contentSummary } = content;

  const prompt = `
    I need metadata for a bookmark. Here's te relevant information:

    URL: ${body.url}
    Original page title: ${title}
    Page content summary: ${contentSummary}

    Please analyze this and provide:
    - A concise, engaging title (max 15 words).
    - A concise description (max 40 words).
    - 5-7 relevant tags.

    Respond in JSON format:
    {
      "title": "...",
      "description": "...",
      "tags": ["...","...","..."]
    }
  `;

  const defaultResponse = {
    title,
    description: contentSummary.substring(0, 155),
    tags: undefined,
  };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const openaiRes = response.choices[0].message.content;

    if (openaiRes) {
      return NextResponse.json(JSON.parse(openaiRes));
    }

    return NextResponse.json(defaultResponse);
  } catch (e) {
    console.error(e);
    return NextResponse.json(defaultResponse);
  }
};
