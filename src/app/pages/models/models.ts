import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './models.html',
  styleUrl: './models.css',
})
export class Models implements OnInit {
  motoTypes = ['Cruisers', 'SportBikes', 'Naked', 'Touring', 'Scooters'];
  selectedType = 'Cruisers';
  brands = ['Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'Harley-Davidson'];
  years = [2025, 2024, 2023, 2022, 2021, 2020];
  filters = { brand: '', year: '', usage: '', priceMin: 2000, priceMax: 25000 };
  sortBy = 'newest';

  models: any[] = [];
  filteredModels: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('config/models.json').subscribe((data) => {
      this.models = data;
      this.filteredModels = [...this.models];
      this.applyFilters();
    });
  }

  selectType(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredModels = this.models.filter((m) => {
      return (
        m.type === this.selectedType &&
        (!this.filters.brand || m.brand === this.filters.brand) &&
        (!this.filters.year || m.year === +this.filters.year) &&
        (!this.filters.usage || m.usage === this.filters.usage) &&
        m.price >= this.filters.priceMin &&
        m.price <= this.filters.priceMax
      );
    });
  }

  sortModels() {
    if (this.sortBy === 'lowest') {
      this.filteredModels.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'highest') {
      this.filteredModels.sort((a, b) => b.price - a.price);
    } else {
      this.filteredModels.sort((a, b) => b.year - a.year);
    }
  }
}