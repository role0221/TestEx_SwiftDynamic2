import { useEffect } from "react"
import List from "./List"


const Alert=({msg,type,setAlert,list})=>{
useEffect(()=>{
    const timeOut =setTimeout(()=>{
        setAlert({show:false,msg:'',type:''})
        // eslint-disable-next-line
    },3000)
    return()=>clearTimeout(timeOut)
},[list])
        return(
            <p className={`alert ${type}`}>{msg}</p>
        )
}
export default Alert