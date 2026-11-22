/**
 * Blog behaviors: the code halves of the behaviors of nick-blog. The schema
 * halves are in `profiles/default/behaviors`.
 * @module behaviors/blog
 */

// Type imports
import type { Knex } from '@plone/nick';

// Internal imports
import { findBlog, normalizeUid } from '../helpers/blog';

interface Document {
  uuid: string;
  path: string;
  json: {
    creators?: string[];
    blog_tags?: string[];
  };
}

/**
 * Uids of a list field, in the uuid format.
 * @method uids
 * @param {string[]} value Value of the field.
 * @returns {string[]} Uuids.
 */
function uids(value?: string[]): string[] {
  return Array.isArray(value)
    ? value.filter((uid) => typeof uid === 'string').map(normalizeUid)
    : [];
}

/**
 * `blog_info` behavior: marks a type as a blog, like `IBlogInfo` in
 * collective.blog. Content inside it belongs to that blog.
 * @constant blogInfo
 */
export const blogInfo = {};

/**
 * `blog_item` behavior: content which belongs to a blog (posts, authors and
 * tags). Indexes the uid of the nearest blog in `blog_uid`.
 * @constant blogItem
 */
export const blogItem = {
  /**
   * Uuid of the nearest blog
   * @method getBlogUid
   * @param {Knex.Transaction} trx Transaction object.
   * @returns {Promise<string | undefined>} Uuid of the blog.
   */
  getBlogUid: async function (
    this: Document,
    trx: Knex.Transaction,
  ): Promise<string | undefined> {
    return findBlog(this, trx);
  },
};

/**
 * `blog_post` behavior: the authors of a post, which are `Author` items
 * referenced by uid in `creators`.
 * @constant blogPost
 */
export const blogPost = {
  /**
   * Uuids of the authors
   * @method getBlogAuthorUids
   * @returns {string[]} Uuids of the authors.
   */
  getBlogAuthorUids: function (this: Document): string[] {
    return uids(this.json.creators);
  },

  /**
   * Titles of the authors, like the `post_authors` index of collective.blog
   * @method getPostAuthors
   * @param {Knex.Transaction} trx Transaction object.
   * @returns {Promise<string[]>} Titles of the authors.
   */
  getPostAuthors: async function (
    this: Document,
    trx: Knex.Transaction,
  ): Promise<string[]> {
    const authors = uids(this.json.creators);
    if (authors.length === 0) {
      return [];
    }
    const items = await trx('document')
      .select('uuid', 'json')
      .whereIn('uuid', authors)
      .andWhere({ type: 'Author', deleted: false });
    // Keep the order of the creators
    return authors
      .map((uid) => items.find((item: any) => item.uuid === uid))
      .filter((item) => item)
      .map((item: any) => item.json?.title || '');
  },
};

/**
 * `blog_tags` behavior: tags of the blog, which are `BlogTag` items
 * referenced by uid.
 * @constant blogTags
 */
export const blogTags = {
  /**
   * Uuids of the tags
   * @method getBlogTags
   * @returns {string[]} Uuids of the tags.
   */
  getBlogTags: function (this: Document): string[] {
    return uids(this.json.blog_tags);
  },
};
