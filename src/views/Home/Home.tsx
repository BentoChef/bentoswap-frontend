import React from 'react'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'

import Img_Star from '../../../src/assets/img/stars.png'

const Home: React.FC = () => {
  return (
    <Page>
      {/* <div style={{
        position: 'absolute',
        background: 'radial-gradient(130.66% 218.32% at -30.66% 78.14%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), radial-gradient(128.82% 160.34% at 139.1% -60.23%, rgba(153, 38, 240, 0.53) 0%, rgba(153, 38, 240, 0) 100%), radial-gradient(91.63% 137.05% at 136.01% -50.11%, rgba(255, 255, 255, 0.67) 0%, #252948 0.01%, rgba(17, 18, 28, 0) 100%)',
        width: '100%'
      }}>
        <img src={Img_Star} alt='' style={{
          right: 0
        }}/>
      </div> */}
      <PageHeader
        icon={<img src={chef} height={120} />}
        title="BentoChef is Ready"
        subtitle="Stake BentoSwap LP tokens to claim your very own tasty BENTO!"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      <StyledInfo>
        💡<b>Pro Tip</b>: BENTO-ETH UNI-V2 LP token pool yields TWICE more token
        rewards per block.
      </StyledInfo>
      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}
      >
        <Button text="🍜 See the Menu" to="/farms" variant="secondary" />
      </div>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

export default Home
