import React ,{useState}from 'react'
import MainPageLayout from "../Components/MainPageLayout"
import {getApi} from "../misc/config";
const Home = () => {
    const [input, setinput] = useState('');
    const [results, setresults] = useState(null);
    const onSearchValue =()=>{
        getApi(`/search/shows?q=${input}`)
        .then(result=>{
            setresults(result)
        })
    }
   
   const  onChangeValue =(ev)=>{
        setinput(ev.target.value);

    }
    const onKeyDown =(ev)=>{
        if(ev.keyCode===13){
            onSearchValue();
        }
    }
   const resultRender =()=>{
    if(results && results.length===0){
        return <div>No results</div>

    }
    if(results && results.length>0){
        return (
            <div>
                {
                    results.map(item=>(<div key={item.show.id}>{item.show.name}</div>))
                }
            </div>
        )

    }
    return null;
   }
  return <MainPageLayout>
    <input type="text" onChange={onChangeValue} value={input} onKeyDown ={onKeyDown}/>
    <button type="text" onClick={onSearchValue}>Search</button>
    {resultRender()};
  </MainPageLayout>
    
}

export default Home