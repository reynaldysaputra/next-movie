import Head from 'next/head';

export default function Layout(props) {
  return(
    <>
      <Head>
        <title>{props.title}</title>
        <meta name='description' content={props.metaDescription} />
      </Head>

      <div className='container mx-auto px-5 lg:px-0'>
        {props.children}
      </div>
    </>
  ) 
}