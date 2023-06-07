import * as THREE from "three"
import "./style.css"
import gsap from "gsap"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"



//create scene
const scene = new THREE.Scene()

//sizes
const sizes = {
  width: window.innerWidth, 
  height: window.innerHeight
}

//add camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000)
camera.position.z = 50
scene.add(camera)

//add light
var ambientLight = new THREE.AmbientLight( 0xffffff, 0.9 )
ambientLight.position.set(1, 32, 79)
ambientLight.castShadow = true
scene.add( ambientLight )

var dirLight = new THREE.DirectionalLight( 0xffffff, 2 )
dirLight.position.set(0, 32, 64)
scene.add( dirLight )

const topLight = new THREE.DirectionalLight(0xffffff, -1);
topLight.position.set(700, 500, 500);
topLight.castShadow = true;
scene.add(topLight)


//add loaded model
const gltfLoader = new GLTFLoader()
gltfLoader.load("./plutoplanet/scene.gltf", (gltfScene) => {
    gltfScene.scene.rotation.y = Math.PI / 8
    gltfScene.scene.position.y = -2
    gltfScene.scene.scale.set(10, 10, 10) 
    scene.add(gltfScene.scene)     
}) 
   

//create the renderer of the scene on the screen
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

//add dat gui


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