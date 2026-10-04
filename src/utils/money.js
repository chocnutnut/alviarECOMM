export function unitPrice(product) {
  return product.salePrice ?? product.price
}

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount)
}
