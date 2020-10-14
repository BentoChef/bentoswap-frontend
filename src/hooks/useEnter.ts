import {useCallback} from 'react'

import useBento from './useBento'
import {useWallet} from 'use-wallet'

import {enter, getXBentoStakingContract} from '../bento/utils'

const useEnter = () => {
  const {account} = useWallet()
  const bento = useBento()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXBentoStakingContract(bento),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, bento],
  )

  return {onEnter: handle}
}

export default useEnter
