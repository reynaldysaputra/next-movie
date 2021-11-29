import Link from 'next/link';

export default function MovieCard({movie}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if(!movie.genre){
    movie.genre = {};
    movie.genre.title = 'uncategorized';
  }

    return(
      <div className='rounded-xl shadow sm:w-[45%] lg:w-[32%] overflow-hidden mt-8'>
        {movie.poster && (
          <div className='h-[480px]'>
            <img src={`${API_URL}${movie.poster.url}`} alt={movie.title} className='w-full h-full' />
          </div>
        )}
        <div className='m-3'>
          <h2 className='font-bold'>{movie.title}</h2>
          <p className='text-sm mt-2'>{movie.description}</p>
          <Link href={`/movie/${movie.genre.title}/${movie.slug}`}>
            <a className='mt-2 block text-blue-600'>More about this movie</a>
          </Link>
        </div>
      </div>
    )
}