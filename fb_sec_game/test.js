function startgame(){
	fb_sec_game.play(testData());
};

function testData(){
	return {"app_name": "Test Application",
			"app_img": null,
		"data": [{"pid": "p1", "pname": "Permission 1", "p_lvl": 5, "p_img": null, "p_desc": "This is a description for Permission 1. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."},
			{"pid": "p2", "pname": "Permission 2", "p_lvl": 50, "p_img": null, "p_desc": "This is a description for Permission 2. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."},
			{"pid": "p3", "pname": "Permission 3", "p_lvl": 5, "p_img": null, "p_desc": "This is a description for Permission 3. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."},
			{"pid": "p4", "pname": "Permission 4", "p_lvl": 50, "p_img": null, "p_desc": "This is a description for Permission 4. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."},
			{"pid": "p5", "pname": "Permission 5", "p_lvl": 5, "p_img": null, "p_desc": "This is a description for Permission 5. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."},
			{"pid": "p6", "pname": "Permission 6", "p_lvl": 50, "p_img": null, "p_desc": "This is a description for Permission 6. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."},
			{"pid": "p7", "pname": "Permission 7", "p_lvl": 90, "p_img": null, "p_desc": "This is a description for Permission 7. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."}]};
};

function updatePermissionsWithUserSelection(obj){
	console.log(obj);
};