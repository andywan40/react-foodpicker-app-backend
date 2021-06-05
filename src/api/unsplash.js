const express = require("express");
const axios = require("axios");
const router = express.Router();
const BASE_URL = "https://api.unsplash.com/search/photos?";

router.get("/dish/:dish", async (req, res, next) => {
    const dish = req.params.dish;
    try {
      const params = new URLSearchParams({
        query: dish,
        client_id: process.env.UNSPLASH_KEY,
      });
      //make a request to unsplash
      const {data} = await axios.get(`${BASE_URL}${params}`);
      //respond to this request with data from unsplash api
      res.json(data);
    } catch (e) {
      next(e);
    }
  });

router.get("/cuisine/:cuisine/:currentPage", async (req, res, next) => {
  const cuisine = req.params.cuisine;
  const currentPage = req.params.currentPage;
  const perPage = 9;
  console.log("cuisine " + cuisine);
  try {
    const params = new URLSearchParams({
      query: `${cuisine} food`,
      page: currentPage,
      per_page: perPage,
      client_id: process.env.UNSPLASH_KEY,
    });
    console.log(params)
    //make a request to unsplash
    const {data} = await axios.get(`${BASE_URL}${params}`);
    //respond to this request with data from unsplash api
    res.json(data);
  } catch (e) {
    next(e);
  }
});


module.exports = router;