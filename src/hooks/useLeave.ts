import {useCallback} from 'react'

import useBento from './useBento'
import {useWallet} from 'use-wallet'

import {leave, getXBentoStakingContract} from '../bento/utils'

const useLeave = () => {
  const {account} = useWallet()
  const bento = useBento()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXBentoStakingContract(bento),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, bento],
  )

  return {onLeave: handle}
}

export default useLeave
