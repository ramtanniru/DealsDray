"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";  // Import AuthContext

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Always call useContext
  const pathUrl = usePathname(); // Always call usePathname

  return (
    <header className="fixed w-full py-5 px-32 bg-[#01008A] shadow-lg">
      <div className="flex justify-between items-center">
        {/* Display "DealsDray!" in the header */}
        <Link className="text-3xl font-semibold text-white" href='/'>DealsDray!</Link>

        {/* Conditionally render navigation and logout button only if user is authenticated */}
        {isAuthenticated && pathUrl !== '/login' && (
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-white">Home</Link>
            <Link href="/employees" className="text-white">Employees</Link>
            <button onClick={logout} className="bg-white px-5 py-3 rounded-md text-[#01008A]">
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
