// controllers/imageController.js
const { db } = require("../firebase");
const { v4: uuidv4 } = require("uuid");
const {
  collection,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} = require("firebase/firestore");

exports.createImage = async (req, res) => {
  try {
    const id = uuidv4();
    const newImage = {
      id: id,
      name: req.file.filename,
      url: `/uploads/${req.file.filename}`,
    };
    await setDoc(doc(db, "Images", id), newImage);
    res
      .status(201)
      .json({ message: "Image uploaded successfully", image: newImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getImage = async (req, res) => {
  try {
    const imageDoc = await getDoc(doc(db, "Images", req.params.id));
    if (!imageDoc.exists()) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(imageDoc.data());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const imageRef = doc(db, "Images", req.params.id);
    const imageDoc = await getDoc(imageRef);
    if (!imageDoc.exists()) {
      return res.status(404).json({ message: "Image not found" });
    }
    const updatedImage = {
      ...imageDoc.data(),
      name: req.file.filename,
      url: `/uploads/${req.file.filename}`,
    };
    await setDoc(imageRef, updatedImage);
    res
      .status(200)
      .json({ message: "Image updated successfully", image: updatedImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const imageRef = doc(db, "Images", req.params.id);
    await deleteDoc(imageRef);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
