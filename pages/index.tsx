import Head from 'next/head'
import { useState, useEffect } from 'react'

export async function getServerSideProps() {
  const data = JSON.stringify({ time: new Date() });
  return { props: { data } };
}
export default function Home({ data }: { data: { time: string } }) {
  const serverData = JSON.parse(JSON.stringify(data));
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
      fetch('/api/time')
      .then(res => res.json())
      .then(json => setTime(new Date(json.time)));
  }, []);

  return (
    <>
      <Head>
        <title>Hello World</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className='text-3xl font-bold underline'>hello world! The time is {serverData}</h1>
        <h2>{time &&
                    `The time is ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}</h2>
      </div>
    </>
  )
}
