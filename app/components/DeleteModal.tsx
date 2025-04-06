'use client';
import React from "react";
import { Flex, Button, Box } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DeleteModalProps {
  setDeleteClicked: (value: boolean) => void,
  setEditClicked: (value: boolean) => void,
  params: { issueId: string }
}

const DeleteModal: React.FC<DeleteModalProps> = ({ params, setDeleteClicked, setEditClicked }) => {
  
  const router = useRouter();

  const handleDeleteClick = async () => {
    try{
      const response = await axios.delete(`/api/issues/${params.issueId}`);
      if(response.data){
        setDeleteClicked(true);
        setEditClicked(false);
        router.push('/issues');
      }
    }catch(error){
      console.log("Error occured >> ", error);
    }
  };
  
  return (
    <Flex direction="column" gap="5" align="center" justify="between" className="h-40 w-fil p-8 bg-white rounded-md shadow-md">
      {/* <Dialog.Title>Delete Issue <RiDeleteBin5Line/> </Dialog.Title> */}
      <Box className=" text-sm font-bold text-gray-800 flex items-center">
        Are you sure you want to delete this issue? This action cannot be
        undone.
      </Box>
      <Box as="div" style={{display:'flex', justifyContent:'space-evenly'}} className="mt-4 w-full flex items-center justify-self-between">
        <Button onClick={() => setDeleteClicked(false)} style={{cursor:'pointer', borderRadius:'5px', padding:'.3rem'}} color="red" variant="soft"> Cancel</Button>

        <Button onClick={handleDeleteClick} style={{cursor:'pointer', borderRadius:'5px', padding:'.3rem'}} color="green" variant="soft">Confirm</Button>
      </Box>
    </Flex>
  );
};

export default DeleteModal;
