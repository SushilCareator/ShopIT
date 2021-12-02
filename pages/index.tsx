import { MongoClient } from "mongodb";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";
import SideBar from "../components/Sidebar";
import styles from "../styles/Home.module.css";
import { getCsrfToken, getSession, useSession } from "next-auth/react";

type Props = {
    proucts: [];
};

const Home: React.FC<Props> = ({ proucts }) => {
    const { data: session } = useSession();
    console.log(session, "session");
    // console.log(proucts);

    return (
        <>
            {/* <div style={{ display: "flex", flexWrap: "wrap" }}> */}
            <Header />
            {/* <div style={{ display: "flex", flexWrap: "wrap" }}> */}
            <SideBar proucts={proucts} />
            {/* </div> */}

            {/* </div> */}
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const logindetails = await getSession();
    console.log(logindetails, "login with details");
    const csrfToken = await getCsrfToken();
    console.log(csrfToken, "login with details cref");

    // const {db} = await connectTo

    const client = await MongoClient.connect(
        "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/shopit?retryWrites=true&w=majority"
    );

    const db = client.db();
    const collection = db.collection("products");

    const result = await collection.find().toArray();

    // console.log(result);

    // client.close();

    // res.status("200").json({ message: "Added Data" });

    return {
        props: {
            proucts: result.map((data) => ({
                id: data._id.toString(),
                title: data.title,
                price: data.price,
                description: data.description,
                category: data.category,
                image: data.image,
                rating: data.rating,
            })),
        },
        revalidate: 1,
    };
};

export default Home;
