import Image from "next/image";
import NavBar from "./components/nav-bar";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center mt-20">
        <Image src="/logo.png" alt="logo" width={100} height={200} />
        <p className="font-roboto text-2xl text-[#2C96DF]">Shorttin</p>
        <p className="font-roboto text-2xl text-[#2C96DF]">
          A easy to use URL shortner!
        </p>
        <input
          type="text"
          id="large-input"
          className="mt-7 w-2/5 mb-8 rounded-[20px] block  p-4 text-gray-900 border border-gray-300 rounded-lg  sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button className="bg-[#2C96DF] hover:bg-primary-800 focus:ring-2 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-[#2C96DF] dark:hover:bg-primary-300 focus:outline-none dark:focus:ring-primary-800">
          Short it
        </button>
      </div>
    </>
  );
}
