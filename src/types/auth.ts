export interface InitialLoginContextProps {
  isLoggedIn: boolean;
}

export type AuthTokenContextType = InitialLoginContextProps & {
  signMsg: () => Promise<string | null>;
  authToken: string | undefined;
};
