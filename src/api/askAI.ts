import axios from 'axios'

export const askAi = async (
  question: string,
  body?: any,
  config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
) => {
  const params = new URLSearchParams({ question })
  console.log('params', params)
  const res = await axios.post(`http://35.200.222.192:8000/ask?${params}`, body, config)
  // const res = await axios.post(
  //   `http://35.200.222.192:8000/ask?question=how%2520much%2520is%2520Attentive`,
  //   body,
  //   config
  // )

  console.log('response', res.data)

  return res.data
}
