import React from 'react';
import tw, { css, styled } from 'twin.macro';

import type { Skin } from 'types/weaponTypes';
import Logo from '../logo/Logo';

export interface CardProps {
  skin?: Skin;
  loading?: boolean;
}

export const Card: React.FC<CardProps> = ({ skin, loading }: CardProps) => {
  return (
    <Wrapper isLoading={loading ?? true}>
      {!loading ? (
        <>
          <p tw="text-2xl ml-5 pt-5 mr-5 truncate">{skin?.displayName}</p>
          {skin?.displayIcon ? (
            <Thumbnail src={skin?.displayIcon} alt="weapon skin" />
          ) : (
            <div tw="flex justify-center items-center flex-grow mt-px">
              <Logo variant="grayed" />
            </div>
          )}
          <div tw="flex items-baseline mt-auto ml-5 pb-5">
            <span tw="text-xl">V</span>
            <p tw="ml-2 text-3xl">{skin?.cost}</p>
          </div>
        </>
      ) : (
        <Logo variant="grayed" />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isLoading: boolean }>`
  ${tw`flex flex-col rounded-3xl bg-primary`}
  ${({ isLoading }) =>
    isLoading && tw`justify-center items-center animate-pulse`}
  ${css`
    width: 290px;
    height: 219px;
  `}
`;

const Thumbnail = styled.img(() => [
  tw`
    relative
  `,
  css`
    width: 320px;
    height: 135px;
    max-height: 100px;
    object-fit: contain;
    transform: rotate(12deg) translate(-50%, -50%);
    left: 50%;
    top: 50%;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.75));
  `,
]);

export default Card;
