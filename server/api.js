const express = require('express');
const router = express.Router();
var users = []

router.post('/login', (req, res) => {

	var find = false;
	users.some( (user) => {
		if(user.email == req.body.email){
			find = true;
			return true;
		}
	});

	if(!find){
		users.push(req.body);
		res.status(200).send({message: "User logged"});
	}else {
		res.status(403).send({message:"El usuario ya está logado"});
	}

});



module.exports = router;