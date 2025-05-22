import './header.css'
import { Link } from 'react-router-dom';

function Header () {
    return(
        <header>
            <Link className="logo" to="/">McdFlix</Link>
            <Link className="favoritos" to="/favoritos"><img width="24" height="24" src="https://img.icons8.com/material-outlined/24/f26c4f/diamond-heart.png" alt="diamond-heart"/></Link>

        </header>
    )
}

export default Header;