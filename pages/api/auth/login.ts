import { MongoClient } from "mongodb";
import { hashSync, compare, compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req: any, res: any) => {
    if (req.method === "POST") {
        const { password, email } = req.body;

        console.log(email);
        console.log(password);

        const client = await MongoClient.connect(
            "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/shopit?retryWrites=true&w=majority"
        );

        const db = client.db();
        const collection = db.collection("users");

        const userExist = await collection.findOne({ email });
        console.log(userExist?.hashPassword);

        if (userExist == null) {
            console.log("notexist");
            return res.status(403).json({ message: "user not exist" });
        } else {
            const matche = compareSync(password, userExist.hashPassword);
            console.log(matche);
            if (matche) {
                return res.status(200).json({
                    token: jwt.sign(
                        {
                            id: userExist._id.toString(),
                            name: userExist.name,
                            email: userExist.email,
                            role: userExist.role,
                        },
                        "nnQl-xv0w_Ik_CG8QOFw4B378MBwTo3xKX57ncSFnnmTerthScfr2kfysQ19UB677V2kBXcrshLXKl_cUNZvMXiyiQBz6u48phZuowQpo34IX8JJ_okAcoZ8Iaxt6mvvwlRaHmjamuyhQ9HJ_ndtQzR4CpUvTScFcIekaDKyD_Bi0SKubDYHeJNZUiNEgKGuPNrVDJ_QuLZHJvwNTeVhU0hqjhxcCRKYJ4GMWR17rLynLL7GIHyAErcakz3u3yvJ8TMgQimIvXsn54aEcZNiebSG0wCpqOK8cHt2KRY1DKOh_-eIsdoK-rE0W3MY5DHJ_V-8CmNBxu4Ol03GdlaBmQ",
                        { expiresIn: "5m" }
                    ),
                });
            } else {
                return res.status(401).json({ message: "wrong credentials " });
            }
            console.log("exist");
        }

        // console.log("userdata", result);
        // console.log(password, email);
        // return "allgood";
    }
};

export default register;
