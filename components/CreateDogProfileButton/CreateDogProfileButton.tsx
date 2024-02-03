import { ReactElement, useContext } from 'react';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import * as S from './CreateDogProfileButton.styles';
import UserContext from '../../context/user.context';

const StyledIcon = styled(AddCircleRoundedIcon)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  width: 40,
  height: 40,
  borderRadius: '50%',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    color: '#1570EF',
    backgroundColor: 'white',
  },
});

export const CreateDogProfileButton = (): ReactElement => {
  const router = useRouter();
  const { setIsHidden } = useContext(UserContext);

  const handleClick = async () => {
    setIsHidden(true);
    router.push('/questionnaires/name');
  };

  return (
    <S.AddButton onClick={handleClick} aria-label='Create a dog profile'>
      <StyledIcon />
    </S.AddButton>
  );
};
