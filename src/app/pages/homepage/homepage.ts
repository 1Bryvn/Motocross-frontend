import { Component,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements AfterViewInit{
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  videos: string[] = [
    'videos/sportbike.mp4',
    'videos/sportbike2.mp4',
    'videos/motocicleta.mp4',
    'videos/motocicleta2.mp4'
  ];

   currentIndex = 0;

  ngAfterViewInit() {
    this.playVideo();
  }

  playVideo() {
    const video = this.bgVideo.nativeElement;
    video.src = this.videos[this.currentIndex];
    video.load();
    video.play();
  }

  onVideoEnded() {
    this.currentIndex = (this.currentIndex + 1) % this.videos.length;
    this.playVideo();
  }


selectedCategory = 0;
selectedSlide = 0;

selectCategory(index: number) {
  this.selectedCategory = index;
  this.selectedSlide = 0; 
}

categories = [
  {
    name: 'Diseño',
    items: [
      {
        name: 'Yamaha FZ25 ABS',
        desc: 'Diseño urbano agresivo con presencia deportiva.',
        image: 'imagenes/motos/yamaha-fz25abs-azul2.png',
        price: '$2.600.000 CLP',
        details: 'Carrocería aerodinámica y postura de manejo cómoda.'
      },
      {
        name: 'Honda CB190R 2.0',
        desc: 'Diseño sport con estilo único.',
        image: 'imagenes/motos/HondaCB190Red.png',
        price: '$60.367.924 CLP',
        details: 'Sistema de iluminación LED. Pantalla TFT y puerto de carga USB C.'
      },
      {
        name: 'Kawasaki Z900 SE ABS',
        desc: 'Minimalismo agresivo y ADN “Z Spirit”.',
        image: 'imagenes/motos/kawazakiz900seabsgreen.png',
        price: '$14.090.000 CLP',
        details: 'Estilo naked premium con personalización.'
      }
    ]
  },

  {
    name: 'Motor',
    items: [
      {
        name: 'Yamaha FZ25 ABS',
        desc: 'Motor 249cc monocilíndrico con inyección.',
        image: 'imagenes/motos/yamaha-fz25abs-azul.png',
        price: '$2.600.000 CLP',
        details: '20.6 hp • Refrigeración por aire'
      },
      {
        name: 'Honda CB190R 2.0',
        desc: '184cc Monocilindrico, SOHC, 2 válvulas.',
        image: 'assets/img/moto2.jpg',
        price: '$60.367.924 CLP',
        details: '16.8 hp • Refrigeración por aire/aceite'
      },
      {
        name: 'Kawasaki Z400',
        desc: '399cc bicilíndrico DOHC.',
        image: 'assets/img/moto3.jpg',
        price: '$5.500.000 CLP',
        details: '44 hp • Refrigeración líquida'
      }
    ]
  },

  
];

next() {
  const total = this.categories[this.selectedCategory].items.length;
  this.selectedSlide = (this.selectedSlide + 1) % total;
}

prev() {
  const total = this.categories[this.selectedCategory].items.length;
  this.selectedSlide = (this.selectedSlide - 1 + total) % total;
}

}


