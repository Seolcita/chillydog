import { ReactElement } from 'react';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { Button, Card, Typography } from 'sk-storybook';

import * as S from './Login.styles';
import { useWindowSize } from '../../hooks/use-window-resize';
import { DeviceType, useDeviceType } from '../../hooks/use-device-type';

interface LoginProps {
  providers:
    | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    | never[];
}

const Login = ({ providers }: LoginProps): ReactElement => {
  const width = useWindowSize();
  const isMobile = useDeviceType(width) === DeviceType.MOBILE;

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
            {Object.values(providers).map((provider) => (
              <Button
                key={provider.name}
                size='l'
                onClick={() => signIn(provider.id)}
                textColor='white'
                ariaLabel='Login button'
                margin={['none', 'none', 'md']}
                bgColor='error'
              >
                Sign in with {provider.name}
              </Button>
            ))}
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
