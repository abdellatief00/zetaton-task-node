// controllers/shortenController.js
const axios = require("axios");
const { db } = require("../firebase");
const { setDoc,addDoc,collection } = require("firebase/firestore");
require("dotenv").config();

const shortenUrl = async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(
      `https://www.shareaholic.com/v2/share/shorten_link?apikey=4692e9d26b02af907c98f83838fcfd29&url=${url}&service[name]=shrlc`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );

      const shortUrl = response.data.data;
      // Save the shortened URL to Firestore
    const imageRef = collection(db, "Images");
      await addDoc(imageRef, { shortUrl });
      return res.status(200).json( {shortUrl} );
     
  } catch (error) {
   // console.error(error);
    return res.status(500).json({ message: "Error shortening URL" });
  }
};

module.exports = {
  shortenUrl,
};
