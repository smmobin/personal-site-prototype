# ساختار پروژه

```
personal-site-prototype/
├── AGENTS.md                 # ورود هر ایجنت: نقش‌ها و اسناد الزامی
├── README.md
├── index.html                # تنها صفحه؛ نشانه‌گذاری و data-* hooks
├── package.json
├── vite.config.ts            # dev/preview روی پورت 3000 + Vitest
├── playwright.config.ts
├── tsconfig.json
├── public/                   # favicon و og
├── docs/
│   ├── SPEC.md               # اسپک محصول
│   ├── PRODUCT.md            # قرارداد PM / Implementer / Git
│   ├── STRUCTURE.md          # همین فایل
│   ├── TESTING.md
│   └── prompts/
│       ├── PRODUCT_MANAGER.md
│       └── IMPLEMENTER.template.md
├── .cursor/rules/            # قوانین همیشگی Cursor
├── src/
│   ├── main.ts               # bootstrap
│   ├── render.ts             # رندر دیکشنری روی DOM
│   ├── nav.ts                # منو، فوکوس‌ترپ، scroll spy
│   ├── work.ts               # فیلتر و جزئیات کارها
│   ├── form.ts               # فرم تماس پروتوتایپ
│   ├── lib/
│   │   ├── contactValidation.ts
│   │   └── workFilter.ts
│   ├── i18n/
│   │   ├── types.ts
│   │   ├── en.ts
│   │   ├── fa.ts
│   │   └── index.ts          # زبان + localStorage کلید persona-lang
│   └── styles/
│       ├── tokens.css
│       ├── base.css
│       └── components.css
└── tests/
    ├── unit/                 # Vitest
    └── e2e/                  # Playwright
```

## جریان داده

1. `main.ts` زبان را می‌خواند، `renderAll` را می‌زند، ناو/کار/فرم را bind می‌کند.
2. همهٔ متن قابل‌مشاهده از `src/i18n/en.ts` و `src/i18n/fa.ts` می‌آید.
3. سوییچ زبان `setLang` + `paint` + رویداد `localechange` است.
4. منطق خالص (ولیدیشن فرم، فیلتر کار) در `src/lib` است تا بدون DOM تست شود.
5. `index.html` اسکلت است؛ گرید کار، تایم‌لاین، مهارت و ناو با JS پر می‌شود.

## قرارداد DOM

- `[data-i18n="path"]` متن دیکشنری
- `[data-lang="fa|en"]` سوییچ زبان
- `[data-filter]` فیلتر کار
- `[data-work-id]` کارت پروژه
- `[data-contact-form]` فرم تماس

## خارج از این درخت

`node_modules/`، `dist/` و گزارش Playwright commit نمی‌شوند.
