// import 'prismjs/components/prism-jsx';
// import 'prismjs/components/prism-tsx';
import LogoImage from './sneridaghLogo.png';

// import { languages } from '@plonegovbr/volto-code-block';
// import './one.scss';

const applyConfig = (config) => {
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

  // config.settings.codeBlock = {
  //   languages: {
  //     ...config.settings.codeBlock.languages,
  //     jsx: { label: 'jsx', language: languages.jsx },
  //     tsx: { label: 'tsx', language: languages.tsx },
  //   },
  // };

  return config;
};

export default applyConfig;
