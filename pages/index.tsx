import type { NextPage } from 'next'
import FavIcon from '../public/favicon.png'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { Video } from '../types'
import VideoCard from '../components/VideoCard'
import { BASE_URL } from '../utils'
import NoResults from '../components/NoResults'
interface Iprops {
  videos: Video[]
}
const Home = ({videos}:Iprops) => {
  
  
  return (<>
    <div className='flex flex-col gap-10 videos h-full'>
        {videos.length ? (
          videos.map((video: Video) => (
            <VideoCard post = {video} key = {video._id} />
          ))
        ): (
          <NoResults text = {'No Videos'} />
        )}
    </div>
    </>
  )
}
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if(topic) {
    console.log(topic)
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }
  
  return {
    props: { videos: response.data },
  };
};
export default Home
