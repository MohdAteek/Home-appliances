import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { BrandShowcaseComponent } from './components/brand-showcase/brand-showcase.component';
import { CategoriesShowcaseComponent } from './components/categories-showcase/categories-showcase.component';
import { GalleryHubComponent } from './components/gallery-hub/gallery-hub.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { PromotionalOffersComponent } from './components/promotional-offers/promotional-offers.component';
import { RoomVisualizerComponent } from './components/room-visualizer/room-visualizer.component';
import { CostEstimatorComponent } from './components/cost-estimator/cost-estimator.component';
import { BeforeAfterSliderComponent } from './components/before-after-slider/before-after-slider.component';
import { StyleQuizComponent } from './components/style-quiz/style-quiz.component';
import { MoodboardStudioComponent } from './components/moodboard-studio/moodboard-studio.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FavoritesDrawerComponent } from './components/favorites-drawer/favorites-drawer.component';
import { ConsultationModalComponent } from './components/consultation-modal/consultation-modal.component';
import { CategoryServiceDetailModalComponent } from './components/category-service-detail-modal/category-service-detail-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';
import { RoomCategoryId, BrandName, CategoryInfo } from './models/interior.models';
import { InteriorService } from './services/interior.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    BrandShowcaseComponent,
    CategoriesShowcaseComponent,
    GalleryHubComponent,
    WhyChooseUsComponent,
    PromotionalOffersComponent,
    RoomVisualizerComponent,
    CostEstimatorComponent,
    BeforeAfterSliderComponent,
    StyleQuizComponent,
    MoodboardStudioComponent,
    TestimonialsComponent,
    FavoritesDrawerComponent,
    ConsultationModalComponent,
    CategoryServiceDetailModalComponent,
    FooterComponent,
    ToastNotificationComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OmniAppliances — Kitchen Cooking Appliance Repair & Servicing Center';
  interiorService = inject(InteriorService);

  readonly contactNumber = '8088034849';
  readonly whatsappUrl = 'https://wa.me/918088034849?text=' + encodeURIComponent('Hello OmniAppliances, I would like to book a technician for appliance repair.');

  selectedCategory = signal<RoomCategoryId | 'all'>('all');
  selectedCategoryDetail = signal<CategoryInfo | null>(null);
  bookingCategoryId = signal<RoomCategoryId | null>(null);

  isFavoritesDrawerOpen = signal<boolean>(false);
  isConsultationModalOpen = signal<boolean>(false);

  openCategoryDetail(cat: CategoryInfo) {
    this.selectedCategoryDetail.set(cat);
  }

  openCategoryDetailById(catId: RoomCategoryId) {
    const cat = this.interiorService.getCategoryById(catId);
    if (cat) {
      this.selectedCategoryDetail.set(cat);
    }
  }

  onCategorySelect(catId: RoomCategoryId) {
    this.selectedCategory.set(catId);
    const cat = this.interiorService.getCategoryById(catId);
    if (cat) {
      this.selectedCategoryDetail.set(cat);
    }
  }

  onBookServiceFromCategory(catId: RoomCategoryId) {
    this.selectedCategoryDetail.set(null);
    this.bookingCategoryId.set(catId);
    this.isConsultationModalOpen.set(true);
  }

  onBrandSelect(brand: BrandName) {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSearchFromHero(query: string) {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onViewProjectFromHero(projectId: string) {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
