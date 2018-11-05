/**
 * Specifies a tilted cube which rotates.
 *
 * @author Ian Feekes 
 * @this {TiltedCube}
 */
class TiltedCube extends Geometry {
  /**
   * Constructor for TiltedCube.
   *
   * @constructor
   * @returns {TiltedCube} Geometric object created
   */
  constructor(size, centerX, centerY,color,cFlag) {
    super();
    this.n=8; 
    if(cFlag==1)
      { 
        //console.log("setting color to grey"); 
        super.setColor(color);
      }
     else super.setRandomColor(); 

     //console.log(this.color); 
    //this.color.push(.5); 

    this.generateCubeVertices(centerX, centerY, size, this.color);
    this.size=size;
    this.centerX=centerX;
    this.centerY=centerY;  

    // Recommendations: Might want to tilt your cube at 30 degrees relative to
    // the z-axis here. Pretty good tilt that lets us see that it's a cube.
  }

  /**
   * Generates the vertices of TiltedCube. Just a regular cube.
   *
   * @private
   */
  generateCubeVertices(centerX, centerY, size, color) {
    let sizeScale = 150; 
    //vertex coordinates and color 
    this.vertices = new Float32Array([
    centerX+size/sizeScale,  centerY+size/sizeScale,  size/sizeScale,   this.color[0],  this.color[1],  this.color[2],  
    centerX-size/sizeScale,  centerY+size/sizeScale,  size/sizeScale,   this.color[3],  this.color[4],  this.color[5],  
    centerX-size/sizeScale, centerY-size/sizeScale,  size/sizeScale,   this.color[6],  this.color[7],  this.color[8],  
    centerX+size/sizeScale, centerY-size/sizeScale,  size/sizeScale,    this.color[9],  this.color[10],  this.color[11],  
    centerX+size/sizeScale, centerY-size/sizeScale, -size/sizeScale,     this.color[12],  this.color[13],  this.color[14],  
    centerX+size/sizeScale,  centerY+size/sizeScale, -size/sizeScale,    this.color[15],  this.color[16],  this.color[17],  
    centerX-size/sizeScale,  centerY+size/sizeScale, -size/sizeScale,    this.color[18],  this.color[19],  this.color[20],  
    centerX-size/sizeScale, centerY-size/sizeScale, -size/sizeScale,    this.color[21],  this.color[22],  this.color[23]  
    ]);

    //indices of the vertices 
    this.indices = new Uint8Array([
      0, 1, 2,   0, 2, 3, 
      0, 3, 4,   0, 4, 5, 
      0, 5, 6,   0, 6, 1, 
      1, 6, 7,   1, 7, 2, 
      7, 4, 3,   7, 3, 2, 
      4, 7, 6,   4, 6, 5
      ]); 
  }

  /**
   * Updates the animation of the TiltedCube. Should make it rotate.
   *
   * Before rotation is translates, then it roates, then it translates back so that it 
   * is rotating about its own axis rather than the origin
   */
  updateAnimation() {
    this.modelMatrix.translate(this.centerX, this.centerY, 0);
    this.modelMatrix.rotate(1,1.5,1.5,1); 
    this.modelMatrix.translate(-this.centerX, -this.centerY, 0); 
  }

  render()
  {

     //gl.enable(gl.DEPTH_TEST);
    //gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //gl.enable(gl.DEPTH_TEST); 

    var vertexBuffer = gl.createBuffer(); 
    var indexBuffer = gl.createBuffer(); 
    
    if (!vertexBuffer || !indexBuffer) {
    return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW); 
    var FSIZE = this.vertices.BYTES_PER_ELEMENT; 
    
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE*6,0); 
    gl.enableVertexAttribArray(a_Position); 
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE*6,FSIZE*3);
    gl.enableVertexAttribArray(a_Color); 

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer); 
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW); 

    sendUniformMatToGLSL(this.modelMatrix, 'u_ModelMatrix');
  //  gl.uniformMatrix4fv(u_ModelMatrix, false, this.modelMatrix.elements);

    gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_BYTE, 0);
  }

}
