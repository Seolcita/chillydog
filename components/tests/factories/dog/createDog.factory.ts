import { Dog, DogSize } from '../../../../entities/dog.entities';
import { createDogAvatar } from './createDogAvatar.factory';
import { createScreens } from './createScreens.factory';
import { RegistrationStatus } from '../../../../entities/questionnaire.entities';

export function createDog(options: Partial<Dog> = {}): Dog {
  return {
    id: options.id || '987654321',
    ownerId: options.ownerId || '123456789',
    name: options.name || 'Dog Name',
    dogSize: options.dogSize || DogSize.SMALL,
    heavyCoat: options.heavyCoat || false,
    coldAdapt: options.coldAdapt || false,
    avatar: createDogAvatar(options.avatar),
    registrationStatus:
      options.registrationStatus || RegistrationStatus.COMPLETED,
    completedStep: options.completedStep || 6,
    totalSteps: options.totalSteps || 6,
    screens: createScreens(options.completedStep || 6) || [],
    nextScreen: options.nextScreen || null,
  };
}
