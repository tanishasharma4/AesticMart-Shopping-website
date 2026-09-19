# AesticMart API

## `GET /api/products`

Returns the seeded AesticMart product catalog.

## `GET /api/health`

Returns `{ "status": "ok", "brand": "AesticMart" }` when the service is running.

## Order email template

**Subject:** Your AesticMart order is confirmed

Hello {{customer_name}}, your order {{order_number}} is confirmed. We are preparing your selected pieces with care. Your Style. Your Choice. Your AesticMart.
