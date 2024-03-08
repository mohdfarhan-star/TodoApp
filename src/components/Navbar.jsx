import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className="flex justify-around bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-2">
            <div className="logo">
                <span className="font-bold text-xl mx-8 cursor-pointer">iTask</span>
            </div>
            <ul className="flex gap-8 mx-9">
                <li className="list-none cursor-pointer hover:font-bold active:underline transition-all">Home</li>
                <li className="list-none cursor-pointer hover:font-bold active:underline transition-all">Your tasks</li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar