import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// The absolute path to the blogs directory
const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  category?: string;
  content: string;
}

/**
 * Gets all blog post slugs safely
 */
export function getPostSlugs() {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }
  return fs.readdirSync(blogsDirectory).filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
}

/**
 * Fetches a single blog post by its slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx?$/, '');
    const fullPath = path.join(blogsDirectory, `${realSlug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || null,
      category: data.category || 'General',
      content,
    };
  } catch (e) {
    console.error(`Error reading blog post ${slug}`, e);
    return null;
  }
}

/**
 * Gets all posts sorted by newest first
 */
export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
