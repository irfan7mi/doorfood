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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos distinctio ipsum ipsa commodi aliquam, nobis aut eos, vitae fugiat, debitis ex accusantium est non. Qui aliquid maxime commodi soluta voluptates.
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
              <p>Contact : +12-6788-912</p>
              <p>E-mail : doorfood24@gmail.com</p>
          </div>
        </div>
        <hr className='hr-line'/>
    </div>
  )
}

export default Footer