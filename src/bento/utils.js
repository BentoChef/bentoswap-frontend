import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getBentoChefAddress = (bento) => {
  return bento && bento.bentoChefAddress
}
export const getBentoAddress = (bento) => {
  return bento && bento.bentoAddress
}
export const getWethContract = (bento) => {
  return bento && bento.contracts && bento.contracts.weth
}

export const getBentoChefContract = (bento) => {
  return bento && bento.contracts && bento.contracts.bentoChef
}
export const getBentoContract = (bento) => {
  return bento && bento.contracts && bento.contracts.bento
}

export const getXBentoStakingContract = (bento) => {
  return bento && bento.contracts && bento.contracts.xBentoStaking
}

export const getFarms = (bento) => {
  return bento
    ? bento.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'bento',
          earnTokenAddress: bento.contracts.bento.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (bentoChefContract, pid) => {
  const { allocPoint } = await bentoChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await bentoChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (bentoChefContract, pid, account) => {
  return bentoChefContract.methods.pendingBento(pid, account).call()
}

export const getTotalLPWethValue = async (
  bentoChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  console.log(lpContract.options.address)
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that bentoChefContract owns
  const balance = await lpContract.methods
    .balanceOf(bentoChefContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(bentoChefContract, pid),
  }
}

export const approve = async (lpContract, bentoChefContract, account) => {
  return lpContract.methods
    .approve(bentoChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
      .approve(address, ethers.constants.MaxUint256)
      .send({ from: account })
}

export const getBentoSupply = async (bento) => {
  return new BigNumber(await bento.contracts.bento.methods.totalSupply().call())
}

export const getXBentoSupply = async (bento) => {
  return new BigNumber(await bento.contracts.xBentoStaking.methods.totalSupply().call())
}

export const stake = async (bentoChefContract, pid, amount, account) => {
  console.log(pid, 
    new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    console.log(bentoChefContract)
  return bentoChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (bentoChefContract, pid, amount, account) => {
  return bentoChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (bentoChefContract, pid, account) => {
  return bentoChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (bentoChefContract, pid, account) => {
  try {
    const { amount } = await bentoChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (bentoChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return bentoChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const enter = async (contract, amount, account) => {
  debugger
  return contract.methods
      .enter(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}

export const leave = async (contract, amount, account) => {
  return contract.methods
      .leave(
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      )
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
}
