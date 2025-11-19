import { getCollection } from "astro:content";

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function getAllPosts() {
  const allPosts = await getCollection("blog", ({ data }) => data.published);
  return allPosts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map(post => ({
      id: post.slug,
      title: post.data.title,
      slug: post.slug,
      excerpt: post.data.excerpt,
      date: post.data.date.toISOString(),
      readTime: calculateReadTime(post.body),
      tags: post.data.tags,
      category: post.data.category,
      featured: post.data.featured,
      published: post.data.published,
      image: post.data.image,
    }));
}

export async function getFeaturedPosts(limit: number = 3) {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.featured).slice(0, limit);
}
