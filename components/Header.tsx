import React from "react";
import { HeaderItem } from "../constant/constant";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";

type Props = {};

const Header: React.FC<Props> = ({}) => {
    const { data: session } = useSession();
    const route = useRouter();

    const signout = () => {
        signOut();
        route.push("/login");
    };

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
                    </div>
                    <div className={styles.logoutMain}>
                        <div className={styles.profileImageMain}>
                            <Image
                                src="/defaultProfile.png"
                                alt={"ProfilePic"}
                                layout="responsive"
                                width={300}
                                height={300}
                                loading="eager"
                                // layout="fill"
                                // width="50%"
                                // height="50%"
                                objectFit="contain"
                                className={styles.profileImage}
                            />
                        </div>
                        {session != null ? (
                            <button
                                onClick={signout}
                                className={styles.logoutButton}
                            >
                                Sign Out
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    route.push("/login");
                                }}
                                className={styles.logoutButton}
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
