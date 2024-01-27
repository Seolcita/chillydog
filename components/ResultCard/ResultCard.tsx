import { ReactElement } from 'react';
import { Card, Typography } from 'sk-storybook';
import Image from 'next/image';

import { DeviceType } from '../../hooks/use-window-resize';
import { Result } from '../../hooks/use-result';
import { titillium } from '../../styles/Fonts';
import * as S from './ResultCard.style';

interface ResultCardProps {
  name: string;
  result: Result;
  avatarName: string;
  deviceType: DeviceType;
}

const ResultCard = ({
  name,
  result,
  avatarName,
  deviceType,
}: ResultCardProps): ReactElement => {
  return (
    <S.CardContainer>
      <Card
        isPadded
        isInteractive={false}
        hasBoxShadow={false}
        ariaLabel='result card'
      >
        <S.Contents>
          <S.AvatarBox>
            <Image
              src={`/images/avatars/${avatarName}.png`}
              width={80}
              height={80}
              alt={`${name} avatar`}
              style={{
                borderRadius: '10rem',
                transform: `scale(1.5)`,
              }}
              priority={false}
              draggable={false}
              tabIndex={0}
            />
            <Typography variant='textM' fontWeight='bold'>
              {name}
            </Typography>
          </S.AvatarBox>
          <S.ResultBox tabIndex={0}>
            <S.Title
              $point={result.point}
              $deviceType={deviceType}
              className={titillium.className}
            >
              {result.title}
            </S.Title>
            <Typography variant='textL'>{result.description}</Typography>
          </S.ResultBox>
        </S.Contents>
      </Card>
    </S.CardContainer>
  );
};

export default ResultCard;
export { ResultCard };
