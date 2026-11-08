export type BatteryType = "Lead Acid" | "LFP" | "NMC";

export type ChemistryFacts = {
  label: string;
  identify: string;
  weight: string;
  value: string;
  handling: string;
};

export const CHEMISTRY: Record<BatteryType, ChemistryFacts> = {
  "Lead Acid": {
    label: "Lead-acid (flooded, VRLA or gel)",
    identify:
      "Rectangular 12 V monoblock units. E-rickshaw sets usually combine four (48 V) or five (60 V). Capacity is printed in Ah, often at the 5-hour or 20-hour rate.",
    weight:
      "A single 12 V, 100 Ah unit commonly weighs somewhere around 25-35 kg, so weight is the basis of most lead-acid scrap quotes.",
    value:
      "Value comes from recoverable lead, so rates follow lead prices and unit weight more than battery health.",
    handling:
      "Keep units upright, never drain or tip out the acid, wear gloves and eye protection, and keep leaking units apart from the rest.",
  },
  LFP: {
    label: "LFP (Lithium Iron Phosphate)",
    identify:
      "Cells are about 3.2 V nominal, so 16 in series give 51.2 V (sold as a '48 V' class pack). The label usually says LFP or LiFePO4.",
    weight:
      "LFP packs are generally heavier than NMC packs of the same energy, so weight alone is a poor guide to value.",
    value:
      "No nickel or cobalt, so metal value is modest. Packs with healthy remaining capacity may be worth more to a refurbisher or second-life buyer than to a recycler.",
    handling:
      "More thermally stable than NMC, but never puncture, short-circuit or charge a damaged pack. Cover exposed terminals.",
  },
  NMC: {
    label: "NMC (Nickel Manganese Cobalt)",
    identify:
      "Cells are about 3.6-3.7 V nominal, so 13 in series give roughly 48 V and 20 in series roughly 72 V. The label usually says Li-ion, NMC or NCM.",
    weight:
      "NMC packs are lighter than LFP for the same energy, which is why scooters and cars favour them.",
    value:
      "Contains nickel, cobalt and lithium, so recoverable metal value per kg is generally higher than LFP, though it moves with metal markets.",
    handling:
      "Higher thermal-runaway risk when damaged. Isolate swollen, hot or leaking packs, do not charge them, cover terminals and keep them away from flammable material.",
  },
};

export type Check = { title: string; text: string; appliesTo: BatteryType[] };

export const COMMON_CHECKS: Check[] = [
  {
    title: "Voltage and Ah rating",
    text: "Read both from the label. Energy in kWh = voltage x Ah / 1000, so a 48 V 100 Ah pack is 4.8 kWh. Common nominal pack voltages are 48 V, 51.2 V, 60 V and 72 V.",
    appliesTo: ["Lead Acid", "LFP", "NMC"],
  },
  {
    title: "Weight",
    text: "Weigh the complete pack or unit, or note the manufacturer's stated weight. Do not remove casings, cables or modules to change the weight; intact packs are safer and easier to price.",
    appliesTo: ["Lead Acid", "LFP", "NMC"],
  },
  {
    title: "BMS app and cycle data",
    text: "If your lithium pack has a Bluetooth BMS app, note total voltage, highest and lowest cell voltage, cycle count and any fault or protection flags. A screenshot lets a buyer quote without a second visit.",
    appliesTo: ["LFP", "NMC"],
  },
  {
    title: "Condition and photos",
    text: "Photograph labels, serial numbers, terminals and any swelling, leakage or burn marks. State damage honestly, because it changes how the pack must be packed and moved.",
    appliesTo: ["Lead Acid", "LFP", "NMC"],
  },
];

export const COMPLIANCE = {
  title: "Compliance: sell only to registered buyers",
  points: [
    "India's Battery Waste Management Rules, 2022 (as amended) replaced the Batteries (Management and Handling) Rules, 2001 and cover lead-acid and lithium-ion batteries.",
    "Waste batteries should be handed only to recyclers or refurbishers registered under these rules. Ask to see the registration and its validity before handover.",
    "Keep a receipt showing date, weight, unit count and the buyer's name, and ask which documents will follow.",
  ],
};
