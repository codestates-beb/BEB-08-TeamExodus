import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Pagination from "../components/Pagination";

const WelcomeWords = styled.div`
    background-color: #00214d;
    margin-top: 100px;
    padding: 30px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: white;

    font-size: 40px;

    :span(:first-child) {
        font-size: 25px;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Slider = styled.div`
    padding: 20px;
    margin-top: 70px;
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
    position: absolute;
    width: 100%;
`;

const Box = styled(motion.div)`
    background-color: black;
    border-radius: 50px;
    height: 426px;
    color: red;
    font-size: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const rowVariants = {
    hidden: {
        x: window.outerWidth * 1.5,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.outerWidth * 1.5,
    },
};

const Lists = styled.div`
    display: grid;
    margin-top: 30px;
    height: 100%;
    height: auto;
    background-color: blue;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    font-size: 40px;
    color: black;
    margin-bottom: 120px;
`;

const List = styled.div`
    background-color: white;
    height: 250px;
    width: 1fr;
`;

const ListTitle = styled.div`
    margin-top: 600px;
    font-size: 60px;
    background-color: pink;
    font-weight: 600;
`;

function Home() {
    const sliderItem = new Array(21).fill().map((arr, i) => i + 1);
    const sliderOffset = 4;
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex = () => {
        if (leaving) return;
        toggleLeaving();
        const totalSliderItem = sliderItem.length - 1;
        const maxIndex = Math.ceil(totalSliderItem / sliderOffset);
        console.log("maxIndex: ", maxIndex);
        console.log("index: ", index);
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    };

    const nfts = new Array(351).fill().map((arr, i) => i + 1);
    const options = { method: "GET", headers: { accept: "application/json" } };
    const [currentPage, setCurrentPage] = useState(1);
    const [nftsPerPage, setNftsPerPage] = useState(10);

    fetch(
        "https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings?limit=10",
        options
    )
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));

    const toggleLeaving = () => setLeaving((prev) => !prev);
    // 현재 nft
    const indexOfLastNft = currentPage * nftsPerPage;
    const indexOfFirstNft = indexOfLastNft - nftsPerPage;
    const currentNfts = nfts.slice(indexOfFirstNft, indexOfLastNft);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <Container>
            <WelcomeWords onClick={increaseIndex}>
                <span>Welcome to the 3rd Generation NFT Market</span>
                <span>EXODUS</span>
            </WelcomeWords>
            <Slider onClick={increaseIndex}>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                    <Row
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: "tween", duration: 1 }}
                        key={index}
                    >
                        {sliderItem
                            .slice(
                                sliderOffset * index,
                                sliderOffset * index + sliderOffset
                            )
                            .map((i) => (
                                <Box key={i}>{i}</Box>
                            ))}
                    </Row>
                </AnimatePresence>
            </Slider>
            <ListTitle>Trending in Arts</ListTitle>
            <Lists>
                {currentNfts.map((i) => (
                    <List key={i}>{i}</List>
                ))}
            </Lists>
            <Pagination
                nftsPerPage={nftsPerPage}
                totalNfts={nfts.length}
                paginate={paginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </Container>
    );
}

export default Home;
