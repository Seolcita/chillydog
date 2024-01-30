import { SelectedAvatar } from '../../../Screens/AvatarSelection/AvatarSelectionForm';

export function createDogAvatar(
  options: Partial<SelectedAvatar> = {}
): SelectedAvatar {
  return {
    name: options.name || 'corgi',
    src: options.src || '/images/avatars/corgi.png',
  };
}
