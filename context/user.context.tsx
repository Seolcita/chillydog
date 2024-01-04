import { ReactNode, createContext, useState } from 'react';

export enum RegistrationStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

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
export interface User {
  id: string;
  email: string;
  lastName: string;
  firstName: string;
  dogs?: Dog[];
}

interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: (user: User | null) => {},
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<User | null>(null);

  function setUserHandler(userData: Partial<User> | null): void {
    setUserData((prevUserData) => {
      if (prevUserData) {
        return { ...prevUserData, ...userData };
      }
      return null;
    });
  }

  const context: UserContextValue = {
    user: userData,
    setUser: setUserHandler,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;
