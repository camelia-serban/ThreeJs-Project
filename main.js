import * as THREE from "three"
import "./style.css"
import gsap from "gsap"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"


//create scene
const scene = new THREE.Scene()

//create the sphere
const geometry = new THREE.SphereGeometry(5, 64, 64)
const material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("./image/pluto.jpg"),
  roughness: 0.5
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


//ads stars
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  map: new THREE.TextureLoader().load("./image/star.jpg"),
  size: 2,
  transparent: true
});

const starVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 2000;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVertices, 3)
);

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

//sizes
const sizes = {
  width: window.innerWidth, 
  height: window.innerHeight
}

//add light
const light = new THREE.PointLight(0xfffff, 1, 100)
light.position.set(0, 10, 10) 
light.intensity = 1.25
scene.add(light)

//add camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 45
scene.add(camera)

//create the renderer of the scene on the screen
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

//add renderer of the scene on the screen
renderer.render(scene, camera)

//add controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 1


//resize the screen
window.addEventListener('resize', () => {
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height

  //update screen
  renderer.setSize(sizes.width, sizes.height)
})
//dont't include the object
const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()


//animate
const tl = gsap.timeline({defaults: {duration: 1} })
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})

//mouse animation color
let mouseDown = false
let rgb = []
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = false))
window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255), 
      150
    ]
    //animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
  }
})