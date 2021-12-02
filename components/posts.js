export default function Posts({posts}) {
  return(
    <div className='bg-gray-200 px-5 py-7 mb-5'>
      <h3 className='font-bold mb-4'>{posts.id}. {posts.title}</h3>
      <p>{posts.content}</p>
    </div>
  )
}