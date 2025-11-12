import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
      console.warn('Modelo 3D no disponible para:', moto.name);
    }

    this.animate();
  }

  /** Retorna la ruta del modelo GLB según el nombre */
  private getModelPath(modelName: string): string | null {
    switch (modelName) {
      case 'CB190R 2.0':
        return 'model3d/CB190R2.0.glb';
      default:
        return null;
    }
  }

  /** Inicializa el entorno 3D */
  private init3D() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111111);

    this.camera = new THREE.PerspectiveCamera(45, 900 / 600, 0.1, 100);
    this.camera.position.set(2, 1, 3);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
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

  /** Carga el modelo GLB */
  private loadModel(modelPath: string) {
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        this.model = gltf.scene;
        this.model.position.set(0, -0.8, 0);
        this.model.scale.set(1, 1, 1);
        this.scene.add(this.model);

        if (this.selectedModelName === 'CB190R 2.0') {
          const hiddenParts = [
            'Exhaust_Sport',
            'Exhaust_Yoshimura',
            'Bars_Tracker',
            'Bars_Drag',
            'Seat_Sport',
            'Seat_Comfort',
          ];
          hiddenParts.forEach((n) => {
            const mesh = this.model.getObjectByName(n);
            if (mesh) mesh.visible = false;
          });
        }
      },
      undefined,
      (error) => {
        console.error('Error cargando modelo 3D:', error);
        this.model3DAvailable = false;
      }
    );
  }

  /** Carga el JSON de configuración */
  private loadConfig() {
    this.http.get<MotoConfig>('config/moto-config.json').subscribe((data) => {
      this.configData = data;
      this.total = this.configData.basePrice;
    });
  }

  /** Actualiza color o pieza */
  updateOption(partKey: string, option: any) {
    this.selectedOptions[partKey] = option;
    this.calculateTotal();

    if (!this.model) return;

    if (partKey === 'body') {
      const bodyMesh = this.model.getObjectByName('Body') as THREE.Mesh;
      if (bodyMesh && option.hex) {
        const mat = bodyMesh.material as THREE.MeshStandardMaterial;
        mat.color.set(option.hex);
        mat.needsUpdate = true;
      }
    }
  }

  /** Recalcula el total */
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

  /** Loop animación */
  private animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  /** Agrega la moto al garage */
  addToGarage() {
    const summary = Object.entries(this.selectedOptions)
      .map(([k, v]: any) => `${k}: ${v.label}`)
      .join('\n');
    alert(`Moto añadida al garage:\n\n${summary}\n\nTotal: $${this.total.toLocaleString('es-CL')}`);
  }

  /** Volver al catálogo */
  goToCatalog() {
    this.router.navigate(['/models']);
  }
}
