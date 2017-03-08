getJSON('GET','/Note/api/note/search.php');
$(document).ready = () => {
	console.log('ajax:'+getJSONResult);
	console.log(typeof getJSONResult);
}

(() => {
	let notes = $('.notes');
	return console.log('i\'m test.js');
})();
