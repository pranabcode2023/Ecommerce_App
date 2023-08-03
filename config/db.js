import moongoose from "moongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await moongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Mongodb Database`.bgMagenta.white)
    } catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed.white)
    }
}

export default connectDB;