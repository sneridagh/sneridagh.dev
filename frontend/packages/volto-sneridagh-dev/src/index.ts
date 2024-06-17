import type { ConfigType } from '@plone/registry';
import type {
  BlockConfigBase,
  Image,
  Content as PloneContent,
} from '@plone/types';
import { ContentTypeCondition } from '@plone/volto/helpers';
import { LeadImageSlot } from './components/LeadImageSlot/LeadImageSlot';
import LogoImage from './sneridaghLogo.png';
import { CodeStylingSchema } from './components/Blocks/code/schema';
import BlockWidthWidget from './components/Widgets/BlockWidthWidget';

declare module '@plone/types' {
  export interface Content {
    preview_image_link?: PloneContent;
    preview_image?: Image;
    preview_caption_link?: string;
  }

  export interface BlocksConfigData {
    codeBlock: BlockConfigBase & {
      defaultLanguage: string;
      defaultStyle: string;
    };
  }

  export interface WidgetsConfigByWidget {
    blockWidth: React.ComponentType<any>;
  }
}

const applyConfig = (config: ConfigType) => {
  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['en'],
    defaultLanguage: 'en',
    matomoUrlBase: 'https://analytics.sneridagh.dev/',
    matomoSiteId: '1',
  };

  config.settings.enableFatMenu = false;
  config.settings.contentMetadataTagsImageField = 'preview_image_link';

  // @ts-ignore
  config.settings.slate.toolbarButtons.push('code');

  config.registerComponent({
    name: 'LogoImage',
    // @ts-ignore
    component: LogoImage,
  });

  config.registerSlotComponent({
    slot: 'aboveContent',
    name: 'LeadImageSlot',
    component: LeadImageSlot,
    predicates: [ContentTypeCondition(['Post'])],
  });

  config.blocks.blocksConfig.codeBlock.defaultLanguage = 'tsx';
  config.blocks.blocksConfig.codeBlock.defaultStyle = 'dark';

  config.widgets.widget.blockWidth = BlockWidthWidget;
  config.blocks.blocksConfig.codeBlock.schemaEnhancer = CodeStylingSchema;

  return config;
};

export default applyConfig;
