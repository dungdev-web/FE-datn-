"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoader } from "./LinkWithLoader";
export default function LinkWithLoader({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const { show, hide } = useLoader();
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    show();

    // Chờ 7 giây trước khi chuyển trang
    await new Promise((resolve) => setTimeout(resolve, 3000));

    router.push(href);
    hide();  // Bạn có thể ẩn loader sau khi trang đã chuyển nếu muốn
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
