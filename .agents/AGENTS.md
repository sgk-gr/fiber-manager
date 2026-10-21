# Fiber Flow — AI Agent & Developer Guidelines

> **Project**: Fiber Flow (`fiber-flow`)  
> **Repository**: [https://github.com/sgk-gr/fiber-manager.git](https://github.com/sgk-gr/fiber-manager.git)  
> **Mission**: Πλήρης πλατφόρμα πεδίου και γραφείου Fiber Flow για αυτοψίες οπτικών ινών FTTH (Fiber To The Home), αυτόματα σκαριφήματα, τεχνικές περιγραφές, αποθήκευση R2 και παραγωγή φακέλων OTE.

---

## 👥 Core Development Team
Το έργο αναπτύσσεται και συντηρείται από κοινού από τους:
1. **Σπύρος (Spyros)** — Lead Developer / Architect (SGK Digital)
2. **Θανάσης (Thanassis)** — Core Full-Stack Developer & Telecom Systems Engineer

> [!IMPORTANT]
> **Οδηγία προς τον AI Assistant (Antigravity):**
> Όταν σου μιλάει είτε ο **Σπύρος** είτε ο **Θανάσης**, αναγνώρισέ τους ως τους δύο κύριους developers του έργου. Και οι δύο έχουν πλήρη διαχειριστικά και αναπτυξιακά δικαιώματα στο codebase. Απάντα πάντα στα ελληνικά (εκτός αν ζητηθεί διαφορετικά), με τεχνική ακρίβεια, άμεσο κώδικα και σεβασμό στη δομή του project.

---

## 🏗️ Τεχνολογικό Stack

| Τομέας | Τεχνολογία | Σημειώσεις |
| :--- | :--- | :--- |
| **Framework** | Next.js 15.1.9 (App Router) | SSR/CSR με TypeScript |
| **Frontend UI** | React 19.2 + Tailwind CSS | Radix UI primitives, Lucide Icons, Sonner toasts |
| **State & Fetching** | TanStack React Query v5 | Client cache & optimistics updates |
| **Database & Auth** | Supabase (`customers`, `customer_comments`) | Project ref: `fgyecckvlbkgclsehcgf` |
| **Object Storage** | Cloudflare R2 via AWS S3 SDK | Bucket: `sgk-ftth-autopsia` |
| **Spreadsheets & Docs**| SheetJS (`xlsx`) | Ανάγνωση & επεξεργασία επιμετρητικών OTE |
| **Email Service** | Resend API + Supabase Edge Functions | Ενημερώσεις ακυρώσεων & reports |

---

## 📁 Αρχιτεκτονική & Βασικά Αρχεία

```
fiber-manager/
├── .agents/
│   └── AGENTS.md                  # Το παρόν αρχείο κανόνων για τον Antigravity
├── public/
│   ├── OTELOGO.jpg                # Επίσημο λογότυπο OTE για τα έντυπα
│   ├── engineer_sig.jpg           # Προεπιλεγμένη υπογραφή μηχανικού (fallback)
│   └── templates/                 # Επίσημα templates OTE
│       ├── aut_decl_template.png  # Υπεύθυνη Δήλωση Διαχειριστή
│       ├── aut_form1_template.jpg # Έντυπο 1
│       ├── aut_report_template.png# Έκθεση Επιθεώρησης
│       ├── aut_tech_template.png  # Τεχνική Περιγραφή
│       └── EPIMETRITIKO_B_FASH_TEMPLATE.xlsx
├── src/
│   ├── app/
│   │   ├── page.tsx               # Κεντρική σελίδα (φορτώνει το AutopsiaView)
│   │   ├── ftth-autopsia/page.tsx # Route alias
│   │   ├── globals.css            # High-contrast light theme (.ftth-theme)
│   │   ├── layout.tsx             # Root layout & Toaster provider
│   │   └── api/autopsia/
│   │       ├── upload/route.ts    # Direct multipart upload στο Cloudflare R2
│   │       ├── media/route.ts     # Cache-controlled media proxy από το R2
│   │       ├── r2-sign-upload/    # Presigned URLs & object deletion
│   │       └── akyrosi-mail/      # Branded email ακύρωσης αυτοψίας
│   ├── components/
│   │   ├── autopsia/
│   │   │   ├── AutopsiaView.tsx           # Το κεντρικό dashboard (~4.000 lines)
│   │   │   ├── NewAutopsiaModal.tsx       # Modal δημιουργίας νέας αυτοψίας
│   │   │   ├── EngineerSignatureModal.tsx # Canvas ψηφιακής υπογραφής μηχανικού
│   │   │   ├── CommentsTimelineDialog.tsx # Χρονολόγιο σχολίων & ιστορικό
│   │   │   ├── ExcelViewer.tsx            # Spreadsheet viewer επιμετρητικού
│   │   │   ├── ImageEditor.tsx            # Σημειώσεις/βελάκια/κείμενο σε φωτογραφίες
│   │   │   ├── SafeImage.tsx              # Resilient image loader με fallback
│   │   │   ├── TechDescriptionModal.tsx   # Αυτόματος υπολογισμός Floor Boxes/BEP/BMO
│   │   │   └── ThemeToggle.tsx            # Επιλογή θέματος εμφάνισης
│   │   └── ui/                            # Reusable Shadcn UI primitives
│   └── lib/
│       ├── autopsia/
│       │   ├── r2.ts                      # Client-side image compression & uploads
│       │   ├── supabase.ts                # Persistent Supabase auth client
│       │   ├── comments.ts                # Logging σχολίων στο customer_comments
│       │   └── utils.ts                   # Helpers (contractor styles, timestamped URLs)
│       ├── supabase.ts                    # Hardcoded fallback credentials & clients
│       └── utils.ts                       # `cn` helper (clsx + twMerge)
└── package.json
```

---

## ⚡ Κανόνες Ανάπτυξης & Telecom Best Practices

1. **Τηλεπικοινωνιακή Ορολογία FTTH**:
   - Χρησιμοποιούμε πάντοτε τους σωστούς τεχνικούς όρους: **Floor Boxes**, **BEP** (Building Entry Point), **BMO** (Building Multi-Operator box), **Σκαρίφημα Όδευσης**, **Drop Cable**, **Επιμετρητικό B' Φάσης**.
   - **ΠΡΟΣΟΧΗ**: Δεν αναφέρουμε ποτέ "τύπο καμπίνας" ή "καμπίνες" για τις πολυκατοικίες (οι καμπίνες είναι υπαίθριες καμπίνες δρόμου, όχι εσωτερικές υποδομές).

2. **Αποθήκευση Εικόνων (Cloudflare R2)**:
   - Πριν από κάθε upload φωτογραφίας από το κινητό, εκτελείται αυτόματη συμπίεση client-side (`compressImageForUpload` στο `src/lib/autopsia/r2.ts`) για να μη στέλνονται 15MB αρχεία μέσω 4G/5G.
   - Όλα τα media σερβίρονται μέσω του proxy `/api/autopsia/media?file=...` με header `Cache-Control: public, max-age=31536000, immutable`.

3. **Υψηλή Αντίθεση για Χρήση στο Πεδίο**:
   - Η κλάση `.ftth-theme` και το scope `.ftth-autopsia-scope` επιβάλλουν high-contrast light backgrounds (`#f8fafc` / `#ffffff`) και σκούρα κείμενα (`#0f172a`), ώστε η οθόνη να διαβάζεται άψογα κάτω από τον ήλιο ή σε σκοτεινά κλιμακοστάσια.

4. **Dependencies & React 19**:
   - Λόγω React 19, στο αρχείο `.npmrc` υπάρχει πάντα `legacy-peer-deps=true`.

---

## 🔄 Git Workflow & Συνεργασία (Σπύρος + Θανάσης)

- **Κύριο Branch**: `main`
- **Πριν ξεκινήσετε νέα εργασία**:
  ```bash
  git pull origin main
  ```
- **Δημιουργία Feature Branch (προαιρετικά)**:
  ```bash
  git checkout -b feature/onoma-leitourgias
  ```
- **Commit & Push**:
  ```bash
  git add .
  git commit -m "feat: σύντομη περιγραφή αλλαγής"
  git push origin main
  ```
