import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shoppingtools',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './shoppingtools.html',
  styleUrl: './shoppingtools.css',
})
export class Shoppingtools implements OnInit {

  tools: any[] = [];
  categories: string[] = [];
  selectedCategory = 'Todas';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('config/tools.json').subscribe((data) => {
      this.tools = data;
      this.categories = ['Todas', ...new Set(data.map((t) => t.category))];
    });
  }

  get filteredTools() {
    return this.selectedCategory === 'Todas'
      ? this.tools
      : this.tools.filter((t) => t.category === this.selectedCategory);
  }
}
