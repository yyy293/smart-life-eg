import { useRouter } from "next/router";
import Link from "next/link";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const products: any = {
    1: { name: "Smart Light", price: 49, description: "Smart lights you can control remotely." },
    2: { name: "Smart Thermostat", price: 199, description: "Control your home's temperature automatically." },
    3: { name: "Smart Door Lock", price: 129, description: "Secure your home with smart locks." },
    4: { name: "Smart Camera", price: 89, description: "Keep an eye on your home 24/7." },
    5: { name: "Smart Speaker", price: 59, description: "Voice-controlled smart speaker." },
  };

  const product = products[id as keyof typeof products];

  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ fontFamily: "Arial", backgroundColor: "#f0f4f8", minHeight: "100vh", padding: "40px" }}>
      <Link href="/" style={{ color: "#001f3f" }}>← Back to Home</Link>
      <h1 style={{ fontSize: "32px", marginTop: "20px" }}>{product.name}</h1>
      <p style={{ marginTop: "10px", fontSize: "20px" }}>${product.price}</p>
      <p style={{ marginTop: "20px" }}>{product.description}</p>
      <button style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#001f3f", color: "white", border: "none", cursor: "pointer" }}>
        Add to Cart
      </button>
    </div>
  );
}
