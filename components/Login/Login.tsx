import { ReactElement } from 'react';
import { Button, Card, Typography } from 'sk-storybook';

import * as S from './Login.styles';
import { useWindowSize, DeviceType } from '../../hooks/use-window-resize';

const Login = (): ReactElement => {
  const { deviceType } = useWindowSize();
  const isMobile = deviceType === DeviceType.MOBILE;

  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/google/login';
  };

  return (
    <S.LoginContainer>
      <Card
        tabIndex={0}
        height={isMobile ? 45 : 30}
        width={isMobile ? 30 : 65}
        isInteractive={false}
        ariaLabel='login section'
      >
        <S.CardContents>
          <S.LoginOptions>
            <Typography
              variant='headingM'
              fontWeight='extraBold'
              margin={['none', 'none', 'xl']}
            >
              Login
            </Typography>
            <Button
              size='l'
              onClick={handleLogin}
              textColor='white'
              ariaLabel='Login button'
              margin={['none', 'none', 'md']}
              bgColor='error'
            >
              Sign in with Google
            </Button>
          </S.LoginOptions>
          <S.LoginImage>
            <iframe src='https://lottie.host/embed/dba8e544-225a-42d5-9ff7-6a39b954ff62/zPrQZvBKHV.json' />
          </S.LoginImage>
        </S.CardContents>
      </Card>
    </S.LoginContainer>
  );
};

export default Login;
