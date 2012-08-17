document.body.onload = function(){
	startgame();
};

$('#restartButton').click(function(){
    fb_sec_game.restart();
});

$('#acceptButton').click(function(){
    fb_sec_game.acceptPermissionSettings();
});