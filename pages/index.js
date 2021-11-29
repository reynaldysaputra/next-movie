import Layout from '../components/layout'
import MovieCard from '../components/movieCard';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

export default function Home({movies, page, numberOfMovies}) {
  const router = useRouter();
  const lastPage = Math.ceil(numberOfMovies / 3); // Menghitung jumlah page, jika jumlah page 7 maka akan dibagi 3 hasil  2.3333, dan Mat.ceil akan membulatkan keatas menjadi 3

  useEffect(() => {
    if(movies.length <= 1) router.replace('/404');
  }, [page])

  return (
    movies.length > 1 ? (
      <Layout title='Next Movies' metaDescription='Movies App from Reynaldy saputra'>
        <h2 className='font-bold text-xl my-7'>Latest Movies</h2>
        <div className='flex flex-col sm:flex-row flex-wrap sm:px-0 lg:space-x-3 mb-10 justify-start'>
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />  
          ))}
        </div>

        <div className='flex justify-between mb-20'>
          <button 
            className={`border-blue-400 border-2 px-4 py-2 rounded-xl ${page === 1 && 'opacity-10 cursor-not-allowed'}`}
            onClick={() => router.push(`?page=${page - 1}`)}
            disabled={page === 1}
          >Previous</button>
          <button 
            className={`border-blue-400 border-2 px-4 py-2 rounded-xl ${page >= lastPage && 'opacity-10 cursor-not-allowed'}`}
            onClick={() => router.push(`?page=${page + 1}`)}
            disabled={page >= lastPage}
          >Next</button>
        </div>
      </Layout>
    ) : <></>
  )
}

export async function getServerSideProps({query : {page = 1}}){
  const start = page === 1 ? 0 : (page - 1) * 3; // menghitung jumlah start page 2-1 = 1 * 3 = 3 ----> 3-1 = 2 * 3 = 6

  const numberOfMoviesReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/count`);
  const numberOfMovies = await numberOfMoviesReq.json();

  const movieReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies?_limit=3&_start=${start}`)
  const movieRes = await movieReq.json();

  return{
    props: {
      movies: movieRes,
      page: Number(page),
      numberOfMovies
    }
  }
}