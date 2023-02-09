import React,{useState,useEffect} from 'react'
import  {useParams} from "react-router-dom";
import { getApi } from "../misc/config";

const Show = () => {
    const {id} = useParams();
    const [show, setshow] = useState(null)
    const [isLoading, setisLoading] = useState(true);
    const [error, seterror] = useState(null);
    useEffect(() => {
        let isMounted =true;
        getApi(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(result=>{
                if(isMounted){
                    setshow(result);
                    setisLoading(false);

                }
        }).catch((err)=>{
            if(isMounted){
                seterror(err.message);
                setisLoading(false);

            }
        })
        return ()=>{
            isMounted(false)
        }

     
    }, [id])
    if(isLoading){
        return <div>Data  is being loaded</div>
    }
    if(error){
        return <div>Error occurred: {error}</div>
    }
    
   
  return (
    <div>Show page</div>
  )
}

export default Show