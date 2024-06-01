import React from 'react'
import {collection, getDocs, getFirestore, orderBy, query} from "firebase/firestore";
import {app} from "../firebase";
import Posts from './Posts';

// if we make it client side then search engine only show some divs and when full page loaded then it show all the things. Because of that we want to make it server side.

export default async function Feed() {
    const db = getFirestore(app);
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
    })

    // console.log(data);

  return (
    <div>
      {data.map((post)=> (
        <Posts key={post.id} post={post} id={post.id} />
      ))}
    </div>
  )
}
