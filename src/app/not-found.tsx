import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site__notfound">
      <h1>Page not found</h1>
      <p>
        That tool doesn&apos;t exist. <Link href="/">See all tools</Link>
      </p>
    </div>
  );
}
