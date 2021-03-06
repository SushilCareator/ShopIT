import { MongoClient } from "mongodb";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import React, { useEffect, useLayoutEffect } from "react";
import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import { getCsrfToken, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";

type Props = {
    proucts: [];
    // sessions:any
};

const Home: React.FC<Props> = ({ proucts }) => {
    const { data: session, status } = useSession();
    console.log(session, "session");
    console.log(status, "status");

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    // if (status === "unauthenticated") {
    //     return <p>Access Denied</p>;
    // }

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

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const logindetails = await getSession(context);
    console.log(logindetails, "login with details");
    const csrfToken = await getCsrfToken();
    console.log(csrfToken, "login with details cref");

    console.log(logindetails?.role, "user role");

    if (logindetails?.role === "admin") {
        return {
            redirect: {
                destination: "/admin",
                permanent: false,
            },
        };
    }

    // const {db} = await connectTo

    const client = await MongoClient.connect(
        "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/shopit?retryWrites=true&w=majority"
    );

    const db = client.db();
    const collection = db.collection("products");

    const result = await collection.find({ active: { $ne: false } }).toArray();

    // console.log(result);

    client.close();

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
            // sessions: await getSession(context),
        },
        // revalidate: 1,
    };
};

export default Home;
