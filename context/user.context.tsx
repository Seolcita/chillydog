import { ReactNode, createContext, useState } from 'react';
import { User } from '../entities/user.entities';
import { QuestionnaireScreenName } from '../entities/questionnaire.entities';

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

  function setUserHandler(user: User | null): void {
    setUserData(user);
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
