import { abiKventure, abiMasterpool, abiUsdt, abiV1, abiNoti, abiPOS } from '~/constants/version/index'

export const sendTransaction = async (
  functionName: string,
  dataInput: any,
  abiType: 'ecommerce' | 'noti' | 'usdt' = 'ecommerce',
  from?: string,
  server: 'chain' | 'client-full' | 'client-part' = 'chain'
) => {
  const { abiAddress, abi } = abiType === 'ecommerce' ? abiV1 : abiType === 'noti' ? abiNoti : abiUsdt

  const generateInput = (functionName: string, dataInput: any) => {
    const objFunction = abi.find((item) => item.type === 'function' && item.name === functionName)
    if (!objFunction) return

    const inputs = objFunction.inputs

    return inputs.map((item: any) => {
      const { name, type } = item

      if (type.includes('tuple')) {
        const data = dataInput[name]
        const components = item?.components
        let res

        if (type === 'tuple[]') {
          res = data.map((dataItem: any) =>
            components.map((componentsItem: any) => ({
              ...componentsItem,
              value: dataItem[componentsItem.name]
            }))
          )
        } else {
          res = components.map((compItem: any) => ({
            ...compItem,
            value: data[compItem.name]
          }))
        }

        return res
      }

      return {
        ...item,
        value: dataInput[name]
      }
    })
  }

  const convertRelatedAddress = (ra: string[]) => {
    return ra.map((item) => ({ address: item }))
  }

  const inputArray = generateInput(functionName, dataInput)

  const data = {
    from,
    functionName,
    isCall: true,
    type: 'transaction',
    to: abiAddress,
    feeType: abiType === 'usdt' ? 'sc' : 'commissionSign',
    inputArray,
    amount: '0',
    gas: 5000000,
    abiData: abi,
    server: server ? server : 'chain',
    relatedAddress: convertRelatedAddress([
      abiPOS.abiAddress,
      abiNoti.abiAddress,
      abiUsdt.abiAddress,
      abiKventure.address,
      abiMasterpool.address
    ])
  }
  console.log('send smartcontarct before', data)
  const res = await window.finSdk.sendTransaction(data)
  // console.log('send smartcontarct after', res)

  if (server === 'client-full') {
    if (!res) return console.log('success false')
    return res
  } else {
    if (!res.success) return console.log('success false')
    return res.data.returnValue
  }
}
