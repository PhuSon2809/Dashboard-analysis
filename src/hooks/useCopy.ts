const useCopy = () => {
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text)
      alert('Text copied to clipboard')
    } catch (error) {
      console.log('Error copying text: ', error)
    }
  }

  return {
    copyToClipboard
  }
}

export default useCopy
