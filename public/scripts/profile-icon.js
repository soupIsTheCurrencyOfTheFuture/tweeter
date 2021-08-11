const canvas = document.querySelector('canvas.webgl');

const PI = Math.PI;

const scene = new THREE.Scene();

// Instantiate a loader
const loader = new THREE.GLTFLoader();

const modelGroup = new THREE.Group();

// Load a glTF resource
loader.load(
  // resource URL
  '/images/profile-icon.glb',
  // called when the resource is loaded
  function(gltf) {

    modelGroup.add(gltf.scene);

    scene.add(modelGroup);

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

  },
  // called while loading is progressing
  function(xhr) {

    console.log((xhr.loaded / xhr.total * 100) + '% loaded');

  },
  // called when loading has errors
  function(error) {

    console.log('An error happened');

  }
);

const sizes = {
  width: window.innerWidth / 2.5,
  height: window.innerHeight / 2.5
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 23;


scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.position.x = -10;
directionalLight.position.y = -10;
directionalLight.position.z = 10;
scene.add(directionalLight);

// const controls = new OrbitControls(camera, canvas)
// controls.enabled = true

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth / 2.5;
  sizes.height = window.innerHeight / 2.5;

  camera.aspect = (sizes.width / sizes.height);
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener('mousemove', (event) => {
  modelGroup.rotation.y = (event.clientX / window.innerWidth) - 0.5;
  modelGroup.rotation.x = (event.clientY / window.innerHeight) - 0.5;

  modelGroup.position.x = ((event.clientX / window.innerWidth) - 0.5) * 15;
  modelGroup.position.y = ((event.clientY / window.innerHeight) - 0.5) * -15;
});

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setClearColor(0x000000, 0);


const clock = new THREE.Clock();

const tick = () => {
  const getElapsedTime = clock.getElapsedTime();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
