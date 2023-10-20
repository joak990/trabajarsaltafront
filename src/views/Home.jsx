import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getposts } from '../redux/Actions'
import Cards from '../Components/Cards'
function Home() {
 
  const jobs =  useSelector(state => state.jobs)

  const empleos = jobs.length
 const dispatch = useDispatch()
  useEffect(() => {
    
      dispatch(getposts())
    

  }, [dispatch]);

  const [empleo, setEmpleo] = useState(); 
  return (
    <div>
    <div className='flex items-start justify-start ml-24'> 
      <h1 className=' text text-3xl '>Clasificados actuales</h1>
    </div>
      <div className='flex items-center justify-around'> 
      Empleos actuales : {empleos}
      <div className=''> 
      
      </div>
      </div>
    <Cards/>
    
  </div>
  )
}

export default Home