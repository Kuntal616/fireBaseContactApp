/* eslint-disable react/prop-types */

import { createPortal } from "react-dom"
import { AiOutlineClose } from "react-icons/ai"


function Modal( { onClose,isOpen,children }) {
  return createPortal(
   <>
   {isOpen && (
    <div  className=" grid place-items-center absolute top-0 z-40  backdrop-blur h-screen w-screen ">
    <div className=" relative z-50 m-auto  min-h-[200px] min-w-[358px] bg-white">
    <div className="flex justify-end">
        <AiOutlineClose onClick={onClose} className="text-2xl self-end"/>
    </div>
    {children}
     </div>
    
     
    </div>
   )}
   </>
  ,document.getElementById("modal-root"))
}

export default Modal