var getJSON = (method,url,data) => {
	let XMLHttp = new XMLHttpRequest();
	XMLHttp.onreadystatechange = function () {
		if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
			console.log(XMLHttp.responseText);
			var result = JSON.parse(XMLHttp.responseText);
			let notes = $('.notes');
			notes.empty();
			 console.log(result); // test if ajax works
			if (result.loginState !== 'no') {
				if (result.length!==0) {
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
		            <input type="text" class="form-control loginUser" id="user">
		          </div>
		          <div class="form-group">
		            <label for="pass" class="control-label">密码</label>
		             <input type="text" class="form-control loginPass" id="pass">
		          </div>
		        </form>
			`,
			footer:`
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		        <button type="button" class="btn btn-primary" onclick="login()">登陆</button>
			`
		},
		register:{
			id:'modalRegister',
			title: `注册`,
			body: `
				<form>
		          <div class="form-group">
		            <label for="user" class="control-label">账号</label>
		            <input type="text" class="form-control registerUser" id="user">
		          </div>
		          <div class="form-group">
		            <label for="pass" class="control-label">密码</label>
		            <input type="text" class="form-control registerPass1" id="pass">
		          </div>
		          <div class="form-group">
		            <label for="confirm-pass" class="control-label">确定密码</label>
		            <input type="text" class="form-control registerPass2" id="confirm-pass">
		          </div>
		        </form>
			`,
			footer:`
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		        <button type="button" class="btn btn-primary" onclick="register()">注册</button>
			`
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
		        ${myModal[id].footer}
		      </div>
		    </div>
		  </div>
		</div>
	`;
	var body = $('body');
	body.append(template);
}
var register = () => {
	var user = $('.registerUser'),
		pass1 = $('.registerPass1'),
		pass2 = $('.registerPass2'),
		pass = null;
	if(pass1.val()===pass2.val()){
		var	data = {
		user:user.val(),
		pass:pass1.val()
		};
		var postData = '';
		for (let x in data) {
			postData += x + '=' + data[x] + '&';
		};
		console.log(postData)
		myAjax.register('POST','/Note/api/user/register.php',`user=${data.user}&pass=${data.pass}&mail=`);
	}
	else {
		pass2.addClass('alert alert-warning');
	}

};
var login = () => {
	var user = $('.loginUser'),
		pass = $('.loginPass');
	var	data = {
	user:user.val(),
	pass:pass.val()
	};
	myAjax.register('POST','/Note/api/user/login.php',`user=${data.user}&pass=${data.pass}`);

};
var myAjax = {
	register: function (method,url,data) {
		let XMLHttp = new XMLHttpRequest();
		XMLHttp.open(method,url,true);
		XMLHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		XMLHttp.onreadystatechange = function () {
			if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
				console.log(XMLHttp.responseText);
				var result = JSON.parse(XMLHttp.responseText);
				console.log(result)
				if(result.registerState==='yes'||result.loginState==='yes'||result.loginState==='login...'||result.logoutState){
					location.reload();
					/* 延迟刷新
					reload = () =>  {
						location.reload();
					}
					setTimeout("reload()",100);*/
				};
			};
		};
		XMLHttp.send(data);
	}
};
var logout = function () {
	myAjax.register('POST','/Note/api/user/logout.php');
}
var noteLogin = $('.note-login');
//console.log(noteLogin.text())
if($.cookie('user')){
	noteLogin.empty();
	noteLogin.addClass('row nav nav-pills clear clear-right');
	//console.log(noteLogin)
	let user = $.cookie('user'),
		userNav = `
		Hello, ${user} <button class="btn btn-default" onclick="logout()">注销</button>
	`;
	noteLogin.append(userNav);
};
