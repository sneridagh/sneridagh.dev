import { FormattedDate } from '@plone/volto/components';

const TitleBlockView = ({ properties, metadata }) => {
  if (properties['@type'] === 'Post') {
    return (
      <div className="documentFirstHeading">
        <h1>{(metadata || properties)['title'] || ''}</h1>
        <div className="byline">
          by Víctor Fernández de Alba on{' '}
          <FormattedDate date={properties.effective || properties.modified} />
        </div>
      </div>
    );
  } else {
    return (
      <h1 className="documentFirstHeading">
        {(metadata || properties)['title'] || ''}
      </h1>
    );
  }
};

export default TitleBlockView;
