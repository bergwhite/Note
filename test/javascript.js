function model (id) {
	const data = {
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
		        <button type="button" class="btn btn-primary" class="loginConfirm">登陆</button>
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
		        <button type="button" class="btn btn-primary" class="registerConfirm"">注册</button>
			`
		}
	},
	template = `
		<div class="modal fade" id="#${data[id].id}" tabindex="-1" role="dialog">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h4 class="modal-title">${data[id].title}</h4>
		      </div>
		      <div class="modal-body">
		        <form>${data[id].body}</form>
		      </div>
		      <div class="modal-footer">
		        ${data[id].footer}
		      </div>
		    </div>
		  </div>
		</div>
	`;
	let body = $('body');
	body.append(template);
};
function modal () {
	let pug = `
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="exampleModalLabel">New message</h4>
		      </div>
		      <div class="modal-body">
		        <form>
		          <div class="form-group">
		            <label for="recipient-name" class="control-label">Recipient:</label>
		            <input type="text" class="form-control" id="recipient-name">
		          </div>
		          <div class="form-group">
		            <label for="message-text" class="control-label">Message:</label>
		            <textarea class="form-control" id="message-text"></textarea>
		          </div>
		        </form>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		        <button type="button" class="btn btn-primary">Send message</button>
		      </div>
		    </div>
		  </div>
		</div>
	`;
	let body = $('body');
	body.append(pug);

}