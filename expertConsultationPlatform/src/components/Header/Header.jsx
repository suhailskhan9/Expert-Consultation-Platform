import React from 'react'
import {Link, NavLink} from 'react-router-dom'
export default function Header() {
    return (
        <header className="bg-blue-200 shadow sticky z-50 top-0">
            <nav className=" px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className=" font-mono font-bold flex items-center text-xl">
                        XpertConsult
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/expert/login"
                            className="bg-blue-400 hover:bg-blue-500 text-white font-bold  rounded-full focus:ring-4 focus:ring-blue-300  text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Expert
                        </Link>
                        <Link
                            to="/user/login"
                            className="bg-blue-400 hover:bg-blue-500 text-white font-bold  rounded-full focus:ring-4 focus:ring-blue-300  text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            User
                        </Link>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to = "/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive? "text-blue-600" : "text-gray-7000"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-500 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            
                            <li>
                                <NavLink
                                    to = "/about"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive? "text-blue-600" : "text-gray-7000"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-500 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to = "/contact"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive? "text-blue-600" : "text-gray-7000"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-500 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>

                           


                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

