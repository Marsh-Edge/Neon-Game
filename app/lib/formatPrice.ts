const USD_TO_TOMAN = 42000;

export function formatPrice(locale: string, price: number): string {
  if (locale === "fa") {
    const toman = Math.round(price * USD_TO_TOMAN);
    const formatted = toman.toLocaleString("fa-IR");
    return `${formatted} تومان`;
  }
  return `$${price.toFixed(2)}`;
}

export function formatDate(locale: string, dateStr: string): string {
  const date = new Date(dateStr);
  if (locale === "fa") {
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
