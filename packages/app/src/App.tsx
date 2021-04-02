import React from 'react'
import tw, { styled } from 'twin.macro'
import { gql, useQuery } from '@apollo/client'

// import Button from './components/button/Button'

const PLAYER_STORE = gql`
  query GetPlayerStore {
    store {
      skins {
        uuid
        displayName
        displayIcon
      }
    }
  }
`
const App: React.FC = () => {
  const { loading, error, data } = useQuery(PLAYER_STORE)

  if (loading) {
    return (
      <Wrapper>
        <p>Loading...</p>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper>
        <p>Error :(</p>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <ul>
        {data.store.skins.map(
          ({
            uuid,
            displayName,
            displayIcon,
          }: {
            uuid: string
            displayName: string
            displayIcon: string
          }) => (
            <li key={uuid}>
              <img src={displayIcon} alt={displayName} />
            </li>
          ),
        )}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.ul(() => [
  tw`
    flex flex-col justify-center items-center h-full max-h-full text-white bg-background
  `,
])

{
  /* <Wrapper hasBackground={false}>
    <div tw="flex flex-col justify-center h-full gap-y-5">
      <Button variant="primary">Submit</Button>
      <Button variant="secondary">Cancel</Button>
      <Button isSmall>Close</Button>
    </div>
  </Wrapper> */
}

/* const Wrapper = styled.div<{ hasBackground: boolean }>`
  ${tw`flex flex-col items-center justify-center h-screen`}
  ${({ hasBackground }) =>
    hasBackground && tw`bg-gradient-to-b from-electric to-ribbon`}
` */

export default App
