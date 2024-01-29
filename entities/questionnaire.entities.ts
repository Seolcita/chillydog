export enum RegistrationStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum QuestionnaireScreenName {
  NAME_SCREEN = 'NAME_SCREEN',
  DOG_SIZE_SCREEN = 'DOG_SIZE_SCREEN',
  HEAVY_COAT_SCREEN = 'HEAVY_COAT_SCREEN',
  COLD_ADAPT_SCREEN = 'COLD_ADAPT_SCREEN',
  LOCATION_SCREEN = 'LOCATION_SCREEN',
  AVATAR_SELECTION_SCREEN = 'AVATAR_SELECTION_SCREEN',
  COMPLETION_SCREEN = 'COMPLETION_SCREEN',
}

export interface QuestionnaireScreenFields {
  step: number;
  previousScreen: QuestionnaireScreenName | null;
  nextScreen: QuestionnaireScreenName | null;
  isCompleted: boolean;
}

export type ScreenName =
  | 'nameScreen'
  | 'dogSizeScreen'
  | 'heavyCoatScreen'
  | 'coldAdaptScreen'
  | 'locationScreen'
  | 'avatarSelectionScreen';

export type QuestionnaireScreen = {
  [K in ScreenName]?: QuestionnaireScreenFields;
};

export type Option = {
  label: string;
  value: string | number | boolean;
};
