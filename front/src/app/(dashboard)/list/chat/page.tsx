"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import { DataTable } from '@/components/DataTable';
import { dummyData } from '@/resources/DummyData';
import { columns } from '@/components/DataColumns';

export interface ChatPageProps {

}

const ChatPage = () => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 flex-col m-4 mt-0">
      <div className="flex items-center justify-between m-4">
        <h1 className="text-lg font-semibold">All Chatings</h1>
        <p className="hidden md:block text-muted-foreground">
          Here&apos; You can see the list of chats!
        </p>
      </div>
      <DataTable data={dummyData} columns={columns} />
    </div>
  );
}

export default ChatPage;