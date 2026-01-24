'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'admin@smart.life' && password === 'admin123') {
      router.push('/admin')
    } else {
      alert('Invalid credentials')
    }
  }

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
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn" style={{marginTop: '1rem'}}>
            Login
          </button>
        </form>
        <p style={{marginTop: '1rem'}}>Demo: admin@smart.life / admin123</p>
      </section>

      <footer>Contact: smart.life.www@gmail.com</footer>
    </>
  )
}
