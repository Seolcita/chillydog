import { ReactElement } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

import * as S from './Logo.styles';
import { lilita } from '../../styles/Fonts';
import { DeviceType, useWindowSize } from '../../hooks/use-window-resize';

export const Logo = (): ReactElement => {
  const { deviceType } = useWindowSize();
  const isMobile = deviceType === DeviceType.MOBILE;
  return (
    <Box display='flex' alignItems='center'>
      <Image
        src='/images/logo/logo.svg'
        alt='Logo'
        width={50}
        height={50}
        style={{ border: '0.2rem solid white', borderRadius: '50%' }}
      />
      <S.LogoText className={lilita.className} $isMobile={isMobile}>
        Chilly Dog
      </S.LogoText>
    </Box>
  );
};
