"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/providers/CartContext";
import { CartItem } from "@/components/Product/types";

const CartPage = () => {
  const { cart, incrementItem, decrementItem, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {cart.map((item: CartItem, index: Number) => (
              <div
                key={`${item.product.id}-${index}`}
                className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded-md shadow-sm"
              >
                <div className="relative w-28 h-28 flex-shrink-0">
                  <Image
                    src={`/images/${item.product.images[0].src}`}
                    alt={item.product.images[0].alt}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex flex-col flex-grow gap-2 w-full">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-lg font-medium">{item.product.name}</h2>

                    <button
                      className="text-red-500 text-sm hover:underline"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="flex gap-1 items-center text-gray-500 text-sm">
                    Color:{" "}
                    <div
                      className={`size-4 rounded-full ${item.selectedColor.class}`}
                    />{" "}
                    • Size: {item.selectedSize.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <div className="flex items-center border rounded overflow-hidden">
                      <button
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => decrementItem(item.product.id)}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-white">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => incrementItem(item.product.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border p-6 rounded-md shadow-sm h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-6 block w-full bg-primary text-white text-center py-2 rounded hover:bg-primary-dark transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
