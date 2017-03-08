var getJSON = (method,url) => {
	let XMLHttp = new XMLHttpRequest();
	XMLHttp.onreadystatechange = function () {
		if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
			var result = JSON.parse(XMLHttp.responseText);
			let notes = $('.notes');
			notes.empty();
			 console.log(result); // test if ajax works
			if (result.loginState !== 'no') {
				if (result[0].id!=='undefined') {
					for (var x in result) {
						let id = result[x].id,
							title = result[x].title,
							content = result[x].content,
							template = `
							<div class="row note" id="${id}">
								<div class="note-title">
									<p class="text-center">${title}</p>
									<div class="note-control">
										<span class="glyphicon glyphicon-pencil"></span>
										<span class="glyphicon glyphicon-trash"></span>
									</div>
								</div>
								<div class="note-content">${content}</div>
							</div>
						`;
						notes.append(template);
					};
				}
				else {
					let template = '<p class="note text-center">没有发现笔记哦，试着去添加一条笔记吧 ^_^</p>'
					notes.append(template);
				}
				
			}
			else {
				let template = '<p class="note text-center">没有发现笔记哦，请登陆 ^_^</p>'
				notes.append(template);
			}
			;
			
			
		};
	};
	XMLHttp.open(method,url,true);
	XMLHttp.send();
};
var getModal = (id) => {
	let myModal = {
		login:{
			id:'modalLogin',
			title: `登陆`,
			body: `
				<form>
		          <div class="form-group">
		            <label for="user" class="control-label">账号</label>
		            <input type="text" class="form-control" id="user">
		          </div>
		          <div class="form-group">
		            <label for="pass" class="control-label">密码</label>
		             <input type="text" class="form-control" id="pass">
		          </div>
		        </form>
			`,
			confirm:'登陆'
		},
		register:{
			id:'modalRegister',
			title: `注册`,
			body: `
				<form>
	          <div class="form-group">
	            <label for="user" class="control-label">账号</label>
	            <input type="text" class="form-control" id="user">
	          </div>
	          <div class="form-group">
	            <label for="pass" class="control-label">密码</label>
	             <input type="text" class="form-control" id="pass">
	          </div>
	          <div class="form-group">
	            <label for="confirm-pass" class="control-label">确定密码</label>
	             <input type="text" class="form-control" id="confirm-pass">
	          </div>
	        </form>
			`,
			confirm:'注册'
		}
	},
		template = `
			<div class="modal fade" id="${myModal[id].id}" tabindex="-1" role="dialog">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h4 class="modal-title">${myModal[id].title}</h4>
			      </div>
			      <div class="modal-body">
			        <form>${myModal[id].body}</form>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
			        <button type="button" class="btn btn-primary">${myModal[id].confirm}</button>
			      </div>
			    </div>
			  </div>
			</div>
		`;
		var body = $('body');
		body.append(template);
}