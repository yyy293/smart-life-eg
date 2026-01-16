import Link from "next/link";

export default function Cart() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <Link href="/">← Back</Link>
      <h1>Your Cart</h1>
      <p>Your cart is empty.</p>
    </div>
  );
}
