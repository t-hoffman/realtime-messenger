"use client";

import clsx from "clsx";
import Link from "next/link";

export default function NavItem({ active, href, icon: Icon, label, onClick }) {
  return (
    <div
      className={clsx(
        `p-3 rounded-md cursor-pointer hover:bg-gray-200`,
        active ? "text-black bg-gray-200" : "text-gray-500"
      )}
      onClick={onClick || null}
    >
      <Link href={href}>
        <Icon className="h-5 w-5 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </div>
  );
}
