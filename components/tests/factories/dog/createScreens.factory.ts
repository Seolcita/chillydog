import {
  QuestionnaireScreen,
  QuestionnaireScreenName,
  ScreenName,
} from '../../../../entities/questionnaire.entities';

export function createScreens(completedStep: number): QuestionnaireScreen[] {
  const allScreens = [
    nameScreen,
    dogSizeScreen,
    heavyCoatScreen,
    coldAdaptScreen,
    locationScreen,
    avatarSelectionScreen,
  ];

  return allScreens.slice(0, completedStep);
}

const nameScreen = {
  ['nameScreen' as ScreenName]: {
    step: 1,
    previousScreen: null,
    nextScreen: QuestionnaireScreenName.DOG_SIZE_SCREEN,
    isCompleted: true,
  },
};

const dogSizeScreen = {
  ['dogSizeScreen' as ScreenName]: {
    step: 2,
    previousScreen: QuestionnaireScreenName.NAME_SCREEN,
    nextScreen: QuestionnaireScreenName.HEAVY_COAT_SCREEN,
    isCompleted: true,
  },
};

const heavyCoatScreen = {
  ['heavyCoatScreen' as ScreenName]: {
    step: 3,
    previousScreen: QuestionnaireScreenName.DOG_SIZE_SCREEN,
    nextScreen: QuestionnaireScreenName.COLD_ADAPT_SCREEN,
    isCompleted: true,
  },
};

const coldAdaptScreen = {
  ['coldAdaptScreen' as ScreenName]: {
    step: 4,
    previousScreen: QuestionnaireScreenName.HEAVY_COAT_SCREEN,
    nextScreen: QuestionnaireScreenName.LOCATION_SCREEN,
    isCompleted: true,
  },
};

const locationScreen = {
  ['locationScreen' as ScreenName]: {
    step: 5,
    previousScreen: QuestionnaireScreenName.COLD_ADAPT_SCREEN,
    nextScreen: QuestionnaireScreenName.AVATAR_SELECTION_SCREEN,
    isCompleted: true,
  },
};

const avatarSelectionScreen = {
  ['avatarSelectionScreen' as ScreenName]: {
    step: 6,
    previousScreen: QuestionnaireScreenName.LOCATION_SCREEN,
    nextScreen: QuestionnaireScreenName.COMPLETION_SCREEN,
    isCompleted: true,
  },
};
