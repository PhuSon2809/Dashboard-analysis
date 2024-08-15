import Fuse from 'fuse.js'
import { options } from '~/components/AI/chat'

const fuse = new Fuse(options, {
  keys: ['text'], // key to search in each object
  threshold: 0.3, // Adjust this value for fuzziness (0 = exact match, 1 = no match)
  distance: 100 // Max distance for fuzzy matching (higher means looser matching)
})

// Function to perform the search
function search(query) {
  if (query.trim().length <=3) {
    return null
  }

  const results = fuse.search(query)

  if (results.length === 0) {
    return null
  }

  // Return the ID of the best match
  return results[0].item.id
}
export default search
