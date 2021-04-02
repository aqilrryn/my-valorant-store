import React from 'react'
import tw, { css, styled } from 'twin.macro'

export interface CardProps {
  name: string
  loading?: boolean
  thumbnail: string
  price: number
}

const Card: React.FC<CardProps> = ({ name, thumbnail, price }: CardProps) => {
  return (
    <Wrapper>
      <p tw="text-2xl ml-5 pt-5 mr-5 truncate">{name}</p>
      <Thumbnail src={thumbnail} alt="weapon skin" />
      <div tw="flex items-baseline mt-auto ml-5 pb-5">
        <span tw="text-xl">V</span>
        <p tw="ml-2 text-3xl">{price}</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div(() => [
  tw`
    flex flex-col rounded-3xl bg-primary
  `,
  css`
    width: 290px;
    height: 219px;
  `,
])

const Thumbnail = styled.img(() => [
  tw`
    relative
  `,
  css`
    width: 320px;
    max-width: 320px;
    height: auto;
    transform: rotate(12deg) translate(-50%, -50%);
    left: 50%;
    top: 50%;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.75));
  `,
])

export default Card
