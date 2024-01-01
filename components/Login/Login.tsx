import { ReactElement, useContext } from 'react';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { Button, Card, Typography } from 'sk-storybook';

import * as S from './Login.styles';
import { useWindowSize, DeviceType } from '../../hooks/use-window-resize';
import axios from 'axios';
import UserContext from '../../context/user.context';

// interface LoginProps {
//   providers:
//     | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
//     | never[];
// }

const Login = (): ReactElement => {
  const { deviceType } = useWindowSize();
  const isMobile = deviceType === DeviceType.MOBILE;
  const userCtx = useContext(UserContext);

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
        isPadded
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
              // onClick={() => signIn(provider.id)}
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
