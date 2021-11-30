import { setCookie } from "nookies";
import { useState } from "react"
import Layout from "../components/layout";
import Router from 'next/router';

export default function Login(params) {
  const [state, setState] = useState({});

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const doRegister = async (e) => {
    e.preventDefault();

    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })

    const res = await req.json();

    if(res.jwt){
      e.target.reset();

      setCookie(null, 'tokenMovies', res.jwt, {
        maxAge: 30 * 24 * 60 * 60,
      })

      Router.replace('/payed-articles');
    }
  }

    return(
      <Layout title='Login - Next Movies'>
        <h2 className='mt-4 font-bold'>You need to login to access this page</h2><br/>
        <form onSubmit={doRegister}>
          <input type="text" name='identifier' placeholder='Enter your email...' onChange={(e) => handleInput(e)}/><br/><br/>
          <input type="password" name='password' placeholder='Enter your password...' onChange={(e) => handleInput(e)}/><br/>
          <button type='submit' className='mt-4 border-blue-400 border-2 px-4 py-2 rounded-md'>Login</button>
        </form>
      </Layout>
    )
}