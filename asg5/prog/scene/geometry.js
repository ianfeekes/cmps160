/*Ian Feekes
 *#1474914
 *ifeekes@ucsc.edu
 *
 *geometry
 */ 


/**
 * Specifies a geometric object.
 *
 * @author "Ian Feekes"
 * @this {Geometry}
 */
class Geometry {
  /**
   * Constructor for Geometry.
   *
   * @constructor
   */
  constructor() {
    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.modelMatrix = new Matrix4(); // Model matrix applied to geometric object
    this.x = [];
    this.y = [];
    this.shader = null; // shading program you will be using to shade this geometry
    this.textures = [];
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render(numberOfVertices, renderMethod, space) {
    sendUniformMatToGLSL(this.modelMatrix.elements, u_ModelMatrix);  
    sendAttributeBufferToGLSL(this.vertices[0], space, a_Position);
    tellGLSLToDrawCurrentBuffer(renderMethod, numberOfVertices);
  }
  updateAnimation() {
    return;
  }
}


