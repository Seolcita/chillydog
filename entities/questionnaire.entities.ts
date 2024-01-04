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
}

export interface QuestionnaireScreenFields {
  step: number;
  previousScreen: QuestionnaireScreenName | null;
  nextScreen: QuestionnaireScreenName | null;
  isCompleted: boolean;
}

export interface QuestionnaireScreen {
  nameScreen: QuestionnaireScreenFields;
  dogSizeScreen: QuestionnaireScreenFields;
  heavyCoatScreen: QuestionnaireScreenFields;
  coldAdaptScreen: QuestionnaireScreenFields;
}
