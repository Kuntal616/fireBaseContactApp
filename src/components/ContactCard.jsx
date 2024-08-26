/* eslint-disable react/prop-types */
import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { IoMdTrash } from 'react-icons/io'
import { RiEditCircleLine } from 'react-icons/ri'
import { db } from '../configs/Firebase'
import AddAndUpdateContact from './AddAndUpdateContact'
import DisClouse from '../Hooks/DisClouse'
import { toast } from 'react-toastify'

const ContactCard = ({ contact }) => {

  const {isOpen,onClose,onOpen}=DisClouse();
  const deleteContact=async(id)=>{
    try {
      await deleteDoc(doc(db,"contacts",id))
      toast.success("Contact Deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
   
    <div className=" bg-yellow flex justify-between items-center p-2 rounded-lg" key={contact.id}>
      <div className="flex gap-1">
    <HiOutlineUserCircle className="text-4xl text-orange" />
    <div className="">
      <h2 className="font-medium">{contact.name}</h2>
      <p className="text-sm">{contact.email} </p>
    </div>
    </div>
    <div className="flex text-3xl">
      <RiEditCircleLine onClick={onOpen} className=' cursor-pointer'/>
      <IoMdTrash onClick={()=>deleteContact(contact.id)} className="text-orange cursor-pointer"/>
    </div>
      </div>
      <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
       </>
  )
}

export default ContactCard