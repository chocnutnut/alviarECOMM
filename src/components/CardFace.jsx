import PropTypes from 'prop-types'
import { productPropType } from '../data/products'

const typeStyles = {
  Fire: { frame: 'bg-orange-700', wash: 'bg-orange-100', ink: 'text-orange-950' },
  Water: { frame: 'bg-sky-700', wash: 'bg-sky-100', ink: 'text-sky-950' },
  Electric: { frame: 'bg-amber-500', wash: 'bg-amber-100', ink: 'text-amber-950' },
  Normal: { frame: 'bg-stone-500', wash: 'bg-stone-100', ink: 'text-stone-950' },
}

function TypeMark({ category }) {
  if (category === 'Water') {
    return (
      <svg viewBox="0 0 80 80" className="h-16 w-16" aria-hidden="true">
        <circle cx="40" cy="40" r="22" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="40" cy="40" r="8" fill="currentColor" />
      </svg>
    )
  }
  if (category === 'Electric') {
    return (
      <svg viewBox="0 0 80 80" className="h-16 w-16" aria-hidden="true">
        <path d="M46 8 L28 44 H42 L34 72 L58 32 H44 Z" fill="currentColor" />
      </svg>
    )
  }
  if (category === 'Grass') {
    return (
      <svg viewBox="0 0 80 80" className="h-16 w-16" aria-hidden="true">
        <path
          d="M40 70 C40 70 18 48 22 30 C26 14 40 12 40 12 C40 12 54 14 58 30 C62 48 40 70 40 70 Z"
          fill="currentColor"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" aria-hidden="true">
      <path d="M40 8 L58 36 L48 36 L62 68 H18 L34 36 H24 Z" fill="currentColor" />
    </svg>
  )
}

TypeMark.propTypes = {
  category: PropTypes.string.isRequired,
}

export default function CardFace({ product, large = false }) {
  const style = typeStyles[product.category] ?? typeStyles.Fire

  return (
    <div className={`flex h-full w-full p-2 ${style.frame}`}>
      <div className={`flex w-full flex-col rounded-xl ${style.wash} ${style.ink} p-3`}>
        <div className="flex items-start justify-between gap-2">
          <p className={`min-w-0 font-serif font-semibold leading-tight ${large ? 'text-2xl' : 'text-base'}`}>
            {product.name}
          </p>
          <p className="shrink-0 text-xs font-bold">{product.hp} HP</p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{product.category}</p>
        <div className="my-3 flex flex-1 items-center justify-center rounded-lg bg-white/70">
          <TypeMark category={product.category} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide">{product.rarity}</p>
      </div>
    </div>
  )
}

CardFace.propTypes = {
  product: productPropType.isRequired,
  large: PropTypes.bool,
}
