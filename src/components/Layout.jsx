import PropTypes from 'prop-types'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout({ cartCount = 0, cartPulse = 0, children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar cartCount={cartCount} cartPulse={cartPulse} />
      <main className="w-full flex-1">{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  cartCount: PropTypes.number,
  cartPulse: PropTypes.number,
  children: PropTypes.node.isRequired,
}
