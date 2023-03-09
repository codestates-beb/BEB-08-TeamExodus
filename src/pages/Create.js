import styled from "styled-components";
import Web3 from "web3";
import erc721abi from "../erc721abi";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled.div`
  padding: 50px 200px;
  margin-top: 50px;

  background-color: pink;
  display: flex;
  font-size: 25px;

  flex-direction: column;
  align-items: center;
`;

const FormBox = styled.div`
  width: 600px;
  height: 100%;
`;

const Title = styled.div`
  font-size: 70px;
  font-weight: 600;
  margin-bottom: 50px;
`;

const InputBox = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  margin-bottom: 15px;
  font-weight: 550;
`;

const Input = styled.input`
  border-radius: 10px;
  height: 50px;
  border: 2px solid grey;
  opacity: 0.8;
  padding: 5px 5px;
  ::placeholder {
    align-content: center;
    padding-left: 10px;
  }
`;

const Button = styled.div`
  width: 100px;
  height: 50px;
  font-size: 18px;
  border-radius: 20px;
  background-color: aliceblue;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Create() {
    const [newErc721addr, setNewErc721Addr] = useState();
    const [newTitle, setTitle] = useState();
    const [newArtist, setArtist] = useState();
    const [newDesc, setDesc] = useState();
    const [web3, setWeb3] = useState();
    const [account, setAccount] = useState("");
    // 컨트랙트 주소 하드코딩 - 테스트용으로 수정 필요
    const contractAddr = "0x66BA8423CA77AaDE79ce269FB14A52DeD6532b83"
    
    const addNewErc721Token = async () => {
        // const tokenContract = await new web3.eth.Contract(
        //     erc721abi,
        //     newErc721addr
        // );
        const tokenContract = await new web3.eth.Contract(
            erc721abi,
            contractAddr
        );
        // const name = await tokenContract.methods.name().call();
        // const symbol = await tokenContract.methods.symbol().call();
        const TotalSupply = await tokenContract.methods.TotalSupply().call();
        // const ownerOf = await tokenContract.methods.ownerOf(1).call();
        try{

            const tokenURI1 = await tokenContract.methods.tokenURI(1).call();
            const tokenURI2 = await tokenContract.methods.tokenURI(2).call();
            // const tokenURI3 = await tokenContract.methods.tokenURI(0).call();
            console.log(tokenURI1, tokenURI2)

        } catch(e){
            console.log(e)
        }


        // const currentAddr = localStorage.getItem("isLoggedIn")
        const currentAddr = "0x520186f00a0409a8aeb47337989727cefe69bbc2" // 김진호 메타마스크 지갑
        const jsonAddr = "https://files.mybox.naver.com/.fileLink/MA5tGzPkA6f9R%2F0vvuqT7VtrovZVRZsAInCD%2F%2FxVDxo5YlEdryIle30gHfP4kvU702dF5qDoU8fVyNv%2FmwMmJgQ%3D/subinchoi.json?authtoken=m8xYnEv4d5LXFobzV%2FUhzQI%3D"
        console.log(setTitle)

        try{
            const mintNFT = await tokenContract.methods.mintNFT(
                currentAddr,
                jsonAddr,
                newTitle,
                newArtist,
                newDesc).send({from:currentAddr, gas: 0xf4240})
            
            console.log(mintNFT)
            
        }
     
        catch (e) {
            console.log(e)
        }


        // console.log("tokenContract: ", tokenContract);
        // console.log("ownerOf: ", ownerOf);
        // console.log("name: ", name);
        // console.log("symbol: ", symbol);
        // console.log("tokenURI: ", tokenURI);
        console.log("totalSupply: ", TotalSupply);
        
    };

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            // window.ethereum이 있다면
            try {
                const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
                setWeb3(web);
            } catch (err) {
                console.log(err);
            }
        }
    }, []);
    



  return (
    <Container>
      <FormBox>
        <Title>Create New NFT</Title>
        <InputBox>
          <Label>Image, Video, Audio or 3D Model **** </Label>
          <Input
            type="text"
            placeholder="Find Directory..."/>
        </InputBox>
        <InputBox>
          <Label>Title</Label>
          <Input 
          type="text"
          placeholder="Item Name" 
          onChange={(e) => {
            setTitle(e.target.value);
        }} />
        </InputBox>
        <InputBox>
          <Label>Artist </Label>
          <Input 
          type="text"
          placeholder="Item Name"
          onChange={(e)=>{
            setArtist(e.target.value);
          }} />
        </InputBox>
        <InputBox>
          <Label>Description</Label>
          <Input 
            type="text"
            placeholder="Provide a detailed description of you item."
            onChange={(e)=>{
                setDesc(e.target.value);
            }} />
        </InputBox>
        {/* <InputBox>
          <Label>Name * </Label>
          <Input placeholder="Item Name" />
        </InputBox> */}
        {/* <InputBox>
          <Label>External Link</Label>
          <Input placeholder="https://yoursite.io/item/123" />
        </InputBox> */}
        {/* <InputBox>
          <Label>Collection</Label>
          <Input placeholder="Select Collection" />
        </InputBox> */}
        {/* <InputBox>
          <Label>Blockchain</Label>
          <Input placeholder="here" />
        </InputBox> */}
        <Button onClick={addNewErc721Token}>Create</Button>
      </FormBox>
    </Container>
  );
}

export default Create;
