import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    })
    navigate('/login')

  }

return (
<div className="signin-container">
  <h4>Register and Begin your BookWorm Journey!</h4>
  <div className="signin-card">
    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="John Smith"
          value={formValues.name}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
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
          onChange={handleChange}
          type="password"
          name="password"
          value={formValues.password}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          value={formValues.confirmPassword}
          required
        />
      </div>
      <button
        disabled={
          !formValues.email ||
          !formValues.password ||
          formValues.password !== formValues.confirmPassword
        }
      >
        Register
      </button>
    </form>
  </div>
</div>
)
}

export default Register