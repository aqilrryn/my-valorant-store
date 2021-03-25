import React from 'react'
import tw, { styled } from 'twin.macro'
import Button from './components/button/Button'

const App: React.FC = () => (
  <Wrapper hasBackground={false}>
    <div tw="flex flex-col justify-center h-full gap-y-5">
      <Button variant="primary">Submit</Button>
      <Button variant="secondary">Cancel</Button>
      <Button isSmall>Close</Button>
    </div>
  </Wrapper>
)

const Wrapper = styled.div<{ hasBackground: boolean }>`
  ${tw`flex flex-col items-center justify-center h-screen`}
  ${({ hasBackground }) =>
    hasBackground && tw`bg-gradient-to-b from-electric to-ribbon`}
`

export default App
