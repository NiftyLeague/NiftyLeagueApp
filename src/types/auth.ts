export interface InitialLoginContextProps {
  isLoggedIn: boolean;
}

export type TokenContextType = InitialLoginContextProps & {
  logout: () => void;
  signMsg: () => Promise<string | null>;
  authToken: string;
};
