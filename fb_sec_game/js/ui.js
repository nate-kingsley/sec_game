//set main namespace
goog.provide('fb_sec_game.ui');

//get requirements
goog.require('fb_sec_game.Button');

goog.require('lime.transitions.MoveInDown');
goog.require('lime.transitions.MoveInLeft');
goog.require('lime.transitions.MoveInRight');
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.RoundedRect');
goog.require('lime.Label');
goog.require('lime.Sprite');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.RotateTo');
goog.require('lime.animation.RotateBy');
goog.require('lime.transitions.Dissolve');
goog.require('lime.helper.PauseScene');

fb_sec_game.buttonDimensions = {
		BUTTON_BUFFER : 30,
		X_BUTTON_SIZE : 180,
		Y_BUTTON_SIZE : 40,
		X_OFFSET : 225,
		Y_OFFSET : 40
	};


fb_sec_game.ui = function(){
	
	var previous_position;
	
	var btns = new lime.Layer().setPosition(0,0);

	var btn = fb_sec_game.makeButton('Deny All').setPosition(fb_sec_game.buttonDimensions.X_OFFSET + 
			fb_sec_game.buttonDimensions.BUTTON_BUFFER, fb_sec_game.buttonDimensions.Y_OFFSET);



	goog.events.listen(btn, ['mousedown', 'touchstart'], function(e) {
        if(!fb_sec_game.pausedGame){
        if(!fb_sec_game.helpModeOn){
        for(var i = 0; i < fb_sec_game.permissionObjects.length; i++)
        {
            fb_sec_game.permissionObjects[i].accepted = false;
        }


        fb_sec_game.isRunning = false;
        fb_sec_game.isWalking = false;
        this.anim = new lime.animation.MoveTo(fb_sec_game.size.WIDTH * 0.8,fb_sec_game.size.HEIGHT * 0.5).setEasing(lime.animation.Easing.LINEAR);

        this.anim.addEventListener(lime.animation.Event.STOP, function(e){
            fb_sec_game.isWalking = false;

            fb_sec_game.deliverymanWalk(fb_sec_game.deliverymanLayer);
        });

        fb_sec_game.deliverymanLayer.runAction(this.anim);

        e.swallow(['mouseup', 'touchend'], function(){
            $('#denyP').popover('hide');
        for(var i = 0; i < fb_sec_game.permissionObjects.length; i++)
        {
            fb_sec_game.permissionObjects[i].accepted = false;
        }


        fb_sec_game.isRunning = false;
        fb_sec_game.isWalking = false;
        this.anim = new lime.animation.MoveTo(fb_sec_game.size.WIDTH * 0.8,fb_sec_game.size.HEIGHT * 0.5).setEasing(lime.animation.Easing.LINEAR);

        this.anim.addEventListener(lime.animation.Event.STOP, function(e){
            fb_sec_game.isWalking = false;

            fb_sec_game.deliverymanWalk(fb_sec_game.deliverymanLayer);
        });

        fb_sec_game.deliverymanLayer.runAction(this.anim);
        });}
        else{
            $('#acceptP').popover({trigger: 'manual', placement: 'left'});
            $('#ffP').popover({trigger: 'manual', placement: 'bottom'});
            $('#denyP').popover({trigger: 'manual', placement: 'bottom'});
            $('#denyP').popover('show');
            e.swallow(['mouseup', 'touchend'], function(){
                $('#denyP').popover('hide');});
        }
        }
	});


    btn.getDeepestDomElement().setAttribute("id", "denyP");
    btn.getDeepestDomElement().setAttribute("rel", "popover");
    btn.getDeepestDomElement().setAttribute("title", "Deny All");
    btn.getDeepestDomElement().setAttribute("data-content", "Deny All Permissions on Cart");


    btn.setPosition(660,470);

    btn.setColor('#fff', 0.3, 1);

    btn.upstate.label.setText("");
    btn.iconSprite.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('deny.png')).setOpacity(1).setRenderer(lime.Renderer.CANVAS);
    btn.downstate.label.setText("");
    btn.setDownState(btn.iconSprite);
    btn.setUpState(btn.iconSprite);

	btns.appendChild(btn);
	
	previous_position = btn.getPosition();

	btn = fb_sec_game.makeButton('Fast Forward').setPosition(previous_position.x +
			fb_sec_game.buttonDimensions.X_BUTTON_SIZE + fb_sec_game.buttonDimensions.BUTTON_BUFFER,
			fb_sec_game.buttonDimensions.Y_OFFSET);



	goog.events.listen(btn, ['mousedown', 'touchstart'], function(e) {
        if(!fb_sec_game.pausedGame){
        if(!fb_sec_game.helpModeOn){
        fb_sec_game.isRunning = false;
        fb_sec_game.isWalking = false;

        this.anim = new lime.animation.MoveTo(fb_sec_game.size.WIDTH * 0.8,fb_sec_game.size.HEIGHT * 0.5).setEasing(lime.animation.Easing.LINEAR);

        this.anim.addEventListener(lime.animation.Event.STOP, function(e){
            fb_sec_game.isWalking = false;
            fb_sec_game.deliverymanWalk(fb_sec_game.deliverymanLayer);
        });

        fb_sec_game.deliverymanLayer.runAction(this.anim);

        e.swallow(['mouseup', 'touchend'], function(){
            $('#ffP').popover('hide');
        fb_sec_game.isRunning = false;
        fb_sec_game.isWalking = false;

        this.anim = new lime.animation.MoveTo(fb_sec_game.size.WIDTH * 0.8,fb_sec_game.size.HEIGHT * 0.5).setEasing(lime.animation.Easing.LINEAR);

        this.anim.addEventListener(lime.animation.Event.STOP, function(e){
            fb_sec_game.isWalking = false;
            fb_sec_game.deliverymanWalk(fb_sec_game.deliverymanLayer);
        });

        fb_sec_game.deliverymanLayer.runAction(this.anim);
        });}
        else{
            $('#acceptP').popover({trigger: 'manual', placement: 'left'});
            $('#ffP').popover({trigger: 'manual', placement: 'bottom'});
            $('#denyP').popover({trigger: 'manual', placement: 'bottom'});
            $('#ffP').popover('show');
            e.swallow(['mouseup', 'touchend'], function(){
                $('#ffP').popover('hide');});
        }
        }
	});

    btn.getDeepestDomElement().setAttribute("id", "ffP");
    btn.getDeepestDomElement().setAttribute("data-content", "Fast Forward With Current Permissions on Cart");
    btn.getDeepestDomElement().setAttribute("rel", "popover");
    btn.getDeepestDomElement().setAttribute("title", "Fast Forward");

    btn.setPosition(440,470);

    btn.setColor('#fff', 0.3, 1);

    btn.upstate.label.setText("");
    btn.iconSprite.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('forward.png')).setOpacity(1).setRenderer(lime.Renderer.CANVAS);
    btn.downstate.label.setText("");
    btn.setDownState(btn.iconSprite);
    btn.setUpState(btn.iconSprite);

	btns.appendChild(btn);
	
	previous_position = btn.getPosition();

	btn = fb_sec_game.makeButton('Accept All').setPosition(previous_position.x + 
			fb_sec_game.buttonDimensions.X_BUTTON_SIZE + fb_sec_game.buttonDimensions.BUTTON_BUFFER, 
			fb_sec_game.buttonDimensions.Y_OFFSET);
	goog.events.listen(btn, ['mousedown', 'touchstart'], function(e) {
        if(!fb_sec_game.pausedGame){
        if(!fb_sec_game.helpModeOn){
        for(var i = 0; i < fb_sec_game.permissionObjects.length; i++)
        {
            fb_sec_game.permissionObjects[i].accepted = true;

        }

        fb_sec_game.isRunning = false;
        fb_sec_game.isWalking = false;
        this.anim = new lime.animation.MoveTo(fb_sec_game.size.WIDTH * 0.8,fb_sec_game.size.HEIGHT * 0.5).setEasing(lime.animation.Easing.LINEAR);

        this.anim.addEventListener(lime.animation.Event.STOP, function(e){
            fb_sec_game.isWalking = false;
            fb_sec_game.deliverymanWalk(fb_sec_game.deliverymanLayer);
        });

        fb_sec_game.deliverymanLayer.runAction(this.anim);
        e.swallow(['mouseup', 'touchend'], function(){
            $('#acceptP').popover('hide');
        for(var i = 0; i < fb_sec_game.permissionObjects.length; i++)
        {
            fb_sec_game.permissionObjects[i].accepted = true;

        }

        fb_sec_game.isRunning = false;
        fb_sec_game.isWalking = false;
        this.anim = new lime.animation.MoveTo(fb_sec_game.size.WIDTH * 0.8,fb_sec_game.size.HEIGHT * 0.5).setEasing(lime.animation.Easing.LINEAR);

        this.anim.addEventListener(lime.animation.Event.STOP, function(e){
            fb_sec_game.isWalking = false;
            fb_sec_game.deliverymanWalk(fb_sec_game.deliverymanLayer);
        });

        fb_sec_game.deliverymanLayer.runAction(this.anim);
        });}
        else{
            $('#acceptP').popover({trigger: 'manual', placement: 'left'});
            $('#ffP').popover({trigger: 'manual', placement: 'bottom'});
            $('#denyP').popover({trigger: 'manual', placement: 'bottom'});
            $('#acceptP').popover('show');
            e.swallow(['mouseup', 'touchend'], function(){
                $('#acceptP').popover('hide');});
        }
        }
	});

    btn.getDeepestDomElement().setAttribute("id", "acceptP");
    btn.getDeepestDomElement().setAttribute("rel", "popover");
    btn.getDeepestDomElement().setAttribute("title", "Accept All");
    btn.getDeepestDomElement().setAttribute("data-content", "Accept All Permissions on Cart");

    btn.setPosition(890,470);

    btn.setColor('#fff', 0.3, 1);

    btn.upstate.label.setText("");
    btn.iconSprite.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('accept.png')).setOpacity(1).setRenderer(lime.Renderer.CANVAS);
    btn.downstate.label.setText("");
    btn.setDownState(btn.iconSprite);
    btn.setUpState(btn.iconSprite);

	btns.appendChild(btn);

    btn = fb_sec_game.makeButton('?').setColor('#000').setSize(80,40).setPosition(fb_sec_game.size.WIDTH * 0.04,fb_sec_game.buttonDimensions.Y_OFFSET);
    goog.events.listen(btn, ['mousedown', 'touchstart'], function() {
        if(!fb_sec_game.pausedGame){
        if(fb_sec_game.helpModeOn)
        {
            fb_sec_game.descriptionLabel.runAction(new lime.animation.FadeTo(0));
            document.body.style.cursor = "crosshair";
            fb_sec_game.helpModeOn = false;
        }
        else
        {
            fb_sec_game.descriptionLabel.runAction(new lime.animation.FadeTo(1));
            document.body.style.cursor = "help";
            fb_sec_game.helpModeOn = true;
        }}
    });

    btn.setPosition(60,470);

    btn.setColor('#fff', 0.3, 1);

    btn.downstate.label.setFontColor('#000');
    btn.upstate.label.setFontColor('#000');

    btns.appendChild(btn);



    fb_sec_game.pausedGame = false;

    fb_sec_game.pausedLabel = new lime.Label().setAlign('center').setFontColor('#000').setFontSize(100).
        setPosition(fb_sec_game.size.WIDTH * 0.5, fb_sec_game.size.HEIGHT * 0.4).setText('Game Paused').setOpacity(0);


    fb_sec_game.pauseBtn = fb_sec_game.makeButton('Pause').setColor('#4ff').setSize(180,40).setPosition(fb_sec_game.size.WIDTH * 0.04,fb_sec_game.buttonDimensions.Y_OFFSET);
    goog.events.listen(fb_sec_game.pauseBtn, ['mousedown', 'touchstart'], function() {
        if(!fb_sec_game.helpModeOn){
        if(fb_sec_game.pausedGame)
        {
            fb_sec_game.PauseGame(fb_sec_game.gameScene, !fb_sec_game.pausedGame);
            fb_sec_game.pausedLabel.setOpacity(0);
            fb_sec_game.gameScene.removeChild(fb_sec_game.pausedLabel);
            fb_sec_game.pauseBtn.iconSprite.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('pause.png')).setOpacity(1).setRenderer(lime.Renderer.CANVAS);
            fb_sec_game.pauseBtn.setDownState(fb_sec_game.pauseBtn.iconSprite);
            fb_sec_game.pauseBtn.setUpState(fb_sec_game.pauseBtn.iconSprite);
            fb_sec_game.pausedGame = false;
            fb_sec_game.isWalking = false;
            fb_sec_game.isRunning = true;
            fb_sec_game.deliverymanSprite.runAction(fb_sec_game.walkAnim);
            fb_sec_game.permissionLayer.runAction(new lime.animation.RotateBy(20));
            fb_sec_game.wheelSpin.play();
            fb_sec_game.deliverymanWalk(fb_sec_game.deliverymanLayer);

        }
        else
        {
            fb_sec_game.PauseGame(fb_sec_game.gameScene, !fb_sec_game.pausedGame);
            fb_sec_game.pausedLabel.setOpacity(1);
            fb_sec_game.gameScene.appendChild(fb_sec_game.pausedLabel);
            fb_sec_game.pauseBtn.iconSprite.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('play.png')).setOpacity(1).setRenderer(lime.Renderer.CANVAS);
            fb_sec_game.pauseBtn.setDownState(fb_sec_game.pauseBtn.iconSprite);
            fb_sec_game.pauseBtn.setUpState(fb_sec_game.pauseBtn.iconSprite);
            fb_sec_game.pausedGame = true;
            fb_sec_game.isWalking = false;
            fb_sec_game.isRunning = false;
            fb_sec_game.deliverymanSprite.runAction(fb_sec_game.idleAnim);
            fb_sec_game.permissionLayer.runAction(new lime.animation.RotateBy(-20));
            fb_sec_game.wheelSpin.stop();
        }
        fb_sec_game.PauseGame(fb_sec_game.gameScene, fb_sec_game.pausedGame);
        }
    });

    fb_sec_game.pauseBtn.setPosition(220,470);

    fb_sec_game.pauseBtn.setColor('#fff', 0.3, 1);

    fb_sec_game.pauseBtn.upstate.label.setText("");
    fb_sec_game.pauseBtn.iconSprite.setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('pause.png')).setOpacity(1).setRenderer(lime.Renderer.CANVAS);
    fb_sec_game.pauseBtn.downstate.label.setText("");
    fb_sec_game.pauseBtn.setDownState(fb_sec_game.pauseBtn.iconSprite);
    fb_sec_game.pauseBtn.setUpState(fb_sec_game.pauseBtn.iconSprite);

    btns.appendChild(fb_sec_game.pauseBtn);

    $('#acceptP').popover({trigger: 'manual', placement: 'left'});
    $('#ffP').popover({trigger: 'manual', placement: 'bottom'});
    $('#denyP').popover({trigger: 'manual', placement: 'bottom'});
	
	return btns;
	
};


fb_sec_game.PauseGame = function(node, isPaused){
    for(var i = 0; i < node.getNumberOfChildren(); i++)
    {
        if(node.getChildAt(i) != fb_sec_game.pauseBtn &&
            node.getChildAt(i).getParent() != fb_sec_game.pauseBtn.getParent() &&
            node.getChildAt(i) != fb_sec_game.descriptionLabel)
        {
            if(isPaused)
            {
                node.getChildAt(i).setOpacity(0.5);
            }
            else
            {
                node.getChildAt(i).setOpacity(1);
            }
            fb_sec_game.PauseGame(node.getChildAt(i), isPaused);
        }
        else if(node.getChildAt(i) == fb_sec_game.pauseBtn)
        {
            if(isPaused)
            {
                //fb_sec_game.pauseBtn.setColor('#05C', 1, 1);
            }
            else
            {
                //fb_sec_game.pauseBtn.setColor('#05C', 0.3, 1);
            }
        }

    }
};

//helper for same size buttons
fb_sec_game.makeButton = function(text) {
    var btn = new fb_sec_game.Button(text).setSize(fb_sec_game.buttonDimensions.X_BUTTON_SIZE, 
    		fb_sec_game.buttonDimensions.Y_BUTTON_SIZE);
    return btn;
};