import { useEffect } from "react"
import ApiFetching from "../../services/ApiFetching"
import { useDispatch, useSelector } from "react-redux"
import { setCvData } from "../../redux/slices/CvSlice"

const Library = () => {
    const dispatch=useDispatch()
    const data=useSelector(state=>state.CvSlice.getCvData)
    console.log(data,';asfasfd');
    useEffect(()=>{
        const getData=async ()=>{
            try {
                const response= await ApiFetching('GET','user/get',null)
                const data=response.data
                if(data.success===true){ 
                    console.log(response.data);
                    dispatch(setCvData(data.user))
                }
                
            } catch (error) {
                console.log(error,'afsasd');         
            }
            }
        getData()
     },[])
  return (<>
  <h1>Library</h1>
  </>)
}

export default Library
