import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`nsw-btn nsw-btn-${variant} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;