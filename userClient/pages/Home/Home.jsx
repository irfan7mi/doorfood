import React, { useState } from 'react'
import Header from '../../src/components/Header/Header'
import ExploreMenu from '../../src/components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../src/components/FoodDisplay/FoodDisplay'
import './Home.css'

const Home = () => {

  return (
    <div>
      <Header/>
      <ExploreMenu />
      <FoodDisplay />
    </div>
  )
}

export default Home