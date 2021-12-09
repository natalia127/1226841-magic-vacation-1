precision mediump float;

uniform sampler2D uMap;
const mat3 rgb2yiq = mat3(0.299, 0.587, 0.114, 0.595716, -0.274453, -0.321263, 0.211456, -0.522591, 0.311135);
const mat3 yiq2rgb = mat3(1.0, 0.9563, 0.6210, 1.0, -0.2721, -0.6474, 1.0, -1.1070, 1.7046);

struct Bubl {
  vec2 coords;
  float radius;
  float startCoordX;
  float amplitude;
};

const Bubl bubl1 = Bubl(vec2(0.0, 0.0), 0.07, 0.4, 0.05);
const Bubl bubl2 = Bubl(vec2(0.0, 0.0), 0.05, 0.2, 0.06 );
const Bubl bubl3 = Bubl(vec2(0.0, 0.0), 0.02, 0.6, 0.04  );

const float borderWidthBubl = 0.003;
const vec4 colorFlare = vec4(1.0, 1.0, 1.0, 0.15);
const float distortionBubl = 0.6;

uniform float uProgressHue;
uniform float uProgressBubl1;
uniform float uProgressBubl2;
uniform float uProgressBubl3;
uniform vec2 uCanvasSize;

varying vec2 vUv;

float getMagnificationFactor(float radiusBubl) {
  return distortionBubl/radiusBubl;
}

vec4 getHueColor(vec4 color){
   float maxHue = 0.4;
   float minHue = -0.2;
   float hue = 0.0;
    if (uProgressHue < 0.5) {
      hue = minHue + uProgressHue * (maxHue - minHue);
    } else {
      hue = maxHue + uProgressHue * (minHue - maxHue);
    }
    vec3 yColor = rgb2yiq * color.rgb;

    float originalHue = atan(yColor.b, yColor.g);
    float finalHue = originalHue + hue;

    float chroma = sqrt(yColor.b*yColor.b+yColor.g*yColor.g);

    vec3 yFinalColor = vec3(yColor.r, chroma * cos(finalHue), chroma * sin(finalHue));
    return vec4(yiq2rgb*yFinalColor, 1.0);
}

vec2 recaclBublCoord(vec2 bublCoord) {
  vec2 newBublCoord = vec2(uCanvasSize.x * bublCoord.x,  uCanvasSize.y * bublCoord.y);
  return newBublCoord;
}
vec4 blendOutline(vec4 texture, vec4 outline) {
  return vec4(mix(texture.rgb, outline.rgb, outline.a), texture.a);
}

bool isBetweenAngles(vec2 point) {
  float angle = atan(point.y, point.x);
  return angle >= 2.0 && angle <= 3.0;
}

vec2 getBublCoords(Bubl bubl, float progress){
  float fromY = 0.0 - bubl.radius;
  float toY = 1.0 + bubl.radius;
  float offset = bubl.amplitude * pow(1.0 - progress, 1.0) * sin(progress * 3.14 * 5.0);
  float x = (offset + bubl.startCoordX);
  float y = (toY - fromY)* progress + fromY;
  return recaclBublCoord(vec2(x, y));

}

vec4 getTexelWithBubl(Bubl bubl, vec4 texel, float progress){
  vec2 bublCoords = getBublCoords(bubl, progress);
  float dist = distance(gl_FragCoord.xy, bublCoords) / uCanvasSize.y;
  // искажение в пузыре
  if (dist < bubl.radius) {
    vec2 direction = (vec2(bublCoords.x / uCanvasSize.x, bublCoords.y / uCanvasSize.y ) - vUv);
    texel = texture2D( uMap, vUv + direction * (distortionBubl - getMagnificationFactor(bubl.radius) * dist) *1.2);
  }

  //контур пузыря
  if (dist > bubl.radius && dist <= bubl.radius + borderWidthBubl) {
    texel = blendOutline(texture2D( uMap, vUv), colorFlare);
  }

  //контур блика
  float distanceFlare = bubl.radius * 0.85;
  bool isFlare = isBetweenAngles(gl_FragCoord.xy - bublCoords);
  if (dist > distanceFlare && dist < distanceFlare + borderWidthBubl && isFlare) {
    texel = blendOutline(texture2D( uMap, vUv), colorFlare);
  }
  return texel;
}

vec4 editTexel(){
  vec4 texel = texture2D( uMap, vUv);
  if (uProgressBubl1 > 0.0) {
    texel = getTexelWithBubl(bubl1, texel, uProgressBubl1);
  }
  if (uProgressBubl2 > 0.0) {
    texel = getTexelWithBubl(bubl2, texel, uProgressBubl2);
  }
  if (uProgressBubl3 > 0.0) {
    texel = getTexelWithBubl(bubl3, texel, uProgressBubl3);
  }

  return texel;
}


void main() {
  vec4 texel = editTexel();
  gl_FragColor = getHueColor(texel);
}
