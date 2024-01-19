import { ReactElement } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { Button, Card, Typography } from 'sk-storybook';

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
            <iframe src='https://lottie.host/embed/dba8e544-225a-42d5-9ff7-6a39b954ff62/zPrQZvBKHV.json' />
          </S.LoginImage>
        </S.CardContents>
      </Card>

      <Preview />
    </S.Container>
  );
};

export default Login;
