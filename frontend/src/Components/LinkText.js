import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkText({ to, text }) {
    return (
        <Link
            to={to}
            style={{ textDecoration: 'none' ,color:"royalblue"}}
        >
            {text}
        </Link>
    )
}
