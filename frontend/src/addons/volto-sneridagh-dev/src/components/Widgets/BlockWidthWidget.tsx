import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import ButtonsWidget, { ButtonsWidgetProps } from './ButtonsWidget';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageNarrowSVG from '@plone/volto/icons/image-narrow.svg';
import imageWideSVG from '@plone/volto/icons/image-wide.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';
import type { IntlShape } from 'react-intl';

const messages = defineMessages({
  left: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  right: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  center: {
    id: 'Center',
    defaultMessage: 'Center',
  },
  narrow: {
    id: 'Narrow',
    defaultMessage: 'Narrow',
  },
  default: {
    id: 'Wide',
    defaultMessage: 'Wide',
  },
  full: {
    id: 'Full',
    defaultMessage: 'Full',
  },
});

export const defaultActionsInfo = ({ intl }: { intl: IntlShape }) => ({
  center: [imageFitSVG, intl.formatMessage(messages.center)],
  narrow: [imageNarrowSVG, intl.formatMessage(messages.narrow)],
  default: [imageWideSVG, intl.formatMessage(messages.default)],
  full: [imageFullSVG, intl.formatMessage(messages.full)],
});

const DEFAULT_ACTIONS = [
  {
    style: {
      '--block-width': 'var(--narrow-container-width)',
    },
    name: 'narrow',
    label: 'Narrow',
  },
  {
    style: {
      '--block-width': 'var(--default-container-width)',
    },
    name: 'default',
    label: 'Default',
  },
  {
    style: {
      '--block-width': 'var(--layout-container-width)',
    },
    name: 'full',
    label: 'Layout',
  },
];

const BlockWidthWidget: React.FC<ButtonsWidgetProps> = (props) => {
  const intl = useIntl();

  const { actions = DEFAULT_ACTIONS, actionsInfoMap, filterActions } = props;
  let filteredActions;
  if (filterActions) {
    filteredActions = actions.filter((action) =>
      filterActions.includes(action.name),
    );
  } else {
    filteredActions = actions;
  }

  const actionsInfo = {
    ...defaultActionsInfo({ intl }),
    ...actionsInfoMap,
  };

  return (
    <ButtonsWidget
      {...props}
      actions={filteredActions}
      actionsInfoMap={actionsInfo}
    />
  );
};

export default BlockWidthWidget;
