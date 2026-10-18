# تست

## ابزار

| لایه | ابزار | دستور |
| --- | --- | --- |
| واحد | Vitest + happy-dom | `npm test` |
| واحدِ واچ | Vitest | `npm run test:watch` |
| مرورگر | Playwright (Chromium) | `npm run test:e2e` |
| دروازهٔ انتشار | واحد + بیلد + e2e | `npm run verify` |

اولین بار روی ماشین جدید:

```sh
npm install
npm run test:e2e:install
```

## چه چیزی پوشش داده شده

- ولیدیشن فرم تماس (`src/lib/contactValidation.ts`)
- فیلتر و انتخاب پروژه‌ها (`src/lib/workFilter.ts`)
- هم‌ترازی دیکشنری FA/EN، ارقام فارسی، persist زبان
- e2e: لود صفحه، سوییچ FA، فیلتر AI، رد فرم خالی و قبول فرم معتبر
  - درخواست فونت گوگل در e2e قطع می‌شود تا `load` روی شبکه گیر نکند

## قرارداد PM

بعد از «انجام شد»:

1. `git diff` را بخوان؛ بدون بررسی فایل، تست نگیر.
2. `npm test` را اجرا کن.
3. اگر UI/رفتار مرورگر عوض شده: `npm run test:e2e`.
4. قبل از push همیشه `npm run verify` اگر تغییر محصولی است.
5. تست قرمز یعنی رد پذیرش. پرامپت اصلاح بده؛ commit نکن.

## قرارداد Implementer

- منطق خالص را در `src/lib` بگذار و تست واحد بنویس.
- مسیر کاربر را اگر عوض شد به `tests/e2e/site.spec.ts` اضافه کن.
- تست را قبل از اعلام «انجام شد» خودت هم اجرا کن؛ باز هم commit نکن.
