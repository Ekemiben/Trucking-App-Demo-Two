import React from 'react'
import Landing from '../components/Landing'
import Ads from '../components/Ads'
import Trucks from '../components/Trucks'
import ClientTestimony from "../components/ClientTestimony"
import ClientTestimonyLanding from "../components/ClientTestimonyLanding"

const Home = () => {
  return (
    <div>
      <Landing />
      <Ads />
      {/* <Trucks /> */}
      {/* <ClientTestimony /> */}
      <ClientTestimonyLanding />

    </div>
  )
}

export default Home
