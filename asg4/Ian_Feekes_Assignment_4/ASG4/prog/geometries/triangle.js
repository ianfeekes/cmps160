

/**
 * Specifies a Triangle. A subclass of Geometry.
 *
 * @author Ian Feekes
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  constructor(size, centerX, centerY,color,cFlag) {
    super(); 
    this.n=3; 
    if(cFlag==1)super.setColor(color); 
    else super.setRandomColor(); 
    this.generateTriangleVertices(size, centerX, centerY); 
  }

  /**
   * Generates the vertices of the Triangle.
   *
   * @private
   * @param {Number} size The size of the triangle drawn
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  generateTriangleVertices(size, centerX, centerY) {
    this.vertices = new Float32Array([   
    centerX, centerY+size/100, 0,this.color[0], this.color[1], this.color[2], 
    centerX-size/100, centerY-size/100,0, this.color[3], this.color[4], this.color[5],
    centerX+size/100, centerY-size/100,0, this.color[6], this.color[7], this.color[8], 
    ]);
    this.n=3; 
  }
  
}