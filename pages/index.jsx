import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { getDatabase, ref, onValue,get,child } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../constants/firebase-config';
import { ReviewRow } from '../components/ReviewRow';
import { TitleBar } from '../components/TitleBar';

const inter = Inter({ subsets: ['latin'] })
export default function Home({ reviews }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TitleBar />
      <main className={styles.main}>
        
        <p>{reviews.review}</p>
        {
          reviews.map((review) =>
            <ReviewRow review={review} />
          )
        }
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const app = initializeApp(firebaseConfig);

  const dbRef = ref(getDatabase());
  const reviews = await get(child(dbRef, `reviews`)).then((snapshot) => {
    var r = []
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot)=>{
        console.log(childSnapshot);
        r.push(childSnapshot.val())
      })
      console.log(r);
      return r;
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  console.log("Reviews",reviews)
  
  return {
    props: {
      reviews,
    },
  }
}