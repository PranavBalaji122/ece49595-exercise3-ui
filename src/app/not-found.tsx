import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() {
  return <main id="main-content" className="page-shell flex min-h-[65vh] flex-col items-center justify-center text-center"><p className="text-xs font-semibold uppercase tracking-widest text-forest">Out of bounds · 404</p><h1 className="mt-4 font-heading text-4xl font-extrabold tracking-[-1px]">This game isn’t on the map.</h1><p className="mt-4 text-sm text-muted">Let’s get you back to the games nearby.</p><Link href="/" className="primary-button mt-7 text-sm"><ArrowLeft className="size-4" />Back to Discover</Link></main>;
}
