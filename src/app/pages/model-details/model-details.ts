import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-model-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './model-details.html',
  styleUrl: './model-details.css',
})
export class ModelDetails implements OnInit{
  moto: any;

  ngOnInit() {
    const storedMoto = localStorage.getItem('selectedMoto');
    if (storedMoto) this.moto = JSON.parse(storedMoto);
  }

}
