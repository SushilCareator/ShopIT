import React from "react";
import styles from "../styles/sidebar.module.css";
import Card from "./Card";
type Props = {
    proucts: [];
};

const SideBar: React.FC<Props> = ({ proucts }) => {
    return (
        <>
            <div className={styles.sideBarHome}>
                <div className={styles.sideBar}>
                    {/* <input type="dropdown" /> */}
                </div>
                <Card products={proucts} />
            </div>
        </>
    );
};

export default SideBar;
