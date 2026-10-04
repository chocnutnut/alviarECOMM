import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/money'

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  paymentMethod: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^(09\d{9}|\+639\d{9})$/

function validateCheckout(values) {
  const errors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = 'Enter your full name (at least 2 characters).'
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email format, such as name@example.com.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!phonePattern.test(values.phone.trim())) {
    errors.phone = 'Enter a complete phone number, such as 09171234567 or +639171234567.'
  }

  if (!values.address.trim()) {
    errors.address = 'Delivery address is required.'
  } else if (values.address.trim().length < 10) {
    errors.address = 'Enter a complete delivery address (at least 10 characters).'
  }

  if (!values.paymentMethod) {
    errors.paymentMethod = 'Choose a payment method.'
  } else if (values.paymentMethod !== 'Cash on Delivery') {
    errors.paymentMethod = 'Only Cash on Delivery is accepted.'
  }

  return errors
}

const fields = ['fullName', 'email', 'phone', 'address', 'paymentMethod']

function FieldError({ message = '' }) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1 text-sm font-semibold text-accent">
      {message}
    </p>
  )
}

FieldError.propTypes = {
  message: PropTypes.string,
}

export default function Checkout({ itemCount, subtotal, onPlaceOrder }) {
  const navigate = useNavigate()
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    event.target.setCustomValidity('')
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function handleSubmit(event) {
    const form = event.currentTarget
    const nextErrors = validateCheckout(values)

    fields.forEach((name) => {
      form.elements[name].setCustomValidity(nextErrors[name] || '')
    })

    setErrors(nextErrors)

    if (!form.checkValidity() || Object.keys(nextErrors).length > 0) {
      event.preventDefault()
      form.reportValidity()
      return
    }

    event.preventDefault()
    const order = onPlaceOrder({
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      paymentMethod: values.paymentMethod,
    })

    if (order) {
      navigate('/order-confirmation')
    }
  }

  if (itemCount === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-serif text-3xl">Nothing to check out</h1>
        <p className="mt-2 text-muted">Add something to your cart before placing an order.</p>
        <Link to="/" className="mt-6 inline-block font-semibold text-accent">
          Return to the shop
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-surface p-6">
        <h1 className="font-serif text-4xl">Checkout</h1>
        <p className="mt-2 text-sm text-muted">
          All fields are required. Payment is Cash on Delivery.
        </p>

        <div className="mt-6 grid gap-4">
          <label className="block text-sm font-medium text-muted">
            Full name
            <input
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              required
              minLength={2}
              autoComplete="name"
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-normal text-ink"
            />
            <FieldError message={errors.fullName} />
          </label>

          <label className="block text-sm font-medium text-muted">
            Email address
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="name@example.com"
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-normal text-ink"
            />
            <FieldError message={errors.email} />
          </label>

          <label className="block text-sm font-medium text-muted">
            Phone number
            <input
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              required
              pattern="(09[0-9]{9}|\+639[0-9]{9})"
              placeholder="09171234567"
              autoComplete="tel"
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-normal text-ink"
            />
            <FieldError message={errors.phone} />
          </label>

          <label className="block text-sm font-medium text-muted">
            Delivery address
            <textarea
              name="address"
              value={values.address}
              onChange={handleChange}
              required
              minLength={10}
              rows={3}
              autoComplete="street-address"
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-normal text-ink"
            />
            <FieldError message={errors.address} />
          </label>

          <label className="block text-sm font-medium text-muted">
            Payment method
            <select
              name="paymentMethod"
              value={values.paymentMethod}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 font-normal text-ink"
            >
              <option value="">Select a payment method</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
            <FieldError message={errors.paymentMethod} />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-accent px-5 py-3 font-semibold text-white"
        >
          Place order
        </button>
      </form>

      <aside className="h-fit rounded-2xl border border-line bg-surface p-6">
        <p className="text-sm text-muted">Order summary</p>
        <p className="mt-2 font-serif text-3xl">{formatPrice(subtotal)}</p>
        <p className="mt-2 text-sm text-muted">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} · Cash on Delivery
        </p>
      </aside>
    </div>
  )
}

Checkout.propTypes = {
  itemCount: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
}
