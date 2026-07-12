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
          backgroundColor: '#090d16',
          border: '1px solid var(--color-ash-mist)', 
          color: '#38bdf8', 
          fontFamily: 'Consolas, Monaco, "Courier New", Courier, monospace', 
          fontSize: '12px',
          textAlign: 'left',
          borderRadius: '4px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Terminal Title Bar */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', alignItems: 'center' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308', display: 'inline-block' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
            <span style={{ marginLeft: '12px', fontSize: '10px', color: 'var(--color-felt-gray)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>diagnostics.sh</span>
          </div>
          {/* Terminal output lines */}
          <div style={{ lineHeight: '1.6' }}>
            <div style={{ color: '#64748b' }}>01  // COMPONENT INITIALIZATION RUNTIME</div>
            <div style={{ color: '#ef4444' }}>02  [ERROR] WebGL context loss or execution exception in sub-canvas.</div>
            <div style={{ color: '#f59e0b' }}>03  [WARN] Fallback layout sequence initiated.</div>
            <div>04  <span style={{ color: '#22c55e' }}>$</span> clear && load-fallback-elements</div>
            <div style={{ color: '#38bdf8' }}>05  Execution completed. Display output recovery successful.</div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
