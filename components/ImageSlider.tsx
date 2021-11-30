import React, { useEffect, useState } from "react";
import { SlideImage } from "../constant/constant";
import Image from "next/image";
import styles from "./imageSlide.module.css";
import {
    faChevronLeft,
    faChevronRight,
    faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {};

const ImageSlider: React.FC<Props> = ({}) => {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            if (SlideImage.length - 1 > slideIndex) {
                setSlideIndex(slideIndex + 1);
                console.log(slideIndex);
            } else {
                setSlideIndex(0);
                console.log(slideIndex);
            }
        }, 10000);

        return () => clearInterval(id);
    }, [slideIndex]);

    const arrowLeftClick = () => {
        if (slideIndex === 0) {
            setSlideIndex(SlideImage.length - 1);
            console.log(slideIndex);
        } else {
            setSlideIndex(slideIndex - 1);
            console.log(slideIndex);
        }
    };

    const arrowRightClick = () => {
        if (slideIndex === SlideImage.length - 1) {
            setSlideIndex(0);
            console.log(slideIndex);
        } else {
            setSlideIndex(slideIndex + 1);
            console.log(slideIndex);
        }
    };

    const iconDotClicked = (indexValue: number) => {
        console.log(indexValue);
        setSlideIndex(indexValue);
    };

    return (
        <>
            <div className={styles.imageSlide}>
                <div className={styles.imageMain}>
                    <div
                        onClick={arrowLeftClick}
                        className={styles.leftIconMain}
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className={styles.slideLeftArrowIcon}
                            onClick={arrowLeftClick}
                        />
                    </div>
                    <div className={styles.slideDotIconMain}>
                        {SlideImage.map((data: any, index: number) => {
                            if (index === slideIndex) {
                                return (
                                    <FontAwesomeIcon
                                        key={index}
                                        className={styles.slideDotIcon}
                                        icon={faCircle}
                                        onClick={() => {
                                            iconDotClicked(index);
                                        }}
                                        style={{ fontSize: "13px" }}
                                    />
                                );
                            } else {
                                return (
                                    <FontAwesomeIcon
                                        key={index}
                                        className={styles.slideDotIcon}
                                        icon={faCircle}
                                        onClick={() => {
                                            iconDotClicked(index);
                                        }}
                                    />
                                );
                            }
                        })}
                    </div>

                    <Image
                        src={SlideImage[slideIndex].image}
                        alt={SlideImage[slideIndex].name}
                        layout="fill"
                        loading="lazy"
                    />

                    <div
                        onClick={arrowRightClick}
                        className={styles.leftIconMain}
                    >
                        <FontAwesomeIcon
                            className={styles.slideRightArrowIcon}
                            icon={faChevronRight}
                            onClick={arrowRightClick}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageSlider;
