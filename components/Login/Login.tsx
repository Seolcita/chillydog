import { ReactElement } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { Button, Card, Typography } from 'sk-storybook';
import Lottie from 'lottie-react';

import LoginAnimation from '../../assets/login/login.json';
import { Preview } from '../Preview/Preview';
import * as S from './Login.styles';

const Login = (): ReactElement => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/google/login';
  };

  return (
    <S.Container>
      <Card
        tabIndex={0}
        isInteractive={false}
        isPadded
        ariaLabel='login section'
      >
        <S.CardContents>
          <S.LoginOptions>
            <S.TextContainer>
              <Typography variant='headingM' fontWeight='extraBold'>
                {`Login `}
                <PetsIcon fontSize='large' />
              </Typography>
            </S.TextContainer>
            <Button
              size='l'
              onClick={handleLogin}
              textColor='white'
              ariaLabel='Login button'
              bgColor='error'
            >
              Sign in with Google
            </Button>
          </S.LoginOptions>
          <S.LoginImage>
            <S.LottieContainer>
              <Lottie animationData={LoginAnimation} />
            </S.LottieContainer>
          </S.LoginImage>
        </S.CardContents>
      </Card>

      <Preview />
    </S.Container>
  );
};

export default Login;
