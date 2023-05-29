import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
// image
import Bg from "../assets/images/bg.jpg";

function Home() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=4d024ecda1b363ba73da6e799ef23745`;
    const searchLocation = (e) => {
        e.preventDefault();
        axios
            .get(url)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                setLocation("");
            })
            .catch((error) => console.log(error));
    };
    return (
        <MainContainer>
            <ImageContainer>
                {" "}
                <img src={Bg} alt="background-img" />
            </ImageContainer>
            <SearchBox onSubmit={(e) => searchLocation(e)}>
                <Input
                    type="text"
                    placeholder="Search Location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </SearchBox>
            <Overlay>
                <TopContainer className="wrapper">
                    <Location>{data?.name}</Location>
                    {data?.main && <Temp>{data?.main?.temp.toFixed()} °F</Temp>}
                    {data?.weather && (
                        <Description>
                            {data?.weather[0]?.description}
                        </Description>
                    )}
                </TopContainer>
                <BottomContainer>
                    {data?.name !== undefined && (
                        <Items>
                            {" "}
                            <Item>
                                <Count>
                                    {data?.main?.feels_like.toFixed()} °F
                                </Count>
                                <Text>Feels Like</Text>
                            </Item>
                            <Item>
                                <Count>{data?.main?.humidity} %</Count>
                                <Text>Humidity</Text>
                            </Item>
                            <Item>
                                <Count>{data?.wind?.speed.toFixed()} MPH</Count>
                                <Text>Winds</Text>
                            </Item>
                        </Items>
                    )}
                </BottomContainer>
            </Overlay>
        </MainContainer>
    );
}
const MainContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
`;
const ImageContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    & img {
        height: 100%;
        object-fit: cover;
    }
`;
const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
`;
const TopContainer = styled.div`
    height: 70vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 60px;
`;
const SearchBox = styled.form`
    border-radius: 22px;
    background-color: transparent;
    border: 2px solid #d3cece;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
`;
const Input = styled.input`
    padding: 15px 20px;
    width: 400px;
    color: #d3cece;
    font-weight: bold;
    &::placeholder {
        color: #d3cece;
        font-weight: bold;
    }
`;
const Location = styled.div`
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
`;
const Temp = styled.div`
    color: #fff;
    font-size: 80px;
    font-weight: bold;
`;
const Description = styled.div`
    position: absolute;
    right: 40px;
    top: 50%;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    transform: translateY(-50%);
    /* transform-origin: 0 0; */
    transform: rotate(269deg);
`;
const BottomContainer = styled.div`
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Items = styled.div`
    padding: 30px 50px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 70px;
`;
const Item = styled.div``;
const Count = styled.p`
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;
const Text = styled.p`
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
`;
export default Home;
