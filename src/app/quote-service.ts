import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Quote } from './quote';

const QuoteUrl = 'http://localhost:8083/quotes';
const RandomQuoteUrl = 'http://localhost:5000/random-quote';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  // Get all quotes
  getAllQuotes() : Observable<Quote[]> {
    return this.http.get<Quote[]>(QuoteUrl);
  }

  // Get a random quote
  getRandomQuote(prompt: string) : Observable<Quote> {
    const params = new HttpParams().set('prompt', prompt);
    return this.http.get<Quote>(RandomQuoteUrl, { params });
  }
}
