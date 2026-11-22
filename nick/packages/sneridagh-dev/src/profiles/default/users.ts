/**
 * Users of the site profile: the admin user. Its password is read from
 * NICK_ADMIN_PASSWORD when the profile is installed (the first start on an
 * empty database), so it never ends up in the repository or the image.
 * @module profiles/default/users
 */

const password = process.env.NICK_ADMIN_PASSWORD;
if (!password) {
  throw new Error(
    'NICK_ADMIN_PASSWORD is required to install sneridagh-dev:default',
  );
}

export default {
  purge: false,
  users: [
    {
      id: 'admin',
      password,
      fullname: 'Admin',
      email: 'admin@sneridagh.dev',
      roles: ['Administrator'],
    },
  ],
};
