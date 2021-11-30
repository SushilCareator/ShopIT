import React from "react";
import { HeaderItem } from "../constant/constant";
import styles from "./header.module.css";
import Link from "next/link";

type Props = {};

const Header: React.FC<Props> = ({}) => {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.logoMain}>
                    <Link href="/">SHOPIT</Link>
                </div>

                <nav className={styles.navBar}>
                    <div className={styles.navItemMain}>
                        {HeaderItem.map((item, index) => (
                            <div key={index} className={styles.navItem}>
                                {item}
                            </div>
                        ))}
                        {/* <div className={styles.navItem}>WOMEN</div>
                        <div className={styles.navItem}>MEN</div>
                        <div className={styles.navItem}>BABY&KIDS</div>
                        <div className={styles.navItem}>SPECIAL</div>
                        <div className={styles.navItem}>CONTACTUS</div> */}
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
