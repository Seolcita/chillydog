import { ReactElement, ReactNode, useContext } from 'react';
import { Card, Typography } from 'sk-storybook';
import { Box } from '@mui/material';

import { ProgressBar } from '../ProgressBar/ProgressBar';
import * as S from './Questionnaire.styles';
import { CloseButton } from '../CloseButton/CloseButton';
import UserContext from '../../context/user.context';

interface BaseQuestionnaireProps {
  question: string;
  form: ReactNode;
}

interface CurrentStepProps extends BaseQuestionnaireProps {
  currentStep: number;
  edit?: never;
  dogId?: never;
}

interface EditProps extends BaseQuestionnaireProps {
  dogId: string;
  edit: boolean;
  currentStep?: never;
  userId?: never;
}

type QuestionnaireProps = CurrentStepProps | EditProps;

export const Questionnaire = ({
  currentStep,
  question,
  form,
  edit,
  dogId,
}: QuestionnaireProps): ReactElement => {
  const { user } = useContext(UserContext);

  //TODO: Handle this properly
  if (!user) {
    return <div>loading...</div>;
  }

  const redirectUrl = edit ? `/dog/${dogId}` : `/main?userId=${user.id}`;

  return (
    <S.Container>
      <Card
        ariaLabel={`questionnaire card step ${currentStep}`}
        tabIndex={0}
        width={45}
        isPadded
        isInteractive={false}
      >
        <CloseButton
          redirectUrl={redirectUrl}
          ariaLabel='Close button for questionnaire'
        />
        <S.Contents tabIndex={0}>
          {currentStep && !edit && (
            <ProgressBar totalSteps={6} currentStep={currentStep} />
          )}
          <Typography
            variant='headingXS'
            fontWeight='bold'
            margin={['sm', 'none', 'lg']}
          >
            {question}
          </Typography>
          <Box>{form}</Box>
        </S.Contents>
      </Card>
    </S.Container>
  );
};
