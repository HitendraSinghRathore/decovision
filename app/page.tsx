'use client'
import { Montserrat } from "next/font/google";
import Header from "./src/components/header";
import { useEffect, useState } from "react";
import RoomSelector from "./src/components/room";
import ImageComponent from "./src/components/image-component";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
 const montersat = Montserrat({
  subsets: ['latin'],
  weight:['400','700',],
  variable: '--font-nunito'
})


export default function Home() {

  const [roomType, setRoomType] = useState('livingRoom');
  const [prompt, setPrompt] = useState('');
  const [mask, setMask] = useState<File|Blob>();
  const [image, setImage] = useState<File>();
  const [valid, setValid] = useState(false);
  const [loader, setLoader] = useState(false);
  const makeApiCall = async () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    },5000)
  };
  const reset = (value:boolean) => {
    if(value) {
      setValid(false);
    }
  }
  const updateRoomType = (value:string) => {
    setRoomType(value);
  }
  useEffect(() => {
    if(prompt && mask && image && roomType) {
      setValid(true);
    } else {
      setValid(false);
    }
  },[prompt,mask,image,roomType])
  

  const roomTypes = [{
    name:'Living Room',
    value: 'livingRoom'
  },
  {
    name:'Dining Room',
    value: 'diningRoom'
  
  },
  {
    name:'Bedroom',
    value: 'bedroom'
  }]
  return (
    <>
    <Header disabled={!valid || loader} generate={makeApiCall} loader={loader}></Header>
    <main className={`${montersat.className} mx-4 lg:mx-6  my-8`}>
      <div className="mb-6">
      <RoomSelector current={roomType} onClick={updateRoomType} roomTypes={roomTypes} />
      </div>
      <div className={`mb-6`} >
      <ImageComponent setMask={setMask} setImage={setImage} reset={reset}></ImageComponent>
      </div>
        <textarea className={`bg-dark3 w-full rounded p-2 resize-none`} value={prompt} placeholder="Please enter your prompt...." rows={4} onInput={(event) => setPrompt(event.currentTarget.value)}></textarea>
    </main>
    <ToastContainer theme="dark"/>
    </>
  )
}
