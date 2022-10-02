const express = require("express");
const router = express.Router()


router.get("/images/:key", (req, res) => {
  const key = req.params.key

  const readStream = getFileStream(key) 

  res.attachment(key);
  readStream.pipe(res)
})





module.exports = router