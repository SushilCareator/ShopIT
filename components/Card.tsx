import {
    faExpand,
    faHeart,
    faPlus,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Image from "next/image";
import styles from "./card.module.css";
import ImageSlider from "./ImageSlider";
import { useRouter } from "next/dist/client/router";

type Props = {
    products: [];
};

const Card: React.FC<Props> = ({ products }) => {
    const route = useRouter();

    const cardClick = (id: string) => {
        route.push(`/product/${id}`);
    };

    return (
        <>
            <div className={styles.mainWrapper}>
                <ImageSlider />

                <div
                    style={{ display: "flex", width: "100%", flexWrap: "wrap" }}
                >
                    {products.map((data: any, index: number) => (
                        <div
                            className={styles.cardImageMain}
                            key={index}
                            onClick={() => {
                                cardClick(data.id);
                            }}
                        >
                            <div className={styles.imageMain}>
                                <Image
                                    className={styles.image}
                                    src={data.image}
                                    alt={"test"}
                                    layout="responsive"
                                    width={1600}
                                    height={1600}
                                    loading="eager"
                                    // layout="fill"
                                    // width="50%"
                                    // height="50%"
                                    objectFit="contain"
                                />
                                <div className={styles.cardIconMain}>
                                    <FontAwesomeIcon
                                        icon={faShoppingCart}
                                        className={styles.cardIcon}
                                    />
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        className={styles.cardIcon}
                                    />
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className={styles.cardIcon}
                                    />
                                    <FontAwesomeIcon
                                        icon={faExpand}
                                        className={styles.cardIcon}
                                    />
                                </div>
                                <div className={styles.ratingMain}>
                                    <p className={styles.rating}>
                                        {data.rating.rate}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className={styles.productTitle}>
                                    {data.title}
                                </p>
                                <div className={styles.price}>
                                    <p className={styles.offPrice}>
                                        ${data.price + " "}
                                    </p>
                                    <p className={styles.realPrice}>
                                        ${data.price}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Card;
