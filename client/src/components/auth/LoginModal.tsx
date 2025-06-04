"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import React from 'react'
import { Button } from "../ui/button"

const LoginModal = () => {
  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button>Getting Start</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-3xl">Welcome Next Chat !!</DialogTitle>
      <DialogDescription>
      A chat app is a software application that enables users to communicate with each other through text messages, often in real-time. These apps provide a platform for instant messaging, group chats, and sometimes voice or video calls. 

      </DialogDescription>
    </DialogHeader>
    <Button variant="outline">
        <img 
        src="/images/google.png" 
        alt="google"
         className="mr-4 "
         height={25}
         width={25}
        />
        Continue with Google
    </Button>
  </DialogContent>
</Dialog>
  )
}

export default LoginModal