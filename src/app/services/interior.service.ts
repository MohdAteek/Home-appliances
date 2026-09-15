import { Injectable } from '@angular/core';
import { 
  CategoryInfo, 
  DesignProject, 
  RoomCategoryId, 
  DesignStyle, 
  BrandName,
  BrandInfo,
  RoomVisualizerOption, 
  ProjectScopeParams,
  ProjectScopeResult,
  StyleQuizStep,
  StyleQuizResult
} from '../models/interior.models';

@Injectable({
  providedIn: 'root'
})
export class InteriorService {

  // Featured Authorized Repair & Service Brands
  readonly brands: BrandInfo[] = [
    {
      name: 'Siemens',
      tagline: 'Siemens Luxury Kitchen Cooking Appliance Repair & Servicing',
      badge: 'Certified Luxury Service Specialist',
      warrantyAssurance: '90-Day Service Warranty + 1-Year OEM Spare Parts Guarantee',
      origin: 'Munich, Germany',
      specialty: 'iQ700 Smart Sensor Ovens, StepFlame Gas Hobs & FlexInduction Circuit Repair'
    },
    {
      name: 'Bosch',
      tagline: 'Bosch European Cooking Appliance Repair & Maintenance',
      badge: 'Certified European Tech Partner',
      warrantyAssurance: '90-Day Full Service Guarantee + Factory Sealed Spares',
      origin: 'Gerlingen, Germany',
      specialty: 'FlameSelect Hob Burner Calibration, Serie 8 3D HotAir Oven Heating Repair'
    },
    {
      name: 'Faber',
      tagline: 'Faber Kitchen Chimney Deep Cleaning & Hob Repair Center',
      badge: 'Master Chimney Service Center',
      warrantyAssurance: '100% Genuine Copper Motors & Italian Brass Spare Parts',
      origin: 'Fabriano, Italy',
      specialty: 'Maxus 3D Chimney Motor Rewinding, Heat Auto-Clean Repair & Descaling'
    },
    {
      name: 'Elica',
      tagline: 'Elica Deep Silence Hoods & Italian Hob Restoration',
      badge: 'Official Service Hub',
      warrantyAssurance: 'Genuine EDS3 Noise Reduction Baffles & Inverter Motors',
      origin: 'Fabriano, Italy',
      specialty: 'EDS3 Silent Motor Overhaul, Gesture Sensor PCB Repair & Duct Unclogging'
    },
    {
      name: 'Häfele',
      tagline: 'Häfele Architectural Kitchen Appliance Service & Tuning',
      badge: 'Authorized Studio Technician',
      warrantyAssurance: 'Direct OEM Gas Valves, Microswitches & Diamond Glass Spares',
      origin: 'Nagold, Germany',
      specialty: 'Vertex 5.0kW Brass Burner Tuning, Flame Failure Device (FFD) Replacement'
    },
    {
      name: 'Gilma',
      tagline: 'Gilma Gas Stoves, Hobs & Chimney Fast Repair Service',
      badge: 'Authorized Repair Partner',
      warrantyAssurance: 'High Thermal Efficiency Burner Reaming & Anti-Leak Gas Tests',
      origin: 'Bengaluru, India',
      specialty: 'Jumbo Tri-Pin Brass Restoration, Stainless Cooktop Re-sealing'
    },
    {
      name: 'Crompton',
      tagline: 'Crompton MaxiFlame Stoves & SilentPro Chimney Service',
      badge: 'Certified Fast Service',
      warrantyAssurance: 'Same-Day Doorstep Technician Visit & Electronic Spark Fixes',
      origin: 'Mumbai, India',
      specialty: 'QuietPro BLDC Blower Repair, InstaCook Induction PCB Board Service'
    },
    {
      name: 'Hindware',
      tagline: 'Hindware Optimus Auto-Clean Chimneys & Glass Hob Repair',
      badge: 'Gold Tier Service Partner',
      warrantyAssurance: 'Thermal Heating Element Replacement & Blower Descaling',
      origin: 'Gurugram, India',
      specialty: 'MaxX Thermal Heating Coil Repair, Italian Double-Flame Gas Cock Rebuilding'
    }
  ];

