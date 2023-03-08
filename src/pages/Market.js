import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Row, RowName, RowPic, RowPics } from "./MyPage";

const Container = styled.div`
    margin-top: 100px;
`;

const TabBar = styled.div``;

const Img = styled.img`
    background-position: center;
    background-size: cover;
`;

function Market() {
    console.log("1");
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const result = [];
        const options = {
            method: "GET",
            headers: { accept: "application/json" },
        };
        fetch(
            "https://testnets-api.opensea.io/v2/orders/goerli/seaport/listings?limit=15",
            options
        )
            .then((response) => response.json())
            .then((response) => {
                response.orders.map((el) => {
                    const { image_url, name, description } =
                        el.maker_asset_bundle.assets[0];
                    // console.log("el: ", image_url, name, description);
                    console.log("el: ", el);
                    result.push({ image_url, name, description });
                    // setLists((prev) => [
                    //     ...prev,
                    //     { image_url, name, description },
                    // ]);
                    setLists(result);
                    setLoading((prev) => !prev);
                });
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <Container>
            <Row>
                <RowName>ARTS</RowName>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <RowPics>
                        {lists?.map((data) => (
                            <RowPic>
                                <Img src={data.image_url} />
                                <div>{data.name}</div>
                            </RowPic>
                        ))}
                    </RowPics>
                )}
            </Row>
        </Container>
    );
}

export default Market;
