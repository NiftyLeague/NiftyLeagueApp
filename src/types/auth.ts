export interface InitialLoginContextProps {
  isLoggedIn: boolean;
}

export type TokenContextType = InitialLoginContextProps & {
  logout: () => void;
};
