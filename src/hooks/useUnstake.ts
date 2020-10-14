import { useCallback } from 'react'

import useBento from './useBento'
import { useWallet } from 'use-wallet'

import { unstake, getBentoChefContract } from '../bento/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const bento = useBento()
  const bentoChefContract = getBentoChefContract(bento)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(bentoChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, bento],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
