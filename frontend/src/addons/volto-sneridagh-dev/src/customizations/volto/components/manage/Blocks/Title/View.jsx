import { FormattedDate } from '@plone/volto/components';

const TitleBlockView = ({ properties, metadata }) => {
  return (
    <div className="documentFirstHeading">
      <h1>{(metadata || properties)['title'] || ''}</h1>
      <div className="byline">
        by Víctor Fernández de Alba on{' '}
        <FormattedDate
          date={properties.effective || properties.modified}
          locale="es"
        />
      </div>
    </div>
  );
};

export default TitleBlockView;
