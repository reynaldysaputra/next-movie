import Layout from '../../../components/layout';
import Custom500 from '../../500';

export default function MovieDetail({errorCode, movie}) {  
  if (errorCode) {
    return <Custom500  />
  }

  return(
    <Layout title={`${movie.title} - Next Movies`} metaDescription={movie.description}>
      <div className='mt-5 space-y-4'>
        <h2 className='font-bold text-3xl'>{movie.title}</h2>
        <p>{movie.description}</p>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx){
  const {slug} = ctx.query;
  const movieReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies?slug=${slug}`);
  const movieRes = await movieReq.json();

  return {
    props: {
      errorCode: movieRes.length > 0 ? false : 500,
      movie: movieRes.length > 0 ? movieRes[0] : {}
    }
  }
}