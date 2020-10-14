import React from 'react'
import styled from 'styled-components'
import Footer from '../Footer'

import Img_Star from '../../assets/img/stars.png'

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <img src={Img_Star} alt="" style={{
      position: 'absolute',
      right: '0px',
      zIndex: -1,
    }}/>
    <StyledMain>{children}</StyledMain>
    <Footer />
  </StyledPage>
)

const StyledPage = styled.div``

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px);
  background: radial-gradient(130.66% 218.32% at -30.66% 78.14%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(128.82% 160.34% at 139.1% -60.23%, rgba(153, 38, 240, 0.53) 0%, rgba(153, 38, 240, 0) 100%), radial-gradient(91.63% 137.05% at 136.01% -50.11%, rgba(255, 255, 255, 0.67) 0%, #252948 0.01%, rgba(17, 18, 28, 0) 100%);
`

export default Page
