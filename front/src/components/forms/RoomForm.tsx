"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputFeild";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreateRoomSchema, createRoomSchema } from "@/schema/chatSchema";


export interface RoomFormProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const RoomForm = ({setOpen}:RoomFormProps) => {
    
   
    return (
        <form className="flex flex-col gap-8">
            
        </form>
    );
}

export default RoomForm;