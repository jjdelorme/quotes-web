import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Quote } from './quote';
import { QuoteService } from './quote-service';
import { Observable, of, map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatCardModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  quotes?: Observable<Quote[]> = undefined;
  showRandomQuote = false;
  randomPrompt = '';
  
  constructor(private readonly quoteService: QuoteService) {}

  getAllQuotes() {
    this.quotes = this.quoteService.getAllQuotes();
    this.showRandomQuote = false;
  }

  getRandomQuote() {   
    // Map a single return quote into an array of quotes.
    this.quotes = this.quoteService.getRandomQuote(this.randomPrompt)
      .pipe(map((quote) => [quote]));
    
    this.showRandomQuote = true;
  }

  ngOnInit() {
    this.getAllQuotes();
  }
}
