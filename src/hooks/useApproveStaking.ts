import {useCallback} from 'react'

import useBento from './useBento'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getBentoContract,
  getXBentoStakingContract
} from '../bento/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const lpContract = getBentoContract(bento)
  const contract = getXBentoStakingContract(bento)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
