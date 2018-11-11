var ASSIGN4_VSHADER =
'uniform mat4 u_ViewMatrix;\n' +
'uniform mat4 u_ProjMatrix;\n' +
`uniform mat4 u_modelMatrix;\n` +
`attribute vec4 a_Position;\n` +
'attribute vec2 a_TexCoord;\n' +
'varying vec2 v_TexCoord;\n' +
  `void main() {\n` +
  `   gl_Position = u_ProjMatrix * u_ViewMatrix * u_modelMatrix * a_Position;\n` +
  '   v_TexCoord = a_TexCoord;\n' +
  `}\n`;



  // Basic Fragment Shader that receives a single one color (point).
  var ASSIGN5_FSHADER =
  `precision mediump float;\n` +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  `void main() {\n` +
  ' gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  `}\n`;
