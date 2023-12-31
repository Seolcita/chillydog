import { Box } from '@mui/material';
import { Typography } from 'sk-storybook';
import Image from 'next/image';
import { ReactElement } from 'react';

export const Logo = (): ReactElement => {
  return (
    // TODO: Update logo when it is ready
    <Box display='flex' alignItems='center'>
      <Image
        src='/images/logo/logo.png'
        alt='An logo image'
        width={45}
        height={45}
      />
      <Typography
        variant='headingXS'
        color='white'
        fontWeight='bold'
        margin={['none', 'lg']}
      >
        Chilly Dog
      </Typography>
    </Box>
  );
};
