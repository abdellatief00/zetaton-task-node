// routes/imageRoutes.js
const express = require("express");
const upload = require("../Middlewares/Multer"); // Adjust path as necessary
const imageController = require("../Controllers/imagiecontroller");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Image management
 */
/**
 * @swagger
 * /imageCRUD:
 *   post:
 *     summary: Upload a new image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", upload.single("image"), imageController.createImage);

/**
 * @swagger
 * /imageCRUD/{id}:
 *   get:
 *     summary: Get an image by ID
 *     tags: [Images]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the image to retrieve
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Image retrieved successfully
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", imageController.getImage);

/**
 * @swagger
 * /imageCRUD/{id}:
 *   put:
 *     summary: Update an image by ID
 *     tags: [Images]
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the image to update
 *         required: true
 *         type: string
 *       - name: image
 *         in: formData
 *         description: New image file to upload
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Image updated successfully
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", upload.single("image"), imageController.updateImage);

/**
 * @swagger
 * /imageCRUD/{id}:
 *   delete:
 *     summary: Delete an image by ID
 *     tags: [Images]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the image to delete
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       404:
 *         description: Image not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", imageController.deleteImage);

module.exports = router;
