export default function MovieCard({movie}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

    return(
      <div className='rounded-xl shadow sm:w-[45%] lg:flex-1 overflow-hidden mt-8'>
        <div className='h-[480px]'>
          <img src={`${API_URL}${movie.poster.url}`} alt={movie.title} className='w-full h-full' />
        </div>
        <div className='m-3'>
          <h2 className='font-bold'>{movie.title}</h2>
          <p className='text-sm mt-2'>{movie.description}</p>
        </div>
      </div>
    )
}