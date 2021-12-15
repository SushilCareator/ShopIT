import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../styles/UserList.module.css";

type Props = {
    users: [{ [key: string]: any }];
};

const UserList: React.FC<Props> = ({ users }) => {
    const route = useRouter();

    const disableUser = async (id: string) => {
        console.log(id);
        const response = await fetch("/api/user/disable", {
            method: "POST",
            body: JSON.stringify({
                userId: id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data);
        if (data.message !== "") {
            route.push("/admin", "/admin", { scroll: false });
        }
    };

    return (
        <>
            <div className={styles.body}>
                <div className={`${styles.product} ${styles.listHead}`}>
                    <div className={`${styles.attribute} ${styles.id}`}>Id</div>
                    <div className={`${styles.attribute} ${styles.name}`}>
                        Name
                    </div>
                    <div className={`${styles.attribute} ${styles.email}`}>
                        Email
                    </div>
                    <div className={`${styles.attribute} ${styles.role}`}>
                        Role
                    </div>
                    <div
                        className={`${styles.attribute} ${styles.disable}`}
                        style={{ border: "none" }}
                    >
                        Active
                    </div>
                </div>
                {users.map((item, index: number) => (
                    <div
                        className={`${styles.product} ${
                            index % 2 == 1 ? null : styles.background
                        }`}
                        key={index}
                    >
                        <div className={`${styles.attribute} ${styles.id} `}>
                            {item.id}
                        </div>
                        <div className={`${styles.attribute} ${styles.name}`}>
                            {item.name}
                        </div>
                        <div className={`${styles.attribute} ${styles.email}`}>
                            {item.email}
                        </div>

                        <div className={`${styles.attribute} ${styles.role}`}>
                            {item.role}
                        </div>

                        <div
                            className={`${styles.attribute} ${styles.disable} ${
                                item.isActive == null || item.isActive == false
                                    ? styles.red
                                    : styles.green
                            }`}
                            onClick={() => disableUser(item.id as string)}
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

export default UserList;
