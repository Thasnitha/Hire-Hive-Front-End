import React from 'react'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
    <div style={{height:'100vh'} } className='d-flex justify-content-center align-items-center flex-column'>
        <img style={{width:'500px'}} src="https://nithrajobs.com/assets/dist/img/job_not_found.webp" alt="" />
      <Link to={'/'} className="btn btn-warning">GO TO HOME</Link>
    </div>
  )
}

export default Pnf