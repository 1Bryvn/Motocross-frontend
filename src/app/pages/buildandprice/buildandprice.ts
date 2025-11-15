import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  selectedModelName = '';
  model3DAvailable = true;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private model!: THREE.Group;

  constructor(private http: HttpClient, private router: Router) {}

  ngAfterViewInit() {
    const storedMoto = localStorage.getItem('selectedMoto');

    if (!storedMoto) {
      this.router.navigate(['/models']);
      return;
    }

    const moto = JSON.parse(storedMoto);
    this.selectedModelName = moto.name;

    const modelPath = this.getModelPath(moto.name);

    this.init3D();

    if (modelPath) {
      this.loadModel(modelPath);
      this.loadConfig();
    } else {
      this.model3DAvailable = false;
    }

    this.animate();
  }

  /** Detecta tamaño pantalla y retorna dimensiones del canvas */
  private getCanvasSize() {
    const width = window.innerWidth <= 768 ? window.innerWidth * 0.95 : 900;
    const height = window.innerWidth <= 768 ? 300 : 600;
    return { width, height };
  }

  private init3D() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111111);

    const { width, height } = this.getCanvasSize();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(2, 1, 3);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
    });

    this.renderer.setSize(width, height);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(3, 5, 3);
    this.scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambient);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  /** Adaptar canvas al cambiar tamaño de pantalla */
  @HostListener('window:resize')
  onWindowResize() {
    if (!this.camera || !this.renderer) return;

    const { width, height } = this.getCanvasSize();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private getModelPath(name: string): string | null {
    if (name === 'CB190R 2.0') return 'model3d/CB190R2.0.glb';
    return null;
  }

  private loadModel(path: string) {
    const loader = new GLTFLoader();
    loader.load(
      path,
      (gltf) => {
        this.model = gltf.scene;
        this.model.position.set(0, -0.8, 0);
        this.model.scale.set(1, 1, 1);
        this.scene.add(this.model);

        // Ocultar partes según modelo
        const hidden = [
          'Exhaust_Sport',
          'Exhaust_Yoshimura',
          'Bars_Tracker',
          'Bars_Drag',
          'Seat_Sport',
          'Seat_Comfort',
        ];
        hidden.forEach((name) => {
          const mesh = this.model.getObjectByName(name);
          if (mesh) mesh.visible = false;
        });
      },
      undefined,
      (err) => {
        console.error('Error cargando modelo 3D', err);
        this.model3DAvailable = false;
      }
    );
  }

  private loadConfig() {
    this.http.get<MotoConfig>('config/moto-config.json').subscribe((d) => {
      this.configData = d;
      this.total = d.basePrice;
    });
  }

  updateOption(partKey: string, option: any) {
    this.selectedOptions[partKey] = option;
    this.calculateTotal();

    if (!this.model) return;

    /** Colores */
    if (partKey === 'body') {
      const mesh = this.model.getObjectByName('Body') as THREE.Mesh;
      if (mesh && option.hex) {
        (mesh.material as THREE.MeshStandardMaterial).color.set(option.hex);
      }
    }
  }

  calculateTotal() {
    let extras = 0;
    Object.values(this.selectedOptions).forEach((opt: any) => (extras += opt.price));
    this.total = (this.configData?.basePrice || 0) + extras;
  }

  zoomIn() {
    this.camera.position.z -= 0.2;
  }
  zoomOut() {
    this.camera.position.z += 0.2;
  }
  resetView() {
    this.camera.position.set(2, 1, 3);
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  goToCatalog() {
    this.router.navigate(['/models']);
  }

  addToGarage() {
    alert('Moto añadida al garage.');
  }
}
