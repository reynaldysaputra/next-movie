import Layout from '../components/layout'
import MovieCard from '../components/movieCard';

export default function Home({movies}) {
  return (
    <Layout title='Next Movies' metaDescription='Movies App from Reynaldy saputra'>
      <h2 className='font-bold text-xl my-7'>Latest Movies</h2>
      <div className='flex flex-col sm:flex-row flex-wrap sm:px-0 justify-around lg:space-x-6 mb-10'>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />  
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(){
  const movieReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
  const movieRes = await movieReq.json();

  return{
    props: {
      movies: movieRes
    }
  }
}