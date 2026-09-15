import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteriorService } from '../../services/interior.service';
import { DownloadService } from '../../services/download.service';
import { CategoryInfo, RoomCategoryId } from '../../models/interior.models';

@Component({
  selector: 'app-categories-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="categories" class="py-20 md:py-28 bg-[var(--bg-surface-subtle)] border-y border-[var(--border-subtle)]">
      <div class="container-custom space-y-12">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider">
              <span>🛠️</span> Repair & Service Categories
            </div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-main)]">
              Nine Kitchen Cooking Appliance Repair Services
            </h2>
            <p class="text-base sm:text-lg text-[var(--text-muted)]">
              Click on any appliance category to view detailed technical repair guides, 4–5 service photos, diagnosed symptoms, 6-stage workflows, and transparent rate cards.
            </p>
          </div>

          <div class="text-xs uppercase tracking-widest text-[var(--color-secondary)] font-mono font-bold">
            CLICK ANY CATEGORY FOR DETAILED SERVICE MANUAL
          </div>
        </div>

        <!-- 9 Categories Responsive Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            *ngFor="let cat of interiorService.categories"
            (click)="onCategoryCardClick(cat)"
            class="luxury-card overflow-hidden group flex flex-col justify-between border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--color-secondary)] shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer">
            
            <!-- Category Image Header -->
            <div class="relative aspect-[16/10] overflow-hidden bg-zinc-950">
              <img 
                [src]="cat.coverImage" 
                [alt]="cat.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
              
              <!-- Category Badge & Starting Price -->
              <div class="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span class="badge-pill bg-black/80 text-white backdrop-blur-md border border-white/20 font-bold text-xs">
                  {{ cat.name }}
                </span>
                <span class="badge-pill badge-flame backdrop-blur-md font-mono text-xs">
                  From ₹{{ cat.servicePriceStartingINR }}
                </span>
              </div>

              <!-- Bottom Indicator: 4-5 Photos Available -->
              <div class="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between text-xs font-mono">
                <span class="text-amber-300 font-bold">
                  📸 {{ cat.images.length }} Service Photos
                </span>
                <span class="bg-black/70 px-2 py-0.5 rounded text-[0.68rem] text-zinc-300">
                  {{ cat.turnaroundHours }}
                </span>
              </div>
            </div>

            <!-- Category Description & Metadata Body -->
            <div class="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div class="space-y-2">
                <h3 class="font-serif text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--color-secondary)] transition-colors flex items-center justify-between">
                  <span>{{ cat.name }}</span>
                  <span class="text-xs text-[var(--color-secondary)] group-hover:translate-x-1 transition-transform">→</span>
                </h3>
                <p class="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                  {{ cat.shortDesc }}
                </p>
              </div>

              <!-- Common Problems Preview Pills -->
              <div class="space-y-1.5 pt-1">
                <div class="text-[0.68rem] uppercase font-bold tracking-wider text-[var(--text-light)]">Common Fixes:</div>
                <div class="flex flex-wrap gap-1">
                  <span 
                    *ngFor="let issue of cat.commonIssues.slice(0, 2)"
                    class="px-2 py-0.5 rounded bg-[var(--bg-surface-subtle)] text-[0.65rem] text-[var(--text-muted)] border border-[var(--border-subtle)] truncate max-w-[240px]">
                    ✓ {{ issue }}
                  </span>
                </div>
              </div>

              <div class="pt-4 border-t border-[var(--border-subtle)] space-y-3">
                <div class="flex items-center justify-between text-xs text-[var(--text-light)]">
                  <span>Authorized Brands:</span>
                  <span class="font-bold text-[var(--text-main)] font-mono text-[0.7rem] truncate max-w-[180px]">
                    {{ cat.topBrands.join(', ') }}
                  </span>
                </div>

                <!-- Action Buttons: Open 35-line guide & Download Photos -->
                <div class="grid grid-cols-2 gap-2 pt-1">
                  <button 
                    (click)="onCategoryCardClick(cat); $event.stopPropagation()"
                    class="btn-flame text-xs py-2.5 px-3 justify-center w-full font-bold shadow-md">
                    📖 35-Line Service Guide →
                  </button>
                  <button 
                    (click)="downloadCategoryPack(cat); $event.stopPropagation()"
                    class="btn-secondary text-xs py-2.5 px-3 justify-center w-full font-bold"
                    [title]="'Download service guide & photos for ' + cat.name">
                    📥 Download Photos
                  </button>
                </div>
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
export class CategoriesShowcaseComponent {
  interiorService = inject(InteriorService);
  downloadService = inject(DownloadService);

  selectCategory = output<RoomCategoryId>();
  viewCategoryDetail = output<CategoryInfo>();

  onCategoryCardClick(cat: CategoryInfo) {
    this.viewCategoryDetail.emit(cat);
  }

  async downloadCategoryPack(cat: CategoryInfo) {
    const downloadItems = cat.images.map((imgUrl, idx) => ({
      url: imgUrl,
      name: `OmniAppliances_Repair_${cat.id}_Photo_${idx + 1}.jpg`
    }));
    await this.downloadService.downloadBatch(downloadItems, `${cat.name} Service Photos`);
  }
}
