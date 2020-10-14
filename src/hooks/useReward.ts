import { useCallback } from 'react'

import useBento from './useBento'
import { useWallet } from 'use-wallet'

import { harvest, getBentoChefContract } from '../bento/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const bento = useBento()
  const bentoChefContract = getBentoChefContract(bento)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(bentoChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, bento])

  return { onReward: handleReward }
}

export default useReward
