import React, { useContext } from 'react'
import { menu_list } from '../../AssetsImg/Assets.jsx'
import './ExploreMenu.css'
import { StoreContext } from '../../../context/StoreContext'

const ExploreMenu = () => {
  const {category,setCategory} = useContext(StoreContext)

  return (
    <div className='explore-menu-content' id='menu-list'>
        <h1>Explore our menu.</h1>
        <p>Choose your delicious and favorite food items.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=> {
                return(
                <div onClick={() => setCategory(prev=>prev===item.menu_name?'All':item.menu_name)} className="menu-explore" key={index}>
                    <img className={category===item.menu_name ?'active':''} src={item.menu_image}/>
                    <p>{item.menu_name}</p>
                </div>
                )})}
        </div>
    </div>
  )
}

export default ExploreMenu