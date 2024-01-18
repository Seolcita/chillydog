import { ReactElement } from 'react';
import { LineLoader } from 'sk-storybook';
import { FlexCenter } from '../common-styles';

export const Loader = (): ReactElement => {
  return (
    <FlexCenter>
      <LineLoader size='sm' />
    </FlexCenter>
  );
};
