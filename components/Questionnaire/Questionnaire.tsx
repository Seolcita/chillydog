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
        width={50}
        height={40}
        isPadded
      >
        <S.Contents tabIndex={0}>
          <ProgressBar totalSteps={6} currentStep={currentStep} />
          <Typography
            variant='headingXS'
            fontWeight='bold'
            margin={['xl', 'none']}
          >
            {question}
          </Typography>
          <Box marginTop='2rem'>{form}</Box>
        </S.Contents>
      </Card>
    </S.Container>
  );
};
