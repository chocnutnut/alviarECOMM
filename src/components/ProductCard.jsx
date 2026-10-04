import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { productPropType } from '../data/products'
import { formatPrice, unitPrice } from '../utils/money'
import CardFace from './CardFace'

export default function ProductCard({
  product,
  onAddToCart,
  quantityInCart = 0,
  compact = false,
  frameClass = '',
}) {
  const atLimit = quantityInCart >= product.stock
  const price = unitPrice(product)
  const onSale = product.salePrice != null && product.salePrice < product.price
  const [added, setAdded] = useState(false)
  const addedTimer = useRef(null)

  useEffect(() => () => clearTimeout(addedTimer.current), [])

  function handleAdd() {
    if (!onAddToCart(product.id)) return
    setAdded(true)
    clearTimeout(addedTimer.current)
    addedTimer.current = setTimeout(() => setAdded(false), 700)
  }

  return (
    <article className={`flex h-full flex-col ${frameClass || (compact ? 'w-44 shrink-0' : '')}`}>
      <Link
        to={`/product/${product.id}`}
        className="block aspect-[5/7] overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-line transition hover:ring-accent"
      >
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full bg-surface object-contain" />
        ) : (
          <CardFace product={product} />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1 pt-2">
        <p className="text-[11px] font-medium uppercase tracking-wide text-accent">{product.category}</p>
        <h2 className="text-sm font-medium leading-tight text-ink">
          <Link to={`/product/${product.id}`} className="hover:text-accent">
            {product.name}
          </Link>
        </h2>
        {!compact && <p className="text-xs text-muted">{product.summary}</p>}
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            {onSale && (
              <p className="text-xs text-muted line-through">{formatPrice(product.price)}</p>
            )}
            <p className="text-sm font-medium text-ink">{formatPrice(price)}</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={atLimit}
            className={`rounded-md bg-accent px-2 py-1 text-xs font-medium text-white disabled:cursor-not-allowed disabled:bg-zinc-700 ${
              added ? 'add-press' : ''
            }`}
          >
            {atLimit ? 'Limit' : added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  product: productPropType.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  quantityInCart: PropTypes.number,
  compact: PropTypes.bool,
  frameClass: PropTypes.string,
}
