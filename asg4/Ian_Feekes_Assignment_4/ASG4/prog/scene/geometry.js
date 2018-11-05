/**
 * Specifies a geometric object.
 *
 * @author Ian Feekes
 * @this {Geometry}
 */
class Geometry {
  /**
   * Constructor for Geometry.
   *
   * @constructor
   */
  constructor() {
    /*Currentlly begins with empty vertices and an empty colour*/ 
    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.color = [];    // The color of your geometric object
    this.n = 0;         // The number of vertices of the object. 
    this.modelMatrix = new Matrix4(); //Initialize the model matrix
    this.shader=null;   // shading program you will be using to shade this geometry
    this.currentAngle=0.0;
    this.vecX=0;
    this.vecY=0; 
    this.SIZE_STEP = 0;
  }

  //Sets color 
  setColor(c)
  {
    //Do this for every vertex still 
    for(let i=1;i<=this.n;i++)
    {
      this.color.push(c[0]);
      this.color.push(c[1]);
      this.color.push(c[2]); 
    } 
    //console.log(this.color+"\n"); 
  }

  /*Iterates through the number of vertices each object has and generates a 
   *random r, g, b value for them*/ 
  setRandomColor()
  {
    for(let i=1;i<=this.n;i++)
    {
      //r g and b are all values between 0-255 inclusive 
      let r = (Math.floor(Math.random()*Math.floor(256)))/256;
      let g = (Math.floor(Math.random()*Math.floor(256)))/256;
      let b = (Math.floor(Math.random()*Math.floor(256)))/256;  
      this.color.push(r);
      this.color.push(g); 
      this.color.push(b);  
    }
    //console.log(this.color+"\n"); 
  }


  /**
   * Renders this Geometry within your webGL scene.
   * Sets color, translates vertices, sets vertices, and draws 
   */
  render() {
    //tells glsl to draw this shape's color 
    
    /*THIS WILL NEED TO BE CHANGED*/ 
    //sendUniformVec4ToGLSL(this.color, a_Color); 
    
    //tells glsl to apply this shapes transformation matrix
    sendUniformMatToGLSL(this.modelMatrix, 'u_ModelMatrix');
    //tells glsl to apply this shapes vertices  
    let n = sendAttributeBufferToGLSL(this.vertices, this.n, 'a_Position');
    //let m = sendAttributeBufferToGLSL(this.color, this.n, 'a_Color');  
    //gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE*6, FSIZE*3); 
    //draw the shape 
    //var FSIZE = this.vertices.BYTES_PER_ELEMENT; 
  //  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE*6, FSIZE*3);
  //    gl.enableVertexAttribArray(a_Color); 
    //gl.clear(gl.COLOR_BUFFER_BIT); 

    tellGLSLToDrawCurrentBuffer(n); 
  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   *
   * The super method does nothing. Each shape has their own unique update
   * animation method
   */
  updateAnimation() {
    return;
  }

}
