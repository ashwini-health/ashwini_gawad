/* eslint-disable @typescript-eslint/no-explicit-any */
// Notion API response shapes are deeply nested union types — typed as `any` at the boundary.
import { Client } from "@notionhq/client";

let _client: Client | null = null;

function getNotionClient(): Client {
  if (!_client) {
    _client = new Client({ auth: process.env.NOTION_API_KEY });
  }
  return _client;
}

export const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export interface NotionPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  category?: string;
}

/**
 * Fetches all published posts from the Notion database.
 * This is incredibly powerful as it filters out drafts automatically.
 */
export async function getPublishedNotionPosts(): Promise<NotionPost[]> {
  if (!DATABASE_ID) {
    console.warn("No NOTION_DATABASE_ID configured. Returning empty posts array.");
    return [];
  }

  try {
    const notion = getNotionClient();
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    } as any);

    return response.results.map((page: any) => {
      return {
        id: page.id,
        title: page.properties.Name.title[0]?.plain_text || "Untitled",
        slug: page.properties.Slug.rich_text[0]?.plain_text || page.id,
        date: page.properties.Date.date?.start || page.created_time,
        excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || "",
        category: page.properties.Category?.select?.name || "General",
        coverImage: page.cover?.external?.url || page.cover?.file?.url || null,
      };
    });
  } catch (error) {
    console.error("Error fetching Notion posts:", error);
    return [];
  }
}

/**
 * Fetches a single post by slug
 */
export async function getNotionPostBySlug(slug: string) {
  if (!DATABASE_ID) return null;

  try {
    const notion = getNotionClient();
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (!response.results.length) return null;

    const page: any = response.results[0];
    const mdblocks = await notion.blocks.children.list({
      block_id: page.id,
    });

    return {
      metadata: {
        id: page.id,
        title: page.properties.Name.title[0]?.plain_text || "Untitled",
        slug: page.properties.Slug.rich_text[0]?.plain_text || page.id,
        date: page.properties.Date.date?.start || page.created_time,
        excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || "",
        category: page.properties.Category?.select?.name || "General",
        coverImage: page.cover?.external?.url || page.cover?.file?.url || null,
      },
      blocks: mdblocks.results, // We will map these blocks to React components
    };
  } catch (error) {
    console.error(`Error fetching Notion post ${slug}:`, error);
    return null;
  }
}
