import { Link } from 'react-router-dom';
import React from 'react';
import './navigation.css';


export default function Navigation() {
  return (
    <div>
        <nav className='navbar'>
            <ul className='nav-links'>
                <li>
                    <Link to="/">Accueil</Link>
                </li>
                <li>
                    <Link to="/login">Se connecter</Link>
                </li>
                <li>
                    <Link to="/register">Enregistrez vous</Link>
                </li>

            </ul>
        </nav>
    </div>
  )
}
