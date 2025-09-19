import Link from "next/link";
export default function meal({params}) {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
      Meal Page {params.slug}
      </h1>
          <p>
         <Link href="/">Back to home</Link>
      </p>
    </main>
  );
}
