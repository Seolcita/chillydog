import { ReactElement } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

import * as S from './Logo.styles';
import { lilita } from '../../styles/Fonts';

export const Logo = (): ReactElement => {
  return (
    <Box display='flex' alignItems='center'>
      <Image
        src='/images/logo/logo.svg'
        alt='An logo image'
        width={50}
        height={50}
        style={{ border: '0.2rem solid white', borderRadius: '50%' }}
      />
      <S.LogoText className={lilita.className}>Chilly Dog</S.LogoText>
    </Box>
  );
};
