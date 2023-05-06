import axios from "axios";

// API URL (Docs at https://www.datamuse.com/api/)
const API_URL = "https://api.datamuse.com/words";

// Create axios client, pre-configured with baseURL
const httpClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json"
    }
});

// This service checks if a word exists in the dictionary.
const DictionaryService = {

    // Check if a word exists in the dictionary
    isValidWord: async (word) => {

        // Convert word to lowercase
        word = word.toLowerCase();

        // Check if word is empty
        if (!word || word.includes(" ")) {
            return false;
        }

        // Make API GET request, and return true if the word exists
        return httpClient
            .get("", { params: { sp: word, max: 1 } })
            .then((res) => {
                console.log(res.data);
                return res.data.length === 1 && res.data[0].word === word;
            }).catch((err) => {
                console.log(err);
                return false;
            });
    },

};

// Export DictionaryService
export default DictionaryService;