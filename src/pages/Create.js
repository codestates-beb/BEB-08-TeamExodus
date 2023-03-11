import { useEffect, useState } from "react";
import styled from "styled-components";
import Web3 from "web3";
import erc721abi from "../erc721abi";

import { useForm } from "react-hook-form";
import Detail from "../components/Detail";
const BlackBox = styled.div`
    display: flex;
    flex: 1;
    background: linear-gradient(black, white);
    height: 100px;
`;
const Container = styled.div`
    padding: 50px 200px;
    margin-top: 50px;

    display: flex;
    font-size: 25px;

    flex-direction: column;
    align-items: center;
`;

const FormBox = styled.form`
    width: 600px;
    height: 100%;
    // background-color: beige;
    padding: 15px 15px;
    border-radius: 20px;
    border: 2px solid black;
    // background: linear-gradient(to top, grey, #ffffff);
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

const MintBtn = styled(Input)`
    background-color: #708090;
    color: #fafafa;
    font-weight: 600;
    :hover {
        cursor: pointer;
        scale: 1.15;
    }
`;

const AlertBox = styled.div`
    width: 1000px;
    height: 1000px;
`;

/* const AlertBox = styled.input`
  width: 100px;
  height: 50px;
  font-size: 18px;
  border-radius: 20px;
  background-color: aliceblue;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`; */

const AlertBtn = styled.div`
    background-color: aqua;
`;

function Create() {
    const [web3, setWeb3] = useState();
    const [mintedNft, setMintedNft] = useState();
    const [mintsuccess, setMintsuccess] = useState(false);

    let contractAddr = "0x0DcF7226741313910935048A5ddAF110c6146526";
    const userAddr = localStorage.getItem("isLoggedIn");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { title, artist, description, image_url = "" } = data;
        setMintedNft(data);
        const tokenContract = await new web3.eth.Contract(
            erc721abi,
            contractAddr
        );

        const mint = await tokenContract.methods
            .mintNFT(userAddr, image_url, title, artist, description)
            .send({ from: userAddr })
            .on("receipt", () => {});
        setMintsuccess(true);
    };

    useEffect(() => {
        setMintsuccess(false);
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
        <>
            <BlackBox />
            <Container>
                {mintsuccess && (
                    <Detail
                        modalData={mintedNft}
                        setModalVisible={setMintsuccess}
                    />
                )}

                <FormBox onSubmit={handleSubmit(onSubmit)}>
                    <Title>Create New NFT</Title>
                    <InputBox>
                        <Label> Title </Label>
                        <Input
                            placeholder="Title of your nft..."
                            {...register("title", { required: true })}
                        />
                    </InputBox>
                    <InputBox>
                        <Label> Artist Name </Label>
                        <Input
                            placeholder="Creater of your nft..."
                            {...register("artist", { required: true })}
                        />
                    </InputBox>
                    <InputBox>
                        <Label> Description </Label>
                        <Input
                            placeholder="Provide a detailed description of you item."
                            {...register("description", { required: true })}
                        />
                    </InputBox>
                    <InputBox>
                        <Label>Image URI</Label>
                        <Input
                            placeholder="Copy your NFT Image URI..."
                            {...register("image_url", { required: true })}
                        />
                    </InputBox>

                    <MintBtn type="submit" value={"Mint"} />
                </FormBox>
            </Container>
        </>
    );
}

export default Create;
