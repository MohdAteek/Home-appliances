import { Component, HostListener, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { InteriorService } from '../../services/interior.service';
import { RoomCategoryId, CategoryInfo } from '../../models/interior.models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class.scrolled-header]="isScrolled()"
      [class.default-header]="!isScrolled()">
      
      <!-- 1. Top Utility / Announcement Bar -->
      <div class="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 backdrop-blur-md hidden lg:block transition-all duration-300 py-1.5 px-6 text-xs text-[var(--text-muted)]">
        <div class="container-custom flex items-center justify-between">
          
          <!-- Global Authorized Dealership & Repair Metrics -->
          <div class="flex items-center gap-5">
            <span class="flex items-center gap-1.5 font-bold tracking-wider text-[var(--text-main)] uppercase text-[0.68rem]">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Multi-Brand Repair Specialist: Siemens • Bosch • Faber • Elica • Häfele • Gilma • Crompton • Hindware
            </span>
            <span class="text-[var(--border-medium)]">|</span>
            <span class="flex items-center gap-1.5 font-medium">
              <svg class="w-3.5 h-3.5 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>Doorstep Service Charge ₹399 • 90 Mins Dispatch • 100% Genuine OEM Spares</span>
            </span>
          </div>

          <!-- Quick Access Tools & Contact -->
          <div class="flex items-center gap-5">
            <a href="#estimator" class="hover:text-[var(--color-secondary)] transition-colors flex items-center gap-1 font-medium">
              <svg class="w-3 h-3 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              <span>Repair Cost & Rate Card</span>
            </a>
            
            <a [href]="'tel:' + contactNumber" class="hover:text-[var(--color-secondary)] transition-colors flex items-center gap-1 font-bold text-[var(--text-main)]" [title]="'Call ' + contactNumber">
              <svg class="w-3 h-3 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span>24/7 Helpline: {{ contactNumber }}</span>
            </a>

            <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" class="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors flex items-center gap-1 font-bold" title="Chat on WhatsApp">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.52 3.48A11.84 11.84 0 0012.08 0C5.53 0 .2 5.33.2 11.88c0 2.09.55 4.13 1.59 5.92L.1 24l6.34-1.66a11.86 11.86 0 005.64 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.18-1.24-6.16-3.45-8.41zM12.09 21.77h-.01a9.85 9.85 0 01-5.02-1.38l-.36-.21-3.76.99 1-3.67-.23-.38a9.87 9.87 0 01-1.51-5.24C2.2 6.98 6.63 2.55 12.08 2.55c2.64 0 5.12 1.03 6.99 2.91a9.82 9.82 0 012.9 7c0 5.45-4.43 9.88-9.88 9.88zm5.42-7.4c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-1.77-.89-2.93-1.58-4.1-3.58-.31-.54.31-.5.89-1.67.1-.2.05-.37-.03-.52-.08-.15-.68-1.64-.93-2.25-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.09 4.49 1.89.82 2.63.89 3.57.75.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
              </svg>
              <span>WhatsApp Booking</span>
            </a>

            <!-- Theme Toggle -->
            <button 
              (click)="storageService.toggleTheme()" 
              class="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors focus:outline-none"
              [title]="storageService.theme() === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
              aria-label="Toggle theme">
              <svg *ngIf="storageService.theme() === 'dark'" class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <svg *ngIf="storageService.theme() === 'light'" class="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
              <span class="text-[0.7rem] uppercase tracking-wider font-bold">{{ storageService.theme() === 'dark' ? 'Light' : 'Dark' }}</span>
            </button>
          </div>

        </div>
      </div>

      <!-- 2. Master Navigation Bar -->
      <div class="glass-nav border-b border-[var(--border-subtle)] px-4 sm:px-6 lg:px-8">
        <div class="container-custom flex items-center justify-between h-20 transition-all duration-300" [class.h-16]="isScrolled()">
          
          <!-- Left: Brand Identity & Logo -->
          <div class="flex items-center gap-8">
            <a href="#hero" class="flex items-center gap-3.5 group text-decoration-none">
              <div class="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#121417] via-[#1e2229] to-[#0f172a] text-white flex items-center justify-center font-serif text-xl font-extrabold shadow-xl ring-1 ring-[var(--border-gold)] group-hover:scale-105 transition-all duration-300">
                <span class="bg-gradient-to-tr from-amber-400 via-[var(--color-secondary)] to-amber-200 bg-clip-text text-transparent">O</span>
                <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[var(--color-secondary)] border-2 border-[var(--bg-surface)] flex items-center justify-center">
                  <span class="text-[0.55rem] text-white font-bold">🔧</span>
                </div>
              </div>
              <div class="flex flex-col">
                <div class="flex items-center gap-2">
                  <span class="font-serif text-2xl font-extrabold tracking-tight text-[var(--text-main)] leading-none">
                    OmniAppliances
                  </span>
                  <span class="inline-block px-2 py-0.5 rounded text-[0.6rem] font-extrabold tracking-widest uppercase bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] border border-[var(--color-secondary)]/30">
                    REPAIR & SERVICE
                  </span>
                </div>
                <span class="text-[0.62rem] tracking-[0.2em] font-bold text-[var(--text-muted)] uppercase block mt-1">
                  PREMIUM COOKING APPLIANCE SERVICE
                </span>
              </div>
            </a>
          </div>

          <!-- Center: Navigation Dropdowns -->
          <nav class="hidden lg:flex items-center gap-1 xl:gap-2">
            
            <!-- Dropdown 1: Appliance Repair Categories Mega Menu -->
            <div class="relative" (mouseenter)="openMegaMenu('spaces')" (mouseleave)="closeMegaMenu('spaces')">
              <button 
                type="button"
                (click)="toggleMegaMenu('spaces')"
                class="px-3.5 py-2 rounded-xl text-sm font-bold text-[var(--text-main)] hover:bg-[var(--border-subtle)]/50 transition-all flex items-center gap-1.5 group focus:outline-none">
                <span class="group-hover:text-[var(--color-secondary)] transition-colors">Repair Services</span>
                <span class="px-1.5 py-0.2 rounded-full text-[0.65rem] bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] font-extrabold">9</span>
                <svg class="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-transform duration-200" [class.rotate-180]="activeMegaMenu() === 'spaces'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <!-- Categories Mega Menu Dropdown -->
              <div 
                *ngIf="activeMegaMenu() === 'spaces'"
                class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[860px] glass-panel rounded-3xl shadow-2xl border border-[var(--border-subtle)] p-6 animate-fade-in z-50">
                
                <div class="grid grid-cols-12 gap-6">
                  
                  <!-- Left 8 cols: Appliance Repair Categories Grid -->
                  <div class="col-span-8">
                    <div class="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-subtle)]">
                      <span class="text-xs font-bold uppercase tracking-widest text-[var(--color-secondary)] font-mono">Kitchen Cooking Appliance Services</span>
                      <a href="#categories" (click)="closeAll()" class="text-xs font-bold text-[var(--text-main)] hover:text-[var(--color-secondary)] transition-colors">
                        View All Categories →
                      </a>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-2.5">
                      <div 
                        *ngFor="let cat of interiorService.categories"
                        (click)="onCategoryClick(cat)"
                        class="p-2.5 rounded-2xl hover:bg-[var(--border-subtle)]/60 transition-all cursor-pointer group flex items-start gap-3">
                        <div class="w-8 h-8 rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-secondary)] group-hover:text-white transition-all font-bold text-xs">
                          🛠️
                        </div>
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-[var(--text-main)] group-hover:text-[var(--color-secondary)] transition-colors truncate">
                              {{ cat.name }}
                            </span>
                            <span class="text-[0.65rem] text-[var(--color-secondary)] font-mono font-bold">From ₹{{ cat.servicePriceStartingINR }}</span>
                          </div>
                          <p class="text-[0.68rem] text-[var(--text-muted)] line-clamp-1 mt-0.5 leading-snug">
                            {{ cat.shortDesc }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Right 4 cols: Feature Brand & Direct Service Pack Action -->
                  <div class="col-span-4 bg-[var(--bg-surface-subtle)] rounded-2xl p-5 flex flex-col justify-between border border-[var(--border-subtle)]">
                    <div>
                      <div class="inline-block px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] mb-2">
                        Doorstep Service Assurance
                      </div>
                      <h4 class="font-serif text-sm font-bold text-[var(--text-main)] mb-1">
                        90-Day Full Service Warranty
                      </h4>
                      <p class="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
                        Every repair is completed with original OEM spares, gas safety pressure audit, and official warranty card.
                      </p>
                    </div>

                    <div class="space-y-2">
                      <button 
                        (click)="closeAll(); openConsultation.emit()" 
                        class="w-full btn-flame text-center text-xs py-2 block font-bold">
                        📅 Book Technician Visit
                      </button>
                      <a 
                        [href]="'tel:' + contactNumber"
                        class="w-full text-center text-[0.72rem] text-[var(--color-secondary)] hover:underline block font-mono font-bold py-1">
                        📞 Call Helpline: {{ contactNumber }}
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <!-- Single Link 1: Brands -->
            <a 
              href="#brands" 
              class="px-3.5 py-2 rounded-xl text-sm font-bold text-[var(--text-main)] hover:bg-[var(--border-subtle)]/50 hover:text-[var(--color-secondary)] transition-all">
              Brands Repaired
            </a>

            <!-- Single Link 2: Why Choose Us -->
            <a 
              href="#why-choose-us" 
              class="px-3.5 py-2 rounded-xl text-sm font-bold text-[var(--text-main)] hover:bg-[var(--border-subtle)]/50 hover:text-[var(--color-secondary)] transition-all">
              Why Us
            </a>

            <!-- Single Link 3: Service Offers -->
            <a 
              href="#offers" 
              class="px-3.5 py-2 rounded-xl text-sm font-bold text-[var(--text-main)] hover:bg-[var(--border-subtle)]/50 hover:text-[var(--color-secondary)] transition-all flex items-center gap-1">
              <span>Service Combos</span>
              <span class="px-1.5 py-0.2 rounded text-[0.6rem] bg-amber-600 text-white font-extrabold">₹399+</span>
            </a>

            <!-- Single Link 4: Rate Card -->
            <a 
              href="#estimator" 
              class="px-3.5 py-2 rounded-xl text-sm font-bold text-[var(--text-main)] hover:bg-[var(--border-subtle)]/50 hover:text-[var(--color-secondary)] transition-all">
              Rate Card
            </a>

            <!-- Single Link 5: Master Gallery -->
            <a 
              href="#gallery" 
              class="px-3.5 py-2 rounded-xl text-sm font-bold text-[var(--text-main)] hover:bg-[var(--border-subtle)]/50 hover:text-[var(--color-secondary)] transition-all">
              Repair Cases
            </a>
          </nav>

          <!-- Right: Search, Saved Items Vault & Consultation CTA -->
          <div class="flex items-center gap-2.5 sm:gap-3">
            
            <!-- Quick Search Pill Button -->
            <a 
              href="#gallery" 
              class="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--color-secondary)]/50 transition-all group">
              <svg class="w-3.5 h-3.5 text-[var(--color-secondary)] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span class="hidden xl:inline">Search chimney, hob spark, gas leak, oven...</span>
              <span class="xl:hidden">Search</span>
              <kbd class="px-1.5 py-0.5 text-[0.65rem] font-mono bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded shadow-sm text-[var(--text-muted)]">⌘K</kbd>
            </a>

            <!-- Book Doorstep Technician CTA Button -->
            <button 
              (click)="openConsultation.emit()"
              class="desktop-consultation-cta btn-flame text-xs uppercase tracking-wider py-2.5 px-4 sm:px-5 items-center gap-2 shadow-md hover:shadow-lg transition-all">
              <span>Book Technician</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>

            <!-- Mobile Menu Toggle Button -->
            <button 
              (click)="isMobileMenuOpen = !isMobileMenuOpen"
              class="mobile-menu-toggle btn-icon text-base"
              aria-label="Toggle mobile menu">
              <svg *ngIf="!isMobileMenuOpen" class="w-6 h-6 text-[var(--text-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg *ngIf="isMobileMenuOpen" class="w-6 h-6 text-[var(--text-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

          </div>
        </div>
      </div>

      <!-- 3. Enterprise Mobile Slide-Over Menu -->
      <div 
        *ngIf="isMobileMenuOpen" 
        class="lg:hidden glass-panel border-b border-[var(--border-subtle)] py-6 px-6 animate-fade-in max-h-[85vh] overflow-y-auto shadow-2xl">
        
        <!-- Mobile Search Bar -->
        <div class="mb-5">
          <a 
            href="#gallery" 
            (click)="isMobileMenuOpen = false"
            class="flex items-center gap-2.5 w-full p-3 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] font-medium">
            <svg class="w-4 h-4 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span>Search chimney, hob spark, gas leak, oven...</span>
          </a>
        </div>

        <!-- Section 1: 9 Cooking Repair Categories -->
        <div class="mb-6">
          <span class="text-[0.68rem] font-bold uppercase tracking-widest text-[var(--color-secondary)] block mb-2.5">
            Repair & Service Categories (9)
          </span>
          <div class="grid grid-cols-2 gap-2">
            <div 
              *ngFor="let cat of interiorService.categories"
              (click)="onCategoryClick(cat)"
              class="p-2.5 rounded-xl bg-[var(--bg-surface-subtle)]/70 hover:bg-[var(--border-subtle)] transition-all cursor-pointer flex items-center justify-between">
              <span class="text-xs font-bold text-[var(--text-main)] truncate">{{ cat.name.split(' ')[0] }} Fix</span>
              <span class="text-[0.65rem] text-[var(--color-secondary)] font-mono">₹{{ cat.servicePriceStartingINR }}</span>
            </div>
          </div>
        </div>

        <!-- Section 2: Contact & Direct Actions -->
        <div class="pt-4 border-t border-[var(--border-subtle)] space-y-3">
          <div class="grid grid-cols-2 gap-2">
            <a [href]="'tel:' + contactNumber" class="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-main)] hover:border-[var(--color-secondary)] transition-colors" [title]="'Call ' + contactNumber">
              <svg class="w-4 h-4 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span>Call {{ contactNumber }}</span>
            </a>
            <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Chat on WhatsApp">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.52 3.48A11.84 11.84 0 0012.08 0C5.53 0 .2 5.33.2 11.88c0 2.09.55 4.13 1.59 5.92L.1 24l6.34-1.66a11.86 11.86 0 005.64 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.18-1.24-6.16-3.45-8.41zM12.09 21.77h-.01a9.85 9.85 0 01-5.02-1.38l-.36-.21-3.76.99 1-3.67-.23-.38a9.87 9.87 0 01-1.51-5.24C2.2 6.98 6.63 2.55 12.08 2.55c2.64 0 5.12 1.03 6.99 2.91a9.82 9.82 0 012.9 7c0 5.45-4.43 9.88-9.88 9.88zm5.42-7.4c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-1.77-.89-2.93-1.58-4.1-3.58-.31-.54.31-.5.89-1.67.1-.2.05-.37-.03-.52-.08-.15-.68-1.64-.93-2.25-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.09 4.49 1.89.82 2.63.89 3.57.75.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
              </svg>
              <span>WhatsApp Booking</span>
            </a>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-xs text-[var(--text-muted)] font-medium">Interface Theme</span>
            <button 
              (click)="storageService.toggleTheme()" 
              class="px-3 py-1.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--text-main)] flex items-center gap-2">
              <span>{{ storageService.theme() === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode' }}</span>
            </button>
          </div>

          <button 
            (click)="isMobileMenuOpen = false; openConsultation.emit()"
            class="btn-flame w-full text-xs uppercase tracking-wider py-3.5 flex items-center justify-center gap-2 shadow-xl">
            <span>Book Doorstep Technician</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>

      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }
    .scrolled-header {
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08);
    }
    .default-header {
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    .desktop-consultation-cta {
      display: none;
    }
    .mobile-menu-toggle {
      display: inline-flex;
    }
    @media (min-width: 1024px) {
      .desktop-consultation-cta {
        display: inline-flex;
      }
      .mobile-menu-toggle {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  storageService = inject(StorageService);
  interiorService = inject(InteriorService);

  readonly contactNumber = '8088034849';
  readonly whatsappUrl = 'https://wa.me/918088034849?text=' + encodeURIComponent('Hello OmniAppliances, I would like to book a repair technician for my kitchen cooking appliance.');

  openFavorites = output<void>();
  openConsultation = output<void>();
  selectCategory = output<RoomCategoryId>();
  viewCategoryDetail = output<CategoryInfo>();

  isMobileMenuOpen = false;
  activeMegaMenu = signal<'spaces' | 'studios' | null>(null);
  isScrolled = signal<boolean>(false);

  private menuTimeout: any = null;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('app-header')) {
      this.closeAll();
    }
  }

  openMegaMenu(menu: 'spaces' | 'studios') {
    if (this.menuTimeout) {
      clearTimeout(this.menuTimeout);
      this.menuTimeout = null;
    }
    this.activeMegaMenu.set(menu);
  }

  closeMegaMenu(menu: 'spaces' | 'studios') {
    this.menuTimeout = setTimeout(() => {
      if (this.activeMegaMenu() === menu) {
        this.activeMegaMenu.set(null);
      }
    }, 200);
  }

  toggleMegaMenu(menu: 'spaces' | 'studios') {
    if (this.activeMegaMenu() === menu) {
      this.activeMegaMenu.set(null);
    } else {
      this.activeMegaMenu.set(menu);
    }
  }

  closeAll() {
    this.activeMegaMenu.set(null);
    this.isMobileMenuOpen = false;
  }

  onCategoryClick(cat: CategoryInfo) {
    this.viewCategoryDetail.emit(cat);
    this.closeAll();
  }
}
