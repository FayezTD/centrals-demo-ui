import React from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingSpinnerProps {
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'lg';
  fullScreen?: boolean;
  message?: string;
  animation?: 'border' | 'grow';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  variant = 'success',
  size,
  fullScreen = true,
  message = 'Loading...',
  animation = 'border',
}) => {
  const spinnerSize = size === 'lg' ? { width: '3rem', height: '3rem' } : size === 'sm' ? { width: '1rem', height: '1rem' } : { width: '3rem', height: '3rem' };

  if (fullScreen) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-content">
          <Spinner
            animation={animation}
            variant={variant}
            role="status"
            style={spinnerSize}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          {message && <p className="loading-message mt-3">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <Spinner
        animation={animation}
        variant={variant}
        role="status"
        style={size ? spinnerSize : undefined}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {message && <span className="ms-2">{message}</span>}
    </div>
  );
};

export default LoadingSpinner;

