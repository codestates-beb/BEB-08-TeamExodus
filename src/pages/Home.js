import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import { Col, LoadingContainer, override, RowPic } from "../styles";
import Detail from "../components/Detail";
import PulseLoader from "react-spinners/PulseLoader";
import { NftImg, NftBox, ColLists, NftName } from "./Market";

const WelcomeWords = styled.div`
    // background-color: #00214d;
    // background-color: #202020;
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
    background-color: white;
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
    margin-top: 250px;
    font-size: 60px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: 600;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 30px;
    margin-right: 30px;
`;

const PagenationBox = styled.div`
    margin-top: 60px;
    margin-bottom: 50px;
`;

const FixedColLists = styled(ColLists)`
    grid-template-columns: repeat(5, 1fr);
`;
const Wallpaper = styled.div`
    width: 100%;
    height: 1000px;
    padding: 30px;
    background: linear-gradient(black, white);
    font-color: white;
`;
const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif/1200px-Animated_Wallpaper_Windows_10_-_Wallpaper_Engine.gif");
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 40px;
`;

function Home() {
    // 슬라이더
    const sliderItem = new Array(21).fill().map((arr, i) => i + 1);
    const sliderOffset = 4;
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const increaseIndex = () => {
        if (leaving) return;
        toggleLeaving();
        const totalSliderItem = sliderItem.length - 1;
        const maxIndex = Math.ceil(totalSliderItem / sliderOffset);
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    };

    // NFT 페이지
    // const nfts = new Array(300).fill().map((arr, i) => i + 1);
    const [nfts, setNfts] = useState([]); //
    const [loading, setLoading] = useState(false);
    const options = { method: "GET", headers: { accept: "application/json" } };
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [nftsPerPage, setNftsPerPage] = useState(20); // 페이지당 NFT 수
    // 현재 nft
    const indexOfLastNft = currentPage * nftsPerPage;
    const indexOfFirstNft = indexOfLastNft - nftsPerPage;
    const currentNfts = nfts.slice(indexOfFirstNft, indexOfLastNft);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        setLoading(true);
        let result = [];
        const options = {
            method: "GET",
            headers: { accept: "application/json" },
        };
        fetch(
            "https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings?limit=50",
            options
        )
            .then((response) => response.json())
            .then((response) => {
                let prev = [];
                response.orders.map((el) => {
                    const current_price =
                        el.current_price / 10000000000000000000;
                    const { image_url, name, description } =
                        el.maker_asset_bundle.assets[0];
                    prev.push({ image_url, name, description, current_price });

                    /* result.push({ image_url, name, description });
                        result.push({ image_url, name, description });
                        result.push({ image_url, name, description });
                        result.push({ image_url, name, description });
                        result.push({ image_url, name, description }); */
                    // openSea tesnet APi에서 제공해주는 데이터 limit50 하드코딩
                });
                result = result
                    .concat(prev)
                    .concat(prev)
                    .concat(prev)
                    .concat(prev);
                setNfts(result);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    // 모달 창
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState("");
    const handleNftClicked = (nft) => {
        console.log(nft);
        setModalVisible(true);
        setModalData(nft);
    };
    return (
        <Container>
            <Wallpaper>
                <WelcomeWords>
                    <span>Welcome to the 3rd Generation NFT Market</span>
                    <span>EXODUS</span>
                </WelcomeWords>
                <ImageContainer />
            </Wallpaper>
            aaaaaaaaaaaaaaaaaaaa
            {/* <Slider onClick={increaseIndex}>
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
                                <Box key={i}>{}</Box>
                            ))}
                    </Row>
                </AnimatePresence>
            </Slider> */}
            <ListTitle>Trending in Arts</ListTitle>
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
                <ListContainer>
                    <Col
                        style={{
                            width: "100%",
                            margin: 0,
                            marginTop: "30px",
                            height: 1800,
                        }}
                    >
                        <FixedColLists>
                            {currentNfts?.map((i, idx) => (
                                <NftBox
                                    key={idx}
                                    onClick={() => handleNftClicked(i)}
                                >
                                    <NftImg src={i.image_url} />
                                    <NftName>{i.name}</NftName>
                                </NftBox>
                            ))}
                        </FixedColLists>
                    </Col>
                    <PagenationBox>
                        <Pagination
                            nftsPerPage={nftsPerPage}
                            totalNfts={nfts.length}
                            paginate={paginate}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </PagenationBox>
                </ListContainer>
            )}
            {modalVisible && (
                <Detail
                    modalData={modalData}
                    setModalVisible={setModalVisible}
                />
            )}
        </Container>
    );
}

export default Home;
