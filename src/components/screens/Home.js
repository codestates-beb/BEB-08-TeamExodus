import Header from "../Header";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
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
  background-color: black;
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
  const [index, setIndex] = useState(0);
  const increaseIndex = () => setIndex((prev) => prev + 1);
  const nfts = new Array(20).fill(0);
  return (
    <Container>
      <Header />
      <WelcomeWords onClick={increaseIndex}>
        <span>Welcome to the 3rd Generation NFT Market</span>
        <span>EXODUS</span>
      </WelcomeWords>
      <Slider onClick={increaseIndex}>
        <AnimatePresence>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {[1, 2, 3, 4].map((i) => (
              <Box key={i}>{i}</Box>
            ))}
          </Row>
        </AnimatePresence>
      </Slider>
      <ListTitle>Trending in Arts</ListTitle>
      <Lists>
        {nfts.map((i) => (
          <List key={i}>{i}</List>
        ))}
      </Lists>
    </Container>
  );
}

export default Home;
