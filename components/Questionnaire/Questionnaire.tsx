import { ReactElement, ReactNode, useContext } from 'react';
import { Card, Typography } from 'sk-storybook';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

import { Notification } from '../Notification/Notification';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { CloseButton } from '../CloseButton/CloseButton';
import UserContext from '../../context/user.context';
import { Loader } from '../LineLoader/LineLoader';
import * as S from './Questionnaire.styles';

interface BaseQuestionnaireProps {
  question: string;
  form: ReactNode;
  errorMessage?: string;
  isLoading: boolean;
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
  errorMessage,
  isLoading,
}: QuestionnaireProps): ReactElement => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const isLocationScreen = router.pathname.includes('/edit/location');

  const editRedirectUrl = isLocationScreen
    ? `/main?userId=${user?.id}`
    : `/dog/${dogId}`;

  const redirectUrl = edit ? editRedirectUrl : `/main?userId=${user?.id}`;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {!isLoading && (
        <S.Container>
          <Card
            ariaLabel={`questionnaire card step ${currentStep}`}
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
          {errorMessage && (
            <Notification message={errorMessage} variant='error' />
          )}
        </S.Container>
      )}
    </>
  );
};
