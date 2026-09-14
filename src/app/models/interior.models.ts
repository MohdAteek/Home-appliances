export type RoomCategoryId = 
  | 'builtin-hobs'
  | 'gas-stoves'
  | 'cooktops'
  | 'gas-burners'
  | 'chimneys'
  | 'ovens'
  | 'cookers'
  | 'kitchen-exhaust'
  | 'cooking-accessories';

export type DesignStyle = 
  | 'Smart Auto-Clean'
  | 'Heavy-Duty Brass'
  | 'Built-in Glass'
  | '3D HotAir Convection'
  | 'Induction Precision'
  | 'Commercial Power'
  | 'Touch & Motion Sensor'
  | 'Stainless Steel Pro'
  | 'Filterless Extraction';

export type BrandName = 
  | 'Siemens'
  | 'Bosch'
  | 'Faber'
  | 'Elica'
  | 'Gilma'
  | 'Häfele'
  | 'Crompton'
  | 'Hindware';

export interface RepairProcessStep {
  step: number;
  title: string;
  desc: string;
}

export interface CategoryInfo {
  id: RoomCategoryId;
  name: string;
  shortDesc: string;
  longDesc: string;
  coverImage: string;
  images: string[]; // 4 to 5 detailed service/repair images
  icon: string;
  projectCount: number;
  trendingStyle: string;
  executionWeeks: string; // e.g. "Within 90-120 Mins Doorstep"
  typicalAreaRange: string;
  servicePriceStartingINR: number;
  turnaroundHours: string;
  warrantyCoverage: string;
  topBrands: BrandName[];
  commonIssues: string[];
  repairProcess: RepairProcessStep[];
  detailedServiceGuide: string[]; // 30 to 40 lines of comprehensive repair documentation
}

export interface BrandInfo {
  name: BrandName;
  tagline: string;
  badge: string;
  warrantyAssurance: string;
  origin: string;
  specialty: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface DesignProject {
  id: string;
  title: string;
  brand: BrandName;
  category: RoomCategoryId;
  categoryName: string;
  style: DesignStyle;
  priceINR: number; // Service/Repair inspection price
  mrpINR: number;
  discountPercent: number;
  warrantyYears: number; // Service warranty
  motorWarrantyYears?: number;
  areaSqFt: number; // e.g. repair turnaround mins or size
  scopeTier: 'Essential' | 'Premium' | 'Bespoke' | 'Grand Estate';
  executionTimeline: string;
  image: string;
  galleryImages: string[]; // 4-5 images
  colorPalette: ColorSwatch[];
  features: string[]; // Service checklists
  materials: string[]; // Diagnostic tools / OEM spare parts
  designer: {
    name: string;
    role: string;
    avatar: string;
  };
  location: string;
  completedYear: number;
  description: string;
  likes: number;
  views: number;
  rating: number;
  isFeatured?: boolean;
  beforeImage?: string;
  afterImage?: string;
  tags: string[];
  energyRating?: string;
}

export interface RoomVisualizerOption {
  id: string;
  name: string;
  hex?: string;
  textureUrl?: string;
  thumbnail?: string;
  description?: string;
}

export interface VisualizerState {
  roomCategoryId: RoomCategoryId;
  wallColor: RoomVisualizerOption;
  flooring: RoomVisualizerOption;
  lighting: 'daylight' | 'golden-hour' | 'warm-amber' | 'moody-evening';
  furnitureAccent: RoomVisualizerOption;
}

export interface ProjectScopeParams {
  category: RoomCategoryId;
  areaSqFt: number;
  tier: 'essential' | 'premium' | 'bespoke';
  includeCivilFlooring: boolean;
  includeModularWoodwork: boolean;
  includeCeilingLighting: boolean;
  includeFurnishingDecor: boolean;
  includeSmartAutomation: boolean;
  includeWallFinishing: boolean;
}

export type CostCalculationParams = ProjectScopeParams;

export interface ProjectScopeResult {
  civilPercent: number;
  woodworkPercent: number;
  ceilingLightingPercent: number;
  furnishingPercent: number;
  automationPercent: number;
  finishingPercent: number;
  estimatedWeeks: number;
  manpowerHours: number;
  materialGrade: string;
  hardwareSpec: string;
  warrantyYears: number;
  qualityAudits: number;
  packagePriceINR?: number;
  packageSavingsINR?: number;
}

export type CostCalculationResult = ProjectScopeResult;

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: RoomCategoryId;
  projectScope: string;
  budgetTier?: string;
  timeline: string;
  preferredDate: string;
  timeSlot: string;
  projectScopeNotes: string;
  createdAt: string;
}

export interface MoodboardCanvasItem {
  id: string;
  title: string;
  type: 'image' | 'color' | 'texture' | 'furniture' | 'material' | 'note';
  value: string;
  subtitle?: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
}

export interface StyleQuizStep {
  id: number;
  question: string;
  subtitle: string;
  options: {
    id: string;
    title: string;
    description: string;
    image: string;
    matchedStyle: DesignStyle;
  }[];
}

export interface StyleQuizResult {
  primaryStyle: DesignStyle;
  title: string;
  description: string;
  keyElements: string[];
  recommendedPalette: ColorSwatch[];
  matchingCategoryIds: RoomCategoryId[];
  bannerImage: string;
}
