import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Quote } from './quote';

const BaseUrl = 'http://localhost:8083';
const RandomQuoteUrl = 'http://localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  // Get all quotes
  getAllQuotes() : Observable<Quote[]> {
    return this.http.get<Quote[]>(BaseUrl + '/quotes');
  }

  // Get a random quote
  getRandomQuote() : Observable<Quote> {
    return this.http.get<Quote>(RandomQuoteUrl + '/random-quote');
  }
}
