import { Component, ErrorInfo } from 'react';
import { isMobileOnly } from 'react-device-detect';

import { DEBUG } from '@/constants/index';

type MyProps = {
  children: React.ReactNode;
};

type State = {
  error?: Error;
  errorInfo?: ErrorInfo;
};

class ErrorBoundary extends Component<MyProps, State> {
  constructor(props) {
    super(props);
    const state: State = {
      error: undefined,
      errorInfo: undefined,
    };
    this.state = state;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({ error, errorInfo });
    if (DEBUG) console.error(error.toString(), errorInfo.componentStack);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div style={{ padding: 60 }}>
          <h3>Something went wrong.</h3>
          {isMobileOnly ? (
            <h5>If the error persists, we recommend trying on a desktop.</h5>
          ) : null}
        </div>
      );
    }
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}

export default ErrorBoundary;
