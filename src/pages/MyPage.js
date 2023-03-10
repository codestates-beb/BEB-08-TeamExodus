import styled from "styled-components";
import backImageSrc from "../img/jesus.jpg";
import { faLink, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Row, RowName, RowPic, RowPics } from "../styles";
import Web3 from "web3";
import erc721abi from "../erc721abi";

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
  const [web3, setWeb3] = useState();
  const [nftList, setNftList] = useState([]);
  let contractAddr = "0xc08F3536a11A72bcD25CbBc25192C4981C4E3E65";
  const userAddr = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      // window.ethereum이 있다면
      try {
        const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
        setWeb3(web);
        console.log("set web", web);

        getNftsByUser();
        console.log("why");
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const getNftsByUser = async () => {
    console.log("hi");
    const tokenContract = await new web3.eth.Contract(erc721abi, contractAddr);
    console.log("tlqkds");
    console.log(tokenContract);
    console.log("hi");
    console.log("Contract", tokenContract);

    const totalSupply = await tokenContract.methods.TotalSupply().call();
    console.log("totalSupply", totalSupply);
    let temp = [];

    for (let i = 1; i <= totalSupply; i++) {
      const nftinfo = await tokenContract.methods.getDescription(i).call();
      temp.push(nftinfo);

      /*         if(userAddr == getIssuer) {
            const tokenURI = await tokenContract.methods.tokenURI(i).call();
            const tokenURI = await tokenContract.methods.tokenURI(i).call();
            

        } */
    }
    console.log("제발 왜");
    setNftList(temp);
    console.log("nftList", nftList);
  };

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
      <div onClick={getNftsByUser}>fwejifoqjwefiwaejfaipoefj</div>
    </Container>
  );
}

export default MyPage;
