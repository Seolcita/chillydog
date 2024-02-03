import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

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
      onClick={() => {
        router.push(redirectUrl);
      }}
      aria-label={ariaLabel}
    >
      <CloseOutlinedIcon style={{ fontSize: '2rem' }} />
    </S.CloseButton>
  );
};
