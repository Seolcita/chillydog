import { ReactNode, createContext, useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { User } from '../entities/user.entities';

interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: (user: User | null) => {},
  isLoading: true,
  isAuthenticated: false,
  refreshUser: () => {},
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [trigger, setTrigger] = useState(0);

  const router = useRouter();

  function setUserHandler(user: User | null): void {
    setUserData(user);
    setIsAuthenticated(user !== null);
    setIsLoading(false);
  }

  const refreshUser = (): void => {
    setTrigger((prevTrigger) => prevTrigger + 1);
  };

  const context: UserContextValue = {
    user: userData,
    setUser: setUserHandler,
    isLoading,
    isAuthenticated,
    refreshUser,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;
