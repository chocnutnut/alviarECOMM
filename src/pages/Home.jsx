import { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import { categories, productPropType } from '../data/products'

const PAGE_SIZE = 6

function SectionTitle({ children }) {
  return (
    <h2 className="text-center text-xs font-medium uppercase tracking-[0.28em] text-muted">
      <span className="mr-3 inline-block h-px w-8 bg-accent align-middle" />
      {children}
      <span className="ml-3 inline-block h-px w-8 bg-accent align-middle" />
    </h2>
  )
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
}

function SlidingCardRow({ products, cart, onAddToCart }) {
  const [pair, setPair] = useState(0)
  const [sliding, setSliding] = useState(false)
  const paused = useRef(false)
  const slidingRef = useRef(false)
  const pairCount = Math.max(1, Math.ceil(products.length / 2))

  function cardsFor(pairIndex) {
    const safe = ((pairIndex % pairCount) + pairCount) % pairCount
    const start = (safe * 2) % products.length
    return [0, 1].map((step) => products[(start + step) % products.length]).filter(Boolean)
  }

  function commitSlide() {
    if (!slidingRef.current) return
    slidingRef.current = false
    setPair((current) => (current + 1) % pairCount)
    setSliding(false)
  }

  useEffect(() => {
    if (products.length < 3) return undefined
    const timer = setInterval(() => {
      if (paused.current || slidingRef.current) return
      slidingRef.current = true
      setSliding(true)
    }, 3500)
    return () => clearInterval(timer)
  }, [products.length])

  useEffect(() => {
    if (!sliding) return undefined
    const backup = setTimeout(commitSlide, 800)
    return () => clearTimeout(backup)
  }, [sliding, pairCount])

  const groups = [pair - 1, pair, pair + 1, pair + 2]

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl px-4">
      <div
        className="overflow-hidden"
        onMouseEnter={() => {
          paused.current = true
        }}
        onMouseLeave={() => {
          paused.current = false
        }}
      >
      <div
        className="flex"
        style={{
          width: 'calc(100% * 4 / 3)',
          transform: sliding ? 'translateX(-25%)' : 'translateX(0)',
          transition: sliding ? 'transform 0.7s ease' : 'none',
        }}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget || event.propertyName !== 'transform') return
          commitSlide()
        }}
      >
        {groups.map((groupIndex, position) => {
          const focused = position === 1
          return (
            <div
              key={position}
              className={`grid w-1/4 min-w-0 shrink-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 px-2 ${focused ? '' : 'opacity-60'}`}
            >
              {cardsFor(groupIndex).map((product) => (
                <ProductCard
                  key={`${position}-${product.id}`}
                  product={product}
                  compact
                  frameClass="w-full"
                  onAddToCart={onAddToCart}
                  quantityInCart={cart.find((item) => item.id === product.id)?.quantity ?? 0}
                />
              ))}
            </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}

SlidingCardRow.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

function CardRow({ products, cart, onAddToCart }) {
  return (
    <div className="mt-6 flex gap-4 overflow-x-auto px-4 pb-2 sm:justify-center">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          compact
          onAddToCart={onAddToCart}
          quantityInCart={cart.find((item) => item.id === product.id)?.quantity ?? 0}
        />
      ))}
    </div>
  )
}

CardRow.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default function Home({ products, cart, onAddToCart }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

  function handleQueryChange(event) {
    setQuery(event.target.value)
    setPage(1)
  }

  function handleCategoryChange(option) {
    setCategory(option)
    setPage(1)
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category
      const matchesQuery =
        needle.length === 0 ||
        product.name.toLowerCase().includes(needle) ||
        product.summary.toLowerCase().includes(needle)
      return matchesCategory && matchesQuery
    })
  }, [products, query, category])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const saleItems = products.filter((product) => product.salePrice != null)

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-line bg-surface text-ink">
        <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-80 rounded-full bg-sky-200/70 blur-3xl" />
        <div className="relative mx-auto flex min-h-[320px] max-w-6xl flex-col justify-center px-6 py-16">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-accent">Rarest of them all!</p>
          <h1 className="mt-3 max-w-xl text-5xl font-semibold uppercase leading-none tracking-tight sm:text-7xl">
            Cardout
          </h1>
          <p className="mt-4 max-w-md text-sm font-normal leading-relaxed text-muted sm:text-base">
            Experiencing the lack of options in collecting full arts? Cardout has got you covered. Ih Bangis!
          </p>
        </div>
      </section>

      <section className="bg-paper py-12">
        <SectionTitle>Single cards</SectionTitle>
        <SlidingCardRow products={products} cart={cart} onAddToCart={onAddToCart} />
      </section>

      <section className="border-t border-line bg-paper py-12">
        <SectionTitle>Products</SectionTitle>
        <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <label htmlFor="search" className="text-xs font-medium uppercase tracking-wide text-muted">
              Search products
            </label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search by name"
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none ring-accent focus:ring-2"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Category</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {['All', ...categories].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleCategoryChange(option)}
                  aria-pressed={category === option}
                  className={`px-3 py-1.5 text-xs font-medium uppercase ${
                    category === option ? 'bg-accent text-white' : 'bg-surface text-ink ring-1 ring-line'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-6xl px-4 text-sm text-muted">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        </p>

        {visible.length === 0 ? (
          <p className="mx-auto mt-6 max-w-6xl px-4 text-center text-muted">
            No products match that search. Try another name or category.
          </p>
        ) : (
          <div className="mx-auto mt-4 grid max-w-6xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 lg:grid-cols-6">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                quantityInCart={cart.find((item) => item.id === product.id)?.quantity ?? 0}
              />
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <Pagination page={safePage} pageCount={pageCount} onPageChange={setPage} />
        )}
      </section>

      <section className="border-t border-line bg-surface py-12">
        <SectionTitle>Current sale</SectionTitle>
        <CardRow products={saleItems} cart={cart} onAddToCart={onAddToCart} />
      </section>
    </div>
  )
}

Home.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func.isRequired,
}
