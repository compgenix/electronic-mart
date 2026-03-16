# Electronic Mart

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full e-commerce platform for an electronics retail brand (Electronic Mart)
- Homepage with hero banner, categories, trending products, deals, brands, newsletter
- Category pages: Smartphones, Laptops, TVs, Refrigerators, Washing Machines, ACs, Kitchen Appliances, Accessories
- Product detail page with images, specs, price/discount, EMI options, reviews, stock, PIN code delivery checker, add to cart, buy now
- PIN code delivery zone system: user enters PIN, system checks availability and returns city/state/delivery status
- Smart cart: add/remove/update quantity, coupon code, tax, price summary
- Checkout: shipping address, PIN verification, payment selection (UPI, card, COD)
- User auth: signup, login, JWT via authorization component, profile, order history, order tracking
- Admin dashboard: manage products, categories, inventory, delivery zones, orders, users, analytics
- AI-style product recommendations (based on category affinity and popularity)
- Advanced search with filters: brand, price range, rating, sorting
- Wishlist system
- Review & rating system
- Inventory management with low-stock alerts
- Coupon/discount system
- Stripe payment integration
- Blob storage for product images

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Select components: authorization, blob-storage, stripe
2. Generate Motoko backend with actors for: Products, Categories, Orders, Cart, Reviews, DeliveryZones, Coupons, Wishlist, Recommendations
3. Build React frontend with all pages, admin dashboard, and full feature set
