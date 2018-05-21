/*

*/



Butterfly = function(params)
{
	//运动速度
	this.moveSpeed = params.moveSpeed;
	//翅膀震动频率
	this.flipRate = params.flipRate;
	//身体大小
	this.size = params.size;
	/*//蝴蝶实体	
	this.body = null;
	//翅膀
	this.leftWing = null;
	this.rightWing = null;
	*/
	this.autoMode = false;

	this.root = null;
	
	this.light = null;

	var len = 20;
	var leftWingGeo = new THREE.PlaneGeometry(len,len);
	var rightWingGeo = new THREE.PlaneGeometry(len,len);



	var leftWingMesh = new THREE.Mesh(leftWingGeo,params.leftWingMat);
	var rightWingMesh = new THREE.Mesh(rightWingGeo,params.rightWingMat);
	
	this.body = new THREE.Object3D();
	this.leftWing = new THREE.Object3D();
	this.rightWing = new THREE.Object3D();
	this.body.add(this.leftWing);
	this.body.add(this.rightWing);
	this.leftWing.add(leftWingMesh);
	this.rightWing.add(rightWingMesh);
	leftWingMesh.position.set(-10,0,0);
	rightWingMesh.position.set(10,0,0);
	this.body.scale.multiplyScalar(this.size);
	//this.light = new THREE.PointLight( 0xffffff, 1, 100 );
	//this.body.add(this.light);
	//this.body.position = new THREE.Vector3(Math.random()*5000,Math.random()*5000,20);

	
}



Butterfly.prototype.reset = function()
{
	this.body.position.multiplyScalar(0);
}



Butterfly.prototype.autoFly = function()
{
	if(this.root)
	{
		if(this.autoMode) return;
		setTimeout(this.fly,20);
		autoMode = true;
	}
}

Butterfly.prototype.fly = function()
{
	
	var deltaTime = 0.02;
	this.leftWing.rotation.y -= deltaTime * this.flipRate;
	this.rightWing.rotation.y += deltaTime * this.flipRate;
	if(Math.abs(this.leftWing.rotation.y)>1) this.flipRate*=-1;
	
	this.body.rotation.z += (Math.random()*0.5 -0.5)*5* deltaTime ;
	//var toCenter = this.root.position.sub(this.body.position);
	this.body.translateY (this.moveSpeed * deltaTime);
	//console.log(this.body.position);
//	this.body.position += toCenter * 0.01;

}	


Butterfly.prototype.setRoot = function(rootObj)
{
	rootObj.add(this.body);
	this.root = rootObj;
	this.ResetPosition();
}

Butterfly.prototype.ResetPosition = function()
{
	//this.body.position.set( new THREE.Vector3(0,0,0));
	var offsetX = (Math.random()*2-1)*40 + 50;
	var offsetY = (Math.random()*2-1)*80 + 100;
	this.body.translateY(offsetX);
	this.body.translateX(offsetY);
	this.body.translateZ(100);
}

/*
改变翅膀的颜色
*/
Butterfly.prototype.changeWingTexture = function(left,right)
{
	
	if(left === null || left === undefined) return;
	if(right === null || right === undefined) return;
	this.leftWing.children[0].material.map = left;
	this.rightWing.children[0].material.map = right;
}
