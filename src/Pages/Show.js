import React,{useReducer,useEffect} from 'react'
import  {useParams} from "react-router-dom";
import { getApi } from "../misc/config";

 const initialState ={
    show:null,
    isLoading:true,
    error:null
 }
 const reducer =(prevState,action)=>{
    switch (action.type) {
        case 'Fetch_Success':{
            return {isLoading:false,error:null,show:action.show}
        }
        case 'Fetch_Failure':{
            return {...prevState,isLoading:false,error:action.error}
        }
    
    
        default:
            return prevState;
    }
 }

const Show = () => {
    const {id} = useParams();
   const [{isLoading,show,error},dispatch] = useReducer(reducer,initialState);
    // const [show, setshow] = useState(null)
    // const [isLoading, setisLoading] = useState(true);
    // const [error, seterror] = useState(null);
    useEffect(() => {
        let isMounted =true;
        getApi(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(result=>{
                if(isMounted){
                    dispatch({type:"Fetch_Success",show:result})
                   

                }
        }).catch((err)=>{
            if(isMounted){
                dispatch({type:"Fetch_Failure",error:err.message})
                

            }
        })
        return ()=>{
            isMounted(false)
        }

     
    }, [id])
    console.log('show',show)
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