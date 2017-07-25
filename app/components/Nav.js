import React from 'react'
import NavLink from 'react-router-dom'

export const Nav = ()=> (
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
