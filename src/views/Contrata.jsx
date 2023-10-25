import React, { useEffect } from 'react'
import Card from '../Components/Card'
import CardContrata from '../Components/CardContrata'
import CardsContrata from '../Components/CardsContrata'
import { getcandidates } from '../redux/Actions'
import { useDispatch } from 'react-redux'

function Contrata() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    
      dispatch(getcandidates())
    

  }, [dispatch]);
  return (
    <div>
      <CardsContrata/>
    </div>
  )
}

export default Contrata
