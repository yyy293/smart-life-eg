import { useRouter } from "next/router";
import Link from "next/link";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <Link href="/">← Back</Link>
      <h1>Product {id}</h1>
      <p>This is the product page.</p>
      <button>Add to cart</button>
    </div>
  );
}
