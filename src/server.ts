import { config } from "./config";
import initDB from "./config/db";
import { server } from "./types/socket";


const port = config.PORT;

initDB();


server.listen(port, () => {
    console.log(`Server is listen on ${port}`);
});
