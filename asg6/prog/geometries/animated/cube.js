/**
 * Specifies a tilted cube which rotates.
 *
 * @author "Ian Feekes"
 * @this {TiltedCube}
 */
class Cube extends Geometry {
  
  constructor(size, centerX, centerY, flag) {
    super();
    this.generateCubeVertices(size, centerX, centerY);
   // this.vertices.push(cubeVertices);
    this.x.push(centerX);
    this.y.push(centerY);
    if(flag)this.translate(); 

    // Recommendations: Might want to tilt your cube at 30 degrees relative to
    // the z-axis here. Pretty good tilt that lets us see that it's a cube.
  }

  translate()
  {
    this.modelMatrix.setTranslate(0, 0, -1.1);
  }

  render() {
    gl.enable(gl.DEPTH_TEST);

/*  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW); */ 


    super.render(36, gl.TRIANGLES, 3);
   //super.render(this.indices.length, gl.TRIANGLES, 3); 
    gl.disable(gl.DEPTH_TEST);
  } 

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   */
  generateCubeVertices(size, centerX, centerY) {
    this.vertices = new Float32Array([
      // Vertex coordinates and color
      centerX-size,  centerY+size,  size,      centerX-size, centerY-size,  size,       centerX+size, centerY-size,  size,    //t0
      centerX-size,  centerY+size,  size,      centerX+size,  centerY+size,  size,      centerX+size, centerY-size,  size,    //t1

      centerX+size,  centerY+size,  size,      centerX+size, centerY-size,  size,       centerX+size, centerY-size, -size,    //t2
      centerX+size,  centerY+size,  size,      centerX+size, centerY-size, -size,    centerX+size,  centerY+size, -size,      //t3

      centerX+size,  centerY+size, -size,   centerX+size, centerY-size, -size,    centerX-size, centerY-size, -size,          //t4
      centerX+size,  centerY+size, -size,   centerX-size, centerY-size, -size,    centerX-size,  centerY+size, -size,         //t5
        
      centerX-size,  centerY+size, -size,   centerX-size, centerY-size, -size,    centerX-size, centerY-size,  size,          //t6
      centerX-size,  centerY+size, -size,   centerX-size, centerY-size,  size,       centerX-size,  centerY+size,  size,      //t7
       
      centerX-size,  centerY+size, -size,   centerX-size,  centerY+size,  size,      centerX+size,  centerY+size,  size,      //t8
      centerX-size,  centerY+size, -size,   centerX+size,  centerY+size,  size,      centerX+size,  centerY+size, -size,      //t9

      centerX-size, centerY-size,  size,       centerX-size, centerY-size, -size,    centerX+size, centerY-size, -size,       //t10
      centerX-size, centerY-size,  size,       centerX+size, centerY-size, -size,    centerX+size, centerY-size,  size        //t11
    ]); 

   /* cubeVertices = new Float32Array([
    this.centerX+2.0, this.centerY+2.0, 2.0,  this.centerX-2.0, this.centerY+2.0, 2.0,  this.centerX-2.0, this.centerY-2.0, 2.0,   this.centerX+2.0, this.centerY-2.0, 2.0, // v0-v1-v2-v3 front
     this.centerX+2.0, this.centerY+2.0, 2.0,  this.centerX+2.0, this.centerY-2.0, 2.0,  this.centerX+2.0, this.centerY-2.0,-2.0,   this.centerX+2.0, this.centerY+2.0,-2.0, // v0-v3-v4-v5 right
     this.centerX+2.0, this.centerY+2.0, 2.0,  this.centerX+2.0, this.centerY+2.0,-2.0,  this.centerX-2.0, this.centerY+2.0,-2.0,  this.centerX-2.0, this.centerY+2.0, 2.0, // v0-v5-v6-v1 up
     this.centerX-2.0, this.centerY+2.0, 2.0,  this.centerX-2.0, this.centerY+2.0,-2.0,  this.centerX-2.0, this.centerY-2.0,-2.0,  this.centerX-2.0, this.centerY-2.0, 2.0, // v1-v6-v7-v2 left
     this.centerX-2.0, this.centerY-2.0,-2.0,  this.centerX+2.0, this.centerY-2.0,-2.0,  this.centerX+2.0, this.centerY-2.0, 2.0,  this.centerX-2.0, this.centerY-2.0, 2.0, // v7-v4-v3-v2 down
     this.centerX+2.0, this.centerY-2.0,-2.0,  this.centerX-2.0, this.centerY-2.0,-2.0,  this.centerX-2.0, this.centerY+2.0,-2.0,   this.centerX+2.0, this.centerY+2.0,-2.0  // v4-v7-v6-v5 back
     ]); */ 

    //Unless we are rotating it on the z plane (which I won't do) these can remain static 
    this.normals = new Float32Array([
         // Normal
    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
    ]); 

  /*   this.indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
 ]); */ 
  }

  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   */
  updateAnimation() {
   
  }

}
