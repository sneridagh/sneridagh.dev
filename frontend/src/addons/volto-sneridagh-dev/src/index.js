// import 'prismjs/components/prism-jsx';
// import 'prismjs/components/prism-tsx';

// import { languages } from '@plonegovbr/volto-code-block';
import './one.scss';

const applyConfig = (config) => {
  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['en'],
    defaultLanguage: 'en',
    matomoUrlBase: 'https://sneridagh.dev/',
  };

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
