import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";
import styles from "../styles/Home.module.css";

type Props = {};

const Home: React.FC<Props> = ({}) => {
    return (
        <>
            <Header />
            <ImageSlider />
            <h1>Home Page</h1>
        </>
    );
};

export default Home;
