import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults';

const FullReportDetailsCard = () => {

    const {id} = useParams()
    const [report, setReport] = useState({});
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        const handleMount = async () => {
            try{
                const { data: reportData } = await axiosReq.get(`/reports/${id}`);
                const {data: postData} = await axiosReq.get(`/posts/${reportData.post}`)
                console.log("REPORT DATA: ",reportData)
                console.log("POST DATA: ",postData)
                console.log("POST DATA ID: ",postData.id)
                setReport({ ...reportData, post: postData });
                console.log("REPORT:",report)
            } catch(err){
                console.log(err)
            }
        }
        
        handleMount()
    }, [id])


  return (
    <div>
    REPORT
    </div>
  )
}

export default FullReportDetailsCard