import { compare } from "./face.js";
import { extractText } from "./docs.js";

const bot = async () =>{
    console.log("Bot is running...");
    const compareResult = await compare("pic.jpg", "docs.jpg");
    const docsResult = await extractText("docs.jpg", "image/jpeg");
    console.log(compareResult);
    console.log(docsResult);
}

export default bot;