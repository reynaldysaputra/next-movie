import Select from "react-select";
import Layout from "../components/layout";
import { useQuery } from "react-query";
import { useState } from "react";

const getMovies = async (key) => {
  const genreId = key.queryKey[1].genre;
  const actorsQueryString = key.queryKey[2].actor.map(id => `actors.id=${id}`).join('&');
  let res;
  
  if(genreId) {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies?genres.id=${genreId}`);      
    return res.json();
  }else if(actorsQueryString){
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies?${actorsQueryString}`);    
    return res.json();    
  }else if(genreId && actorsQueryString){
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies?genres.id=${genreId}&${actorsQueryString}`);    
    return res.json();        
  }else {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`); 
    return res.json();        
  }

}

export default function filterMovie({movie, actors, genres}) {
  const [genreId, setGenreId] = useState(null);
  const [actorId, setActorId] = useState([]);
  const {data, status} = useQuery(['movies', {genre: genreId}, {actor: actorId}], getMovies, {initialData: movie});

  return(
    <Layout title='Filter movie - Next Movies'>
      <h2 className='font-bold text-xl my-10'>Filter Movies</h2>

      <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-20 '>
        <div>
          <Select 
            options={actors}
            instanceId='actors'
            isMulti
            getOptionLabel={options => `${options.name}`}
            getOptionValue={options => options.id}
            onChange={values => setActorId(values.map(actor => actor.id))}
          /><br/>
          <Select 
            options={genres}
            instanceId='genres'
            getOptionLabel={options => `${options.name}`}
            getOptionValue={options => options.id}
            isClearable
            onChange={values => setGenreId(values ? values.id : null)}
          />
        </div>
        <div> 
          {console.log(status)}
          {status === 'loading' && <h2>Loading movie...</h2>}
          {status === 'error' && <h2>Something went wrong</h2>}
          {status === 'success' && data.map(mv => (
            <div key={mv.id} className='flex flex-col space-y-2 mb-3 shadow-lg rounded-lg py-4 px-2'>
              <div className='flex space-x-2'>
                <b>{mv.title}</b> <span>-</span> <p>{mv.genres.length > 1 ? mv.genres.map(genre => genre.name) : 'Uncategorized'}</p>
              </div>
              <div>
                {mv.actors.length > 0 && mv.actors.map(actor => (
                  <small key={actor.id}>{actor.name},</small>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const movieReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
  const movieRes = await movieReq.json();

  const actorReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors`);
  const actorRes = await actorReq.json();

  const genreReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genres`);
  const genreRes = await genreReq.json();

  return {
    props: {
      movie: movieRes,
      actors: actorRes,
      genres: genreRes
    }
  } 
}