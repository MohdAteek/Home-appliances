import { Component, inject, input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InteriorService } from '../../services/interior.service';
import { StorageService } from '../../services/storage.service';
import { DownloadService } from '../../services/download.service';
import { DesignProject, RoomCategoryId, BrandName } from '../../models/interior.models';

@Component({
  selector: 'app-gallery-hub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="gallery" class="py-20 md:py-28">
      <div class="container-custom space-y-10">
        
        <!-- Section Header -->
        <div class="space-y-4 text-center max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[var(--color-secondary)] text-xs font-bold uppercase tracking-widest">
            <span>🛠️</span> Master Repair & Service Catalog
          </div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-main)]">
            Cooking Appliance Repair Cases & Services
          </h2>
          <p class="text-base sm:text-lg text-[var(--text-muted)]">
            Explore verified repair cases, component replacements, and deep chemical descaling workflows for Siemens, Bosch, Faber, Elica, Gilma, Häfele, Crompton, and Hindware.
          </p>
        </div>

        <!-- Filter & Search Control Center -->
        <div class="glass-panel p-6 rounded-3xl space-y-6 shadow-md border border-[var(--border-subtle)]">
          
          <!-- Category Tabs (Horizontal Scroll on mobile) -->
          <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button 
              (click)="selectedCategory.set('all')"
              [class.bg-[var(--color-primary)]]="selectedCategory() === 'all'"
              [class.text-white]="selectedCategory() === 'all'"
              [class.bg-[var(--bg-surface)]]="selectedCategory() !== 'all'"
              [class.text-[var(--text-muted)]]="selectedCategory() !== 'all'"
              class="px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border border-[var(--border-subtle)] hover:border-[var(--color-secondary)] shadow-sm">
              All Repair Services ({{ interiorService.projects.length }})
            </button>

            <button 
              *ngFor="let cat of interiorService.categories"
              (click)="selectedCategory.set(cat.id)"
              [class.bg-[var(--color-primary)]]="selectedCategory() === cat.id"
              [class.text-white]="selectedCategory() === cat.id"
              [class.bg-[var(--bg-surface)]]="selectedCategory() !== cat.id"
              [class.text-[var(--text-muted)]]="selectedCategory() !== cat.id"
              class="px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border border-[var(--border-subtle)] hover:border-[var(--color-secondary)] shadow-sm">
              {{ cat.name.split(' ')[0] }} ({{ getCategoryCount(cat.id) }})
            </button>
          </div>

          <!-- Secondary Filters Row (Brand, Technology, Sort, Search) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-[var(--border-subtle)]">
            
            <!-- Brand Filter Dropdown -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Brand Serviced</label>
              <select 
                [(ngModel)]="selectedBrand"
                class="w-full bg-[var(--bg-surface)] text-[var(--text-main)] text-sm rounded-xl px-3.5 py-2.5 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium">
                <option value="all">All Brands (8 Partners)</option>
                <option value="Siemens">Siemens (Germany)</option>
                <option value="Bosch">Bosch (Germany)</option>
                <option value="Faber">Faber (Italy)</option>
                <option value="Elica">Elica (Italy)</option>
                <option value="Häfele">Häfele (Germany)</option>
                <option value="Gilma">Gilma (India)</option>
                <option value="Crompton">Crompton (India)</option>
                <option value="Hindware">Hindware (India)</option>
              </select>
            </div>

            <!-- Service Style Filter -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Repair Focus</label>
              <select 
                [(ngModel)]="selectedStyle"
                class="w-full bg-[var(--bg-surface)] text-[var(--text-main)] text-sm rounded-xl px-3.5 py-2.5 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium">
                <option value="all">All Repair Workflows</option>
                <option value="Smart Auto-Clean">Chimney Chemical Descaling</option>
                <option value="Heavy-Duty Brass">Brass Burner & Jet Reaming</option>
                <option value="Built-in Glass">Hob Glass & Valve Service</option>
                <option value="3D HotAir Convection">Oven Heating Element Fix</option>
                <option value="Induction Precision">Induction Motherboard & IGBT</option>
                <option value="Filterless Extraction">Filterless Blower Overhaul</option>
              </select>
            </div>

            <!-- Sort By -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Sort By</label>
              <select 
                [(ngModel)]="sortBy"
                class="w-full bg-[var(--bg-surface)] text-[var(--text-main)] text-sm rounded-xl px-3.5 py-2.5 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium">
                <option value="popular">Most Common Repairs</option>
                <option value="price-asc">Inspection Cost: Low to High</option>
                <option value="price-desc">Inspection Cost: High to Low</option>
                <option value="rating">Highest Rated Service (★ 5.0)</option>
              </select>
            </div>

            <!-- Search Field -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold uppercase tracking-wider text-[var(--text-light)]">Search Issues / Parts</label>
              <div class="relative">
                <input 
                  type="text" 
                  [(ngModel)]="searchFilter"
                  placeholder="e.g. Chimney suction, Spark, Gas leak..."
                  class="w-full bg-[var(--bg-surface)] text-[var(--text-main)] text-sm rounded-xl px-3.5 py-2.5 pl-9 border border-[var(--border-subtle)] outline-none focus:border-[var(--color-secondary)] font-medium"
                />
                <span class="absolute left-3 top-2.5 text-xs text-[var(--text-muted)]">🔍</span>
                <button 
                  *ngIf="searchFilter"
                  (click)="searchFilter = ''"
                  class="absolute right-3 top-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)]">
                  ✕
                </button>
              </div>
            </div>

          </div>

          <!-- Active Filter Stats & Reset -->
          <div class="flex items-center justify-between text-xs text-[var(--text-muted)] pt-2">
            <div>
              Showing <strong class="text-[var(--text-main)]">{{ filteredProjects.length }}</strong> of {{ interiorService.projects.length }} repair cases
            </div>
            <button 
              *ngIf="hasActiveFilters"
              (click)="resetFilters()"
              class="text-[var(--color-secondary)] hover:underline font-bold">
              Reset Filters
            </button>
          </div>

        </div>

        <!-- Repair Product Cards Grid -->
        <div *ngIf="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            *ngFor="let project of filteredProjects"
            class="luxury-card overflow-hidden group flex flex-col justify-between border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--color-secondary)] shadow-sm hover:shadow-xl transition-all duration-300">
            
            <!-- Card Image Box -->
            <div class="relative aspect-[4/3] overflow-hidden bg-zinc-950">
              <img 
                [src]="project.image" 
                [alt]="project.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

              <!-- Top Floating Controls: Brand & Service Guarantee -->
              <div class="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span class="badge-pill bg-black/75 text-white backdrop-blur-md border border-white/20 font-bold text-xs">
                  {{ project.brand }} Specialist
                </span>

                <span class="badge-pill bg-emerald-600 text-white font-extrabold text-[0.68rem] shadow-md">
                  ✓ 90-Day Warranty
                </span>
              </div>

              <!-- Bottom Overlay on Image: Style & Category -->
              <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                <span class="badge-pill badge-flame backdrop-blur-md py-0.5 font-bold">
                  {{ project.style }}
                </span>
                <span class="bg-black/70 px-2 py-0.5 rounded backdrop-blur-md font-mono text-[0.7rem]">
                  {{ project.executionTimeline }}
                </span>
              </div>
            </div>

            <!-- Card Content Body -->
            <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
              
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span class="font-mono text-[var(--color-secondary)] font-bold">{{ project.categoryName }}</span>
                  <span class="text-amber-500 font-medium">★ {{ project.rating }} ({{ project.views }} fixes)</span>
                </div>

                <h3 
                  (click)="openProjectModal(project)"
                  class="font-serif text-lg font-bold text-[var(--text-main)] group-hover:text-[var(--color-secondary)] transition-colors cursor-pointer line-clamp-1">
                  {{ project.title }}
                </h3>

                <p class="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                  {{ project.description }}
                </p>
              </div>

              <!-- Pricing and Inspection Block -->
              <div class="pt-2 border-t border-[var(--border-subtle)] flex items-baseline justify-between">
                <div>
                  <div class="text-xs text-[var(--text-light)] font-mono">Doorstep Inspection</div>
                  <div class="text-xl font-mono font-extrabold text-[var(--text-main)]">
                    ₹{{ project.priceINR }}
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-[0.68rem] text-emerald-600 dark:text-emerald-400 font-bold block">
                    Includes Gas Leak Safety Audit
                  </span>
                  <span class="text-[0.65rem] text-[var(--text-light)] font-mono">Doorstep in 90 Mins</span>
                </div>
              </div>

              <!-- Key Service Diagnostic Badges -->
              <div class="space-y-1.5 pt-1">
                <div class="flex flex-wrap gap-1">
                  <span 
                    *ngFor="let feat of project.features.slice(0, 2)"
                    class="px-2 py-0.5 rounded bg-[var(--bg-surface-subtle)] text-[0.68rem] text-[var(--text-muted)] border border-[var(--border-subtle)] truncate max-w-[240px]">
                    ✓ {{ feat }}
                  </span>
                </div>
              </div>

              <!-- Action Buttons Row: View Specs & Instant Booking -->
              <div class="pt-3 border-t border-[var(--border-subtle)] grid grid-cols-2 gap-2">
                <button 
                  (click)="openProjectModal(project)"
                  class="btn-secondary text-xs py-2 px-3 justify-center w-full font-bold">
                  View Repair Guide
                </button>

                <a 
                  [href]="'https://wa.me/918088034849?text=' + getQuoteMessage(project)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-flame text-xs py-2 px-3 justify-center w-full font-bold text-center">
                  💬 Book on WhatsApp
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>

      <!-- Lightbox & Appliance Repair Specification Modal -->
      <div 
        *ngIf="selectedProjectModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        (click)="closeProjectModal()">
        
        <div 
          class="bg-[var(--bg-surface)] text-[var(--text-main)] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[var(--border-medium)] p-6 sm:p-8 space-y-6"
          (click)="$event.stopPropagation()">
          
          <!-- Modal Header -->
          <div class="flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="badge-pill bg-[var(--color-primary)] text-white text-[0.7rem] font-bold">
                  {{ selectedProjectModal.brand }} Certified
                </span>
                <span class="badge-pill badge-flame text-[0.7rem] font-bold">
                  {{ selectedProjectModal.categoryName }}
                </span>
                <span class="badge-pill bg-emerald-600 text-white text-[0.68rem] font-extrabold">
                  90-Day Warranty
                </span>
              </div>
              <h3 class="font-serif text-2xl sm:text-3xl font-bold">
                {{ selectedProjectModal.title }}
              </h3>
              <p class="text-xs text-[var(--text-muted)]">
                Turnaround: {{ selectedProjectModal.executionTimeline }} • 100% Genuine Brand Spare Parts
              </p>
            </div>

            <button 
              (click)="closeProjectModal()"
              class="btn-icon text-lg"
              aria-label="Close modal">
              ✕
            </button>
          </div>

          <!-- Main Image & Thumbnails Gallery (4-5 images) -->
          <div class="space-y-3">
            <div class="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 border border-[var(--border-subtle)]">
              <img 
                [src]="activeModalImage" 
                [alt]="selectedProjectModal.title"
                class="w-full h-full object-cover"
              />
              <button 
                (click)="downloadImage(selectedProjectModal)"
                class="absolute bottom-4 right-4 btn-flame text-xs py-2 px-4 shadow-xl">
                📥 Download Service Photo (.jpg)
              </button>
            </div>

            <!-- Thumbnail Carousel with all 4-5 images -->
            <div *ngIf="selectedProjectModal.galleryImages.length > 1" class="grid grid-cols-4 gap-2">
              <img 
                *ngFor="let img of selectedProjectModal.galleryImages"
                [src]="img" 
                (click)="activeModalImage = img"
                [class.ring-2]="activeModalImage === img"
                class="aspect-[16/10] object-cover rounded-lg cursor-pointer ring-[var(--color-secondary)] hover:opacity-80 transition-opacity bg-zinc-950 border border-[var(--border-subtle)]"
              />
            </div>
          </div>

          <!-- Detailed Technical Repair Breakdown -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div class="space-y-4">
              <h4 class="font-serif text-lg font-bold">Service Case Overview</h4>
              <p class="text-sm text-[var(--text-muted)] leading-relaxed">
                {{ selectedProjectModal.description }}
              </p>

              <!-- Diagnostic Checkpoints -->
              <div class="space-y-2">
                <div class="text-xs uppercase tracking-wider font-bold text-[var(--text-light)]">Diagnostic & Action Checkpoints</div>
                <ul class="space-y-1.5 text-xs text-[var(--text-muted)]">
                  <li *ngFor="let feat of selectedProjectModal.features" class="flex items-start gap-2">
                    <span class="text-emerald-500 font-bold">✓</span>
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="space-y-4 bg-[var(--bg-surface-subtle)] p-5 rounded-2xl border border-[var(--border-subtle)]">
              <h4 class="font-serif text-lg font-bold">Genuine Spare Parts & Tools</h4>
              
              <div class="space-y-2">
                <div class="flex flex-wrap gap-1.5">
                  <span 
                    *ngFor="let mat of selectedProjectModal.materials"
                    class="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] text-xs text-[var(--text-main)] border border-[var(--border-subtle)] font-medium">
                    ⚙️ {{ mat }}
                  </span>
                </div>
              </div>

              <!-- Price Box Inside Modal -->
              <div class="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <div class="text-xs text-[var(--text-light)] font-mono">Inspection & Safety Audit</div>
                  <div class="text-2xl font-extrabold font-mono text-[var(--color-secondary)]">
                    ₹{{ selectedProjectModal.priceINR }}
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Doorstep in 90 Mins
                  </span>
                </div>
              </div>

              <!-- Emergency Note -->
              <div class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                ⚡ Certified technician ready for same-day doorstep dispatch. Call 8088034849.
              </div>

            </div>

          </div>

          <!-- Modal Action Bar -->
          <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
            <a 
              [href]="'tel:8088034849'"
              class="btn-secondary text-xs py-2.5 px-4 font-bold">
              📞 Call Helpline: 8088034849
            </a>

            <div class="flex items-center gap-3">
              <a 
                [href]="'https://wa.me/918088034849?text=' + getQuoteMessage(selectedProjectModal)"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-flame text-xs py-2.5 px-5 shadow-lg">
                💬 Book Technician on WhatsApp
              </a>
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
export class GalleryHubComponent {
  interiorService = inject(InteriorService);
  storageService = inject(StorageService);
  downloadService = inject(DownloadService);

