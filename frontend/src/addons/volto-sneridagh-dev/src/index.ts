import type { ConfigData } from '@plone/types';
import LogoImage from './sneridaghLogo.png';

const applyConfig = (config: ConfigData) => {
  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['en'],
    defaultLanguage: 'en',
    matomoUrlBase: 'https://analytics.sneridagh.dev/',
    matomoSiteId: '1',
  };

  config.settings.enableFatMenu = false;

  config.registerComponent({
    name: 'LogoImage',
    component: LogoImage,
  });

  config.blocks.blocksConfig.leadimage.restricted = ({ properties }) =>
    !(
      properties.hasOwnProperty('image') ||
      properties.hasOwnProperty('preview_image') ||
      properties.hasOwnProperty('preview_image_link')
    );

  return config;
};

export default applyConfig;
