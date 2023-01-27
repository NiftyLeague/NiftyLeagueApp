// action - state management
import { LOGIN, LOGOUT } from './actions';
import { InitialLoginContextProps } from 'types/auth';

// ==============================|| ACCOUNT REDUCER ||============================== //

interface AccountReducerActionProps {
  type: string;
  payload?: InitialLoginContextProps;
}

export const initialAccountState: InitialLoginContextProps = {
  isLoggedIn: false,
};

const accountReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialAccountState,
  action: AccountReducerActionProps,
) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
