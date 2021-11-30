import Layout from '../components/layout';
import {useState} from 'react';
import { parseCookies } from 'nookies'

export default function AddMovies(params) {
  const [state, setState] = useState({});

  const handleState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const doAddMovie = async (e) => {
    e.preventDefault();
    const {tokenMovies} = parseCookies();

    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenMovies}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })

    const res = await req.json();

    console.log(res);

    e.target.reset();
  }

  return(
    <Layout title='Add Movie - Next Movies'>
      <h2 className='font-bold mt-4 mb-3'>Add Movie</h2>
      <form onSubmit={doAddMovie}>
        <input type="text" name='title' placeholder='Movie title'  onChange={e => handleState(e)}/><br/><br/>
        <input type="text" name='slug' value={state.title} onChange={e => handleState(e)} className='bg-gray-400/40' disabled/><br/><br/>
        <textarea name="description" placeholder='MovieDescription' cols="30" rows="3" onChange={e => handleState(e)}></textarea><br/>
        <button type='submit' className='mt-4 border-blue-400 border-2 px-4 py-2 rounded-md'>Add Movie</button>
      </form>
    </Layout>
  )
}