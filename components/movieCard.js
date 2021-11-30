import Link from 'next/link';
import Image from 'next/image';

export default function MovieCard({movie}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if(!movie.genres[0]){
    movie.genres = [];
    movie.genres[0] = {title: 'uncategorized'}
  }

    return(
      <div className='rounded-xl shadow sm:w-[45%] lg:w-[32%] overflow-hidden mt-8'>
        {movie.poster && (
          <div className='h-[480px]'>
            <Image src={`${API_URL}${movie.poster.url}`} alt={movie.title} width={movie.poster.width} height={movie.poster.height} />
          </div>
        )}
        <div className='m-3'>
          <h2 className='font-bold'>{movie.title}</h2>
          <p className='text-sm mt-2'>{movie.description}</p>
          <Link href={`/movie/${movie.genres[0].title}/${movie.slug}`}>
            <a className='mt-2 block text-blue-600'>More about this movie</a>
          </Link>
        </div>
      </div>
    )
}