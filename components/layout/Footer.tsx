import React from "react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>
            &copy; {year}{" "}
            <span className="font-semibold text-primary">OrionX</span>. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="hover:text-primary transition-colors hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-primary transition-colors hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="hover:text-primary transition-colors hover:underline"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
