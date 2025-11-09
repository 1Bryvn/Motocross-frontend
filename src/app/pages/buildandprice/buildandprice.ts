import { Component , ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';





interface MotoConfig {
  modelName: string;
  basePrice: number;
  parts: {
    [key: string]: {
      name: string;
      options: { label: string; price: number; hex?: string }[];
    };
  };
}


@Component({
  selector: 'app-buildandprice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buildandprice.html',
  styleUrls: ['./buildandprice.css'],
})

export class Buildandprice implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

configData?: MotoConfig;
selectedOptions: Record<string, any> = {};

  total = 0;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private model!: THREE.Group;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.init3D();
    this.loadModel();
    this.loadConfig();
    this.animate();
  }

  /** Inicializa el entorno 3D */
  private init3D() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111111);

    this.camera = new THREE.PerspectiveCamera(45, 900 / 600, 0.1, 100);
    this.camera.position.set(2, 1, 3);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true
    });
    this.renderer.setSize(900, 600);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(3, 5, 3);
    this.scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambient);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  /** Carga el modelo GLB de la moto */
  private loadModel() {
    const loader = new GLTFLoader();
    loader.load('model3d/HondaCB190Rojo3d.glb', (gltf) => {
      this.model = gltf.scene;
      this.scene.add(this.model);
      this.model.position.set(0, -0.8, 0);
      this.model.scale.set(1.0,1.0,1.0);
    });
  }

  /** Carga la configuración dinámica desde JSON */
  private loadConfig() {
    this.http.get<MotoConfig>('config/moto-config.json').subscribe((data) => {
      this.configData = data;
      this.total = this.configData.basePrice;
    });
  }

  /** Actualiza una opción seleccionada y recalcula el total */
  updateOption(partKey: string, option: any) {
    this.selectedOptions[partKey] = option;
    this.calculateTotal();

    // Si es color del carenado, actualizamos el material
    if (partKey === 'body' && this.model) {
      const bodyMesh = this.model.getObjectByName('Body') as THREE.Mesh;
      if (bodyMesh) {
        (bodyMesh.material as THREE.MeshStandardMaterial).color.set(option.hex);
      }
    }
  }

  /** Recalcula el total según las opciones elegidas */
  calculateTotal() {
  let extras = 0;
  Object.values(this.selectedOptions).forEach((opt: any) => (extras += opt.price));
  this.total = (this.configData?.basePrice || 0) + extras;
}

  /** Controles de cámara */
  zoomIn() {
    this.camera.position.z -= 0.2;
  }

  zoomOut() {
    this.camera.position.z += 0.2;
  }

  resetView() {
    this.camera.position.set(2, 1, 3);
  }

  /** Loop de animación 3D */
  private animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  /** Agrega la moto personalizada al “Garage” (simulado) */
  addToGarage() {
    const summary = Object.entries(this.selectedOptions)
      .map(([key, val]: any) => `${key}: ${val.label}`)
      .join('\n');

    alert(`Moto añadida al garage:\n\n${summary}\n\nTotal: $${this.total}`);
  }

}
