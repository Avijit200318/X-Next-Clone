"use client";
import React from 'react'
import { HiOutlineChat } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";

export default function Icons() {
    return (
        <div>
            <div className="flex justify-start gap-5 p-2 text-gray-500">
                <HiOutlineChat className='text-[2.5rem] cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />
                <HiOutlineHeart className='text-[2.5rem] cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-red-100' />
                <HiOutlineTrash className='text-[2.4rem] cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-red-100' />
            </div>
        </div>
    )
}
