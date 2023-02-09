import React,{useState,useEffect} from 'react'
import  {useParams} from "react-router-dom";
import { getApi } from "../misc/config";

const Show = () => {
    const {id} = useParams();
    const [show, setshow] = useState(null)
    useEffect(() => {
        getApi(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(result=>{
            setshow(result);
        })

     
    }, [id])
    console.log('show',show)
    
   
  return (
    <div>Show page</div>
  )
}

export default Show