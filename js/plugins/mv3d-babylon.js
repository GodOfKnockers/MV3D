/*:
@plugindesc 3D rendering in RPG Maker MV with babylon.js
@author Dread/Nyanak
@version 0.3.1
@help

If you are making a game with this plugin, please consider supporting my patreon.  
https://www.patreon.com/cutievirus  
A list of patrons can be found at the bottom of this file.

Make sure you have both the `babylon.js` plugin and `mv3d-babylon.js` plugin loaded, in
that order.

Now when you run your game, the map should be rendered in 3D.

The A3 and A4 tiles will be rendered as walls. You can also change the height
of tiles using regions and terrain tags.

By default, regions 1-7 are configured to affect the height.

Terrain tag 1 is configured to use a cross shape, so tiles with this tag will
stand up like a tree.

Terrain tag 2 is configured to use a fence shape. Try putting this tag on the
fence autotiles that come with MV.

The regions and terrain tags can be reconfigured however you want.

---

## Tileset Configuration

A more advanced feature, the tileset configuration should be placed in the
tileset's note, and should be wrapped in an <mv3d></mv3d> block.

Each line in the configuration should start by identifying the tile you want
to configure, followed by a colon, and then a list of configuration functions.

Choosing a tile is done with the format `img,x,y`, where img is name of the
tileset image (A1, A2, B, C, etc.), and x and y are the position of that tile
on the tileset. For example, `A2,0,0` would be the top left A2 tile. On the
outdoor tileset, this would be the grass autotile.

Each tile can have 3 different textures. The top texture, side texture, and
inside texture. The side texture is used on the side of the tile when it has a
positive height, and the inside texture is used when it has a negative height.

If inside texture isn't specified, all sides will use the same texture.  
If side texture isn't specified, then sides will use the top texture.

---

	texture(img,x,y)
	top(img,x,y)
	side(img,x,y)
	inSide(img,x,y)

These functions will use the specified tile for the current tile's textures.  
texture() sets both the top and side textures.

---

	offset(x,y)
	offsetTop(x,y)
	offsetSide(x,y)
	offsetInside(x,y)

These functions will use an offset to get a texture from a tile near this one.
These should only be used to point to tiles on the same tileset image.

---

	rect(img,x,y,w,h)
	rectTop(img,x,y,w,h)
	rectSide(img,x,y,w,h)
	rectInside(img,x,y,w,h)

These functions use a specified region from a tileset image as the texture.
They use pixel coordinates rather than tile coordinates.

---

	shape(s)

The shape function can set the tile's shape to FLAT, FENCE, CROSS, or XCROSS.
Each of which have their own behavior. FLAT is default.

---

	float(n)

The float function will make water vehicles float a certain height above the
tile.

---

	fringe(n)

The fringe function will move the tile into the air by the specified distance.
Usually used for tiles with star passability.

---

	alpha(n)

Turns on alpha blending for the tile and, if n is less than 1,
makes tile transparent.

---

	glow(n)

Makes tile glow in the dark. Good for lava.

---

As a simple example, we'll give the water tile in the outdoor tileset a
negative height so it will sink into the ground.

    <MV3D>
      A1,0,0:top(A1,0,0),rectSide(A1,31,54,31,14),height(-0.3),float(0.1)
    </MV3D>

But this example doesn't look very good when we place it on the edge of a
cliff, so we can configure it to use waterfall textures on the outside walls.

    <mv3d>
      A1,0,0:top(A1,0,0),side(A1,1,1),rectInside(A1,31,54,31,14),height(-0.3),float(0.1)
    </mv3d>

---

## Event Configuration

Event configurations can be placed in either the note or comment.  
Event configurations should be contained in an <mv3d: > tag, where a list of
configuration functions goes after the colon.

---

	x(n)
	y(n)

The x and y functions shift position of the event's mesh.

---

	height(n)

The height function sets the height of the event above the ground.

---

	z(n)

The z function sets the z position of the event. Ignores ground level.

---

	pos(x,y)

The Pos function sets the position of the event.   
If in the note tag, position will only be set when the event is created.  
If in the comments, position will be set when event changes pages.  
Prefix numbers with + to use relative coordinates.  

---

	side(s)

Which sides of the mesh will be rendered. Can be FRONT, BACK, or DOUBLE.

---

	shape(s)

Sets the shape of the event's mesh.

Valid shapes:

 -   FLAT - Event lies flat on the ground like a tile.
 - SPRITE - Event rotations both pitch and yaw to face camera.
 -   TREE - Event stands straight up, rotating to match camera yaw.
 -  FENCE - Event stands straight up, facing south. (rotate using rot)

---

	scale(x,y)

Sets the scale of the event's mesh.


---

	rot(n)

Rotates the event. Only works with flat and fence shapes.  
0 is south, 90 is east, 180 is north, and 270 is west.  

---

	bush(true/false)

Whether the event is affected by bush tiles.

---

	shadow(true/false)

Whether the event has a shadow.

---

	shadowScale(n)

Set's the scale of the event's shadow.

---

	lamp(color,intensity,distance)
	flashlight(color,intensity,distance,angle)

Sets up light sources on this event.  
Color should be a hex code.  
Intensity is the brightness of the light.  
Distance is how far the light travels.   
Angle is the width of the flashlight's beam.   

If configured on note, these settings are applied only when event is created.  
If in comment, settings applied when switching pages.

---

	flashlightYaw(deg)
	flashlightPitch(deg)

Sets the pitch and yaw of the event's flashlight.  
Prefix the yaw angle with + to set yaw relative to event's facing.

---

	lightHeight(n)

Sets the height of the light sources on the event.

---

	lightOffset(x,y)

Offsets the position of the event's light sources.

---

As an example, to make a door event render on the edge of a building's wall,
you might do something like this:

    <mv3d:shape(fence),scale(0.9,1.3),y(0.51),rot(0),z(0)>

---

## Map Configuration

Map configuration goes in the note area of the map settings. Configurations
should be placed in an <mv3d></mv3d> block, which should contain a list of
configuration functions.

Some of these configurations apply when the map is loaded, and some affect how it's rendered

---

	light(color,intensity)
	fog(color,near,far)

Setup the ambient light and fog of the map.

---

	yaw(deg)
	pitch(deg)
	dist(n)
	height(n)
	cameraYaw(deg)
	cameraPitch(deg)
	cameraDist(n)
	cameraHeight(n)

Sets the camera yaw, pitch, distance, and height for the map.   

---

	mode(s)
	cameraMode(s)

Set either PERSPECTIVE or ORTHOGRAPHIC mode.

---

	edge(true/false)

If false, walls aren't rendered at the edges of the map.

---

	ceiling(img,x,y,height)

Uses the tile texture specified by `img,x,y` to render a ceiling for the map.  
Good for indoor areas. If height isn't specified, default will be used.

---

## Plugin Commands

In the following commands, the parts surrounded with angle bracks such as <n> are parameters.

Some commands (like lamp and flashlight) act on a character. By default the
target character will be the current event.
You can define your own target using the following syntax:

	mv3d ＠target rest of the command

If the second word in the command starts with `＠`, that will be interpreted
as the target.

Valid targets:

- ＠p or ＠player: Targets $gamePlayer.
- ＠e0, ＠e1, ＠e2, ＠e25 etc: Targets event with specified id.
- ＠f0, ＠f1, ＠f2, etc: Targets first, second, third follower, etc.
- ＠v0, ＠v1, ＠v2: Boat, Ship, Airship.

Some parameters can be prefixed with + to be set relative to the current
value.

For example:

	mv3d camera yaw +-45 0.5

---

	mv3d camera pitch <n> <t>
	mv3d camera yaw <n> <t>
	mv3d camera dist <n> <t>
	mv3d camera height <n> <t>

Sets the camera properties, where <n> is the new value and <t> is the time to
interpolate to the new value.   
Prefix <n> with + to modify the current value instead of setting a new
value.

---

	mv3d camera mode <mode>

Set camera mode to PERSPECTIVE or ORTHOGRAPHIC

---

	mv3d rotationMode <mode>

Set the keyboard control mode for rotating the camera.

Modes:

- OFF - Can't rotate camera with keyboard.
- AUTO - A&D while in 1st person mode. Otherwise Q&E.
- Q&E - Rotate camera with Q&E keys.
- A&D - Rotate camera with left & right or A&D. Move with Q&E.

---

	mv3d pitchMode <true/false>

Allow player to control camera pitch with pageup and pagedown.

---

	mv3d fog color <color> <t>
	mv3d fog near <n> <t>
	mv3d fog far <n> <t>
	mv3d fog dist <near> <far> <t>
	mv3d fog <color> <near> <far> <t>

<t> is time.  
Prefix values with + to modify the current values instead of setting new
values.

---

	mv3d light color <color> <t>
	mv3d light intensity <n> <t>
	mv3d light <color> <intensity> <t>

---

	mv3d ＠t lamp color <color> <t>
	mv3d ＠t lamp intensity <n> <t>
	mv3d ＠t lamp dist <n> <t>
	mv3d ＠t lamp <color> <intensity> <dist> <t>

---

	mv3d ＠t flashlight color <color> <t>
	mv3d ＠t flashlight intensity <n> <t>
	mv3d ＠t flashlight dist <n> <t>
	mv3d ＠t flashlight angle <deg> <t>
	mv3d ＠t flashlight pitch <deg> <t>
	mv3d ＠t flashlight yaw <deg> <t>
	mv3d ＠t flashlight <color> <intensity> <dist> <angle> <t>

Angle is beam width of the flashlight.

---

	mv3d camera target ＠t <t>

Change the camera's target.
Camera will transition to the new target over time <t>.

---

	mv3d camera pan <x> <y> <t>
	mv3d pan <x> <y> <t>

Pans the camera view, relative to current target.

---

### Vehicle Commands

	mv3d <vehicle> big <true/false>
	mv3d <vehicle> scale <n>
	mv3d <vehicle> speed <n>
	mv3d airship ascentspeed <n>
	mv3d airship descentspeed <n>
	mv3d airship height <n>

"Big" vehicles can't be piloted too close to walls. This can be useful to
avoid clipping with vehicles with large scales.   
Speed of the vehicle should be 1-6. It works the same as event speed.   
A higher airship can fly over higher mountains. Perhaps you could let the
player upgrade their airship's height and speed.

---

Patrons:

- Whitely

@param graphics
@text Graphics

@param renderDist
@text Render Distance
@desc The distance in tiles that will be rendered in 3D.
@parent graphics
@type Number
@default 20

@param antialiasing
@text Antialiasing
@parent graphics
@type Boolean
@default true

@param fov
@text FOV
@parent graphics
@type Number
@default 65

@param edgefix
@text Edge Fix
@desc Fixes rendering issues at the edges of tiles.
@parent graphics
@type Number
@decimals 1
@default 0.5

@param alphatest
@text Alpha Cutoff
@desc Pixels with alpha below this value will not be rendered.
@parent graphics
@type Number
@decimals 2
@min 0.01 @max 1
@default 0.51

@param fog
@text Fog

@param fogColor
@text Fog Color
@desc The color of the fog. Use css color code or name (example: #ffffff)
@parent fog
@type Color
@default white

@param fogNear
@text Fog Start Distance
@desc The distance in tiles at which the fog will start.
@parent fog
@type Number
@decimals 1
@default 15.0

@param fogFar
@text Fog End Distance
@desc The distance in tiles at which the fog will finish. Maybe set this to the same as render distance.
@parent fog
@type Number
@decimals 1
@default 20.0

@param light
@text Light & Shadow

@param ambientColor
@text Ambient Color
@desc The color of the ambient light.
@parent light
@type Color
@default white

@param characterShadows
@text Character Shadows
@parent light
@type Boolean
@default true

@param shadowScale
@text Default Shadow Scale
@parent light
@desc The default size of character shadows.
@type Number
@decimals 1
@default 0.8

@param shadowDist
@text Shadow Distance
@parent light
@desc How far above the ground before a character's shadow fades completely. 
@type Number
@decimals 1
@default 4.0

@param input
@text Input

@param keyboardPitch
@text Control pitch with keyboard
@parent input
@desc Allow player to change pitch with pageup & pagedown.
@type Boolean
@default true

@param keyboardTurn
@text Rotate camera with keyboard
@parent input
@desc In 3rd person mode, Q&E will rotate camera.
@type Boolean
@default true

@param keyboardStrafe
@text Enable Strafing
@parent input
@desc In 1st person mode, Q&E will strafe left and right.
@type Boolean
@default true

@param tileconfig
@text Tile Config

@param wallHeight
@text Wall Height
@desc The default height for wall tiles
@parent tileconfig
@type Number
@min -9999 @max 9999
@decimals 1
@default 2.0

@param tableHeight
@text Table Height
@desc The default height for table tiles
@parent tileconfig
@type Number
@min -9999 @max 9999
@decimals 2
@default 0.33

@param fringeHeight
@text Fringe Height
@parent tileconfig
@type Number
@min -9999 @max 9999
@decimals 1
@default 2.0

@param ceilingHeight
@text Ceiling Height
@desc Default height of ceiling for maps with ceiling enabled.
@parent tileconfig
@type Number
@min -9999 @max 9999
@decimals 1
@default 2.0

@param layerDist
@text Layering Distance
@desc The distance between tile layers. If this is too small
there may be z-fighting issues. (default: 0.0100)
@parent tileconfig
@type Number
@decimals 4
@default 0.0100

@param animDelay
@text Animation Speed
@desc The number of milliseconds between each frame in tile animations.
@parent tileconfig
@type Number
@default 333

@param regions
@text Regions
@desc use regions to determine tile height.
@parent tileconfig
@type struct<RegionHeight>[]
@default ["{\"regionId\":\"1\",\"conf\":\"height(1)\"}","{\"regionId\":\"2\",\"conf\":\"height(2)\"}","{\"regionId\":\"3\",\"conf\":\"height(3)\"}","{\"regionId\":\"4\",\"conf\":\"height(4)\"}","{\"regionId\":\"5\",\"conf\":\"height(5)\"}","{\"regionId\":\"6\",\"conf\":\"height(6)\"}","{\"regionId\":\"7\",\"conf\":\"height(7)\"}"]

@param ttags
@text Terrain Tags
@desc use terrain tags to determine tile height.
@parent tileconfig
@type struct<TTagHeight>[]
@default ["{\"terrainTag\":\"1\",\"conf\":\"height(1),shape(xcross)\"}","{\"terrainTag\":\"2\",\"conf\":\"height(1),shape(fence)\"}"]

@param characters
@text Characters

@param eventShape
@text Default Event Shape
@parent characters
@type combo
@option FLAT
@option SPRITE
@option TREE
@default SPRITE

@param eventHeight
@text Event "Above Characters" Default Height
@parent characters
@type Number
@decimals 1
@default 2.0

@param boatSettings
@text Boat Settings
@parent characters
@type struct<BoatStruct>
@default {"scale":"1","zoff":"-0.16","big":"false"}

@param shipSettings
@text Ship Settings
@parent characters
@type struct<BoatStruct>
@default {"scale":"1","zoff":"0.0","big":"false"}

@param airshipSettings
@text Airship Settings
@parent characters
@type struct<AirshipStruct>
@default {"scale":"1","height":"2.0","shadowScale":"1.0","shadowDist":"6.0","big":"false","bushLanding":"false"}

@param vehicleBush
@text Vehicle Bush
@parent characters
@desc Whether vehicles should be affected by bush tiles.
@type Boolean
@default false
*/
/*~struct~RegionHeight:
@param regionId
@text Region Id
@type Number
@min 1 @max 255
@default 1

@param conf
@text Configuration Functions
@desc See tileset configuration for list of functions
@type Text
@default height(2)
*/
/*~struct~TTagHeight:
@param terrainTag
@text Terrain Tag
@type Number
@min 1 @max 7
@default 1

@param conf
@text Configuration Functions
@desc See tileset configuration for list of functions
@type Text
@default height(0),shape(flat)
*/
/*~struct~BoatStruct:
@param scale
@text Scale
@type Number
@decimals 1
@default 1

@param zoff
@text Z Offset
@type Number
@min -9999 @max 9999
@decimals 2
@default 0.0

@param big
@text Big
@desc If true, vehicle requires a 3x3 space to move through. good for vehicles with large scales.
@type Boolean
@default false

*/
/*~struct~AirshipStruct:
@param scale
@text Scale
@type Number
@decimals 1
@default 1

@param height
@text Height
@type Number
@decimals 1
@default 2.0

@param shadowScale
@text Shadow Scale
@desc The default size of character shadows.
@type Number
@decimals 1
@default 1.0

@param shadowDist
@text Shadow Distance
@desc How far above the ground before Airship's shadow fades completely. 
@type Number
@decimals 1
@default 6.0

@param big
@text Big
@desc If true, vehicle requires a 3x3 space to move through. good for vehicles with large scales.
@type Boolean
@default false

@param bushLanding
@text Land on Bush Tiles
@desc Whether the airship can land on bush tiles.
@type Boolean
@default false

*/!function(e){var t={};function i(a){if(t[a])return t[a].exports;var s=t[a]={i:a,l:!1,exports:{}};return e[a].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(a,s,function(t){return e[t]}.bind(null,s));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=2)}([function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")},function(e,t,i){"use strict";i.r(t);const{Vector2:a,Vector3:s,Color3:r,Color4:h}=window.BABYLON,n=e=>{if("number"==typeof e)return{r:(e>>16)/255,g:(e>>8&255)/255,b:(255&e)/255,a:1};if(e instanceof r)return e.toColor4();if(e instanceof h)return e;{const t=document.createElement("canvas");t.width=1,t.height=1;const i=t.getContext("2d");i.fillStyle=e,i.fillRect(0,0,1,1);const a=i.getImageData(0,0,1,1).data;return new h(a[0]/255,a[1]/255,a[2]/255,a[3]/255)}},o=(e,t)=>{if(""===t)return+e;const i=/^[+]/.test(t);return i&&(t=t.substr(1)),t=Number(t),Number.isNaN(t)?+e:i?+e+t:+t},l=e=>Boolean(c(e)),c=e=>{if(!e)return!1;"string"!=typeof e&&(e=String(e));const t=e.toUpperCase();return!c.values.includes(t)&&e};c.values=["OFF","FALSE","UNDEFINED","NULL","DISABLE","DISABLED"];const p=(e=0)=>new Promise(t=>setTimeout(t,e)),g=e=>e*Math.PI/180,d=e=>180*e/Math.PI,u=()=>m(),m=()=>Game_Map.prototype.tileWidth(),f=()=>Game_Map.prototype.tileHeight(),_=new s(1,0,0),T=new s(0,1,0),C=new s(0,0,1),b=(new a(0,0),new s(0,0,0),window.BABYLON),{Scene:S,Engine:I,FreeCamera:y,HemisphericLight:E,DirectionalLight:M,SpotLight:w,PointLight:v,ShadowGenerator:A,Vector2:N,Vector3:L,Vector4:x,Color3:P,Color4:D,Plane:F,Node:O,TransformNode:H,Texture:V,StandardMaterial:R,Mesh:G,MeshBuilder:B,AssetsManager:$,SceneSerializer:Y}=b,{FRONTSIDE:k,BACKSIDE:z,DOUBLESIDE:X}=G,{PERSPECTIVE_CAMERA:j,ORTHOGRAPHIC_CAMERA:W}=b.Camera,{FOGMODE_NONE:U,FOGMODE_EXP:Z,FOGMODE_EXP2:K,FOGMODE_LINEAR:J}=S,q=b.Space.WORLD,Q=b.Space.LOCAL;b.Space.BONE;V.prototype.crop=function(e=0,t=0,i=0,a=0){const{width:s,height:r}=this.getBaseSize();i||(i=s-e),a||(a=r-t),se.EDGE_FIX&&(e+=se.EDGE_FIX,t+=se.EDGE_FIX,i-=2*se.EDGE_FIX,a-=2*se.EDGE_FIX),this.uScale=i/s,this.vScale=a/r,this.uOffset=e/s,this.vOffset=1-t/r-this.vScale},Object.defineProperties(O.prototype,{x:{get(){return this.position?this.position.x:void 0},set(e){this.position&&(this.position.x=e)}},y:{get(){return this.position?-this.position.z:void 0},set(e){this.position&&(this.position.z=-e)}},z:{get(){return this.position?this.position.y:void 0},set(e){this.position&&(this.position.y=e)}},pitch:{get(){return this.rotation?-d(this.rotation.x):void 0},set(e){this.rotation&&(this.rotation.x=-g(e))}},yaw:{get(){return this.rotation?-d(this.rotation.y):void 0},set(e){this.rotation&&(this.rotation.y=-g(e))}},roll:{get(){return this.rotation?-d(this.rotation.z):void 0},set(e){this.rotation&&(this.rotation.z=-g(e))}}}),Object.defineProperty(G.prototype,"order",{get(){return this._order},set(e){this._order=e,this._scene.sortMeshes()}});const ee=(e,t)=>(0|e._order)-(0|t._order);S.prototype.sortMeshes=function(){this.meshes.sort(ee)};const te=S.prototype.addMesh;S.prototype.addMesh=function(e){te.apply(this,arguments),"number"==typeof e._order&&this.sortMeshes()};const ie=S.prototype.removeMesh;S.prototype.removeMesh=function(e){ie.apply(this,arguments),this.sortMeshes()},P.prototype.toNumber=D.prototype.toNumber=function(){return 255*this.r<<16|255*this.g<<8|255*this.b};const ae={setup(){this.setupParameters(),this.canvas=document.createElement("canvas"),this.texture=PIXI.Texture.fromCanvas(this.canvas),this.engine=new I(this.canvas,this.ANTIALIASING),this.scene=new S(this.engine),this.scene.clearColor.set(0,0,0,0),this.cameraStick=new H("cameraStick",this.scene),this.cameraNode=new H("cameraNode",this.scene),this.cameraNode.parent=this.cameraStick,this.camera=new y("camera",new L(0,0,0),this.scene),this.camera.parent=this.cameraNode,this.camera.fov=g(ae.FOV),this.camera.orthoLeft=-Graphics.width/2/u(),this.camera.orthoRight=Graphics.width/2/u(),this.camera.orthoTop=Graphics.height/2/u(),this.camera.orthoBottom=-Graphics.height/2/u(),this.camera.minZ=.1,this.camera.maxZ=this.RENDER_DIST,this.scene.ambientColor=new P(1,1,1),this.scene.fogMode=J,this.map=new O("map",this.scene),this.cells={},this.characters=[],this.setupBlenders(),this.setupInput(),this.setupSpriteMeshes()},updateCanvas(){this.canvas.width=Graphics._width,this.canvas.height=Graphics._height},render(){this.scene.render(),this.texture.update()},lastMapUpdate:0,update(){performance.now()-this.lastMapUpdate>1e3&&!this.mapUpdating&&(this.updateMap(),this.lastMapUpdate=performance.now()),this.updateAnimations(),this.updateBlenders(),this.updateCharacters(),(ae.KEYBOARD_TURN||this.is1stPerson())&&(Input.isTriggered("rotleft")?this.blendCameraYaw.setValue(this.blendCameraYaw.targetValue()+90,.5):Input.isTriggered("rotright")&&this.blendCameraYaw.setValue(this.blendCameraYaw.targetValue()-90,.5),this.is1stPerson()&&(Input.isTriggered("rotleft")||Input.isTriggered("rotright"))&&this.playerFaceYaw()),ae.KEYBOARD_PITCH&&(Input.isPressed("pageup")&&Input.isPressed("pagedown")||(Input.isPressed("pageup")?this.blendCameraPitch.setValue(Math.min(180,this.blendCameraPitch.targetValue()+1.5),.1):Input.isPressed("pagedown")&&this.blendCameraPitch.setValue(Math.max(0,this.blendCameraPitch.targetValue()-1.5),.1)));for(const e in this.cells)this.cells[e].update();this.updateSerializer()},loadData:(e,t)=>$gameVariables&&$gameVariables.mv3d&&e in $gameVariables.mv3d?$gameVariables.mv3d[e]:t,saveData(e,t){if(!$gameVariables)return console.warn(`MV3D: Couldn't save data ${e}:${t}`);$gameVariables.mv3d||($gameVariables.mv3d={}),$gameVariables.mv3d[e]=t},updateCameraMode(){this.cameraMode.startsWith("O")?this.camera.mode!==W&&(this.camera.mode=W):this.camera.mode!==j&&(this.camera.mode=j)},get cameraMode(){return this.loadData("cameraMode",this.CAMERA_MODE).toUpperCase()},set cameraMode(e){e=String(e).toUpperCase().startsWith("O")?"ORTHOGRAPHIC":"PERSPECTIVE",this.saveData("cameraMode",e),this.updateBlenders(!0)},is1stPerson(e){const t=e?"currentValue":"targetValue";return this.getCameraTarget()===$gamePlayer&&this.blendCameraTransition[t]()<=0&&this.blendCameraDist[t]()<=0&&0===this.blendPanX[t]()&&0===this.blendPanY[t]()},loopCoords(e,t){if($gameMap.isLoopHorizontal()){const t=$gameMap.width(),i=this.cameraStick.x-t/2;e=(e-i).mod(t)+i}if($gameMap.isLoopVertical()){const e=$gameMap.height(),i=this.cameraStick.y-e/2;t=(t-i).mod(e)+i}return new N(e,t)},playerFaceYaw(){let e=Math.floor((45-ae.blendCameraYaw.targetValue())/90).mod(4);e>1&&(e+=(e+1)%2*2-1),e=10-(2*e+2),$gamePlayer.setDirection(e)},dirToYaw(e){let t=e/2-1;return t>1&&(t+=(t+1)%2*2-1),t=-90*t+180},transformDirectionYaw(e,t=this.blendCameraYaw.currentValue(),i=!1){if(0==e)return 0;(e=e/2-1)>1&&(e+=(e+1)%2*2-1);const a=Math.floor((t+45)/90);return(e=i?(e-a).mod(4):(e+a).mod(4))>1&&(e+=(e+1)%2*2-1),2*e+2}};window.mv3d=ae;var se=ae;const re=Graphics._createCanvas;Graphics._createCanvas=function(){se.setup(),se.updateCanvas(),re.apply(this,arguments)};const he=Graphics._updateAllElements;Graphics._updateAllElements=function(){he.apply(this,arguments),se.updateCanvas()};const ne=Graphics.render;Graphics.render=function(){se.render(),ne.apply(this,arguments)};const oe=Scene_Map.prototype.update;Scene_Map.prototype.update=function(){oe.apply(this,arguments),se.update()},ShaderTilemap.prototype.renderWebGL=function(e){};const le=Spriteset_Map.prototype.createTilemap;Spriteset_Map.prototype.createTilemap=function(){le.apply(this,arguments),this._tilemap.visible=!1,this._baseSprite.addChild(new PIXI.Sprite(se.texture))};const ce=Sprite_Character.prototype.setCharacter;Sprite_Character.prototype.setCharacter=function(e){ce.apply(this,arguments),Object.defineProperty(e,"mv_sprite",{value:this,configurable:!0})};const pe=Game_Player.prototype.performTransfer;Game_Player.prototype.performTransfer=function(){const e=this._newMapId!==$gameMap.mapId();e&&se.clearMap(),pe.apply(this,arguments)};const ge=Scene_Map.prototype.onMapLoaded;Scene_Map.prototype.onMapLoaded=function(){ge.apply(this,arguments),se.mapLoaded||se.loadMap(),se.updateBlenders(!0)};const de=PluginManager.parameters("mv3d-babylon");Object.assign(se,{CAMERA_MODE:"PERSPECTIVE",ORTHOGRAPHIC_DIST:100,ANIM_DELAY:Number(de.animDelay),ALPHA_CUTOFF:Math.max(.01,de.alphatest),EDGE_FIX:Number(de.edgefix),ANTIALIASING:l(de.antialiasing),FOV:Number(de.fov),WALL_HEIGHT:Number(de.wallHeight),TABLE_HEIGHT:Number(de.tableHeight),FRINGE_HEIGHT:Number(de.fringeHeight),CEILING_HEIGHT:Number(de.ceilingHeight),LAYER_DIST:Number(de.layerDist),CELL_SIZE:10,RENDER_DIST:Number(de.renderDist),FOG_COLOR:n(de.fogColor).toNumber(),FOG_NEAR:Number(de.fogNear),FOG_FAR:Number(de.fogFar),AMBIENT_COLOR:n(de.ambientColor).toNumber(),LIGHT_HEIGHT:.5,LIGHT_DECAY:1,LIGHT_DIST:3,LIGHT_ANGLE:45,CHARACTER_SHADOWS:l(de.characterShadows),SHADOW_SCALE:Number(de.shadowScale),SHADOW_DIST:Number(de.shadowDist),KEYBOARD_PITCH:l(de.keyboardPitch),KEYBOARD_TURN:l(de.keyboardTurn),KEYBOARD_STRAFE:l(de.keyboardStrafe),REGION_DATA:{},TTAG_DATA:{},EVENT_HEIGHT:Number(de.eventHeight),VEHICLE_BUSH:l(de.vehicleBush),BOAT_SETTINGS:JSON.parse(de.boatSettings),SHIP_SETTINGS:JSON.parse(de.shipSettings),AIRSHIP_SETTINGS:JSON.parse(de.airshipSettings),setupParameters(){for(let e of JSON.parse(de.regions)){e=JSON.parse(e);const t=this.readConfigurationFunctions(e.conf,this.tilesetConfigurationFunctions);this.REGION_DATA[e.regionId]=t,"height"in t&&(t.regionHeight=t.height,delete t.height)}for(let e of JSON.parse(de.ttags))e=JSON.parse(e),this.TTAG_DATA[e.terrainTag]=this.readConfigurationFunctions(e.conf,this.tilesetConfigurationFunctions);this.BOAT_SETTINGS.scale=Number(this.BOAT_SETTINGS.scale),this.BOAT_SETTINGS.zoff=Number(this.BOAT_SETTINGS.zoff),this.BOAT_SETTINGS.big=l(this.BOAT_SETTINGS.big),this.SHIP_SETTINGS.scale=Number(this.SHIP_SETTINGS.scale),this.SHIP_SETTINGS.zoff=Number(this.SHIP_SETTINGS.zoff),this.SHIP_SETTINGS.big=l(this.SHIP_SETTINGS.big),this.AIRSHIP_SETTINGS.scale=Number(this.AIRSHIP_SETTINGS.scale),this.AIRSHIP_SETTINGS.height=Number(this.AIRSHIP_SETTINGS.height),this.AIRSHIP_SETTINGS.shadowScale=Number(this.AIRSHIP_SETTINGS.shadowScale),this.AIRSHIP_SETTINGS.shadowDist=Number(this.AIRSHIP_SETTINGS.shadowDist),this.AIRSHIP_SETTINGS.big=l(this.AIRSHIP_SETTINGS.big),this.AIRSHIP_SETTINGS.bushLanding=l(this.AIRSHIP_SETTINGS.bushLanding),this.EVENT_SHAPE=this.configurationShapes[de.eventShape.toUpperCase()]}}),Object.assign(se,{cameraTargets:[],getCameraTarget(){return this.cameraTargets[0]},setCameraTarget(e,t){e?(this.cameraTargets.unshift(e),this.cameraTargets.length>2&&(this.cameraTargets.length=2),this.saveData("cameraTarget",this.getTargetString(e)),this.blendCameraTransition.value=1,this.blendCameraTransition.setValue(0,t)):this.cameraTargets.length=0},clearCameraTarget(){this.cameraTargets.length=0},resetCameraTarget(){this.clearCameraTarget(),this.setCameraTarget($gamePlayer,0)},rememberCameraTarget(){const e=this.loadData("cameraTarget");e&&this.setCameraTarget(this.targetChar(e),0)},setupBlenders(){this.blendFogColor=new ColorBlender("fogColor",this.FOG_COLOR),this.blendFogNear=new blenders_Blender("fogNear",this.FOG_NEAR),this.blendFogFar=new blenders_Blender("fogFar",this.FOG_FAR),this.blendCameraYaw=new blenders_Blender("cameraYaw",0),this.blendCameraYaw.cycle=360,this.blendCameraPitch=new blenders_Blender("cameraPitch",60),this.blendCameraPitch.min=0,this.blendCameraPitch.max=180,this.blendCameraDist=new blenders_Blender("cameraDist",10),this.blendCameraHeight=new blenders_Blender("cameraHeight",.7),this.blendAmbientColor=new ColorBlender("ambientColor",this.AMBIENT_COLOR),this.blendSunlightColor=new ColorBlender("light_color",16777215),this.blendSunlightIntensity=new blenders_Blender("light_intensity",1),this.blendPanX=new blenders_Blender("panX",0),this.blendPanY=new blenders_Blender("panY",0),this.blendCameraTransition=new blenders_Blender("cameraTransition",0)},updateBlenders(e){if(this.updateCameraMode(),this.cameraTargets.length||$gamePlayer&&(this.cameraTargets[0]=$gamePlayer),this.blendCameraTransition.update()&&this.cameraTargets.length>=2){const e=this.blendCameraTransition.currentValue();let t=this.cameraTargets[0];t===$gamePlayer&&$gamePlayer.isInVehicle()&&(t=$gamePlayer.vehicle());let i=this.cameraTargets[1];i===$gamePlayer&&$gamePlayer.isInVehicle()&&(i=$gamePlayer.vehicle()),this.cameraStick.x=t._realX*(1-e)+i._realX*e,this.cameraStick.y=t._realY*(1-e)+i._realY*e,t.mv3d_sprite&&i.mv3d_sprite?this.cameraStick.z=t.mv3d_sprite.z*(1-e)+i.mv3d_sprite.z*e:t.mv3d_sprite&&(this.cameraStick.z=t.mv3d_sprite.z)}else if(this.cameraTargets.length){let e=this.getCameraTarget();e===$gamePlayer&&$gamePlayer.isInVehicle()&&(e=$gamePlayer.vehicle()),this.cameraStick.x=e._realX,this.cameraStick.y=e._realY,e.mv3d_sprite&&(this.cameraStick.z=e.mv3d_sprite.z)}this.blendPanX.update(),this.blendPanY.update(),this.cameraStick.x+=this.blendPanX.currentValue(),this.cameraStick.y+=this.blendPanY.currentValue(),e|this.blendCameraPitch.update()|this.blendCameraYaw.update()|this.blendCameraDist.update()|this.blendCameraHeight.update()&&(this.cameraNode.pitch=this.blendCameraPitch.currentValue()-90,this.cameraNode.yaw=this.blendCameraYaw.currentValue(),this.cameraNode.position.set(0,0,0),this.cameraNode.translate(C,-this.blendCameraDist.currentValue(),Q),this.camera.mode===W?(this.camera.maxZ=this.RENDER_DIST,this.camera.minZ=-this.RENDER_DIST):(this.cameraNode.z<0&&(this.cameraNode.z=0),this.camera.maxZ=this.RENDER_DIST,this.camera.minZ=.1),this.cameraNode.z+=this.blendCameraHeight.currentValue()),e|this.blendFogColor.update()|this.blendFogNear.update()|this.blendFogFar.update()&&(this.scene.fogStart=this.blendFogNear.currentValue(),this.scene.fogEnd=this.blendFogFar.currentValue(),this.scene.fogColor.copyFromFloats(this.blendFogColor.r.currentValue()/255,this.blendFogColor.g.currentValue()/255,this.blendFogColor.b.currentValue()/255)),e|this.blendAmbientColor.update()&&this.scene.ambientColor.copyFromFloats(this.blendAmbientColor.r.currentValue()/255,this.blendAmbientColor.g.currentValue()/255,this.blendAmbientColor.b.currentValue()/255)}});class blenders_Blender{constructor(e,t){this.key=e,this.dfault=se.loadData(e,t),this.value=t,this.speed=1,this.max=1/0,this.min=-1/0,this.cycle=!1}setValue(e,t=0){let i=(e=Math.min(this.max,Math.max(this.min,e)))-this.value;if(i){if(this.saveValue(this.key,e),this.cycle)for(;Math.abs(i)>this.cycle/2;)this.value+=Math.sign(i)*this.cycle,i=e-this.value;this.speed=Math.abs(i)/(60*t)}}currentValue(){return this.value}targetValue(){return this.loadValue(this.key)}defaultValue(){return this.dfault}update(){const e=this.targetValue();if(this.value===e)return!1;const t=e-this.value;return this.speed>Math.abs(t)?this.value=e:this.value+=this.speed*Math.sign(t),!0}storageLocation(){return $gameVariables?($gameVariables.mv3d||($gameVariables.mv3d={}),$gameVariables.mv3d):(console.warn("MV3D: Couldn't get Blend storage location."),{})}loadValue(e){const t=this.storageLocation();return e in t?t[e]:this.dfault}saveValue(e,t){this.storageLocation()[e]=t}}class ColorBlender{constructor(e,t){this.dfault=t,this.r=new blenders_Blender(`${e}_r`,t>>16),this.g=new blenders_Blender(`${e}_g`,t>>8&255),this.b=new blenders_Blender(`${e}_b`,255&t)}setValue(e,t){this.r.setValue(e>>16,t),this.g.setValue(e>>8&255,t),this.b.setValue(255&e,t)}currentValue(){return this.r.value<<16|this.g.value<<8|this.b.value}targetValue(){return this.r.targetValue()<<16|this.g.targetValue()<<8|this.b.targetValue()}defaultValue(){return this.dfault}update(){let e=0;return e|=this.r.update(),e|=this.g.update(),e|=this.b.update(),Boolean(e)}get storageLocation(){return this.r.storageLocation}set storageLocation(e){this.r.storageLocation=e,this.g.storageLocation=e,this.b.storageLocation=e}currentComponents(){return[this.r.currentValue()/255,this.g.currentValue()/255,this.b.currentValue()/255]}targetComponents(){return[this.r.targetValue()/255,this.g.targetValue()/255,this.b.targetValue()/255]}}function ue(e,t,i){let a=void 0;return{configurable:!0,get:()=>null!=a?a:SceneManager._scene instanceof Scene_Map?se.is1stPerson()?i:t:e,set(e){a=e}}}Object.assign(Input.keyMapper,{81:"rotleft",69:"rotright",87:"up",65:"left",83:"down",68:"right"}),se.setupInput=function(){const e={left:ue("left","left","rotleft"),rotleft:ue("pageup","rotleft",se.KEYBOARD_STRAFE?"left":void 0),right:ue("right","right","rotright"),rotright:ue("pagedown","rotright",se.KEYBOARD_STRAFE?"right":void 0)};Object.defineProperties(Input.keyMapper,{37:e.left,39:e.right,81:e.rotleft,69:e.rotright,65:e.left,68:e.right})},Game_Player.prototype.getInputDirection=function(){let e=Input.dir4;return se.transformDirectionYaw(e,se.blendCameraYaw.currentValue(),!0)};const me=Game_Player.prototype.updateMove;Game_Player.prototype.updateMove=function(){me.apply(this,arguments),!this.isMoving()&&se.is1stPerson()&&se.playerFaceYaw()};const fe=Game_Player.prototype.moveStraight;Game_Player.prototype.moveStraight=function(e){fe.apply(this,arguments),!this.isMovementSucceeded()&&se.is1stPerson()&&se.playerFaceYaw()};const _e=e=>!!(e.isEnabled()&&e.isVisible&&e.isPickable)&&(!e.character||!e.character.isFollower&&!e.character.isPlayer);Scene_Map.prototype.processMapTouch=function(){if(TouchInput.isTriggered()||this._touchCount>0)if(TouchInput.isPressed()){if(0===this._touchCount||this._touchCount>=15){const e=se.scene.pick(TouchInput.x,TouchInput.y,_e);if(e.hit){const t={x:e.pickedPoint.x,y:-e.pickedPoint.z},i=e.pickedMesh;i.character&&(t.x=i.character.x,t.y=i.character.y),$gameTemp.setDestination(Math.round(t.x),Math.round(t.y))}}this._touchCount++}else this._touchCount=0};const Te=Game_Player.prototype.findDirectionTo;Game_Player.prototype.findDirectionTo=function(){const e=Te.apply(this,arguments);if(se.is1stPerson()&&e){let t=se.dirToYaw(e);se.blendCameraYaw.setValue(t,.25)}return e},Object.assign(se,{tilesetConfigurations:{},mapConfigurations:{},loadMapSettings(){this.tilesetConfigurations={};const e=this.readConfigurationBlocks($gameMap.tileset().note),t=/^\s*([abcde]\d?\s*,\s*\d+\s*,\s*\d+)\s*:(.*)$/gim;let i;for(;i=t.exec(e);){const e=i[1],t=this.readConfigurationFunctions(i[2],this.tilesetConfigurationFunctions),a=this.constructTileId(...e.split(","));a in this.tilesetConfigurations?Object.assign(this.tilesetConfigurations[a],t):this.tilesetConfigurations[a]=t}const a=this.mapConfigurations={};if(this.readConfigurationFunctions(this.readConfigurationBlocks($dataMap.note),this.mapConfigurationFunctions,a),"fog"in a){const e=a.fog;"color"in e&&this.blendFogColor.setValue(e.color,0),"near"in e&&this.blendFogNear.setValue(e.near,0),"far"in e&&this.blendFogFar.setValue(e.far,0)}"light"in a&&this.blendAmbientColor.setValue(a.light.color,0),"cameraDist"in a&&this.blendCameraDist.setValue(a.cameraDist,0),"cameraHeight"in a&&this.blendCameraHeight.setValue(a.cameraHeight,0),"cameraMode"in a&&(this.cameraMode=a.cameraMode),"cameraPitch"in a&&this.blendCameraPitch.setValue(a.cameraPitch,0),"cameraYaw"in a&&this.blendCameraYaw.setValue(a.cameraYaw,0)},getMapConfig(e,t){return e in this.mapConfigurations?this.mapConfigurations[e]:t},readConfigurationBlocks(e){const t=/<MV3D>([\s\S]*?)<\/MV3D>/gi;let i,a="";for(;i=t.exec(e);)a+=i[1]+"\n";return a},readConfigurationTags(e){const t=/<MV3D:([\s\S]*?)>/gi;let i,a="";for(;i=t.exec(e);)a+=i[1]+"\n";return a},readConfigurationFunctions(e,t=se.configurationFunctions,i={}){const a=/(\w+)\((.*?)\)/g;let s;for(;s=a.exec(e);){const e=s[1].toLowerCase();e in t&&t[e](i,...s[2].split(","))}return i},configurationSides:{front:k,back:z,double:X},configurationShapes:{FLAT:1,TREE:2,SPRITE:3,FENCE:4,CROSS:5,XCROSS:6},tilesetConfigurationFunctions:{height(e,t){e.height=Number(t)},fringe(e,t){e.fringe=Number(t)},float(e,t){e.float=Number(t)},texture(e,t,i,a){const s=se.constructTileId(t,i,a);e.sideId=e.topId=s},top(e,t,i,a){e.topId=se.constructTileId(t,i,a)},side(e,t,i,a){e.sideId=se.constructTileId(t,i,a)},inside(e,t,i,a){e.insideId=se.constructTileId(t,i,a)},offset(e,t,i){e.offsetSide=e.offsetTop=new N(Number(t),Number(i))},offsettop(e,t,i){e.offsetTop=new N(Number(t),Number(i))},offsetside(e,t,i){e.offsetSide=new N(Number(t),Number(i))},offsetinside(e,t,i){e.offsetInside=new N(Number(t),Number(i))},rect(e,t,i,a,s,r){this.recttop(e,t,i,a,s,r),this.rectside(e,t,i,a,s,r)},recttop(e,t,i,a,s,r){e.topId=se.constructTileId(t,0,0),e.rectTop=new PIXI.Rectangle(i,a,s,r),e.rectTop.setN=se.getSetNumber(e.topId)},rectside(e,t,i,a,s,r){e.sideId=se.constructTileId(t,0,0),e.rectSide=new PIXI.Rectangle(i,a,s,r),e.rectSide.setN=se.getSetNumber(e.sideId)},rectinside(e,t,i,a,s,r){e.insideId=se.constructTileId(t,0,0),e.rectInside=new PIXI.Rectangle(i,a,s,r),e.rectInside.setN=se.getSetNumber(e.insideId)},shape(e,t){e.shape=se.configurationShapes[t.toUpperCase()]},alpha(e,t){e.transparent=!0,e.alpha=Number(t)},glow(e,t){e.glow=Number(t)}},eventConfigurationFunctions:{height(e,t){e.height=Number(t)},z(e,t){e.z=Number(t)},x(e,t){e.x=Number(t)},y(e,t){e.y=Number(t)},side(e,t){e.side=se.configurationSides[t.toLowerCase()]},scale(e,t,i){e.scale=new N(Number(t),Number(i))},rot(e,t){e.rot=Number(t)},bush(e,t){e.bush="true"==t.toLowerCase()},shadow(e,t){e.shadow="true"==t.toLowerCase()},shadowscale(e,t){e.shadowScale=Number(t)},shape(e,t){e.shape=se.configurationShapes[t.toUpperCase()]},pos(e,t,i){e.pos={x:t,y:i}},light(){this.lamp(...arguments)},lamp(e,t="ffffff",i=1,a=se.LIGHT_DIST){e.lamp={color:n(t).toNumber(),intensity:Number(i),distance:Number(a)}},flashlight(e,t="ffffff",i=1,a=se.LIGHT_DIST,s=se.LIGHT_ANGLE){e.flashlight={color:n(t).toNumber(),intensity:Number(i),distance:Number(a),angle:Number(s)}},flashlightpitch(e,t="90"){e.flashlightPitch=Number(t)},flashlightyaw(e,t="+0"){e.flashlightYaw=t},lightheight(e,t=1){e.lightHeight=Number(t)},lightoffset(e,t=0,i=0){e.lightOffset={x:+t,y:+i}},alphatest(e,t=1){e.alphaTest=Number(t)}},mapConfigurationFunctions:{light(e,t){e.light={color:n(t).toNumber()}},fog(e,t,i,a){e.fog||(e.fog={}),t=n(t).toNumber(),i=Number(i),a=Number(a),Number.isNaN(t)||(e.fog.color=t),Number.isNaN(i)||(e.fog.near=i),Number.isNaN(a)||(e.fog.far=a)},yaw(e,t){this.camerayaw(e,t)},pitch(e,t){this.camerapitch(e,t)},camerayaw(e,t){e.cameraYaw=Number(t)},camerapitch(e,t){e.cameraPitch=Number(t)},dist(e,t){this.cameradist(e,t)},cameradist(e,t){e.cameraDist=Number(t)},height(e,t){this.cameraheight(e,t)},cameraheight(e,t){e.cameraHeight=Number(t)},mode(e,t){this.cameramode(e,t)},cameramode(e,t){e.cameraMode=t},edge(e,t){e.edge=l(t)},ceiling(e,t,i,a,s=se.CEILING_HEIGHT){e.ceiling=se.constructTileId(t,i,a),e.ceilingHeight=s}}});const Ce=Game_Event.prototype.setupPage;Game_Event.prototype.setupPage=function(){Ce.apply(this,arguments),this.mv3d_sprite&&(this.mv3d_needsConfigure=!0,this.mv3d_sprite.eventConfigure())};const be=Game_Event.prototype.initialize;Game_Event.prototype.initialize=function(){be.apply(this,arguments),se.mapLoaded&&se.createCharacterFor(this);const e=this.event();let t={};se.readConfigurationFunctions(se.readConfigurationTags(e.note),se.eventConfigurationFunctions,t),"pos"in t&&this.locate(o(e.x,t.pos.x),o(e.y,t.pos.y)),this.mv3d_blenders||(this.mv3d_blenders={}),"lamp"in t&&(this.mv3d_blenders.lampColor_r=t.lamp.color>>16,this.mv3d_blenders.lampColor_g=t.lamp.color>>8&255,this.mv3d_blenders.lampColor_b=255&t.lamp.color,this.mv3d_blenders.lampIntensity=t.lamp.intensity,this.mv3d_blenders.lampDistance=t.lamp.distance),"flashlight"in t&&(this.mv3d_blenders.flashlightColor_r=t.flashlight.color>>16,this.mv3d_blenders.flashlightColor_g=t.flashlight.color>>8&255,this.mv3d_blenders.flashlightColor_b=255&t.flashlight.color,this.mv3d_blenders.flashlightIntensity=t.flashlight.intensity,this.mv3d_blenders.flashlightDistance=t.flashlight.distance,this.mv3d_blenders.flashlightAngle=t.flashlight.angle),"flashlightPitch"in t&&(this.mv3d_blenders.flashlightPitch=Number(t.flashlightPitch)),"flashlightYaw"in t&&(this.mv3d_blenders.flashlightYaw=t.flashlightYaw),this.mv3d_needsConfigure=!0};const Se=Game_Interpreter.prototype.pluginCommand;Game_Interpreter.prototype.pluginCommand=function(e,t){if("mv3d"!==e.toLowerCase())return Se.apply(this,arguments);const i=new se.PluginCommand;if(i.INTERPRETER=this,i.FULL_COMMAND=[e,...t].join(" "),t=t.filter(e=>e),i.CHAR=$gameMap.event(this._eventId),t[0]){const e=t[0][0];"@"!==e&&"＠"!==e||(i.CHAR=i.TARGET_CHAR(t.shift()))}const a=t.shift().toLowerCase();a in i&&i[a](...t)},se.PluginCommand=class{async camera(...e){var t=this._TIME(e[2]);switch(e[0].toLowerCase()){case"pitch":return void this.pitch(e[1],t);case"yaw":return void this.yaw(e[1],t);case"dist":case"distance":return void this.dist(e[1],t);case"height":return void this.height(e[1],t);case"mode":return void this.cameramode(e[1]);case"target":return void this._cameraTarget(e[1],t);case"pan":return void this.pan(e[1],e[2],e[3])}}yaw(e,t=1){this._RELATIVE_BLEND(se.blendCameraYaw,e,t),se.is1stPerson()&&se.playerFaceYaw()}pitch(e,t=1){this._RELATIVE_BLEND(se.blendCameraPitch,e,t)}dist(e,t=1){this._RELATIVE_BLEND(se.blendCameraDist,e,t)}height(e,t=1){this._RELATIVE_BLEND(se.blendCameraHeight,e,t)}_cameraTarget(e,t){se.setCameraTarget(this.TARGET_CHAR(e),t)}pan(e,t,i=1){console.log(e,t,i),i=this._TIME(i),this._RELATIVE_BLEND(se.blendPanX,e,i),this._RELATIVE_BLEND(se.blendPanY,t,i)}rotationmode(e){se.rotationMode=e}pitchmode(e){se.pitchMode=e}_VEHICLE(e,t,i){t=t.toLowerCase();const a=`${Vehicle}_${t}`;i="big"===t?booleanString(i):o(se.loadData(a,0),i),se.saveData(a,i)}boat(e,t){this._VEHICLE("boat",e,t)}ship(e,t){this._VEHICLE("ship",e,t)}airship(e,t){this._VEHICLE("airship",e,t)}cameramode(e){se.cameraMode=e}fog(...e){var t=this._TIME(e[2]);switch(e[0].toLowerCase()){case"color":return void this._fogColor(e[1],t);case"near":return void this._fogNear(e[1],t);case"far":return void this._fogFar(e[1],t);case"dist":case"distance":return t=this._TIME(e[3]),this._fogNear(e[1],t),void this._fogFar(e[2],t)}t=this._TIME(e[3]),this._fogColor(e[0],t),this._fogNear(e[1],t),this._fogFar(e[2],t)}_fogColor(e,t){se.blendFogColor.setValue(n(e).toNumber(),t)}_fogNear(e,t){this._RELATIVE_BLEND(se.blendFogNear,e,t)}_fogFar(e,t){this._RELATIVE_BLEND(se.blendFogFar,e,t)}light(...e){var t=this._TIME(e[2]);switch(e[0].toLowerCase()){case"color":return void this._lightColor(e[1],t)}t=this._TIME(e[1]),this._lightColor(e[0],t)}_lightColor(e,t=1){se.blendAmbientColor.setValue(n(e).toNumber(),t)}async lamp(...e){const t=await this.AWAIT_CHAR(this.CHAR);t.setupLamp();var i=this._TIME(e[2]);switch(e[0].toLowerCase()){case"color":return void this._lampColor(t,e[1],i);case"intensity":return void this._lampIntensity(t,e[1],i);case"dist":case"distance":return void this._lampDistance(t,e[1],i)}i=this._TIME(e[3]),this._lampColor(t,e[0],i),this._lampIntensity(t,e[1],i),this._lampDistance(t,e[2],i)}_lampColor(e,t,i=1){e.blendLampColor.setValue(n(t).toNumber(),i)}_lampIntensity(e,t,i=1){this._RELATIVE_BLEND(e.blendLampIntensity,t,i)}_lampDistance(e,t,i=1){this._RELATIVE_BLEND(e.blendLampDistance,t,i)}async flashlight(...e){const t=await this.AWAIT_CHAR(this.CHAR);t.setupFlashlight();var i=this._TIME(e[2]);switch(e[0].toLowerCase()){case"color":return void this._flashlightColor(t,e[1],i);case"intensity":return void this._flashlightIntensity(t,e[1],i);case"dist":case"distance":return void this._flashlightDistance(t,e[1],i);case"angle":return void this._flashlightAngle(t,e[1],i);case"yaw":return void this._flashlightYaw(t,e[1],i);case"pitch":return void this._flashlightPitch(t,e[1],i)}i=this._TIME(e[4]),this._flashlightColor(t,e[0],i),this._flashlightIntensity(t,e[1],i),this._flashlightDistance(t,e[2],i),this._flashlightAngle(t,e[3],i)}_flashlightColor(e,t,i){e.blendFlashlightColor.setValue(n(t).toNumber(),i)}_flashlightIntensity(e,t,i){this._RELATIVE_BLEND(e.blendFlashlightIntensity,t,i)}_flashlightDistance(e,t,i){this._RELATIVE_BLEND(e.blendFlashlightDistance,t,i)}_flashlightAngle(e,t,i){this._RELATIVE_BLEND(e.blendFlashlightAngle,t,i)}_flashlightPitch(e,t,i){this._RELATIVE_BLEND(e.blendFlashlightPitch,t,i)}_flashlightYaw(e,t,i){e.flashlightTargetYaw=t}_RELATIVE_BLEND(e,t,i){e.setValue(o(e.targetValue(),t),Number(i))}_TIME(e){return"number"==typeof e?e:(e=Number(e),Number.isNaN(e)?1:e)}ERROR_CHAR(){console.warn(`MV3D: Plugin command \`${this.FULL_COMMAND}\` failed because target character was invalid.`)}async AWAIT_CHAR(e){if(!e)return this.ERROR_CHAR();let t=0;for(;!e.mv3d_sprite;)if(await sleep(100),++t>10)return this.ERROR_CHAR();return e.mv3d_sprite}TARGET_CHAR(e){return se.targetChar(e,$gameMap.event(this.INTERPRETER._eventId),this.CHAR)}},se.targetChar=function(e,t=null,i=null){if(!e)return i;let a=e.toLowerCase().match(/[a-z]+/);const s=a?a[0]:"e",r=(a=e.match(/\d+/))?Number(a[0]):0;switch(s[0]){case"s":return t;case"p":return $gamePlayer;case"e":return r?$gameMap.event(r):t;case"v":return $gameMap.vehicle(r);case"f":return $gamePlayer.followers()._data[r]}return char},se.getTargetString=function(e){return e instanceof Game_Player?"@p":e instanceof Game_Event?`@e${e._eventId}`:e instanceof Game_Follower?`@f${$gamePlayer._followers._data.indexOf(e)}`:e instanceof Game_Vehicle?`@v${$gameMap._vehicles.indexOf(e)}`:void 0},Object.assign(se,{_tilemap:null,getTilemap(){return SceneManager._scene&&SceneManager._scene._spriteset&&(this._tilemap=SceneManager._scene._spriteset._tilemap),this._tilemap},getSetNumber:e=>Tilemap.isAutotile(e)?Tilemap.isTileA1(e)?0:Tilemap.isTileA2(e)?1:Tilemap.isTileA3(e)?2:3:Tilemap.isTileA5(e)?4:5+Math.floor(e/256),getTerrainTag:e=>$gameMap.tilesetFlags()[e]>>12,getMaterialOptions(e){const t={},i=this.tilesetConfigurations[this.normalizeAutotileId(e)];return i&&("alpha"in i&&(t.alpha=i.alpha),"transparent"in i&&(t.transparent=i.transparent),"glow"in i&&(t.glow=i.glow)),t},getTileConfig(e,t,i,a){const s={},r=this.getTerrainTag(e);r&&r in this.TTAG_DATA&&Object.assign(s,this.TTAG_DATA[r]);const h=this.tilesetConfigurations[this.normalizeAutotileId(e)];if(h&&Object.assign(s,h),0===a){const e=$gameMap.regionId(t,i);e&&e in se.REGION_DATA&&Object.assign(s,this.REGION_DATA[e])}return s},getTileTextureOffsets(e,t,i,a){const s=this.getTileConfig(e,t,i,a),r=Tilemap.isAutotile(e)?48:1,h=this.getTilemap();return s.hasInsideConf=Boolean(s.offsetInside||s.rectInside||"insideId"in s),s.hasBottomConf=Boolean(s.offsetBottom||s.rectBottom||"bottomId"in s),null==s.topId&&(s.topId=e,s.offsetTop&&(s.topId=e+s.offsetTop.x*r+s.offsetTop.y*r*8)),null==s.sideId&&(s.sideId=e,s.offsetSide&&(s.sideId=e+s.offsetSide.x*r+s.offsetSide.y*r*8)),null==s.insideId&&(s.insideId=s.sideId,s.offsetInside&&(s.insideId=e+s.offsetInside.x*r+s.offsetInside.y*r*8)),null==s.bottomId&&(s.bottomId=s.topId,s.offsetBottom&&(s.bottomId=e+s.offsetBottom.x*r+s.offsetBottom.y*r*8)),s.fringeHeight=s.height||0,null==s.fringe&&(s.fringe=!this.isTileEmpty(e)&&h&&h._isHigherTile(e)?this.FRINGE_HEIGHT:0),s},getTileData(e,t){if(!$dataMap||!$dataMap.data)return[0,0,0,0];const i=$dataMap.data,a=$dataMap.width,s=$dataMap.height;if($gameMap.isLoopHorizontal()&&(e=e.mod(a)),$gameMap.isLoopVertical()&&(t=t.mod(s)),e<0||e>=a||t<0||t>=s)return[0,0,0,0];const r=[];for(let h=0;h<4;++h)r[h]=i[(h*s+t)*a+e]||0;return r},getTileHeight(e,t,i=0){if(!$dataMap)return 0;$gameMap.isLoopHorizontal()&&(e=e.mod($dataMap.width)),$gameMap.isLoopVertical()&&(t=t.mod($dataMap.height));const a=this.getTileData(e,t)[i];if(this.isTileEmpty(a))return 0;const s=this.getTilemap();if(s&&s._isHigherTile(a))return 0;const r=this.getTileConfig(a,e,t,i);if("regionHeight"in r){let e=r.regionHeight;return r.height<0&&(e+=r.height),e}return"height"in r?r.height:this.isWallTile(a)?this.WALL_HEIGHT:s&&s._isTableTile(a)?this.TABLE_HEIGHT:this.isSpecialShape(r.shape)?1:0},getStackHeight(e,t,i=3){let a=0;for(let s=0;s<=i;++s)a+=this.getTileHeight(e,t,s);return a},getWalkHeight(e,t){const i=Math.round(e),a=Math.round(t),s=this.getTileData(i,a);let r=0,h=0;for(let e=0;e<=3;++e){const t=s[e];if(this.isTileEmpty(t))continue;r+=h,h=this.getTileHeight(i,a,e);const n=this.getTileConfig(t,i,a,e).shape;this.isSpecialShape(n)||(r+=h,h=0)}return r},getFloatHeight(e,t){const i=this.getTileData(e,t);let a=0;for(let s=0;s<=3;++s){const r=i[s];if(this.isTileEmpty(r))continue;const h=this.getTileConfig(r,e,t,s);h&&"float"in h&&(a+=h.float)}return a},getFringeHeight(e,t,i=3){let a=this.getStackHeight(e,t,i-1);const s=this.getTileData(e,t)[i],r=this.getTileConfig(s,e,t,i);return r&&this.getTilemap()._isHigherTile(s)?a+(r.fringe||this.FRINGE_HEIGHT)+(r.height||0):0},getCullingHeight(e,t,i=3,a=!1){const s=this.getTileData(e,t);let r=0;for(let h=0;h<=i;++h){const i=s[h],n=this.getTileConfig(i,e,t,h),o=n.shape;if(this.isSpecialShape(o))return r;a&&n.height<0&&(r-=n.height),r+=this.getTileHeight(e,t,h)}return r},getTileRects(e){const t=[],i=this.getTilemap(),a=i._isTableTile(e);if(i._drawTile({addRect:(e,i,a,s,r,h,n,o,l)=>{t.push({setN:e,x:i,y:a,width:h,height:n,ox:s,oy:r})}},e,0,0),a)for(let e=t.length-1;e>=0;--e)t[e].oy>u()/2&&(t[e-1].y+=2*u()/3,t.splice(e,1));return t},isTileEmpty:e=>!e||1544===e,isWallTile(e){const t=Tilemap.getAutotileKind(e),i=Math.floor(t/8),a=Tilemap.isTileA3(e)||Tilemap.isTileA4(e);return a&&i%2?2:a},isTableTile(e){return Boolean(this.getTilemap()._isTableTile(e))},isFringeTile(e){return Boolean(this.getTilemap()._isHigherTile(e))},isWaterfallTile(e){const t=Tilemap.getAutotileKind(e);return Tilemap.isTileA1(e)&&t>=4&&t%2},isSpecialShape(e){const t=se.configurationShapes;return e===t.FENCE||e===t.CROSS||e===t.XCROSS},constructTileId(e,t,i){const a=`TILE_ID_${e.toUpperCase()}`;let s=a in Tilemap?Tilemap[a]:0;const r=Tilemap.isAutotile(s)?48:1;return s+=Number(t)*r+Number(i)*r*8},normalizeAutotileId(e){if(!Tilemap.isAutotile(e))return e;const t=Tilemap.getAutotileKind(e);return Tilemap.TILE_ID_A1+48*t}});const Ie=new F(0,1,-Math.pow(.1,100),0),ye=new F(0,0,-1,0);class mapCell_MapCell extends H{constructor(e,t){const i=[e,t].toString();super(`MapCell[${i}]`,se.scene),this.parent=se.map,this.cx=e,this.cy=t,this.ox=e*se.CELL_SIZE,this.oy=t*se.CELL_SIZE,this.x=this.ox,this.y=this.oy,this.key=i}update(){const e=se.loopCoords((this.cx+.5)*se.CELL_SIZE,(this.cy+.5)*se.CELL_SIZE);this.x=e.x-se.CELL_SIZE/2,this.y=e.y-se.CELL_SIZE/2}getCachedMesh(e=1,t=1,i=k,a=!1){const s=`${e},${t}|${i}|${+a}`;let r;return s in mapCell_MapCell.meshCache?r=mapCell_MapCell.meshCache[s].clone():(r=B.CreatePlane("tile",{sideOrientation:i,width:e,height:t,sourcePlane:a?ye:Ie},se.scene),mapCell_MapCell.meshCache[s]=r,se.scene.removeMesh(r),r=r.clone()),this.submeshes.push(r),r.parent=this,r}createMesh(e=1,t=1,i=k,a=!1){const s=B.CreatePlane("tile",{sideOrientation:i,width:e,height:t,sourcePlane:a?ye:Ie},se.scene);return this.submeshes.push(s),s.parent=this,s}async load(){const e=se.configurationShapes;this.submeshes=[];const t=Math.min(se.CELL_SIZE,$gameMap.width()-this.cx*se.CELL_SIZE),i=Math.min(se.CELL_SIZE,$gameMap.height()-this.cy*se.CELL_SIZE),a={bottomId:se.getMapConfig("ceiling",0),height:se.getMapConfig("ceilingHeight",se.CEILING_HEIGHT),cull:!1};for(let s=0;s<i;++s)for(let i=0;i<t;++i){a.cull=!1;let t=0;const r=se.getTileData(this.ox+i,this.oy+s);for(let h=0;h<4;++h){if(se.isTileEmpty(r[h]))continue;let n=se.getStackHeight(this.ox+i,this.oy+s,h);const o=se.getTileTextureOffsets(r[h],i,s,h),l=o.shape;o.realId=r[h];const c=se.getTileHeight(this.ox+i,this.oy+s,h)||o.height||0;n+=o.fringe,se.isFringeTile(r[h])&&(n+=o.fringeHeight),l&&l!==e.FLAT?t=0:(this.loadTile(o,i,s,n,h),o.hasBottomConf||o.height>0&&(h>0||o.fringe),c?(this.loadWalls(o,i,s,n,h,c+t*se.LAYER_DIST),t=0):++t,n>=a.height&&(a.cull=!0)),l===e.FENCE?this.loadFence(o,i,s,n,h,c):l!==e.CROSS&&l!==e.XCROSS||this.loadCross(o,i,s,n,h,c)}if(se.isTileEmpty(a.bottomId)||a.cull||this.loadTile(a,i,s,a.height,0,!0),await p(),!se.mapLoaded)return void this.earlyExit()}this.submeshes.length?(this.submeshes.forEach(e=>e.parent=null),this.mesh=G.MergeMeshes(this.submeshes,!0,void 0,void 0,!1,!0)):(console.warn("MV3D: Created empty map cell!"),this.mesh=new G("empty mesh",se.scene)),this.mesh.parent=this,delete this.submeshes}earlyExit(){if(console.warn(`MV3D: Map cleared before cell[${this.cx},${this.cy}] finished loading.`),this.submeshes){for(const e of this.submeshes)e.dispose();this.submeshes.length=0}}loadTile(e,t,i,a,s,r=!1){const h=r?e.bottomId:e.topId,n=r?e.rectTop:e.rectBottom,o=Tilemap.isAutotile(h),l=se.getSetNumber(h);let c;c=n?[n]:se.getTileRects(h);for(const e of c){const n=this.getCachedMesh(1-o/2,1-o/2,r?z:k);n.material=se.getCachedTileMaterial(l,e.x,e.y,e.width,e.height,se.getMaterialOptions(h)),n.x=t+(0|e.ox)/u()-.25*o,n.y=i+(0|e.oy)/u()-.25*o,n.z=a+s*se.LAYER_DIST}}loadWalls(e,t,i,a,s,r){const h=r,n=se.isFringeTile(e.realId);for(let o=0;o<mapCell_MapCell.neighborPositions.length;++o){const l=mapCell_MapCell.neighborPositions[o];if(!se.getMapConfig("edge",!0)&&((this.ox+t+l.x>=$dataMap.width||this.ox+t+l.x<0)&&!$gameMap.isLoopHorizontal()||(this.oy+i+l.y>=$dataMap.height||this.oy+i+l.y<0)&&!$gameMap.isLoopVertical()))continue;r=e.height<0&&a<se.getStackHeight(this.ox+t+l.x,this.oy+i+l.y,s)?e.height:h;let c,p=e.sideId;r<0&&e.hasInsideConf?(p=e.insideId,e.rectInside&&(c=e.rectInside)):e.rectSide&&(c=e.rectSide);const g=se.getSetNumber(p);let d=r;if(n){if(se.getFringeHeight(this.ox+t+l.x,this.oy+i+l.y,s)===a)continue}else{const h=se.getCullingHeight(this.ox+t+l.x,this.oy+i+l.y,s,!(e.height<0));if(r>0&&h>=a||r<0&&h<=a)continue;d=Math.min(Math.abs(r),Math.abs(a-h))*Math.sign(r)}const m=Math.sign(d),f=new L(t+l.x/2,i+l.y/2,a),C=Math.atan2(l.x,l.y);if(c||!Tilemap.isAutotile(p)){const e=c||se.getTileRects(p)[0],t=this.getCachedMesh(1,d,k,!0);d<0&&(t.scaling.y*=-1),t.material=se.getCachedTileMaterial(g,e.x,e.y,e.width,e.height,se.getMaterialOptions(p)),t.rotate(T,-C,q),t.x=f.x,t.y=f.y,t.z=a-d/2}else{const h=mapCell_MapCell.neighborPositions[(+o-1).mod(4)],n=mapCell_MapCell.neighborPositions[(+o+1).mod(4)],l=se.getStackHeight(this.ox+t+h.x,this.oy+i+h.y,s),c=se.getStackHeight(this.ox+t+n.x,this.oy+i+n.y,s),{x:b,y:S}=this.getAutotileCorner(p,e.realId);let I=Math.abs(Math.round(2*d)),y=Math.abs(d/I),E=u()/2,M=u()/2;se.isTableTile(e.realId)&&(M=u()/3,I=1,y=r);for(let t=-1;t<=1;t+=2)for(let i=0;i<I;++i){let h,n,o,w;se.isTableTile(e.realId)&&(h=l!=a,n=c!=a),r<0?(h=!0,n=!0):(h=l<a-i*y,n=c<a-i*y),o=b*u(),w=S*u(),o=(b+(t>0?.5+n:1-h))*u(),d<0&&(o=(b+(t>0?0+h:1.5-n))*u()),w=se.isWaterfallTile(p)?(S+i%2/2)*u():se.isTableTile(p)?(S+5/3)*u():(S+(0===i?0:i===I-1?1.5:1-i%2*.5))*u();const v=this.getCachedMesh(.5,y,r<0?z:k,!0);v.rotate(T,-C,q),v.x=f.x,v.y=f.y,v.z=a-y*m/2-y*m*i+s*se.LAYER_DIST,v.translate(_,.25*t,Q),v.material=se.getCachedTileMaterial(g,o,w,E,M,se.getMaterialOptions(p))}}}}loadFence(e,t,i,a,s,r){const h=e.sideId,n=e.rectSide,o=se.getSetNumber(h),l=Tilemap.isAutotile(h),c=[];for(let e=0;e<mapCell_MapCell.neighborPositions.length;++e){const a=mapCell_MapCell.neighborPositions[e];se.getTileHeight(this.ox+t+a.x,this.oy+i+a.y,s)!==r&&c.push(e)}for(let s=0;s<mapCell_MapCell.neighborPositions.length;++s){const p=mapCell_MapCell.neighborPositions[s],g=c.includes(s);if(g&&c.length<4&&!l)continue;const d=p.x>0||p.y>0;let u=Math.atan2(p.x,p.y)+Math.PI/2;if(d&&(u-=Math.PI),l&&!n){const{x:s,y:n}=this.getAutotileCorner(h,e.realId);for(let e=0;e<=1;++e){const l=this.getCachedMesh(.5,r/2,X,!0);l.rotate(T,-u,q),l.material=se.getCachedTileMaterial(o,(g?s+1.5*d:s+1-.5*d)*m(),(n+1.5*e)*f(),m()/2,f()/2,se.getMaterialOptions(h)),l.x=t+p.x/4,l.y=i+p.y/4,l.z=a-r/4-e*r/2}}else{const e=n||se.getTileRects(h)[0],s=this.getCachedMesh(.5,r,X,!0);s.rotate(T,-u,q),s.material=se.getCachedTileMaterial(o,e.x+e.width/2*d,e.y,e.width/2,e.height,se.getMaterialOptions(h)),s.x=t+p.x/4,s.y=i+p.y/4,s.z=a-r/2}}}loadCross(e,t,i,a,s,r){const h=e.sideId,n=e.rectSide,o=se.getSetNumber(h),l=Tilemap.isAutotile(h);let c;c=n?[n]:se.getTileRects(h);const p=e.shape===se.configurationShapes.XCROSS?Math.PI/4:0,g=l?r/2:r;for(let e=0;e<=1;++e)for(const s of c){const n=this.getCachedMesh(1-l/2,g,X,!0);n.x=t,n.y=i,n.z=a-(0|s.oy)/f()*r-g/2,n.rotate(T,-Math.PI/2*e+p,q),n.translate(_,-.25*l+(0|s.ox)/m(),Q),n.material=se.getCachedTileMaterial(o,s.x,s.y,s.width,s.height,se.getMaterialOptions(h))}}getAutotileCorner(e,t=e){const i=Tilemap.getAutotileKind(e);let a=i%8,s=Math.floor(i/8);var r,h;return e===t&&1==se.isWallTile(e)&&++s,r=2*a,h=s,Tilemap.isTileA1(e)?i<4?(h=i%2*3+1,r=6*Math.floor(i/2)):(r=8*Math.floor(a/4)+i%2*6,h=6*s+3*Math.floor(a%4/2)+1-a%2):Tilemap.isTileA2(e)?h=3*(s-2)+1:Tilemap.isTileA3(e)?h=2*(s-6):Tilemap.isTileA4(e)&&(h=2.5*(s-10)+(s%2?.5:0)),{x:r,y:h}}}mapCell_MapCell.neighborPositions=[new N(0,1),new N(1,0),new N(0,-1),new N(-1,0)],mapCell_MapCell.meshCache={};Object.assign(se,{mapLoaded:!1,clearMap(){this.mapLoaded=!1;for(const e in this.textureCache)this.textureCache[e].dispose();for(const e in this.materialCache)this.materialCache[e].dispose();this.animatedTextures.length=0,this.textureCache={},this.materialCache={};for(const e in this.cells)this.cells[e].dispose(!1,!0);this.cells={};for(const e of this.characters)e.dispose(!1,!0);this.characters.length=0},loadMap(){this.loadMapSettings(),this.updateBlenders(),this.updateMap(),this.createCharacters()},async updateMap(){if(this.mapUpdating)return;this.mapLoaded=!0,this.mapUpdating=!0;const e={left:Math.floor((this.cameraStick.x-this.RENDER_DIST)/this.CELL_SIZE),right:Math.floor((this.cameraStick.x+this.RENDER_DIST)/this.CELL_SIZE),top:Math.floor((this.cameraStick.y-this.RENDER_DIST)/this.CELL_SIZE),bottom:Math.floor((this.cameraStick.y+this.RENDER_DIST)/this.CELL_SIZE)};$gameMap.isLoopHorizontal()||(e.left=Math.max(0,e.left),e.right=Math.min(e.right,Math.floor($gameMap.width()/se.CELL_SIZE))),$gameMap.isLoopVertical()||(e.top=Math.max(0,e.top),e.bottom=Math.min(e.bottom,Math.floor($gameMap.height()/se.CELL_SIZE)));const t=[];for(let i=e.left;i<=e.right;++i)for(let a=e.top;a<=e.bottom;++a){let e=i,s=a;$gameMap.isLoopHorizontal()&&(e=e.mod(Math.ceil($gameMap.width()/se.CELL_SIZE))),$gameMap.isLoopVertical()&&(s=s.mod(Math.ceil($gameMap.height()/se.CELL_SIZE))),[e,s].toString()in this.cells||t.push(new N(e,s))}const i=new N(Math.round(this.cameraStick.x/this.CELL_SIZE-.5),Math.round(this.cameraStick.y/this.CELL_SIZE-.5));t.sort((e,t)=>N.DistanceSquared(e,i)-N.DistanceSquared(t,i)),t.length=Math.min(1,t.length);for(const e of t){let{x:t,y:i}=e;if(await this.loadMapCell(t,i),await p(),!this.mapLoaded)return void(this.mapUpdating=!1)}this.mapUpdating=!1},async loadMapCell(e,t){const i=[e,t].toString();if(i in this.cells)return;const a=new mapCell_MapCell(e,t);this.cells[i]=a,await a.load()}}),Object.assign(se,{animatedTextures:[],textureCache:{},materialCache:{},getCachedTileTexture(e,t,i,a,s){const r=`${e}|${t},${i}|${a},${s}`;if(r in this.textureCache)return this.textureCache[r];const h=$gameMap.tileset().tilesetNames[e];if(!h)return this.getErrorTexture();const n=new V(`img/tilesets/${h}.png`,this.scene);return n.hasAlpha=!0,n.onLoadObservable.addOnce(()=>{if(this.textureCache[r]===n&&(n.crop(t,i,a,s),n.updateSamplingMode(1),0===e)){const e=t/m(),r=i/f();if(e<6||e>=8||r>=6){const r=e>=6&&e<8||e>=14;n.animX=r?0:2,n.animY=r?1:0,n.frameData={x:t,y:i,w:a,h:s},this.animatedTextures.push(n)}}}),this.textureCache[r]=n,n},getErrorTexture(){return this.errorTexture?this.errorTexture:(this.errorTexture=new V("MV3D/errorTexture.png",this.scene),this.errorTexture)},getBushAlphaTexture(){return this.bushAlphaTexture?this.bushAlphaTexture:(this.bushAlphaTexture=new V("MV3D/bushAlpha.png",this.scene),this.bushAlphaTexture.getAlphaFromRGB=!0,this.bushAlphaTexture)},getCachedTileMaterial(e,t,i,a,s,r={}){this.processMaterialOptions(r);const h=`${e}|${t},${i}|${a},${s}|${this.getExtraBit(r)}`;if(h in this.materialCache)return this.materialCache[h];const n=this.getCachedTileTexture(e,t,i,a,s),o=new R(h,this.scene);return o.diffuseTexture=n,r.transparent&&(o.opacityTexture=n,o.alpha=r.alpha),o.alphaCutOff=se.ALPHA_CUTOFF,o.ambientColor.set(1,1,1),o.emissiveColor.set(r.glow,r.glow,r.glow),o.specularColor.set(0,0,0),this.materialCache[h]=o,o},processMaterialOptions(e){"alpha"in e?(e.alpha=Math.round(7*e.alpha)/7,e.alph<1&&(e.transparent=!0)):e.alpha=1,e.glow="glow"in e?Math.round(7*e.glow)/7:0},getExtraBit(e){let t=0;return t|=Boolean(e.transparent)<<0,t|=7-7*e.alpha<<1,(t|=7*e.glow<<1).toString(36)},lastAnimUpdate:0,animXFrame:0,animYFrame:0,animDirection:1,updateAnimations(){if(!(performance.now()-this.lastAnimUpdate<=this.ANIM_DELAY)){this.lastAnimUpdate=performance.now(),this.animXFrame<=0?this.animDirection=1:this.animXFrame>=2&&(this.animDirection=-1),this.animXFrame+=this.animDirection,this.animYFrame=(this.animYFrame+1)%3;for(const e of this.animatedTextures)e.crop(e.frameData.x+e.animX*this.animXFrame*m(),e.frameData.y+e.animY*this.animYFrame*f(),e.frameData.w,e.frameData.h)}}}),Object.assign(se,{createCharacters(){const e=$gameMap.events();for(const t of e)this.createCharacterFor(t,0);const t=$gameMap.vehicles();for(const e of t)this.createCharacterFor(e,1);const i=$gamePlayer.followers()._data;for(let e=i.length-1;e>=0;--e)this.createCharacterFor(i[e],29-e);this.createCharacterFor($gamePlayer,30)},createCharacterFor(e,t){if(!e.mv3d_sprite){const i=new characters_Character(e,t);return Object.defineProperty(e,"mv3d_sprite",{value:i,configurable:!0}),this.characters.push(i),i}return e.mv3d_sprite},updateCharacters(){for(const e of this.characters)e.update()},setupSpriteMeshes(){characters_Sprite.Meshes={},characters_Sprite.Meshes.FLAT=G.MergeMeshes([B.CreatePlane("sprite mesh",{sideOrientation:X},se.scene).rotate(_,Math.PI/2,q)]),characters_Sprite.Meshes.SPRITE=G.MergeMeshes([B.CreatePlane("sprite mesh",{sideOrientation:X},se.scene).translate(T,.5,q)]),characters_Sprite.Meshes.CROSS=G.MergeMeshes([characters_Sprite.Meshes.SPRITE.clone(),characters_Sprite.Meshes.SPRITE.clone().rotate(T,Math.PI/2,q)]),characters_Sprite.Meshes.SHADOW=characters_Sprite.Meshes.FLAT.clone("shadow mesh");const e=new V("MV3D/shadow.png"),t=new R("shadow material",se.scene);t.diffuseTexture=e,t.opacityTexture=e,characters_Sprite.Meshes.SHADOW.material=t;for(const e in characters_Sprite.Meshes)se.scene.removeMesh(characters_Sprite.Meshes[e])}});class characters_Sprite extends H{constructor(){super("sprite",se.scene),this.spriteOrigin=new H("sprite origin",se.scene),this.spriteOrigin.parent=this,this.mesh=characters_Sprite.Meshes.FLAT.clone(),this.mesh.parent=this.spriteOrigin}setMaterial(e){this.disposeMaterial(),this.texture=new V(e,se.scene),this.bitmap=this.texture._texture,this.texture.hasAlpha=!0,this.texture.onLoadObservable.addOnce(()=>this.onTextureLoaded()),this.material=new R("sprite material",se.scene),this.material.diffuseTexture=this.texture,this.material.alphaCutOff=se.ALPHA_CUTOFF,this.material.ambientColor.set(1,1,1),this.material.specularColor.set(0,0,0),this.mesh.material=this.material}onTextureLoaded(){this.texture.updateSamplingMode(1)}disposeMaterial(){this.material&&(this.material.dispose(!0,!0),this.material=null,this.texture=null,this.bitmap=null)}dispose(...e){this.disposeMaterial(),super.dispose(...e)}}class characters_Character extends characters_Sprite{constructor(e,t){super(),this.order=t,this.mesh.order=this.order,this.mesh.character=this,this._character=this.char=e,this.charName="",this.charIndex=0,this.updateCharacter(),this.updateShape(),this.isVehicle=this.char instanceof Game_Vehicle,this.isBoat=this.isVehicle&&this.char.isBoat(),this.isShip=this.isVehicle&&this.char.isShip(),this.isAirship=this.isVehicle&&this.char.isAirship(),this.isEvent=this.char instanceof Game_Event,this.isPlayer=this.char instanceof Game_Player,this.isFollower=this.char instanceof Game_Follower,this.isEvent&&this.eventConfigure(),this.elevation=0,this.char.mv3d_blenders||(this.char.mv3d_blenders={}),se.CHARACTER_SHADOWS&&(this.shadow=characters_Sprite.Meshes.SHADOW.clone(),this.shadow.parent=this.spriteOrigin),this.lightOrigin=new H("light origin",se.scene),this.lightOrigin.parent=this,this.setupLights()}isTextureReady(){return Boolean(this.texture&&this.texture.isReady())}setTileMaterial(){const e=se.getSetNumber(this._tileId),t=$gameMap.tileset().tilesetNames[e];if(t){const e=`img/tilesets/${t}.png`;this.setMaterial(e)}else this.setMaterial("MV3D/errorTexture.png")}onTextureLoaded(){super.onTextureLoaded(),this.updateFrame(),this.updateScale()}updateCharacter(){this._tilesetId=$gameMap.tilesetId(),this._tileId=this._character.tileId(),this._characterName=this._character.characterName(),this._characterIndex=this._character.characterIndex(),this._isBigCharacter=ImageManager.isBigCharacter(this._characterName),this._tileId>0?this.setTileMaterial(this._tileId):this._characterName&&this.setMaterial(`img/characters/${this._characterName}.png`)}updateCharacterFrame(){if(this.px=this.characterPatternX(),this.py=this.characterPatternY(),!this.isTextureReady())return;const e=this.patternWidth(),t=this.patternHeight(),i=(this.characterBlockX()+this.px)*e,a=(this.characterBlockY()+this.py)*t;this.setFrame(i,a,e,t)}patternChanged(){return this.px!==this.characterPatternX()||this.py!==this.characterPatternY()}characterPatternY(){if(this.isEvent&&this.char.isObjectCharacter())return this.char.direction()/2-1;return se.transformDirectionYaw(this.char.direction())/2-1}setFrame(e,t,i,a){this.isTextureReady()&&this.texture.crop(e,t,i,a)}updateScale(){if(!this.isTextureReady())return;const e=this.getConfig("scale",new N(1,1));let t=1;if(this.isVehicle){const e=se[`${this.char._type.toUpperCase()}_SETTINGS`];t=se.loadData(`${this.char._type}_scale`,e.scale)}const i=this.patternWidth()/u()*e.x*t,a=this.patternHeight()/u()*e.y*t;this.mesh.scaling.set(i,a,a)}getConfig(e,t){return this.settings_event?e in this.settings_event_page?this.settings_event_page[e]:e in this.settings_event?this.settings_event[e]:t:t}hasConfig(e){return!!this.settings_event&&(e in this.settings_event_page||e in this.settings_event)}eventConfigure(){if(!this.settings_event){this.settings_event={};const e=this.char.event().note;se.readConfigurationFunctions(se.readConfigurationTags(e),se.eventConfigurationFunctions,this.settings_event)}this.settings_event_page={};const e=this.char.page();if(!e)return;let t="";for(const i of e.list)108!==i.code&&408!==i.code||(t+=i.parameters[0]);if(se.readConfigurationFunctions(se.readConfigurationTags(t),se.eventConfigurationFunctions,this.settings_event_page),this.updateScale(),this.updateShape(),this.char.mv3d_needsConfigure&&(this.char.mv3d_needsConfigure=!1,"pos"in this.settings_event_page)){const e=this.char.event(),t=this.settings_event_page.pos;this.char.locate(o(e.x,t.x),o(e.y,t.y))}}setupMesh(){this.mesh.parent=this.spriteOrigin,this.mesh.character=this,this.mesh.order=this.order,this.material&&(this.mesh.material=this.material),this.flashlight&&(this.flashlight.excludedMeshes.splice(0,1/0),this.flashlight.excludedMeshes.push(this.mesh))}setupLights(){"flashlightColor"in this.char.mv3d_blenders&&this.setupFlashlight(),"lampColor"in this.char.mv3d_blenders&&this.setupLamp()}setupFlashlight(){if(this.flashlight)return;const e=this.getConfig("flashlight",{color:16777215,intensity:1,distance:se.LIGHT_DIST,angle:se.LIGHT_ANGLE});this.blendFlashlightColor=this.makeColorBlender("flashlightColor",e.color),this.blendFlashlightIntensity=this.makeBlender("flashlightIntensity",e.intensity),this.blendFlashlightDistance=this.makeBlender("flashlightDistance",e.distance),this.blendFlashlightAngle=this.makeBlender("flashlightAngle",e.angle),this.flashlight=new w("flashlight",L.Zero(),L.Zero(),g(this.blendFlashlightAngle.targetValue()),0,se.scene),this.flashlight.exponent=64800*Math.pow(this.blendFlashlightAngle.targetValue(),-2),this.flashlight.range=this.blendFlashlightDistance.targetValue(),this.flashlight.intensity=this.blendFlashlightIntensity.targetValue(),this.flashlight.diffuse.set(...this.blendFlashlightColor.targetComponents()),this.flashlight.direction.y=-1,this.flashlightOrigin=new H("flashlight origin",se.scene),this.flashlightOrigin.parent=this.lightOrigin,this.flashlight.parent=this.flashlightOrigin,this.blendFlashlightPitch=this.makeBlender("flashlightPitch",70),this.blendFlashlightYaw=this.makeBlender("flashlightYaw",0),this.blendFlashlightYaw.cycle=360,this.flashlightTargetYaw=this.getConfig("flashlightYaw","+0"),this.updateFlashlightDirection(),this.setupMesh()}setupLamp(){if(this.lamp)return;const e=this.getConfig("lamp",{color:16777215,intensity:1,distance:se.LIGHT_DIST});this.blendLampColor=this.makeColorBlender("lampColor",e.color),this.blendLampIntensity=this.makeBlender("lampIntensity",e.intensity),this.blendLampDistance=this.makeBlender("lampDistance",e.distance),this.lamp=new v("lamp",L.Zero(),se.scene),this.lamp.diffuse.set(...this.blendLampColor.targetComponents()),this.lamp.intensity=this.blendLampIntensity.targetValue(),this.lamp.range=this.blendLampDistance.targetValue(),this.lamp.parent=this.lightOrigin}updateFlashlightDirection(){this.flashlightOrigin.yaw=this.blendFlashlightYaw.currentValue(),this.flashlightOrigin.pitch=-this.blendFlashlightPitch.currentValue(),this.flashlightOrigin.position.set(0,0,0);let e=Math.tan(g(90-this.blendFlashlightAngle.currentValue()-Math.max(90,this.blendFlashlightPitch.currentValue())+90))*se.LIGHT_HEIGHT;e=Math.max(0,Math.min(1,e)),this.flashlight.range+=e,this.flashlightOrigin.translate(T,e,Q)}updateLights(){if(this.flashlight){const e=180+o(se.dirToYaw(this.char.direction()),this.flashlightTargetYaw);e!==this.blendFlashlightYaw.targetValue()&&this.blendFlashlightYaw.setValue(e,.25),this.blendFlashlightColor.update()|this.blendFlashlightIntensity.update()|this.blendFlashlightDistance.update()|this.blendFlashlightAngle.update()|this.blendFlashlightYaw.update()|this.blendFlashlightPitch.update()&&(this.flashlight.diffuse.set(...this.blendFlashlightColor.currentComponents()),this.flashlight.intensity=this.blendFlashlightIntensity.currentValue(),this.flashlight.range=this.blendFlashlightDistance.currentValue(),this.flashlight.angle=g(this.blendFlashlightAngle.currentValue()),this.flashlight.exponent=64800*Math.pow(this.blendFlashlightAngle.targetValue(),-2),this.updateFlashlightDirection())}this.lamp&&this.blendLampColor.update()|this.blendLampIntensity.update()|this.blendLampDistance.update()&&(this.lamp.diffuse.set(...this.blendLampColor.currentComponents()),this.lamp.intensity=this.blendLampIntensity.currentValue(),this.lamp.range=this.blendLampDistance.currentValue())}makeBlender(e,t,i=blenders_Blender){e in this.char.mv3d_blenders?t=this.char.mv3d_blenders[e]:this.char.mv3d_blenders[e]=t;const a=new i(e,t);return a.storageLocation=()=>this.char.mv3d_blenders,a}makeColorBlender(e,t){return this.makeBlender(e,t,ColorBlender)}hasBush(){return this.isEvent?this.getConfig("bush",!this._tileId):!this.isVehicle||se.VEHICLE_BUSH}getShape(){return this.getConfig("shape",this.char.isTile()?se.configurationShapes.FLAT:se.EVENT_SHAPE)}updateShape(){const e=this.getShape();if(this.shape===e)return;this.shape=e;let t=characters_Sprite.Meshes.SPRITE;const i=se.configurationShapes;switch(this.shape){case i.FLAT:t=characters_Sprite.Meshes.FLAT;break;case i.XCROSS:case i.CROSS:t=characters_Sprite.Meshes.CROSS;break;case i.FENCE:}this.mesh.dispose(),this.mesh=t.clone(),this.setupMesh()}update(){this.char._erased&&this.dispose(),this.visible=this.char.mv_sprite.visible,"function"==typeof this.char.isVisible&&(this.visible=this.visible&&this.char.isVisible()),this.material||(this.visible=!1),this._isEnabled?this.visible||this.setEnabled(!1):this.visible&&this.setEnabled(!0),this._isEnabled&&(this.material?this.updateNormal():this.updateEmpty())}updateNormal(){this.isImageChanged()&&this.updateCharacter(),this.patternChanged()&&this.updateFrame();const e=se.configurationShapes;this.shape===e.SPRITE?(this.mesh.pitch=se.blendCameraPitch.currentValue()-90,this.mesh.yaw=se.blendCameraYaw.currentValue()):this.shape===e.TREE?(this.mesh.pitch=0,this.mesh.yaw=se.blendCameraYaw.currentValue()):(this.mesh.pitch=0,this.mesh.yaw=this.getConfig("rot",0),this.shape===e.XCROSS&&(this.mesh.yaw+=45)),this.updateBush(),this.tileHeight=se.getWalkHeight(this.char._realX,this.char._realY),this.updatePosition(),this.updateElevation(),this.shadow&&this.updateShadow(),this.updateLights()}updateEmpty(){this.tileHeight=se.getWalkHeight(this.char._realX,this.char._realY),this.updatePosition(),this.updateElevation(),this.updateLights()}updateBush(){this.bush=Boolean(this.char.bushDepth()),this.bush&&this.hasBush()?this.material.opacityTexture||(this.material.opacityTexture=se.getBushAlphaTexture(),this.material.useAlphaFromDiffuseTexture=!0):this.material.opacityTexture&&(this.material.opacityTexture=null,this.material.useAlphaFromDiffuseTexture=!1)}updatePosition(){const e=se.loopCoords(this.char._realX,this.char._realY);this.x=e.x,this.y=e.y,this.spriteOrigin.position.set(0,0,0),this.lightOrigin.position.set(0,0,0),this.spriteOrigin.z=4*se.LAYER_DIST,this.lightOrigin.z=this.getConfig("lightHeight",se.LIGHT_HEIGHT);const t=new N(Math.sin(-se.cameraNode.rotation.y),Math.cos(se.cameraNode.rotation.y)).multiplyByFloats(.45,.45),i=this.getConfig("lightOffset",null);this.shape===se.configurationShapes.SPRITE?(this.spriteOrigin.x=t.x,this.spriteOrigin.y=t.y,this.lightOrigin.x=t.x,this.lightOrigin.y=t.y):i||(this.lightOrigin.x=t.x/2,this.lightOrigin.y=t.y/2),i&&(this.lightOrigin.x+=i.x,this.lightOrigin.y+=i.y),this.spriteOrigin.x+=this.getConfig("x",0),this.spriteOrigin.y+=this.getConfig("y",0)}updateElevation(){let e=this.tileHeight;if((this.isVehicle||(this.isPlayer||this.isFollower)&&$gamePlayer.vehicle())&&(e+=se.getFloatHeight(Math.round(this.char._realX),Math.round(this.char._realY)),this.char===$gameMap.vehicle("boat")?e+=se.BOAT_SETTINGS.zoff:this.char===$gameMap.vehicle("ship")&&(e+=se.SHIP_SETTINGS.zoff)),this.isAirship&&$gamePlayer.vehicle()===this.char){if(this.char._driving||(this.elevation+=(e-this.elevation)/10),e>=this.elevation){const t=100/Math.pow(1.5,se.loadData("airship_ascentspeed",4));this.elevation+=(e-this.elevation)/t}else if(!se.vehicleObstructed(this.char,this.char.x,this.char.y,!0)){const t=100/Math.pow(1.5,se.loadData("airship_descentspeed",2));this.elevation+=(e-this.elevation)/t}this.z=this.elevation,this.z+=se.loadData("airship_height",se.AIRSHIP_SETTINGS.height)*this.char._altitude/this.char.maxAltitude()}else if(this.char.isJumping()){let e=1-this.char._jumpCount/(2*this.char._jumpPeak),t=-4*Math.pow(e-.5,2)+1,i=Math.abs(this.char.mv3d_jumpHeightEnd-this.char.mv3d_jumpHeightStart);this.z=this.char.mv3d_jumpHeightStart*(1-e)+this.char.mv3d_jumpHeightEnd*e+t*i/2+this.char.jumpHeight()/u()}else this.elevation=e,this.z=this.elevation;this.isEvent&&(this.z+=this.getConfig("height",2===this.char._priorityType?se.EVENT_HEIGHT:0),this.hasConfig("z")&&(this.z=this.getConfig("z",0)))}updateShadow(){let e=this.getConfig("shadow",this.shape!=se.configurationShapes.FLAT);if(e&&(this.isPlayer||this.isFollower)){const t=se.characters.indexOf(this);if(t>=0)for(let i=t+1;i<se.characters.length;++i){const t=se.characters[i];if(t.shadow&&t.visible&&(t.char._realX===this.char._realX&&t.char._realY===this.char._realY)){e=!1;break}}}if(this.shadow._isEnabled?e||this.shadow.setEnabled(!1):e&&this.shadow.setEnabled(!0),!e)return;const t=Math.min(0,this.getConfig("height",0)),i=Math.max(this.z-this.tileHeight,t),a=this.isAirship?se.AIRSHIP_SETTINGS.shadowDist:se.SHADOW_DIST,s=Math.max(0,1-Math.abs(i)/a);this.shadow.z=-i;const r=this.isAirship?se.AIRSHIP_SETTINGS.shadowScale:this.getConfig("shadowScale",se.SHADOW_SCALE);this.shadow.scaling.setAll(r*s),this.shadow.isAnInstance||(this.shadow.visibility=s-.5*this.bush)}dispose(...e){super.dispose(...e),delete this.char.mv3d_sprite}}for(const e of["characterBlockX","characterBlockY","characterPatternX","isImageChanged","patternWidth","patternHeight","updateTileFrame","updateFrame"])characters_Character.prototype[e]=Sprite_Character.prototype[e];Object.assign(se,{vehicleObstructed:(e,...t)=>we.apply(e,t)});const Ee=Game_CharacterBase.prototype.canPass;function Me(e,t,i=!0){if(!(this instanceof Game_Vehicle))throw"This isn't a vehicle.";if(!this.mv3d_sprite)return!0;if(!this._driving)return!0;if($gamePlayer.isDebugThrough())return!0;const a=this.isAirship(),s=se[`${this._type.toUpperCase()}_SETTINGS`],r=se.loadData(`${this._type}_big`,s.big);let h=.5;a?h=se.loadData("airship_height",se.AIRSHIP_SETTINGS.height):h+=se.getFloatHeight(e,t);const n=se.getWalkHeight(e,t);let o=this.mv3d_sprite.z;if("zoff"in s&&(o-=s.zoff),n>o)return!1;if(!r)return!0;for(let a=-1;a<=1;++a)for(let s=-1;s<=1;++s){if(0===a&&0===s||!i&&a&&s)continue;const r=se.getWalkHeight(e+a,t+s);if(r>n+h*!i&&(i||r>o))return!1}return!0}function we(){return!Me.apply(this,arguments)}Game_CharacterBase.prototype.canPass=function(e,t,i){if(!Ee.apply(this,arguments))return!1;const a=$gameMap.roundXWithDirection(e,i),s=$gameMap.roundYWithDirection(t,i);if(this===$gamePlayer){const e=this.vehicle();if(e){const t=we.call(e,a,s,!1);if(e.isAirship())return!t;if(t)return!1}}if(this.isThrough()||this.isDebugThrough())return!0;const r=se.getWalkHeight(e,t),h=se.getWalkHeight(a,s);return r===h};const ve=Game_Map.prototype.isAirshipLandOk;Game_Map.prototype.isAirshipLandOk=function(e,t){return!we.call(this.airship(),e,t,!0)&&(se.AIRSHIP_SETTINGS.bushLanding?this.checkPassage(e,t,15):ve.apply(this,arguments))};const Ae=Game_Player.prototype.updateVehicleGetOn;Game_Player.prototype.updateVehicleGetOn=function(){const e=this.vehicle(),t=se.loadData(`${e._type}_speed`,e._moveSpeed);this.vehicle().setMoveSpeed(t),Ae.apply(this,arguments)};const Ne=Game_CharacterBase.prototype.jump;Game_CharacterBase.prototype.jump=function(e,t){this.mv3d_jumpHeightStart=se.getWalkHeight(this.x,this.y),this.mv3d_jumpHeightEnd=se.getWalkHeight(this.x+e,this.y+t),Ne.apply(this,arguments)};const Le=Game_Map.prototype.parallaxOx;Game_Map.prototype.parallaxOx=function(){let e=Le.apply(this,arguments);return this._parallaxLoopX?e-816*se.blendCameraYaw.currentValue()/90:e};const xe=Game_Map.prototype.parallaxOy;Game_Map.prototype.parallaxOy=function(){let e=xe.apply(this,arguments);return this._parallaxLoopY?e-816*se.blendCameraPitch.currentValue()/90:e},Game_Map.prototype.setDisplayPos=function(){},Game_Map.prototype.scrollUp=function(){},Game_Map.prototype.scrollDown=function(){},Game_Map.prototype.scrollLeft=function(){},Game_Map.prototype.scrollRight=function(){},Game_Map.prototype.updateScroll=function(){this._displayX=816*-se.blendCameraYaw.currentValue()/3600,this._displayY=816*-se.blendCameraPitch.currentValue()/3600},Game_CharacterBase.prototype.isNearTheScreen=function(){return Math.abs(this.x-se.cameraStick.position.x)<=se.RENDER_DIST&&Math.abs(-this.y-se.cameraStick.position.y)<=se.RENDER_DIST};const Pe=Scene_Boot.prototype.start;Scene_Boot.prototype.start=function(){Pe.apply(this,arguments),se.setupSerializer()};const De=Utils.isOptionValid("test");let Fe;DataManager._databaseFiles.push({name:"mv3d_data",src:"../MV3D/mv3d_data.json"});const Oe={get:(e,t)=>e[t]&&"object"==typeof e[t]?new Proxy(e[t],Oe):e[t],set(e,t,i){Fe._dirty=!0,e[t]=i}};let He=!1;Object.assign(se,{setupSerializer(){Fe=mv3d_data,De&&(mv3d_data=new Proxy(Fe,Oe))},async updateSerializer(){De&&Fe._dirty&&!He&&(He=!0,Fe._dirty=!1,await Ve("MV3D/mv3d_data.json",JSON.stringify(Fe)),He=!1)},async loadFinalizedCells(e){const t=new $(this.scene);for(const i of e){const e=[vector2.x,vector2.y].toString();t.addMeshTask(e,"","./",`MV3D/finalizedMaps/${$gameMap.mapId().padZero(3)}/${e}.babylon`)}t.load()},async finalizeCell(e){const t=Y.SerializeMesh(e.mesh),i=`MV3D/finalizedMaps/${$gameMap.mapId().padZero(3)}/${[e.cx,e.cy]}.babylon`;await Ve(i,JSON.stringify(t))},openMenu(){$gameMessage.setChoices(["Finalize this cell","Definalize this cell","Finalize all loaded cells","Definalize all cells"],0),$gameMessage.setChoicePositionType(1),$gameMessage.setChoiceCallback(e=>{})}});const Ve=async(e,t)=>{const a=i(0),s=i(1),r=s.resolve(global.__dirname,e);await Re(s.dirname(r)),await new Promise((e,i)=>{a.writeFile(r,t,t=>{t?i(t):e()})})},Re=e=>new Promise((t,a)=>{const s=i(0),r=i(1);s.mkdir(r.resolve(global.__dirname,e),{recursive:!0},e=>{e&&"EEXIST"!==e.code?a(e):t()})})}]);
//# sourceMappingURL=mv3d-babylon.js.map