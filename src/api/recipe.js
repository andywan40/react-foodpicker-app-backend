const express = require("express");
const axios = require("axios");
const router = express.Router();
const BASE_URL = "https://api.edamam.com/api/recipes/v2?";
const appId = process.env.EDAMAM_ID;
const appKey = process.env.EDAMAM_KEY;

router.get("/cuisine/:cuisine", async(req, res, next) => {
    const cuisine = req.params.cuisine;
    try{
        const params = new URLSearchParams({
            type: "public",
            app_id: appId,
            app_key: appKey,
            cuisineType: cuisine
        });

        //make a request to edamam
        const {data} = await axios.get(`${BASE_URL}${params}`);
        
        //respond to this request with data from edamam api
        res.json(data);
        
    }catch(e){
        next(e);
    }
});


module.exports = router;