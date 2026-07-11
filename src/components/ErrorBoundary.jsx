import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught a rendering error:", error, errorInfo);
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo);
      } catch (err) {
        console.error("ErrorBoundary failed calling onError callback:", err);
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ 
          padding: '24px', 
          border: '1px solid var(--color-ash-mist)', 
          color: 'var(--color-felt-gray)', 
          fontFamily: 'var(--font-roobert)', 
          fontSize: '13px',
          textAlign: 'center'
        }}>
          Interactive component failed to load.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
