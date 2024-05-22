import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const SignIn = (props) => {

  let navigate = useNavigate()
  
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = async (e) => {
    // const payload = await SignInUser(formValues)
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    // PaymentResponse.setUser(payload)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await SignInUser(formValues)
    localStorage.setItem('user', res)
    console.log(res)
    props.handleLogin(res)
    setFormValues({ email: '', password: '' })
    // props.setUser(res)
    navigate('/')
  }
  

return (

<div className="signin-container">
<h4>Sign In !</h4>
<div className="signin-card">
  <form className="signin-form" onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input
        className="form-control"
        onChange={handleChange}
        name="email"
        type="email"
        placeholder="example@example.com"
        value={formValues.email}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        className="form-control"
        onChange={handleChange}
        type="password"
        name="password"
        value={formValues.password}
        required
      />
    </div>
    <button className="btn-signin" disabled={!formValues.email || !formValues.password}>
      Sign In
    </button>
  </form>
</div>
</div>
);
};



export default SignIn