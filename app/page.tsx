'use client'
import { Montserrat } from "next/font/google";
import Header from "./src/components/header";
import { useEffect, useState } from "react";
import RoomSelector from "./src/components/room";
import ImageComponent from "./src/components/image-component";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';
 const montersat = Montserrat({
  subsets: ['latin'],
  weight:['400','700',],
  variable: '--font-nunito'
})


export default function Home() {

  const [roomType, setRoomType] = useState('livingroom');
  const [mask, setMask] = useState<File|Blob>();
  const [image, setImage] = useState<File>();
  const [valid, setValid] = useState(false);
  const [loader, setLoader] = useState(false);
  const [dropdown, setDropdown] = useState<string[]>(['sofa', 'table']);
  const [types, setTypes] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('brown');
  const [type, setType] = useState('');

  const makeApiCall = () => {
    setLoader(true);
    const formData = new FormData();
    formData.append('original', image as any); // Append image file
    formData.append('masked', mask as any); // Append mask file
    formData.append('type', type); // Append type
    formData.append('room', roomType); // Append room
    formData.append('color', color); // Append color
    formData.append('category', category);
    fetch('http://localhost:8080/image', {
      method: 'POST',
      body: formData,
      }).then(response => response.json()).then(response => {
        response?.data.forEach((item:any) => {
          window.open(item.url, '_blank')
        });
        setLoader(false);
      }).catch(err => {
        console.log(err)
        toast.error('Something went wrong')
        setLoader(false);
      })
  };
  const reset = (value:boolean) => {
    if(value) {
      setValid(false);
    }
  }
  const colors = ['red', 'green', 'black','beige', 'blue','brown'];
  const updateRoomType = (value:string) => {
    setCategory('');
    setColor('');
    setType('');

    if(value === 'bedroom') {
      setDropdown(['sofa', 'bed']);
    } else {
      setDropdown(['sofa', 'table']);
    }
    setRoomType(value);
  }
  useEffect(() => {
    if( mask && image && roomType && color && type && category) {
      setValid(true);
    } else {
      setValid(false);
    }
  },[mask,image,roomType,color,type,category])

  const updateCat = (value:string) => {
    setType('');
    if(value === 'sofa') {
      setTypes(['L shaped', 'Sectional', 'Divan', 'Futon', 'Cabriole' ])
    }else if(value === 'bed') {
      setTypes(['Queen size', 'King Size', 'Double Deck'])
    } else {
      setTypes(['Coffee Table', 'Center Table'])
    }
    
    setCategory(value);
  }

  const roomTypes = [{
    name:'Living Room',
    value: 'livingroom'
  },
  {
    name:'Bedroom',
    value: 'bedroom'
  }];
  return (
    <>
    <Header disabled={!valid || loader} generate={makeApiCall} loader={loader}></Header>
    <main className={`${montersat.className} mx-4 lg:mx-6  my-8`}>
      <div className="mb-6">
      <RoomSelector current={roomType} onClick={updateRoomType} roomTypes={roomTypes} />
      </div>
      <div className="mb-6 bg-dark3 rounded shadow p-4">
        <div className="mb-4 flex gap-8 items-center" >
          <div>
        <label className="text-sm">Product</label>
          <div className="mt-2">
            <select placeholder="select product" className="rounded border border-indigo-500 w-48 bg-darkLight text-gray-100 text-xs p-2" value={category} onChange={(item) => updateCat(item.target.value)}>
              <option>Select</option>
              {dropdown.map(item => (
                <option key={item} value={item}>{item}</option>
              )
              )}
            </select>
          </div>
        </div>
        <div>
        <label className="text-sm">Type</label>
          <div className="mt-2">
            <select className="rounded border border-indigo-500 w-48 bg-darkLight text-gray-100 text-xs p-2" value={type} onChange={(item) => setType(item.target.value)}>
            <option>Select</option>
              {types.map(item => (
                <option key={item} value={item}>{item}</option>
              )
              )}
            </select>
          </div>
        </div>
        <div >
          <div className="mb-2">Colors</div>
          <div className="flex gap-2 align-middle">
            {colors.map(col => (<div className={`w-8 h-8 rounded-full border-4 shadow border-borderLight cursor-pointer ${col ===color ? 'border-brandBlue': ''}`} style={{background: col}} key={col} onClick={() => setColor(col)}></div>))}
            </div>
        </div>
        </div>
      </div>
      <div className={`mb-6`} >
      <ImageComponent setMask={setMask} setImage={setImage} reset={reset}></ImageComponent>
      </div>
    </main>
    <ToastContainer theme="dark"/>
    </>
  )
}
