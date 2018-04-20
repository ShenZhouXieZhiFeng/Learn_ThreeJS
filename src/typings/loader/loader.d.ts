// Type definitions for loader.js
// Project: [LIBRARY_URL_HERE] 
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]> 
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/**
 * 
 */
export declare var scene : /*no type*/{};

/**
 * 
 */
declare var loader : {
		
	/**
	 * 
	 */
	texturePath : string;
}

/**
 * 
 */
declare namespace camera{
		
	/**
	 * 
	 */
	export var aspect : number;
		
	/**
	 * 
	 */
	export var castShadow : boolean;
}

/**
 * 
 */
declare namespace renderer{
		
	/**
	 * 
	 */
	export var shadowMapSoft : boolean;
}

/**
 * 
 */
export declare var controls : /*no type*/{};

/**
 * 
 */
export declare var loadComplete : boolean;

/**
 * 
 */
export declare var rootPath : string;

/**
 * 
 */
declare function start(): void;

/**
 * 
 */
export declare var fps : number;

/**
 * ��Ⱦ�Ż�,1.�����Ⱦ; 2.�ж���������˶�,���˶���ֹͣ��Ⱦ
 */
export declare var now : number;

/**
 * 
 */
export declare var then : number;

/**
 * 
 */
export declare var interval : number;

/**
 * 
 */
declare function update(): void;

/**
 * 
 */
declare function onResize(): void;

/**
 * 
 * @param node 
 */
declare function initInfo(node : /* camera */ any): void;
