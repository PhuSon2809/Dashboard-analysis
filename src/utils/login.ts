import englishWordList from '~/assets/json_seed_phrase/english.txt'

const randomStringNotExistInArray = (data: Array<string>, valueList: Array<string>): string => {
  const random = Math.floor(Math.random() * data.length)
  const randomValue = data[random]
  const index = valueList.indexOf(randomValue)
  if (index < 0) {
    return randomValue
  }
  return randomStringNotExistInArray(data, valueList)
}

const randomStringUniqueFromListWithLength = (data: Array<string>, length: number) => {
  const valueList: Array<string> = []
  while (valueList.length < length) {
    const value = randomStringNotExistInArray(data, valueList)
    valueList.push(value)
  }
  return valueList
}

const generateSeedphrase = () => {
  return fetch(englishWordList)
    .then((r) => r.text())
    .then((text) => {
      const arrayList = text.split('\n')
      return randomStringUniqueFromListWithLength(arrayList, 24)
    })
}

export { generateSeedphrase }
