import {
    Object3D,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from 'three';
import {
    controls,
} from './';
import {
    Bars,
    WhiteRing
} from './../lib/objects';

export const visualizer = (() => {

	let camera, scene, renderer, rendertime, vizHolder;
    const activeViz = [Bars, WhiteRing];
	const FIXED_SIZE_W = 800;
	const FIXED_SIZE_H = 600;

    const init = () => {

		// RENDERER
		renderer = new WebGLRenderer({
			antialias: false,
		});
		renderer.setSize(FIXED_SIZE_W, FIXED_SIZE_H);
		renderer.setClearColor (0x000000);
		renderer.sortObjects = false;
		document.getElementById('viz').appendChild(renderer.domElement);

		// 3D SCENE
		camera = new PerspectiveCamera(70, FIXED_SIZE_W / FIXED_SIZE_H, 1, 3000);
		camera.position.z = 1000;

		scene = new Scene();
		scene.add(camera);

		// INIT VIZ
		vizHolder =  new Object3D();
		scene.add(vizHolder);

        activeViz.forEach(viz => viz.init());
    };

    const update = () => {
		rendertime += 0.01;
	};

	const onResize = () => {

        const { fullSize } = controls.vizParams;
        const { innerWidth, innerHeight } = window;

		const renderW = fullSize ? innerWidth : FIXED_SIZE_W;
		const renderH = fullSize ? innerHeight : FIXED_SIZE_H;

        if(camera) {
            camera.aspect = renderW / renderH;
            camera.updateProjectionMatrix();
            renderer.setSize(renderW, renderH);
        }
	};

    return {
		getCamera: () => camera,
		getRenderer: () => renderer,
		getScene: () => scene,
		getVizHolder:() => vizHolder,
		init,
		onResize,
        update,
	};
})();
