import { useEffect } from "react";
import { useState } from "react";
import Web3 from "web3";
import erc721abi from "../erc721abi";

function Test() {
    const [newErc721addr, setNewErc721Addr] = useState();
    const [web3, setWeb3] = useState();
    const [account, setAccount] = useState("");

    const addNewErc721Token = async () => {
        const tokenContract = await new web3.eth.Contract(
            erc721abi,
            newErc721addr
        );
        const name = await tokenContract.methods.name().call();
        const symbol = await tokenContract.methods.symbol().call();
        const totalSupply = await tokenContract.methods.TotalSupply().call();
        const ownerOf = await tokenContract.methods.ownerOf(1).call();
        const tokenURI = await tokenContract.methods.tokenURI(1).call();

        console.log("tokenContract: ", tokenContract);
        console.log("ownerOf: ", ownerOf);
        console.log("name: ", name);
        console.log("symbol: ", symbol);
        console.log("tokenURI: ", tokenURI);
        console.log("totalSupply: ", totalSupply);
    };
    const connectWallet = async () => {
        let accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
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
        <div className="App">
            <button
                className="metaConnect"
                onClick={() => {
                    connectWallet();
                }}
            >
                connect to MetaMask
            </button>
            <div className="userInfo">주소: {account}</div>
            <div className="newErc721">
                <input
                    type="text"
                    onChange={(e) => {
                        setNewErc721Addr(e.target.value); // 입력받을 때마다 newErc721addr 갱신
                    }}
                ></input>
                <button onClick={addNewErc721Token}>add new erc721</button>
            </div>
        </div>
    );
}

export default Test;
