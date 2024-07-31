export const hexToUtf8 = (hex: string): string => {
  hex = hex.replace(/\s+/g, '')

  if (hex.length % 2 !== 0) {
    throw new Error('Invalid hex string')
  }

  let bytes: number[] = []
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16))
  }

  let utf8String = new TextDecoder('utf-8').decode(new Uint8Array(bytes))
  return utf8String
}
