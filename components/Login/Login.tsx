import { ReactElement } from 'react';
import { Button, Card, Typography } from 'sk-storybook';
import PetsIcon from '@mui/icons-material/Pets';
import Lottie from 'lottie-react';

import LoginAnimation from '../../assets/login/login.json';
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
                {`Welcome   `}
                <PetsIcon fontSize='large' />
              </Typography>
            </S.TextContainer>
            <Button
              size='m'
              onClick={handleLogin}
              textColor='white'
              ariaLabel='Login button'
              bgColor='error'
              margin={['none', 'none', 'md', 'none']}
            >
              Sign in with Google
            </Button>
            <Button
              size='m'
              onClick={handleLogin}
              textColor='white'
              ariaLabel='Login button'
              bgColor='primary'
            >
              Sign up with Google
            </Button>
          </S.LoginOptions>
          <S.LoginImage>
            <S.LottieContainer>
              <Lottie animationData={LoginAnimation} />
            </S.LottieContainer>
          </S.LoginImage>
        </S.CardContents>
      </Card>
    </S.Container>
  );
};

export default Login;