  categoryInput = input<RoomCategoryId | 'all'>('all');
  selectedCategory = signal<RoomCategoryId | 'all'>('all');

  selectedBrand: BrandName | 'all' = 'all';
  selectedStyle: string = 'all';
  sortBy = 'popular';
  searchFilter = '';

  selectedProjectModal: DesignProject | null = null;
  activeModalImage = '';

  constructor() {
    effect(() => {
      const parentCat = this.categoryInput();
      if (parentCat) {
        this.selectedCategory.set(parentCat);
      }
    });
  }

  getCategoryCount(catId: RoomCategoryId): number {
    return this.interiorService.projects.filter(p => p.category === catId).length;
  }

  get hasActiveFilters(): boolean {
    return this.selectedCategory() !== 'all' || this.selectedBrand !== 'all' || this.selectedStyle !== 'all' || this.searchFilter !== '';
  }

  resetFilters(): void {
    this.selectedCategory.set('all');
    this.selectedBrand = 'all';
    this.selectedStyle = 'all';
    this.searchFilter = '';
    this.sortBy = 'popular';
  }

  get filteredProjects(): DesignProject[] {
    let list = this.interiorService.projects;

    if (this.selectedCategory() !== 'all') {
      list = list.filter(p => p.category === this.selectedCategory());
    }

    if (this.selectedBrand !== 'all') {
      list = list.filter(p => p.brand === this.selectedBrand);
    }

    if (this.selectedStyle !== 'all') {
      list = list.filter(p => p.style === this.selectedStyle);
    }

    if (this.searchFilter.trim()) {
      const q = this.searchFilter.toLowerCase().trim();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materials.some(m => m.toLowerCase().includes(q)) ||
        p.features.some(f => f.toLowerCase().includes(q)) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return [...list].sort((a, b) => {
      if (this.sortBy === 'popular') return b.likes - a.likes;
      if (this.sortBy === 'rating') return b.rating - a.rating;
      if (this.sortBy === 'price-asc') return a.priceINR - b.priceINR;
      if (this.sortBy === 'price-desc') return b.priceINR - a.priceINR;
      return 0;
    });
  }

  async downloadImage(project: DesignProject): Promise<void> {
    const filename = `OmniAppliances_Repair_${project.brand}_${project.category}_${project.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.jpg`;
    await this.downloadService.downloadImage(project.image, filename);
  }

  openProjectModal(project: DesignProject): void {
    this.selectedProjectModal = project;
    this.activeModalImage = project.image;
  }

  closeProjectModal(): void {
    this.selectedProjectModal = null;
  }

  getQuoteMessage(project: DesignProject): string {
    return encodeURIComponent(`Hello OmniAppliances, I would like to book a technician for ${project.title} (Inspection: ₹${project.priceINR}).`);
  }
}
