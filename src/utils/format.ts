/* eslint-disable no-var */
import moment from 'moment'

export const formatDate = (date: number, format = 'DD/MM/YYYY') => {
  if (!!!date) return ''
  return moment(date * 1000).format(format)
}

export const shortenString = (str?: string, maxLength = 10) => {
  if (!str) return ''
  const sideLength = Math.floor(maxLength / 2)
  return str.length > maxLength ? `${str.slice(0, sideLength)}...${str.slice(-sideLength)}` : str
}

export const formatLocaleString = (number) => {
  const format = (_str) => _str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const str = number + ''
  const idx = str.indexOf('/')
  return idx === -1 ? format(str) : `${format(str.slice(0, idx))}.${str.slice(idx + 1)}`
}

export const roundNumber = (_number, decimal = 4) => {
  const number = +_number
  const min = 10 ** decimal
  return number > min ? formatLocaleString(Math.floor(number / min) * min) + '+' : formatLocaleString(number)
}

export const formatPrice = (number: number, fix?: number) => {
  return fix ? (number / 1000000).toFixed(fix) : number / 1000000
}

export const seedPhraseToString = (list) => {
  const rules = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H',
    9: 'I',
    10: 'J',
    11: 'K',
    12: 'L',
    13: 'M',
    14: 'N',
    15: 'O',
    16: 'P',
    17: 'Q',
    18: 'R',
    19: 'S',
    20: 'T',
    21: 'U',
    22: 'V',
    23: 'W',
    24: 'X',
    25: 'Y',
    26: 'Z',
    27: 'A',
    28: 'B',
    29: 'C',
    30: 'D',
    31: 'E',
    32: 'F',
    33: 'G',
    34: 'H',
    35: 'I',
    36: 'J',
    37: 'K',
    38: 'L',
    39: 'M',
    40: 'N',
    41: 'O',
    42: 'P',
    43: 'Q',
    44: 'R',
    45: 'S',
    46: 'T',
    47: 'U',
    48: 'V',
    49: 'W',
    50: 'X',
    51: 'Y',
    52: 'Z'
  }

  const str = list
    .map((elm) => {
      const name = typeof elm === 'string' ? elm : elm.name
      const len = name.length
      return `${rules[len]}${name}`
    })
    .join('')
  return `Mx3S5${str}`
}

export const convertStringToSeedPhrase = (str: any) => {
  var rules = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
    K: 11,
    L: 12,
    M: 13,
    N: 14,
    O: 15,
    P: 16,
    Q: 17,
    R: 18,
    S: 19,
    T: 20,
    U: 21,
    V: 22,
    W: 23,
    X: 24,
    Y: 25,
    Z: 26,
    a: 27,
    b: 28,
    c: 29,
    d: 30,
    e: 31,
    f: 32,
    g: 33,
    h: 34,
    i: 35,
    j: 36,
    k: 37,
    l: 38,
    m: 39,
    n: 40,
    o: 41,
    p: 42,
    q: 43,
    r: 44,
    s: 45,
    t: 46,
    u: 47,
    v: 48,
    w: 49,
    x: 50,
    y: 51,
    z: 52
  }
  var arr: any[] = []
  var start = 0
  var string = str.substring(5)
  while (arr.length < 24) {
    const firtLetter = string.substr(start, 1)
    var subLen = rules[firtLetter]
    const seed = string.substr(start + 1, subLen)
    arr.push(seed)
    start = start + subLen + 1
  }
  return arr
}

export const hexToBytes = (hex: string) => {
  const bytes: number[] = []
  for (let c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16))
  return bytes
}

export function removeAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}
