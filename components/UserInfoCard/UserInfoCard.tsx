import { ReactElement } from 'react';
import { Typography } from 'sk-storybook';
import Image from 'next/image';

import * as S from '../Screens/UserProfile/UserProfile.styles';
import { User } from '../../entities/user.entities';

interface UserInfoCardProps {
  user: User;
}

export const UserInfoCard = ({ user }: UserInfoCardProps): ReactElement => {
  return (
    <S.UserContainer tabIndex={0}>
      <S.AvatarContainer>
        <Image
          src={user.photoUrl}
          width={80}
          height={80}
          alt={`${user.firstName}'s avatar`}
          style={{
            borderRadius: '10rem',
            transform: 'scale(1.3)',
            margin: ' 3rem  0rem',
          }}
          priority={true}
          draggable={false}
        />
      </S.AvatarContainer>

      <S.Content>
        <Typography
          variant='textM'
          margin={['none', 'lg', 'none', 'none']}
          fontWeight='bold'
        >
          Name:
        </Typography>
        <S.Texts>
          <Typography variant='textM'>
            {user.firstName} {user.lastName}
          </Typography>
        </S.Texts>
      </S.Content>

      <S.Content>
        <Typography
          variant='textM'
          margin={['none', 'lg', 'none', 'none']}
          fontWeight='bold'
        >
          Email:
        </Typography>
        <S.Texts>
          <Typography variant='textM'>{user.email}</Typography>
        </S.Texts>
      </S.Content>
    </S.UserContainer>
  );
};
