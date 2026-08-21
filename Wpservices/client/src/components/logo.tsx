import Image from "next/image";
import Link from "next/link";

export function Logo({ onClick, priority = false }: { onClick?: () => void; priority?: boolean }) {
  return (
    <Link className="logo" href="/" aria-label="WP Services home" onClick={onClick}>
      <Image src="/wp-services-logo.png" alt="WP Services" width={212} height={62} priority={priority} />
    </Link>
  );
}
