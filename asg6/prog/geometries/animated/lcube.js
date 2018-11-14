class Lcube extends Geometry{

	constructor(size,centerX,centerY,flag){
		super(); 
		this.x=centerX; 
		this.y=centerY; 
		this.modelMatrix = new Matrix4();  // Model matrix
  //var mvpMatrix = new Matrix4();    // Model view projection matrix
        this.normalMatrix = new Matrix4(); // Transformation matrix for normals
		this.n=this.initVertexBuffers(); 
	}

	render(){
		 gl.uniformMatrix4fv(u_ModelMatrix, false, this.modelMatrix.elements);
		 this.normalMatrix.setInverseOf(this.modelMatrix);
         this.normalMatrix.transpose();
         gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);

          if (!initArrayBuffer(gl, 'a_Position', this.vertices, 3, gl.FLOAT)) return -1;
  		  if (!initArrayBuffer(gl, 'a_Color', this.colors, 3, gl.FLOAT)) return -1;
  if (!initArrayBuffer(gl, 'a_Normal', this.normals, 3, gl.FLOAT)) return -1;

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Write the indices to the buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);



         gl.drawElements(gl.TRIANGLES, this.n, gl.UNSIGNED_BYTE, 0);
	}

	initVertexBuffers() {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
  // Coordinates
  this.vertices = new Float32Array([
     this.centerX+2.0, this.centerY+2.0, 2.0,  this.centerX-2.0, this.centerY+2.0, 2.0,  this.centerX-2.0, this.centerY-2.0, 2.0,   this.centerX+2.0, this.centerY-2.0, 2.0, // v0-v1-v2-v3 front
     this.centerX+2.0, this.centerY+2.0, 2.0,  this.centerX+2.0, this.centerY-2.0, 2.0,  this.centerX+2.0, this.centerY-2.0,-2.0,   this.centerX+2.0, this.centerY+2.0,-2.0, // v0-v3-v4-v5 right
     this.centerX+2.0, this.centerY+2.0, 2.0,  this.centerX+2.0, this.centerY+2.0,-2.0,  this.centerX-2.0, this.centerY+2.0,-2.0,  this.centerX-2.0, this.centerY+2.0, 2.0, // v0-v5-v6-v1 up
     this.centerX-2.0, this.centerY+2.0, 2.0,  this.centerX-2.0, this.centerY+2.0,-2.0,  this.centerX-2.0, this.centerY-2.0,-2.0,  this.centerX-2.0, this.centerY-2.0, 2.0, // v1-v6-v7-v2 left
     this.centerX-2.0, this.centerY-2.0,-2.0,  this.centerX+2.0, this.centerY-2.0,-2.0,  this.centerX+2.0, this.centerY-2.0, 2.0,  this.centerX-2.0, this.centerY-2.0, 2.0, // v7-v4-v3-v2 down
     this.centerX+2.0, this.centerY-2.0,-2.0,  this.centerX-2.0, this.centerY-2.0,-2.0,  this.centerX-2.0, this.centerY+2.0,-2.0,   this.centerX+2.0, this.centerY+2.0,-2.0  // v4-v7-v6-v5 back
  ]);

  // Colors
  this.colors = new Float32Array([
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v1-v2-v3 front
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v3-v4-v5 right
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v0-v5-v6-v1 up
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v1-v6-v7-v2 left
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0,     // v7-v4-v3-v2 down
    1, 0, 0,   1, 0, 0,   1, 0, 0,  1, 0, 0　    // v4-v7-v6-v5 back
 ]);

  // Normal
  this.normals = new Float32Array([
    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
  ]);

  // Indices of the vertices
  this.indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
 ]);

/*
  // Write the vertex property to buffers (coordinates, colors and normals)
  if (!initArrayBuffer(gl, 'a_Position', vertices, 3, gl.FLOAT)) return -1;
  if (!initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT)) return -1;
  if (!initArrayBuffer(gl, 'a_Normal', normals, 3, gl.FLOAT)) return -1;

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Write the indices to the buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW); */ 

  return this.indices.length;
}

}