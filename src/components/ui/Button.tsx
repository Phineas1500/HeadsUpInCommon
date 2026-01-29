import { motion } from 'motion/react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const variants = {
  primary: 'bg-primary hover:bg-primary-light text-white',
  secondary: 'bg-surface-light hover:bg-surface-lighter text-text',
  danger: 'bg-danger hover:bg-primary-light text-white',
  ghost: 'bg-transparent hover:bg-crust text-text',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
