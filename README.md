# personal-site-prototype

سایت شخصی دوزبانه (FA/EN) — پروتوتایپ Vite + TypeScript.

- مسیر محلی: `D:\VibeCoding\Cursor\personal-site-prototype`
- ریپو: https://github.com/smmobin/personal-site-prototype
- پوشهٔ قدیمی `Mobin` را باز نکن؛ همین پوشه منبع رسمی است.

## اجرا

این پروژه Vite است. **فایل `index.html` را مستقیم در مرورگر باز نکن** — اسکریپت‌ها لود نمی‌شوند.

```sh
npm install
npm run dev
```

آدرس: http://127.0.0.1:3000/

```sh
npm run build
npm run preview
```

## تست

اولین بار: `npm run test:e2e:install`

```sh
npm test              # Vitest
npm run test:e2e      # Playwright
npm run verify        # واحد + بیلد + e2e
```

جزئیات: [`docs/TESTING.md`](docs/TESTING.md)

## اسناد محصول

| فایل | محتوا |
| --- | --- |
| [`docs/SPEC.md`](docs/SPEC.md) | اسپک محصول |
| [`docs/STRUCTURE.md`](docs/STRUCTURE.md) | درخت فایل و جریان داده |
| [`docs/PRODUCT.md`](docs/PRODUCT.md) | قرارداد PM / Implementer / Git |
| [`docs/prompts/PRODUCT_MANAGER.md`](docs/prompts/PRODUCT_MANAGER.md) | پرامپت چت مدیر محصول |
| [`AGENTS.md`](AGENTS.md) | ورود هر ایجنت |

## انتشار (GitHub Pages)

آدرس: https://smmobin.github.io/personal-site-prototype/

این پروژه Vite است. **ریشهٔ سورس را به Pages وصل نکن** — فقط `dist` بعد از `npm run build` باید سرو شود و `base` باید `/personal-site-prototype/` باشد. جزئیات در [`docs/SPEC.md`](docs/SPEC.md).

## نکته محصول

فرم تماس پروتوتایپ است و چیزی ارسال/ذخیره نمی‌کند. فقط زبان در `localStorage` با کلید `persona-lang` می‌ماند.
