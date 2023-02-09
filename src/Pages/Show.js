import React,{useReducer,useEffect} from 'react';
import  ShowMainData from  "../Components/show/ShowMainData";
import  Details from "../Components/show/Details";
import  Seasons from "../Components/show/Seasons";
import  Cast  from "../Components/show/Cast";
import {ShowPageWrapper,InfoBlock} from "./Show.styled"

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
            isMounted=false;
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
    <ShowPageWrapper>
        <ShowMainData 
        name={show.name}
        image={show.image}
        rating={show.rating}
        tags={show.genres}
        summary={show.summary}

        />
        <InfoBlock>
            <h2>Details</h2>
            <Details
            network={show.network}
            premiered ={show.premiered}
            status={show.status}
             />
        </InfoBlock>
        <InfoBlock>
            <h2>Seasons</h2>
            <Seasons 
            seasons={show._embedded.seasons}

            />
        </InfoBlock>
        <InfoBlock>
            <h2>Cast</h2>
            <Cast 
            cast={show._embedded.cast}
            />
        </InfoBlock>
    </ShowPageWrapper>

  )
}

export default Show