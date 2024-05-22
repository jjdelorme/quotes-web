import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, tap, Observable } from 'rxjs';

import { Quote } from './quote';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {

  constructor() { }

  // Get all quotes
  getAllQuotes() : Observable<Quote[]> {
    // make up some dummy quotes to return
    return of([
      { id: 1, quote: 'Quote 1.', author: 'Author 1' },
      { id: 2, quote: 'Quote 2.', author: 'Author 2' },
      { id: 3, quote: 'Quote 3.', author: 'Author 3' },
    ]);
  }


  // Get a random quote
  getRandomQuote(prompt: string) : Observable<Quote> {
    // create a dummy quote
    const quote: Quote = { id: 1, quote: 'Totally random quote.', author: 'Anonymous' };
    return of(quote);
  }

  searchQuotes(query: string) : Observable<Quote[]> {
    // return a dummy quote that contains the query string
    const quote: Quote = { id: 1, quote: `Quote containing your: ${query}.`, author: 'Author 1' };
    return of([quote]);
  }
}
