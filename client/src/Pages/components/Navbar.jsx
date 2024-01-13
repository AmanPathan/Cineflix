import React from "react";
import logo from './images/cineflix.png';
import user from './images/user.jpg';
import '../components/styles/Navbar.css';

const Navbar = () => {
    const handleScroll = ()=>{
        const element = document.getElementById('trend');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <>
            
        </>
    )
}

export default Navbar;