/**
 * Authors vocabulary: the authors of the current blog, like
 * `collective.blog.authors`.
 * @module vocabularies/authors
 */

// Type imports
import type { Knex, Request, VocabularyTerm } from '@plone/nick';

// External imports
import { models } from '@plone/nick';

// Internal imports
import { findBlog } from '../helpers/blog';

/**
 * Returns the authors of the blog of the current document.
 * @method authors
 * @param {Request} req Request object.
 * @param {Knex.Transaction} trx Transaction object.
 * @returns {Promise<VocabularyTerm[]>} Array of terms.
 */
export async function authors(
  req: Request,
  trx: Knex.Transaction,
): Promise<VocabularyTerm[]> {
  const blog = await findBlog(req.document, trx);
  if (!blog) {
    return [];
  }
  const Catalog = models.get('Catalog');
  const items = await Catalog.fetchAllRestricted(
    { _blog_uid: blog, _portal_type: 'Author', deleted: false },
    { order: '_sortable_title' },
    trx,
    req,
  );
  return items.map((item: any) => ({
    token: item.UID,
    title: item.Title,
  }));
}
