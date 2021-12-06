precision mediump float;

uniform sampler2D uMap;
const mat3 rgb2yiq = mat3(0.299, 0.587, 0.114, 0.595716, -0.274453, -0.321263, 0.211456, -0.522591, 0.311135);
const mat3 yiq2rgb = mat3(1.0, 0.9563, 0.6210, 1.0, -0.2721, -0.6474, 1.0, -1.1070, 1.7046);

struct Bubl {
  float radius;
  vec2 coords;
};

const Bubl bubl1 = Bubl(0.15, vec2(0.4, 0.4));
const Bubl bubl2 = Bubl(0.1, vec2(0.2, 0.3));
const Bubl bubl3 = Bubl(0.05, vec2(0.6, 0.3));

const float distortionBubl = 0.6;

const float hue = 0.2;
uniform float uTime;
uniform vec2 uCanvasSize;
varying vec2 vUv;

float getMagnificationFactor(float radiusBubl) {
  return distortionBubl/radiusBubl;
}

vec4 getHueColor(vec4 color){
    vec3 yColor = rgb2yiq * color.rgb;

    float originalHue = atan(yColor.b, yColor.g);
    float finalHue = originalHue + hue;

    float chroma = sqrt(yColor.b*yColor.b+yColor.g*yColor.g);

    vec3 yFinalColor = vec3(yColor.r, chroma * cos(finalHue), chroma * sin(finalHue));
    return vec4(yiq2rgb*yFinalColor, 1.0);
}

vec2 caclBublCoord(vec2 bublCoord) {
  vec2 newBublCoord = vec2(uCanvasSize.x * bublCoord.x,  uCanvasSize.y * bublCoord.y);
  return newBublCoord;
}

vec4 getTexelWithBubl(Bubl bubl, vec4 texel){
  vec2 bublCoords = caclBublCoord(bubl.coords);
  float dist = distance(gl_FragCoord.xy, bublCoords) / uCanvasSize.y;
  if (dist < bubl.radius) {
    vec2 direction = (vec2(bublCoords.x / uCanvasSize.x, bublCoords.y / uCanvasSize.y ) - vUv);
    texel = texture2D( uMap, vUv + direction * (distortionBubl - getMagnificationFactor(bubl.radius) * dist) *1.2);
  }
  return texel;
}

vec4 editTexel(){
  vec4 texel = texture2D( uMap, vUv);
  texel = getTexelWithBubl(bubl1, texel);
  texel = getTexelWithBubl(bubl2, texel);
  texel = getTexelWithBubl(bubl3, texel);

  return texel;
}


void main() {
  vec4 texel = editTexel();
  gl_FragColor = getHueColor(texel);
}
