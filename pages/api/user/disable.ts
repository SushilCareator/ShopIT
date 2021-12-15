import { MongoClient, ObjectId } from "mongodb";

const inactive = async (req: any, res: any) => {
    if (req.method === "POST") {
        const { userId } = req.body;

        console.log(userId);

        const client = await MongoClient.connect(
            "mongodb+srv://susil:eANHXhY0HIvOIR3i@cluster0.z9lyl.mongodb.net/shopit?retryWrites=true&w=majority"
        );

        const db = client.db();
        const collection = db.collection("users");

        // const find = await collection.findOne({ _id: new ObjectId(productId) });

        // console.log(find?.id);

        const update = await collection.updateOne(
            { _id: new ObjectId(userId) },
            [{ $set: { active: { $not: "$active" } } }],
            { upsert: true }
        );
        console.log(update);

        return res.status(201).json({ message: "User Updated" });
    }
};

export default inactive;
