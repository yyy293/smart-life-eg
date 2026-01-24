import Link from 'next/link'
import Image from 'next/image'

export default function Admin() {
  return (
    <>
      <nav>
        <h1>Smart Life</h1>
        <div>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart (<span id="cartCount">0</span>)</Link>
          <Link href="/login">Login</Link>
        </div>
        <Image src="/IMG_1324.jpeg" alt="Smart Life Logo" width={60} height={60} style={{borderRadius: '50%', objectFit: 'cover'}} />
      </nav>

      <section>
        <h2>Admin Panel</h2>
        <p>Welcome to the admin dashboard. Manage products, orders, and users here.</p>
      </section>

      <footer>Contact: smart.life.www@gmail.com</footer>
    </>
  )
}
