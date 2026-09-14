import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InteriorService } from '../../services/interior.service';
import { DownloadService } from '../../services/download.service';
import { RoomCategoryId, CategoryInfo } from '../../models/interior.models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <footer class="bg-[var(--color-primary)] text-white pt-20 pb-12 border-t border-white/10">
      <div class="container-custom space-y-16">
        
        <!-- Top Row: Brand & Service Helpline -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div class="lg:col-span-5 space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-[var(--color-secondary)] text-[#121417] flex items-center justify-center font-serif text-xl font-extrabold shadow-lg">
                S
              </div>
              <div>
                <span class="font-serif text-2xl font-extrabold tracking-tight text-white block leading-none">
                  SULTAN
                </span>
                <span class="text-[0.65rem] tracking-[0.25em] font-bold text-amber-400 uppercase block mt-1">
                  KITCHEN APPLIANCE REPAIR CENTER
                </span>
              </div>
            </div>

            <p class="text-sm text-zinc-300 max-w-sm leading-relaxed">
              Premier multi-brand repair & service center for kitchen cooking appliances. Doorstep technician visits within 90 minutes for built-in hobs, smart auto-clean chimneys, gas stoves, built-in ovens, and induction cooktops.
            </p>

            <div class="text-xs font-mono text-zinc-400 space-y-1.5 pt-2">
              <div class="flex items-center gap-2">
                <span class="text-amber-400 font-bold">📞 24/7 Helpline:</span>
                <a [href]="'tel:' + contactNumber" class="text-white hover:text-amber-300 font-bold transition-colors">{{ contactNumber }}</a>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-emerald-400 font-bold">💬 WhatsApp Desk:</span>
                <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" class="text-emerald-300 hover:text-emerald-200 transition-colors font-bold">+91 {{ contactNumber }}</a>
              </div>
              <div>Certified Brands: Siemens • Bosch • Faber • Elica • Häfele • Gilma • Crompton • Hindware</div>
            </div>
          </div>

          <!-- Newsletter & Quick Booking Box -->
          <div class="lg:col-span-7 bg-white/5 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
            <div class="space-y-1">
              <span class="badge-pill bg-[var(--color-secondary)]/20 text-amber-300 text-[0.7rem] font-bold">
                Emergency Breakdown Assistance
              </span>
              <h4 class="font-serif text-xl sm:text-2xl font-bold text-white">
                Book a Doorstep Technician in 60 Seconds
              </h4>
              <p class="text-xs text-zinc-300">
                Enter your phone number for priority callback and emergency gas leak / repair dispatch.
              </p>
            </div>

            <form (ngSubmit)="quickBookPhone()" class="flex flex-col sm:flex-row gap-2.5">
              <input 
                type="tel" 
                [(ngModel)]="phoneInput" 
                name="phone" 
                required 
                placeholder="Enter 10-digit mobile number for immediate callback..."
                class="bg-white/10 text-white placeholder:text-zinc-500 text-sm rounded-xl px-4 py-3 border border-white/15 outline-none focus:border-[var(--color-secondary)] flex-1 font-medium"
              />
              <button 
                type="submit" 
                class="btn-flame text-xs py-3 px-6 uppercase tracking-wider whitespace-nowrap shadow-lg">
                Request Quick Callback
              </button>
            </form>
          </div>

        </div>

        <!-- Middle Row: Appliance Repair Categories & Brands Links -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 pt-12 border-t border-white/10 text-xs text-zinc-400">
          
          <!-- Column 1: Core Categories -->
          <div class="space-y-3">
            <div class="font-serif font-bold text-sm text-white uppercase tracking-wider">Hobs & Stoves Repair</div>
            <ul class="space-y-2">
              <li><button (click)="onCategoryClick('builtin-hobs')" class="hover:text-white transition-colors">Built-in Hob Servicing</button></li>
              <li><button (click)="onCategoryClick('gas-stoves')" class="hover:text-white transition-colors">Gas Stove Repair</button></li>
              <li><button (click)="onCategoryClick('cooktops')" class="hover:text-white transition-colors">Induction Plate Repair</button></li>
              <li><button (click)="onCategoryClick('gas-burners')" class="hover:text-white transition-colors">Brass Burner Descaling</button></li>
            </ul>
          </div>

          <!-- Column 2: Chimneys & Ovens -->
          <div class="space-y-3">
            <div class="font-serif font-bold text-sm text-white uppercase tracking-wider">Chimneys & Ovens</div>
            <ul class="space-y-2">
              <li><button (click)="onCategoryClick('chimneys')" class="hover:text-white transition-colors">Chimney Chemical Wash</button></li>
              <li><button (click)="onCategoryClick('ovens')" class="hover:text-white transition-colors">Built-in Oven Repair</button></li>
              <li><button (click)="onCategoryClick('cookers')" class="hover:text-white transition-colors">Electric Cooker Service</button></li>
              <li><button (click)="onCategoryClick('kitchen-exhaust')" class="hover:text-white transition-colors">Exhaust Duct Cleaning</button></li>
              <li><button (click)="onCategoryClick('cooking-accessories')" class="hover:text-white transition-colors">OEM Spare Parts</button></li>
            </ul>
          </div>

          <!-- Column 3: Brands Serviced -->
          <div class="space-y-3">
            <div class="font-serif font-bold text-sm text-white uppercase tracking-wider">Brands Serviced</div>
            <ul class="space-y-2">
              <li><span>Bosch German Tech</span></li>
              <li><span>Siemens Luxury Kitchen</span></li>
              <li><span>Faber Master Chimneys</span></li>
              <li><span>Elica Silent Hoods</span></li>
              <li><span>Häfele Architectural</span></li>
              <li><span>Hindware & Crompton</span></li>
            </ul>
          </div>

          <!-- Column 4: Service Tools -->
          <div class="space-y-3">
            <div class="font-serif font-bold text-sm text-white uppercase tracking-wider">Diagnostic Tools</div>
            <ul class="space-y-2">
              <li><a href="#estimator" class="hover:text-white transition-colors">Repair Cost Rate Card</a></li>
              <li><a href="#transformations" class="hover:text-white transition-colors">Before & After Results</a></li>
              <li><a href="#quiz" class="hover:text-white transition-colors">Appliance Diagnostic Quiz</a></li>
              <li><a href="#gallery" class="hover:text-white transition-colors">Verified Repair Cases</a></li>
            </ul>
          </div>

          <!-- Column 5: Service Assurances -->
          <div class="space-y-3">
            <div class="font-serif font-bold text-sm text-white uppercase tracking-wider">Service Guarantee</div>
            <ul class="space-y-2">
              <li><span class="text-emerald-400 font-bold">✓ 90-Day Service Warranty</span></li>
              <li><span>Doorstep in 90 Minutes</span></li>
              <li><span>100% Genuine OEM Spares</span></li>
              <li><span>Electronic Gas Leak Audit</span></li>
              <li><span>Fixed Upfront Pricing</span></li>
            </ul>
          </div>

        </div>

        <!-- Bottom Copyright Row -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-zinc-400">
          <div>
            © {{ currentYear }} SULTAN HOME APPLIANCES. All rights reserved. Professional Kitchen Cooking Appliance Repair & Servicing.
          </div>

          <div class="flex items-center gap-6">
            <a href="#hero" class="hover:text-white transition-colors font-bold">Back to Top ↑</a>
          </div>
        </div>

      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FooterComponent {
  interiorService = inject(InteriorService);
  downloadService = inject(DownloadService);
  selectCategory = output<RoomCategoryId>();
  viewCategoryDetail = output<CategoryInfo>();

  readonly contactNumber = '8076224170';
  readonly whatsappUrl = 'https://wa.me/918076224170?text=' + encodeURIComponent('Hello Sultan Home Appliances, I would like to book a technician for appliance repair.');

  phoneInput = '';
  currentYear = new Date().getFullYear();

  onCategoryClick(catId: RoomCategoryId) {
    const cat = this.interiorService.getCategoryById(catId);
    if (cat) {
      this.viewCategoryDetail.emit(cat);
    } else {
      this.selectCategory.emit(catId);
    }
  }

  quickBookPhone() {
    if (!this.phoneInput) return;
    this.downloadService.showToast(`✓ Callback request registered for ${this.phoneInput}. Technician contacting you!`);
    this.phoneInput = '';
  }
}
