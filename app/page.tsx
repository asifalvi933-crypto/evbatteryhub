"use client";

import React, { useEffect } from "react";
import BrowseCities from "../components/BrowseCities";

export default function HomePage() {
  useEffect(() => {
    /* ============================================================
       CONFIG — edit these values to match your business
       ============================================================ */
    const WHATSAPP_NUMBER = "916395948240";

    const RATES: Record<string, number> = { LFP: 55, NMC: 130, LEAD: 85 };
    const CONDITION: Record<string, number> = { WORKING: 1.3, USED: 1.0, SCRAP: 0.7 };
    const KG_PER_KWH: Record<string, number> = { LFP: 7.5, NMC: 5.5, LEAD: 30 };

    const NEW_BATTERIES = [
      { id: "b1", name: "Sample LFP 48V 30Ah (2W) — 1.44 kWh", mrp: 28000 },
      { id: "b2", name: "Sample LFP 60V 40Ah (3W) — 2.4 kWh", mrp: 45000 },
      { id: "b3", name: "Sample NMC 72V 50Ah (2W/3W) — 3.6 kWh", mrp: 62000 },
      { id: "b4", name: "Sample LFP 51.2V 100Ah (Solar) — 5.12 kWh", mrp: 98000 }
    ];

    const CITIES = ["Delhi NCR", "Mumbai", "Pune", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Other"];

    const DIRECTORY: Record<string, Record<string, string[]>> = {
      "Maharashtra": { "Mumbai": ["Sample Recycler A"], "Pune": ["Sample Recycler B"] },
      "Karnataka": { "Bengaluru": ["Sample Recycler C"] },
      "Delhi": { "New Delhi": ["Sample Recycler D"] },
      "Telangana": { "Hyderabad": ["Sample Recycler E"] },
      "Tamil Nadu": { "Chennai": ["Sample Recycler F"] }
    };

    /* ============================================================
       HELPERS
       ============================================================ */
    const $ = (id: string) => document.getElementById(id);
    const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
    const waLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    const CHEM_NAME: Record<string, string> = { LFP: "LFP", NMC: "NMC", LEAD: "Lead Acid" };
    const COND_NAME: Record<string, string> = { WORKING: "Working", USED: "Used", SCRAP: "Damaged/Scrap" };

    function scrapValue(chem: string, cond: string, kg: number) {
      return kg * RATES[chem] * CONDITION[cond];
    }

    /* ============================================================
       NAV & INITIAL SETUP
       ============================================================ */
    const menuBtn = $("menuBtn");
    const mobileMenu = $("mobileMenu");
    if (menuBtn && mobileMenu) {
      menuBtn.onclick = () => mobileMenu.classList.toggle("hidden");
      document.querySelectorAll("#mobileMenu a").forEach(a => {
        (a as HTMLElement).onclick = () => mobileMenu.classList.add("hidden");
      });
    }

    const yr = $("yr");
    if (yr) yr.textContent = new Date().getFullYear().toString();

    const floatWa = $("floatWa") as HTMLAnchorElement;
    if (floatWa) floatWa.href = waLink("Hi EV Battery Hub India, I need help with battery scrap / exchange.");

    /* ============================================================
       TABS
       ============================================================ */
    function showTab(n: number) {
      const one = n === 1;
      $("tab1")?.classList.toggle("hidden", !one);
      $("tab2")?.classList.toggle("hidden", one);
      $("tab1Btn")?.classList.toggle("tab-active", one);
      $("tab1Btn")?.classList.toggle("text-emerald9", !one);
      $("tab2Btn")?.classList.toggle("tab-active", !one);
      $("tab2Btn")?.classList.toggle("text-emerald9", one);
    }

    $("tab1Btn")?.addEventListener("click", () => showTab(1));
    $("tab2Btn")?.addEventListener("click", () => showTab(2));

    /* ============================================================
       TAB 1 — SCRAP CALCULATOR
       ============================================================ */
    $("measureType")?.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLSelectElement;
      const kg = target.value === "kg";
      const lbl = $("measureLabel");
      const input = $("measureVal") as HTMLInputElement;
      if (lbl) lbl.textContent = kg ? "Weight (kg)" : "Capacity (kWh)";
      if (input) input.placeholder = kg ? "e.g. 25" : "e.g. 2.5";
    });

    $("calcScrapBtn")?.addEventListener("click", () => {
      const err = $("scrapError");
      if (!err) return;
      err.classList.add("hidden");

      const chem = ($("chem") as HTMLSelectElement).value;
      const cond = ($("cond") as HTMLSelectElement).value;
      const vehicleSelect = $("vehicle") as HTMLSelectElement;
      const val = parseFloat(($("measureVal") as HTMLInputElement).value);

      if (!val || val <= 0) {
        err.textContent = "Please enter a valid weight or capacity.";
        err.classList.remove("hidden");
        $("scrapResult")?.classList.add("hidden");
        return;
      }

      const byKg = ($("measureType") as HTMLSelectElement).value === "kg";
      const kg = byKg ? val : val * KG_PER_KWH[chem];
      const total = scrapValue(chem, cond, kg);

      const scrapAmt = $("scrapAmount");
      const scrapDet = $("scrapDetail");
      if (scrapAmt) scrapAmt.textContent = inr(total);
      if (scrapDet) scrapDet.textContent = `${CHEM_NAME[chem]} · ${COND_NAME[cond]} · ~${kg.toFixed(1)} kg @ ${inr(RATES[chem] * CONDITION[cond])}/kg`;

      const msg = `Hi EV Battery Hub India, I want to sell my old battery.\nChemistry: ${CHEM_NAME[chem]}\nVehicle: ${vehicleSelect.selectedOptions[0].text}\nWeight: ~${kg.toFixed(1)} kg\nCondition: ${COND_NAME[cond]}\nEstimated value: ${inr(total)}`;
      const waScrapBtn = $("waScrapBtn") as HTMLAnchorElement;
      if (waScrapBtn) waScrapBtn.href = waLink(msg);
      $("scrapResult")?.classList.remove("hidden");
    });

    /* ============================================================
       TAB 2 — EXCHANGE ESTIMATOR
       ============================================================ */
    const newBatSelect = $("newBattery");
    if (newBatSelect) {
      newBatSelect.innerHTML = NEW_BATTERIES.map(b => `<option value="${b.id}">${b.name} — ${inr(b.mrp)}</option>`).join("");
    }

    const citySelect = $("city");
    if (citySelect) {
      citySelect.innerHTML = '<option value="">Select city</option>' + CITIES.map(c => `<option>${c}</option>`).join("");
    }

    $("oldUnit")?.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLSelectElement;
      const ah = target.value === "ah";
      $("voltBox")?.classList.toggle("hidden", !ah);
      const oldCap = $("oldCap") as HTMLInputElement;
      if (oldCap) oldCap.placeholder = ah ? "e.g. 50" : "e.g. 2.5";
    });

    $("calcExBtn")?.addEventListener("click", () => {
      const err = $("exError");
      if (!err) return;
      err.classList.add("hidden");

      const chem = ($("oldChem") as HTMLSelectElement).value;
      const cond = ($("oldCond") as HTMLSelectElement).value;
      let cap = parseFloat(($("oldCap") as HTMLInputElement).value);
      const city = ($("city") as HTMLSelectElement).value;

      if (!cap || cap <= 0) { err.textContent = "Please enter your old battery capacity."; err.classList.remove("hidden"); return; }
      if (!city) { err.textContent = "Please select your city."; err.classList.remove("hidden"); return; }

      let kwh = cap;
      if (($("oldUnit") as HTMLSelectElement).value === "ah") {
        const v = parseFloat(($("oldVolt") as HTMLInputElement).value);
        if (!v || v <= 0) { err.textContent = "Please enter battery voltage."; err.classList.remove("hidden"); return; }
        kwh = (cap * v) / 1000;
      }

      const kg = kwh * KG_PER_KWH[chem];
      const scrap = scrapValue(chem, cond, kg);
      const selectedId = ($("newBattery") as HTMLSelectElement).value;
      const nb = NEW_BATTERIES.find(b => b.id === selectedId);
      if (!nb) return;

      const discount = Math.min(scrap, nb.mrp);
      const net = nb.mrp - discount;

      const exMrp = $("exMrp"); if (exMrp) exMrp.textContent = inr(nb.mrp);
      const exDisc = $("exDisc"); if (exDisc) exDisc.textContent = "- " + inr(discount);
      const exNet = $("exNet"); if (exNet) exNet.textContent = inr(net);
      const exSummary = $("exSummary"); if (exSummary) exSummary.textContent = `Old ${CHEM_NAME[chem]} battery (~${kwh.toFixed(2)} kWh, ~${kg.toFixed(1)} kg, ${COND_NAME[cond]}) in ${city}.`;

      const msg = `Hi EV Battery Hub India, I want to book a battery exchange.\nNew battery: ${nb.name}\nCity: ${city}\nOld battery: ${CHEM_NAME[chem]} ~${kwh.toFixed(2)} kWh (${COND_NAME[cond]})\nNew Battery Cost: ${inr(nb.mrp)}\nOld Scrap Discount: ${inr(discount)}\nPay Only: ${inr(net)}`;
      const exBookBtn = $("exBookBtn") as HTMLAnchorElement;
      if (exBookBtn) exBookBtn.href = waLink(msg);
      $("exResult")?.classList.remove("hidden");
    });

    /* ============================================================
       FEATURE CARDS
       ============================================================ */
    const rateDate = $("rateDate");
    if (rateDate) rateDate.textContent = "Updated: " + new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

    const rateList = $("rateList");
    if (rateList) {
      rateList.innerHTML = [
        ["LFP", "bg-cyan-50"], ["NMC", "bg-emerald-50"], ["LEAD", "bg-slate-50"]
      ].map(([k, bg]) => `
        <div class="flex justify-between items-center ${bg} rounded-lg px-3 py-2">
          <span class="font-medium">${CHEM_NAME[k]}</span>
          <b class="text-emerald9">${inr(RATES[k])}/kg</b>
        </div>`).join("");
    }

    // Directory filter
    const stateSel = $("dirState") as HTMLSelectElement;
    const citySel = $("dirCity") as HTMLSelectElement;
    const list = $("dirList");

    if (stateSel && citySel && list) {
      stateSel.innerHTML = '<option value="">All States</option>' + Object.keys(DIRECTORY).map(s => `<option>${s}</option>`).join("");
      
      const renderDirectory = () => {
        const s = stateSel.value, c = citySel.value;
        const rows: string[] = [];
        Object.entries(DIRECTORY).forEach(([st, cities]) => {
          if (s && st !== s) return;
          Object.entries(cities).forEach(([ct, names]) => {
            if (c && ct !== c) return;
            names.forEach(n => rows.push(`<li class="bg-emerald-50 rounded-lg px-3 py-2"><b>${n}</b><br><span class="text-xs text-slate-500">${ct}, ${st}</span></li>`));
          });
        });
        list.innerHTML = rows.join("") || '<li class="text-slate-400">No results found.</li>';
      };

      stateSel.addEventListener("change", () => {
        const cities = stateSel.value ? Object.keys(DIRECTORY[stateSel.value]) : [];
        citySel.innerHTML = '<option value="">All Cities</option>' + cities.map(c => `<option>${c}</option>`).join("");
        renderDirectory();
      });
      citySel.addEventListener("change", renderDirectory);
      citySel.innerHTML = '<option value="">All Cities</option>';
      renderDirectory();
    }

    /* ============================================================
       LEAD FORM
       ============================================================ */
    const leadForm = $("leadForm");
    if (leadForm) {
      leadForm.addEventListener("submit", async e => {
        e.preventDefault();
        const err = $("formError"), ok = $("formSuccess");
        if (!err || !ok) return;
        err.classList.add("hidden"); ok.classList.add("hidden");

        const data = {
          name: (($("lName") as HTMLInputElement).value || "").trim(),
          phone: (($("lPhone") as HTMLInputElement).value || "").trim(),
          city: (($("lCity") as HTMLInputElement).value || "").trim(),
          quantity: (($("lQty") as HTMLInputElement).value || "").trim(),
          category: ($("lCat") as HTMLSelectElement).value
        };

        if (!data.name || !data.city || !data.quantity || !data.category) {
          err.textContent = "Please fill in all fields."; err.classList.remove("hidden"); return;
        }
        if (!/^[6-9]\d{9}$/.test(data.phone)) {
          err.textContent = "Enter a valid 10-digit Indian mobile number."; err.classList.remove("hidden"); return;
        }

        ok.innerHTML = `✅ Thank you, <b>${data.name}</b>! We received your request for <b>${data.quantity}</b> (${data.category}, ${data.city}). Our team will contact you on WhatsApp at <b>+91 ${data.phone}</b> shortly.
          <a class="block mt-2 font-semibold text-green-700 underline" target="_blank" rel="noopener" href="${waLink(`Hi, I'm ${data.name} from ${data.city}. Category: ${data.category}. Scrap quantity: ${data.quantity}. Please share your best quote.`)}">Or chat with us now on WhatsApp →</a>`;
        ok.classList.remove("hidden");
        (e.target as HTMLFormElement).reset();
      });
    }
  }, []);

  return (
    <div className="font-sans text-slate-800 bg-white antialiased">
      {/* Dynamic CSS & Tailwind Imports */}
      <script src="https://cdn.tailwindcss.com"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: { emerald9: '#064E3B', cyan5: '#06B6D4' },
                  fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
                }
              }
            }
          `,
        }}
      />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        .card { transition: transform .25s ease, box-shadow .25s ease; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 14px 30px -10px rgba(6,78,59,.25); }
        .field { width: 100%; border: 1px solid #d1d5db; border-radius: .75rem; padding: .7rem .9rem; background: #fff; transition: border-color .2s, box-shadow .2s; }
        .field:focus { outline: none; border-color: #06B6D4; box-shadow: 0 0 0 3px rgba(6,182,212,.25); }
        .tab-btn { transition: all .25s ease; }
        .tab-active { background: #064E3B; color: #fff; }
        .fade-in { animation: fade .4s ease; }
        @keyframes fade { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: none; } }
      `}} />

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-[#064E3B] flex items-center justify-center text-[#06B6D4] text-xl">⚡</span>
            <span className="leading-tight">
              <span className="block font-extrabold text-[#064E3B]">EV Battery Hub India</span>
              <span className="block text-[11px] text-slate-500">evbatteryhub.in</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a href="#home" className="hover:text-[#06B6D4] transition">Home</a>
            <a href="#scrap-rates" className="hover:text-[#06B6D4] transition">Scrap Rates</a>
            <a href="#recyclers" className="hover:text-[#06B6D4] transition">Recyclers Directory</a>
            <a href="#exchange" className="hover:text-[#06B6D4] transition">Battery Exchange</a>
            <a href="#blog" className="hover:text-[#06B6D4] transition">Blog</a>
            <a href="#contact" className="hover:text-[#06B6D4] transition">Contact Us</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#lead-form" className="hidden sm:inline-block bg-[#06B6D4] hover:bg-cyan-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition">Get Bulk B2B Quote</a>
            <button id="menuBtn" className="lg:hidden p-2 rounded-lg border border-emerald-100" aria-label="Toggle menu">
              <svg className="w-6 h-6 text-[#064E3B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
        <div id="mobileMenu" className="hidden lg:hidden border-t border-emerald-100 bg-white px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3 text-sm font-medium">
            <a href="#home">Home</a><a href="#scrap-rates">Scrap Rates</a><a href="#recyclers">Recyclers Directory</a>
            <a href="#exchange">Battery Exchange</a><a href="#blog">Blog</a><a href="#contact">Contact Us</a>
            <a href="#lead-form" className="bg-[#06B6D4] text-white text-center font-semibold px-4 py-2.5 rounded-xl">Get Bulk B2B Quote</a>
          </div>
        </div>
      </header>

      {/* HERO + CALCULATOR */}
      <section id="home" className="bg-gradient-to-br from-[#064E3B] via-emerald-800 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-white/10 border border-white/20 text-cyan-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">♻️ India's EV Battery Scrap & Exchange Platform</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Calculate EV Battery Scrap Value &amp; Get Instant Battery Exchange Deals in India
            </h1>
            <p className="mt-4 text-emerald-100 text-base sm:text-lg">
              Check estimated scrap rates for LFP/NMC batteries or trade in your old EV battery for a new one.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="bg-white/10 px-3 py-1.5 rounded-lg">✔ LFP · NMC · Lead Acid</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg">✔ 2W · 3W · 4W · Solar</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg">✔ Instant estimate</span>
            </div>
          </div>

          <div id="exchange" className="bg-white text-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-2 bg-emerald-50 p-1.5 rounded-2xl mb-5" role="tablist">
              <button id="tab1Btn" role="tab" className="tab-btn tab-active text-xs sm:text-sm font-semibold py-3 px-2 rounded-xl">Check Scrap Value (Sell Old Battery)</button>
              <button id="tab2Btn" role="tab" className="tab-btn text-xs sm:text-sm font-semibold py-3 px-2 rounded-xl text-[#064E3B]">Old vs New Battery Exchange Estimator</button>
            </div>

            {/* TAB 1 */}
            <div id="tab1" className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="chem">Battery Chemistry</label>
                  <select id="chem" className="field mt-1">
                    <option value="LFP">LFP (Lithium Iron Phosphate)</option>
                    <option value="NMC">NMC (Nickel Manganese Cobalt)</option>
                    <option value="LEAD">Lead Acid</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="vehicle">Vehicle Type</label>
                  <select id="vehicle" className="field mt-1">
                    <option value="2W">2-Wheeler</option>
                    <option value="3W">3-Wheeler</option>
                    <option value="4W">4-Wheeler / EV Car</option>
                    <option value="SOLAR">Solar Storage</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="measureType">Measure By</label>
                  <select id="measureType" className="field mt-1">
                    <option value="kg">Battery Weight (kg)</option>
                    <option value="kwh">Capacity (kWh)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="measureVal" id="measureLabel">Weight (kg)</label>
                  <input id="measureVal" type="number" min="0" step="any" placeholder="e.g. 25" className="field mt-1" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="cond">Condition</label>
                <select id="cond" className="field mt-1">
                  <option value="WORKING">Working</option>
                  <option value="USED">Used</option>
                  <option value="SCRAP">Damaged / Scrap</option>
                </select>
              </div>

              <button id="calcScrapBtn" className="w-full bg-[#064E3B] hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition">Calculate Scrap Value</button>
              <p id="scrapError" className="hidden text-sm text-red-600"></p>

              <div id="scrapResult" className="hidden fade-in rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
                <p className="text-sm text-slate-600">Estimated Scrap Value</p>
                <p id="scrapAmount" className="text-3xl font-extrabold text-[#064E3B]">₹0</p>
                <p id="scrapDetail" className="text-xs text-slate-500 mt-1"></p>
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  <a id="waScrapBtn" href="#" target="_blank" rel="noopener" className="text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition">💬 Chat on WhatsApp for Instant Scrap Deal</a>
                  <a href="#lead-form" className="text-center bg-white border-2 border-[#064E3B] text-[#064E3B] hover:bg-emerald-50 font-semibold py-3 rounded-xl transition">Submit B2B Lead Form</a>
                </div>
                <p className="text-[11px] text-slate-500 mt-3">* Indicative estimate only. Final price depends on physical inspection, State of Health and live market rates.</p>
              </div>
            </div>

            {/* TAB 2 */}
            <div id="tab2" className="hidden space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="oldChem">Old Battery Chemistry</label>
                  <select id="oldChem" className="field mt-1">
                    <option value="LFP">LFP</option>
                    <option value="NMC">NMC</option>
                    <option value="LEAD">Lead Acid</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="oldCond">Old Battery Condition</label>
                  <select id="oldCond" className="field mt-1" defaultValue="USED">
                    <option value="WORKING">Working</option>
                    <option value="USED">Used</option>
                    <option value="SCRAP">Damaged / Scrap</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="text-sm font-medium" htmlFor="oldUnit">Unit</label>
                  <select id="oldUnit" className="field mt-1">
                    <option value="kwh">kWh</option>
                    <option value="ah">Ah</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium" htmlFor="oldCap">Old Battery Capacity</label>
                  <input id="oldCap" type="number" min="0" step="any" placeholder="e.g. 2.5" className="field mt-1" />
                </div>
              </div>
              <div id="voltBox" className="hidden">
                <label className="text-sm font-medium" htmlFor="oldVolt">Battery Voltage (V) — needed to convert Ah to kWh</label>
                <input id="oldVolt" type="number" min="0" step="any" defaultValue="48" className="field mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="newBattery">Select New Battery Brand / Model</label>
                <select id="newBattery" className="field mt-1"></select>
              </div>

              <div>
                <label className="text-sm font-medium" htmlFor="city">Current City</label>
                <select id="city" className="field mt-1"></select>
              </div>

              <button id="calcExBtn" className="w-full bg-[#064E3B] hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition">Calculate Net Payable Amount</button>
              <p id="exError" className="hidden text-sm text-red-600"></p>

              <div id="exResult" className="hidden fade-in rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>New Battery Cost</span><b id="exMrp">₹0</b></div>
                  <div className="flex justify-between text-green-700"><span>Old Scrap Discount</span><b id="exDisc">- ₹0</b></div>
                  <div className="flex justify-between border-t border-cyan-200 pt-2 mt-2 text-base"><span className="font-semibold">Pay Only</span><b id="exNet" className="text-2xl text-[#064E3B]">₹0</b></div>
                </div>
                <p id="exSummary" className="text-xs text-slate-500 mt-2"></p>
                <a id="exBookBtn" href="#" target="_blank" rel="noopener" className="mt-4 block text-center bg-[#06B6D4] hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition">Book Battery Exchange Offer</a>
                <p className="text-[11px] text-slate-500 mt-3">* Sample model prices are placeholders. Replace with your partner price list.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE CITIES (pSEO Internal Linking Grid) */}
      <BrowseCities />

      {/* FEATURES GRID */}
      <section id="scrap-rates" className="max-w-7xl mx-auto px-4 py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B]">Everything You Need to Sell, Recycle &amp; Reuse EV Batteries</h2>
          <p className="text-slate-500 mt-2">Rates, certified buyers, compliance and second-life use cases in one place.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="card bg-white border border-emerald-100 rounded-2xl p-5">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-bold text-[#064E3B]">Today's Live Scrap Rates</h3>
            <p className="text-xs text-slate-500 mb-3" id="rateDate"></p>
            <div id="rateList" className="space-y-2 text-sm"></div>
            <p className="text-[11px] text-slate-400 mt-3">Indicative rates. Update the RATES object in the script daily or connect an API.</p>
          </div>

          <div id="recyclers" className="card bg-white border border-emerald-100 rounded-2xl p-5">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="font-bold text-[#064E3B]">CPCB Certified Buyer Directory</h3>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <select id="dirState" className="field !py-2 text-sm"></select>
              <select id="dirCity" className="field !py-2 text-sm"></select>
            </div>
            <ul id="dirList" className="mt-3 space-y-2 text-sm max-h-40 overflow-auto"></ul>
            <p className="text-[11px] text-slate-400 mt-3">Sample entries only. Replace with verified names from the official CPCB registered-recycler list.</p>
          </div>

          <div className="card bg-white border border-emerald-100 rounded-2xl p-5">
            <div className="text-3xl mb-3">📜</div>
            <h3 className="font-bold text-[#064E3B]">EPR Compliance &amp; Battery Waste Management Rules 2022</h3>
            <ul className="mt-3 text-sm text-slate-600 space-y-2 list-disc list-inside">
              <li>Producers must register under EPR via the CPCB portal.</li>
              <li>Mandatory collection, recycling and refurbishment targets.</li>
              <li>Only authorised recyclers and refurbishers may handle waste batteries.</li>
            </ul>
            <a href="#contact" className="inline-block mt-4 text-cyan-700 font-semibold text-sm hover:underline">Get EPR guidance →</a>
          </div>

          <div className="card bg-white border border-emerald-100 rounded-2xl p-5">
            <div className="text-3xl mb-3">🔋</div>
            <h3 className="font-bold text-[#064E3B]">Second-Life Battery Applications</h3>
            <p className="text-sm text-slate-600 mt-3">Batteries that retire from vehicles often keep 70–80% capacity, enough for less demanding jobs:</p>
            <ul className="mt-2 text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Rooftop solar storage</li>
              <li>Home &amp; shop inverters / UPS</li>
              <li>Telecom tower backup</li>
              <li>Micro-grid energy storage</li>
            </ul>
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="lead-form" className="bg-emerald-50 py-14">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B]">B2B &amp; Scrap Seller Lead Form</h2>
            <p className="text-slate-500 mt-2">Tell us what you have. Our team will contact you on WhatsApp with the best offer.</p>
          </div>

          <form id="leadForm" className="bg-white rounded-3xl shadow-lg p-5 sm:p-8 space-y-4" noValidate>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium" htmlFor="lName">Name</label>
                <input id="lName" type="text" required className="field mt-1" placeholder="Your full name" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="lPhone">WhatsApp Number</label>
                <input id="lPhone" type="tel" inputMode="numeric" maxLength={10} required className="field mt-1" placeholder="10-digit mobile number" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="lCity">City</label>
                <input id="lCity" type="text" required className="field mt-1" placeholder="e.g. Pune" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="lQty">Scrap Quantity (kg / units)</label>
                <input id="lQty" type="text" required className="field mt-1" placeholder="e.g. 500 kg or 20 units" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="lCat">User Category</label>
              <select id="lCat" className="field mt-1" required defaultValue="">
                <option value="">Select category</option>
                <option>Individual EV Owner</option>
                <option>Local Scrap Dealer</option>
                <option>Commercial Fleet</option>
                <option>Business</option>
              </select>
            </div>
            <p id="formError" className="hidden text-sm text-red-600"></p>
            <button type="submit" className="w-full bg-[#06B6D4] hover:bg-cyan-600 text-white font-bold py-3.5 rounded-xl transition">Submit &amp; Get Bulk Quote</button>
            <div id="formSuccess" className="hidden fade-in rounded-xl bg-green-50 border border-green-200 text-green-800 p-4 text-sm"></div>
          </form>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-extrabold text-[#064E3B]">Blog</h2>
        <p className="text-slate-500 mt-2">Guides on EV battery recycling, scrap pricing and EPR compliance are coming soon.</p>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#064E3B] text-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="font-extrabold text-white text-lg">EV Battery Hub India</p>
            <p className="mt-2">evbatteryhub.in</p>
            <p className="mt-2 text-emerald-200 text-xs">Estimates are indicative and not a binding offer.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-2">Quick Links</p>
            <ul className="space-y-1">
              <li><a href="#scrap-rates" className="hover:text-[#06B6D4]">Scrap Rates</a></li>
              <li><a href="#recyclers" className="hover:text-[#06B6D4]">Recyclers Directory</a></li>
              <li><a href="#exchange" className="hover:text-[#06B6D4]">Battery Exchange</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-2">Contact Us</p>
            <p>Email: info@evbatteryhub.in</p>
            <p>WhatsApp: +91 6395948240</p>
          </div>
        </div>
        
        {/* Google Translate Widget for All Languages */}
        <div className="py-4 text-center border-t border-white/10">
          <div id="google_translate_element" className="inline-block"></div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                function googleTranslateElementInit() {
                  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
                }
              `,
            }}
          />
          <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
        </div>

        <div className="border-t border-white/10 text-center text-xs py-4">© <span id="yr"></span> EV Battery Hub India. All rights reserved.</div>
      </footer>

      {/* Floating WhatsApp */}
      <a id="floatWa" href="#" target="_blank" rel="noopener" className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-2xl transition z-40" aria-label="Chat on WhatsApp">💬</a>
    </div>
  );
}
