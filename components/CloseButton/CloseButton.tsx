import { ReactElement, useContext } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useRouter } from 'next/router';

import UserContext from '../../context/user.context';
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
  const { refreshUser } = useContext(UserContext);
  return (
    <S.CloseButton
      onClick={() => {
        router.push(redirectUrl);
        refreshUser();
      }}
      aria-label={ariaLabel}
    >
      <CloseOutlinedIcon style={{ fontSize: '2rem' }} />
    </S.CloseButton>
  );
};
