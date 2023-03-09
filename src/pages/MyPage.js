import styled from "styled-components";
import backImageSrc from "../img/jesus.jpg";
import { faLink, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Row, RowName, RowPic, RowPics } from "../styles";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const BackImage = styled.img`
    width: 100%;
    height: 470px;
    background-color: pink;
    background-position: center;
    opacity: 0.9;
`;

const ProfileImg = styled.div`
    top: 300px;
    position: absolute;
    width: 250px;
    border: 10px solid white;
    height: 250px;
    margin-left: 70px;
    background-color: pink;

    border-radius: 50%;
`;

const Profile = styled.div`
    margin-top: 70px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 60px;
    padding: 50px;
    font-weight: 600;
`;

const ProfileName = styled.div``;

const Icon = styled.span`
    margin-left: 25px;
    font-size: 40px;
`;

function MyPage() {
    const [newErc721addr, setNewErc721Addr] = useState();
    return (
        <Container>
            <BackImage src={backImageSrc} />
            <ProfileImg />
            <Profile>
                <ProfileName>Young Joo</ProfileName>
                <div>
                    <Icon>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </Icon>
                    <Icon>
                        <FontAwesomeIcon icon={faLink} />
                    </Icon>
                </div>
            </Profile>
            <Row>
                <RowName>My Own NFTs</RowName>
                <RowPics>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <RowPic key={i} />
                    ))}
                </RowPics>
            </Row>
            <Row>
                <RowName>My Minted NFTs</RowName>
                <RowPics>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <RowPic key={i} />
                    ))}
                </RowPics>
            </Row>
        </Container>
    );
}

export default MyPage;
