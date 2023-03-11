import styled from "styled-components";
import backImageSrc from "../img/jesus.jpg";
import { faLink, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {
    LoadingContainer,
    Row,
    RowName,
    RowPic,
    RowPics,
    override,
} from "../styles";
import Web3 from "web3";
import erc721abi from "../erc721abi";
import { NftImg, NftName } from "./Market";
import PulseLoader from "react-spinners/PulseLoader";
import Detail from "../components/Detail";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 200px;
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
    const [web3, setWeb3] = useState(new Web3(window.ethereum));
    const [nftList, setNftList] = useState([]);
    const [loading, setLoading] = useState(true);
    let contractAddr = "0x0DcF7226741313910935048A5ddAF110c6146526";

    const userAddr = localStorage.getItem("isLoggedIn");

    useEffect(() => {
        /*     if (typeof window.ethereum !== "undefined") {
      // window.ethereum이 있다면
      try {
        const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
        setWeb3(web);

        getNftsByUser();
      } catch (err) {
      }
    } */
        getNftsByUser();
        setLoading(false);
    }, []);

    const getNftsByUser = async () => {
        const tokenContract = await new web3.eth.Contract(
            erc721abi,
            contractAddr
        );

        const totalSupply = await tokenContract.methods.TotalSupply().call();

        let temp = [];
        for (let i = 1; i <= totalSupply - 1; i++) {
            const nftinfo = await tokenContract.methods.nftinfo(i).call();
            temp.push(nftinfo);
        }

        setNftList(temp);
    };

    // 모달 창
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState("");
    const handleNftClicked = (nft) => {
        const { name, description, tokenURI: image_url } = nft;
        const nft2 = { name, description, image_url };
        setModalVisible(true);
        setModalData(nft2);
    };

    return (
        <Container>
            <BackImage src={backImageSrc} />
            <ProfileImg />
            <Profile>
                <ProfileName>
                    {localStorage.getItem("isLoggedIn") == ""
                        ? ""
                        : localStorage.getItem("isLoggedIn")}
                </ProfileName>
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
                {loading ? (
                    <LoadingContainer>
                        <PulseLoader
                            color={"#36d7b7"}
                            loading={loading}
                            cssOverride={override}
                            style={{ marginTop: "150px" }}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            speedMultiplier={1}
                        />
                    </LoadingContainer>
                ) : (
                    <RowPics>
                        {nftList?.map((i, idx) => (
                            <RowPic
                                key={idx}
                                style={{ backgroundColor: "beige" }}
                                onClick={() => handleNftClicked(i)}
                            >
                                <NftImg src={i.tokenURI} />
                                <NftName>{i.title}</NftName>
                            </RowPic>
                        ))}
                    </RowPics>
                )}
            </Row>
            {modalVisible && (
                <Detail
                    modalData={modalData}
                    setModalVisible={setModalVisible}
                />
            )}
        </Container>
    );
}

export default MyPage;
