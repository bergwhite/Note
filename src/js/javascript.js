(function () {

	/*
	 * ctrl   控制: 自调用的主代码
	 * check  检查: 检查用户是否登陆
	 * model  模板: 登陆注册的模拟弹窗
	 * test   测试: 
	 * 
	 * ajax   数据: 通过XHR与后端交互并且返回结果
	 * render 渲染: 对首屏数据进行渲染
	 * hint   提示: 操作时候的状态信息
	 * handle 处理: 登陆注册和修改编辑
	 */

	// ctrl   控制: 自调用的主代码

	(function () {
		render('GET','/Note/api/note/search.php');
		var loginState = check().login();

		// event listener

		// $( document ).on( events, selector, data, handler );        // jQuery 1.7+

		if (!loginState) {
			let login = $('#login'),
				loginId = login.attr('id'),
				loginTarget = login.attr('data-target').replace('#',''),
				register = $('#register'),
				registerId = register.attr('id'),
				registerTarget = register.attr('data-target').replace('#','');

			// login botton
			login.click(function() {
				model(loginId,loginTarget);
			});

			// login confirm (动态生成的class直接使用.click不能监听到)

			$(document).on('click','.loginConfirm',function() {
				handle().login();
			})

			// register botton
			register.click(function() {
				model(registerId,registerTarget);
			});

			// register confirm
			$(document).on('click','.registerConfirm',function() {
				handle().register();
			});
		}
		else {
			let edit = $('.ctrl-edit'),
				del = $('.ctrl-del');

			// logout confirm
			$(document).on('click','.logout',function() {
				handle().logout();
				console.log('this')
			});

			$(document).on('click','.ctrl-edit',function() {
				handle($(this)).edit();
			});

			$(document).on('click','.ctrl-del',function() {
				handle($(this)).del();
			});
		}
		
	})();

	// check  检查: 

	function check (state) {
		function login () {
			var noteLogin = $('.note-login');
			//console.log(noteLogin.text())
			if($.cookie('user')){
				noteLogin.empty();
				noteLogin.addClass('row nav nav-pills clear clear-right');
				//console.log(noteLogin)
				let user = $.cookie('user'),
					userNav = `
						<li class="btn btn-default logout">注销</li> 
						<li class="btn btn-primary">${user}</li>
					`;
				noteLogin.append(userNav);
				return true;
			};
			return false;
		};
		return {
			login: login,
		}
	};

	// model  模板: 登陆注册的模拟弹窗 BUG: 添加成功但是不显示模拟弹窗

	function model (type,typeId) {
		let myModal = $('.modal'),
			modalTitle = $('.modal-title'),
			modalBody = $('.modal-body'),
			modalFooter = $('.modal-footer');
		myModal.attr('id',typeId);
		modalTitle.empty();
		modalBody.empty();
		modalFooter.empty();
		const data = {
			login:{
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
			        <button type="button" class="btn btn-primary loginConfirm">登陆</button>
				`
			},
			register:{
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
			        <button type="button" class="btn btn-primary registerConfirm">注册</button>
				`
			}
		};
		modalTitle.append(data[type].title);
		modalBody.append(data[type].body);
		modalFooter.append(data[type].footer);
	};

	// ajax   数据: 通过XHR与后端交互并且返回结果

	function ajax (method,url,data) {
		let XMLHttp = new XMLHttpRequest();
		XMLHttp.open(method,url,true);
		XMLHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		XMLHttp.onreadystatechange = function () {
			if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
				console.log(XMLHttp.responseText);
				var result = JSON.parse(XMLHttp.responseText);
				console.log(result)
				if(result.registerState==='yes'||result.loginState==='yes'||result.loginState==='login...'||result.logoutState||result.deleteState==='yes'){
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
	};

	// render 渲染: 对首屏数据进行渲染

	function render (method,url,data) {
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
										<p class="text-center note-title-content">${title}</p>
										<div class="note-control">
											<span class="glyphicon glyphicon-pencil ctrl-edit"></span>
											<span class="glyphicon glyphicon-trash ctrl-del"></span>
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

	// handle 处理: 登陆注册和修改编辑

	function handle (val)  {
		if (val!==undefined) {
			var val = val.parent().parent().parent();
			var id = val.attr('id');
			console.log(val);
			console.log(id);
		}
		function register () {
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
				ajax('POST','/Note/api/user/register.php',`user=${data.user}&pass=${data.pass}&mail=`);
			}
			else {
				pass2.addClass('alert alert-warning');
			}

		};
		function login () {
			var user = $('.loginUser'),
				pass = $('.loginPass');
			var	data = {
			user:user.val(),
			pass:pass.val()
			};
			ajax('POST','/Note/api/user/login.php',`user=${data.user}&pass=${data.pass}`);

		};
		function edit () {
			let title = val.find('.note-title-content');
			let content = val.find('.note-content');
			title.attr('contenteditable','true');
			title.focus();
			content.attr('contenteditable','true');
			console.log('title');
			console.log('content');
			val.mouseleave(function(event) {
				$('body').click(function() {
					title.attr('contenteditable','false');
					content.attr('contenteditable','false');
					// BUG: 偶尔误触span会导致多次执行
					// alert('great');
					const titleVal = title.text();
					const contentVal = content.text();
					console.log(titleVal);
					console.log(contentVal);
					ajax('POST','/Note/api/note/modify.php',`noteId=${id}&title=${titleVal}&content=${contentVal}`);
					val.unbind('');
					$('body').unbind('');
					// 阻止冒泡
					// return false;
				});
			});

			// val.blur(alert('save'));
			// ajax('POST','/Note/api/note/delete.php',`noteId=${id}`);
		};
		function del () {
			ajax('POST','/Note/api/note/delete.php',`noteId=${id}`);
		};
		function logout () {
			ajax('POST','/Note/api/user/logout.php');
		};
		return {
			register:register,
			login:login,
			edit:edit,
			del:del,
			logout:logout
		};
	};

})()
