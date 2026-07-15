const en = {
  // Nav
  "nav.games": "Games",
  "nav.categories": "Categories",
  "nav.deals": "Deals",
  "nav.wishlist": "Wishlist",
  "nav.search": "Search games...",

  // Home
  "home.browseByCategory": "Browse by Category",
  "home.bestSellers": "Best Sellers This Week",
  "home.recommended": "Recommended for You",
  "home.newReleases": "New Releases",
  "home.freeGames": "Free or Nearly Free",
  "home.seeAll": "See all",
  "home.loadMore": "Load More",

  // Hero
  "hero.viewDeal": "View Deal",
  "hero.preorderNow": "Pre-order Now",
  "hero.playFree": "Play Free",
  "hero.getItNow": "Get It Now",

  // Promo
  "promo.limitedTime": "Limited Time",
  "promo.summerSale": "Summer Sale",
  "promo.upTo": "Up to",
  "promo.off": "off",
  "promo.onThousands": "on thousands of games",
  "promo.endsIn": "Ends in 3 days",
  "promo.shopTheSale": "Shop the Sale",

  // Social Proof
  "social.viewing": "people are viewing this right now",
  "social.purchased": "purchased",

  // Newsletter
  "newsletter.stay": "Stay in the Loop",
  "newsletter.getDeals": "Get deals before anyone else",
  "newsletter.subscribed": "You're subscribed! Check your inbox.",
  "newsletter.subscribe": "Subscribe",

  // Games page
  "games.title": "All Games",
  "games.browse": "Browse our full catalog \u2014 {count} games available",
  "games.allGames": "All Games",
  "games.showing": "Showing",
  "games.game": "game",
  "games.games": "games",

  // Game detail
  "game.addToCart": "Add to Cart",
  "game.inCart": "In Cart",
  "game.addToWishlist": "Add to Wishlist",
  "game.inWishlist": "In Wishlist",
  "game.developer": "Developer",
  "game.released": "Released",
  "game.rating": "Rating",
  "game.platforms": "Platforms",
  "game.about": "About this game",
  "game.screenshots": "Screenshots",
  "game.related": "Related Games",
  "game.free": "Free",
  "game.addedToCart": "Added to cart",
  "game.removedFromWishlist": "Removed from wishlist",
  "game.addedToWishlist": "Added to wishlist",

  // Cart
  "cart.title": "Shopping Cart",
  "cart.inYourCart": "{count} {n, select, one {game} other {games}} in your cart",
  "cart.clearCart": "Clear Cart",
  "cart.cleared": "Cart cleared",
  "cart.removed": "Removed from cart",
  "cart.remove": "Remove",
  "cart.summary": "Order Summary",
  "cart.subtotal": "Subtotal ({count} items)",
  "cart.discount": "Discount",
  "cart.total": "Total",
  "cart.checkout": "Proceed to Checkout",
  "cart.secure": "Secure checkout powered by Stripe",
  "cart.continue": "Continue Shopping",
  "cart.empty": "Your cart is empty",
  "cart.emptyDesc": "Looks like you haven't added any games yet. Browse our catalog and find something you love.",
  "cart.browseGames": "Browse Games",

  // Wishlist
  "wishlist.title": "My Wishlist",
  "wishlist.saved": "{count} {n, select, one {game} other {games}} saved",
  "wishlist.addAll": "Add All to Cart",
  "wishlist.added": "Added {count} {n, select, one {game} other {games}} to cart",
  "wishlist.empty": "Your wishlist is empty",
  "wishlist.emptyDesc": "Browse our catalog and save games you're interested in by clicking the heart icon.",

  // Deals
  "deals.title": "Hot Deals",
  "deals.onSale": "{count} {n, select, one {game} other {games}} on sale",
  "deals.saveUpTo": "save up to",

  // Categories
  "categories.title": "Categories",
  "categories.browse": "Browse {catCount} categories across {gameCount} games",
  "categories.available": "available",

  // Footer
  "footer.store.allGames": "All Games",
  "footer.store.newReleases": "New Releases",
  "footer.store.onSale": "On Sale",
  "footer.store.freeToPlay": "Free to Play",
  "footer.store.preorders": "Pre-orders",
  "footer.support.helpCenter": "Help Center",
  "footer.support.contactUs": "Contact Us",
  "footer.support.refundPolicy": "Refund Policy",
  "footer.support.systemReqs": "System Requirements",
  "footer.support.reportBug": "Report a Bug",
  "footer.company.aboutUs": "About Us",
  "footer.legal.terms": "Terms of Service",
  "footer.legal.privacy": "Privacy Policy",
  "footer.legal.cookies": "Cookie Policy",
  "footer.tagline": "Your premium destination for the latest games at the best prices.",
  "footer.createdBy": "Created by",
  "footer.rights": "2026 NeonGame. All rights reserved.",

  // Badges
  "badge.free": "FREE",
  "badge.new": "NEW",
  "badge.hot": "HOT",
} as const;

export default en;
export type TranslationKey = keyof typeof en;
