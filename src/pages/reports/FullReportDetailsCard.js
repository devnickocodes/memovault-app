import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import { Alert, Button, Card } from 'react-bootstrap';

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
                setReport({ ...reportData, post: postData });
                setLoaded(true)
            } catch(err){
                setError("Sorry an error occurred. Please try again.")
            }
        }
        handleMount()
    }, [id])


    return (
        <Card>
            <Card.Body>
                {!loaded ? (
                    <Asset spinner />
                ) : error ? (
                    <Alert>{error}</Alert>
                ) : (
                    <>
                        <p>{report.post.title}</p>
                        <Link to={`/posts/${report.post.id}`}>POST</Link>
                        
                    </>
                )}
            </Card.Body>
        </Card>
    );
};
export default FullReportDetailsCard