import {Link} from "react-router";
import { useMyContext } from "../Context/MyContext";


const Navbar = () => {
    const {count} = useMyContext();
    return (
    <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-sky-400 to-blue-500 p-5 shadow-lg rounded-b-lg">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-extrabold text-2xl tracking-tight drop-shadow-lg">🛒 Shopping App</span>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-full px-3 py-1 shadow-inner">
            <input
                className="outline-none border-none bg-transparent text-gray-700 placeholder-gray-400 px-2 py-1 w-40 focus:w-56 transition-all duration-300"
                placeholder="Search products..."
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded-full shadow transition-colors duration-200">
                Search
            </button>
        </div>
        <div className="flex items-center gap-4">
            <Link
                to="/profile"
                className="text-white hover:text-blue-200 font-medium transition-colors duration-200"
            >
                Profile
            </Link>
            <Link
                to="/signup"
                className="bg-white text-blue-600 hover:bg-blue-100 font-semibold px-4 py-1 rounded-full shadow transition-colors duration-200"
            >
                Signup
            </Link>
            <p>Value: {count}</p>
        </div>
    </nav>
);
};

export { Navbar };
