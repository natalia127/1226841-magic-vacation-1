precision mediump float;

uniform sampler2D map;
const mat3 rgb2yiq = mat3(0.299, 0.587, 0.114, 0.595716, -0.274453, -0.321263, 0.211456, -0.522591, 0.311135);
const mat3 yiq2rgb = mat3(1.0, 0.9563, 0.6210, 1.0, -0.2721, -0.6474, 1.0, -1.1070, 1.7046);
uniform float hue;

varying vec2 vUv;


vec4 getHueColor(vec4 color){
    vec3 yColor = rgb2yiq * color.rgb;

    float originalHue = atan(yColor.b, yColor.g);
    float finalHue = originalHue + hue;

    float chroma = sqrt(yColor.b*yColor.b+yColor.g*yColor.g);

    vec3 yFinalColor = vec3(yColor.r, chroma * cos(finalHue), chroma * sin(finalHue));
    return vec4(yiq2rgb*yFinalColor, 1.0);
}

void main() {
  vec4 texel = texture2D( map, vUv );
  if (hue == 0.0) {
    gl_FragColor = texel;
  } else {
    gl_FragColor = getHueColor(texel);
  }

}
