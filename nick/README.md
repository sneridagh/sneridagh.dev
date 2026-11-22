# Nick for sneridagh.dev

The [Nick](https://nick.docs.plone.org) backend of sneridagh.dev: the official
[`plone/nick`](https://github.com/plone/container-nick) image plus the
packages in `packages/`. It is published as
`ghcr.io/sneridagh/sneridagh-dev-nick` and deployed as the `nick` service of
the stack, at [nick.sneridagh.dev](https://nick.sneridagh.dev).

## Packages

| Package         | Profile                 | Description                                                                                         |
| --------------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| `sneridagh-dev` | `sneridagh-dev:default` | Site profile: the site root and the `admin` user. Depends on `@plone/nick:core` and `nick-blog:default`. |
| `nick-blog`     | `nick-blog:default`     | The features of [collective.blog](https://github.com/collective/collective.blog) for Nick.         |

The image installs `sneridagh-dev:default` (`PROFILES`). The `admin` user gets
the password in `NICK_ADMIN_PASSWORD` when the profile is installed, on the
first start with an empty database.

### nick-blog

| collective.blog                                     | nick-blog                                                                                     |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `BlogFolder`, `Post`, `Author`, `BlogTag` types     | The same types. A `Post` holds files and images, a `BlogFolder` pages, files, images and posts. |
| `collective.blog.blog_info` behavior                | `blog_info`: marks a type as a blog.                                                          |
| `collective.blog.tags` behavior                     | `blog_tags`: the `blog_tags` field, with the tags of the blog.                                |
| `IPost` schema (`creators`, `contributors`, `rights`) | `blog_post`: the same fields; `creators` are the uids of `Author` items.                    |
| `blog_uid` index and column                         | `blog_uid` index and metadata (`blog_item` behavior), the uid of the nearest blog.            |
| `post_authors` index and column                     | `post_authors` index and metadata, the titles of the authors.                                 |
| `blog_tags` index and column                        | `blog_tags` index and metadata, and a "Blog Tag" criterion for listings.                      |
| "Author" listing criterion (`Creator`)              | `blog_authors` index, an "Author" criterion with the authors of the blog.                     |
| `collective.blog.authors`, `collective.blog.tags` vocabularies | The same vocabularies, with the authors and tags of the current blog; tags have a `url`. |
| `@authors` service                                  | `@authors`, with `fullname` and the default `Plone` author.                                   |

Not ported yet:

- The authors and tags folders that collective.blog creates in a new blog,
  and the blog control panel that turns them off.
- The `authors` expansion in `@components`: Nick's components can't be
  extended by add-ons, so clients call `@authors`.
- The add permissions of collective.blog: Nick has one `Add` permission, so
  `Author` and `BlogTag` can be added anywhere and `Post` is only listed as
  addable in a `BlogFolder`.

## Development

Start Nick with PostgreSQL at http://localhost:8081, with the `admin` user and
the password `admin`:

```shell
docker compose up --build
```

After changing a package, rebuild with `docker compose up --build nick`.
Profiles are only installed on an empty database: remove it with
`docker compose down -v` to install them again.

## Configuration

See the [Nick deployment docs](https://nick.docs.plone.org/admin-guide/deployment)
for all variables. The stack sets these:

| Variable              | Value                                                   |
| --------------------- | ------------------------------------------------------- |
| `PORT`                | `8081`                                                  |
| `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | The `db-nick` service (Postgres 18) |
| `SECRET`              | Signs the authentication tokens. Required.             |
| `NICK_ADMIN_PASSWORD` | Password of `admin`, read on the first start.          |
| `BLOBS`               | `db`: files and images are stored in Postgres.          |
| `ALLOWED_ORIGINS`     | `https://nick.sneridagh.dev`                            |
