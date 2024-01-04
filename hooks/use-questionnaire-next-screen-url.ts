import { Dog } from '../entities/dog.entities';
import { QuestionnaireScreenName } from '../entities/questionnaire.entities';

export const QuestionnaireScreenMap: Record<QuestionnaireScreenName, string> = {
  NAME_SCREEN: 'name',
  DOG_SIZE_SCREEN: 'dog-size',
  HEAVY_COAT_SCREEN: 'heavy-coat',
  COLD_ADAPT_SCREEN: 'cold-adapt',
  AVATAR_SELECTION_SCREEN: 'avatar-selection',
  COMPLETION_SCREEN: 'completion',
};

export const useQuestionnaireNextScreenURL = (dog: Dog): string => {
  const screen = dog.nextScreen as keyof typeof QuestionnaireScreenMap;
  const nextScreen = QuestionnaireScreenMap[screen];

  return `/questionnaires/${nextScreen}?dogId=${dog.id}`;
};
