import React from 'react'
import {NavLink} from 'react-router-dom'

const Nav = ()=> (
    <ul className='nav'>
        <li>
            <NavLink exact activeClassName='active' to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink activeClassName='active' to='/Battle'>Battle</NavLink>
        </li>
        <li>
            <NavLink activeClassName='active' to='/Popular'>Popular</NavLink>
        </li>
    </ul>
)

export default Nav
