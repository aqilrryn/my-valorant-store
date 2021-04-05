import tw, { css, styled, theme } from 'twin.macro';

export const Wrapper = styled.div(() => [
  tw`
    flex justify-center items-center
  `,
  css`
    max-width: ${theme`screens.md`};
  `,
]);

export default Wrapper;
