import { ReactElement, ReactNode } from 'react';
import { Card, Typography } from 'sk-storybook';

import { ProgressBar } from '../ProgressBar/ProgressBar';
import * as S from './Questionnaire.styles';
import { Box } from '@mui/material';

interface QuestionnaireProps {
  currentStep: number;
  question: string;
  form: ReactNode;
}

export const Questionnaire = ({
  currentStep,
  question,
  form,
}: QuestionnaireProps): ReactElement => {
  return (
    <S.Container>
      <Card
        ariaLabel={`questionnaire card step ${currentStep}`}
        tabIndex={0}
        width={45}
        isPadded
        isInteractive={false}
      >
        <S.Contents tabIndex={0}>
          <ProgressBar totalSteps={5} currentStep={currentStep} />
          <Typography
            variant='headingXS'
            fontWeight='bold'
            margin={['lg', 'none', 'lg']}
          >
            {question}
          </Typography>
          <Box>{form}</Box>
        </S.Contents>
      </Card>
    </S.Container>
  );
};
