import { ReactElement } from 'react';
import { Button, Card, Typography } from 'sk-storybook';
import PetsIcon from '@mui/icons-material/Pets';
import Lottie from 'lottie-react';

import LoginAnimation from '../../assets/login/login.json';
import * as S from './Login.styles';
import axios from 'axios';

const Login = (): ReactElement => {
  const handleLogin = () => {
    window.location.href = `${process.env.END_POINT_URL}/auth/google/login`;

    // await axios
    //   .get(`${process.env.END_POINT_URL}/auth/google/login`)
    //   .then((res) => {
    //     console.log('response🚨', res.data);

    //     // if (typeof window !== 'undefined' && user) {
    //     //   sessionStorage.setItem('accessToken', user.accessToken);

    //     // }
    //     // user && router.push(`/main?userId=${user.id}`);
    //   })
    //   .catch((error) => {
    //     console.error('Error🤬🤬🤬🤬', error);
    //   });
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
