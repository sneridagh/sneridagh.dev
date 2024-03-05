import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import config from '@plone/volto/registry';

const LeadImageSlot = ({ data, properties }) => {
  const Image = config.getComponent({ name: 'Image' }).component;
  const imageField =
    properties.image ||
    properties.preview_image_link ||
    properties.preview_image;

  return (
    <p
      className={cx(
        'block image align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      {imageField && (
        <>
          {(() => {
            const image = (
              <Image
                className={cx({ 'full-width': data.align === 'full' })}
                item={imageField}
                imageField="image"
                sizes={config.blocks.blocksConfig.leadimage.getSizes(data)}
                alt={properties.image_caption || ''}
                responsive={true}
              />
            );
            if (data.href) {
              return (
                <UniversalLink
                  href={data.href}
                  openLinkInNewTab={data.openLinkInNewTab}
                >
                  {image}
                </UniversalLink>
              );
            } else {
              return image;
            }
          })()}
        </>
      )}
    </p>
  );
};
