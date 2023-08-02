# Design Document for Stripe Integration

Priority Order

## Stripe integration (unbounded)
- javascript code needs to load, doesn't currently
- GCP code, returns error, due to payment intent type - Don't understand that problem.
- Webhooks need to be setup

## User Credits (more time)
- Update database to store credits from user
- Ensure credits increment and decrement appropriately upon mint of NFT

## GCP Function for Minting NFT (less time)
- Move client side code to GCP
- Create way to do massive amounts of NFTs

## Authentication Fix (unbounded)
- Refresh token to client needs to be fixed.
- Works now, but clunky and buggy.