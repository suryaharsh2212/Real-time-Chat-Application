import mongoose  from "mongoose"

 async function connecttoMongo()
{
    try {
        const connection= await mongoose.connect(`mongodb+srv://suryaraj04266:Surya2212@clusterbackend.n0p1ajr.mongodb.net/Gigglechat`)
        console.log(`Database connected sucessfully ..............`)
    } catch (error) {
        console.log("Some error occured during conntecting..............",error.message);
    }
}
export default connecttoMongo;
