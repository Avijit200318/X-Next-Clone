"use client"
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '@/atom/modalAtom'
import Modal from "react-modal";
import { HiX } from 'react-icons/hi';
import { useSession } from 'next-auth/react';
import { app } from "../firebase";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

export default function CommentModal() {
    const [open, setOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const { data: session } = useSession();
    const [post, setPost] = useState({});
    // console.log(post)
    const [input, setInput] = useState('');

    const db = getFirestore(app);

    useEffect(() => {
        if (postId !== '') {
            const postRef = doc(db, 'posts', postId);
            const unsubscribe = onSnapshot(postRef, (snapshot) => {
                if (snapshot.exists()) {
                    setPost(snapshot.data());
                } else {
                    console.log('No such document!');
                }
            });
            return () => unsubscribe();
        }
    }, [postId]);

    return (
        <div>
            {open && (
                <Modal isOpen={open} onRequestClose={() => setOpen(false)} ariaHideApp={false} className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md" >
                    <div className="p-4">
                        <div className="border-b border-gray-200 py-2 px-1.5">
                            <HiX onClick={() => setOpen(false)} className='text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer ' />
                        </div>
                        <div className="p-2 flex items-center space-x-1 relative">
                            <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"></span>
                            <img src={post?.profileImg} alt="" className="h-11 w-11 rounded-full mr-4" />
                            <h4 className="font-bold sm:text-[16px] text-[15px] truncate">{post?.name}</h4>
                            <span className="text-sm sm:text-[15px] truncate">@{post?.username}</span>
                        </div>
                        <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">{post?.text}</p>
                        <div className="flex p-3 space-x-3">
                            <img src={session.user.image} alt="" className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95" />
                            <div className="w-full divide-y divide-gray-200">
                                <div>
                                    <textarea name="" onChange={(e)=> setInput(e.target.value)} id="" className='w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 placeholder:text-gray-500 resize-none' placeholder='Whats happening' rows="2" value={input}></textarea>
                                    <div className="flex items-center justify-end pt-2.5">
                                        <button disabled={input.trim() === ''} className="bg-blue-400 text-white px-4 p-1.5 rounded-full font-bold shadow-md hover:backdrop-brightness-95 disabled:opacity-50">Reply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}