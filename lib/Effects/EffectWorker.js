<html>
<head>
</head>
<body>


<script  src="lib/three.js"></script>
<script src="lib/Effects/Butterfly.js"></script>
<script>



var effectRoot;
var logoRoot;
var renderFuncs = [];
var butterflys = [];
//蝴蝶翅膀图片数组
var leftWingTexArray = [];
var rightWingTexArray = [];
//蝴蝶翅膀图片根路径
var wingTexturePath = "data/textures/butterfly-wing/";
var hasFinded = false;
var renderer;
var scene;
var camera;


SetUpThreeScene();
tick();





function SetUpThreeScene()
{
	renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75,window.innerWidth,window.innerHeight,0.1,1000);
	
	lightSetting();
	
	effectRoot = new THREE.Group;
	CreateButtterflyEffect(5,effectRoot);
	CreateLogoMesh(effectRoot);
}

function tick()
{
	requestAnimationFrame(tick);
	checkDisplayState();
	if(hasFinded)
	{
		butterflys.forEach(function(butfly){butfly.fly();});
	}
	
}



function checkDisplayState()
{
	effectRoot.visible = hasFinded;
	
}

function lightSetting()
{
	var directionalLight = new THREE.DirectionalLight({color:0xffffff});
	directionalLight.position.set(-100,100,-100);

	
	var ambientLight = new THREE.AmbientLight( 0xffffff,1 );
	scene.add( ambientLight );
	
	scene.add(directionalLight);
	
}


	var sphere = new THREE.Mesh
	(
		new THREE.SphereGeometry(0.5, 8, 8),
		new THREE.MeshNormalMaterial()
	);
	
	sphere.material.shading = THREE.FlatShading;
	sphere.position.z = 0;
	sphere.position.x = 0;
	sphere.position.y = 0;
	sphere.scale.set(200,200,200);
	modelRoot.add(sphere);
}
function loadButterflyWingTexture()
{
	var wingName = ["pink-wing","blue-wing","green-wing","yellow-wing"];
	for(var i = 0;i<4;++i)
	{
		var loader = new THREE.TextureLoader();
		leftWingTexArray[i]  =  loader.load(wingTexturePath + wingName[i]+"_left.png");
		rightWingTexArray[i] =  loader.load(wingTexturePath + wingName[i]+"_right.png");
	}
}

/*
*创建蝴蝶特效
*/
function CreateButtterflyEffect(num,root)
{

	loadButterflyWingTexture();
	
	var leftWingTexture = leftWingTexArray[0];
	var rightWingTexture = rightWingTexArray[0];
	var leftWingMaterial = new THREE.MeshLambertMaterial
	(
		{
			map: leftWingTexture,
             side:THREE.DoubleSide,//两面可见
             transparent:true,
			alpha:0.5
		}
	);
	var rightWingMatertial = new THREE.MeshLambertMaterial
	(
		{
			map: rightWingTexture,
             side:THREE.DoubleSide,//两面可见
             transparent:true,
			alpha:0.5
		}
	);
	for(var i =0; i < num; ++i)
	{
		var butterfly = new Butterfly
		(
			{
				moveSpeed :50,
				flipRate : (Math.random()*0.5 + 0.5) *10,
				size : Math.random()*0.5 + 0.5,
				leftWingMat:leftWingMaterial,
				rightWingMat:rightWingMatertial,				
			}
		);

		butterfly.setRoot(root);
		butterflys.push(butterfly);
	}
	
	renderFuncs.push(function()
	{
		if(markerRootObj !== undefined)
		{
			hasFinded = markerRootObj.visible;
			//return;
		//console.log(markerRootObj.visible);
			if( markerRootObj.visible)
			{
				//if(!hasFinded)
				//{	
					if(arSceneRootVisable === false)//重新显示
					{
						var colorSeed = Math.floor( Math.random() * 4.0);
						var left = leftWingTexArray[colorSeed];
						var right = rightWingTexArray[colorSeed];
						butterflys.forEach(function(butfly)
						{
							butfly.changeWingTexture(left,right);
						});
					}
					arSceneRootVisable = true;
					hasFinded = true;
			//	}
			}
			else
			{
				arSceneRootVisable = false;
				hasFinded = false;
			}
		}
	});

	renderFuncs.push(function()
	{
		if(hasFinded)
		{
			effectObjRoot.visible = true;
			effectObjRoot.position.set(-300,-100,500);
			effectObjRoot.scale.x = 2;			
		}
		else
		{
			effectObjRoot.visible = false;
		}
	}
	);
	
}

//加载logo图片
function CreateLogoMesh(modelRoot)
{
	var scale = 1946/1315;
	var realWitdh = 150;
	var logoGeo = new THREE.PlaneGeometry(realWitdh,realWitdh /scale);
	var logoTex = new THREE.TextureLoader().load("data/textures/char_logo.png");
	//logoTex.flipY = true;
	var logoMat = new THREE.MeshLambertMaterial
	(
		{
			map:logoTex,
			side:THREE.DoubleSide,//两面可见
		}
	);
	var logoMesh = new THREE.Mesh(logoGeo,logoMat);
	logoRoot = new THREE.Object3D();
	logoRoot.add(logoMesh);
	logoMesh.translateY(realWitdh /scale * 0.5);
	logoMesh.translateX(110);
	logoMesh.position.z = 110;
	logoMesh.rotation.z += Math.PI;
	logoMesh.rotation.y += Math.PI;
	logoMesh.scale.multiplyScalar (0.7);
	modelRoot.add(logoRoot);
}




</script>

</body>
</html>