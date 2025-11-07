import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './models.html',
  styleUrl: './models.css',
})
export class Models {


  motoTypes = ['Cruisers', 'SportBikes', 'Naked', 'Touring', 'Scooters'];
  selectedType = 'Cruisers';

  brands = ['Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'Harley-Davidson'];
  years = [2025, 2024, 2023, 2022, 2021, 2020];

  filters = {
    brand: '',
    year: '',
    usage: '',
    priceMin: 2000,
    priceMax: 25000
  };

  sortBy = 'newest';

  models = [
    {
      type: 'Cruisers',
      name: 'Road King',
      brand: 'Harley-Davidson',
      year: 2024,
      usage: 'nuevo',
      price: 18999,
      image: 'assets/img/roadking.jpg',
      description: 'Estilo clásico y motor potente para viajes largos.'
    },
    {
      type: 'Cruisers',
      name: 'Street Glide',
      brand: 'Harley-Davidson',
      year: 2023,
      usage: 'usado',
      price: 21999,
      image: 'assets/img/streetglide.jpg',
      description: 'Comodidad touring con estilo moderno.'
    },
    {
      type: 'SportBikes',
      name: 'Ninja ZX-10R',
      brand: 'Kawasaki',
      year: 2025,
      usage: 'nuevo',
      price: 20999,
      image: 'assets/img/ninja.jpg',
      description: 'Rendimiento extremo para pilotos expertos.'
    },
    {
      type: 'SportBikes',
      name: 'CBR600RR',
      brand: 'Honda',
      year: 2023,
      usage: 'usado',
      price: 11499,
      image: 'assets/img/cbr600.jpg',
      description: 'Diseño ligero y conducción precisa.'
    }
  ];

  filteredModels = [...this.models];

  selectType(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredModels = this.models.filter(m => {
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
