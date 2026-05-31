import { blogPostsKo, blogPostsEn } from '$lib/data/blog';
import { blogContentKo, blogContentEn } from '$lib/data/blog-content';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const idxKo = blogPostsKo.findIndex((p) => p.slug === params.slug);
  const idxEn = blogPostsEn.findIndex((p) => p.slug === params.slug);
  const idx = idxKo !== -1 ? idxKo : idxEn;
  if (idx === -1) error(404, 'Post not found');
  return {
    postKo: blogPostsKo[idx],
    postEn: blogPostsEn[idx],
    contentKo: blogContentKo[params.slug] ?? [],
    contentEn: blogContentEn[params.slug] ?? [],
    idx,
    prevKo: idx > 0 ? blogPostsKo[idx - 1] : null,
    prevEn: idx > 0 ? blogPostsEn[idx - 1] : null,
    nextKo: idx < blogPostsKo.length - 1 ? blogPostsKo[idx + 1] : null,
    nextEn: idx < blogPostsEn.length - 1 ? blogPostsEn[idx + 1] : null,
    total: blogPostsKo.length,
  };
}

export const prerender = true;
export function entries() {
  return blogPostsKo.map((p) => ({ slug: p.slug }));
}
