import { MongoClient } from "mongodb";
import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import ProductsList from "../../components/productsList";
import UserList from "../../components/userList";
import styles from "../../styles/Tab.module.css";

type Props = {
    products: [{ [key: string]: string }];
    users: [{ [key: string]: any }];
};

const Admin: React.FC<Props> = ({ products, users }) => {
    const [tabOpen, setTabOpen] = useState("product");
    const tabClicked = (tab: string) => {
        setTabOpen(tab);
    };

    return (
        <>
            <div className={styles.body}>
                <div className={styles.tabMain}>
                    <ul className={styles.ul}>
                        <li
                            className={`${styles.li} ${
                                tabOpen == "product" ? styles.active : null
                            }`}
                            onClick={() => {
                                tabClicked("product");
                            }}
                        >
                            Products
                        </li>
                        <li
                            className={`${styles.li} ${
                                tabOpen == "user" ? styles.active : null
                            }`}
                            onClick={() => {
                                tabClicked("user");
                            }}
                        >
                            Users
                        </li>
                    </ul>
                </div>
                <div
                    className={styles.tabContaner}
                    style={{
                        display: tabOpen == "product" ? "flex" : "none",
                    }}
                >
                    <ProductsList products={products} />
                </div>
                <div
                    style={{ display: tabOpen == "user" ? "flex" : "none" }}
                    className={styles.tabContaner}
                >
                    <UserList users={users} />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const loginDetails = await getSession();
    console.log(loginDetails, "login with details");

    console.log(loginDetails?.role, "user role");

    if (loginDetails?.role !== "admin") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    // const { data: session, status } = useSession();
    // console.log(session, "userSession");
    // console.log(session?.role, "userSessionRole");
    // console.log(status, "status");

    const client = await MongoClient.connect(
        "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/shopit?retryWrites=true&w=majority"
    );

    const db = client.db();
    const collection = db.collection("products");

    const product = await collection.find().toArray();

    const userCollection = db.collection("users");

    const user = await userCollection.find().toArray();

    // console.log(result);

    client.close();

    return {
        props: {
            products: product.map((data) => ({
                id: data._id.toString(),
                title: data.title,
                price: data.price,
                description: data.description,
                category: data.category,
                image: data.image,
                rating: data.rating,
                isActive: data.active == undefined ? null : data.active,
            })),
            users: user.map((data) => ({
                id: data._id.toString(),
                name: data.name,
                email: data.email,
                image: data.image == undefined ? null : data.image,
                role: data.role == undefined ? null : data.role,
                isActive: data.active == undefined ? null : data.active,
            })),
        },
        revalidate: 1,
    };
};

export default Admin;
