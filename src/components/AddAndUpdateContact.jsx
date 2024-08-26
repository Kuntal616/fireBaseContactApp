/* eslint-disable react/prop-types */

import { ErrorMessage, Field, Form, Formik } from 'formik'
import Modal from './Modal'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../configs/Firebase'
import { toast } from 'react-toastify'
import * as Yup from "yup";//for any null data does not send database

const contactSehemaValidation = Yup.object().shape({
  name:Yup.string().required("Name is required"),
  email:Yup.string().email("Invaild Email").required("Email is required"),

})

function AddAndUpdateContact({ isOpen,onClose,isUpdate,contact}) {

  const addContact=async(contact)=>{
    
    try {
      const contactRef=collection(db,"contacts")
      await addDoc (contactRef,contact);

      onClose();
      toast.success("Contact Added successfully")
    } catch (error) {
      console.log(error);
    }
  }
  const updateContact=async(contact,id)=>{
    
    try {
      const contactRef=doc(db,"contacts",id)
      await updateDoc (contactRef,contact);
      onClose();
      toast.success("Contact Updated successfully")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div >
       <Modal isOpen={isOpen} onClose={onClose} >
        <Formik
        validationSchema={contactSehemaValidation}

        initialValues={isUpdate ? 
        {
          name:contact.name,
          email:contact.email,
        }:
        {
          name:"",
          email:"",
        }}
        onSubmit={(value)=>{
          // console.log(value)
          isUpdate ?
          updateContact(value,contact.id) :
          addContact(value);
        }}
        >
          <Form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1 p-2'>
              <label htmlFor="name">Name</label>
            <Field name="name" className="border h-10" />
            <div className='text-red-500 text-xs'>
              <ErrorMessage name="name"/>
            </div>
            </div>
            <div className='flex flex-col gap-1 p-2'>
              <label htmlFor="email">Email</label>
            <Field  name="email" className="border h-10" />
            <div className='text-red-500 text-xs'>
              <ErrorMessage name="email"/>
            </div>
            </div>
            <button className='bg-orange px-3 py-1.5 border mb-2 mr-2 self-end '>
              {isUpdate?"Update":"Add"} Contact
            </button>
          </Form> 
        </Formik>
       </Modal>
    </div>
  )
}

export default AddAndUpdateContact