import tw, { styled } from 'twin.macro';

export const Error = styled.span(() => [
  tw`
    text-red-400 text-sm mt-1 text-left
  `,
]);

export default Error;
