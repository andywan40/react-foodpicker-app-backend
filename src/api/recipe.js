const express = require("express");
const axios = require("axios");
const router = express.Router();
const BASE_URL = "https://api.edamam.com/api/recipes/v2?";
const appId = process.env.EDAMAM_ID;
const appKey = process.env.EDAMAM_KEY;

router.get("/cuisine/:cuisine/:cont", async(req, res, next) => {
    const {cuisine, cont} = req.params;
    try{
        let params;
        //check if cont is null
        if(cont === "null"){
            params = new URLSearchParams({
                type: "public",
                app_id: appId,
                app_key: appKey,
                cuisineType: cuisine,
            });
        }else{
            params = new URLSearchParams({
                type: "public",
                app_id: appId,
                app_key: appKey,
                cuisineType: cuisine,
                _cont: cont
            });
        }
        //make a request to edamam
        res.json({
            params,
            cuisine, 
            cont
        });
        const {data} = await axios.get(`${BASE_URL}${params}`);
        const nextLink = data._links.next.href.split("=")[2].split("&")[0];
        const returnData = {
            hits: data.hits,
            nextLink,
        }
        //respond to this request with data from edamam api
        //res.json(returnData);
        
    }catch(e){
        next(e);
    }
});


router.get("/dish/:dish/:cont", async(req, res, next) => {
    const {dish, cont} = req.params;
    try{
        let params;
        //check if cont is null
        if(cont === "null"){
            params = new URLSearchParams({
                type: "public",
                app_id: appId,
                app_key: appKey,
                q: dish
            });
        }else{
            params = new URLSearchParams({
                type: "public",
                app_id: appId,
                app_key: appKey,
                q: dish,
                _cont: cont
            });
        }
        //make a request to edamam
        const {data} = await axios.get(`${BASE_URL}${params}`);
        const nextLink = data._links.next.href.split("=")[3].split("&")[0];
        const returnData = {
            hits: data.hits,
            nextLink,
        }
        //respond to this request with data from edamam api
        res.json(returnData);
        
    }catch(e){
        next(e);
    }
});


module.exports = router;