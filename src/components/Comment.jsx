"use client";
import React, { useState, useEffect } from 'react'
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { app } from "../firebase";
import { collection, getFirestore, onSnapshot, setDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';

export default function Comment({ comment, commentId, originalPostId }) {
    // console.log(comment);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const { data: session } = useSession();
    const db = getFirestore(app);

    const likePost = async () => {
        if (session) {
            if (isLiked) {
                await deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session?.user.uid));
            } else {
                await setDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session.user.uid), {
                    username: session.user.username,
                    timestamp: serverTimestamp(),
                });
            }
        } else {
            signIn();
        }
    };

    useEffect(() => {
        onSnapshot(collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'), (snapshot) => {
            setLikes(snapshot.docs);
        });
    }, [db]);

    useEffect(() => {
        setIsLiked(
            likes.findIndex((like) => like.id === session?.user?.uid) !== -1
        );
    }, [likes]);

    return (
        <div className='flex p-3 border-b border-gray-200 hover:bg-gray-50 pl-10'>
            <img src={comment?.userImage} alt="" className="h-9 w-9 rounded-full mr-4" />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 whitespace-nowrap">
                        <h4 className="font-bold text-sm truncate">{comment?.name}</h4>
                        <span className="text-sm truncate">@{comment?.username}</span>
                    </div>
                    <HiDotsHorizontal className='text-sm' />
                </div>
                <p className="text-gray-800 text-xs my-3">{comment?.comment}</p>
                <div className='flex items-center'>
                    {isLiked ? (
                        <HiHeart onClick={likePost} className='text-[2.5rem] cursor-pointer text-red-600 rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />
                    ) : (
                        <HiOutlineHeart onClick={likePost} className='text-[2.5rem] cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-red-100' />
                    )}
                    {likes.length > 0 && <span className={`text-sm ${isLiked ? 'text-red-600' : ''}`}>{likes.length}</span>}
                </div>
            </div>
        </div>
    )
}
