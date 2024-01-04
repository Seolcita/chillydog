import { User } from '../context/user.context';

export enum QuestionnaireScreenName {
  NAME_SCREEN = 'NAME_SCREEN',
  DOG_SIZE_SCREEN = 'DOG_SIZE_SCREEN',
}

export interface QuestionnaireScreenFields {
  step: number;
  previousScreen: QuestionnaireScreenName | null;
  nextScreen: QuestionnaireScreenName | null;
  isCompleted: boolean;
}
export interface QuestionnaireScreen {
  nameScreen: QuestionnaireScreenFields;
}
export interface Dog {
  id: string;
  ownerId: string;
  name: string;
  registrationStatus: string;
  screens?: Screen[];
}

export const QuestionnaireScreenMap: Record<QuestionnaireScreenName, string> = {
  NAME_SCREEN: 'name',
  DOG_SIZE_SCREEN: 'dog-size',
};

export const useQuestionnaireScreenDecider = (data: User) => {
  const { dogs } = data;
  const hasDog = dogs && dogs.length > 0;
  const hasCompletedDogRegistration =
    hasDog && dogs[0].registrationStatus === 'COMPLETED';

  if (!hasDog) {
    return 'NAME_SCREEN';
  } else if (!hasCompletedDogRegistration) {
    return 'DOG_SIZE_SCREEN';
  } else {
    return null;
  }
};
