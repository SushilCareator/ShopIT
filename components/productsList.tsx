import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../styles/ProductList.module.css";

type Props = {
    products: [{ [key: string]: any }];
};

const ProductsList: React.FC<Props> = ({ products }) => {
    const route = useRouter();
    const totalStar = [0];
    const totalStars = [0, 1, 2, 3, 4];

    const disableProduct = async (id: string) => {
        console.log(id);
        const response = await fetch("/api/product/update", {
            method: "POST",
            body: JSON.stringify({
                productId: id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data);
        if (data.message !== "") {
            // route.push("/admin");
            route.push("/admin", "/admin", { scroll: false });
        }
    };

    const drawStars = (stars: number) => {
        if (stars > 1) {
            stars = stars - 1;
            console.log(stars, "-1");

            return (
                <FontAwesomeIcon
                    icon={faStar}
                    className="fab"
                    style={{ color: "orange" }}
                />
            );
        } else if (stars > 0.5) {
            stars = stars - 0.5;
            console.log(stars, "-0.5");

            return (
                <FontAwesomeIcon
                    icon={faStarHalfAlt}
                    className="fab"
                    style={{ color: "orange" }}
                />
            );
        } else {
            console.log(stars, "-0.0");

            return <FontAwesomeIcon icon={faStar} className="fab" />;
        }
    };

    return (
        <>
            <div className={styles.body}>
                <div className={`${styles.product} ${styles.listHead}`}>
                    <div className={`${styles.attribute} ${styles.id}`}>Id</div>
                    <div className={`${styles.attribute} ${styles.title}`}>
                        Name
                    </div>
                    <div className={`${styles.attribute} ${styles.category}`}>
                        Category
                    </div>
                    <div className={`${styles.attribute} ${styles.rate}`}>
                        Rate / Count
                    </div>
                    <div className={`${styles.attribute} ${styles.price}`}>
                        Price
                    </div>
                    <div
                        className={`${styles.attribute} ${styles.disable}`}
                        style={{ border: "none" }}
                    >
                        Active
                    </div>
                </div>
                {products.map((item, index: number) => (
                    <div
                        className={`${styles.product} ${
                            index % 2 == 1 ? null : styles.background
                        }`}
                        key={index}
                    >
                        <div className={`${styles.attribute} ${styles.id}`}>
                            {item.id}
                        </div>
                        <div className={`${styles.attribute} ${styles.title}`}>
                            {item.title}
                        </div>
                        <div
                            className={`${styles.attribute} ${styles.category}`}
                        >
                            {item.category}
                        </div>
                        <div
                            className={`${styles.attribute} ${styles.rate}`}
                            title={item.rating.rate}
                        >
                            {totalStar.map(() => {
                                let stars = JSON.parse(
                                    JSON.stringify(JSON.parse(item.rating.rate))
                                );
                                return totalStars.map((data, index: number) => {
                                    if (stars >= 1) {
                                        stars = stars - 1;
                                        return (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className="fab"
                                                style={{ color: "orange" }}
                                                key={index}
                                            />
                                        );
                                    } else if (stars >= 0.5) {
                                        stars = stars - 0.5;
                                        return (
                                            <FontAwesomeIcon
                                                icon={faStarHalfAlt}
                                                className="fab"
                                                style={{ color: "orange" }}
                                                key={index}
                                            />
                                        );
                                    } else {
                                        stars = stars - 1;
                                        return (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className="fab"
                                                key={index}
                                            />
                                        );
                                    }
                                });
                            })}
                            {item.rating.rate} ({item.rating.count})
                        </div>
                        <div className={`${styles.attribute} ${styles.price}`}>
                            Rs: {item.price}
                        </div>
                        <div
                            className={`${styles.attribute} ${styles.disable} ${
                                item.isActive == null || item.isActive == false
                                    ? styles.red
                                    : styles.green
                            }`}
                            onClick={() => disableProduct(item.id as string)}
                        >
                            {item.isActive == null || item.isActive == false
                                ? "InActive"
                                : "Active"}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductsList;
