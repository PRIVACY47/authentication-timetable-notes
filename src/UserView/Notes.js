import React,{useEffect, useReducer} from 'react'
import AxiosInstance from '../Helpers/AxiosInstance'
function Notes() {
  const [state,Dispatch] = useReducer(
    
    (state,action)=>{
      switch(action.type){
        case 'querry':
          return {...state,...action}
        case 'notes':
          return {...state,...action}
        default :
          return {...state}
      }
    }
    ,
    {
      querry:'',
      notes:[]
    }
    )

    useEffect(()=>{
      AxiosInstance.get("/notes")
        .then((response) => {
          Dispatch({type:'notes',notes:response.data.notes})
        })
        .catch((error) => {
          console.error(error);
        });
    },[])
 
  return (
    <div>
    <input onChange={(e)=>{Dispatch({type:'querry', querry:e.target.value})}}></input>
    {
      state.notes.filter((subject)=>{
        if(subject.subjectName.toLowerCase().includes(state.querry.toLowerCase()))
          return subject
      }).map((subject,index)=>{
        return(
        <div key={index}>
        <p>{subject.subjectName} </p>
        <p>{subject.regulation} </p>
        <p>{subject.semister} </p>
        {
          subject.units.map((unit,index)=>{
            return (<p key={index}>

              <a href={`${unit.Link}`}>{unit.unitName}</a>
              
            </p>)
          })
        }
        </div>
        )
      })
    }
    </div>

  )
}

export default Notes