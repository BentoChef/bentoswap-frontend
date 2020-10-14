import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getBentoChefContract } from '../bento/utils'
import useBento from './useBento'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const bentoChefContract = getBentoChefContract(bento)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(bentoChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, bentoChefContract, bento])

  useEffect(() => {
    if (account && bentoChefContract && bento) {
      fetchBalance()
    }
  }, [account, block, bentoChefContract, setBalance, bento])

  return balance
}

export default useEarnings
