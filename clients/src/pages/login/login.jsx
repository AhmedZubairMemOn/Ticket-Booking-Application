import { useContext, useState } from "react"
import "./login.css"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [credentials,setCredentials] = useState({
        username:undefined,
        password:undefined
    })

const {loading, error, dispatch} = useContext(AuthContext)

const navigate = useNavigate()

const handleChange = (e)=>{
  setCredentials((prev)=>({ ...prev, [e.target.id] : e.target.value}) )
}

const handleClick = async e =>{
  e.preventDefault()
    dispatch({type:"Login-Start"})
    try {
      const res = await axios.post("/auth/login", credentials)
      dispatch({ type:"Login_Success",payload:res.data})
      navigate('/')
    } catch (error) {
     dispatch({type:"Login_Failure", payload:error.response.data})
      
    }

  
}
  return (
    <div className="login">
    <div className="lContainer">
      <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput"/>
      <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
      <button disabled={loading} className="lButton" onClick={handleClick}>Login</button>
      {error && <span>{error.message}</span>}
    </div>
    </div>
  )
}



