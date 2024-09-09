const messages = [
  {
    id: 1,
    message: `Total Revenue on August 12, 2024 is $1,000, decreasing 5% compared to the previous day.
    `,
    type: 'ai',
    image: []
  },
  {
    id: 2,
    message: `**Only 1 employee late today**:
      - **Employee ID:** HR1257
      - **Name:** John Doe
      - **Status:** Late by 15 minutes
`,
    image: [],
    type: 'ai'
  },
  {
    id: 3,
    message: `**Customer Reaction: Mostly unhappy customers.**
    There are 35 customers who feel dissatisfied when ordering a meal, which constitutes larger than the previous day.`,
    image: [],
    type: 'ai'
  }
]

export const options = [
  { id: 1, text: 'Revenue on Aug 12' },
  { id: 2, text: 'Any employee late today?' },
  { id: 3, text: 'Unhappy customers yesterday?' }
]

export default messages
