//set main namespace
goog.provide('fb_sec_game.deliverymanWalk');
goog.provide('fb_sec_game.createAnimations');

//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.RotateTo');
goog.require('lime.transitions.Dissolve');
goog.require('lime.transitions.MoveInUp');
goog.require('lime.SpriteSheet');
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.ASSETS.spritesheet.plist');
goog.require('fb_sec_game.ui');

fb_sec_game.deliverymanWalk = function(deliverymanLayer) {

    var optsArray = fb_sec_game.testData.data;
    if(fb_sec_game.totalPermissions.length >= optsArray.length)
    {
        fb_sec_game.isWalking = false;
        fb_sec_game.isRunning = false;
        fb_sec_game.deliverymanSprite.runAction(fb_sec_game.idleAnim);
        fb_sec_game.director.replaceScene(fb_sec_game.createEndScreen(), lime.transitions.MoveInDown);
    }

    else if (deliverymanLayer.getPosition().x > fb_sec_game.size.WIDTH * 0.75) {

        fb_sec_game.isRunning = true;



//        else
        {

            document.body.style.cursor = "crosshair";
            fb_sec_game.helpModeOn = false;
            fb_sec_game.isWalking = false;
            fb_sec_game.isRunning = true;


            fb_sec_game.deliverymanLayer.setPosition(fb_sec_game.size.WIDTH * 0.0,fb_sec_game.size.HEIGHT * 0.5);
            for(var j = 0; j < fb_sec_game.permissionObjects.length; j++)
            {
                if(fb_sec_game.permissionObjects[j].accepted)
                {
                    if(fb_sec_game.vendorNumber < 8)
                        fb_sec_game.vendorNumber++;

                }
                else
                {
                    if(fb_sec_game.vendorNumber > 1)
                        fb_sec_game.vendorNumber--;
                }

                fb_sec_game.totalPermissions.push(fb_sec_game.permissionObjects[j]);
                fb_sec_game.permissionLayer.removeChild(fb_sec_game.permissionObjects[j].layer);
            }
            fb_sec_game.permissionObjects = [];

            fb_sec_game.updateVendorFace();
            var upper = fb_sec_game.permissionIndex + 3;
            for(var i = fb_sec_game.permissionIndex; i < upper; i++)
            {
                if(i < optsArray.length)
                {
                    optsArray[i].size = new goog.math.Size(64,64);
                    switch(fb_sec_game.permissionIndex%3)
                    {
                        case 0:
                            optsArray[i].position = new goog.math.Coordinate(0,0);
                            break;
                        case 1:
                            optsArray[i].position = new goog.math.Coordinate(0,-64);
                            break;
                        case 2:
                            optsArray[i].position = new goog.math.Coordinate(0,-128);
                            break;
                    }

                    this.temp = new fb_sec_game.permissionLayerCreate(optsArray[i]);

                    fb_sec_game.permissionLayer.appendChild(this.temp);
                    fb_sec_game.permissionIndex++;
                }
            }

            fb_sec_game.isWalking = true;

            this.anim = new lime.animation.MoveBy(1, 0).setEasing(lime.animation.Easing.LINEAR);

            this.anim.addEventListener(lime.animation.Event.STOP, function(e){
                fb_sec_game.isWalking = false;

                fb_sec_game.deliverymanWalk(fb_sec_game.deliverymanLayer);
            });

            fb_sec_game.deliverymanLayer.runAction(this.anim);
        }


    }
    else if (fb_sec_game.isRunning && !fb_sec_game.isWalking) {

        fb_sec_game.isWalking = true;

        this.anim = new lime.animation.MoveBy(30, 0).setEasing(lime.animation.Easing.LINEAR);

        this.anim.addEventListener(lime.animation.Event.STOP, function(e){
            fb_sec_game.isWalking = false;
            fb_sec_game.deliverymanWalk(fb_sec_game.deliverymanLayer);
        });

        deliverymanLayer.runAction(this.anim);
    }
    else {
        deliverymanLayer.runAction(new lime.animation.MoveBy(0, 0));
    }
};

