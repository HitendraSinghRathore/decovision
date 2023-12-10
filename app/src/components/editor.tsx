import { useEffect, useRef } from "react"

export default function EditorComponent(props:any) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let down = false;
    const prevPoint = useRef<any>(null);
    useEffect(() => {
        const current:any =  canvasRef.current;
        const context:any = current.getContext('2d');
        if(props.image) {
            renderImage(context,props.image);
        } 
    },[props.image]);
    useEffect(() => {
        if(props.editMode) {
          
            const handler = (e:MouseEvent) => {
                if(!down) return;
                const currentPoint = computePointInCanvas(e);
                const ctx = canvasRef.current?.getContext('2d');
                if(!ctx || !currentPoint) {
                    return;
                }
                drawLine(prevPoint.current,currentPoint,ctx);
                prevPoint.current = currentPoint;
            }
            const computePointInCanvas = (e:MouseEvent) => {
                const canvas = canvasRef.current;
                if(!canvas) {
                    return;
                }
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                return {x,y};
            }
            canvasRef.current?.addEventListener('mousemove', handler);
            window.addEventListener('mouseup',mouseUp);
            return () =>  {
                canvasRef.current?.removeEventListener('mousemove',handler);
                window.removeEventListener('mouseup',mouseUp);
            }
                
        }
    },[props.editMode])
    const mouseDown = () => {
        down = true;
    }
    const mouseUp =() => {
        down = false;
    } 

    const renderImage = (context:CanvasRenderingContext2D, image:HTMLImageElement) => {
        const canvas:HTMLCanvasElement = canvasRef.current as HTMLCanvasElement;
       
        canvas.height = image.height;
        canvas.width = image.width;
        context.drawImage(image,  canvas.width / 2 - image.width / 2,canvas.height / 2 - image.height / 2);
    }
    const drawLine = (prevPoint: any, currentPoint:any,ctx:CanvasRenderingContext2D) => {
       
        let startPoint = prevPoint ?? currentPoint;
        ctx.beginPath();
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'white';
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(currentPoint.x, currentPoint.y);
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(startPoint.x,startPoint.y, 4, 0, 4 * Math.PI );
        ctx.fill();
    }
    const resetDrawing  =() => {
        const current:any =  canvasRef.current;
        const context:any = current.getContext('2d');
        prevPoint.current = null;
        props.reset();

        renderImage(context,props.orignalImage);
    }
    const toggleEdit = (value:boolean) => {
        if(!value) {
            //update the image with the mask
            const canvas:HTMLCanvasElement =  canvasRef.current as HTMLCanvasElement;
            const imgUrl = canvas.toDataURL("image/png");
            const blob = dataURLtoBlob(imgUrl);
            const img = new Image();
            img.src = imgUrl;
            //updated image set
            props.setImage(img,blob);
        }
        props.setEditMode(value);
        
    }
    const dataURLtoBlob = (dataURL:string) => {
        // Convert base64 to raw binary data
        const byteString = atob(dataURL.split(',')[1]);
      
        // Get the MIME type
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      
        // Create an array buffer
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const intArray = new Uint8Array(arrayBuffer);
      
        // Write the bytes of the string to the array buffer
        for (let i = 0; i < byteString.length; i++) {
          intArray[i] = byteString.charCodeAt(i);
        }
      
        // Create a blob
        return new Blob([arrayBuffer], { type: mimeString });
      }

    return (
        <div className="w-full">
            <div className={`p-4 flex justify-between`}>
                <div className={`flex gap-3`}>
                    <button className="bg-brandBlue px-4 py-2 rounded text-sm shadow" onClick={() => toggleEdit(!props.editMode)}>{props.editMode ? 'Done' : 'Edit'}</button>
                    <button className="bg-success px-4 py-2 rounded text-sm shadow" onClick={resetDrawing}>Undo</button>
                </div>
                <div>
                <button className="bg-accent px-4 py-2 rounded text-sm shadow" onClick={props.resetAll}>Reset</button>
                </div>
            </div>
            <div className="w-full mx-auto border-2 border-borderLight">
            <canvas ref={canvasRef} width={500} height={200} onMouseDown={mouseDown} className="mx-auto" ></canvas>
            </div>
          
        </div>
    )
}