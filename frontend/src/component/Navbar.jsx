import React,{useState} from 'react'
import './style/navbar.css'
// import './style/nav.css'


const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
      
    };
  return (
   <>
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-brand">
        <img src="../asset/logo.jpeg'" alt="Logo" className="logo" />
        <a href="/">GBPIET PAURI</a>
      </div>
      <div className="navbar-links">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div className="navbar-search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="navbar-darkmode-toggle">
          <label htmlFor="darkModeToggle">Dark Mode</label>
          <input
            id="darkModeToggle"
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </div>
      </div>
    </nav>
   </>
  )
}

export default Navbar
