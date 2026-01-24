'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const products = [
  // Cameras
  { n: "Tapo 2K Outdoor IP66", p: 2800 },
  { n: "Tapo C100 Indoor Night Vision", p: 1100 },
  { n: "Tapo Indoor Camera", p: 1330 },
  { n: "Baby Monitor", p: 4400 },
  { n: "Solar Panel Security Camera 2K", p: 7300 },
  { n: "Ring Weatherproof Doorbell", p: 7800 },
  { n: "Tap Battery Doorbell", p: 4500 },
  { n: "Ring Video Doorbell", p: 4000 },
  { n: "EUFY Doorbell Camera", p: 3900 },

  // Decor
  { n: "Cloud LED Ceiling 15m", p: 1100 },
  { n: "RGB LED Strip Light 15m", p: 3200 },
  { n: "Night Floor Lamp Light Sensor", p: 300 },

  // Smart Devices
  { n: "Smart Water Valve", p: 2200 },
  { n: "Smart Curtain Shutter", p: 1700 },
  { n: "Smart Switch (3 Pack)", p: 1440 },
  { n: "NIO Smart Plug", p: 820 },
  { n: "Wi-Fi Open/Close Sensor", p: 750 },
  { n: "Smart Wall Panel", p: 1770 },
  { n: "Smart IR Controller", p: 800 },
  { n: "Smart Light Bulb", p: 900 },
  { n: "Sonoff Switch", p: 600 },
  { n: "Screen Wall Switch", p: 3300 },
  { n: "LED TV Back Sync", p: 8000 },
  { n: "SwitchBot Attachment", p: 2900 },

  // Alexa
  { n: "Echo Show 8", p: 13000 },
  { n: "Echo Spot 2024", p: 5000 },
  { n: "Echo Spot 2017", p: 5500 },
  { n: "Echo Pop Black", p: 3500 },
  { n: "Echo Pop Purple", p: 3600 },
  { n: "Echo Show 5", p: 8300 },
  { n: "Echo Dot 5th Gen", p: 5000 }
]

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}")
    let total = 0
    for (let k in cart) total += cart[k].q
    setCartCount(total)
  }, [])

  const addToCart = (name: string, price: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}")
    if (cart[name]) {
      cart[name].q++
    } else {
      cart[name] = { p: price, q: 1 }
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    
    let total = 0
    for (let k in cart) total += cart[k].q
    setCartCount(total)
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setFilteredProducts(
      products.filter(p => p.n.toLowerCase().includes(value.toLowerCase()))
    )
  }

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

      <input
        type="text"
        className="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div id="products">
        {filteredProducts.map((product, index) => (
          <div key={index} className="card">
            <h3>{product.n}</h3>
            <p>{product.p} LE</p>
            <button onClick={() => addToCart(product.n, product.p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <footer>Contact: smart.life.www@gmail.com</footer>
    </>
  )
}
