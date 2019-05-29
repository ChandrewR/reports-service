const jwt = require("jsonwebtoken");

exports.authenticate = function(req, res, next) {
    try {
        const token = req.headers.authorization;
        console.log("middleware:"+token);
        jwt.verify(token,"eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ");
        next();

    } catch(e) {
        res.json({"statusCode" : 404,
                  "statusMessage" : "Authorization error",
                  "statusDescription":"An error occurred on the server",
                  "result":{"error":{"status":"No/Invalid token provided."}}});
    }
    
  }