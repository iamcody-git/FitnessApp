
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-dvw absolute top-0 left-1/2 -translate-x-1/2 z-[1000] py-4 bg-black">
      <div className="max-w-[120rem] text-gray-50 px-6 md:px-8 lg:px-10">
        <nav className="w-full flex flex-row items-center font-sans">
        <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="" className="h-8" alt="Trimps logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            TriMPS SHARK
            </span>
          </Link>
          <div className="flex-1 relative hidden md:flex items-center justify-center">
            <ul className="mx-auto inline-flex gap-6 text-md font-light">
              <li>
                <Link to="/"
                  className="font-bold relative after:h-px after:content-[''] after:w-full after:absolute after:top-full after:bg-accent-500 after:left-0 after:translate-y-1"
            
                >
                  Home
                </Link>
              </li>
              <li>
                <Link to="/service">Services</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
            <ul className="inline-flex">
              <li className="flex">
                <Link
                  className=" h-10 rounded-lg flex items-center justify-center text-base bg-accent-500 leading-none px-12 uppercase"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="m-5 gap-6 text-md font-light">login/Register</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
