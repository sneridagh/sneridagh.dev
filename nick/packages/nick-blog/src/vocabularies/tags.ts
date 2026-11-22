/**
 * Tags vocabulary: the tags of the current blog, like `collective.blog.tags`.
 * @module vocabularies/tags
 */

// Type imports
import type { Knex, Request, VocabularyTerm } from '@plone/nick';

// External imports
import { getRootUrl, models } from '@plone/nick';

// Internal imports
import { findBlog } from '../helpers/blog';

/**
 * Returns the tags of the blog of the current document, with their url.
 * @method tags
 * @param {Request} req Request object.
 * @param {Knex.Transaction} trx Transaction object.
 * @returns {Promise<VocabularyTerm[]>} Array of terms.
 */
export async function tags(
  req: Request,
  trx: Knex.Transaction,
): Promise<VocabularyTerm[]> {
  const blog = await findBlog(req.document, trx);
  if (!blog) {
    return [];
  }
  const Catalog = models.get('Catalog');
  // Like collective.blog, list all tags of the blog, also private ones
  const items = await Catalog.fetchAll(
    { _blog_uid: blog, _portal_type: 'BlogTag', deleted: false },
    { order: '_sortable_title' },
    trx,
  );
  return items.map((item: any) => ({
    token: item.UID,
    title: item.Title,
    url: `${getRootUrl(req)}${item.path}`,
  }));
}
