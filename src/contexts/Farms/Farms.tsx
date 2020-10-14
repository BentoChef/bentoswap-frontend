import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useBento from '../../hooks/useBento'

import { bnToDec } from '../../utils'
import { getBentoChefContract, getEarned } from '../../bento/utils'
import { getFarms } from '../../bento/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const bento = useBento()
  const { account } = useWallet()

  const farms = getFarms(bento)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
