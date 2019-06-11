const gl = document.getElementById('c').getContext('webgl2');
const canvas = gl.canvas;
if (!gl) alert('No gl');

const mouseLocation = { x: 0.0, y: 0.0 };
const container = document.getElementById('container');
container.onmousemove = ({ clientX: x, clientY: y }) => {
    mouseLocation.x = x;
    mouseLocation.y = y;
};
container.addEventListener(
    "touchmove",
    ({ touches }) => {
        if ( touches[0] ) {
            const { clientX: x, clientY: y } = touches[0]
            mouseLocation.x = x;
            mouseLocation.y = y;
        }
    }
);


const cssToRealPixels = 1; // window.devicePixelRatio || 1; // SLOW

const resize = () => {
    const displayWidth  = Math.floor(canvas.clientWidth  * cssToRealPixels);
    const displayHeight = Math.floor(canvas.clientHeight * cssToRealPixels);

    if (canvas.width  !== displayWidth || canvas.height !== displayHeight) {
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
}

const createShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    const shaderCompiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if ( shaderCompiled ) return shader;

    console.log( gl.getShaderInfoLog(shader) );
    gl.deleteShader(shader);
};

const createProgram = (vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const programLinked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if ( programLinked ) return program;

    console.log( gl.getProgramInfoLog(program) );
    gl.deleteProgram(program);
};


const vertexShaderSource = `#version 300 es
in vec4 a_position;

void main() {
    gl_Position = a_position;
}
`;

const fragmentShaderSource = `#version 300 es
// https://www.shadertoy.com/view/XlfGRj
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define iterations 17
#define formuparam 0.53

#define volsteps 15
#define stepsize 0.050

#define zoom   0.8
#define tile   0.850
#define speed  0.010
#define brightness 0.0015
#define darkmatter 0.300
#define distfading 0.760
#define saturation 0.800

uniform vec3    iResolution;  // viewport resolution (in pixels)
uniform float   iTime;        // shader playback time (in seconds)
uniform vec4    iMouse;       // mouse pixel coords. xy: current (if MLB down), zw: click

out vec4 fragColor;

void main()
{
    //get coords and direction

    vec2 uv = gl_FragCoord.xy/iResolution.xy-.5;
    uv.y *= iResolution.y/iResolution.x;
    vec3 dir = vec3(uv * zoom, 1.0);
    float time = iTime * speed + 0.25;


    vec3 from=vec3(1.0, 0.5, 0.5);


    vec3 forward = vec3(0.0, 0.0, 1.0);

    //mouse rotation
    float a1 = 0.3;
    mat2 rot1 = mat2(cos(a1),sin(a1),-sin(a1),cos(a1));
    float a2 = 0.6;
    mat2 rot2 = mat2(cos(a2),sin(a2),-sin(a2),cos(a2));
    dir.xz*=rot1;
    forward.xz *= rot1;
    dir.yz*=rot1;
    forward.yz *= rot1;

    // pan (dodgy)
    from += (iMouse.x/iResolution.x - 0.5) * vec3(-forward.z,0.0,forward.x);

    //zoom
    float zooom = iTime/20.0;
    from += forward * zooom;
    float sampleShift = mod( zooom, stepsize );
    float zoffset = -sampleShift;
    sampleShift /= stepsize;

    //volumetric rendering
    float s = 0.1;
    vec3 v=vec3(0.0);
    for (int r=0; r<volsteps; r++) {
        vec3 p = from + (s+zoffset) * dir;

        p = abs( vec3(tile) - mod(p, vec3(tile*2.0)) ); // tiling fold
        float
        pa,
        a = pa = 0.0;
        for (int i = 0; i < iterations; i++) {
            p = abs(p)/dot(p,p)-formuparam; // the magic formula
            a += abs(length(p)-pa); // absolute sum of average change
            pa = length(p);
        }

        a *= a * a * a; // add contrast

        // need closed form expression for this, now that we shift samples
        float fade = pow(distfading, max(0.0, float(r)-sampleShift));
        v += fade;

        // fade out samples as they approach the camera
        if( r == 0 ) fade *= 1. - sampleShift;

        // fade in samples as they approach from the distance
        if( r == volsteps-1 ) fade *= sampleShift;

        v+=vec3(
            0.05 * s,
            1.50 * s*s,
            10.0 * s*s*s*s
        ) * a * brightness * fade; // coloring based on distance
        s += stepsize;
    }
    v = mix( vec3(length(v)), v, saturation ); //color adjust
    fragColor = vec4( v * 0.001, 1.0 );
}
`;

const program = createProgram(
    createShader(gl.VERTEX_SHADER, vertexShaderSource),
    createShader(gl.FRAGMENT_SHADER, fragmentShaderSource),
    );

const resolutionUniformLocation = gl.getUniformLocation(program, "iResolution");
const timeUniformLocation = gl.getUniformLocation(program, "iTime");
const mouseUniformLocation = gl.getUniformLocation(program, "iMouse");

const positionBuffer = gl.createBuffer();
const positions = [
-1, -1,
1, 1,
1, -1,
1, 1,
-1, 1,
-1, -1,
];
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);




resize();


gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.clear(gl.DEPTH_BUFFER_BIT);


gl.useProgram(program);

const draw = (time) => {
    resize();
    gl.uniform3f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height, 0.0);
    gl.uniform1f(timeUniformLocation, time);
    gl.uniform4f(mouseUniformLocation, mouseLocation.x, mouseLocation.y, 0.0, 0.0);
    gl.drawArrays(gl.TRIANGLES, 0, positions.length/2);
}

let start = null;
let elapsed = 0, last = 0;
function loop( timestamp ) {
    if (!start) start = timestamp;

    elapsed = timestamp - last;

    draw(timestamp/1000);

    if (elapsed > 1/60) window.requestAnimationFrame(loop);

    last = timestamp;
}
window.requestAnimationFrame(loop);