  // All 9 Dedicated Kitchen Cooking Appliance Repair & Servicing Categories
  // Each category includes 4-5 high-res images and 30-40 lines of comprehensive service documentation!
  readonly categories: CategoryInfo[] = [
    {
      id: 'builtin-hobs',
      name: 'Built-in Hob Repair & Servicing',
      shortDesc: 'Comprehensive restoration for Bosch, Siemens, Faber & Häfele glass hobs, auto-ignition, and flame safety valves.',
      longDesc: 'Complete doorstep restoration service for built-in tempered glass gas hobs. We fix non-stop spark ignition clicking, low flame output, gas odor leakage, broken glass panels, and jammed brass burner controls.',
      coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
      ],
      icon: 'flame',
      projectCount: 6,
      trendingStyle: 'Flame Failure Device & Spark Tuning',
      executionWeeks: 'Within 90-120 Mins Doorstep',
      typicalAreaRange: '60cm • 75cm • 90cm Hob Models',
      servicePriceStartingINR: 399,
      turnaroundHours: 'Doorstep in 90 Minutes',
      warrantyCoverage: '90-Day Service Warranty + 1-Year Part Guarantee',
      topBrands: ['Bosch', 'Siemens', 'Faber', 'Häfele'],
      commonIssues: [
        'Electronic auto-ignition clicking continuously or not sparking at all',
        'Uneven yellow flickering flame with heavy black soot under utensils',
        'Flame goes off immediately after releasing the control knob (FFD issue)',
        'Gas smell or suspected micro-leakage around valve spindles and nozzles',
        'Jammed, stiff, or loose metallic rotary control knobs',
        'Tempered glass top chipped, cracked, or shattered needing replacement',
        'Blocked inner brass gas injectors causing very low heat output',
        'Rusted or wobbly cast iron pan support trivets needing alignment'
      ],
      repairProcess: [
        { step: 1, title: 'Multi-Point Gas Leak & Safety Audit', desc: 'Electronic gas sniffer detection on all inlet joints, internal copper tubes, and valve manifolds.' },
        { step: 2, title: 'Burner & Jet Dismantling', desc: 'Complete disassembly of brass flame caps, venturi tubes, and precision micro-orifices.' },
        { step: 3, title: 'Ultrasonic Carbon Descaling', desc: 'Removal of grease, burnt spices, and carbon deposits to restore uniform air-fuel mixture.' },
        { step: 4, title: 'Ignition & Thermocouple Tuning', desc: 'Testing micro-switches, pulse generator box, ceramic spark pins, and Flame Failure sensors.' },
        { step: 5, title: 'Genuine OEM Part Replacement', desc: 'Installation of factory-certified brass valves, ignition coils, and heat-resistant seals.' },
        { step: 6, title: 'Blue Flame Pressure Calibration', desc: 'Calibrating gas-to-oxygen ratio to deliver crisp 100% blue flame with zero soot.' }
      ],
      detailedServiceGuide: [
        '1. OMNIAPPLIANCES PROFESSIONAL BUILT-IN HOB REPAIR & RESTORATION OVERVIEW:',
        'Built-in gas hobs represent the architectural centerpiece of modern modular kitchens. However, continuous exposure to high heat, spilled oil, boiling milk, and heavy Indian spices inevitably leads to clogged injectors, oxidized thermocouples, and malfunctioning ignition micro-switches.',
        'At OmniAppliances Repair Service, we provide dedicated, specialized doorstep repair solutions for high-end European and Indian built-in hobs, including Bosch FlameSelect, Siemens StepFlame, Faber Primo, Elica, and Häfele Vertex collections.',
        '',
        '2. COMPREHENSIVE DIAGNOSTIC & REPAIR METHODOLOGY:',
        'Our certified master technicians arrive equipped with electronic gas detection meters, micro-flame jet reaming tools, multi-meter electrical testing gear, and genuine OEM replacement components directly sourced from authorized brand channels.',
        'When diagnosing automatic pulse ignition failure, we systematically inspect the 1.5V/230V power pulse box, test individual ceramic spark plugs for electrical grounding, and replace damaged sub-knob micro-switches without disturbing your granite or quartz countertop cutouts.',
        'For hobs equipped with Flame Failure Devices (FFD), where the burner cuts off when releasing the knob, we recalibrate the thermocouple alignment and replace oxidized thermal sensing probes to ensure instant flame retention with zero safety risk.',
        '',
        '3. COMPLETE JET REAMING & SOOT ELIMINATION:',
        'A yellow, sluggish flame not only wastes up to 35% more LPG/PNG gas but also leaves stubborn carbon soot under expensive cookware. We completely strip down the burner assembly, ream clogged brass orifices to factory millimeter tolerances, and balance the primary aeration shutter for an intense, soot-free blue flame.',
        'In cases of gas odor, our technicians perform high-sensitivity pressure decay tests to pinpoint micro-porosities across internal rubber gaskets, O-rings, and aluminium gas rails, replacing worn seals with high-temperature nitrile components.',
        '',
        '4. SHATTERED GLASS TOP REPLACEMENT & HARDWARE SERVICE:',
        'Accidental thermal shock or impact can crack tempered hob glass. We supply and fit original 8mm beveled thermally toughened replacement glass tops cut exactly to manufacturer dimensions, re-sealing edges with heat-resistant silicone barrier to protect modular drawers below.',
        'We also service and re-align heavy cast iron pan supports, replace broken rotary knobs with genuine die-cast metal dials, and test all 3 to 5 burners under full cooking load before certifying the appliance safe for daily family use.',
        '',
        '5. PRICING, WARRANTY & EMERGENCY DISPATCH:',
        'All built-in hob repairs start from a transparent diagnostic inspection rate of ₹399. Any replaced component carries a 100% genuine 1-Year OEM warranty, supported by our comprehensive 90-Day OmniAppliances Service Assurance.',
        'Emergency breakdown and gas leak support is available within 90 minutes across all major city sectors. Call our dedicated repair desk at 8088034849 or book on WhatsApp for immediate doorstep technician dispatch.'
      ]
    },
    {
      id: 'chimneys',
      name: 'Kitchen Chimney Repair & Deep Servicing',
      shortDesc: 'Complete motor overhauls, 1500 m³/hr suction restoration, thermal auto-clean repair & duct descaling.',
      longDesc: 'Specialized chimney service for Faber, Elica, Hindware, Bosch, Crompton, and Häfele hoods. We fix dead motors, abnormal vibration noise, failed gesture touch sensors, oil leakage from hoods, and zero suction issues.',
      coverImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85'
      ],
      icon: 'wind',
      projectCount: 6,
      trendingStyle: 'BLDC Inverter & Chemical Descaling',
      executionWeeks: 'Within 90-120 Mins Doorstep',
      typicalAreaRange: '60cm • 90cm • Island Hoods',
      servicePriceStartingINR: 499,
      turnaroundHours: 'Doorstep in 90 Minutes',
      warrantyCoverage: '90-Day Service Warranty + 1-Year Motor Guarantee',
      topBrands: ['Faber', 'Elica', 'Hindware', 'Bosch', 'Crompton'],
      commonIssues: [
        'Chimney running but suction has completely dropped or smoke escaping',
        'Abnormal rattling, buzzing, or grinding noise from motor blower assembly',
        'Auto-clean thermal heating function not melting grease into collector cup',
        'Touch panel unresponsive or gesture motion wave sensor failing to trigger',
        'Oil dripping from chimney canopy, glass hood, or wall tiles',
        'Dead chimney with zero power, blown internal fuse, or burnt PCB board',
        'Blower fan jammed due to hardened sticky grease accumulation',
        'Damaged, collapsed, or grease-choked aluminium flexible exhaust pipe'
      ],
      repairProcess: [
        { step: 1, title: 'Airflow & Static Suction Measurement', desc: 'Anemometer airflow test to measure CFM and identify airway blockages.' },
        { step: 2, title: 'Complete Canopy & Blower Dismantling', desc: 'Safe unmounting of glass hood, motor housing, baffle trays, and oil channels.' },
        { step: 3, title: 'High-Pressure Chemical Degreasing', desc: 'Eco-friendly alkaline descaling of blower blades, housing, and heating coils.' },
        { step: 4, title: 'Motor & Capacitor Bench Testing', desc: 'Checking winding resistance, bearing lubrication, and replacing noisy ball bearings.' },
        { step: 5, title: 'Touch PCB & Sensor Calibration', desc: 'Repairs to gesture optical sensors, relay switches, and thermal heating elements.' },
        { step: 6, title: 'Re-assembly & Exhaust Duct Sealing', desc: 'Acoustic vibration dampening, aluminium duct taping, and 100% full-speed suction verification.' }
      ],
      detailedServiceGuide: [
        '1. OMNIAPPLIANCES MASTER KITCHEN CHIMNEY REPAIR & DEEP DESCALING OVERVIEW:',
        'In Indian kitchens, cooking with rich oils, ghee, and roasted spices releases dense grease-laden vapors. Over 6 to 12 months, this vapor coats the internal centrifugal blower, motor shaft, and exhaust duct with heavy, flammable sludge, degrading suction by up to 70% and straining the motor.',
        'OmniAppliances provides factory-grade on-site chimney servicing, chemical foam degreasing, BLDC inverter motor repairs, and PCB electronics troubleshooting for Faber, Elica, Hindware, Bosch, Crompton, and Häfele kitchen hoods.',
        '',
        '2. COMPLETE SUCTION RESTORATION & MOTOR REWINDING:',
        'When your chimney runs loudly but fails to pull smoke, the primary culprit is hardened oil caked onto the balanced blower fan blades or an oxidized starting capacitor. Our technicians carefully unmount the blower unit, perform deep ultrasonic chemical descaling, and lubricate high-speed motor bearings.',
        'For burned or jammed motors, we offer genuine OEM copper rewinding and replacement BLDC motors with up to 1500–1800 m³/hr extraction capacity, restoring factory-level whisper-quiet performance.',
        '',
        '3. THERMAL AUTO-CLEAN & GESTURE PCB REPAIR:',
        'Auto-clean chimneys rely on a specialized heating element wrapped around the motor housing to liquefy grease into the collection tray. When this heating coil burns out or the thermal thermostat disconnects, oil backs up inside the motor chamber and leaks onto countertops.',
        'We replace faulty heating elements, test temperature cutoffs, and repair delicate electronic PCB touchboards and infrared gesture sensor receivers damaged by kitchen humidity and voltage surges.',
        '',
        '4. EXHAUST DUCTING, CORE CUTTING & VIBRATION DAMPENING:',
        'Restricted airflow is frequently caused by crushed, bent, or undersized flexible duct pipes. We supply and install heavy-duty anti-leak multi-layered aluminium and semi-rigid ducting pipes (6-inch / 8-inch), fitted with external gravity cowl louvers to prevent pest entry and back-drafting.',
        'We re-mount loose wall brackets with heavy expansion fasteners and vibration-absorbing rubber isolators to eliminate annoying rattling sounds against kitchen tiles.',
        '',
        '5. PRICING, ANNUAL MAINTENANCE (AMC) & RAPID DISPATCH:',
        'Basic chimney maintenance and diagnostic inspection begins at just ₹499, while comprehensive chemical deep descaling combos are offered at ₹799. All replacement blowers, PCB boards, and motors include official warranty coverage.',
        'We also offer Annual Maintenance Contracts (AMC) with quarterly checkups to keep your kitchen completely smoke and odor-free. Contact our master service team at 8088034849 for same-day doorstep booking.'
      ]
    },
    {
      id: 'gas-stoves',
      name: 'Gas Stove & Cooktop Repair',
      shortDesc: 'Tabletop 2/3/4-burner gas stove repairs, burner reaming, gas cock valve rebuilding & leak safety checks.',
      longDesc: 'Reliable doorstep repair for stainless steel and toughened glass tabletop gas stoves from Faber, Gilma, Crompton, and Hindware. We fix low flame, burner backfiring, gas leaks, jammed knobs, and broken glass tops.',
      coverImage: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85'
      ],
      icon: 'grid',
      projectCount: 6,
      trendingStyle: 'Tri-Pin Brass Reaming & Re-sealing',
      executionWeeks: 'Within 60-90 Mins Doorstep',
      typicalAreaRange: '2 • 3 • 4 Burner Stoves',
      servicePriceStartingINR: 399,
      turnaroundHours: 'Doorstep in 60-90 Mins',
      warrantyCoverage: '90-Day Service Warranty + 6-Month Part Guarantee',
      topBrands: ['Faber', 'Gilma', 'Crompton', 'Hindware'],
      commonIssues: [
        'Low gas flame output taking too long to boil water or cook food',
        'Loud popping or backfiring noise inside the mixing tube when igniting',
        'Gas leaking from knob spindle, internal manifold, or inlet nozzle',
        'Burner flame burns yellow and produces heavy black carbon soot',
        'Control knobs jammed tight and impossible to turn safely',
        'Shattered or cracked toughened glass cooktop surface',
        'Loose or warped pan supports causing hot vessels to tilt',
        'Multi-spark battery auto-ignition mechanism failing to trigger'
      ],
      repairProcess: [
        { step: 1, title: 'Inlet Gas Pressure & Leak Detection', desc: 'Testing regulator pressure and checking hose integrity.' },
        { step: 2, title: 'Burner Base & Mixing Tube Overhaul', desc: 'Clearing spiderwebs, carbon slag, and corrosion from cast aluminium mixing tubes.' },
        { step: 3, title: 'Brass Jet Reaming & Orifice Sizing', desc: 'Precision micro-reaming of gas nozzles to restore rated BTU heat output.' },
        { step: 4, title: 'Gas Cock Valve Dismantling & Greasing', desc: 'Rebuilding brass valve cores with high-temperature gas cock grease.' },
        { step: 5, title: 'Flame Balancing & Aeration Calibration', desc: 'Adjusting primary air shutters for crisp 100% blue flame.' },
        { step: 6, title: 'Safety Certification & Load Testing', desc: 'Testing all burners simultaneously under full domestic gas pressure.' }
      ],
      detailedServiceGuide: [
        '1. OMNIAPPLIANCES GAS STOVE & COOKTOP REPAIR SPECIALIZATION:',
        'Freestanding glass and stainless steel gas stoves remain the backbone of everyday household cooking. However, accumulated food spills, grease carbonization, and degraded rubber O-rings can cause dangerous gas leakage, sluggish low flames, and burner backfiring.',
        'OmniAppliances provides fast, reliable, same-day doorstep servicing and valve reconditioning for 2, 3, and 4-burner stoves across Faber, Gilma, Crompton, Hindware, and all major domestic gas stove brands.',
        '',
        '2. GAS LEAKAGE DETECTION & VALVE REBUILDING:',
        'A hissing sound or smell of LPG/PNG gas near the stove knobs indicates worn internal valve seals or dried grease on the conical valve core. Our technicians dismantle the gas manifold assembly, clean the brass cocks, replace micro O-rings, and apply specialized high-pressure molybdenum gas grease to ensure buttery-smooth knob rotation with zero leak risk.',
        'We also replace degraded gas inlet nozzles, 360-degree swivel joints, and high-pressure steel-braided safety hoses meeting BIS standards.',
        '',
        '3. BLUE FLAME OPTIMIZATION & INJECTOR REAMING:',
        'When cooking oil spills into brass burner holes, it carbonizes and restricts fuel flow. This results in an oxygen-starved yellow flame that wastes fuel and coats vessels in black soot. Our technicians perform ultrasonic descaling on burner caps, ream clogged internal brass jets, and align the venturi tube for perfect combustion and 68%+ thermal efficiency.',
        '',
        '4. TOUGHENED GLASS REPLACEMENT & AUTO-IGNITION SERVICING:',
        'For auto-ignition glass cooktops, we diagnose failing multi-spark generator units, replace damaged ceramic electrode pins, and rewire battery terminals. In the event of cracked or shattered top glass, we supply and fit brand-certified 8mm shatter-proof replacement glass panels with high thermal tolerance.',
        '',
        '5. AFFORDABLE DOORSTEP SERVICE & RAPID DISPATCH:',
        'Gas stove inspection and tune-ups start at an economical ₹399. Our service vans are fully stocked with universal and brand-specific brass burners, mixing tubes, knobs, and valves for instant on-the-spot repair within 60 to 90 minutes. Call 8088034849 for instant booking.'
      ]
    },
    {
      id: 'ovens',
      name: 'Built-in & Convection Oven Repair',
      shortDesc: 'Precision heating element replacement, thermostat calibration, PCB repair & door gasket restoration.',
      longDesc: 'Expert repair service for built-in convection ovens, OTGs, and combi-microwaves from Siemens, Bosch, Häfele, and Faber. We fix uneven baking, heating element failure, sensor errors, temperature fluctuations, and door latch issues.',
      coverImage: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85'
      ],
      icon: 'box',
      projectCount: 6,
      trendingStyle: '4D HotAir & Thermostat Calibration',
      executionWeeks: 'Within 2-4 Hours Doorstep',
      typicalAreaRange: '45L • 65L • 71L Built-in Ovens',
      servicePriceStartingINR: 599,
      turnaroundHours: 'Doorstep in 2-4 Hours',
      warrantyCoverage: '90-Day Service Warranty + 1-Year Heating Element Guarantee',
      topBrands: ['Siemens', 'Bosch', 'Häfele', 'Faber'],
      commonIssues: [
        'Oven not heating up or taking excessively long to reach set temperature',
        'Uneven baking results with burnt tops and raw cake bottoms (Element failure)',
        'Oven trips household MCB circuit breaker immediately upon turning on',
        'Digital display showing error codes (e.g. E011, E300, F01, Er1)',
        'Convection fan not spinning or making loud screeching motor noise',
        'Oven door glass loose, broken, or door not sealing tight causing heat escape',
        'Temperature thermostat calibration off by more than 20°C',
        'Internal light bulb blown or pyrolytic self-clean lock mechanism jammed'
      ],
      repairProcess: [
        { step: 1, title: 'Electrical Insulation & Resistance Audit', desc: 'Megger insulation test to identify grounding leaks and element short circuits.' },
        { step: 2, title: 'Heating Coil Diagnostics', desc: 'Testing top broil element, bottom bake element, and circular 3D convection coil.' },
        { step: 3, title: 'Thermostat & NTC Sensor Calibration', desc: 'Digital thermal probe testing to match internal cavity temp with display settings.' },
        { step: 4, title: 'PCB Control Board & Relay Repair', desc: 'Micro-soldering burned relay contacts and power supply capacitors on main board.' },
        { step: 5, title: 'Convection Motor & Door Gasket Service', desc: 'Lubricating high-temperature fan bearings and installing fresh silicone door seals.' },
        { step: 6, title: 'Multi-Stage Temperature Bake Test', desc: 'Simulated 200°C convection baking cycle to verify uniform heat distribution.' }
      ],
      detailedServiceGuide: [
        '1. OMNIAPPLIANCES BUILT-IN OVEN & CONVECTION REPAIR EXPERTISE:',
        'Modern built-in culinary ovens from Siemens, Bosch, and Häfele are complex thermal appliances combining high-voltage heating coils, microprocessor relay boards, circulating convection fans, and sensitive NTC temperature sensors.',
        'When your oven fails to heat, bakes unevenly, or trips the main electrical breaker, attempting amateur repairs can damage expensive electronic boards. OmniAppliances provides specialized, certified technician service for luxury convection ovens, combi-steamers, and built-in microwave units.',
        '',
        '2. HEATING ELEMENT & CONVECTION MOTOR REPLACEMENT:',
        'Ovens utilize separate upper broil elements, lower hidden bake elements, and circular ring elements around the 3D HotAir fan. Over years of thermal cycling, internal heating wire oxidizes and burns open. Our technicians carry genuine OEM incoloy heating elements and replace failed coils on-site.',
        'We also service noisy or seized tangential cooling blowers and convection fan motors, replacing worn carbon bearings to restore quiet, even air distribution across all baking racks.',
        '',
        '3. THERMOSTAT CALIBRATION & ERROR CODE TROUBLESHOOTING:',
        'If your souffles collapse or sourdough burns prematurely, the internal NTC thermistor sensor may be drifting out of calibration. We test temperature curves using industrial thermocouple dataloggers and recalibrate the digital controller board.',
        'For display error codes (such as Siemens E011, Bosch E300, and Häfele sensor faults), our board specialists diagnose faulty relay switches, burned solder traces, and corrupted control modules, repairing the PCB rather than forcing expensive whole-board replacements.',
        '',
        '4. COOL-TOUCH DOOR GLASS & GASKET RESTORATION:',
        'Worn silicone door perimeter gaskets allow hot air to leak out, damaging kitchen laminates and increasing energy consumption. We fit factory-grade silicone perimeter seals and repair loose quadruple-glazed door hinges and soft-close damping mechanisms.',
        '',
        '5. BOOKING, PRICING & WARRANTY:',
        'Oven diagnostic visits start at ₹599. Every replacement heating element, sensor, and fan motor comes with an official 1-Year replacement warranty. Contact 8088034849 or message us on WhatsApp for rapid technician scheduling.'
      ]
    },
    {
      id: 'cooktops',
      name: 'Induction & Radiant Cooktop Repair',
      shortDesc: 'IGBT transistor replacement, motherboard micro-soldering, touch sensor repair & error code fixes.',
      longDesc: 'Specialized electronic repair for induction cooktops from Bosch, Siemens, Crompton, and Faber. We fix error codes (E0, E1, E2, E6, E9), power supply tripping, dead touch panels, and coil heating failures.',
      coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1584990347449-399a531d0442?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85'
      ],
      icon: 'zap',
      projectCount: 5,
      trendingStyle: 'German IGBT & Motherboard Micro-Repair',
      executionWeeks: 'Within 90-120 Mins Doorstep',
      typicalAreaRange: '1800W – 3500W Induction Plates',
      servicePriceStartingINR: 399,
      turnaroundHours: 'Doorstep in 90 Minutes',
      warrantyCoverage: '90-Day Service Warranty + 6-Month Component Guarantee',
      topBrands: ['Bosch', 'Siemens', 'Crompton', 'Faber'],
      commonIssues: [
        'Induction beeps and displays error codes (E0: No pot detected, E1/E2: Voltage surge, E6/E9: IGBT overheat)',
        'Induction trips MCB circuit immediately upon plugging in (Short-circuit IGBT)',
        'Touch panel unresponsive, slider control not adjusting power, or child-lock stuck',
        'Cooling fan not spinning causing induction to shut off after 2 minutes of heating',
        'Cracked or chipped ceramic micro-crystal glass top plate',
        'Slow heating or fluctuating electromagnetic power output',
        'Burnt smell or pop sound from internal power bridge rectifier',
        'Vessel detection sensor failing even with magnetic stainless cookware'
      ],
      repairProcess: [
        { step: 1, title: 'High-Voltage Circuit Safety Discharge', desc: 'Discharging internal capacitors and testing main bridge rectifier.' },
        { step: 2, title: 'IGBT & Driver Stage Diagnostics', desc: 'Replacing shorted 25A/30A 1200V German IGBT power transistors with thermal paste.' },
        { step: 3, title: 'Electromagnetic Coil Inspection', desc: 'Testing copper induction coil continuity, ferrite core bars, and NTC center sensor.' },
        { step: 4, title: 'Power Supply & Filtering Repair', desc: 'Replacing blown high-voltage filter capacitors and surge protection varistors.' },
        { step: 5, title: 'Touch Slider PCB Servicing', desc: 'Cleaning capacitive touch pads and re-sealing display ribbon cables.' },
        { step: 6, title: 'Full Load Continuous Boil Test', desc: 'Testing 2100W/3500W power boost with magnetic cookware to verify stability.' }
      ],
      detailedServiceGuide: [
        '1. OMNIAPPLIANCES INDUCTION COOKTOP REPAIR SPECIALIZATION:',
        'Induction cooktops provide unmatched cooking speed and energy efficiency. However, because they operate on high-frequency electromagnetic switching (20kHz to 50kHz) and high currents, voltage spikes and cooling fan failures can cause the main IGBT power transistor and bridge rectifier to blow instantly.',
        'At OmniAppliances, we specialize in component-level electronic repair for portable induction plates and multi-zone built-in induction hobs from Bosch, Siemens, Crompton, Faber, and Philips.',
        '',
        '2. IGBT REPLACEMENT & THERMAL MANAGEMENT:',
        'When an induction unit trips the household breaker with a pop, the internal IGBT (Insulated-Gate Bipolar Transistor) has short-circuited. Rather than replacing the entire costly power assembly, our electronic technicians replace failed transistors with heavy-duty original 1200V German Infineon/Fairchild IGBTs, apply high-conductivity thermal silicone paste, and service the cooling fan to prevent future thermal failures.',
        '',
        '3. ERROR CODE RESOLUTION (E0, E1, E2, E6, E9):',
        'Error codes indicate specific subsystem failures: E0 signifies pot detection circuit failure, E1/E2 points to AC mains over/under-voltage sensing faults, while E6/E9 signals coil thermistor open-circuits. We test voltage divider resistors, replace degraded signal capacitors, and calibrate the pot sensor coil for instant cookware recognition.',
        '',
        '4. TOUCH DISPLAY & GLASS REPAIR:',
        'Spilled liquids on the control panel can corrode capacitive touch traces. We clean, dry, and conformal-coat touch boards to restore responsive finger-swipe control. We also replace cracked Schott Ceran and micro-crystal glass tops.',
        '',
        '5. SERVICE RATES & FAST DOORSTEP REPAIR:',
        'Induction repair starts at just ₹399. We carry portable test benches and OEM spares in our mobile service kits. Call 8088034849 for instant booking.'
      ]
    },
    {
      id: 'gas-burners',
      name: 'Gas Burner Descaling & Flame Calibration',
      shortDesc: 'Ultrasonic burner descaling, brass reaming, double/triple-ring flame balancing & nozzle replacement.',
      longDesc: 'Professional high-heat restoration for commercial and domestic gas burners across Häfele, Bosch, Faber, and Gilma. We fix choked flame ports, low-heat wok burners, burner backfiring, and yellow soot buildup.',
      coverImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85'
      ],
      icon: 'sun',
      projectCount: 5,
      trendingStyle: '5.0 kW Triple-Ring Ultrasonic Descaling',
      executionWeeks: 'Within 60-90 Mins Doorstep',
      typicalAreaRange: 'Single, Double & Triple Ring Burners',
      servicePriceStartingINR: 399,
      turnaroundHours: 'Doorstep in 60-90 Minutes',
      warrantyCoverage: '90-Day Service Warranty + 1-Year Burner Guarantee',
      topBrands: ['Häfele', 'Bosch', 'Faber', 'Gilma'],
      commonIssues: [
        'Burner ports completely clogged by overflow of tea, dal, and cooking oils',
        'Uneven flame ring with flame burning only on one side of the burner',
        'Burner backfires with a loud bang inside the stove chamber when turning down',
        'Heavy carbonized brass caps unable to sit flush causing gas leakage around base',
        'Damaged or warped Italian brass flame spreader rings',
        'Corroded aluminium burner cup and venturi chamber',
        'LPG to PNG conversion nozzle replacement required',
        'Low BTU heat power making wok stir-frying and deep searing impossible'
      ],
      repairProcess: [
        { step: 1, title: 'Burner Head Dismantling', desc: 'Removal of outer brass ring, inner flame cap, and burner cup.' },
        { step: 2, title: 'High-Temperature Chemical Decarbonizing', desc: 'Soaking in industrial decarbonizing solvent to melt stubborn baked-on carbon.' },
        { step: 3, title: 'Individual Port Micro-Reaming', desc: 'Reaming all 60+ individual flame micro-slots with precision reaming needles.' },
        { step: 4, title: 'Gas Injector Orifice Calibration', desc: 'Cleaning or replacing jet nozzle sized precisely for LPG (28-30 mbar) or PNG (20 mbar).' },
        { step: 5, title: 'Machined Base Surface Lapping', desc: 'Lapping brass cap base to guarantee airtight seating against the burner cup.' },
        { step: 6, title: 'Multi-Stage High Flame Testing', desc: 'Testing low-simmer to full 5.0 kW maximum flame output.' }
      ],
      detailedServiceGuide: [
        '1. OMNIAPPLIANCES PROFESSIONAL GAS BURNER RESTORATION:',
        'Forged brass burners are the heart of powerful Indian and Asian cooking. However, daily boiling overflows of starch, oil, and spices block the micro-ports, leading to uneven burning, dangerous backfiring, and sluggish cooking times.',
        'OmniAppliances provides specialized ultrasonic descaling, precision gas jet calibration, and LPG/PNG conversion services for Italian double-ring, triple-ring, and commercial wok burners.',
        '',
        '2. ULTRASONIC DECARBONIZING & SEAT LAPPING:',
        'Standard cleaning cannot remove baked-on carbon deep inside the gas mixing channels. We utilize industrial ultrasonic baths and specialized decarbonizing solvents to dissolve stubborn encrustations without eroding the precision brass metal.',
        'If a brass cap is warped from extreme heat, gas escapes around the edges rather than through the flame slots. We machine-lap the mating surfaces for an airtight fit, eliminating base flame leakage.',
        '',
        '3. LPG TO PNG CONVERSION & NOZZLE SIZING:',
        'Switching from LPG gas cylinders to piped natural gas (PNG) requires replacing all internal burner nozzles because PNG operates at lower pressure (20 mbar vs 30 mbar for LPG) and requires larger orifice diameters. Using incorrect jets leads to feeble flames or dangerous soot. We install brand-certified PNG conversion kits tailored to your specific hob model.',
        '',
        '4. SERVICE RATES & INSTANT BOOKING:',
        'Burner restoration starts at ₹399 per stove. Book online or call 8088034849 for instant doorstep dispatch.'
      ]
    },
    {
      id: 'cookers',
      name: 'Electric & Pressure Cooker Repair',
      shortDesc: 'Electric multi-cooker thermostat repair, heating base replacement, safety valve & gasket restoration.',
      longDesc: 'Complete maintenance service for electric pressure cookers, slow cookers, and smart multi-cookers from Bosch, Crompton, and Gilma. We fix heating plate failures, steam leakage from lids, faulty pressure sensors, and error codes.',
      coverImage: 'https://images.unsplash.com/photo-1584990347449-399a531d0442?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1584990347449-399a531d0442?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85'
      ],
      icon: 'circle',
      projectCount: 5,
      trendingStyle: 'Pressure Sensor & Heating Base Overhaul',
      executionWeeks: 'Within 60-90 Mins Doorstep',
      typicalAreaRange: '3L • 5L • 8L Multi-Cookers',
      servicePriceStartingINR: 399,
      turnaroundHours: 'Doorstep in 60-90 Minutes',
      warrantyCoverage: '90-Day Service Warranty + 6-Month Part Guarantee',
      topBrands: ['Bosch', 'Crompton', 'Gilma'],
      commonIssues: [
        'Electric cooker not heating or turning off before food is cooked',
        'Steam continuously escaping from lid rim due to degraded silicone gasket',
        'Pressure float valve not rising or cooker failing to build pressure',
        'Digital display showing E1, E2, E3, or E4 sensor error codes',
        'Burnt or scorched heating plate base causing uneven cooking',
        'Loose lid locking micro-switch preventing cooking cycle from starting',
        'Keep-warm mode malfunctioning and burning rice at the bottom',
        'Power cord socket loose, sparking, or blown thermal cutoff fuse'
      ],
      repairProcess: [
        { step: 1, title: 'Electrical & Safety Fuse Inspection', desc: 'Testing thermal cut-off fuse and power cord socket.' },
        { step: 2, title: 'Heating Element Resistance Check', desc: 'Measuring heating plate resistance and checking surface flatness.' },
        { step: 3, title: 'Pressure Micro-Switch & Sensor Calibration', desc: 'Testing pressure release threshold and NTC base sensor.' },
        { step: 4, title: 'Silicone Gasket & Float Valve Servicing', desc: 'Replacing food-grade high-temperature lid seals and anti-block shield.' },
        { step: 5, title: 'PCB Control Board Solder Repair', desc: 'Fixing relay contacts and digital preset selector buttons.' },
        { step: 6, title: 'Pressure Cooking Steam Test', desc: 'Full-cycle water pressure test to certify zero steam escape and automatic shutoff.' }
      ],
      detailedServiceGuide: [
        '1. OMNIAPPLIANCES ELECTRIC & PRESSURE COOKER REPAIR SERVICES:',
        'Smart electric multi-cookers combine programmable digital timers, pressure relief switches, and automated heating plates to cook rice, grains, and meats with precision. When pressure sensors drift or silicone gaskets degrade, steam escapes and cooking stops prematurely.',
        'OmniAppliances provides fast doorstep repair for electric pressure cookers, rice cookers, and slow cookers from Bosch, Crompton, Gilma, and Instant Pot.',
        '',
        '2. STEAM LEAKAGE & PRESSURE FLOAT VALVE FIXES:',
        'If steam hisses continuously around the lid rim, the silicone sealing gasket has hardened or the anti-block vent is clogged with food residue. We replace gaskets with high-grade food-safe silicone seals, clean safety valves, and test pressure relief thresholds to ensure 100% kitchen safety.',
        '',
        '3. HEATING BASE & THERMAL SENSOR REPAIRS:',
        'For cookers that refuse to power on or display E1/E2 sensor faults, our technicians replace blown thermal fuses, clean carbonized heating plate contact surfaces, and recalibrate base NTC temperature sensors.',
        '',
        '4. SERVICE RATES & DISPATCH:',
        'Electric cooker repairs start from ₹399. Call 8088034849 or chat on WhatsApp for fast doorstep service.'
      ]
    },
    {
      id: 'kitchen-exhaust',
      name: 'Kitchen Exhaust Duct & Blower Service',
      shortDesc: 'Heavy-duty centrifugal exhaust blower overhauls, duct cleaning, anti-leak aluminium piping & cowl flap fixes.',
      longDesc: 'Complete kitchen exhaust ventilation servicing for Elica, Faber, and Crompton high-static blowers. We remove heavy grease blockages from duct pipes, replace vibrating blower motors, install external gravity louvers, and fix back-drafting.',
      coverImage: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85'
      ],
      icon: 'activity',
      projectCount: 5,
      trendingStyle: 'Heavy Centrifugal Airway Descaling',
      executionWeeks: 'Within 2-4 Hours Doorstep',
      typicalAreaRange: '6-inch • 8-inch Ducting Systems',
      servicePriceStartingINR: 499,
      turnaroundHours: 'Doorstep in 2-4 Hours',
      warrantyCoverage: '90-Day Service Warranty + 1-Year Duct Guarantee',
      topBrands: ['Elica', 'Faber', 'Crompton'],
      commonIssues: [
        'Exhaust pipe clogged with thick grease sludge restricting airflow',
        'Outside wind blowing smoke back into kitchen due to broken louver flap',
        'Flexible aluminium duct torn, punctured, or leaking oily grease onto false ceiling',
        'Heavy vibration and rattling noise inside exhaust ducting shaft',
        'Centrifugal blower motor making grinding bearing noise or running hot',
        'Unpleasant cooking odors lingering in kitchen despite running exhaust',
        'Pest, bird, or rodent entry through un-shielded exterior exhaust wall opening',
        'Exhaust pipe disconnected from chimney outlet collar'
      ],
      repairProcess: [
        { step: 1, title: 'Duct Airway & Static Pressure Inspection', desc: 'Checking entire duct route for bends, tears, and grease restrictions.' },
        { step: 2, title: 'Chemical Duct De-sludging', desc: 'High-pressure chemical wash to dissolve thick flammable grease lining.' },
        { step: 3, title: 'Tear Repair or Duct Replacement', desc: 'Fitting heavy multi-layered reinforced aluminium flexible or semi-rigid pipes.' },
        { step: 4, title: 'Inline Centrifugal Blower Servicing', desc: 'Overhauling blower motor, lubricating bearings, and testing capacitor.' },
        { step: 5, title: 'External Gravity Cowl Louver Installation', desc: 'Installing bird-proof one-way flap on exterior wall outlet.' },
        { step: 6, title: 'Acoustic Foil Taping & Smoke Flow Test', desc: 'Air-tight foil tape sealing and smoke extraction volume verification.' }
      ],
      detailedServiceGuide: [
        '1. OMNIAPPLIANCES KITCHEN EXHAUST & VENTILATION SERVICING:',
        'Even the most powerful chimney will fail if the connected exhaust duct is choked with sludge, has too many sharp 90-degree bends, or is torn inside the false ceiling. Accumulated grease in ducts also presents a severe fire hazard.',
        'OmniAppliances provides turnkey kitchen exhaust pipe descaling, heavy-duty inline blower repairs, aluminium duct replacement, and external anti-backdraft louver installations for villas, apartments, and commercial food studios.',
        '',
        '2. DUCT DE-SLUDGING & REPLACEMENT:',
        'We replace fragile single-ply plastic pipes with industrial multi-layered reinforced aluminium ducting (6-inch and 8-inch diameters) capable of handling high thermal exhaust without sagging, tearing, or leaking oil into kitchen cabinets.',
        '',
        '3. EXTERIOR COWL LOUVERS & BACKDRAFT FLAPS:',
        'To prevent outside wind from pushing smoke back inside and to block bird or rodent nesting, we install spring-loaded stainless steel gravity cowl louvers on exterior wall openings.',
        '',
        '4. SERVICE RATES & DISPATCH:',
        'Exhaust duct inspection and descaling starts at ₹499. Contact 8088034849 for professional technician assistance.'
      ]
    },
    {
      id: 'cooking-accessories',
      name: 'Cooking Accessories & Spare Parts Service',
      shortDesc: 'Original brass burner rings, heavy cast iron trivets, certified gas regulators & degreaser kits.',
      longDesc: 'Genuine OEM replacement spare parts and accessories for Bosch, Faber, Siemens, Elica, and Häfele cooking appliances. We supply high-flow LPG regulators, cast iron wok supports, spark ignition boxes, and degreasing kits.',
      coverImage: 'https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=1200&q=85',
      images: [
        'https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85'
      ],
      icon: 'tool',
      projectCount: 5,
      trendingStyle: '100% Genuine OEM Spares & Fitting',
      executionWeeks: 'Immediate Doorstep Delivery & Fitting',
      typicalAreaRange: 'Universal OEM Brand Compatibility',
      servicePriceStartingINR: 399,
      turnaroundHours: 'Immediate Dispatch',
      warrantyCoverage: '1-Year Official Replacement Guarantee',
      topBrands: ['Bosch', 'Faber', 'Elica', 'Siemens', 'Häfele'],
      commonIssues: [
        'Worn out brass burner caps causing uneven flame distribution',
        'Broken, chipped, or missing cast iron pan support trivets',
        'Old LPG cylinder regulator leaking gas or low pressure output',
        'Spark ignition generator box burnt out or water damaged',
        'Damaged stainless steel chimney oil collector cups',
        'Worn out oven rack slides, rotisserie rods, or baking trays',
        'Need universal round-bottom kadhai / wok adaptor ring',
        'Need heavy-duty eco-friendly chimney grease descaler chemical'
      ],
      repairProcess: [
        { step: 1, title: 'Appliance Model Identification', desc: 'Verifying exact model number, brand serial, and dimensional specifications.' },
        { step: 2, title: 'Genuine OEM Part Sourcing', desc: 'Fetching authentic brand-sealed brass caps, valves, regulators, and sensors.' },
        { step: 3, title: 'Doorstep Technician Fitting', desc: 'Professional installation, gas tightness check, and electrical testing.' },
        { step: 4, title: 'Operational Calibration', desc: 'Testing fitment under active flame and heat load.' },
        { step: 5, title: 'Warranty Tagging', desc: 'Issuing 1-Year official replacement warranty slip.' }
      ],
      detailedServiceGuide: [
        '1. OMNIAPPLIANCES GENUINE APPLIANCE SPARE PARTS & ACCESSORIES:',
        'Using counterfeit or poorly machined duplicate burner caps and gas regulators can cause hazardous gas leaks and destroy hob valves. OmniAppliances maintains an exhaustive inventory of 100% genuine OEM spare parts for Siemens, Bosch, Faber, Elica, Häfele, Gilma, Crompton, and Hindware cooking appliances.',
        '',
        '2. COMPLETE SPARE PARTS INVENTORY:',
        '- Forged Italian brass double and triple-ring burner caps',
        '- Continuous cast iron pan support trivets & wok adaptors',
        '- Multi-spark electronic ignition boxes and ceramic electrodes',
        '- High-pressure LPG/PNG gas regulators with pressure gauges',
        '- Stainless steel baffle filters and dishwasher-safe oil cups',
        '- Thermocouples, NTC temperature sensors, and thermostat switches',
        '- Heavy-duty steel braided gas connection hoses',
        '- Industrial chimney degreasing & descaling chemical kits',
        '',
        '3. DOORSTEP FITTING & 1-YEAR GUARANTEE:',
        'Every spare part purchased through OmniAppliances includes professional doorstep fitting by a certified technician and a 1-Year replacement guarantee. Call 8088034849 for instant spare parts dispatch.'
      ]
    }
  ];

  // Curated Database of 48+ Specific Kitchen Appliance Repair & Servicing Cases
  readonly projects: DesignProject[] = [
    // --- BUILT-IN HOBS REPAIRS ---
    {
      id: 'hob-rep-01',
      title: 'Bosch FlameSelect 4-Burner Hob Ignition & FFD Repair',
      brand: 'Bosch',
      category: 'builtin-hobs',
      categoryName: 'Built-in Hob Repair & Servicing',
      style: 'Heavy-Duty Brass',
      priceINR: 499,
      mrpINR: 999,
      discountPercent: 50,
      warrantyYears: 1,
      areaSqFt: 75,
      scopeTier: 'Bespoke',
      executionTimeline: 'Doorstep Service in 90 Minutes',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85'
      ],
      colorPalette: [
        { name: 'Onyx Glass Restoration', hex: '#121417' },
        { name: 'Forged Brass Jet Calibration', hex: '#D4AF37' },
        { name: 'Cast Iron Alignment', hex: '#262930' }
      ],
      features: [
        'Diagnosed continuous auto-ignition clicking and replaced failed micro-switch',
        'Re-aligned and cleaned Flame Failure Device (FFD) thermocouple sensors',
        'Reamed 4 brass injectors to eliminate yellow soot and restore blue flame',
        'Electronic sniffer gas leak safety test with zero micro-leakage certified'
      ],
      materials: ['Genuine Bosch Micro-Switches', 'OEM Thermocouples', 'High-Temp Silicone Gaskets'],
      designer: { name: 'OmniAppliances Senior Tech Team', role: 'Gas Appliance Lead', avatar: '/images/reviews/suresh_iyer.jpg' },
      location: 'Doorstep Service Across All Sectors',
      completedYear: 2025,
      description: 'Comprehensive restoration of Bosch FlameSelect 4-burner hob experiencing auto-ignition failure and uneven flame retention. Fully restored to factory 9-stage flame precision.',
      likes: 489,
      views: 4120,
      rating: 4.9,
      isFeatured: true,
      tags: ['hob-repair', 'bosch', 'flameselect', 'ignition-repair', 'ffd-repair']
    },
    {
      id: 'hob-rep-02',
      title: 'Siemens iQ700 5-Burner Hob StepFlame Valve Overhaul',
      brand: 'Siemens',
      category: 'builtin-hobs',
      categoryName: 'Built-in Hob Repair & Servicing',
      style: 'Built-in Glass',
      priceINR: 699,
      mrpINR: 1499,
      discountPercent: 53,
      warrantyYears: 1,
      areaSqFt: 90,
      scopeTier: 'Grand Estate',
      executionTimeline: 'Same-Day Certified Siemens Specialist Visit',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=1200&q=85'
      ],
      colorPalette: [
        { name: 'Ceramic Glass Clean', hex: '#0B0C0E' },
        { name: 'Titanium Valve Regrease', hex: '#4B5563' }
      ],
      features: [
        'Disassembled 5 StepFlame valve bodies and applied high-temp gas grease',
        'Replaced dual-wok 5.0kW central burner injector for intense heat output',
        'Fixed digital display error showing incorrect flame level indicators',
        'Re-sealed glass frame perimeter against countertop liquid seepage'
      ],
      materials: ['Siemens OEM Valve Seals', 'Electronic Display Harness', 'Gas Cock Grease'],
      designer: { name: 'Siemens Master Specialist', role: 'Luxury Appliance Tech', avatar: '/images/reviews/chef_tarun_kapoor.jpg' },
      location: 'Siemens Certified Service Warranty',
      completedYear: 2025,
      description: 'Full valve rebuilding and electronic display calibration for Siemens 90cm 5-burner luxury hob. Replaced central wok injector and certified safe gas tightness.',
      likes: 612,
      views: 5340,
      rating: 5.0,
      isFeatured: true,
      tags: ['siemens', 'hob-repair', 'stepflame', 'wok-burner', 'valve-service']
    },

    // --- CHIMNEY REPAIRS ---
    {
      id: 'ch-rep-01',
      title: 'Faber Maxus 3D Chimney Motor Descaling & Suction Restoration',
      brand: 'Faber',
      category: 'chimneys',
      categoryName: 'Kitchen Chimney Repair & Deep Servicing',
      style: 'Smart Auto-Clean',
      priceINR: 799,
      mrpINR: 1599,
      discountPercent: 50,
      warrantyYears: 1,
      motorWarrantyYears: 1,
      areaSqFt: 90,
      scopeTier: 'Bespoke',
      executionTimeline: 'Complete On-Site Deep Chemical Clean in 2 Hours',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85'
      ],
      colorPalette: [
        { name: 'Glass Hood Degreasing', hex: '#121316' },
        { name: 'Thermal Element Check', hex: '#F59E0B' }
      ],
      features: [
        'Complete unmounting and chemical degreasing of blower fan and motor housing',
        'Fixed thermal auto-clean heating coil and unclogged oil collection channel',
        'Replaced noisy motor ball bearings for silent 45dB operation',
        'Restored 100% full 1500 m³/hr suction capacity and foil-taped duct pipe'
      ],
      materials: ['Industrial Alkaline Degreaser', 'Sealed Ball Bearings', 'Thermal Heating Element'],
      designer: { name: 'Faber Master Service Team', role: 'Air Systems Specialist', avatar: '/images/reviews/rohan_mehta.jpg' },
      location: 'Guaranteed Faber Suction Restoration',
      completedYear: 2025,
      description: 'Comprehensive chemical descaling and bearing replacement for a grease-clogged Faber 1500 m³/hr chimney. Fully restored suction and repaired auto-clean function.',
      likes: 672,
      views: 6420,
      rating: 5.0,
      isFeatured: true,
      tags: ['chimney-service', 'faber', 'motor-repair', 'auto-clean-fix', 'chemical-wash']
    },
    {
      id: 'ch-rep-02',
      title: 'Elica Deep Silence EDS3 Gesture Sensor & PCB Repair',
      brand: 'Elica',
      category: 'chimneys',
      categoryName: 'Kitchen Chimney Repair & Deep Servicing',
      style: 'Filterless Extraction',
      priceINR: 699,
      mrpINR: 1399,
      discountPercent: 50,
      warrantyYears: 1,
      motorWarrantyYears: 1,
      areaSqFt: 90,
      scopeTier: 'Grand Estate',
      executionTimeline: 'Doorstep Sensor Micro-Repair in 90 Mins',
      image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85'
      ],
      colorPalette: [
        { name: 'EDS3 Acoustic Check', hex: '#262930' },
        { name: 'Gesture Sensor Calibration', hex: '#E2E8F0' }
      ],
      features: [
        'Repaired moisture-damaged gesture wave optical sensor receiver PCB',
        'Acoustic vibration tuning to eliminate rattling against kitchen tiles',
        'Replaced multi-layer aluminium duct pipe with tear-proof 6-inch pipe',
        'Re-sealed EDS3 deep silence acoustic insulation pads'
      ],
      materials: ['Elica Gesture Sensor PCB', 'Anti-Leak Aluminium Duct', 'Acoustic Foam'],
      designer: { name: 'Elica Certified Tech', role: 'Electronics Specialist', avatar: '/images/reviews/suresh_iyer.jpg' },
      location: '100% Genuine Elica Parts Guarantee',
      completedYear: 2025,
      description: 'Electronic PCB repair and gesture sensor wave tuning for Elica EDS3 deep silence hood. Replaced torn ducting and tested touchless controls.',
      likes: 541,
      views: 4890,
      rating: 4.9,
      isFeatured: true,
      tags: ['elica', 'chimney-repair', 'gesture-sensor', 'pcb-repair', 'eds3-silent']
    },

    // --- OVEN REPAIRS ---
    {
      id: 'ov-rep-01',
      title: 'Siemens iQ700 Oven 4D Heating Element & Thermostat Fix',
      brand: 'Siemens',
      category: 'ovens',
      categoryName: 'Built-in & Convection Oven Repair',
      style: '3D HotAir Convection',
      priceINR: 899,
      mrpINR: 1799,
      discountPercent: 50,
      warrantyYears: 1,
      areaSqFt: 71,
      scopeTier: 'Grand Estate',
      executionTimeline: 'Same-Day Master Diagnostic & Heating Element Swap',
      image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1200&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85'
      ],
      colorPalette: [
        { name: 'Heating Coil Replacement', hex: '#1E2229' },
        { name: 'TFT Calibration', hex: '#0284C7' }
      ],
      features: [
        'Diagnosed open circuit in 2800W circular 4D HotAir convection heating coil',
        'Installed original Siemens Incoloy heating element with 1-Year warranty',
        'Calibrated NTC thermal probe to match digital TFT display setting (±2°C)',
        'Replaced degraded silicone door seal to prevent kitchen cabinet heat damage'
      ],
      materials: ['Siemens Incoloy Heating Coil', 'NTC Sensor Probe', 'Silicone Door Gasket'],
      designer: { name: 'Siemens Oven Master Tech', role: 'Thermal Systems Lead', avatar: '/images/reviews/chef_tarun_kapoor.jpg' },
      location: 'Official Siemens Spare Part Warranty',
      completedYear: 2025,
      description: 'Heating element replacement and NTC sensor calibration for Siemens iQ700 built-in pyrolytic oven. Tested at 250°C for uniform thermal distribution.',
      likes: 589,
      views: 4980,
      rating: 5.0,
      isFeatured: true,
      tags: ['oven-repair', 'siemens', 'heating-element', 'thermostat-calibration', 'built-in-oven']
    },

    // --- INDUCTION REPAIRS ---
    {
      id: 'ct-rep-01',
      title: 'Bosch Serie 8 FlexInduction Motherboard & IGBT Replacement',
      brand: 'Bosch',
      category: 'cooktops',
      categoryName: 'Induction & Radiant Cooktop Repair',
      style: 'Induction Precision',
      priceINR: 599,
      mrpINR: 1199,
      discountPercent: 50,
      warrantyYears: 1,
      areaSqFt: 80,
      scopeTier: 'Grand Estate',
      executionTimeline: 'On-Site PCB Micro-Soldering in 2 Hours',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
      galleryImages: [
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1584990347449-399a531d0442?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85'
      ],
      colorPalette: [
        { name: 'Ceramic Glass Check', hex: '#0B0C0E' },
        { name: 'IGBT Transistor Swap', hex: '#EA580C' }
      ],
      features: [
        'Repaired short-circuited 30A 1200V German IGBT power transistors',
        'Replaced burned bridge rectifier and applied high-thermal compound',
        'Serviced internal cooling fan to prevent thermal over-temperature errors',
        'Full load 3500W power boost test with cookware recognition verified'
      ],
      materials: ['Infineon 1200V IGBT', 'Bridge Rectifier 25A', 'Thermal Silicone Paste'],
      designer: { name: 'Bosch Electronics Specialist', role: 'PCB Service Lead', avatar: '/images/reviews/ananya_deshmukh.jpg' },
      location: '90-Day Electronic Board Guarantee',
      completedYear: 2025,
      description: 'Component-level motherboard repair for Bosch FlexInduction cooktop tripping breaker. Replaced shorted IGBT transistors and certified 100% full-power operation.',
      likes: 490,
      views: 4200,
      rating: 5.0,
      isFeatured: true,
      tags: ['induction-repair', 'bosch', 'igbt-replacement', 'motherboard-fix', 'flexinduction']
    }
  ];

  // Visualizer Swatches for Kitchen Studio
  readonly visualizerWallColors: RoomVisualizerOption[] = [
    { id: 'c-01', name: 'Onyx Black Glass Restoration', hex: '#111317', description: 'Restored glossy tempered glass surface' },
    { id: 'c-02', name: 'Brushed Stainless Steel Descaling', hex: '#94A3B8', description: 'Degreased satin commercial stainless' },
    { id: 'c-03', name: 'Matte Anthracite Overhaul', hex: '#262930', description: 'Cleaned matte luxury appliance finish' },
    { id: 'c-04', name: '100% Blue Flame Calibration', hex: '#0284C7', description: 'Calibrated soot-free pure blue flame' },
    { id: 'c-05', name: 'Pure White Ceramic Clean', hex: '#F8FAFC', description: 'Degreased ceramic kitchen surfaces' },
    { id: 'c-06', name: 'Forged Italian Brass Restoration', hex: '#D4AF37', description: 'Ultrasonic descaled brass flame caps' }
  ];

  readonly visualizerFlooring: RoomVisualizerOption[] = [
    { id: 'f-01', name: 'Calacatta Quartz Cutout Inspection', hex: '#E2E8F0', textureUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80', description: 'Countertop hob cutout sizing and re-sealing' },
    { id: 'f-02', name: 'Black Granite Hob Mount', hex: '#18191C', textureUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80', description: 'Flush hob sealing to prevent cabinet liquid leaks' },
    { id: 'f-03', name: 'Modular Kitchen Chimney Duct Run', hex: '#D8C7B0', textureUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80', description: 'Acoustic vibration dampening on chimney duct' }
  ];

  readonly visualizerLightingModes = [
    { id: 'daylight', name: 'Technician Inspection Lighting (5000K)', icon: 'sun', glowColor: 'rgba(255, 255, 255, 0.4)' },
    { id: 'golden-hour', name: 'Gas Flame Safety Inspection (3000K)', icon: 'sunset', glowColor: 'rgba(249, 115, 22, 0.45)' },
    { id: 'warm-amber', name: 'Chimney Task Light Test (2700K)', icon: 'lamp', glowColor: 'rgba(245, 158, 11, 0.5)' }
  ];

  // 3-Step Cooking Appliance Repair Diagnostic Quiz
  readonly styleQuizSteps: StyleQuizStep[] = [
    {
      id: 1,
      question: 'Which cooking appliance is experiencing issues?',
      subtitle: 'Select the primary kitchen appliance requiring repair or maintenance.',
      options: [
        {
          id: 'q1-hob',
          title: 'Built-in Gas Hob or Cooktop',
          description: 'Auto-ignition clicking, low flame, gas odor, or burner cutting off.',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
          matchedStyle: 'Heavy-Duty Brass'
        },
        {
          id: 'q1-chimney',
          title: 'Kitchen Chimney / Exhaust Hood',
          description: 'Suction dropped, loud motor noise, auto-clean not working, or dead power.',
          image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
          matchedStyle: 'Smart Auto-Clean'
        },
        {
          id: 'q1-oven',
          title: 'Built-in Oven or Combi-Grill',
          description: 'Not heating, uneven baking, tripping breaker, or error codes.',
          image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
          matchedStyle: '3D HotAir Convection'
        },
        {
          id: 'q1-induction',
          title: 'Induction Cooktop Plate',
          description: 'Error code E0/E1/E6, pot not detecting, or short-circuit pop.',
          image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
          matchedStyle: 'Induction Precision'
        }
      ]
    },
    {
      id: 2,
      question: 'What is the primary symptom or breakdown behavior?',
      subtitle: 'Identify the key malfunction observed during operation.',
      options: [
        {
          id: 'q2-smoke-noise',
          title: 'Loss of Power, Suction, or Extreme Noise',
          description: 'Appliance running sluggishly, making grinding noise, or dead power.',
          image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
          matchedStyle: 'Smart Auto-Clean'
        },
        {
          id: 'q2-gas-leak',
          title: 'Gas Odor, Low Flame, or Sooty Yellow Flame',
          description: 'Clogged brass injectors, carbonized flame holes, or valve leak.',
          image: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=600&q=80',
          matchedStyle: 'Heavy-Duty Brass'
        },
        {
          id: 'q2-heating',
          title: 'Heating Failure / Temperature Inaccuracy',
          description: 'Oven heating element burned or thermistor sensor out of calibration.',
          image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
          matchedStyle: '3D HotAir Convection'
        },
        {
          id: 'q2-circuit',
          title: 'Electronic Error Codes / MCB Tripping',
          description: 'Display showing error numbers or instant circuit breaker trip.',
          image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
          matchedStyle: 'Induction Precision'
        }
      ]
    },
    {
      id: 3,
      question: 'How urgently do you need a technician visit?',
      subtitle: 'Select your preferred doorstep service window.',
      options: [
        {
          id: 'q3-emergency',
          title: 'Emergency Service (Within 90 Minutes)',
          description: 'Active gas leak, broken hob glass, or complete kitchen stoppage.',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
          matchedStyle: 'Heavy-Duty Brass'
        },
        {
          id: 'q3-sameday',
          title: 'Same-Day Technician Visit (Morning / Afternoon)',
          description: 'Standard repair, chimney deep cleaning, or burner reaming.',
          image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
          matchedStyle: 'Smart Auto-Clean'
        },
        {
          id: 'q3-weekend',
          title: 'Scheduled Weekend Slot / Routine Maintenance',
          description: 'Annual chimney AMC service or full kitchen appliance tune-up.',
          image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
          matchedStyle: '3D HotAir Convection'
        },
        {
          id: 'q3-spare',
          title: 'Genuine OEM Spare Part Replacement',
          description: 'Need replacement brass burners, glass top, or chimney ducting pipe.',
          image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80',
          matchedStyle: 'Induction Precision'
        }
      ]
    }
  ];

  // Helper Methods
  getCategoryById(id: RoomCategoryId): CategoryInfo | undefined {
    return this.categories.find(c => c.id === id);
  }

  getProjectsByCategory(categoryId: RoomCategoryId | 'all'): DesignProject[] {
    if (categoryId === 'all') return this.projects;
    return this.projects.filter(p => p.category === categoryId);
  }

  getProjectsByBrand(brand: BrandName | 'all'): DesignProject[] {
    if (brand === 'all') return this.projects;
    return this.projects.filter(p => p.brand === brand);
  }

  getProjectById(id: string): DesignProject | undefined {
    return this.projects.find(p => p.id === id);
  }

  getFeaturedProjects(): DesignProject[] {
    return this.projects.filter(p => p.isFeatured);
  }

  // Repair Scope & Rate Card Calculator
  calculateScope(params: ProjectScopeParams): ProjectScopeResult {
    let serviceBasePrice = 399;
    if (params.tier === 'premium') serviceBasePrice = 799;
    if (params.tier === 'bespoke') serviceBasePrice = 1499;

    const estimatedWeeks = 1; // Doorstep in 90 mins
    const manpowerHours = 2;

    const civilPercent = params.includeCivilFlooring ? 25 : 0; // Cutout Inspection
    const woodworkPercent = params.includeModularWoodwork ? 30 : 0; // Hob Service
    const ceilingLightingPercent = params.includeCeilingLighting ? 25 : 0; // Chimney Descaling
    const furnishingPercent = params.includeFurnishingDecor ? 10 : 0; // Oven Diagnostics
    const automationPercent = params.includeSmartAutomation ? 10 : 0; // Induction Testing
    const finishingPercent = params.includeWallFinishing ? 10 : 0; // Duct Sealing

    const materialGrade = params.tier === 'bespoke' 
      ? 'Full Multi-Appliance Kitchen AMC: Hob + Chimney + Built-in Oven Complete Service' 
      : params.tier === 'premium' 
      ? 'Comprehensive Chimney Chemical Wash + 4-Burner Hob Descaling & Gas Safety Test' 
      : 'Standard Single Appliance Diagnostic & Burner / Motor Overhaul';

    const hardwareSpec = params.tier === 'bespoke' 
      ? '100% Genuine Siemens/Bosch/Faber Spares with 1-Year Warranty & 90-Day Service Guarantee' 
      : params.tier === 'premium' 
      ? 'Factory-Certified Brass Valves, Motor Bearings, Heating Coils & Anti-Leak Duct Tape' 
      : 'Precision Micro-Reaming, High-Temp Nitrile Gaskets & Gas Pressure Testing';

    const warrantyYears = params.tier === 'bespoke' ? 1 : 1;
    const qualityAudits = params.tier === 'bespoke' ? 6 : params.tier === 'premium' ? 4 : 2;

    const packagePriceINR = serviceBasePrice;
    const packageSavingsINR = Math.round(packagePriceINR * 0.4);

    return {
      civilPercent,
      woodworkPercent,
      ceilingLightingPercent,
      furnishingPercent,
      automationPercent,
      finishingPercent,
      estimatedWeeks,
      manpowerHours,
      materialGrade,
      hardwareSpec,
      warrantyYears,
      qualityAudits,
      packagePriceINR,
      packageSavingsINR
    };
  }

  calculateCost(params: ProjectScopeParams): ProjectScopeResult {
    return this.calculateScope(params);
  }

  // Quiz Recommendation Evaluator
  evaluateQuiz(answers: DesignStyle[]): StyleQuizResult {
    const counts: Record<string, number> = {};
    for (const ans of answers) {
      counts[ans] = (counts[ans] || 0) + 1;
    }

    let topStyle: DesignStyle = 'Heavy-Duty Brass';
    let maxCount = 0;
    for (const [style, cnt] of Object.entries(counts)) {
      if (cnt > maxCount) {
        maxCount = cnt;
        topStyle = style as DesignStyle;
      }
    }

    const resultsMap: Record<DesignStyle, StyleQuizResult> = {
      'Heavy-Duty Brass': {
        primaryStyle: 'Heavy-Duty Brass',
        title: 'Built-in Hob & Gas Stove Burner Restoration Service',
        description: 'Your diagnostic indicates clogged gas jets, ignition failure, or safety thermocouple issues. We recommend our complete ultrasonic burner descaling and electronic spark tuning service.',
        keyElements: ['Ultrasonic Carbon Descaling', 'Electronic Gas Leak Safety Check', 'Spark Micro-Switch Replacement', 'Blue Flame Airway Balancing'],
        recommendedPalette: [
          { name: 'Onyx Glass Restoration', hex: '#111317' },
          { name: 'Forged Brass Calibration', hex: '#D4AF37' }
        ],
        matchingCategoryIds: ['builtin-hobs', 'gas-stoves', 'gas-burners'],
        bannerImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85'
      },
      'Smart Auto-Clean': {
        primaryStyle: 'Smart Auto-Clean',
        title: 'Kitchen Chimney Chemical Descaling & Motor Overhaul',
        description: 'Your diagnostic points to grease choking the blower assembly, dropping suction or causing abnormal noise. We recommend our high-pressure chemical degreasing and motor bearing overhaul.',
        keyElements: ['High-Pressure Chemical Degreasing', '1500 m³/hr Suction Restoration', 'Motor Bearing Lubrication', 'Duct Inspection & Taping'],
        recommendedPalette: [
          { name: 'Hood Canopy Clean', hex: '#121316' },
          { name: 'Thermal Heating Element Fix', hex: '#F59E0B' }
        ],
        matchingCategoryIds: ['chimneys', 'kitchen-exhaust'],
        bannerImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85'
      },
      '3D HotAir Convection': {
        primaryStyle: '3D HotAir Convection',
        title: 'Built-in Oven Heating Element & Thermostat Service',
        description: 'Your diagnostic shows temperature inaccuracy, element burnout, or breaker tripping. We recommend our precision multi-meter resistance check and NTC sensor calibration.',
        keyElements: ['Incoloy Heating Element Replacement', 'Thermostat Calibration (±2°C)', 'Door Gasket Thermal Sealing', 'Control Relay Board Repair'],
        recommendedPalette: [
          { name: 'Heating Coil Swap', hex: '#1E2229' },
          { name: 'TFT Calibration', hex: '#0284C7' }
        ],
        matchingCategoryIds: ['ovens'],
        bannerImage: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=1200&q=85'
      },
      'Induction Precision': {
        primaryStyle: 'Induction Precision',
        title: 'Induction Cooktop Motherboard & IGBT Repair',
        description: 'Your diagnostic highlights power tripping or error codes (E0, E1, E6). We recommend our component-level PCB repair and high-power IGBT transistor replacement.',
        keyElements: ['1200V German IGBT Replacement', 'Bridge Rectifier Solder Repair', 'Cooling Fan Overhaul', 'Cookware Sensor Calibration'],
        recommendedPalette: [
          { name: 'Ceramic Plate Clean', hex: '#0B0C0E' },
          { name: 'IGBT Transistor Swap', hex: '#EA580C' }
        ],
        matchingCategoryIds: ['cooktops', 'cookers'],
        bannerImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85'
      },
      'Built-in Glass': {
        primaryStyle: 'Built-in Glass',
        title: 'Built-in Hob Safety Valve & Glass Replacement',
        description: 'Doorstep service for cracked hob glass and stuck gas cock valves.',
        keyElements: ['8mm Tempered Glass Sizing', 'Nitrile O-Ring Replacement', 'Knob Spindle Greasing', 'Leak Sniffer Test'],
        recommendedPalette: [{ name: 'Onyx Glass', hex: '#111317' }, { name: 'Brass Valve', hex: '#D4AF37' }],
        matchingCategoryIds: ['builtin-hobs'],
        bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
      },
      'Commercial Power': {
        primaryStyle: 'Commercial Power',
        title: 'Commercial Heavy-Duty Burner & Exhaust Blower Service',
        description: 'High-power 5.0kW wok burner jet reaming and 1800 m³/hr inline exhaust descaling.',
        keyElements: ['5.0kW Wok Jet Reaming', 'Commercial Blower Overhaul', 'Heavy Duct De-Sludging', 'Pressure Calibration'],
        recommendedPalette: [{ name: 'Cast Steel', hex: '#1F2937' }, { name: 'Solid Brass', hex: '#D4AF37' }],
        matchingCategoryIds: ['gas-burners', 'kitchen-exhaust'],
        bannerImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85'
      },
      'Touch & Motion Sensor': {
        primaryStyle: 'Touch & Motion Sensor',
        title: 'Touch Panel & Gesture Wave Sensor PCB Repair',
        description: 'Repairing un-responsive touch boards and optical wave sensors on smart chimneys.',
        keyElements: ['Optical Sensor Tuning', 'Capacitive Touch Repair', 'Moisture Proof Coating', 'LED Replacement'],
        recommendedPalette: [{ name: 'Black Glass', hex: '#0B0C0E' }, { name: 'Amber LED', hex: '#F59E0B' }],
        matchingCategoryIds: ['chimneys', 'cooktops'],
        bannerImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85'
      },
      'Stainless Steel Pro': {
        primaryStyle: 'Stainless Steel Pro',
        title: 'Stainless Steel Cooktop & Valve Reconditioning',
        description: 'Deep cleaning, gas leak fixing, and burner reaming for heavy stainless steel stoves.',
        keyElements: ['Seamless Body Polish', 'Brass Valve Rebuilding', 'Swivel Inlet Service', 'Pan Support Trivet Balancing'],
        recommendedPalette: [{ name: 'Stainless Steel', hex: '#CBD5E1' }, { name: 'Brass Gold', hex: '#D4AF37' }],
        matchingCategoryIds: ['gas-stoves', 'cooking-accessories'],
        bannerImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85'
      },
      'Filterless Extraction': {
        primaryStyle: 'Filterless Extraction',
        title: 'Filterless Chimney Motor Servicing & Ducting Taping',
        description: 'Deep chemical descaling of filterless centrifugal chambers and motor bearings.',
        keyElements: ['Filterless Cavity Cleaning', 'Silent Bearing Swap', 'Anti-Leak Ducting', 'Oil Cup Clean'],
        recommendedPalette: [{ name: 'Gunmetal Steel', hex: '#262930' }, { name: 'Black Glass', hex: '#111317' }],
        matchingCategoryIds: ['chimneys', 'kitchen-exhaust'],
        bannerImage: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1200&q=85'
      }
    };

    return resultsMap[topStyle] || resultsMap['Heavy-Duty Brass'];
  }
}
