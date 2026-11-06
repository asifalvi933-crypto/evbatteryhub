<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EV Battery Hub India | EV Battery Scrap Value & Exchange Calculator</title>
  <meta name="description" content="Calculate EV battery scrap value for LFP, NMC and lead acid batteries and get instant battery exchange deals in India. evbatteryhub.in" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: { emerald9: '#064E3B', cyan5: '#06B6D4' },
          fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
        }
      }
    }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    html { scroll-behavior: smooth; }
    .card { transition: transform .25s ease, box-shadow .25s ease; }
    .card:hover { transform: translateY(-4px); box-shadow: 0 14px 30px -10px rgba(6,78,59,.25); }
    .field { width: 100%; border: 1px solid #d1d5db; border-radius: .75rem; padding: .7rem .9rem; background: #fff; transition: border-color .2s, box-shadow .2s; }
    .field:focus { outline: none; border-color: #06B6D4; box-shadow: 0 0 0 3px rgba(6,182,212,.25); }
    .tab-btn { transition: all .25s ease; }
    .tab-active { background: #064E3B; color: #fff; }
    .fade-in { animation: fade .4s ease; }
    @keyframes fade { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: none; } }
  </style>
</head>
<body class="font-sans text-slate-800 bg-white antialiased">

  <!-- ================= HEADER ================= -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-emerald-100">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="#home" class="flex items-center gap-2">
        <span class="w-10 h-10 rounded-xl bg-emerald9 flex items-center justify-center text-cyan5 text-xl">⚡</span>
        <span class="leading-tight">
          <span class="block font-extrabold text-emerald9">EV Battery Hub India</span>
          <span class="block text-[11px] text-slate-500">evbatteryhub.in</span>
        </span>
      </a>

      <nav class="hidden lg:flex items-center gap-6 text-sm font-medium">
        <a href="#home" class="hover:text-cyan5 transition">Home</a>
        <a href="#scrap-rates" class="hover:text-cyan5 transition">Scrap Rates</a>
        <a href="#recyclers" class="hover:text-cyan5 transition">Recyclers Directory</a>
        <a href="#exchange" class="hover:text-cyan5 transition">Battery Exchange</a>
        <a href="#blog" class="hover:text-cyan5 transition">Blog</a>
        <a href="#contact" class="hover:text-cyan5 transition">Contact Us</a>
      </nav>

      <div class="flex items-center gap-2">
        <a href="#lead-form" class="hidden sm:inline-block bg-cyan5 hover:bg-cyan-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition">Get Bulk B2B Quote</a>
        <button id="menuBtn" class="lg:hidden p-2 rounded-lg border border-emerald-100" aria-label="Toggle menu">
          <svg class="w-6 h-6 text-emerald9" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
    <div id="mobileMenu" class="hidden lg:hidden border-t border-emerald-100 bg-white px-4 pb-4">
      <div class="flex flex-col gap-3 pt-3 text-sm font-medium">
        <a href="#home">Home</a><a href="#scrap-rates">Scrap Rates</a><a href="#recyclers">Recyclers Directory</a>
        <a href="#exchange">Battery Exchange</a><a href="#blog">Blog</a><a href="#contact">Contact Us</a>
        <a href="#lead-form" class="bg-cyan5 text-white text-center font-semibold px-4 py-2.5 rounded-xl">Get Bulk B2B Quote</a>
      </div>
    </div>
  </header>

  <!-- ================= HERO + CALCULATOR ================= -->
  <section id="home" class="bg-gradient-to-br from-emerald9 via-emerald-800 to-emerald-900 text-white">
    <div class="max-w-7xl mx-auto px-4 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <span class="inline-block bg-white/10 border border-white/20 text-cyan-200 text-xs font-semibold px-3 py-1 rounded-full mb-4">♻️ India's EV Battery Scrap & Exchange Platform</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
          Calculate EV Battery Scrap Value &amp; Get Instant Battery Exchange Deals in India
        </h1>
        <p class="mt-4 text-emerald-100 text-base sm:text-lg">
          Check estimated scrap rates for LFP/NMC batteries or trade in your old EV battery for a new one.
        </p>
        <div class="mt-6 flex flex-wrap gap-3 text-sm">
          <span class="bg-white/10 px-3 py-1.5 rounded-lg">✔ LFP · NMC · Lead Acid</span>
          <span class="bg-white/10 px-3 py-1.5 rounded-lg">✔ 2W · 3W · 4W · Solar</span>
          <span class="bg-white/10 px-3 py-1.5 rounded-lg">✔ Instant estimate</span>
        </div>
      </div>

      <!-- Calculator Widget -->
      <div id="exchange" class="bg-white text-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6">
        <div class="grid grid-cols-2 gap-2 bg-emerald-50 p-1.5 rounded-2xl mb-5" role="tablist">
          <button id="tab1Btn" role="tab" class="tab-btn tab-active text-xs sm:text-sm font-semibold py-3 px-2 rounded-xl">Check Scrap Value (Sell Old Battery)</button>
          <button id="tab2Btn" role="tab" class="tab-btn text-xs sm:text-sm font-semibold py-3 px-2 rounded-xl text-emerald9">Old vs New Battery Exchange Estimator</button>
        </div>

        <!-- TAB 1 -->
        <div id="tab1" class="space-y-4">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium" for="chem">Battery Chemistry</label>
              <select id="chem" class="field mt-1">
                <option value="LFP">LFP (Lithium Iron Phosphate)</option>
                <option value="NMC">NMC (Nickel Manganese Cobalt)</option>
                <option value="LEAD">Lead Acid</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium" for="vehicle">Vehicle Type</label>
              <select id="vehicle" class="field mt-1">
                <option value="2W">2-Wheeler</option>
                <option value="3W">3-Wheeler</option>
                <option value="4W">4-Wheeler / EV Car</option>
                <option value="SOLAR">Solar Storage</option>
              </select>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium" for="measureType">Measure By</label>
              <select id="measureType" class="field mt-1">
                <option value="kg">Battery Weight (kg)</option>
                <option value="kwh">Capacity (kWh)</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium" for="measureVal" id="measureLabel">Weight (kg)</label>
              <input id="measureVal" type="number" min="0" step="any" placeholder="e.g. 25" class="field mt-1" />
            </div>
          </div>

          <div>
            <label class="text-sm font-medium" for="cond">Condition</label>
            <select id="cond" class="field mt-1">
              <option value="WORKING">Working</option>
              <option value="USED">Used</option>
              <option value="SCRAP">Damaged / Scrap</option>
            </select>
          </div>

          <button id="calcScrapBtn" class="w-full bg-emerald9 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition">Calculate Scrap Value</button>
          <p id="scrapError" class="hidden text-sm text-red-600"></p>

          <div id="scrapResult" class="hidden fade-in rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
            <p class="text-sm text-slate-600">Estimated Scrap Value</p>
            <p id="scrapAmount" class="text-3xl font-extrabold text-emerald9">₹0</p>
            <p id="scrapDetail" class="text-xs text-slate-500 mt-1"></p>
            <div class="mt-4 grid sm:grid-cols-2 gap-3">
              <a id="waScrapBtn" href="#" target="_blank" rel="noopener" class="text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition">💬 Chat on WhatsApp for Instant Scrap Deal</a>
              <a href="#lead-form" class="text-center bg-white border-2 border-emerald9 text-emerald9 hover:bg-emerald-50 font-semibold py-3 rounded-xl transition">Submit B2B Lead Form</a>
            </div>
            <p class="text-[11px] text-slate-500 mt-3">* Indicative estimate only. Final price depends on physical inspection, State of Health and live market rates.</p>
          </div>
        </div>

        <!-- TAB 2 -->
        <div id="tab2" class="hidden space-y-4">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium" for="oldChem">Old Battery Chemistry</label>
              <select id="oldChem" class="field mt-1">
                <option value="LFP">LFP</option>
                <option value="NMC">NMC</option>
                <option value="LEAD">Lead Acid</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium" for="oldCond">Old Battery Condition</label>
              <select id="oldCond" class="field mt-1">
                <option value="WORKING">Working</option>
                <option value="USED" selected>Used</option>
                <option value="SCRAP">Damaged / Scrap</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div class="col-span-1">
              <label class="text-sm font-medium" for="oldUnit">Unit</label>
              <select id="oldUnit" class="field mt-1">
                <option value="kwh">kWh</option>
                <option value="ah">Ah</option>
              </select>
            </div>
            <div class="col-span-2">
              <label class="text-sm font-medium" for="oldCap">Old Battery Capacity</label>
              <input id="oldCap" type="number" min="0" step="any" placeholder="e.g. 2.5" class="field mt-1" />
            </div>
          </div>
          <div id="voltBox" class="hidden">
            <label class="text-sm font-medium" for="oldVolt">Battery Voltage (V) — needed to convert Ah to kWh</label>
            <input id="oldVolt" type="number" min="0" step="any" value="48" class="field mt-1" />
          </div>

          <div>
            <label class="text-sm font-medium" for="newBattery">Select New Battery Brand / Model</label>
            <select id="newBattery" class="field mt-1"></select>
          </div>

          <div>
            <label class="text-sm font-medium" for="city">Current City</label>
            <select id="city" class="field mt-1"></select>
          </div>

          <button id="calcExBtn" class="w-full bg-emerald9 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition">Calculate Net Payable Amount</button>
          <p id="exError" class="hidden text-sm text-red-600"></p>

          <div id="exResult" class="hidden fade-in rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
            <div class="space-y-1 text-sm">
              <div class="flex justify-between"><span>New Battery Cost</span><b id="exMrp">₹0</b></div>
              <div class="flex justify-between text-green-700"><span>Old Scrap Discount</span><b id="exDisc">- ₹0</b></div>
              <div class="flex justify-between border-t border-cyan-200 pt-2 mt-2 text-base"><span class="font-semibold">Pay Only</span><b id="exNet" class="text-2xl text-emerald9">₹0</b></div>
            </div>
            <p id="exSummary" class="text-xs text-slate-500 mt-2"></p>
            <a id="exBookBtn" href="#" target="_blank" rel="noopener" class="mt-4 block text-center bg-cyan5 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition">Book Battery Exchange Offer</a>
            <p class="text-[11px] text-slate-500 mt-3">* Sample model prices are placeholders. Replace with your partner price list.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= FEATURES GRID ================= -->
  <section id="scrap-rates" class="max-w-7xl mx-auto px-4 py-14">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <h2 class="text-2xl sm:text-3xl font-extrabold text-emerald9">Everything You Need to Sell, Recycle &amp; Reuse EV Batteries</h2>
      <p class="text-slate-500 mt-2">Rates, certified buyers, compliance and second-life use cases in one place.</p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <!-- Card 1 -->
      <div class="card bg-white border border-emerald-100 rounded-2xl p-5">
        <div class="text-3xl mb-3">📈</div>
        <h3 class="font-bold text-emerald9">Today's Live Scrap Rates</h3>
        <p class="text-xs text-slate-500 mb-3" id="rateDate"></p>
        <div id="rateList" class="space-y-2 text-sm"></div>
        <p class="text-[11px] text-slate-400 mt-3">Indicative rates. Update the RATES object in the script daily or connect an API.</p>
      </div>

      <!-- Card 2 -->
      <div id="recyclers" class="card bg-white border border-emerald-100 rounded-2xl p-5">
        <div class="text-3xl mb-3">✅</div>
        <h3 class="font-bold text-emerald9">CPCB Certified Buyer Directory</h3>
        <div class="grid grid-cols-2 gap-2 mt-3">
          <select id="dirState" class="field !py-2 text-sm"></select>
          <select id="dirCity" class="field !py-2 text-sm"></select>
        </div>
        <ul id="dirList" class="mt-3 space-y-2 text-sm max-h-40 overflow-auto"></ul>
        <p class="text-[11px] text-slate-400 mt-3">Sample entries only. Replace with verified names from the official CPCB registered-recycler list.</p>
      </div>

      <!-- Card 3 -->
      <div class="card bg-white border border-emerald-100 rounded-2xl p-5">
        <div class="text-3xl mb-3">📜</div>
        <h3 class="font-bold text-emerald9">EPR Compliance &amp; Battery Waste Management Rules 2022</h3>
        <ul class="mt-3 text-sm text-slate-600 space-y-2 list-disc list-inside">
          <li>Producers must register under EPR via the CPCB portal.</li>
          <li>Mandatory collection, recycling and refurbishment targets.</li>
          <li>Only authorised recyclers and refurbishers may handle waste batteries.</li>
        </ul>
        <a href="#contact" class="inline-block mt-4 text-cyan-700 font-semibold text-sm hover:underline">Get EPR guidance →</a>
      </div>

      <!-- Card 4 -->
      <div class="card bg-white border border-emerald-100 rounded-2xl p-5">
        <div class="text-3xl mb-3">🔋</div>
        <h3 class="font-bold text-emerald9">Second-Life Battery Applications</h3>
        <p class="text-sm text-slate-600 mt-3">Batteries that retire from vehicles often keep 70–80% capacity, enough for less demanding jobs:</p>
        <ul class="mt-2 text-sm text-slate-600 space-y-1 list-disc list-inside">
          <li>Rooftop solar storage</li>
          <li>Home &amp; shop inverters / UPS</li>
          <li>Telecom tower backup</li>
          <li>Micro-grid energy storage</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ================= LEAD FORM ================= -->
  <section id="lead-form" class="bg-emerald-50 py-14">
    <div class="max-w-3xl mx-auto px-4">
      <div class="text-center mb-8">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-emerald9">B2B &amp; Scrap Seller Lead Form</h2>
        <p class="text-slate-500 mt-2">Tell us what you have. Our team will contact you on WhatsApp with the best offer.</p>
      </div>

      <form id="leadForm" class="bg-white rounded-3xl shadow-lg p-5 sm:p-8 space-y-4" novalidate>
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium" for="lName">Name</label>
            <input id="lName" type="text" required class="field mt-1" placeholder="Your full name" />
          </div>
          <div>
            <label class="text-sm font-medium" for="lPhone">WhatsApp Number</label>
            <input id="lPhone" type="tel" inputmode="numeric" maxlength="10" required class="field mt-1" placeholder="10-digit mobile number" />
          </div>
          <div>
            <label class="text-sm font-medium" for="lCity">City</label>
            <input id="lCity" type="text" required class="field mt-1" placeholder="e.g. Pune" />
          </div>
          <div>
            <label class="text-sm font-medium" for="lQty">Scrap Quantity (kg / units)</label>
            <input id="lQty" type="text" required class="field mt-1" placeholder="e.g. 500 kg or 20 units" />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium" for="lCat">User Category</label>
          <select id="lCat" class="field mt-1" required>
            <option value="">Select category</option>
            <option>Individual EV Owner</option>
            <option>Local Scrap Dealer</option>
            <option>Commercial Fleet</option>
            <option>Business</option>
          </select>
        </div>
        <p id="formError" class="hidden text-sm text-red-600"></p>
        <button type="submit" class="w-full bg-cyan5 hover:bg-cyan-600 text-white font-bold py-3.5 rounded-xl transition">Submit &amp; Get Bulk Quote</button>
        <div id="formSuccess" class="hidden fade-in rounded-xl bg-green-50 border border-green-200 text-green-800 p-4 text-sm"></div>
      </form>
    </div>
  </section>

  <!-- ================= BLOG / CONTACT PLACEHOLDERS ================= -->
  <section id="blog" class="max-w-7xl mx-auto px-4 py-12 text-center">
    <h2 class="text-2xl font-extrabold text-emerald9">Blog</h2>
    <p class="text-slate-500 mt-2">Guides on EV battery recycling, scrap pricing and EPR compliance are coming soon.</p>
  </section>

  <!-- ================= FOOTER ================= -->
  <footer id="contact" class="bg-emerald9 text-emerald-100">
    <div class="max-w-7xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-6 text-sm">
      <div>
        <p class="font-extrabold text-white text-lg">EV Battery Hub India</p>
        <p class="mt-2">evbatteryhub.in</p>
        <p class="mt-2 text-emerald-200 text-xs">Estimates are indicative and not a binding offer.</p>
      </div>
      <div>
        <p class="font-semibold text-white mb-2">Quick Links</p>
        <ul class="space-y-1">
          <li><a href="#scrap-rates" class="hover:text-cyan5">Scrap Rates</a></li>
          <li><a href="#recyclers" class="hover:text-cyan5">Recyclers Directory</a></li>
          <li><a href="#exchange" class="hover:text-cyan5">Battery Exchange</a></li>
        </ul>
      </div>
      <div>
        <p class="font-semibold text-white mb-2">Contact Us</p>
        <p>Email: info@evbatteryhub.in</p>
        <p>WhatsApp: +91 6395948240</p>
      </div>
    </div>
    <div class="border-t border-white/10 text-center text-xs py-4">© <span id="yr"></span> EV Battery Hub India. All rights reserved.</div>
  </footer>

  <!-- Floating WhatsApp -->
  <a id="floatWa" href="#" target="_blank" rel="noopener" class="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-2xl transition z-40" aria-label="Chat on WhatsApp">💬</a>

<script>
/* ============================================================
   CONFIG — edit these values to match your business
   ============================================================ */
const WHATSAPP_NUMBER = "916395948240"; // Updated with your WhatsApp number

// Indicative scrap rates in ₹ per kg (update daily or fetch from your API)
const RATES = { LFP: 55, NMC: 130, LEAD: 85 };

// Condition multipliers
const CONDITION = { WORKING: 1.3, USED: 1.0, SCRAP: 0.7 };

// Approx. pack weight per kWh (kg/kWh) to convert kWh → kg
const KG_PER_KWH = { LFP: 7.5, NMC: 5.5, LEAD: 30 };

// Sample new battery catalogue (REPLACE with real brands & MRPs)
const NEW_BATTERIES = [
  { id: "b1", name: "Sample LFP 48V 30Ah (2W) — 1.44 kWh", mrp: 28000 },
  { id: "b2", name: "Sample LFP 60V 40Ah (3W) — 2.4 kWh",  mrp: 45000 },
  { id: "b3", name: "Sample NMC 72V 50Ah (2W/3W) — 3.6 kWh", mrp: 62000 },
  { id: "b4", name: "Sample LFP 51.2V 100Ah (Solar) — 5.12 kWh", mrp: 98000 }
];

const CITIES = ["Delhi NCR","Mumbai","Pune","Bengaluru","Hyderabad","Chennai","Kolkata","Ahmedabad","Jaipur","Lucknow","Other"];

// Sample directory (PLACEHOLDERS — replace with verified CPCB data)
const DIRECTORY = {
  "Maharashtra": { "Mumbai": ["Sample Recycler A"], "Pune": ["Sample Recycler B"] },
  "Karnataka":   { "Bengaluru": ["Sample Recycler C"] },
  "Delhi":       { "New Delhi": ["Sample Recycler D"] },
  "Telangana":   { "Hyderabad": ["Sample Recycler E"] },
  "Tamil Nadu":  { "Chennai": ["Sample Recycler F"] }
};

/* ============================================================
   HELPERS
   ============================================================ */
const $ = id => document.getElementById(id);
const inr = n => "₹" + Math.round(n).toLocaleString("en-IN");
const waLink = msg => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
const CHEM_NAME = { LFP: "LFP", NMC: "NMC", LEAD: "Lead Acid" };
const COND_NAME = { WORKING: "Working", USED: "Used", SCRAP: "Damaged/Scrap" };

function scrapValue(chem, cond, kg) {
  return kg * RATES[chem] * CONDITION[cond];
}

/* ============================================================
   NAV
   ============================================================ */
$("menuBtn").addEventListener("click", () => $("mobileMenu").classList.toggle("hidden"));
document.querySelectorAll("#mobileMenu a").forEach(a => a.addEventListener("click", () => $("mobileMenu").classList.add("hidden")));
$("yr").textContent = new Date().getFullYear();
$("floatWa").href = waLink("Hi EV Battery Hub India, I need help with battery scrap / exchange.");

/* ============================================================
   TABS
   ============================================================ */
function showTab(n) {
  const one = n === 1;
  $("tab1").classList.toggle("hidden", !one);
  $("tab2").classList.toggle("hidden", one);
  $("tab1Btn").classList.toggle("tab-active", one);
  $("tab1Btn").classList.toggle("text-emerald9", !one);
  $("tab2Btn").classList.toggle("tab-active", !one);
  $("tab2Btn").classList.toggle("text-emerald9", one);
}
$("tab1Btn").addEventListener("click", () => showTab(1));
$("tab2Btn").addEventListener("click", () => showTab(2));

/* ============================================================
   TAB 1 — SCRAP CALCULATOR
   ============================================================ */
$("measureType").addEventListener("change", e => {
  const kg = e.target.value === "kg";
  $("measureLabel").textContent = kg ? "Weight (kg)" : "Capacity (kWh)";
  $("measureVal").placeholder = kg ? "e.g. 25" : "e.g. 2.5";
});

$("calcScrapBtn").addEventListener("click", () => {
  const err = $("scrapError");
  err.classList.add("hidden");
  const chem = $("chem").value, cond = $("cond").value, vehicle = $("vehicle").value;
  const val = parseFloat($("measureVal").value);

  if (!val || val <= 0) {
    err.textContent = "Please enter a valid weight or capacity.";
    err.classList.remove("hidden");
    $("scrapResult").classList.add("hidden");
    return;
  }

  const byKg = $("measureType").value === "kg";
  const kg = byKg ? val : val * KG_PER_KWH[chem];
  const total = scrapValue(chem, cond, kg);

  $("scrapAmount").textContent = inr(total);
  $("scrapDetail").textContent =
    `${CHEM_NAME[chem]} · ${COND_NAME[cond]} · ~${kg.toFixed(1)} kg @ ${inr(RATES[chem] * CONDITION[cond])}/kg`;

  const msg = `Hi EV Battery Hub India, I want to sell my old battery.\nChemistry: ${CHEM_NAME[chem]}\nVehicle: ${$("vehicle").selectedOptions[0].text}\nWeight: ~${kg.toFixed(1)} kg\nCondition: ${COND_NAME[cond]}\nEstimated value: ${inr(total)}`;
  $("waScrapBtn").href = waLink(msg);
  $("scrapResult").classList.remove("hidden");
});

/* ============================================================
   TAB 2 — EXCHANGE ESTIMATOR
   ============================================================ */
$("newBattery").innerHTML = NEW_BATTERIES.map(b => `<option value="${b.id}">${b.name} — ${inr(b.mrp)}</option>`).join("");
$("city").innerHTML = '<option value="">Select city</option>' + CITIES.map(c => `<option>${c}</option>`).join("");

$("oldUnit").addEventListener("change", e => {
  const ah = e.target.value === "ah";
  $("voltBox").classList.toggle("hidden", !ah);
  $("oldCap").placeholder = ah ? "e.g. 50" : "e.g. 2.5";
});

$("calcExBtn").addEventListener("click", () => {
  const err = $("exError");
  err.classList.add("hidden");

  const chem = $("oldChem").value, cond = $("oldCond").value;
  let cap = parseFloat($("oldCap").value);
  const city = $("city").value;

  if (!cap || cap <= 0) { err.textContent = "Please enter your old battery capacity."; err.classList.remove("hidden"); return; }
  if (!city) { err.textContent = "Please select your city."; err.classList.remove("hidden"); return; }

  let kwh = cap;
  if ($("oldUnit").value === "ah") {
    const v = parseFloat($("oldVolt").value);
    if (!v || v <= 0) { err.textContent = "Please enter battery voltage."; err.classList.remove("hidden"); return; }
    kwh = (cap * v) / 1000;
  }

  const kg = kwh * KG_PER_KWH[chem];
  const scrap = scrapValue(chem, cond, kg);
  const nb = NEW_BATTERIES.find(b => b.id === $("newBattery").value);
  const discount = Math.min(scrap, nb.mrp); // discount can never exceed MRP
  const net = nb.mrp - discount;

  $("exMrp").textContent = inr(nb.mrp);
  $("exDisc").textContent = "- " + inr(discount);
  $("exNet").textContent = inr(net);
  $("exSummary").textContent = `Old ${CHEM_NAME[chem]} battery (~${kwh.toFixed(2)} kWh, ~${kg.toFixed(1)} kg, ${COND_NAME[cond]}) in ${city}.`;

  const msg = `Hi EV Battery Hub India, I want to book a battery exchange.\nNew battery: ${nb.name}\nCity: ${city}\nOld battery: ${CHEM_NAME[chem]} ~${kwh.toFixed(2)} kWh (${COND_NAME[cond]})\nNew Battery Cost: ${inr(nb.mrp)}\nOld Scrap Discount: ${inr(discount)}\nPay Only: ${inr(net)}`;
  $("exBookBtn").href = waLink(msg);
  $("exResult").classList.remove("hidden");
});

/* ============================================================
   FEATURE CARDS
   ============================================================ */
// Card 1: live rates
$("rateDate").textContent = "Updated: " + new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
$("rateList").innerHTML = [
  ["LFP", "bg-cyan-50"], ["NMC", "bg-emerald-50"], ["LEAD", "bg-slate-50"]
].map(([k, bg]) => `
  <div class="flex justify-between items-center ${bg} rounded-lg px-3 py-2">
    <span class="font-medium">${CHEM_NAME[k]}</span>
    <b class="text-emerald9">${inr(RATES[k])}/kg</b>
  </div>`).join("");

// Card 2: directory filter
const stateSel = $("dirState"), citySel = $("dirCity"), list = $("dirList");
stateSel.innerHTML = '<option value="">All States</option>' + Object.keys(DIRECTORY).map(s => `<option>${s}</option>`).join("");
function renderDirectory() {
  const s = stateSel.value, c = citySel.value;
  const rows = [];
  Object.entries(DIRECTORY).forEach(([st, cities]) => {
    if (s && st !== s) return;
    Object.entries(cities).forEach(([ct, names]) => {
      if (c && ct !== c) return;
      names.forEach(n => rows.push(`<li class="bg-emerald-50 rounded-lg px-3 py-2"><b>${n}</b><br><span class="text-xs text-slate-500">${ct}, ${st}</span></li>`));
    });
  });
  list.innerHTML = rows.join("") || '<li class="text-slate-400">No results found.</li>';
}
stateSel.addEventListener("change", () => {
  const cities = stateSel.value ? Object.keys(DIRECTORY[stateSel.value]) : [];
  citySel.innerHTML = '<option value="">All Cities</option>' + cities.map(c => `<option>${c}</option>`).join("");
  renderDirectory();
});
citySel.addEventListener("change", renderDirectory);
citySel.innerHTML = '<option value="">All Cities</option>';
renderDirectory();

/* ============================================================
   LEAD FORM
   ============================================================ */
$("leadForm").addEventListener("submit", async e => {
  e.preventDefault();
  const err = $("formError"), ok = $("formSuccess");
  err.classList.add("hidden"); ok.classList.add("hidden");

  const data = {
    name: $("lName").value.trim(),
    phone: $("lPhone").value.trim(),
    city: $("lCity").value.trim(),
    quantity: $("lQty").value.trim(),
    category: $("lCat").value
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
  e.target.reset();
});
</script>
</body>
</html>
