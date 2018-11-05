/*Ian Feekes
 *ifeekes@ucsc.edu
 *#1474914
 *cmps160 asg3
 *square.js
 *
 *Specifies a square, a subclass of Geometry
 */ 

/**
 * Specifies a Square. A subclass of Geometry.
 *
 * @author Ian Feekes
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  constructor(size, centerX, centerY, color, cFlag) {
    super(); 
    this.n = 4; 
    if(cFlag==1)
      {
        super.setColor(color);
        } 
    else {
      super.setRandomColor(); 
    }
    this.generateSquareVertices(size, centerX, centerY); 
  }

  /**
   * Generates the vertices of the square.
   *
   * @private
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  generateSquareVertices(size, centerX, centerY) {
    this.vertices = [
    centerX-size/100, centerY+size/100, 0,  this.color[0], this.color[1], this.color[2], 
    centerX-size/100, centerY-size/100, 0,  this.color[3], this.color[4], this.color[5],    
    centerX+size/100, centerY+size/100, 0,  this.color[6], this.color[7], this.color[8], 
    centerX+size/100, centerY-size/100, 0,  this.color[9], this.color[10], this.color[11], 
    ];
  }

  

}
