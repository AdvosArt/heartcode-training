import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'

const ThreeScene: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Three.js scene here
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            containerRef.current?.appendChild(renderer.domElement);
            camera.position.z = 5;

            // Add this inside the useEffect hook after initializing the renderer
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);



            // Add this function inside the useEffect hook
            const renderScene = () => {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                renderer.render(scene, camera);
                requestAnimationFrame(renderScene);
            }
            
            // Call the renderScene function to start the animation loop
            renderScene();

            const fbxLoader = new FBXLoader()
            fbxLoader.load(
                'https://cdn.discordapp.com/attachments/745996133607800946/1294146987092082688/mcNugget.fbx?ex=6709f3cd&is=6708a24d&hm=4484de03c25fdfb282f792852a896840177d50443291259821117d9e1d18315b&',
                (object) => {
                    scene.add(object)
                    object.rotation.x += 0.01;
                    object.rotation.y += 0.01;
                    renderer.render(scene, camera);
                    requestAnimationFrame(renderScene);
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )

            const handleResize = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;
        
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
        
                renderer.setSize(width, height);
            };
            
            
            window.addEventListener('resize', handleResize);

            // Clean up the event listener when the component is unmounted
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        
        }
    }, []);
    return <div ref={containerRef} />;
};

export default ThreeScene;