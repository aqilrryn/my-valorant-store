import React, { forwardRef } from 'react';
import tw, { styled } from 'twin.macro';

export type InputProps = {
  textarea?: boolean;
};

export const Input = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    InputProps
>(({ textarea, ...props }, ref) => {
  return textarea ? (
    <AreaContainer ref={ref as never} {...(props as never)} />
  ) : (
    <InputContainer ref={ref as never} {...(props as never)} />
  );
});

const AreaContainer = styled.input(() => [
  tw`
    border-primary border shadow-md bg-background rounded-2xl px-10 py-3 transition-colors
    hover:(bg-primary border-background)
    focus:(bg-primary border-background)
  `,
]);

const InputContainer = styled.input(() => [
  tw`
    border-primary border shadow-md bg-background rounded-2xl px-10 py-3 transition-colors
    hover:(bg-primary border-background)
    focus:(bg-primary border-background)
  `,
]);

export default Input;
