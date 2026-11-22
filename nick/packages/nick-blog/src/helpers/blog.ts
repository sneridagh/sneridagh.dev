/**
 * Blog helpers.
 * @module helpers/blog
 */

// Type imports
import type { Knex } from '@plone/nick';

/**
 * Types which are blogs, besides types with the `blog_info` behavior.
 * @constant BLOG_TYPES
 */
export const BLOG_TYPES = ['BlogFolder'];

/**
 * Normalize a uid to the uuid format Nick uses: Plone uids have no dashes.
 * @method normalizeUid
 * @param {string} uid Uid.
 * @returns {string} Uuid.
 */
export function normalizeUid(uid: string): string {
  return uid.replace(
    /^([\da-f]{8})([\da-f]{4})([\da-f]{4})([\da-f]{4})([\da-f]{12})$/i,
    '$1-$2-$3-$4-$5',
  );
}

/**
 * Paths of a document and its parents, like `/`, `/blog`, `/blog/post`.
 * @method getParentPaths
 * @param {string} path Path of the document.
 * @returns {string[]} Paths.
 */
export function getParentPaths(path: string): string[] {
  const slugs = path.split('/').filter((slug) => slug !== '');
  return [
    '/',
    ...slugs.map((_slug, index) => `/${slugs.slice(0, index + 1).join('/')}`),
  ];
}

/**
 * Find the nearest blog of a document: the document itself or a parent whose
 * type is a blog type or has the `blog_info` behavior.
 * @method findBlog
 * @param {Object} document Document with a path.
 * @param {Knex.Transaction} trx Transaction object.
 * @returns {Promise<string | undefined>} Uuid of the blog.
 */
export async function findBlog(
  document: { path: string },
  trx: Knex.Transaction,
): Promise<string | undefined> {
  if (!document?.path) {
    return undefined;
  }
  const blog = await trx('document')
    .join('type', 'type.id', 'document.type')
    .select('document.uuid')
    .whereIn('document.path', getParentPaths(document.path))
    .andWhere((query: Knex.QueryBuilder) =>
      query
        .whereIn('type.id', BLOG_TYPES)
        .orWhereRaw(`type.schema->'behaviors' \\? 'blog_info'`),
    )
    .orderByRaw('length(document.path) desc')
    .first();
  return blog?.uuid;
}
