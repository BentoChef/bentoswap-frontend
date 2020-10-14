import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useBento from './useBento'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getBentoChefContract } from '../bento/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const bentoChefContract = getBentoChefContract(bento)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      bentoChefContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, bentoChefContract, lpContract])

  useEffect(() => {
    if (account && bentoChefContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, bentoChefContract, lpContract])

  return allowance
}

export default useAllowance
