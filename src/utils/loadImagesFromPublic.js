export default function loadImagesFromPublic(paths){
	const imgs = [];
	for (let i = 0; i < paths.length; i++){
		imgs.push(import(`../../public/${paths[i]}`));
	}

	return Promise.all(imgs);
}