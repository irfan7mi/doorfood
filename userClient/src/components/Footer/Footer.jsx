import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer-card' id='app-details'>
        <div className="fooder-title">
          <h2>DooRFooD</h2>
          <h2>Company</h2>
          <h2>Contact Us</h2>
        </div>
        <div className="fooder-title fooder-content">
          <div className="company-about">
            DooRFooD is a premier food delivery service, connecting customers with fresh, high-quality meals. 
            We prioritize taste, speed, and customer satisfaction, making every dining experience exceptional.
          </div>
          <div className="footer-about">
              <ul>
                  <li>Home</li>
                  <li>About</li>
                  <li>Service</li>
                  <li>Review</li>
              </ul>
          </div>
          <div className="footer-contact">
              <p>Contact : +91 63795 61918</p>
              <p>E-mail : doorfood24@gmail.com</p>
          </div>
        </div>
        <hr className='hr-line'/>
    </div>
  )
}

export default Footer