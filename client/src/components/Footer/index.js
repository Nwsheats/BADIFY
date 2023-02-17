import React from 'react'
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';


const Footer = () => {
  return (
        <MDBFooter bgColor='light' classNameName='text-center text-lg-left fixed-bottom'>
          <div classNameName='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <a className='text-dark' href='https://github.com/Nwsheats/BADIFY'>
              Badify
            </a>
            <div>
            <a>by Ben, Connor, Melisa, Moony, and Nathan</a>
          </div>
          </div>
        </MDBFooter>
      );
    }

export default Footer