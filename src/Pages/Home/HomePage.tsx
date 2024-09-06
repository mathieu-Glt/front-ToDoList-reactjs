import React from 'react'
import Navigation from '../../components/Navigation/Navigation'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'

export default function HomePage() {
  return (
    <div className='homepage'>
        <h1>Bienvenue sur votre To do list !</h1>
        <div className='container_homepage'>
          <div className='box'><LeftSideBar /></div>
          <div className='box'><RightSideBar /></div>
        </div>
    </div>
  )
}
