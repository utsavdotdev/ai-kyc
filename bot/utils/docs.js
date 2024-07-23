import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GENAI_API_KEY);

// Convert file to generative AI part
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

// Utility function to extract text from an image
export const extractText = async (imagePath, mimeType) => {
  try {
    const filePart = fileToGenerativePart(imagePath, mimeType);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt =
      "Extract the text from the provided image and return it in the following JSON format: {name: <extracted_name>,country: <extracted_country>} If the provided image does not contain the required text fields (name or country), return the following JSON response:{error: 'Cannot find required details'}";

    const imageParts = [filePart];
    const generatedContent = await model.generateContent([
      prompt,
      ...imageParts,
    ]);

    // Get the response text
    let responseText = generatedContent.response.text().trim();

    const jsonMatch = responseText.match(/\{.*?\}/s);
    const jsonText = jsonMatch ? jsonMatch[0] : "{}";

    // Parse JSON and handle any parsing errors
    let result;
    try {
      result = JSON.parse(jsonText);
    } catch (parseError) {
      return { error: "Failed to parse response as JSON" };
    }

    // Check for error message in the response
    if (result.error) {
      return { error: result.error };
    }

    // Check for required fields
    if (!result.name || !result.country) {
      return { error: "Cannot find required details" };
    }

    return result;
  } catch (error) {
    return { error: "An error occurred while processing the image" };
  }
};
