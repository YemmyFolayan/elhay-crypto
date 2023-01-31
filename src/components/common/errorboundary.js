import { openMail } from 'helpers/hooks';
import React from 'react';
import { goBack } from 'routes/RedirectRoutes';
import { Success } from './success/success';
import errorsvg from 'assets/newerror.svg';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
    console.log('errror');
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="w-100 full_height d-flex align-items-center justify-content-center">
          <Success
            type="error"
            image={errorsvg}
            title="We're Sorry"
            subtitle="An error occured, if error still persists, please reach out to help@wevesti.com"
            button="Go back"
            onClick={() => goBack()}
            secondBtn={() => openMail('help@wevesti.com')}
            secondBtntext="help@wevesti.com"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
