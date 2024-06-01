'use client';

import React, { useEffect, useState } from 'react'
import { HiOutlineChat } from "react-icons/hi";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { signIn, useSession } from 'next-auth/react';
import { app } from "../firebase";
import { collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';

export default function Icons({ id }) {

    const { data: session } = useSession();
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const db = getFirestore(app);

    const likePost = async () => {
        if (session) {
          if (isLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid));
          } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
              username: session.user.username,
              timestamp: serverTimestamp(),
            });
          }
        } else {
          signIn();
        }
      };

    useEffect(() => {
        onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
            setLikes(snapshot.docs);
        });
    }, [db]);

    useEffect(() => {
        setIsLiked(
          likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        );
      }, [likes]);

    return (
        <div>
            <div className="flex justify-start gap-5 p-2 text-gray-500">
                <HiOutlineChat className='text-[2.5rem] cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />
                <div className="flex items-center">
                {isLiked ? (
                    <HiHeart onClick={likePost} className='text-[2.5rem] cursor-pointer text-red-600 rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />
                ) : (
                    <HiOutlineHeart onClick={likePost} className='text-[2.5rem] cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-red-100' />
                )}
                {likes.length > 0 && <span className={`text-sm ${isLiked? 'text-red-600':''}`}>{likes.length}</span>}
                </div>
                <HiOutlineTrash className='text-[2.4rem] cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-red-100' />
            </div>
        </div>
    )
}