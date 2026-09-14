import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PromoOffer {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  items: string[];
  originalPriceINR: number;
  offerPriceINR: number;
  discountPercent: number;
  validity: string;
  image: string;
  brand: string;
}

@Component({
  selector: 'app-promotional-offers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="offers" class="py-20 md:py-28 bg-[var(--bg-surface)]">
      <div class="container-custom space-y-12">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider">
              <span>🔥</span> Seasonal Service Deals & Maintenance Combos
            </div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-main)]">
              Specialized Appliance Repair Packages
            </h2>
            <p class="text-base sm:text-lg text-[var(--text-muted)]">
              Save on professional chimney chemical washes, hob burner descaling tune-ups, and full kitchen annual maintenance plans with 90-day service warranty.
            </p>
          </div>

          <div class="text-xs uppercase tracking-widest text-[var(--color-secondary)] font-mono font-bold">
            DOORSTEP SERVICE PACKAGES
          </div>
        </div>

        <!-- 3 Feature Promo Cards Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div 
            *ngFor="let offer of promoOffers"
            class="luxury-card overflow-hidden group flex flex-col justify-between border border-[var(--border-subtle)] bg-[var(--bg-surface-card)] hover:border-[var(--color-secondary)] shadow-sm hover:shadow-xl transition-all duration-300">
            
            <!-- Image with Discount Pill Overlay -->
            <div class="relative aspect-[16/10] overflow-hidden bg-zinc-950">
              <img 
                [src]="offer.image" 
                [alt]="offer.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
              
              <!-- Floating Top Badges -->
              <div class="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span class="badge-pill bg-emerald-600 text-white font-extrabold text-xs shadow-lg">
                  {{ offer.discountPercent }}% OFF
                </span>
                <span class="badge-pill bg-black/70 text-amber-300 backdrop-blur-md border border-white/20 text-[0.7rem] font-mono">
                  {{ offer.brand }}
                </span>
              </div>

              <!-- Validity Tag on Bottom of Image -->
              <div class="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between text-xs">
                <span class="font-mono text-amber-300 font-bold">{{ offer.badge }}</span>
                <span class="text-zinc-300 font-mono text-[0.7rem]">{{ offer.validity }}</span>
              </div>
            </div>

            <!-- Content Details -->
            <div class="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
              <div class="space-y-3">
                <h3 class="font-serif text-xl sm:text-2xl font-bold text-[var(--text-main)] group-hover:text-[var(--color-secondary)] transition-colors">
                  {{ offer.title }}
                </h3>
                <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                  {{ offer.subtitle }}
                </p>

                <!-- Inclusions Checklist -->
                <div class="space-y-1.5 pt-2">
                  <div class="text-[0.7rem] uppercase font-bold tracking-wider text-[var(--text-light)]">Service Inclusions:</div>
                  <ul class="space-y-1 text-xs text-[var(--text-main)] font-medium">
                    <li *ngFor="let item of offer.items" class="flex items-center gap-2">
                      <span class="text-emerald-500 font-bold">✓</span> {{ item }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Price Box & Action -->
              <div class="pt-4 border-t border-[var(--border-subtle)] space-y-4">
                <div class="flex items-baseline justify-between">
                  <div>
                    <span class="text-xs text-[var(--text-light)] line-through mr-2">₹{{ offer.originalPriceINR }}</span>
                    <div class="text-2xl font-mono font-extrabold text-[var(--color-secondary)]">
                      ₹{{ offer.offerPriceINR }}
                    </div>
                  </div>
                  <span class="text-[0.7rem] font-bold uppercase text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded">
                    Save ₹{{ offer.originalPriceINR - offer.offerPriceINR }}
                  </span>
                </div>

                <button 
                  (click)="openConsultation.emit()"
                  class="btn-flame w-full py-3 text-xs uppercase tracking-wider shadow-md">
                  Book This Service Package →
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
export class PromotionalOffersComponent {
  openConsultation = output<void>();

  readonly promoOffers: PromoOffer[] = [
    {
      id: 'offer-01',
      badge: 'Bestseller Chimney Wash',
      brand: 'Faber & Elica Chimneys',
      title: 'Deep Chemical Descaling & Motor Suction Combo',
      subtitle: 'Complete unmounting, high-pressure chemical degreasing of blower fan, thermal auto-clean repair, and anti-leak aluminium duct taping.',
      items: [
        'Complete Blower & Motor Housing Chemical Wash',
        'Auto-Clean Thermal Heating Element Testing',
        'Motor Bearing Lubrication & Acoustic Tuning',
        '90-Day Full Suction & Noise Warranty'
      ],
      originalPriceINR: 1599,
      offerPriceINR: 799,
      discountPercent: 50,
      validity: 'Doorstep in 90 Mins',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'offer-02',
      badge: 'Blue Flame Safety Tune-up',
      brand: 'Bosch, Siemens & Häfele Hobs',
      title: '4-Burner Hob Burner Ultrasonic Tune-up & Gas Audit',
      subtitle: 'Ultrasonic carbon descaling of all brass burners, micro-jet reaming, ignition micro-switch calibration, and sniffer gas leak safety test.',
      items: [
        'Ultrasonic Carbon Cleaning for 4 Brass Burners',
        'Pulse Spark Ignition & Micro-switch Tuning',
        'Electronic Gas Sniffer Leakage Safety Audit',
        'Flame Failure Device (FFD) Calibration'
      ],
      originalPriceINR: 999,
      offerPriceINR: 499,
      discountPercent: 50,
      validity: 'Same-Day Technician Visit',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85'
    },
    {
      id: 'offer-03',
      badge: 'Complete Kitchen AMC Suite',
      brand: 'Multi-Brand Kitchen Suite',
      title: 'Full Annual Maintenance Contract (AMC) Plan',
      subtitle: 'Annual care covering 4 scheduled quarterly deep cleanings, unlimited free breakdown visits, and free priority emergency gas leak support.',
      items: [
        '4 Scheduled Quarterly Deep Servicing Visits',
        'Unlimited Free Breakdown & Repair Callouts',
        '20% Flat Discount on All Genuine OEM Spares',
        'Priority 60-Minute Emergency Dispatch'
      ],
      originalPriceINR: 2999,
      offerPriceINR: 1499,
      discountPercent: 50,
      validity: '1-Year Full Coverage',
      image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1200&q=85'
    }
  ];
}
