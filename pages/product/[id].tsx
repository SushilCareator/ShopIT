import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/dist/client/router";
import React from "react";
import Image from "next/image";
import styles from "../../styles/Product.module.css";

type Props = {
    product: any;
};

const ProductDetail: React.FC<Props> = ({ product }) => {
    const router = useRouter();
    console.log(router);

    return (
        <>
            <div className={styles.productMain}>
                <div className={styles.imageMain}>
                    <Image
                        src={product.image}
                        layout="fill"
                        // width="50%"
                        // height="50%"
                        objectFit="contain"
                    />
                </div>
                <div className={styles.productData}>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <span>
                        {"Rating  "} {product.rating.rate}
                        {"                "}
                    </span>
                    ( {product.rating.count} ){" Reviews"}
                    <span></span>
                    <p>category: {product.category}</p>
                    <h3>Price {product.price}</h3>
                </div>
            </div>
        </>
    );
};

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/shopit?retryWrites=true&w=majority"
    );

    const result = await client
        .db()
        .collection("products")
        .distinct("_id", {}, {});

    console.log(result, "result");
    // Return a list of possible value for id
    return {
        paths: result.map((item) => ({
            params: { id: item.toString() },
        })),
        //  [
        //     { params: { id: "123" } },
        //     { params: { id: "61a243bba8c426e47a1cf70c" } },
        // ],
        fallback: false,
    };
}

export async function getStaticProps(context: any) {
    const route = await context.params.id;
    console.log(route, "route");

    const client = await MongoClient.connect(
        "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/shopit?retryWrites=true&w=majority"
    );

    const result = await client
        .db()
        .collection("products")
        .findOne({ _id: new ObjectId(route) });

    console.log(result);

    // client.close();
    // Fetch necessary data for the blog post using params.id
    return {
        props: {
            product: {
                id: result?._id.toString(),
                title: result?.title,
                price: result?.price,
                description: result?.description,
                category: result?.category,
                image: result?.image,
                rating: result?.rating,
            },
        },
        revalidate: 1,
    };
}

export default ProductDetail;
