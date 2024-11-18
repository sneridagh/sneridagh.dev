import config from '@plone/registry';
import applyAddonConfiguration from '@plone/registry/addons-loader';

export default function install() {
  applyAddonConfiguration(config);
  config.settings.apiPath =
    process.env.PLONE_API_PATH || 'http://localhost:8080/Plone';
  config.settings.internalApiPath =
    process.env.PLONE_INTERNAL_API_PATH || 'http://backend:8080/Plone';

  console.log('API_PATH is:', config.settings.apiPath);
  console.log(
    'INTERNAL_API_PATH is:',
    config.settings.internalApiPath || 'not set',
  );
  return config;
}
