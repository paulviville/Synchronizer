import * as THREE from './three/three.module.js';

export default class Node {
	#id;
	#matrix;
	#children;
	#type;
	#data;
	#name;

	constructor ( id, name ) {
		this.#id = id;
		this.#name = name;
		this.#type = "node";
		this.#children = [];
	}

	get id ( ) {
		return this.#id;
	}

	get children ( ) {
		return this.#children;
	}

	get matrix ( ) {
		return this.#matrix;	
	}

	get name ( ) {
		return this.#name;
	}

	get type ( ) {
		return this.#type;
	}

	set type ( type ) {
		this.#type = type;
	}

	set matrix ( matrix ) {
		this.#matrix ??= new THREE.Matrix4();  
		this.#matrix.copy(matrix);
	}

	get data ( ) {
		this.#data ??= {};
		return this.#data;
	}
}