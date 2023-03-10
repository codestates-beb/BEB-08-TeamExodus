import styled from "styled-components";
import { faRebel } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faWallet,
  faBolt,
  faSearch,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAnimation, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";

const SHeader = styled(motion.div)`
  z-index: 5;
  width: 100%;
  padding: 0px 40px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "white",
  },
};

const Wrapper = styled.div`
  padding: 10px 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 25px;
  margin-left: 15px;
  font-weight: 600;
`;

const LogoIcon = styled(Logo)`
  margin-left: 0px;
`;

const Icon = styled.span`
  margin-left: 25px;
  font-size: 25px;
`;

const Search = styled.div`
  background-color: #eae9ed;
  display: flex;

  border-radius: 10px;
  margin-left: 25px;
  width: 300px;
  height: 30px;

  justify-content: space-between;
  align-items: center;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const Nav = styled.nav``;

const Menu = styled(Icon)`
  font-size: 15px;
  font-weight: 600;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 5px 10px;
  ::placeholder {
    align-content: center;
    padding-left: 10px;
    font-size: 13px;
  }
`;

const WalletBtn = styled.div`
  background-color: black;
  font-weight: 600;
  font-size: 15px;
  color: white;
  padding: 15px 15px;
  border-radius: 9px;
  :hover {
    cursor: pointer;
  }
`;

function Header() {
  const headerAnimation = useAnimation();
  const { scrollY } = useScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 50) {
        headerAnimation.start("scroll");
      } else {
        headerAnimation.start("top");
      }
    });
  }, [scrollY, headerAnimation]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [web3, setWeb3] = useState();
  // localStorage로 로그인 여부 판단
  useEffect(() => {
    const loggedInAccount = localStorage.getItem("isLoggedIn");
    if (loggedInAccount !== "") {
      setIsLoggedIn(true);
      setAccount(loggedInAccount);
    }
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
  const [account, setAccount] = useState("");
  const connectWallet = async () => {
    await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((res) => {
        console.log(res);
        setAccount(res[0]);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", res[0]);
      })

      .catch((e) => console.log(e));
  };
  const signOut = () => {
    setAccount("");
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "");
  };
  return (
    <SHeader variants={navVariants} animate={headerAnimation} initial={"top"}>
      <Wrapper>
        <Column>
          <Link to="/">
            <LogoIcon>
              <FontAwesomeIcon
                icon={faRebel}
                color="rgba(0,0,0,23)"
                fontSize="45px"
              />
            </LogoIcon>
          </Link>
          <Link to="">
            <Logo>EXODUS</Logo>
          </Link>

          <Search>
            <SearchBox>
              <SearchBar placeholder="Search NFT..." />
            </SearchBox>
            <SearchBox margin-right="10px">
              <FontAwesomeIcon
                icon={faSearch}
                fontSize="15px"
                margin-right="10px"
              />
            </SearchBox>
          </Search>
          <Nav>
            <Link to="/market">
              <Menu>Market</Menu>
            </Link>

            <Link to="/create">
              <Menu>Create</Menu>
            </Link>
            <Menu>Drops</Menu>
          </Nav>
        </Column>
        {isLoggedIn ? (
          <Column>
            <Link to={`/users/:username`}>
              <Icon>
                <FontAwesomeIcon icon={faUser} />
              </Icon>
            </Link>
            <Icon>
              <FontAwesomeIcon icon={faWallet} />
            </Icon>
            <Icon>
              <FontAwesomeIcon
                onClick={() => {
                  signOut();
                }}
                icon={faSignOutAlt}
              />
            </Icon>
            <Icon>
              <FontAwesomeIcon icon={faBolt} />
            </Icon>
          </Column>
        ) : (
          <Column>
            <WalletBtn
              onClick={() => {
                connectWallet();
              }}
            >
              Connect Wallet
            </WalletBtn>
            <Icon>
              <FontAwesomeIcon icon={faBolt} />
            </Icon>
          </Column>
        )}
      </Wrapper>
    </SHeader>
  );
}

export default Header;
