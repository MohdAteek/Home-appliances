import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { InteriorService } from '../../services/interior.service';
import { DownloadService } from '../../services/download.service';
import { DesignProject } from '../../models/interior.models';

@Component({
  selector: 'app-favorites-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Slide-over Backdrop -->
    <div 
      class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-fade-in flex justify-end"
      (click)="close.emit()">
      
      <!-- Drawer Container -->
      <div 
        class="w-full max-w-md bg-[var(--bg-surface)] text-[var(--text-main)] h-full shadow-2xl border-l border-[var(--border-subtle)] p-6 flex flex-col justify-between overflow-y-auto animate-scale-in"
        (click)="$event.stopPropagation()">
        
        <!-- Drawer Header -->
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div class="flex items-center gap-2">
              <span class="text-xl">❤️</span>
              <h3 class="font-serif text-2xl font-bold">Saved Appliances</h3>
              <span class="badge-pill badge-flame text-[0.7rem] font-bold font-mono">
                {{ favoriteProjects.length }}
              </span>
            </div>

            <button 
              (click)="close.emit()"
              class="btn-icon text-base"
              aria-label="Close drawer">
              ✕
            </button>
          </div>

          <!-- Empty State -->
          <div *ngIf="favoriteProjects.length === 0" class="py-20 text-center space-y-3">
            <div class="text-4xl">🤍</div>
            <h4 class="font-serif text-lg font-bold">No Saved Appliances Yet</h4>
            <p class="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
              Click the heart icon on any cooking appliance card in the catalog to save it to your wishlist.
            </p>
          </div>

          <!-- List of Saved Products -->
          <div *ngIf="favoriteProjects.length > 0" class="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
            <div 
              *ngFor="let project of favoriteProjects"
              class="flex items-center gap-3.5 p-3.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] hover:border-[var(--color-secondary)] transition-all group">
              
              <!-- Thumbnail -->
              <img 
                [src]="project.image" 
                [alt]="project.title"
                class="w-16 h-16 rounded-xl object-cover bg-zinc-950 flex-shrink-0"
              />

              <!-- Info -->
              <div class="flex-1 min-w-0 space-y-0.5">
                <span class="text-[0.65rem] uppercase tracking-wider text-[var(--color-secondary)] font-mono font-bold block">
                  {{ project.brand }} • {{ project.categoryName }}
                </span>
                <div class="font-bold text-xs truncate text-[var(--text-main)]">
                  {{ project.title }}
                </div>
                <div class="text-xs font-mono font-extrabold text-[var(--text-main)]">
                  ₹{{ project.priceINR.toLocaleString('en-IN') }}
                </div>
              </div>

              <!-- Quick Actions: Download & Delete -->
              <div class="flex flex-col gap-1.5 flex-shrink-0">
                <button 
                  (click)="downloadService.downloadImage(project.image, 'OmniAppliances_' + project.title + '.jpg')"
                  class="btn-icon w-8 h-8 text-xs"
                  title="Download Product Sheet">
                  📥
                </button>
                <button 
                  (click)="removeFavorite(project.id)"
                  class="btn-icon w-8 h-8 text-xs text-red-500 hover:bg-red-100"
                  title="Remove from wishlist">
                  ✕
                </button>
              </div>

            </div>
          </div>
        </div>

        <!-- Drawer Footer with Batch Download & Quote Inquiry -->
        <div *ngIf="favoriteProjects.length > 0" class="space-y-3 pt-6 border-t border-[var(--border-subtle)]">
          <div class="flex justify-between text-xs font-semibold">
            <span class="text-[var(--text-muted)]">Saved Total:</span>
            <span class="font-mono text-[var(--text-main)] font-bold">{{ favoriteProjects.length }} Appliances</span>
          </div>

          <button 
            (click)="downloadAllFavorites()"
            class="btn-flame w-full py-3 text-xs uppercase tracking-wider shadow-lg">
            📥 Download All Saved Spec Sheets ({{ favoriteProjects.length }})
          </button>

          <button 
            (click)="close.emit(); openConsultation.emit()"
            class="btn-primary w-full py-3 text-xs uppercase tracking-wider font-bold">
            📅 Request Quote for Saved Items
          </button>
        </div>

      </div>

    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FavoritesDrawerComponent {
  storageService = inject(StorageService);
  interiorService = inject(InteriorService);
  downloadService = inject(DownloadService);

  close = output<void>();
  openConsultation = output<void>();

  get favoriteProjects(): DesignProject[] {
    const ids = this.storageService.favorites();
    return ids.map(id => this.interiorService.getProjectById(id)).filter((p): p is DesignProject => !!p);
  }

  removeFavorite(id: string): void {
    this.storageService.toggleFavorite(id);
  }

  async downloadAllFavorites(): Promise<void> {
    const list = this.favoriteProjects.map(p => ({
      url: p.image,
      name: `OmniAppliances_${p.brand}_${p.category}_${p.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.jpg`
    }));
    await this.downloadService.downloadBatch(list, 'Saved Appliances');
  }
}
