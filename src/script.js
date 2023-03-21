import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Group, MeshStandardMaterial } from 'three'

import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js"


/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')



// Scene
const scene = new THREE.Scene()

//adding fog
const fog = new THREE.Fog('black',1,40)
// scene.fog = fog

//we see edges of plane , so we set same color of render as fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

//door texture
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

//wall texture
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

//grass texture
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8,8)
grassAmbientOcclusionTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

// texture cannot repeat so we need to tell every texture to repeat
grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

//font
const fontLoader = new FontLoader()
fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font)=>{
        //trigger when font is loaded
        console.log("font loaded")
        //to create geometry we use TextGeometry
        const  textGeometry = new TextGeometry(
            'Haunted Place',{
                font : font,
                size : 3,
                height:0.2,
                curveSegments:6, // decreae it to decrease triangles a
                bevelEnabled:true,
                bevelThickness:0.03,
                bevelSize:0.02,
                bevelOffset:0,
                bevelSegments:5
            }
        )
    const textMaterial = new THREE.MeshStandardMaterial({color:"white"})
    const textMesh  = new THREE.Mesh(textGeometry,textMaterial)
 
    textGeometry.center()

    textMesh.position.set(0,5,0)
    scene.add(textMesh)
    })

/**
 * House
 */
// wehave lots of shapes to constract a house so we include then in a group if we resize a one , it will resize all
const house = new THREE.Group()
scene.add(house)

//walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new MeshStandardMaterial({
        map:bricksColorTexture,
        aoMap:bricksAmbientOcclusionTexture,
        roughnessMap : bricksRoughnessTexture,
        normalMap : bricksNormalTexture
    })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array , 2))
walls.position.y = 1.25
house.add(walls)

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({color:'#b35f45'})

)
roof.position.y = 2.5+0.5
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//ghost body

const ghost = new THREE.Group()
scene.add(ghost)

const ghostSphere = new THREE.SphereGeometry(0.5,32,32)
const ghostSphereMaterial = new THREE.MeshStandardMaterial({
    color:'grey'
})
const ghostSphereMesh = new THREE.Mesh(ghostSphere,ghostSphereMaterial) 
ghostSphereMesh.position.set(0,4.5,1)

const ghostCylinder = new THREE.CylinderGeometry(0.5,0.5,1,20,20)
const ghostCylinderMaterial = new THREE.MeshStandardMaterial({
    color:'grey'
})
const ghostCylinderMesh = new THREE.Mesh(ghostCylinder,ghostCylinderMaterial)
ghostCylinderMesh.position.set(0,4,1)

const ghostCone = new THREE.ConeGeometry(0.5,1,20,20)
const ghostConeMaterial = new THREE.MeshStandardMaterial({
    color:'grey'
})
const ghostConeMesh = new THREE.Mesh(ghostCone,ghostConeMaterial)
ghostConeMesh.rotation.x = Math.PI
ghostConeMesh.position.set(0,3,1)

const ghosteye1 = new THREE.CircleGeometry(0.1,20)
const ghosteye1Material = new THREE.MeshStandardMaterial({color:"white"})
const ghosteye1Mesh = new THREE.Mesh(ghosteye1,ghosteye1Material)
ghosteye1Mesh.position.set(0,4.5,1.5001)


const ghosteye2 = new THREE.CircleGeometry(0.05,20)
const ghosteye2Material = new THREE.MeshStandardMaterial({color:"black"})
const ghosteye2Mesh = new THREE.Mesh(ghosteye2,ghosteye2Material)
ghosteye2Mesh.position.set(0,4.5,1.5002)

const ghost4 = new THREE.PointLight("#ff0000",2,3) //fade fast because less parameter 3
ghost4.position.set(0,5.5,1)



const eyeLight =  new THREE.PointLight("#ffffff",2,3) //fade fast because less parameter 3
eyeLight.position.set(0,3,1)


ghost.rotation.x = Math.PI * 0.125



ghost.add(ghostCylinderMesh, ghostSphereMesh , ghostConeMesh , ghosteye1Mesh, ghosteye2Mesh , ghost4 ,eyeLight)

//door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2,2),
    new THREE.MeshStandardMaterial({
        map:doorColorTexture,
        transparent:true,
        alphaMap:doorAlphaTexture,
        aoMap:doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale:0.1,
        normalMap : doorNormalTexture,
        metalnessMap : doorMetalnessTexture,
        roughnessMap : doorRoughnessTexture
    })
)
//use for aomap
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array , 2))

door.position.z = 2 + 0.01
door.position.y = 1
house.add(door)

// bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16) 
const bushMaterial = new THREE.MeshStandardMaterial({color:"#89c854"})

const bush1 = new THREE.Mesh(bushGeometry , bushMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8,0.2,2.2)

const bush2 = new THREE.Mesh(bushGeometry , bushMaterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4,0.1,2.1)

const bush3 = new THREE.Mesh(bushGeometry , bushMaterial)
bush3.scale.set(0.4,.4,.4)
bush3.position.set(-0.8,0.1,2.2)

const bush4 = new THREE.Mesh(bushGeometry , bushMaterial)
bush4.scale.set(0.15,.15,.15)
bush4.position.set(-1,0.05,2.6)

house.add(bush1,bush2,bush3,bush4)

//The Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2)
const graveMaterial = new THREE.MeshStandardMaterial({color: "#b2b6b1"})

for (let i = 0; i < 70; i++) {
    const angle = Math.random()*Math.PI*2 //can be between 0 and 6.38 
    const radius = 3 + Math.random()*6
    
    // i use above to generate graves between house and plane , not away from plane and inside house

    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * (radius+1)

    const grave = new THREE.Mesh(graveGeometry,graveMaterial)
    grave.position.set(x,0.4,z)
    grave.rotation.y = (Math.random()-0.5)*0.4
    grave.rotation.z = (Math.random()-0.5)*0.4
    grave.castShadow = true
    graves.add(grave)
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
     map:grassColorTexture,
     normalMap:grassNormalTexture,
     aoMap:grassAmbientOcclusionTexture,
     roughnessMap:grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array , 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

//door light
const doorLight = new THREE.PointLight("#ff7d46",1,7)
doorLight.position.set(0,2.2,2.7)
house.add(doorLight)

//Ghost lights
const ghost1 = new THREE.PointLight("#ff00ff",2,3) //fade fast because less parameter 3
scene.add(ghost1)

const ghost2 = new THREE.PointLight("#00ffff",2,3) //fade fast because less parameter 3
scene.add(ghost2)

const ghost3 = new THREE.PointLight("#ffff00",2,3) //fade fast because less parameter 3
scene.add(ghost3)


//moon
const moonSphere = new THREE.SphereGeometry(5,20,20)
const moonMaterial = new THREE.MeshStandardMaterial({color:"white"})
const moonMesh = new THREE.Mesh(moonSphere, moonMaterial)

moonMesh.position.set(0,7,-15)
scene.add(moonMesh)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('black')
renderer.shadowMap.type = THREE.PCFSoftShadowMap
//enabling hte shadow
renderer.shadowMap.enabled = true

// add cast shadows on light
moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
ghost4.castShadow = true
eyeLight.castShadow = true

walls.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true
bush1.castShadow = true

floor.receiveShadow = true

//optimize shadow
doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

ghost4.shadow.mapSize.width = 256
ghost4.shadow.mapSize.height = 256
ghost4.shadow.camera.far = 7

eyeLight.shadow.mapSize.width = 256
eyeLight.shadow.mapSize.height = 256
eyeLight.shadow.camera.far = 7


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()



// move ghosts

const ghostangle = elapsedTime * 0.5


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()