import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import CancelIcon from '@mui/icons-material/Cancel';

import * as S from './CloseButton.styles';

interface CloseButtonProps {
  redirectUrl: string;
  ariaLabel: string;
}

export const CloseButton = ({
  redirectUrl,
  ariaLabel,
}: CloseButtonProps): ReactElement => {
  const router = useRouter();
  return (
    <S.CloseButton
      onClick={() => router.push(redirectUrl)}
      aria-label={ariaLabel}
    >
      <CancelIcon fontSize='large' />
    </S.CloseButton>
  );
};
