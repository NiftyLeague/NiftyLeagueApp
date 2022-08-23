export interface InitialLoginContextProps {
  isLoggedIn: boolean;
}

export type TokenContextType = InitialLoginContextProps & {
  signMsg: () => Promise<string | null>;
  authToken: string | undefined;
};
