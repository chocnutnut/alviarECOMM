import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatPrice, unitPrice } from '../utils/money'

export default function Cart({ items, subtotal, onUpdateQuantity, onRemove }) {
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-serif text-3xl">Your cart is empty</h1>
        <p className="mt-2 text-muted">Add a card from the shop to see it here.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-accent px-5 py-3 font-semibold text-white"
        >
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="font-serif text-4xl">Cart</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line text-muted">
            <tr>
              <th className="px-4 py-3 font-medium text-muted">Product</th>
              <th className="px-4 py-3 font-medium text-muted">Price</th>
              <th className="px-4 py-3 font-medium text-muted">Quantity</th>
              <th className="px-4 py-3 font-medium text-muted">Subtotal</th>
              <th className="px-4 py-3 font-medium text-muted">
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-line last:border-0">
                <td className="px-4 py-4">
                  <Link to={`/product/${item.id}`} className="font-medium hover:text-accent">
                    {item.name}
                  </Link>
                </td>
                <td className="px-4 py-4">{formatPrice(unitPrice(item))}</td>
                <td className="px-4 py-4">
                  <div className="inline-flex items-center rounded-full border border-line">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name}`}
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 disabled:text-muted"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${item.name}`}
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="px-3 py-1 disabled:text-muted"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4 font-medium">{formatPrice(item.lineTotal)}</td>
                <td className="px-4 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="font-medium text-accent"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Order total</p>
          <p className="font-serif text-3xl">{formatPrice(subtotal)}</p>
        </div>
        <Link
          to="/checkout"
          className="rounded-full bg-accent px-5 py-3 font-semibold text-white"
        >
          Continue to checkout
        </Link>
      </div>
    </div>
  )
}

Cart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      lineTotal: PropTypes.number.isRequired,
    }),
  ).isRequired,
  subtotal: PropTypes.number.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}
