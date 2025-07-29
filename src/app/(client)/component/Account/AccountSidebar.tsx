"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IUser } from "@/types/user";
import LogoutLink from "../log_out";
import { useGlobalStore } from "@/store/useGlobalStore";
export default function AccountSidebar({ user }: { user: IUser | null }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const addressCount = useGlobalStore((state) => state.addressCount);
  const orderCount = useGlobalStore((state) => state.orderCount);
  return (
    <div className="block-account">
      <h5 className="title-account">Trang tài khoản</h5>
      {user && (
        <p>
          Xin chào, <span>{user.name}</span>&nbsp;!
        </p>
      )}
      <ul>
        <li>
          <LogoutLink />
        </li>
        <li>
          <Link
            className={`title-info ${isActive("/account") ? "active" : ""}`}
            href="/account"
          >
            Thông tin tài khoản
          </Link>
        </li>
        <li>
          <Link
            className={`title-info ${
              isActive("/account/order") ? "active" : ""
            }`}
            href="/account/order"
          >
            Đơn hàng của bạn ({orderCount})
          </Link>
        </li>
        <li>
          <Link
            className={`title-info ${
              isActive("/account/change_pass") ? "active" : ""
            }`}
            href="/account/change_pass"
          >
            Đổi mật khẩu
          </Link>
        </li>
        <li>
          <Link
            className={`title-info ${
              isActive("/account/address") ? "active" : ""
            }`}
            href="/account/address"
          >
            Sổ địa chỉ ({addressCount})
          </Link>
        </li>
      </ul>
    </div>
  );
}
