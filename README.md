# Fiber Manager (FTTH Autopsia & Telecom Operations)

Πλήρης, αυτόνομη web εφαρμογή πεδίου και back-office για τη διαχείριση αυτοψιών οπτικών ινών FTTH (Fiber To The Home).

---

## 🚀 Δυνατότητες (Features)

1. **Διαχείριση Αυτοψιών Πεδίου (Field Autopsies)**
   - Καταγραφή στοιχείων πολυκατοικίας (SR, διεύθυνση, εργολάβος, διαχειριστής, τηλέφωνα).
   - Real-time κατάσταση: *Εκκρεμεί, Ολοκληρώθηκε, Ακυρώθηκε, Τελευταίο Drop, Έτοιμο για Ενεργοποίηση*.

2. **Αυτοματοποιημένος Υπολογισμός Εξοπλισμού FTTH**
   - Αυτόματος υπολογισμός Floor Boxes, BEP & BMO βάσει ορόφων και διαμερισμάτων.
   - Αυτόματη σύνταξη Τεχνικής Περιγραφής και κατανομής ινών.

3. **Ψηφιακές Υπογραφές & Σκαριφήματα**
   - Canvas ψηφιακής υπογραφής μηχανικού / τεχνικού πεδίου και διαχειριστή.
   - Εργαλείο επεξεργασίας / σημείωσης φωτογραφιών (Image Editor & Canvas Annotation).

4. **Αποθήκευση Cloudflare R2**
   - Άμεση συμπίεση εικόνων client-side πριν το upload.
   - Αποθήκευση υψηλής ταχύτητας στο Cloudflare R2 (`sgk-ftth-autopsia`).
   - Proxy cache control για άμεση φόρτωση φωτογραφιών.

5. **Παραγωγή & Εξαγωγή Εγγράφων OTE**
   - Έντυπο Υπεύθυνης Δήλωσης Διαχειριστή (`aut_decl`).
   - Έντυπο 1 (`aut_form1`).
   - Έκθεση Επιθεώρησης (`aut_report`).
   - Τεχνική Περιγραφή (`aut_tech`).
   - Interactive Excel Spreadsheet Viewer (`EPIMETRITIKO_B_FASH_TEMPLATE.xlsx`).
   - Αυτόματη παραγωγή συμπιεσμένου φακέλου (ZIP / PDF) για αποστολή στον εργολάβο.

---

## 🛠️ Τεχνολογίες

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **State & Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest)
- **Database**: [Supabase](https://supabase.com/)
- **Object Storage**: [Cloudflare R2](https://www.cloudflare.com/products/r2/) via AWS S3 SDK
- **Spreadsheets**: [SheetJS (xlsx)](https://sheetjs.com/)

---

## ⚙️ Εγκατάσταση & Εκτέλεση (Quick Start)

### 1. Κλωνοποίηση & Εγκατάσταση Dependencies

```bash
git clone https://github.com/sgk-gr/fiber-manager.git
cd fiber-manager
npm install
```

### 2. Ρύθμιση Μεταβλητών Περιβάλλοντος

Αντιγράψτε το αρχείο `.env.example` σε `.env.local`:

```bash
cp .env.example .env.local
```

Συμπληρώστε τα credentials για Supabase και Cloudflare R2.

### 3. Εκτέλεση σε περιβάλλον ανάπτυξης (Development)

```bash
npm run dev
```

Ανοίξτε το [http://localhost:3000](http://localhost:3000) στον browser σας.

### 4. Build για Παραγωγή (Production)

```bash
npm run build
npm run start
```

---

## 📂 Δομή Έργου (Project Structure)

```
fiber-manager/
├── public/                     # Στατικά αρχεία, λογότυπα (OTE) και templates εγγράφων
│   ├── templates/              # Επίσημα templates (ΥΔ, Έντυπο 1, Επιμετρητικό)
│   ├── OTELOGO.jpg
│   └── engineer_sig.jpg
├── src/
│   ├── app/
│   │   ├── api/autopsia/       # API endpoints (upload, media proxy, sign, cancel mail)
│   │   ├── ftth-autopsia/      # Route alias
│   │   ├── globals.css         # High-contrast theme & FTTH CSS variables
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Κεντρική σελίδα FTTH Autopsia
│   ├── components/
│   │   ├── autopsia/           # AutopsiaView, Modals, Signatures, ImageEditor, ExcelViewer
│   │   └── ui/                 # Reusable Shadcn UI primitives
│   └── lib/
│       ├── autopsia/           # Supabase client, R2 helpers, utility functions
│       ├── supabase.ts         # Supabase connection & fallback configuration
│       └── utils.ts            # Tailwind classnames merge helper
└── package.json
```

---

## 📄 Άδεια Χρήσης

Copyright © 2026 SGK Digital. Με επιφύλαξη παντός δικαιώματος.
