import { User } from '../../../../entities/user.entities';

export function createUser(options: Partial<User> = {}): User {
  return {
    id: options.id || 'user987654321',
    email: options.email || 'test@test.com',
    lastName: options.lastName || 'LastName',
    firstName: options.firstName || 'FirstName',
    photoUrl: options.photoUrl || 'https://test.com/photo.jpg',
    location: options.location || 'Test Location',
    dogs: options.dogs || [],
    accessToken: 'accessToken12345',
  };
}
