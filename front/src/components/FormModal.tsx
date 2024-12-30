"use client";

import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";

const RoomForm = dynamic(()=> import("./forms/RoomForm"),{
    loading: () => <h1>Loading...</h1>
})

const form: {
    [key:string]: (setOpen: Dispatch<SetStateAction<boolean>>)=> JSX.Element
} = {
    chatroom: (setOpen) => (
        <RoomForm
        setOpen={setOpen} />
    )
}