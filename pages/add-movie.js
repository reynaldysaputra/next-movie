import Layout from '../components/layout';
import {useState} from 'react';
import { parseCookies } from 'nookies'
import slug from 'slug';

export default function AddMovies(params) {
  const [state, setState] = useState({title: '', description: '', slug: '', file: ''});

  const handleState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.name === 'file' ? e.target.files[0] : e.target.value
    })
  }

  const doAddMovie = async (e) => {
    e.preventDefault();
    const {tokenMovies} = parseCookies();
    let data = new FormData();

    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenMovies}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...state, slug: slug(state.title)})
    })

    const res = await req.json();

    if(req.ok){
      data.append('files', state.file);
      data.append('refId', res.id);
      data.append('ref', 'movies');
      data.append('field', 'poster');

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: 'POST',
        body: data
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }

    e.target.reset();
  }

  return(
    <Layout title='Add Movie - Next Movies'>
      <h2 className='font-bold mt-4 mb-3'>Add Movie</h2>
      <form onSubmit={doAddMovie}>
        {console.log(state)}
        <input type="text" name='title' placeholder='Movie title'  onChange={e => handleState(e)}/><br/><br/>
        <input type="file" onChange={e => handleState(e)} name='file' /><br/><br/>
        <textarea name="description" placeholder='MovieDescription' cols="30" rows="3" onChange={e => handleState(e)}></textarea><br/><br/>
        <input type="text" name='slug' value={slug(state.title)} onChange={e => handleState(e)} className='bg-gray-400/40' disabled/><br/><br/>
        <button type='submit' className='mt-4 border-blue-400 border-2 px-4 py-2 rounded-md'>Add Movie</button>
      </form>
    </Layout>
  )
}