import React from 'react';
import './Login.css';

function Login({ onSignIn }) {
  return (
    <div className="login">
      <img 
        className="login__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
        alt="Netflix Logo" 
      />

      <div className="login__gradient" />

      <div className="login__body">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email or phone number" />
          <input type="password" placeholder="Password" />
          <button type="submit" onClick={(e) => { e.preventDefault(); onSignIn(); }}>
            Sign In
          </button>
          
          <div className="login__help">
            <div className="login__remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <p>Need help?</p>
          </div>

          <div className="login__footer">
  <p>
    <span className="footer__gray">New to Netflix?</span>{" "}
    <a 
      href="https://youtu.be/RrESvSRNpeo?si=H81QKkHD5DPKQ17q" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="footer__link"
    >
      Sign up now.
    </a>
  </p>
  
  <p className="footer__captcha">
    This page is protected by Google reCAPTCHA to ensure you're not a bot. 
    <a 
      href="https://youtu.be/RrESvSRNpeo?si=H81QKkHD5DPKQ17q" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="footer__linkBlue"
    >
      Learn more.
    </a>
            </p>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Login;