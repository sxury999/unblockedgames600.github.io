// Initialize the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a simple player
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(geometry, material);
scene.add(player);

// Set up the player position
camera.position.z = 5;

// Handle user input
let isShooting = false;
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        isShooting = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
        isShooting = false;
    }
});

function animate() {
    requestAnimationFrame(animate);

    // Player movement
    if (isShooting) {
        shoot();
    }

    renderer.render(scene, camera);
}

function shoot() {
    const bulletGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
    bullet.position.set(player.position.x, player.position.y, player.position.z);
    scene.add(bullet);

    // Move the bullet
    const bulletSpeed = 0.1;
    function moveBullet() {
        bullet.position.z -= bulletSpeed;
        if (bullet.position.z < -10) {
            scene.remove(bullet);
        } else {
            requestAnimationFrame(moveBullet);
        }
    }
    moveBullet();
}

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

animate();
