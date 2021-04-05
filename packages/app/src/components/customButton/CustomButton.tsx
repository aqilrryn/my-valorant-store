import React from 'react';
import tw, { styled } from 'twin.macro';

export interface CustomButtonProps {
  loading?: boolean;
}

export const CustomButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    CustomButtonProps
> = ({ loading, children }) => {
  return <Container isLoading={loading ?? false}>{children}</Container>;
};

const Container = styled.button<{ isLoading: boolean }>`
  ${tw`
  border-primary border shadow-md bg-background rounded-2xl px-10 py-3
    hover:(bg-primary border-background)
    focus:(bg-primary border-background)
  `}
  ${({ isLoading }) => isLoading && tw`animate-pulse`}
`;

export default CustomButton;