fb_sec_game.createDeliverymanPopover = function(){
    fb_sec_game.deliverymanLayer.getDeepestDomElement().setAttribute("id", "deliveryMan");
    fb_sec_game.deliverymanLayer.getDeepestDomElement().setAttribute("rel", "popover");
    fb_sec_game.deliverymanLayer.getDeepestDomElement().setAttribute("title", "Facebook Deliveryman");
    fb_sec_game.deliverymanLayer.getDeepestDomElement().setAttribute("data-content", "This is Facebook.<br /><br /><strong>It wants to give the permissions on it's cart to the vendor!</strong>" +
        "<br /><br />The more permissions you give the vendor, the happier he gets...");
    goog.events.listen(fb_sec_game.deliverymanLayer, ['mousedown', 'touchstart'], function(e) {
        if(!fb_sec_game.pausedGame && fb_sec_game.helpModeOn){

            $('#deliveryMan').popover({trigger: 'manual', placement: 'bottom'});
            $('#deliveryMan').popover('show');
            e.swallow(['mouseup', 'touchend'], function(){
                $('#deliveryMan').popover('hide');});

        }

        });
};

fb_sec_game.createVendorPopover = function(){
    fb_sec_game.vendorLayer.getDeepestDomElement().setAttribute("id", "vendorLayer");
    fb_sec_game.vendorLayer.getDeepestDomElement().setAttribute("rel", "popover");
    fb_sec_game.vendorLayer.getDeepestDomElement().setAttribute("title", "Vendor Application");
    fb_sec_game.vendorLayer.getDeepestDomElement().setAttribute("data-content", "This is "+ fb_sec_game.testData.app_name +
        ".<br /><br /><strong>It wants all of your permissions.</strong> <br /> <br />Be careful!!!");
    goog.events.listen(fb_sec_game.vendorLayer, ['mousedown', 'touchstart'], function(e) {
        if(!fb_sec_game.pausedGame && fb_sec_game.helpModeOn){

            $('#vendorLayer').popover({trigger: 'manual', placement: 'bottom'});
            $('#vendorLayer').popover('show');
            e.swallow(['mouseup', 'touchend'], function(){
                $('#vendorLayer').popover('hide');});

        }

    });
};


fb_sec_game.createSecGuyPopover = function(){
    fb_sec_game.sec_guy.getDeepestDomElement().setAttribute("id", "secGuy");
    fb_sec_game.sec_guy.getDeepestDomElement().setAttribute("rel", "popover");
    fb_sec_game.sec_guy.getDeepestDomElement().setAttribute("title", "Security Guard");
    fb_sec_game.sec_guy.getDeepestDomElement().setAttribute("data-content", "This is you!<br /><br /><strong>Throw fruit at the permissions you don't want the vendor to have.</strong><br /><br /> Fire Away!!!");
    goog.events.listen(fb_sec_game.sec_guy, ['mousedown', 'touchstart'], function(e) {
        if(!fb_sec_game.pausedGame && fb_sec_game.helpModeOn){

            $('#secGuy').popover({trigger: 'manual', placement: 'top'});
            $('#secGuy').popover('show');
            e.swallow(['mouseup', 'touchend'], function(){
                $('#secGuy').popover('hide');});

        }

    });
};


fb_sec_game.createAnimations = function() {

    fb_sec_game.walkAnim = new lime.animation.KeyframeAnimation();
    fb_sec_game.walkAnim.addFrame(fb_sec_game.deliverymanSpriteSheet.getFrame("walk1.png"));
    fb_sec_game.walkAnim.addFrame(fb_sec_game.deliverymanSpriteSheet.getFrame("walk2.png"));
    fb_sec_game.walkAnim.addFrame(fb_sec_game.deliverymanSpriteSheet.getFrame("walk3.png"));
    fb_sec_game.walkAnim.addFrame(fb_sec_game.deliverymanSpriteSheet.getFrame("walk4.png"));
    fb_sec_game.walkAnim.addFrame(fb_sec_game.deliverymanSpriteSheet.getFrame("walk5.png"));
    fb_sec_game.walkAnim.addFrame(fb_sec_game.deliverymanSpriteSheet.getFrame("walk6.png"));
    fb_sec_game.walkAnim.addFrame(fb_sec_game.deliverymanSpriteSheet.getFrame("walk7.png"));
    fb_sec_game.walkAnim.addFrame(fb_sec_game.deliverymanSpriteSheet.getFrame("walk8.png"));

    fb_sec_game.idleAnim = new lime.animation.KeyframeAnimation();
    fb_sec_game.idleAnim.addFrame(fb_sec_game.deliverymanSpriteSheet.getFrame("idle.png"));
}