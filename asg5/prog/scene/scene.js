const CUBE_SIZE = 0.5
const IMG_SIZE = 8
const FLOOR_LEVEL = -0.5
/**
 * Specifies a WebGL scene.
 *
 * @author "Boaz Keren Gil"
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor() {
    this.geometries = []; // Geometries being drawn on canvas new Cube(0.5, 0, 2, 0)
    gl.clearColor(0,0,0,1)
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.viewMatrix = new Matrix4(); // View matrix
    this.projMatrix = new Matrix4(); // Projection matrix
    this.camera = null
    this.shader = createShader(gl, ASSIGN4_VSHADER, ASSIGN5_FSHADER);
    useShader(gl, this.shader);
    this.generateWorld()

    this.addObj("cat.obj", "cat_diff.jpg", 1, FLOOR_LEVEL+0.5, -8)
    this.addObj("teapot.obj", "teapot.png", 9, FLOOR_LEVEL-0.3, -8)

  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
    this.geometries.push(geometry)
  }

  async generateWorld() {
    //We use async await to wait on the loaders
    let colorsData = await this.loadImageData("./map_colors.png")
    let heightsData = await this.loadImageData("./map_heights.png")

    let o = 0
    let i = 0
    let colors = []
    let heights = []
    while (o < (IMG_SIZE*IMG_SIZE*4)) { //We loop on rows*columns*4 values
      colors[i] = [colorsData[o]/255, colorsData[o+1]/255, colorsData[o+2]/255, colorsData[o+3]/255]
      heights[i] = Math.round(heightsData[o]/255 * 2) //The height is calculated on base of the intensity of the b/w
      o += 4 //Next 4 values
      i++ //Next index
    }
    for (let z = 0; z < IMG_SIZE; z++) {
      for (let x = 0; x < IMG_SIZE; x++) {
        let index = x+z*IMG_SIZE //Index should always be relative to the row
        let textureName = "wall.jpg"
        if(heights[index] == 0) {
          textureName = "floor.jpg" //Height is low, so floor
        }
        let cube = new Cube(CUBE_SIZE, x, FLOOR_LEVEL, -z, heights[index], textureName)
        cube.color = colors[index] //I don't know why I do this, we use anyway just textures
        this.addGeometry(cube)
      }
    }
  }

  loadImageData(src){
    //We use promises so we won't block our app
    return new Promise((resolve, reject) => {
      let img = new Image(IMG_SIZE,IMG_SIZE)
      img.onload = () => resolve(sampleImageColor(img))
      img.onerror = reject
      img.src = src
    })
  }


  addObj(name, texture, x, y, z) {
    return loadFile(name, (textData) => {
      let obj = new LoadedOBJ(textData)
      if(texture) {
        let path = "./"+texture
        create2DTexture(path, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE, (texture) => {
          obj.texture = texture
        })
      }
      obj.flatData()
      //Animating
      obj.updateAnimation = function() {
        this.modelMatrix.rotate(1, 0, 1, 0)
      }
      //Moving obj to location
      obj.modelMatrix.translate(x,y,z)
      //Scaling it down
      obj.modelMatrix.scale(0.2,0.2,0.2)
      this.addGeometry(obj)
    })
  }


  /**
   * Updates the animation for each geometry in geometries.
   */
  updateAnimation() {
    for (var i = 0; i < this.geometries.length; i++) {
      this.geometries[i].updateAnimation()
    }
  }

  /**
   * Renders all the Geometry within the scene.
   */
  render() {

    gl.clearColor(0.9,0.9,0.9,1)
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //We update view matrix on each frame
    sendUniformMatToGLSL(scene.viewMatrix.elements, "u_ViewMatrix")
    for (var i = 0; i < this.geometries.length; i++) {
      this.geometries[i].render() //we animate the geometries
    }
  }
}
