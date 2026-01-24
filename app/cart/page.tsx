'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Cart() {
  const [cart, setCart] = useState<Record<string, { p: number; q: number }>>({})
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "{}")
    setCart(cartData)
    
    let total = 0
    for (let k in cartData) total += cartData[k].q
    setCartCount(total)
  }, [])

  const checkout = () => {
    alert("Order confirmed – Cash on delivery")
    localStorage.removeItem("cart")
    router.push('/')
  }

  const total = Object.keys(cart).reduce((sum, key) => {
    return sum + cart[key].p * cart[key].q
  }, 0)

  return (
    <>
      <nav>
        <h1>Smart Life</h1>
        <div>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart ({cartCount})</Link>
          <Link href="/login">Login</Link>
        </div>
        <Image src="/IMG_1324.jpeg" alt="Smart Life Logo" width={60} height={60} style={{borderRadius: '50%', objectFit: 'cover'}} />
      </nav>

      <section>
        <h2>Your Cart</h2>
        <div id="cartItems">
          {Object.keys(cart).length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            Object.keys(cart).map((key) => (
              <p key={key}>
                {key} x {cart[key].q}
              </p>
            ))
          )}
        </div>
        <h3>
          Total: <span id="total">{total}</span> LE
        </h3>
        {Object.keys(cart).length > 0 && (
          <button className="btn" onClick={checkout} style={{marginTop: '1rem'}}>
            Checkout
          </button>
        )}
      </section>

      <footer>Contact: smart.life.www@gmail.com</footer>
    </>
  )
}
