import { v4 } from "uuid";
import { connectDatabase } from "./dao/connect-database";
import { AppModel } from "./models/app-model";


const seedData = async () => {
  await connectDatabase()
  let count = await AppModel.count({}) 
  if (count===0) {
    let newApp = new AppModel({
      sid: v4(),
      key: v4(),
      name: "test-app",
    })
    await newApp.save()
  }
}

seedData()
  .then(() => console.log("seedData successfully!"))
  .catch((err) => console.error(err))
  .finally(() => process.exit())