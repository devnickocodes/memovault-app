import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults';
import Asset from '../../components/Asset';
import { Alert, Button, Card } from 'react-bootstrap';
import navStyles from "../../styles/NavBar.module.css"
import styles from "../../styles/FullReportDetailsCard.module.css"
import btnStyles from "../../styles/Button.module.css"

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
        <Card className={styles.Card}>
            <Card.Body>
                {!loaded ? (
                    <Asset spinner />
                ) : error ? (
                    <Alert>{error}</Alert>
                ) : (
                    <>
                       <Card.Title className={`${styles.cardTitle} ${navStyles.Logo} ${styles.Bold} mb-4`}>Full Report <span>Details</span></Card.Title>
                       <Card.Subtitle className={`${styles.cardSubtitle} mb-3`}>Reason for report: </Card.Subtitle>
                       <Card.Text className={styles.cardText}>{report?.reason}</Card.Text>
                       <Card.Subtitle className={`${styles.cardSubtitle} mb-3`}>Additional Reason: </Card.Subtitle>
                       <Card.Text className={styles.cardText}>{report?.custom_reason}</Card.Text>
                       <Card.Subtitle className={`${styles.cardSubtitle} mb-3`}>Reported Post Title: </Card.Subtitle>
                       <Card.Text className={styles.cardText}>{report?.post?.title}</Card.Text>
                       <Card.Subtitle className={`${styles.cardSubtitle} mb-3`}>Reported Post Content: </Card.Subtitle>
                       <Card.Text className={styles.cardText}>{report?.post?.content}</Card.Text>
                       <Card.Subtitle className={`text-muted mb-3`}>Reported Issued On: {report?.updated_at}</Card.Subtitle>
                       <Link>
                        <Button className={btnStyles.Button}>Go To Post</Button>
                       </Link>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};
export default FullReportDetailsCard