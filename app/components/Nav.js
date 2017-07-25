import React from 'react'
import {NavLink} from 'react-router-dom'

const Nav = ()=> (
    <ul className='nav'>
        <li>
            <NavLink to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to='/Battle'>Battle</NavLink>
        </li>
        <li>
            <NavLink to='/Popular'>Popular</NavLink>
        </li>
    </ul>
)

export default Nav
