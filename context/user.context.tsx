import { ReactNode, createContext, useState, useEffect, use } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { User } from '../entities/user.entities';

interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: (user: User | null) => {},
  isLoading: true,
  isAuthenticated: false,
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter();

  function setUserHandler(user: User | null): void {
    setUserData(user);
    setIsLoading(false);
  }

  const context: UserContextValue = {
    user: userData,
    setUser: setUserHandler,
    isLoading,
    isAuthenticated,
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = sessionStorage.getItem('accessToken');
      if (!accessToken) {
        router.push('/auth/signin');
      }

      axios
        .get(`http://localhost:3001/api/auth/login-status`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setIsAuthenticated(res.data.loggedIn);
          setUserData(res.data.user);
          sessionStorage.setItem('accessToken', res.data.user.accessToken);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;
