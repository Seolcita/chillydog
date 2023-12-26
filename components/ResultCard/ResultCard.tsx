import { ReactElement } from 'react';
import { Card, Typography, device } from 'sk-storybook';
import Image from 'next/image';

import { Result } from '../../hooks/use-result';
import * as S from './ResultCard.style';
import { setCardSize, titleColorMap } from './ResultCard.style';
import { titillium } from '../../styles/Fonts';
import { DeviceType, useWindowSize } from '../../hooks/use-window-resize';

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
        ariaLabel='result card'
        isPadded
        tabIndex={0}
        isInteractive={false}
        width={setCardSize(deviceType)}
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
              priority={true}
              draggable={false}
              tabIndex={0}
            />
            <Typography variant='textM' fontWeight='bold'>
              {name}
            </Typography>
          </S.AvatarBox>
          <S.ResultBox>
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
