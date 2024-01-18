import Image from 'next/image';
import { Card } from 'sk-storybook';
import { ReactElement } from 'react';

import { DeviceType, useWindowSize } from '../../hooks/use-window-resize';
import * as S from './Preview.styles';

export const Preview = (): ReactElement => {
  const { deviceType } = useWindowSize();
  const isMobile = deviceType === DeviceType.MOBILE;
  const previewImage = isMobile ? 'mobile-preview' : 'preview';

  return (
    <S.Container>
      <Card tabIndex={0} isInteractive={false} ariaLabel='login section'>
        <S.CardContents>
          <S.PreviewImage>
            <Image
              src={`/images/login/${previewImage}.png`}
              width={isMobile ? 300 : 520}
              height={isMobile ? 300 : 300}
              alt='app preview'
            />
          </S.PreviewImage>
        </S.CardContents>
      </Card>
    </S.Container>
  );
};
