import { useEffect, useState } from 'react';
import LoginForm from '../../components/LoginForm'
import styles from './Login.module.css'
import { useLocation } from 'react-router-dom';

function Login() {
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || '');
  useEffect(() => {
      if (message) {
        const timer = setTimeout(() => {
          setMessage('');
        }, 3000);
        return () => clearTimeout(timer); 
      }
    }, [message]);
  return (
    <>
    {message && (
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success</strong> {message}
      </div>
    )}
      <div className="container">
          <div className="row">
            <div className={`${styles.LoginMainBox}`}>
              <h3 className={`${styles.LoginHeading} text-center`}>Login</h3>
              <div className={`${styles.loginFormBox}`}>
                <LoginForm />
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Login