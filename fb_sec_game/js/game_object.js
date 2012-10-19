//set main namespace
goog.provide('fb_sec_game.objectList');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.RoundedRect');
goog.require('lime.Label');
goog.require('lime.Sprite');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.RotateTo');
goog.require('lime.animation.RotateBy');
goog.require('lime.transitions.Dissolve');


fb_sec_game.objectList = function(layerSize, layerPosition, optsArray){

    fb_sec_game.permissionLayers = [];
    fb_sec_game.permissionSprites = [];

    fb_sec_game.permissionObjects = [];

    fb_sec_game.totalPermissions = [];

    fb_sec_game.descriptionLabel = new lime.Label().setFill('#05C').setOpacity(0).setPosition(120,30)//,
        //fb_sec_game.descriptionLabelText = new lime.Label()
            .setFontSize(28).setAlign('center').setText("HELP MODE ON").setFontFamily('"Trebuchet MS"').setFontColor('#fff');

    //fb_sec_game.descriptionLabel.appendChild(fb_sec_game.descriptionLabelText);

    this.layer = new lime.Layer().setPosition(layerPosition),
        this.tempFill = new lime.Sprite().setSize(95, 148).setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('cart.png')).setRenderer(lime.Renderer.CANVAS);
        fb_sec_game.tempFill2 = new lime.Sprite().setSize(32,32).setFill(fb_sec_game.deliverymanSpriteSheet.getFrame('wheel.png')).setRenderer(lime.Renderer.CANVAS);


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

            this.layer.appendChild(this.temp);
            fb_sec_game.permissionIndex++;
        }
    }

    this.layer.appendChild(this.tempFill);

    this.tempFill.runAction(new lime.animation.MoveBy(-14,11));

    this.tempFill.appendChild(fb_sec_game.tempFill2);

    var tempPos = fb_sec_game.tempFill2.getPosition();
    tempPos.x -= 34;
    tempPos.y += 69;
    fb_sec_game.tempFill2.setPosition(tempPos);


    this.layer.runAction(new lime.animation.RotateBy(20));

    fb_sec_game.wheelSpin = new lime.animation.Loop(new lime.animation.RotateBy(-180).setEasing(lime.animation.Easing.LINEAR));

    fb_sec_game.tempFill2.runAction(fb_sec_game.wheelSpin);


    return this.layer;
};


fb_sec_game.permissionLayerCreate = function(opts){
  this.layer = new lime.Layer().setPosition(opts.position),
      this.sprite = new lime.Sprite().setSize(opts.size).setAnchorPoint(0.5, 0).setRenderer(lime.Renderer.CANVAS);

  if(opts.p_img)
  {
      this.sprite.setFill(opts.p_img);
  }
  else
  {
      this.sprite.setFill(Math.floor(((100 - opts.p_lvl)/100) * 255),Math.floor(((opts.p_lvl)/100) * 255),0);
  }

  this.layer.appendChild(this.sprite);

  fb_sec_game.permissionLayers.push(this.layer);
  fb_sec_game.permissionSprites.push(this.sprite);

    var tempObj = fb_sec_game.permissionObject(this.layer, this.sprite, opts);

    goog.events.listen(tempObj.sprite, ['mousedown', 'touchstart'], function(e){
        if(fb_sec_game.helpModeOn)
        {
            var deniedLvl = 100 - tempObj.securityLevel;
            var tempHeader = '<p><span><span class="label label-success">Accepted %:  '+ tempObj.securityLevel +'</span>  ' +
                '<span class="label label-important pull-right">Denied %:  '+ deniedLvl +'</span></span></p><br /><br /><p>';

            var tempFooter = '</p>';

            tempObj.layer.getDeepestDomElement().setAttribute("id", tempObj.name.replace(/\s/g, ''));
            tempObj.layer.getDeepestDomElement().setAttribute("rel", "popover");
            tempObj.layer.getDeepestDomElement().setAttribute("data-title", tempObj.name);
            tempObj.layer.getDeepestDomElement().setAttribute("data-content", tempHeader + tempObj.objDescription + tempFooter);
            var id = "#" + tempObj.name.replace(/\s/g, '');
            $(id).popover({trigger: 'manual'});
            $(id).popover({placement:'top'});
            $(id).popover('show');

            e.swallow(['mouseup', 'touchend'], function(){
                tempObj.layer.getDeepestDomElement().setAttribute("rel", "");
                tempObj.layer.getDeepestDomElement().setAttribute("data-title", "");
                tempObj.layer.getDeepestDomElement().setAttribute("data-content", "");
                var id = "#" + tempObj.name.replace(/\s/g, '');
                $(id).popover('hide');
            });

        }
    });

  fb_sec_game.permissionObjects.push(tempObj);

  return this.layer;
};

fb_sec_game.permissionObject = function(layer, sprite, opts){
    if(opts.pname)
    {
        this.name = opts.pname;
    }
    else
        this.name = '';

    if(opts.p_desc)
    {
        this.objDescription = opts.p_desc;
    }
    else
        this.objDescription = '';
    if(opts.pid)
    {
        this.objID = opts.pid;
    }
    else
        this.objID = '';

    if(opts.p_lvl)
        this.securityLevel = opts.p_lvl;
    else
        this.securityLevel = 0;

    layer.getDeepestDomElement().setAttribute("id", this.name.replace(/\s/g, ''));
    layer.getDeepestDomElement().setAttribute("rel", "popover");
    layer.getDeepestDomElement().setAttribute("data-title", this.name);
    layer.getDeepestDomElement().setAttribute("data-content", this.objDescription);


    return {
        "layer": layer,
        "sprite": sprite,
        "accepted": true,
        "name": this.name,
        "securityLevel": this.securityLevel,
        "objID": this.objID,
        "objDescription": this.objDescription,
        "_body" : {}
    };
};

