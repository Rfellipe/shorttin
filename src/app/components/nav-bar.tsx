import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <header className="mb-8">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-end items-center mx-auto max-w-screen-xl">
          <div className="flex items-center lg:order-2">
            <Link
              href="/login"
              className="text-gray-800 border border-black focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-300 focus:outline-none dark:focus:ring-gray-800"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-[#2C96DF] hover:bg-primary-800 focus:ring-2 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-[#2C96DF] dark:hover:bg-primary-300 focus:outline-none dark:focus:ring-primary-800"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
