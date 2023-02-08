import React ,{useState}from 'react'
import MainPageLayout from "../Components/MainPageLayout"
const Home = () => {
    const [input, setinput] = useState('');
    const onSearchValue =()=>{
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
        .then(r=>r.json())
        .then(result=>{
            console.log(result);
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
   
  return <MainPageLayout>
    <input type="text" onChange={onChangeValue} value={input} onKeyDown ={onKeyDown}/>
    <button type="text" onClick={onSearchValue}>Search</button>
  </MainPageLayout>
    
}

export default Home