import React from 'react'
import {app} from "../../../firebase";
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { HiArrowLeft } from 'react-icons/hi';
import Link from 'next/link';
import Posts from '@/components/Posts';
import Comments from '@/components/Comments';

export default async function page({params}) {
  // to get the id which is in params or [id] folder we can use 'params'. only aplicable for next js.

  // console.log("params is", params);
  const db = getFirestore(app);
  let data = {};
  const querySnapshot = await getDoc(doc(db, 'posts', params.Id));
  data = { ...querySnapshot.data(), id: querySnapshot.id };

  return (
    <div className='max-w-xl mx-auto border-r border-l min-h-screen'>
      <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <Link href={'/'} className='hover:bg-gray-100 rounded-full p-2'>
          <HiArrowLeft className='h-5 w-5'/>
        </Link>
          <h2 className="text-lg ">Back</h2>
      </div>
      <Posts post={data} id={data.id} />
      <Comments id={params.Id}/>
    </div>
  )
}
