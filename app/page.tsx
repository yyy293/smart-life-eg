import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
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

      <header className="hero">
        <h2>Smart Homes Made Simple</h2>
        <p>Automation • Security • Smart Living</p>
        <Link className="btn" href="/products">Explore Products</Link>
      </header>

      <section>
        <h2>About Us</h2>
        <p>
          Smart Life is a smart-home company specializing in smart rooms, security,
          automation, and intelligent devices.
          We help people upgrade their homes with modern technology that is reliable,
          secure, and easy to use.
        </p>
      </section>

      <footer>
        Contact: smart.life.www@gmail.com
      </footer>
    </>
  )
}
