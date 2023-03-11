import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const FooterWrapper = styled.div`
    background-color: #2d2d32;
    margin-top: 20px;
    width: 100%;
`;
const FooterPadding = styled.div`
    padding: 4rem 4rem;
    display: flex;
    flex-direction: column;
`;
const FooterLinks = styled.div`
    display: flex;
    justify-content: space-between;
    align-items; flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    text-align: left;
    margin-bottom: 2rem;
`;
const FooterLinksDiv = styled.div`
    width: 150px;
    margin: 1rem;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    color: white;
`;
const Link = styled.a`
    color: rgb(175, 175, 179);
    text-decoration: none;
`;
const Socialmedia = styled.div`
    display: flex;
    flex-direction: row;
`;
const Img = styled.div`
    width: 80%;
    font-size: 25px;
`;
const H4 = styled.h4`
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 0.9rem;
`;
const P = styled.p`
    font-size: 12px;
    line-height: 15px;
    margin: 0.5rem 0;
    cursor: pointer;
`;
const FooterBelow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0.2rem;
`;
const FooterBelowLinks = styled.div`
    display: flex;
    flex-direction: row;
`;
const BelowP = styled.p`
    font-size: 13px;
    line-height: 15px;
    margin-left: 2rem;
    color: white;
    font-weight: 600;
`;
const Hr = styled.hr`
    color: white !important;
    width: 100%;
`;
const FooterCopyrightP = styled.div`
    font-size: 13px;
    line-height: 15px;
    color: rgba(255, 255, 255);
    font-weight: 600;
`;

function Footer() {
    return (
        <FooterWrapper className="footer">
            <FooterPadding className="sb__footer section__padding">
                <FooterLinks className="sb__footer-links">
                    <FooterLinksDiv className="sb__footer-links_div">
                        <H4>For Business</H4>
                        <Link>
                            <P>Employer</P>
                        </Link>
                        <Link>
                            <P>Health Plan</P>
                        </Link>
                        <Link>
                            <P>Individual</P>
                        </Link>
                    </FooterLinksDiv>

                    <FooterLinksDiv className="sb__footer-links_div">
                        <H4>Resources</H4>
                        <Link>
                            <P>resource center</P>
                        </Link>
                        <Link>
                            <P>Testimonials</P>
                        </Link>
                        <Link>
                            <P>STV</P>
                        </Link>
                    </FooterLinksDiv>

                    <FooterLinksDiv className="sb__footer-links_div">
                        <H4>Partners</H4>
                        <Link>
                            <P>Swing Tech</P>
                        </Link>
                    </FooterLinksDiv>
                    <FooterLinksDiv className="sb__footer-links_div">
                        <H4>Company</H4>
                        <Link>
                            <P>About</P>
                        </Link>
                        <Link>
                            <P>Prress</P>
                        </Link>
                        <Link>
                            <P>Career</P>
                        </Link>
                        <Link>
                            <P>Contact</P>
                        </Link>
                    </FooterLinksDiv>
                    <FooterLinksDiv className="sb__footer-links_div">
                        <H4>Coming Soon on</H4>
                        <Socialmedia className="socialmedia">
                            <Img>
                                <FontAwesomeIcon icon={faFacebook} />
                            </Img>
                            <Img>
                                <FontAwesomeIcon icon={faTwitter} />
                            </Img>
                            <Img>
                                <FontAwesomeIcon icon={faLinkedin} />
                            </Img>
                            <Img>
                                <FontAwesomeIcon icon={faInstagram} />
                            </Img>
                        </Socialmedia>
                    </FooterLinksDiv>
                </FooterLinks>
                <Hr></Hr>
                <FooterBelow className="sb__footer-below">
                    <div className="sb__footer-copyright">
                        <FooterCopyrightP>
                            Copyrightⓒ {new Date().getFullYear()} ExodusInc. All
                            right reserved.
                        </FooterCopyrightP>
                    </div>
                    <FooterBelowLinks className="sb__footer-below-links">
                        <Link>
                            <div>
                                <BelowP>Terms &Conditions</BelowP>
                            </div>
                        </Link>
                        <Link>
                            <div>
                                <BelowP>Privacy</BelowP>
                            </div>
                        </Link>
                        <Link>
                            <div>
                                <BelowP>Security</BelowP>
                            </div>
                        </Link>
                        <Link>
                            <div>
                                <BelowP>Cookie Declaration</BelowP>
                            </div>
                        </Link>
                    </FooterBelowLinks>
                </FooterBelow>
            </FooterPadding>
        </FooterWrapper>
    );
}

export default Footer;
