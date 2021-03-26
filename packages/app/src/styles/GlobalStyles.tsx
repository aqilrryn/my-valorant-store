import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  div#root {
    height: 100vh;
    min-width: 320px;
  }

	body {
		-webkit-tap-highlight-color: ${theme`colors.purple.500`};
    ${tw`antialiased`}
	}
`

const GlobalStyles: React.FC = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
)

export default GlobalStyles
