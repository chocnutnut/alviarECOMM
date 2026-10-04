import PropTypes from 'prop-types'
import { Link, Navigate } from 'react-router-dom'
import { formatPrice } from '../utils/money'

export default function OrderConfirmation({ order = null }) {
  if (!order) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <p className="text-sm font-medium uppercase tracking-wide text-accent">Order placed</p>
      <h1 className="mt-2 font-serif text-4xl">Thank you, {order.customer.fullName}.</h1>
      <p className="mt-3 text-muted">
        Order <span className="font-medium text-ink">{order.id}</span> is saved in this session.
        Pay {formatPrice(order.subtotal)} in cash when it arrives.
      </p>

      <dl className="mt-6 grid gap-3 text-sm">
        <div>
          <dt className="text-muted">Email</dt>
          <dd className="font-medium">{order.customer.email}</dd>
        </div>
        <div>
          <dt className="text-muted">Phone</dt>
          <dd className="font-medium">{order.customer.phone}</dd>
        </div>
        <div>
          <dt className="text-muted">Delivery address</dt>
          <dd className="font-medium">{order.customer.address}</dd>
        </div>
        <div>
          <dt className="text-muted">Payment method</dt>
          <dd className="font-medium">{order.customer.paymentMethod}</dd>
        </div>
      </dl>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {order.items.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-3 text-sm">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span className="font-medium">{formatPrice(item.lineTotal)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-right font-serif text-2xl">{formatPrice(order.subtotal)}</p>
      <Link to="/" className="mt-6 inline-block font-medium text-accent">
        Continue browsing
      </Link>
      </div>
    </div>
  )
}

OrderConfirmation.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    subtotal: PropTypes.number.isRequired,
    customer: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      paymentMethod: PropTypes.string.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        lineTotal: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }),
}
