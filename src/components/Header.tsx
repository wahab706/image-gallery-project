"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/providers/CartContext";

const Header = () => {
  const { totalQuantity } = useCart();

  return (
    <header className="border-b sticky top-0 bg-white z-10 ">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="font-bold text-xl">AppLogo</div>
        </Link>

        <Link href="/cart" className="relative">
          <ShoppingCart className="h-6 w-6" />
          {totalQuantity > 0 && (
            <div className="absolute -top-2 -right-2 bg-black rounded-full size-5 flex items-center justify-center">
              <span className="text-xs text-white font-semibold">
                {totalQuantity}
              </span>
            </div>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
