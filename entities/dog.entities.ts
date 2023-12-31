import { SelectedAvatar } from '../components/Screens/AvatarSelection/AvatarSelectionForm';
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
  heavyCoat: boolean;
  coldAdapt: boolean;
  avatar: SelectedAvatar;
  registrationStatus: string;
  screens?: Screen[];
  nextScreen?: QuestionnaireScreenName | null;
}
