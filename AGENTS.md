# Agents

منبع حقیقت این ریپو برای هر چت Cursor.

قبل از هر پاسخ یا تغییر، بخوان:

1. `README.md`
2. `docs/SPEC.md`
3. `docs/STRUCTURE.md`
4. `docs/PRODUCT.md`
5. `docs/TESTING.md`

## نقش‌ها

- **Product Manager:** چت پایدار مالک. درخواست را به تسک تبدیل می‌کند، پرامپت Implementer می‌سازد، بعد از «انجام شد» تست می‌گیرد و اگر سبز بود commit + push می‌کند.
- **Implementer:** چت یک‌بارمصرف اجرا. فقط پیاده‌سازی می‌کند. commit و push نمی‌کند.

پرامپت آمادهٔ PM: `docs/prompts/PRODUCT_MANAGER.md`  
قالب پرامپت اجرا: `docs/prompts/IMPLEMENTER.template.md`
