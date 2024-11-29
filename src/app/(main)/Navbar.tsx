"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
export default function Navbar() {
  const { theme } = useTheme();

  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold">AI Resume Builder</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                href="/billing"
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
}