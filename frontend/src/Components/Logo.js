import React from 'react'
import companyLogo from '../assets/logo192.png'
export default function Logo({width,height,mx}) {
  return (
    <img src={companyLogo} alt="BigCo Inc. logo" style={{ width: width, height: height}} />
  )
}
