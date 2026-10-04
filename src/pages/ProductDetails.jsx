import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
import { findProduct } from '../data/products'
import { formatPrice, unitPrice } from '../utils/money'
import CardFace from '../components/CardFace'

export default function ProductDetails({ cart, onAddToCart }) {
  const { id } = useParams()
  const product = findProduct(id)
  const [added, setAdded] = useState(false)
  const addedTimer = useRef(null)

  useEffect(() => () => clearTimeout(addedTimer.current), [])

  if (!product) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-line bg-surface px-6 py-12 text-center">
        <h1 className="font-serif text-3xl">Product not found</h1>
        <p className="mt-2 text-muted">That card is not in the catalog.</p>
        <Link to="/" className="mt-6 inline-block font-semibold text-accent">
          Back to the shop
        </Link>
      </div>
    )
  }

  const quantityInCart = cart.find((item) => item.id === product.id)?.quantity ?? 0
  const atLimit = quantityInCart >= product.stock

  function handleAdd() {
    if (!onAddToCart(product.id)) return
    setAdded(true)
    clearTimeout(addedTimer.current)
    addedTimer.current = setTimeout(() => setAdded(false), 700)
  }

  return (
    <article className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 lg:grid-cols-2">
      <div className="mx-auto aspect-[5/7] w-full max-w-sm overflow-hidden rounded-3xl">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full rounded-2xl bg-surface object-contain shadow-sm ring-1 ring-line" />
        ) : (
          <CardFace product={product} large />
        )}
      </div>
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-accent">{product.category}</p>
        <p className="mt-1 text-sm text-muted">{product.rarity}</p>
        <h1 className="mt-2 font-serif text-4xl font-normal">{product.name}</h1>
        <p className="mt-4 text-2xl font-medium">{formatPrice(unitPrice(product))}</p>
        {product.salePrice != null && product.salePrice < product.price && (
          <p className="text-sm text-muted line-through">{formatPrice(product.price)}</p>
        )}
        <p className="mt-4 leading-relaxed text-muted">{product.description}</p>
        <p className="mt-4 text-sm text-muted">
          {product.stock > 0 ? `In stock · ${product.stock} available` : 'Out of stock'}
        </p>
        {quantityInCart > 0 && (
          <p className="mt-1 text-sm text-muted">{quantityInCart} already in your cart.</p>
        )}
        <button
          type="button"
          onClick={handleAdd}
          disabled={atLimit || product.stock < 1}
          className={`mt-6 rounded-md bg-accent px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400 ${
            added ? 'add-press' : ''
          }`}
        >
          {atLimit ? 'Stock limit reached' : added ? 'Added' : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}

ProductDetails.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
}
