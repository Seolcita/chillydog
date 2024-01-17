import { ReactNode, createContext, useState, useEffect } from 'react';
import { User } from '../entities/user.entities';
import axios from 'axios';

interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: (user: User | null) => {},
  isLoading: true,
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function setUserHandler(user: User | null): void {
    setUserData(user);
    setIsLoading(false);
  }

  const context: UserContextValue = {
    user: userData,
    setUser: setUserHandler,
    isLoading: true,
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        axios
          .get(`http://localhost:3001/api/user?userId=${userId}`)
          .then((response) => {
            setUserHandler(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            setIsLoading(false);
          });
      }
    }
  }, []);

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;
