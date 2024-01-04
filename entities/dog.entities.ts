import { QuestionnaireScreenName } from './questionnaire.entities';

export enum DogSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export interface Dog {
  id: string;
  ownerId: string;
  name: string;
  dogSize: DogSize;
  registrationStatus: string;
  screens?: Screen[];
  nextScreen?: QuestionnaireScreenName | null;
}
