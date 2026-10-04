import { useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { findProduct, products } from './data/products'
import { unitPrice } from './utils/money'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import OrderConfirmation from './pages/OrderConfirmation'
import ProductDetails from './pages/ProductDetails'

export default function App() {
  const [cart, setCart] = useState([])
  const [lastOrder, setLastOrder] = useState(null)
  const [cartPulse, setCartPulse] = useState(0)

  function addToCart(productId) {
    const product = findProduct(productId)
    if (!product || product.stock < 1) return false

    const existing = cart.find((item) => item.id === productId)
    if (existing && existing.quantity >= product.stock) return false

    setCart((current) => {
      const currentItem = current.find((item) => item.id === productId)
      if (!currentItem) {
        return [...current, { id: productId, quantity: 1 }]
      }
      if (currentItem.quantity >= product.stock) {
        return current
      }
      return current.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      )
    })
    setCartPulse((count) => count + 1)
    return true
  }

  function updateQuantity(productId, nextQuantity) {
    const product = findProduct(productId)
    if (!product) return
    const quantity = Math.min(product.stock, Math.max(1, nextQuantity))
    setCart((current) =>
      current.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    )
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item.id !== productId))
  }

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = findProduct(item.id)
          if (!product) return null
          return {
            ...product,
            quantity: item.quantity,
            lineTotal: unitPrice(product) * item.quantity,
          }
        })
        .filter(Boolean),
    [cart],
  )

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0)

  function placeOrder(customer) {
    if (cartItems.length === 0) return null
    const order = {
      id: `AT-${Date.now().toString().slice(-8)}`,
      customer,
      items: cartItems,
      subtotal,
      placedAt: new Date().toISOString(),
    }
    setLastOrder(order)
    setCart([])
    return order
  }

  return (
    <BrowserRouter>
      <Layout cartCount={cartCount} cartPulse={cartPulse}>
        <Routes>
          <Route
            path="/"
            element={<Home products={products} cart={cart} onAddToCart={addToCart} />}
          />
          <Route
            path="/product/:id"
            element={<ProductDetails cart={cart} onAddToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                items={cartItems}
                subtotal={subtotal}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                itemCount={cartCount}
                subtotal={subtotal}
                onPlaceOrder={placeOrder}
              />
            }
          />
          <Route path="/order-confirmation" element={<OrderConfirmation order={lastOrder} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
