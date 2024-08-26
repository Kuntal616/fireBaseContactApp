import Navbar from "./components/Navbar"
import { FiSearch } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
// import { HiOutlineUserCircle } from "react-icons/hi2";
// import { IoMdTrash } from "react-icons/io";
// import { RiEditCircleLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import {collection, getDocs, onSnapshot } from 'firebase/firestore'
import {db} from './configs/Firebase'
import ContactCard from "./components/ContactCard"
import AddAndUpdateContact from "./components/AddAndUpdateContact"
import DisClouse from "./Hooks/DisClouse";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";

function App() {
  
  const [contacts , setContacts]=useState([]);
  // const [isOpen,setOpen]=useState(false);
  const {isOpen,onClose,onOpen} =DisClouse();

   



  useEffect(()=>{
    const getContact =async ()=>{
      try {
        const contactsRef = collection(db,"contacts");
        
        onSnapshot(contactsRef,(snapshot)=>{
           const contactLists = snapshot.docs.map((doc)=>{
          return {
            id:doc.id,
           ...doc.data() 
      }});
       setContacts(contactLists);
       return contactLists;
        });
       
      } catch (error) {
        console.log("error");
      }
    }
    getContact();
  },[])

  const filterContacts =(e)=>{
    const value =e.target.value;

    const contactsRef = collection(db,"contacts");
        
        onSnapshot(contactsRef,(snapshot)=>{
           const contactLists = snapshot.docs.map((doc)=>{
          return {
            id:doc.id,
           ...doc.data() 
      }});

      const filteredContacts = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))

       setContacts(filteredContacts);



       return filteredContacts;
        });


  }

  return (<>
  
 <div className=" mx-auto max-w-[370px] px-4">
  <Navbar/>
  <div className="flex gap-2">
  <div className="flex relative items-center flex-grow">
    <FiSearch className=" text-3xl text-white absolute ml-1"/>
    <input onChange={filterContacts} type="text" className=" flex-grow bg-transparent border border-white rounded-md h-10 text-white pl-9 "/>
  </div>
    <FaCirclePlus onClick={onOpen} className="text-4xl text-white cursor-pointer"/>
  
  </div>
  <div className="mt-4 flex flex-col gap-3">
    {
      contacts.length<=0 ?<NotFoundContact/>:
    contacts.map((contact)=>(<ContactCard key={contact.id} contact={contact}/>)
  )}
  </div>
 </div>
 <AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
 <ToastContainer position="bottom-center"/>
 </>
  )
}

export default App
