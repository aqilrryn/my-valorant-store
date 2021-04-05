import tw, { css, styled } from 'twin.macro';

export const FormGroup = styled.div(() => [
  tw`
    flex flex-col
  `,
  css`
    margin-bottom: 1rem;

    &:last-of-type {
      margin-bottom: 0;
    }

    label {
      margin-bottom: 0.7rem;
    }
  `,
]);

export default FormGroup;
