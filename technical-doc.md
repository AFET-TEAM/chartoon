# Chartoon Landing Page - Teknik Dokümantasyon

## İçindekiler

1. [Proje Genel Bakış](#proje-genel-bakış)
2. [Teknoloji Stack](#teknoloji-stack)
3. [Mimari ve Tasarım Desenleri](#mimari-ve-tasarım-desenleri)
4. [Proje Yapısı](#proje-yapısı)
5. [Bileşen Mimarisi](#bileşen-mimarisi)
6. [Veri Akışı ve State Yönetimi](#veri-akışı-ve-state-yönetimi)
7. [Stil ve Tema Sistemi](#stil-ve-tema-sistemi)
8. [Uluslararasılaştırma (i18n)](#uluslararasılaştırma-i18n)
9. [Geliştirme Ortamı](#geliştirme-ortamı)
10. [Build ve Deployment](#build-ve-deployment)
11. [Kod Standartları ve Best Practices](#kod-standartları-ve-best-practices)
12. [Performans Optimizasyonları](#performans-optimizasyonları)
13. [Güvenlik Konuları](#güvenlik-konuları)
14. [Test Stratejisi](#test-stratejisi)
15. [Gelecek Geliştirmeler](#gelecek-geliştirmeler)

---

## Proje Genel Bakış

### Amaç
Chartoon Landing Page, Chartoon JavaScript grafik kütüphanesinin tanıtım ve dokümantasyon sitesidir. Kullanıcılara kütüphanenin özelliklerini, örnek grafikleri ve kullanım örneklerini sunar.

### Hedef Kitlesi
- Frontend geliştiriciler
- Veri görselleştirme ile ilgilenen yazılımcılar
- D3.js ve grafik kütüphaneleri arayan geliştiriciler

### Ana Özellikler
- **Multi-dil desteği**: Türkçe ve İngilizce
- **Tema desteği**: Light/Dark mode
- **Responsive tasarım**: Mobil, tablet ve desktop uyumlu
- **Interaktif örnekler**: Bar, Line, Area, Pie, World, Bullet, Radar grafik tipleri
- **Kod snippet'leri**: React, Vue, Svelte ve Vanilla JS örnekleri
- **Static export**: CDN'e deploy edilebilir statik HTML/CSS/JS

---

## Teknoloji Stack

### Core Framework
- **Next.js 15.5.9**: React tabanlı full-stack framework
  - App Router (React Server Components)
  - Turbopack build tool (--turbopack flag ile)
  - Static export mode (`output: "export"`)
  - Image optimization disabled (static export için)

### UI Kütüphaneleri
- **React 19.1.0**: UI kütüphanesi (Son kararlı sürüm)
- **React DOM 19.1.0**: DOM rendering
- **Chartoon 0.2.1**: D3.js tabanlı grafik kütüphanesi

### Styling
- **Tailwind CSS 4.x**: Utility-first CSS framework
- **PostCSS**: CSS işleme
- **CSS Variables**: Tema ve renk sistemi için
- **Geist Fonts**: Vercel'in modern font ailesi
  - Geist Sans: Genel metin
  - Geist Mono: Kod blokları

### Development Tools
- **TypeScript 5.x**: Type safety
- **ESLint 9.x**: Code linting
  - `next/core-web-vitals` config
  - `next/typescript` config
- **npm**: Package manager

### Build ve Deploy
- **Turbopack**: Next.js'in yeni nesil bundler'ı (Webpack'ten 10x hızlı)
- **Static Export**: Statik HTML/CSS/JS dosyaları (`/out` klasörü)

---

## Mimari ve Tasarım Desenleri

### SOLID Prensipleri

#### Single Responsibility Principle (SRP)
Her modül ve bileşen tek bir sorumluluğa sahiptir:
- `constants.ts`: Sadece sabitler ve tipler
- `snippets.ts`: Sadece kod örnekleri
- `ChartPlaceholder.tsx`: Sadece grafik placeholder'ı render eder
- `LocaleProvider.tsx`: Sadece i18n context'i sağlar

#### Open/Closed Principle (OCP)
Bileşenler genişletmeye açık, değişikliğe kapalıdır:
- Yeni grafik tipi eklemek için mevcut kod değişmez
- `CHART_TYPES` array'ine ekleme yapılır
- `snippets.ts` dosyasına yeni snippet eklenir

#### Liskov Substitution Principle (LSP)
Bileşenler tutarlı arayüzlere sahiptir:
- Tüm chart page'leri aynı yapıyı kullanır
- Common component'ler predictable props alır

#### Interface Segregation Principle (ISP)
Component props minimal ve özeldir:
```typescript
// ChartPlaceholder sadece ihtiyacı olanları alır
interface ChartPlaceholderProps {
  chartId: string;
  title: string;
  height?: string;
}
```

#### Dependency Inversion Principle (DIP)
Component'ler abstraction'lara bağımlıdır:
- `useTranslation()` hook'u direkt LocalStorage'a değil, context'e bağlıdır
- Component'ler props interface'lerine bağımlıdır

### Clean Code Prensipleri

1. **DRY (Don't Repeat Yourself)**
   - 240+ satır duplicate snippet code → 140 satır centralized
   - Chart placeholder logic → tek reusable component

2. **KISS (Keep It Simple, Stupid)**
   - Her component tek bir şey yapar
   - Kompleks logic alt component'lere dağıtılır

3. **Separation of Concerns**
   - `lib/`: Logic ve data
   - `components/`: UI
   - `app/`: Routing ve orchestration
   - `i18n/`: Internationalization

4. **Composition Over Inheritance**
   - Component composition kullanılır
   - React functional component'ler
   - Class-based inheritance yok

### Design Patterns

#### Provider Pattern
```typescript
// Context API ile global state yönetimi
<LocaleProvider>
  <App />
</LocaleProvider>
```

#### Container/Presentational Pattern
- `app/**/page.tsx`: Container (state, logic)
- `components/**/*.tsx`: Presentational (UI)

#### Higher-Order Component Pattern
- `useTranslation()` hook kullanımı
- Custom hook pattern

---

## Proje Yapısı

### Dizin Organizasyonu

```
chartoon-landing-page/
│
├── src/                              # Kaynak kod
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (Header, Footer)
│   │   ├── page.tsx                  # Ana sayfa (/)
│   │   ├── globals.css               # Global stiller ve CSS variables
│   │   └── get-started/              # Get Started sayfası (/get-started)
│   │       └── page.tsx
│   │
│   ├── components/                   # React bileşenleri
│   │   ├── common/                   # Reusable component'ler
│   │   │   ├── ChartPlaceholder.tsx  # Grafik placeholder
│   │   │   ├── LanguageDropdown.tsx  # Dil seçici
│   │   │   └── NavLink.tsx           # Navigation link
│   │   │
│   │   ├── get-started/              # Get-started özel component'ler
│   │   │   ├── ChartDetailView.tsx   # Grafik detay görünümü
│   │   │   ├── GetStartedIntro.tsx   # Kurulum rehberi
│   │   │   └── SideNavigation.tsx    # Yan navigasyon
│   │   │
│   │   ├── CodeBlock.tsx             # Kod bloğu (copy button ile)
│   │   ├── CodeTabs.tsx              # Tabbed kod görünümü
│   │   ├── Features.tsx              # Özellikler grid
│   │   ├── Footer.tsx                # Footer component
│   │   ├── Header.tsx                # Header component
│   │   ├── Hero.tsx                  # Hero section
│   │   ├── Showcase.tsx              # Grafik showcase
│   │   └── ThemeSwitch.tsx           # Tema değiştirici
│   │
│   ├── i18n/                         # Internationalization
│   │   └── LocaleProvider.tsx        # i18n context ve hooks
│   │
│   ├── lib/                          # Utility ve data
│   │   ├── constants.ts              # Sabitler ve tipler
│   │   ├── snippets.ts               # Kod örnekleri
│   │   └── version.ts                # Versiyon bilgisi
│   │
│   ├── assets/                       # Statik asset'ler
│   │   └── images/
│   │       └── logo.png
│   │
│   └── styles.d.ts                   # CSS module type definitions
│
├── locales/                          # i18n çeviri dosyaları
│   ├── en.json                       # İngilizce
│   └── tr.json                       # Türkçe
│
├── public/                           # Statik dosyalar (serve edilir)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── Configuration Files
│   ├── package.json                  # Dependencies ve scripts
│   ├── tsconfig.json                 # TypeScript config
│   ├── next.config.ts                # Next.js config
│   ├── postcss.config.mjs            # PostCSS config (Tailwind)
│   ├── eslint.config.mjs             # ESLint config
│   ├── .gitignore                    # Git ignore rules
│   └── package-lock.json             # Lock file
│
└── Documentation
    ├── README.md                     # Proje README
    ├── REFACTORING.md                # Refactoring detayları
    ├── PROJECT_STRUCTURE.md          # Proje yapısı dokümantasyonu
    ├── CHECKLIST.md                  # Refactoring checklist
    └── technical-doc.md              # Bu dokümantasyon
```

### Dosya İstatistikleri

| Kategori | Dosya Sayısı | Satır Sayısı (yaklaşık) |
|----------|--------------|-------------------------|
| Pages (`app/`) | 2 | ~100 |
| Components | 14 | ~500 |
| Library | 3 | ~200 |
| i18n | 1 | ~55 |
| Config | 6 | ~100 |
| Locales | 2 | ~120 |
| **Toplam** | **28** | **~1,215** |

---

## Bileşen Mimarisi

### Component Hiyerarşisi

```
RootLayout (layout.tsx)
├── LocaleProvider (i18n context)
│   ├── Header
│   │   ├── LanguageDropdown
│   │   ├── ThemeSwitch
│   │   └── NavLink (×2)
│   │
│   ├── Children (page content)
│   │   │
│   │   ├── Home Page (page.tsx)
│   │   │   ├── Hero
│   │   │   └── Features
│   │   │
│   │   └── Get Started Page (get-started/page.tsx)
│   │       ├── SideNavigation
│   │       └── (Dynamic content)
│   │           ├── GetStartedIntro
│   │           └── ChartDetailView
│   │               ├── ChartPlaceholder
│   │               └── CodeTabs
│   │                   └── CodeBlock (×n)
│   │
│   └── Footer
```

### Core Components

#### 1. Layout Components

**`app/layout.tsx`**
- Root layout component
- Font yükleme (Geist Sans, Geist Mono)
- LocaleProvider wrap
- Header ve Footer'ı içerir

**`Header.tsx`** (30 satır)
- Site başlığı ve versiyonu
- Navigasyon linkleri
- Dil seçici
- Tema değiştirici

**`Footer.tsx`**
- Copyright bilgisi
- External linkler (Docs, GitHub, License)

#### 2. Page Components

**`app/page.tsx`** (Ana Sayfa)
```typescript
export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
    </div>
  );
}
```

**`app/get-started/page.tsx`** (Get Started)
- State management (selected chart)
- URL parameter parsing
- Dinamik content rendering
- Multi-section navigation

#### 3. Feature Components

**`Hero.tsx`**
- Ana başlık ve tanıtım metni
- CTA butonları
- Logo image
- Responsive layout

**`Features.tsx`**
- i18n messages'dan feature'ları çeker
- Grid layout (2 column on desktop, 1 on mobile)
- Card komponenti dinamik render

#### 4. Chart Components

**`ChartPlaceholder.tsx`**
```typescript
interface ChartPlaceholderProps {
  chartId: string;
  title: string;
  height?: string;
}
```
- Grafik container
- Data attribute injection
- Dinamik height
- Accessibility labels

**`ChartDetailView.tsx`**
- Chart placeholder + Code tabs kombinasyonu
- Props: chartId, chartTitle, snippets
- Composition pattern kullanımı

#### 5. UI Components

**`CodeBlock.tsx`**
- Syntax highlighted kod bloğu
- Copy to clipboard fonksiyonu
- Language indicator
- CSS variable'lar ile theming

**`CodeTabs.tsx`**
- Tabbed interface (React, Vue, Svelte, Vanilla JS)
- Active tab state management
- CodeBlock composition

**`ThemeSwitch.tsx`**
- LocalStorage persistence
- System preference detection
- Data attribute toggle (`data-theme`)
- Icon swap (sun/moon)

**`LanguageDropdown.tsx`**
- Flag icons
- Locale context integration
- Dropdown UI

#### 6. Navigation Components

**`NavLink.tsx`**
- Consistent link styling
- Active state handling
- External/internal link support

**`SideNavigation.tsx`**
- Vertical navigation list
- Selected state
- Click handler callbacks
- Responsive (collapse on mobile)

### Component Communication

#### Props Drilling
```typescript
// Get Started Page → ChartDetailView
<ChartDetailView 
  chartId={selected} 
  chartTitle={chartTitle} 
  snippets={snippets} 
/>

// ChartDetailView → ChartPlaceholder
<ChartPlaceholder 
  chartId={chartId} 
  title={chartTitle} 
/>
```

#### Context API
```typescript
// LocaleProvider → useTranslation hook
const { t, locale, setLocale } = useTranslation();

// Kullanım
<h1>{t("hero.title")}</h1>
```

### Component Reusability

**Common Components** (`components/common/`)
- Hiçbir business logic yok
- Saf presentational
- Her yerde kullanılabilir

**Feature Components** (`components/get-started/`)
- Get-started sayfasına özel
- Business logic içerebilir
- i18n hook kullanabilir

---

## Veri Akışı ve State Yönetimi

### State Management Stratejisi

#### 1. Global State (Context API)
**LocaleProvider**
```typescript
interface I18nContextValue {
  locale: Locale;              // "en" | "tr"
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  messages: Messages;
}
```

**Kullanım Alanları:**
- Dil seçimi (tüm sayfalarda erişilir)
- Çeviri fonksiyonu
- Message dictionary

#### 2. Local State (useState)
**Theme State** (`ThemeSwitch.tsx`)
```typescript
const [theme, setTheme] = useState<string | null>(null);
```

**Selected Chart** (`get-started/page.tsx`)
```typescript
const [selected, setSelected] = useState<ChartId>("get-started");
```

**Copy State** (`CodeBlock.tsx`)
```typescript
const [copied, setCopied] = useState(false);
```

#### 3. URL State
```typescript
// URL'den chart parametresi okuma
const params = new URLSearchParams(window.location.search);
const chart = params.get("chart");
```

### Data Flow Diyagramı

```
Constants (lib/constants.ts)
    ↓
Snippets (lib/snippets.ts)
    ↓
getChartSnippets() function
    ↓
Page Component (state)
    ↓
Props → Child Component
    ↓
Rendered UI
```

### State Persistence

#### LocalStorage
```typescript
// Theme persistence
localStorage.setItem("theme", next);
const stored = localStorage.getItem("theme");

// İlk load'da restore
useEffect(() => {
  const stored = localStorage.getItem("theme");
  if (stored) setTheme(stored);
}, []);
```

#### URL Parameters
```typescript
// Chart selection persistence
// /get-started?chart=bar
const chart = params.get("chart");
```

---

## Stil ve Tema Sistemi

### Styling Yaklaşımı

#### Tailwind CSS Utility Classes
```typescript
<div className="flex items-center justify-between py-4 px-6">
  <h1 className="text-4xl font-extrabold leading-tight">
    {title}
  </h1>
</div>
```

#### CSS Variables (Theming)
**globals.css**
```css
:root {
  --background: #ffffff;
  --foreground: rgba(0,0,0,0.87);
  --primary: #1976d2;
  --code-bg: #f3f4f6;
  --code-text: #111827;
  /* ... */
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
    /* ... */
  }
}
```

#### Inline Styles (Dynamic Theming)
```typescript
<div style={{ 
  background: "var(--code-bg)", 
  color: "var(--code-text)" 
}}>
  {/* content */}
</div>
```

### Tema Sistemi Detayları

#### Theme Toggle Mekanizması
1. **Initial Load**
   - LocalStorage'dan tema oku
   - Yoksa system preference kontrol et
   - Default: light veya dark (system'e göre)

2. **Theme Change**
   - State güncelle
   - `data-theme` attribute set et
   - LocalStorage'a kaydet

3. **CSS Application**
   ```css
   [data-theme="dark"] {
     --background: #0a0a0a;
     --foreground: #ededed;
   }
   ```

#### Renk Paleti

**Light Mode:**
- Background: `#ffffff`
- Foreground: `rgba(0,0,0,0.87)`
- Primary: `#1976d2` (Material Blue 700)
- Muted: `rgba(0,0,0,0.6)`

**Dark Mode:**
- Background: `#0a0a0a`
- Foreground: `#ededed`
- Primary: (inherit)
- Shadow: Darker and stronger

#### Responsive Design

**Breakpoints** (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Kullanım Örneği:**
```typescript
<div className="flex flex-col md:flex-row gap-6">
  {/* Mobile: column, Desktop: row */}
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {/* Mobile: 1 column, Tablet+: 2 columns */}
</div>
```

### Typography

**Font Families:**
- **Sans-serif**: Geist (Vercel font)
  - Variable: `--font-geist-sans`
  - Usage: Genel metin
  
- **Monospace**: Geist Mono
  - Variable: `--font-geist-mono`
  - Usage: Kod blokları

**Font Sizes:**
```typescript
text-xs    // 0.75rem (12px)
text-sm    // 0.875rem (14px)
text-base  // 1rem (16px)
text-lg    // 1.125rem (18px)
text-xl    // 1.25rem (20px)
text-2xl   // 1.5rem (24px)
text-4xl   // 2.25rem (36px)
text-5xl   // 3rem (48px)
```

---

## Uluslararasılaştırma (i18n)

### i18n Mimarisi

#### Dil Desteği
- **Türkçe (tr)**: Default dil
- **İngilizce (en)**: Alternatif dil

#### Çeviri Dosyaları
**`locales/en.json`** ve **`locales/tr.json`**
```json
{
  "header": {
    "title": "Chartoon",
    "nav": {
      "showcase": "Showcase",
      "features": "Features"
    }
  },
  "hero": {
    "title": "Chartoon — Lightweight charts",
    "desc": "A vanilla JavaScript charting library..."
  }
}
```

### LocaleProvider İmplementasyonu

**Context Yapısı:**
```typescript
interface I18nContextValue {
  locale: Locale;                    // Aktif dil
  setLocale: (l: Locale) => void;    // Dil değiştir
  t: (key: string, vars?: ...) => string;  // Çeviri fonksiyonu
  messages: Messages;                // Tüm mesajlar
}
```

**Translation Fonksiyonu:**
```typescript
function t(key: string, vars?: Record<string, string | number>) {
  // Nested key support: "hero.title"
  const parts = key.split(".");
  let res = messages;
  for (const p of parts) {
    res = res?.[p];
    if (res == null) return key;
  }
  
  // Variable interpolation: "{year}"
  if (vars) {
    Object.keys(vars).forEach((k) => {
      res = res.replace(`{${k}}`, String(vars[k]));
    });
  }
  
  return res;
}
```

### Kullanım Örnekleri

**Basit Çeviri:**
```typescript
const { t } = useTranslation();
<h1>{t("hero.title")}</h1>
```

**Değişkenli Çeviri:**
```typescript
// JSON: "© {year} Chartoon"
<p>{t("footer.copyright", { year: 2024 })}</p>
```

**Message Object Erişimi:**
```typescript
const { messages } = useTranslation();
const features = messages.features?.items ?? [];

features.map(f => (
  <div key={f.title}>
    <h3>{f.title}</h3>
    <p>{f.desc}</p>
  </div>
))
```

### Dil Değiştirme

**LanguageDropdown:**
```typescript
<button onClick={() => setLocale("en")}>
  <Image src={flagEN} alt="English" />
</button>
<button onClick={() => setLocale("tr")}>
  <Image src={flagTR} alt="Türkçe" />
</button>
```

**React Re-render:**
- `setLocale` çağrıldığında context güncellenir
- Tüm consumer component'ler otomatik re-render olur
- Yeni dilde içerik gösterilir

---

## Geliştirme Ortamı

### Gereksinimler

**Node.js:**
- Versiyon: 20.x veya üzeri (recommended)
- npm: 10.x veya üzeri

**Sistem:**
- OS: Windows, macOS, Linux
- RAM: Minimum 4GB (8GB+ önerilen)
- Disk: ~500MB (node_modules dahil)

### Kurulum

```bash
# Repository clone
git clone https://github.com/AFET-TEAM/chartoon.git
cd chartoon

# Dependencies yükleme
npm install

# Development server başlatma
npm run dev

# Tarayıcıda aç: http://localhost:3000
```

### NPM Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",        // Dev server (hot reload)
    "build": "next build --turbopack",    // Production build
    "start": "next start",                // Production server
    "lint": "eslint"                      // Code linting
  }
}
```

### Geliştirme Komutları

**Development Server:**
```bash
npm run dev
# Turbopack ile hızlı hot reload
# Port: 3000
# URL: http://localhost:3000
```

**Type Checking:**
```bash
npx tsc --noEmit
# TypeScript hata kontrolü (build olmadan)
```

**Linting:**
```bash
npm run lint
# ESLint code quality check
```

**Production Build:**
```bash
npm run build
# Static export → /out klasörü
# 1. Compile TypeScript
# 2. Bundle JavaScript
# 3. Optimize CSS
# 4. Generate static HTML
```

### Hot Reload ve Fast Refresh

**Turbopack Benefits:**
- İlk compile: ~2-3 saniye
- Hot Module Replacement (HMR): <50ms
- Incremental compilation
- Parallel processing

**File Watcher:**
- Dosya değişikliği algılanır
- Sadece değişen modül re-compile edilir
- Tarayıcı otomatik yenilenir
- State korunur (Fast Refresh)

### Environment Variables

**Next.js Conventions:**
```bash
# .env.local (git'e eklenmez)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Kullanım:**
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

---

## Build ve Deployment

### Build Process

#### 1. TypeScript Compilation
```bash
# tsconfig.json settings
{
  "target": "ES2017",
  "strict": true,
  "jsx": "preserve",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

#### 2. Next.js Build
```bash
npm run build
# Output:
# ✓ Creating an optimized production build
# ✓ Compiled successfully
# ✓ Exporting (3/3)
# ✓ Export complete
```

#### 3. Static Export
**next.config.ts:**
```typescript
const nextConfig: NextConfig = {
  output: "export",           // Static HTML export
  images: {
    unoptimized: true,        // Static export için gerekli
  },
};
```

**Output:** `/out` klasörü
```
out/
├── index.html                # Ana sayfa
├── get-started.html          # Get started
├── _next/
│   ├── static/              # JS chunks
│   ├── css/                 # Compiled CSS
│   └── image/               # Optimized images
└── *.svg                    # Public assets
```

### Deployment Seçenekleri

#### 1. Vercel (Recommended)
```bash
# Vercel CLI ile deploy
npm i -g vercel
vercel

# Veya GitHub integration
# Push to main → auto deploy
```

**Vercel Benefits:**
- Automatic builds
- CDN distribution
- HTTPS enabled
- Custom domains
- Analytics

#### 2. Netlify
```bash
# Build command
npm run build

# Publish directory
out
```

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 3. GitHub Pages
```bash
# Build
npm run build

# Deploy
# out/ klasörünü gh-pages branch'e push et
```

**package.json script:**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d out"
  }
}
```

#### 4. Static Hosting (S3, CloudFlare Pages, etc.)
```bash
# Build
npm run build

# Upload /out folder
aws s3 sync out/ s3://your-bucket --delete
```

### Build Optimizations

**Automatic Optimizations:**
- JavaScript minification
- CSS minification
- Image optimization (disabled for export)
- Code splitting
- Tree shaking
- Dead code elimination

**Manual Optimizations:**
- Dynamic imports
- Lazy loading
- Route-based code splitting

**Bundle Analysis:**
```bash
# Analyze bundle size
npm install -g @next/bundle-analyzer

# next.config.ts
module.exports = {
  ...withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })
}

# Run
ANALYZE=true npm run build
```

### Performance Metrics

**Build Time:**
- Dev first compile: ~2-3 seconds
- Production build: ~10-15 seconds
- Re-build (incremental): <1 second

**Bundle Size:**
- Total JS: ~150KB (gzipped)
- Total CSS: ~20KB (gzipped)
- First Load JS: ~80KB
- Per-page JS: ~10-20KB

---

## Kod Standartları ve Best Practices

### TypeScript Conventions

#### Strict Mode
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,              // Tüm strict checks aktif
    "noEmit": true,              // Sadece type check
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

#### Type Definitions
```typescript
// Explicit types
interface ChartPlaceholderProps {
  chartId: string;
  title: string;
  height?: string;
}

// Type inference tercih edilir
const dimensions = { width: 700, height: 320 };  // ✅ Tip çıkarımı
const dimensions: object = { ... };              // ❌ Generic type

// Const assertions
export const CHART_TYPES = ["bar", "line"] as const;
export type ChartType = (typeof CHART_TYPES)[number];
```

#### Naming Conventions
```typescript
// PascalCase: Components, Types, Interfaces
export default function Header() {}
interface HeaderProps {}
type ChartId = string;

// camelCase: Variables, functions
const chartData = [];
function getChartSnippets() {}

// UPPER_SNAKE_CASE: Constants
const CHART_DIMENSIONS = {};
const NAV_LINKS = {};
```

### React Best Practices

#### Functional Components
```typescript
// ✅ Preferred: Functional + Hooks
export default function MyComponent() {
  const [state, setState] = useState();
  return <div>{...}</div>;
}

// ❌ Avoid: Class components (legacy)
class MyComponent extends React.Component {}
```

#### Hooks Rules
```typescript
// ✅ Top level only
function Component() {
  const [state, setState] = useState();
  useEffect(() => {}, []);
}

// ❌ Conditional hooks
function Component() {
  if (condition) {
    useState();  // HATALI!
  }
}
```

#### Props Destructuring
```typescript
// ✅ Destructure props
export default function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// ❌ Props object
export default function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

#### Key Props in Lists
```typescript
// ✅ Unique, stable keys
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// ❌ Index as key (anti-pattern)
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}
```

### Code Organization

#### Import Order
```typescript
// 1. External libraries
import React from "react";
import Link from "next/link";

// 2. Internal modules
import { useTranslation } from "../i18n/LocaleProvider";
import { CHART_TYPES } from "../lib/constants";

// 3. Components
import Header from "../components/Header";
import Footer from "../components/Footer";

// 4. Styles and assets
import "./globals.css";
import logo from "../assets/logo.png";
```

#### File Structure
```typescript
// 1. Imports
import { ... } from "...";

// 2. Types and Interfaces
interface Props { ... }
type State = { ... };

// 3. Constants (component-local)
const DEFAULT_HEIGHT = "320px";

// 4. Main Component
export default function Component() {
  // 4a. Hooks
  const [state, setState] = useState();
  const { t } = useTranslation();
  
  // 4b. Effects
  useEffect(() => {}, []);
  
  // 4c. Handlers
  function handleClick() {}
  
  // 4d. Render
  return <div>{...}</div>;
}

// 5. Helper functions (below component)
function formatDate(date: Date) {}
```

### ESLint Rules

**Active Rules:**
```javascript
// eslint.config.mjs
export default [
  ...compat.extends(
    "next/core-web-vitals",     // Next.js best practices
    "next/typescript"           // TypeScript rules
  )
];
```

**Key Rules:**
- No unused variables
- No console.log (warnings)
- React hooks rules
- TypeScript strict mode
- No any types (prefer unknown)

### Code Style

#### Formatting
- Indentation: 2 spaces
- Quotes: Double quotes (")
- Semicolons: Optional (ASI kullanılabilir)
- Line length: ~100 characters
- Trailing commas: Çok satırlılarda eklenmeli

#### Comments
```typescript
// ✅ Why, not what
// Fetch data on mount because server data might be stale
useEffect(() => {
  fetchData();
}, []);

// ❌ Obvious comments
// Set state to true
setState(true);
```

#### Component Documentation
```typescript
/**
 * ChartPlaceholder - Renders a placeholder for chart widgets
 * 
 * @param chartId - Unique identifier for the chart
 * @param title - Display title
 * @param height - Optional custom height (default: 320px)
 */
export default function ChartPlaceholder({ ... }: Props) {}
```

---

## Performans Optimizasyonları

### Current Optimizations

#### 1. Code Splitting
```typescript
// Next.js otomatik code splitting
// Her route ayrı chunk
// Dynamic imports desteklenir

// Örnek: Lazy load
const DynamicComponent = dynamic(() => import('./Heavy'));
```

#### 2. Static Export
- Pre-rendered HTML
- Zero runtime overhead (SSR yok)
- CDN'den serve edilebilir
- Fast initial page load

#### 3. CSS Optimization
- Tailwind CSS purging
- Kullanılmayan classlar kaldırılır
- Minification
- Critical CSS inline

#### 4. Font Optimization
```typescript
// next/font optimizasyonu
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",           // FOUT önleme
  preload: true,
});
```

#### 5. Image Optimization
```typescript
// next/image kullanımı
import Image from "next/image";

<Image
  src={logo}
  alt="Logo"
  priority              // LCP için
  width={800}
  height={600}
/>
```

### Bundle Size Optimization

#### Tree Shaking
```typescript
// ✅ Named imports (tree-shakeable)
import { useState } from "react";

// ❌ Namespace import
import * as React from "react";
```

#### Dynamic Imports
```typescript
// Heavy component lazy load
const Chart = dynamic(() => import('./Chart'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
```

#### Code Splitting Strategy
- Route-based: Otomatik (Next.js)
- Component-based: Dynamic imports
- Library-based: Vendor bundles

### Runtime Performance

#### React Optimization
```typescript
// Memoization (gerektiğinde)
const MemoizedComponent = React.memo(ExpensiveComponent);

// useMemo for expensive calculations
const computed = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// useCallback for stable functions
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

#### Virtual Scrolling
```typescript
// Uzun listeler için (şu an gerekli değil)
// react-window veya react-virtualized
```

### Loading Performance

#### Metrics
- **FCP (First Contentful Paint)**: <1.8s
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1
- **TTI (Time to Interactive)**: <3.5s

#### Optimization Strategies
1. **Critical CSS inline**: Above-the-fold styles
2. **Preload fonts**: Font files öncelikli yükleme
3. **Lazy load images**: Viewport dışındaki görseller
4. **Defer non-critical JS**: Analytics vb. geciktirilir
5. **Resource hints**: `<link rel="preconnect">`

### Caching Strategy

#### Browser Caching
```
# Static assets (önerilen headers)
Cache-Control: public, max-age=31536000, immutable  # JS, CSS
Cache-Control: public, max-age=86400                 # HTML
```

#### Service Worker
```typescript
// Gelecekte eklenebilir
// PWA için offline support
// Cache-first strategy
```

---

## Güvenlik Konuları

### Current Security Measures

#### 1. XSS Prevention
**React Otomatik Escape:**
```typescript
// ✅ React otomatik escape eder
<div>{userInput}</div>

// ⚠️ dangerouslySetInnerHTML kullanma
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**Sanitization:**
```typescript
// Eğer HTML render gerekiyorsa
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(htmlContent) 
}} />
```

#### 2. Content Security Policy
**next.config.ts** (önerilen):
```typescript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self' data:;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];
```

#### 3. HTTPS Only
- Production'da HTTPS enforce edilmeli
- Vercel otomatik sağlar
- Mixed content warnings'e dikkat

#### 4. Dependencies Security
```bash
# Audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Check for updates
npm outdated
```

#### 5. Environment Variables
```bash
# ✅ Public variables
NEXT_PUBLIC_API_URL=...

# ✅ Server-side only (not in browser)
DATABASE_URL=...
API_SECRET=...

# ❌ Secrets in NEXT_PUBLIC_
NEXT_PUBLIC_API_KEY=secret123  # YANLIŞ!
```

### Best Practices

#### Input Validation
```typescript
// URL parameter validation
function isValidChartId(id: string): id is ChartId {
  return (FULL_CHART_ID as readonly string[]).includes(id);
}

// Type guard kullanımı
const chart = params.get("chart");
if (chart && isValidChartId(chart)) {
  setSelected(chart);
}
```

#### Safe Navigation
```typescript
// ✅ Optional chaining
const title = messages.hero?.title ?? "Default";

// ✅ Nullish coalescing
const height = props.height ?? "320px";
```

#### Error Boundaries
```typescript
// React Error Boundary (gelecek geliştirme)
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }
  render() {
    return this.props.children;
  }
}
```

### Dependency Security

**Current Dependencies:**
```json
{
  "dependencies": {
    "chartoon": "^0.2.1",         // Chart library
    "next": "^15.5.9",            // Framework
    "react": "19.1.0",            // UI library
    "react-dom": "19.1.0"
  }
}
```

**Security Audit Schedule:**
- Weekly: `npm audit`
- Monthly: `npm outdated` + update check
- Quarterly: Major version updates

---

## Test Stratejisi

### Current State
Proje şu anda test infrastructure içermiyor. Gelecekte eklenebilir.

### Recommended Test Strategy

#### 1. Unit Tests

**Test Framework:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**Test Locations:**
```
__tests__/
├── lib/
│   ├── constants.test.ts
│   └── snippets.test.ts
├── components/
│   ├── common/
│   │   ├── ChartPlaceholder.test.tsx
│   │   └── LanguageDropdown.test.tsx
│   └── CodeBlock.test.tsx
└── i18n/
    └── LocaleProvider.test.tsx
```

**Example Tests:**
```typescript
// lib/constants.test.ts
import { CHART_TYPES, ChartType } from '../src/lib/constants';

describe('Constants', () => {
  test('CHART_TYPES includes bar', () => {
    expect(CHART_TYPES).toContain('bar');
  });
  
  test('ChartType is correct', () => {
    const chart: ChartType = 'line';
    expect(CHART_TYPES).toContain(chart);
  });
});

// components/CodeBlock.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import CodeBlock from '../src/components/CodeBlock';

describe('CodeBlock', () => {
  test('renders code correctly', () => {
    render(<CodeBlock code="console.log('test')" />);
    expect(screen.getByText(/console.log/)).toBeInTheDocument();
  });
  
  test('copy button works', async () => {
    render(<CodeBlock code="test code" />);
    const btn = screen.getByText(/Copy/);
    fireEvent.click(btn);
    expect(screen.getByText(/Copied/)).toBeInTheDocument();
  });
});
```

#### 2. Integration Tests

**Testing Library for React:**
```typescript
// Test component integration
import { render, screen } from '@testing-library/react';
import { LocaleProvider } from '../src/i18n/LocaleProvider';
import Header from '../src/components/Header';

test('Header displays correct language', () => {
  render(
    <LocaleProvider>
      <Header />
    </LocaleProvider>
  );
  expect(screen.getByText(/Chartoon/)).toBeInTheDocument();
});
```

#### 3. E2E Tests

**Playwright:**
```bash
npm install -D @playwright/test
```

**Test Scenarios:**
```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('navigate to get-started page', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('text=Get started');
  await expect(page).toHaveURL('/get-started');
});

test('switch language', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('[aria-label="Language"]');
  await page.click('text=English');
  await expect(page.locator('h1')).toContainText('Lightweight');
});

test('toggle theme', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('[aria-label="Toggle theme"]');
  const theme = await page.getAttribute('html', 'data-theme');
  expect(theme).toBe('dark');
});
```

#### 4. Visual Regression Tests

**Playwright Screenshots:**
```typescript
test('homepage visual', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot('home.png');
});
```

### Test Coverage Goals

| Area | Target Coverage |
|------|-----------------|
| Utils/Lib | 90%+ |
| Components | 80%+ |
| Pages | 60%+ |
| E2E | Critical paths |

### CI/CD Integration

**GitHub Actions:**
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

---

## Gelecek Geliştirmeler

### Short-term (1-3 ay)

#### 1. Test Infrastructure
- [ ] Vitest kurulumu
- [ ] Unit test yazımı (lib, components)
- [ ] E2E test setup (Playwright)
- [ ] CI/CD entegrasyonu

#### 2. Performance
- [ ] React.memo kullanımı (gerektiğinde)
- [ ] Code splitting optimization
- [ ] Image lazy loading
- [ ] Bundle size monitoring

#### 3. Accessibility
- [ ] ARIA labels audit
- [ ] Keyboard navigation testi
- [ ] Screen reader compatibility
- [ ] WCAG 2.1 AA compliance

#### 4. SEO
- [ ] Meta tags optimization
- [ ] Open Graph tags
- [ ] Sitemap.xml generation
- [ ] robots.txt configuration

### Mid-term (3-6 ay)

#### 1. Feature Enhancements
- [ ] Interactive chart previews (live demos)
- [ ] Code playground (CodeSandbox embed)
- [ ] Search functionality
- [ ] Dark mode persistence improvement
- [ ] Blog section (MDX kullanarak)

#### 2. Documentation
- [ ] API reference sayfası
- [ ] Tutorial videos
- [ ] Interactive examples
- [ ] Migration guides

#### 3. Developer Experience
- [ ] Storybook integration
- [ ] Component documentation
- [ ] Design tokens
- [ ] Component library

#### 4. Analytics
- [ ] Google Analytics integration
- [ ] User behavior tracking
- [ ] Performance monitoring (Web Vitals)
- [ ] Error tracking (Sentry)

### Long-term (6-12 ay)

#### 1. Advanced Features
- [ ] User accounts (GitHub OAuth)
- [ ] Save/share chart configurations
- [ ] Community examples gallery
- [ ] Version comparison tool

#### 2. Progressive Web App
- [ ] Service Worker
- [ ] Offline support
- [ ] Install prompt
- [ ] Push notifications

#### 3. Internationalization
- [ ] Daha fazla dil desteği
  - [ ] Almanca
  - [ ] Fransızca
  - [ ] İspanyolca
  - [ ] Japonca
- [ ] RTL layout support (Arapça için)
- [ ] Locale-based date/number formatting

#### 4. Infrastructure
- [ ] GraphQL API (dinamik içerik için)
- [ ] CMS integration (Contentful, Sanity)
- [ ] Multi-region deployment
- [ ] A/B testing framework

### Technical Debt

#### Code Quality
- [ ] Extract more common components
- [ ] Refactor large components (>100 lines)
- [ ] Add more TypeScript strict types
- [ ] Remove any remaining `any` types

#### Documentation
- [ ] Inline JSDoc comments
- [ ] Component prop descriptions
- [ ] Architecture decision records (ADR)
- [ ] API documentation

#### Testing
- [ ] Increase test coverage
- [ ] Add integration tests
- [ ] Visual regression tests
- [ ] Performance tests

### Monitoring ve Maintenance

#### Metrics to Track
- Bundle size (alert if >200KB)
- Build time (alert if >30s)
- Lighthouse score (keep >90)
- Dependency vulnerabilities (audit weekly)

#### Regular Tasks
- **Weekly**: Dependency audit, build check
- **Monthly**: Performance review, bundle analysis
- **Quarterly**: Major dependency updates, refactoring

---

## Sonuç

### Proje Durumu

**Mevcut Durum:**
- ✅ Modern, clean, maintainable codebase
- ✅ SOLID principles uygulanmış
- ✅ TypeScript ile type-safe
- ✅ Responsive ve accessible
- ✅ Multi-dil desteği
- ✅ Light/Dark tema
- ✅ Fast build ve deploy

**Eksikler:**
- ⚠️ Test infrastructure yok
- ⚠️ Analytics entegrasyonu yok
- ⚠️ SEO optimization minimal

### Katkıda Bulunma

**Code Contribution:**
1. Fork repository
2. Create feature branch
3. Follow coding standards
4. Write tests
5. Submit PR

**Documentation:**
- README güncellemeleri
- Code comments
- Tutorial yazıları

### İletişim ve Kaynaklar

**Repository:**
- GitHub: https://github.com/AFET-TEAM/chartoon

**Referanslar:**
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## Dokümantasyon Metadata

- **Versiyon**: 1.0.0
- **Oluşturulma Tarihi**: 15 Ocak 2026
- **Son Güncelleme**: 15 Ocak 2026
- **Dil**: Türkçe
- **Katkıda Bulunanlar**: GitHub Copilot

---

Bu dokümantasyon, Chartoon Landing Page projesinin teknik detaylarını kapsamlı bir şekilde açıklamaktadır. Proje yapısından deployment sürecine, kod standartlarından performans optimizasyonlarına kadar tüm teknik konular detaylı olarak ele alınmıştır.
