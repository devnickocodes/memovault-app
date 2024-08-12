import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import PopularProfilesMostPosts from "./PopularProfilesMostPosts";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { Image } from "react-bootstrap";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  const {id} = useParams()
  const setProfileData = useSetProfileData()
  const {profileData} = useProfileData()
  const pageProfile = profileData?.pageProfile
  const profile = pageProfile?.results[0]


  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data: profileData } = await axiosReq.get(`/profiles/${id}/`);
            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {results: [profileData]}
            }))
            setHasLoaded(true);
        } catch(err) {
            console.log(err)
        }
    }
    fetchData()
  }, [id, setProfileData])

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image src={profile?.image} width={100} />
        </Col>
        <Col lg={6}>
          <p className="m-2">{profile?.owner}</p>
          <p className="m-2">{profile?.name}</p>
          <p className="m-2">{profile?.bio}</p>
          <p className="m-2">{profile?.hobbies}</p>
          <p>Profile stats</p>
        </Col>
        <Col lg={3} className="text-lg-right">
        <p>Follow button</p>
        </Col>
        <Col className="p-3">Profile content</Col>
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">Profile owner's posts</p>
      <hr />
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfilesMostPosts mobile />
        <Container>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfilesMostPosts />
      </Col>
    </Row>
  );
}

export default ProfilePage;