import axios from "axios";

// Word Generator URL
const API_URL = "https://random-word-api.vercel.app/api";

// Create axios client, pre-configured with baseURL
const httpClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json"
    }
});

// This service generates a random word.
const ShortWordGeneratorService = {

    // Generate a word of length
    generateWord: async (length) => {

        if (length > 9) {

        }

        // Make API GET request, and return the word
        try {
            const res = await httpClient
                .get("",
                    {
                        params:
                        {
                            words: 1,
                            length: length
                        }
                    }
                );
            console.log(res.data);
            return res.data[0];
        } catch (err) {
            console.log(err);
            return "";
        }
    }
};

// Export WordGeneratorService
export default ShortWordGeneratorService;