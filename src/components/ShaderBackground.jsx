import { useEffect, useRef } from "react"
import * as THREE from "three"

const ShaderBackground = () => {
  const mountRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.position = 'fixed'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.width = '100vw'
    renderer.domElement.style.height = '100vh'
    renderer.domElement.style.minHeight = '100vh'
    renderer.domElement.style.zIndex = '-2000'
    renderer.domElement.style.pointerEvents = 'none'
    renderer.domElement.style.objectFit = 'cover'
    
    mountRef.current.appendChild(renderer.domElement)

    const material = new THREE.ShaderMaterial({
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      uniforms: {
        u_color: { value: [0.3137254901960784, 0, 1] },
        u_background: { value: [0.039, 0.098, 0.184, 1] },
        u_speed: { value: 0.876 },
        u_detail: { value: 0.074 },
        u_time: { value: 0 },
        u_mouse: { value: [0, 0] },
        u_resolution: { value: [window.innerWidth, window.innerHeight] },
      },
      transparent: true,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    mesh.position.z = -1
    camera.position.z = 0

    const resizePlane = () => {
      const distance = Math.abs(mesh.position.z - camera.position.z)
      const fovInRadians = (camera.fov * Math.PI) / 180
      const height = 2 * Math.tan(fovInRadians / 2) * distance
      const width = height * camera.aspect
      // Ensure full coverage with extra scaling for mobile
      const scaleFactor = window.innerWidth < 768 ? 2.5 : 1.5
      mesh.scale.set(width * scaleFactor, height * scaleFactor, 1)
    }

    resizePlane()

    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    const clock = new THREE.Clock()
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      material.uniforms.u_time.value = elapsedTime
      material.uniforms.u_mouse.value = [mouse.x / 2 + 0.5, mouse.y / 2 + 0.5]
      material.uniforms.u_resolution.value = [window.innerWidth, window.innerHeight]
      renderer.render(scene, camera)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.domElement.style.width = '100vw'
      renderer.domElement.style.height = '100vh'
      renderer.domElement.style.minHeight = '100vh'
      material.uniforms.u_resolution.value = [window.innerWidth, window.innerHeight]
      resizePlane()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2000,
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom left, #0d1f2d, #0d1f2d, #050551)'
      }}
    />
  )
}

const fragmentShader = `
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;
uniform vec4 u_background;
uniform float u_speed;
uniform float u_detail;

mat2 m(float a) {
  float c=cos(a), s=sin(a);
  return mat2(c,-s,s,c);
}

float map(vec3 p) {
  float t = u_time * u_speed;
  p.xz *= m(t * 0.4);
  p.xy*= m(t * 0.1);
  vec3 q = p * 2.0 + t;
  return length(p+vec3(sin((t*u_speed) * 0.1))) * log(length(p) + 0.9) + cos(q.x + sin(q.z + cos(q.y))) * 0.5 - 1.0;
}

void main() {
  vec2 a = gl_FragCoord.xy / u_resolution.x - vec2(0.5, 0.5);
  vec3 cl = vec3(0.0);
  float d = 2.5;
  for (float i = 0.; i <= (1. + 20. * u_detail); i++) {
    vec3 p = vec3(0, 0, 4.0) + normalize(vec3(a, -1.0)) * d;
    float rz = map(p);
    float f = clamp((rz - map(p + 0.1)) * 0.5, -0.1, 1.0);
    vec3 l = vec3(0.1, 0.3, 0.4) + vec3(5.0, 2.5, 3.0) * f;
    cl = cl * l + smoothstep(2.5, 0.0, rz) * 0.6 * l;
    d += min(rz, 1.0);
  }
  vec4 color = vec4(min(u_color, cl),1.0);
  color.r = max(u_background.r,color.r);
  color.g = max(u_background.g,color.g);
  color.b = max(u_background.b,color.b);
  gl_FragColor = color;
}
`

const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export default ShaderBackground
