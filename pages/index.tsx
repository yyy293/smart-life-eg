import Link from "next/link";

export default function Home() {
  const products = [
    { id: 1, name: "Product 1", price: 29 },
    { id: 2, name: "Product 2", price: 49 },
    { id: 3, name: "Product 3", price: 19 },
    { id: 4, name: "Product 4", price: 99 },
    { id: 5, name: "Product 5", price: 59 },
    { id: 6, name: "Product 6", price: 39 },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>My Shop</h1>
      <p>Welcome to my online store</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <Link href={`/product/${p.id}`}>View product</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
