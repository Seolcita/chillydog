import { Box } from '@mui/material';
import { Typography } from '@seolcita/s-storybook';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

export const Logo = (): ReactElement => {
  return (
    // TODO: Update logo when it is ready
    <Box display='flex' alignItems='center'>
      <Image
        src='/images/logo/logo.png'
        alt='An logo image'
        width={50}
        height={50}
      />
      <Box marginLeft='1rem'>
        <Typography variant='headingS' color='white' fontWeight='bold'>
          Chilly Dog
        </Typography>
      </Box>
    </Box>
  );
};
