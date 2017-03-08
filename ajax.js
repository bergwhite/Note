var getJSON = (method,url) => {
	let XMLHttp = new XMLHttpRequest();
	XMLHttp.onreadystatechange = function () {
		if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
			var result = JSON.parse(XMLHttp.responseText);
			let notes = $('.notes');
			notes.empty();
			// console.log(result); test if ajax works
			if (result.loginState !== 'no') {
				for (var x in result) {
					let title = result[x].title;
					let content = result[x].content;
					let template = `
						<div class="row note">
							<p class="note-title">${title}</p>
							<div class="note-content">${content}</div>
						</div>
					`;
					notes.append(template);
				};
			};
			
			
		};
	};
	XMLHttp.open(method,url,true);
	XMLHttp.send();
};