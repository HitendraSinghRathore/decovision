'use client'
import { useEffect, useRef, useState } from "react";
import { useDropzone } from 'react-dropzone';
import Spinner from "./spinner";
import { toast } from 'react-toastify';
import EditorComponent from "./editor";
interface IImageComponent {

}
export default function ImageComponent(props:any) {
    const [orignalImgae, setOrignalImage] = useState<File>();
    const [orignalImg, setOrignalImg] = useState<HTMLElement>();
    const [image, setImage] = useState<HTMLElement>();
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        const fr = new FileReader();
        fr.onload = () => {
            const img = new Image();
            img.src = fr.result as string;
            setEditMode(true);
            setImage(img);
            setOrignalImg(img);
        }
        if (orignalImgae) {
            fr.readAsDataURL(orignalImgae);
        }
    }, [orignalImgae])
    const upload = (files: any) => {
        if (!files.length) {
            toast.error('Please upload a valid file');
            return;
        }
        props.setImage(files[0]);
        setOrignalImage(files[0]);
    }
    const { getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        maxFiles: 1,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],

        },
        onDrop: files => upload(files)
    });
    const updateEditMode = (value:boolean) => {
        //upadate from the editor
            if(!value) {
                //updated image set image 
                props.reset(false);
            }
        setEditMode(value);
    }
    const resetImage = () => {
       props.reset(true); //no mask
    }
    const setSaveImage = (img:HTMLElement,file:any) => {
        setImage(img);
        //update the blob as mask
        props.setMask(file);
    }
    const resetAll = () => {
        setEditMode(false);
        setOrignalImage(undefined);
        setOrignalImg(undefined);
        setImage(undefined);
        props.setImage(undefined)
        props.setMask(undefined);
    }

    return (
        <div className={`bg-dark4 w-full h-auto rounded-lg border-2 border-dark3 border-dashed`}>

            {orignalImgae ?
                <EditorComponent orignalImage={orignalImg} image={image} editMode={editMode} setEditMode={updateEditMode} setImage={setSaveImage} reset={resetImage} resetAll={resetAll}></EditorComponent> :
                <div className="h-auto w-full">
                    <section className="flex flex-col justify-center items-center relative">
                        <div {...getRootProps({ className: 'dropZone' })} className="w-full ">
                            <input {...getInputProps()} />
                            <div className={`${editMode || orignalImgae ? 'h-auto' : 'h-48'}`}></div>
                        </div>
                        <div className="absolute">
                            <p className="text-center py-2">Drop the image file to upload or</p>
                            <button onClick={open} className=" btn w-48 lg:w-64 mx-auto bg-brandBlue text-primaryWhite  text-base lg:text-lg p-2 rounded-md hover:opacity-75 active:opacity-50 shadow-sm">Click to upload image</button>
                        </div>
                    </section>
                </div>}

        </div>)
}