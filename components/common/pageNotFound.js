import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <h3>404 - Page Not Found</h3>
      <h6>
        Sorry, Nothing to show here. Please click <Link href="/"> here</Link> to explore more blogs.
      </h6>
    </div>
  );
}
