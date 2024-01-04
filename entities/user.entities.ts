import { Dog } from './dog.entities';

export interface User {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  dogs?: Dog[];
}
