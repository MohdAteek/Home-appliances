import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DownloadService } from '../../services/download.service';

interface TransformationPair {
  id: string;
  title: string;
  category: string;
  location: string;
  timeline: string;
  scope: string;
  description: string;
  beforeImg: string;
  afterImg: string;
}

@Component({
  selector: 'app-before-after-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="transformations" class="py-20 md:py-28 bg-[var(--bg-surface-subtle)] border-y border-[var(--border-subtle)]">
      <div class="container-custom space-y-12">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider">
              <span>🔄</span> Before & After Repair Results
            </div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-main)]">
              Before & After Repair & Descaling Results
            </h2>
            <p class="text-base sm:text-lg text-[var(--text-muted)]">
              Drag the interactive split-slider to see how our ultrasonic descaling, motor overhauls, and valve rebuilds restore faulty appliances to 100% factory performance.
            </p>
          </div>

          <!-- Space Switcher Buttons -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1">
            <button 
              *ngFor="let item of transformations; let i = index"
              (click)="activeTransformationIndex.set(i); sliderPos = 50"
              [class.bg-[var(--color-primary)]]="activeTransformationIndex() === i"
              [class.text-white]="activeTransformationIndex() === i"
              [class.bg-[var(--bg-surface)]]="activeTransformationIndex() !== i"
              [class.text-[var(--text-muted)]]="activeTransformationIndex() !== i"
              class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border border-[var(--border-subtle)] transition-all shadow-sm">
              {{ item.title.split(' ')[0] }}
            </button>
          </div>
        </div>

        <!-- Interactive Split Slider Component -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Slider Viewport (8 cols) -->
          <div class="lg:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-medium)] select-none bg-zinc-950">
            
            <!-- 1. AFTER Image (Full Background) -->
            <img 
              [src]="currentPair.afterImg" 
              [alt]="currentPair.title + ' (After Repair)'"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute top-4 right-4 badge-pill bg-black/75 text-emerald-400 backdrop-blur-md border border-white/20 text-xs font-bold">
              ✓ AFTER: FULLY RESTORED & 100% BLUE FLAME
            </div>

            <!-- 2. BEFORE Image (Clipped with width) -->
            <div 
              class="absolute inset-0 overflow-hidden"
              [style.width.%]="sliderPos">
              <img 
                [src]="currentPair.beforeImg" 
                [alt]="currentPair.title + ' (Before Repair)'"
                class="absolute inset-0 w-full h-full object-cover max-w-none"
                style="min-width: 100%; height: 100%; object-fit: cover;"
              />
              <div class="absolute top-4 left-4 badge-pill bg-black/75 text-amber-300 backdrop-blur-md border border-white/20 text-xs font-bold">
                BEFORE: CLOGGED / DEFECTIVE
              </div>
            </div>

            <!-- 3. Vertical Divider Line & Draggable Handle -->
            <div 
              class="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
              [style.left.%]="sliderPos">
              <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[var(--color-secondary)] text-white font-extrabold shadow-2xl flex items-center justify-center text-sm border-2 border-white">
                ↔
              </div>
            </div>

            <!-- 4. Hidden Native Range Input Overlay for Seamless Dragging / Touch -->
            <input 
              type="range" 
              min="0" 
              max="100" 
              [(ngModel)]="sliderPos"
              class="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0"
              aria-label="Drag to compare before and after appliance repair"
            />

            <!-- Bottom Caption -->
            <div class="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 text-white flex items-center justify-between pointer-events-none">
              <div>
                <span class="text-xs uppercase tracking-wider text-amber-300 font-mono font-bold">{{ currentPair.category }}</span>
                <div class="font-bold text-sm sm:text-base">{{ currentPair.title }}</div>
              </div>
              <div class="text-xs text-zinc-300 hidden sm:block font-mono">
                Drag slider ↔ to compare repair quality
              </div>
            </div>

          </div>

          <!-- Renovation Narrative & Data Card (4 cols) -->
          <div class="lg:col-span-4 space-y-6">
            <div class="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 shadow-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              
              <div class="space-y-2">
                <span class="badge-pill badge-flame text-[0.7rem] font-bold">Verified Repair Case</span>
                <h3 class="font-serif text-2xl font-bold text-[var(--text-main)]">
                  {{ currentPair.title }}
                </h3>
                <p class="text-xs text-[var(--text-muted)]">
                  {{ currentPair.location }} • Turnaround: {{ currentPair.timeline }}
                </p>
              </div>

              <p class="text-sm text-[var(--text-muted)] leading-relaxed">
                {{ currentPair.description }}
              </p>

              <!-- Turnkey Stats -->
              <div class="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--border-subtle)] text-xs">
                <div>
                  <span class="text-[var(--text-light)] block">Replaced / Serviced</span>
                  <strong class="font-mono text-sm text-[var(--color-secondary)]">{{ currentPair.scope }}</strong>
                </div>
                <div>
                  <span class="text-[var(--text-light)] block">Service Turnaround</span>
                  <strong class="font-mono text-sm text-[var(--text-main)]">{{ currentPair.timeline }}</strong>
                </div>
              </div>

              <!-- Download Transformed Image Action -->
              <div class="pt-2">
                <button 
                  (click)="downloadAfterImage()"
                  class="btn-flame w-full py-3 text-xs uppercase tracking-wider shadow-lg">
                  📥 Download Restored Service Photo
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class BeforeAfterSliderComponent {
  downloadService = inject(DownloadService);

  readonly transformations: TransformationPair[] = [
    {
      id: 'tf-01',
      title: 'Hob Burner Ultrasonic Descaling',
      category: 'Built-in Gas Hob Servicing',
      location: 'South Mumbai Residence',
      timeline: '90 Minutes Doorstep',
      scope: 'Brass Jets Reamed & FFD Tuned',
      description: 'Restored an oxidized, yellow-burning 4-burner Bosch hob to crisp 100% blue flame with zero soot output. Replaced failed spark micro-switch and reamed clogged brass injectors.',
      beforeImg: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=1200&q=85',
      afterImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'tf-02',
      title: 'Chimney Chemical Wash & Blower Overhaul',
      category: 'Kitchen Chimney Service',
      location: 'Gurugram Villa',
      timeline: '2 Hours Complete Wash',
      scope: 'Faber 1500 m³/hr Motor Restored',
      description: 'Unmounted grease-choked Faber auto-clean chimney, conducted ultrasonic chemical bath on centrifugal blower fan, replaced noisy motor bearings, and restored full factory suction.',
      beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
      afterImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'tf-03',
      title: 'Siemens Oven Heating Coil & Sensor Fix',
      category: 'Built-in Oven Repair',
      location: 'Bengaluru Penthouse',
      timeline: 'Same-Day Replacement',
      scope: '4D HotAir Element & NTC Sensor',
      description: 'Fixed Siemens iQ700 oven tripping circuit breaker. Replaced open-circuit 2800W convection heating element, calibrated digital thermostat, and fitted fresh door perimeter gasket.',
      beforeImg: 'https://images.unsplash.com/photo-1584990347449-399a531d0442?auto=format&fit=crop&w=1200&q=85',
      afterImg: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1200&q=85'
    }
  ];

  activeTransformationIndex = signal(0);
  sliderPos = 50;

  get currentPair(): TransformationPair {
    return this.transformations[this.activeTransformationIndex()];
  }

  async downloadAfterImage(): Promise<void> {
    const item = this.currentPair;
    const filename = `Sultan_Repair_Result_${item.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.jpg`;
    await this.downloadService.downloadImage(item.afterImg, filename);
  }
}
