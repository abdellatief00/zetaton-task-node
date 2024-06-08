// routes/shortenRoutes.js
const express = require("express");
const shortenController = require("../Controllers/shortenController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Shorten
 *   description: Operations related to URL shortening
 */

/**
 * @swagger
 * /ShortCut:
 *   post:
 *     summary: Shorten a URL
 *     description: Shortens a given URL using Shareaholic service and saves it to Firestore.
 *     tags: [Shorten]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: URL to be shortened
 *                 example: https://web.whatsapp.com/
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 *                   description: Shortened URL
 *                   example: https://shrlc.com/abc123
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post("/", shortenController.shortenUrl);

module.exports = router;
