// project imports
import { UserProfile } from 'types/user-profile';

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
}

export type TokenContextType = InitialLoginContextProps & {
  logout: () => void;
};
