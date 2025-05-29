import type { Quote } from '@/types/quote'

export function useQuoteService() {
  const getAllQuotes = async (): Promise<Quote[]> => {
    // Return dummy quotes (same as Angular service)
    return [
      { id: 1, quote: 'Quote 1.', author: 'Author 1' },
      { id: 2, quote: 'Quote 2.', author: 'Author 2' },
      { id: 3, quote: 'Quote 3.', author: 'Author 3' },
    ]
  }

  const getRandomQuote = async (_prompt: string): Promise<Quote> => {
    // Return dummy quote (same as Angular service)
    // In real implementation, _prompt would be sent to the API
    return { id: 1, quote: 'Totally random quote.', author: 'Anonymous' }
  }

  return {
    getAllQuotes,
    getRandomQuote
  }
}