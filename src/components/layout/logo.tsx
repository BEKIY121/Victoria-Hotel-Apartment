import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function Logo({
  href = "/",
  className,
  imageClassName,
  priority = false,
}: LogoProps) {
  const image = (
    <Image
      src="/logo.png"
      alt="Victoria Hotel Apartments"
      width={160}
      height={80}
      priority={priority}
      className={cn("h-12 lg:h-14 w-auto object-contain", imageClassName)}
    />
  );

  if (!href) return <div className={className}>{image}</div>;

  return (
    <Link href={href} className={cn("inline-flex shrink-0", className)}>
      {image}
    </Link>
  );
}
