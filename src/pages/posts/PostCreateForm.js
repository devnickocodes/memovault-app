import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import uploadImage from "../../assets/upload_image_placeholder.jpg";

import styles from "../../styles/PostCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css"
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

function PostCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    image: ''
  })

  const {title, content, image} = postData

  const handleChange = (event) => {
    setPostData({
        ...postData,
        [event.target.name]: event.target.value
    })
  }


  const handleChangeImage = (event) => {
    if  (event.target.files.length){
        URL.revokeObjectURL(image)
        setPostData({
            ...postData,
            image: URL.createObjectURL(event.target.files[0])
        })
    }
  }



  return (
    <Form>
      <Container
        className={`${styles.Container} d-flex flex-column align-items-center`}
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6} className="text-center">
            <Form.Group className="text-center">
                {image ? (
                    <>
                    <figure>
                        <Image className={appStyles.Image} src={image} rounded/>
                    </figure>
                    <div>
                        <Form.Label className={`${btnStyles.Button} btn`} htmlFor="image-upload">
                        Change the image
                        </Form.Label>
                    </div>
                    </>
                ) : (
                    <Form.Label
                className="d-flex justify-content-center mt-3"
                htmlFor="image-upload"
              >
                <Asset
                  src={uploadImage}
                  message="Click or tap to upload an image"
                  width="100%"
                  height="auto"
                />
              </Form.Label>
                )}
              
              <Form.File className={styles.hiddenFileInput} id="image-upload" accept="image/*" onChange={handleChangeImage}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="title" className="mt-3 text-center">
              <Form.Label className={styles.inputLabels}>Title</Form.Label>
              <Form.Control type="text" name="title" value={title} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form.Group controlId="content" className="mt-3 text-center">
              <Form.Label className={styles.inputLabels}>Content</Form.Label>
              <Form.Control as="textarea" rows={6} name="content" value={content} onChange={handleChange}/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="w-100 justify-content-center mt-3">
          <Col xs={12} md={8} lg={6} className="d-flex justify-content-center">
            <Button
              className={`${btnStyles.GreyButton} ${btnStyles.Button} mr-2`}
              onClick={() => {}}
            >
              Cancel
            </Button>
            <Button className={btnStyles.Button} type="submit">
              Create
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default PostCreateForm;
