import * as THREE from './three/three.module.js';
import { OrbitControls } from './three/controls/OrbitControls.js';
import { GLTFLoader } from './three/loaders/GLTFLoader.js'

export default class SceneInterface {
    #renderer;
    #scene;
    #camera;
    #orbitControls;

    #objectsMap = new Map();
    #boxMap = new Map();


    constructor ( ) {
		console.log("SceneInterface - constructor");

        this.#scene = new THREE.Scene();
        this.#scene.background = new THREE.Color(0xcccccc);
        this.#camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 );
        this.#camera.position.set( -2, 3, -3 );
        this.#renderer = new THREE.WebGLRenderer({antialias: true});
        this.#renderer.autoClear = false;
        this.#renderer.setPixelRatio( window.devicePixelRatio );
        this.#renderer.setSize( window.innerWidth, window.innerHeight );
        
        document.body.appendChild( this.#renderer.domElement );
        this.#orbitControls = new OrbitControls( this.#camera, this.#renderer.domElement);
    
    }

    async loadFile ( filePath ) {
		console.log("SceneInterface - loadFile");
	    const loader = new GLTFLoader();
		return new Promise (( resolve ) => {	
			loader.load(filePath, ( gltf ) => {
				const root = gltf.scene;
				this.#scene.add(root);
                this.#mapObjects();
                this.#addBoxHelpers();
                resolve(gltf);
			});
		});
    }

    #mapObjects ( ) {
		console.log("SceneInterface - #mapObjects");
		const root = this.#scene.children[0];
		console.log(root);
		this.#traverseScene( root, ( object ) => {
			this.#objectsMap.set(
				object.name,
				object
			);
		});
		console.log(this.#objectsMap)
    }

    get objectsMap ( ) {
        return new Map(this.#objectsMap);
    }
    
    getObject ( name ) {
        return this.#objectsMap.get(name);
    }

	#traverseScene ( root, func ) {
		const objects = [...root.children];
		for ( let i = 0; i < objects.length; ++i ) {
			objects.push(...objects[i].children);
			func(objects[i]);
		}
	}

    #addBoxHelpers ( ) {
		console.log("SceneInterface - #addBoxHelpers");
        this.#objectsMap.forEach((object, objectName) => {
            const boxHelper = new THREE.BoxHelper(object);
            boxHelper.visible = false;
            this.#scene.add(boxHelper);

            this.#boxMap.set(objectName, boxHelper);
        })
    }

    setMatrix ( objectName, matrix ) {
        const object = this.getObject(objectName);
        matrix.decompose(object.position, object.quaternion, object.scale);
        
        const boxHelper = this.#boxMap.get(objectName);
        boxHelper.update();
    }

    showBoxHelper ( objectName ) {
        const boxHelper = this.#boxMap.get(objectName);
        boxHelper.visible = true;
        boxHelper.update();
    }

    hideBoxHelper ( objectName ) {
        const boxHelper = this.#boxMap.get(objectName);
        boxHelper.visible = false;
    }

    get scene ( ) {
        return this.#scene;
    }

    get renderer ( ) {
        return this.#renderer;
    }

    get camera ( ) {
        return this.#camera;
    }

    get controls ( ) {
        return this.#orbitControls;
    }
}