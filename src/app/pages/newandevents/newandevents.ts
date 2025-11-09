import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


interface NewsItem {
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-newandevents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newandevents.html',
  styleUrls: ['./newandevents.css'],
})
export class Newandevents implements OnInit{

   news: NewsItem[] = [];
  filteredNews: NewsItem[] = [];
  categories = ['Todas', 'Nuevos Modelos', 'Actualizaciones', 'Políticas'];
  selectedCategory = 'Todas';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<NewsItem[]>('config/newsandevents.json').subscribe((data) => {
      this.news = data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
      this.filteredNews = this.news;
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filteredNews =
      category === 'Todas'
        ? this.news
        : this.news.filter((n) => n.category === category);
  }

}
