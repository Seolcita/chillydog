import { ReactElement } from 'react';
import { Button, Card, Typography } from 'sk-storybook';
import PetsIcon from '@mui/icons-material/Pets';
import Lottie from 'lottie-react';

import LoginAnimation from '../../assets/login/login.json';
import { lilita } from '../../styles/Fonts';
import * as S from './Login.styles';

const Login = (): ReactElement => {
  const handleLogin = () => {
    window.location.href = `${process.env.END_POINT_URL}/auth/google/login`;
  };

  return (
    <S.Container>
      <Card
        isPadded
        isInteractive={false}
        hasBoxShadow={false}
        ariaLabel='login section'
      >
        <S.CardContents>
          <S.LoginOptions>
            <S.TextContainer>
              <Typography variant='headingM' fontWeight='extraBold'>
                <span className={lilita.className}>{`Welcome   `}</span>
                <PetsIcon fontSize='large' />
              </Typography>
            </S.TextContainer>
            <Button
              size='m'
              onClick={handleLogin}
              textColor='white'
              ariaLabel='Login button'
              bgColor='error'
              fullWidth
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
              fullWidth
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
