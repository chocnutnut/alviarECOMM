import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `px-3 py-1 text-sm font-medium uppercase tracking-wide ${
    isActive ? 'text-accent' : 'text-muted hover:text-ink'
  }`

export default function Navbar({ cartCount = 0, cartPulse = 0 }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/90 text-ink backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <NavLink to="/" className="text-lg font-semibold tracking-tight">
          Cardout
        </NavLink>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart
            <span
              key={cartPulse}
              className={`ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs text-white ${
                cartPulse > 0 ? 'cart-pop' : ''
              }`}
            >
              {cartCount}
            </span>
          </NavLink>
          <NavLink to="/checkout" className={linkClass}>
            Checkout
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

Navbar.propTypes = {
  cartCount: PropTypes.number,
  cartPulse: PropTypes.number,
}
