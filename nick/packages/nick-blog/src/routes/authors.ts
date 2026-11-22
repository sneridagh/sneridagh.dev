/**
 * Authors routes: the `@authors` service of collective.blog.
 * @module routes/authors
 */

// Type imports
import type { Json, Knex, Request, Route } from '@plone/nick';

// External imports
import { getRootUrl, getUrl, models } from '@plone/nick';

// Internal imports
import { normalizeUid } from '../helpers/blog';

/**
 * Types which have authors.
 * @constant AUTHOR_TYPES
 */
export const AUTHOR_TYPES = ['Post'];

/**
 * Name of the author of posts without authors.
 * @constant DEFAULT_AUTHOR
 */
export const DEFAULT_AUTHOR = 'Plone';

/**
 * Fields of an author, like the summary serializer of plone.restapi.
 * @constant SUMMARY_FIELDS
 */
export const SUMMARY_FIELDS = [
  '@id',
  '@type',
  'title',
  'review_state',
  'image_field',
  'image_scales',
];

/**
 * Get the authors of the current document.
 * @method getAuthors
 * @param {Request} req Request object.
 * @param {Knex.Transaction} trx Transaction object.
 * @param {boolean} expand Include the items.
 * @returns {Promise<Json>} Authors.
 */
export async function getAuthors(
  req: Request,
  trx: Knex.Transaction,
  expand = true,
): Promise<Json> {
  const result: Record<string, any> = { '@id': `${getUrl(req)}/@authors` };
  if (!expand || !AUTHOR_TYPES.includes(req.document.type)) {
    return result;
  }

  const creators: string[] = (req.document.json?.creators || [])
    .filter((uid: any) => typeof uid === 'string')
    .map(normalizeUid);
  let items: any[] = [];
  if (creators.length > 0) {
    const Catalog = models.get('Catalog');
    // Catalog entries serialize their metadata, which needs the indexes
    if (!req.indexes) {
      req.indexes = await models.get('Index').fetchAll({}, {}, trx);
    }
    const authors = await Catalog.fetchAllRestricted(
      { _UID: ['=', creators], _portal_type: 'Author', deleted: false },
      {},
      trx,
      req,
    );
    items = creators
      .map((uid) => authors.models.find((author: any) => author.UID === uid))
      .filter((author) => author)
      .map((author: any) => {
        const json: Record<string, any> = author.toJson(req);
        return {
          ...Object.fromEntries(
            SUMMARY_FIELDS.map((field) => [field, json[field] ?? null]),
          ),
          description: json.Description ?? '',
          fullname: json.title,
        };
      });
  }

  result.items =
    items.length > 0
      ? items
      : [
          {
            '@id': getRootUrl(req),
            fullname: DEFAULT_AUTHOR,
            description: '',
            image_scales: null,
          },
        ];
  return result as Json;
}

const routes: Route[] = [
  {
    op: 'get',
    view: '/@authors',
    permission: 'View',
    client: 'getAuthors',
    cache: 'content',
    handler: async (req: Request, trx: Knex.Transaction) => ({
      json: await getAuthors(req, trx),
    }),
  },
];

export default routes;
