import { MongoClient } from "mongodb";
import { hashSync } from "bcryptjs";

const register = async (req: any, res: any) => {
    if (req.method === "POST") {
        const { password, email, name } = req.body;

        const client = await MongoClient.connect(
            "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/shopit?retryWrites=true&w=majority"
        );

        const db = client.db();
        const collection = db.collection("users");

        const userExist = await collection.findOne({ email });
        console.log(userExist);

        if (userExist != null) {
            return res.status(403).json({ message: "user already exist" });
        } else {
            const hashPassword = hashSync(password, 10);
            const userExist = await collection.insertOne({
                email,
                hashPassword,
                name,
                role: "user",
            });
            return res.status(200).json({ message: "user created" });
        }

        // console.log("userdata", result);
        // console.log(password, email);
        // return "allgood";
    }
};

export default register;
