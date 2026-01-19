import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    className = '',
    children,
    ...props
}) => {
    return (
        <button
            className={`btn btn-${variant} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

const PrimaryButton: React.FC<ButtonProps> = ({
    className = '',
    children,
    ...props
}) => {
    return (
        <Button variant="primary" className={className} {...props}>
            {children}
        </Button>
    );
};

const SecondaryButton: React.FC<ButtonProps> = ({
    className = '',
    children,
    ...props
}) => {
    return (
        <Button variant="secondary" className={className} {...props}>
            {children}
        </Button>
    );
};

export { PrimaryButton, SecondaryButton };
