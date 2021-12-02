import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Posts from "../components/posts";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function PostsPage({data, numberOfPosts}) {
  const [posts, setPosts] = useState(data);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if(posts.length >= numberOfPosts) setHasMore(false);
  }, [posts])

  const getMorePosts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?_start=${posts.length}&_limit=10`);
    const newPosts = await res.json();

    setPosts([...posts, ...newPosts]);
  }

  return(
    <Layout title='Posts - Next Movies'>
      <h2 className='font-bold my-10 text-2xl'>Posts</h2>
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className='text-center'>
            <p>Yay! You have seen it all</p>
          </p>
        }
      >
        {posts.map(item => (
          <Posts key={item.id} posts={item} />
        ))}
      </InfiniteScroll>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const postReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?_limit=10`);
  const postRes = await postReq.json();

  const getNumberOfPosts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/count`);

  return {
    props: {
      data: postRes,
      numberOfPosts: await getNumberOfPosts.json()
    }
  }
}