import type { ConfigType } from '@plone/registry';
import { LeadImageSlot } from './components/LeadImageSlot/LeadImageSlot';
import { ContentTypeCondition } from '@plone/volto/helpers/Slots';
import LogoImage from './sneridaghLogo.png';
import { CodeStylingSchema } from './components/Blocks/code/schema';
import BlockWidthWidget from './components/Widgets/BlockWidthWidget';
import type { BlockConfigBase } from '@plone/types';

// We extend the Content type to include the new fields from the ICTA behavior
declare module '@plone/types' {
  export interface Content {
    preview_image_link: Content;
    preview_caption_link: string;
  }

  export interface BlocksConfigData {
    codeBlock: BlockConfigBase;
  }

  export interface WidgetsConfigByWidget {
    blockWidth: React.ComponentType;
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

  config.settings.slate.toolbarButtons.push('code');

  config.registerComponent({
    name: 'LogoImage',
    component: LogoImage,
  });

  config.registerSlotComponent({
    slot: 'aboveContent',
    name: 'LeadImageSlot',
    component: LeadImageSlot,
    predicates: [ContentTypeCondition(['Post'])],
  });

  config.blocks.blocksConfig.leadimage.restricted = ({ properties }) =>
    !(
      properties.hasOwnProperty('image') ||
      properties.hasOwnProperty('preview_image') ||
      properties.hasOwnProperty('preview_image_link')
    );

  config.blocks.blocksConfig.codeBlock.defaultLanguage = 'tsx';
  config.blocks.blocksConfig.codeBlock.defaultStyle = 'dark';

  config.widgets.widget.blockWidth = BlockWidthWidget;
  config.blocks.blocksConfig.codeBlock.schemaEnhancer = CodeStylingSchema;

  return config;
};

export default applyConfig;
