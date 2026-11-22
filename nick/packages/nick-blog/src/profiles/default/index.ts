/**
 * Runtime registration of nick-blog.
 * @module profiles/default
 */

// External imports
import { behaviors, routes, vocabularies } from '@plone/nick';

// Internal imports
import { blogInfo, blogItem, blogPost, blogTags } from '../../behaviors/blog';
import authorsRoutes from '../../routes/authors';
import { authors } from '../../vocabularies/authors';
import { tags } from '../../vocabularies/tags';

export function init(): void {
  // Behaviors, the schema halves are in behaviors/
  behaviors.register('blog_info', blogInfo);
  behaviors.register('blog_item', blogItem);
  behaviors.register('blog_post', blogPost);
  behaviors.register('blog_tags', blogTags);

  // Vocabularies, with the names of collective.blog for the frontend
  vocabularies.register('collective.blog.authors', authors);
  vocabularies.register('collective.blog.tags', tags);

  // REST services: @authors
  routes.register(authorsRoutes);
}
