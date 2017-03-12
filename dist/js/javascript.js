'use strict';

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

    var loginState = check().login();

    // event listener

    // $( document ).on( events, selector, data, handler );        // jQuery 1.7+

    if (!loginState) {
      var login = $('#login'),
          loginId = login.attr('id'),
          loginTarget = login.attr('data-target').replace('#', ''),
          register = $('#register'),
          registerId = register.attr('id'),
          registerTarget = register.attr('data-target').replace('#', '');

      // login botton
      login.click(function () {
        model(loginId, loginTarget);
      });
      // login confirm (动态生成的class直接使用.click不能监听到)
      $(document).on('click', '.loginConfirm', function () {
        handle().login();window.event.cancelBubble = true;
      });
      // register botton
      register.click(function () {
        return model(registerId, registerTarget);
      });
      // register confirm
      $(document).on('click', '.registerConfirm', function () {
        return handle().register();
      });
    } else {
      render('GET', '/Note/api/note/search.php');
      var edit = $('.ctrl-edit'),
          del = $('.ctrl-del');
      var add = $('.ctrl-add');
      var addId = add.attr('id'),
          addTarget = add.attr('data-target');
      var logout = $('.logout');
      // add botton
      add.click(function () {
        return model(addId, addTarget);
      });
      // add confirm (动态生成的class直接使用.click不能监听到)
      $(document).on('click', '.addConfirm', function () {
        return handle().add();
      });
      // logout confirm
      logout.click(function () {
        return handle().logout();
      });
      $(document).on('click', '.ctrl-edit', function () {
        handle($(this)).edit();
      });
      $(document).on('click', '.ctrl-del', function () {
        handle($(this)).del();
      });
    }
  })();

  // check  检查: 

  function check(state) {
    function login() {
      var login = $('.note-login'),
          logined = $('.note-logined');
      if ($.cookie('user')) {
        var userCookie = $.cookie('user'),
            userName = $('.user-name');
        login.hide();
        userName.text(userCookie);
        logined.show();
        return true;
      } else {
        logined.hide();
        login.show();
      };
      return false;
    };
    return {
      login: login
    };
  };

  // model  模板: 登陆注册的模拟弹窗 BUG: 添加成功但是不显示模拟弹窗

  function model(type, typeId) {
    var myModal = $('.modal'),
        modalTitle = $('.modal-title'),
        modalBody = $('.modal-body'),
        modalFooter = $('.modal-footer');
    myModal.attr('id', typeId.replace('#', ''));
    modalTitle.empty();
    modalBody.empty();
    modalFooter.empty();
    var data = {
      login: {
        title: '\u767B\u9646',
        body: '\n          <form>\n                <div class="form-group">\n                  <label for="user" class="control-label">\u8D26\u53F7</label>\n                  <input type="text" class="form-control loginUser" id="user">\n                </div>\n                <div class="form-group">\n                  <label for="pass" class="control-label">\u5BC6\u7801</label>\n                   <input type="password" class="form-control loginPass" id="pass">\n                </div>\n              </form>\n        ',
        footer: '\n          <button type="button" class="btn btn-default" data-dismiss="modal">\u53D6\u6D88</button>\n              <button type="button" class="btn btn-primary loginConfirm">\u767B\u9646</button>\n        '
      },
      register: {
        title: '\u6CE8\u518C',
        body: '\n          <form>\n                <div class="form-group">\n                  <label for="user" class="control-label">\u8D26\u53F7</label>\n                  <input type="text" class="form-control registerUser" id="user">\n                </div>\n                <div class="form-group">\n                  <label for="pass" class="control-label">\u5BC6\u7801</label>\n                  <input type="password" class="form-control registerPass1" id="pass">\n                </div>\n                <div class="form-group">\n                  <label for="confirm-pass" class="control-label">\u786E\u5B9A\u5BC6\u7801</label>\n                  <input type="password" class="form-control registerPass2" id="confirm-pass">\n                </div>\n              </form>\n        ',
        footer: '\n          <button type="button" class="btn btn-default" data-dismiss="modal">\u53D6\u6D88</button>\n              <button type="button" class="btn btn-primary registerConfirm">\u6CE8\u518C</button>\n        '
      },
      add: {
        title: '\u6DFB\u52A0',
        body: '\n          <form>\n            <div class="form-group">\n              <label for="title" class="control-label">\u6807\u9898</label>\n              <input type="text" class="form-control addTitle" id="title">\n            </div>\n            <div class="form-group">\n              <label for="content" class="control-label">\u5185\u5BB9</label>\n              <textarea  class="form-control addContent" id="content"></textarea>\n            </div>\n            <div class="form-group">\n              <label for="tag" class="control-label">\u6807\u7B7E</label>\n              <input type="text" class="form-control addTag" id="tag">\n            </div>\n          </form>\n        ',
        footer: '\n          <button type="button" class="btn btn-default" data-dismiss="modal">\u53D6\u6D88</button>\n              <button type="button" class="btn btn-primary addConfirm">\u6DFB\u52A0</button>\n        '
      }
    };
    modalTitle.append(data[type].title);
    modalBody.append(data[type].body);
    modalFooter.append(data[type].footer);
    // modalBody.find('input').eq(0),focus();
    // not work
  };

  // ajax   数据: 通过XHR与后端交互并且返回结果

  function ajax(method, url, data) {
    var XMLHttp = new XMLHttpRequest();
    XMLHttp.open(method, url, true);
    XMLHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XMLHttp.onreadystatechange = function () {
      if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
        console.log(XMLHttp.responseText);
        var result = JSON.parse(XMLHttp.responseText);
        console.log(result);
        if (result.registerState === 'yes' || result.loginState === 'yes' || result.loginState === 'login...' || result.logoutState || result.deleteState === 'yes' || result.addState === 'yes') {
          location.reload();
        };
      };
    };
    XMLHttp.send(data);
  };

  // render 渲染: 对首屏数据进行渲染

  function render(method, url, data) {
    var XMLHttp = new XMLHttpRequest();
    XMLHttp.onreadystatechange = function () {
      if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
        console.log(XMLHttp.responseText);
        var result = JSON.parse(XMLHttp.responseText);
        var notes = $('.notes');
        notes.empty();
        console.log(result); // test if ajax works
        // TODO: 此处代码有待优化
        if (result.loginState !== 'no') {
          if (result.length !== 0) {
            for (var x in result) {
              var id = result[x].id,
                  title = result[x].title,
                  content = result[x].content,
                  template = '\n                <div class="row note" id="' + id + '">\n                  <div class="note-title">\n                    <p class="text-center note-title-content">' + title + '</p>\n                    <div class="note-control">\n                      <span class="glyphicon glyphicon-pencil ctrl-edit"></span>\n                      <span class="glyphicon glyphicon-trash ctrl-del"></span>\n                    </div>\n                  </div>\n                  <div class="note-content">' + content + '</div>\n                </div>\n              ';
              notes.append(template);
            };
          } else {
            var _template = '<p class="note text-center">没有发现笔记哦，试着去添加一条笔记吧 ^_^</p>';
            notes.append(_template);
          }
        } else {
          var _template2 = '<p class="note text-center">没有发现笔记哦，请登陆 ^_^</p>';
          notes.append(_template2);
        }
        ;
      };
    };
    XMLHttp.open(method, url, true);
    XMLHttp.send();
  };

  // handle 处理: 登陆注册和修改编辑

  function handle(val) {
    if (val !== undefined) {
      var val = val.parent().parent().parent();
      var id = val.attr('id');
      console.log(val);
      console.log(id);
    }
    function register() {
      var user = $('.registerUser'),
          pass1 = $('.registerPass1'),
          pass2 = $('.registerPass2'),
          pass = null;
      if (pass1.val() === pass2.val()) {
        var data = {
          user: user.val(),
          pass: pass1.val()
        };
        var postData = '';
        for (var x in data) {
          postData += x + '=' + data[x] + '&';
        };
        console.log(postData);
        ajax('POST', '/Note/api/user/register.php', 'user=' + data.user + '&pass=' + data.pass + '&mail=');
      } else {
        pass2.addClass('alert alert-warning');
      }
    };
    function login() {
      var user = $('.loginUser'),
          pass = $('.loginPass');
      var data = {
        user: user.val(),
        pass: pass.val()
      };
      // Debug: handle/login
      console.log('user:' + data.user);
      console.log('pass:' + data.pass);
      ajax('POST', '/Note/api/user/login.php', 'user=' + data.user + '&pass=' + data.pass);
    };
    function edit() {
      var title = val.find('.note-title-content');
      var content = val.find('.note-content');
      title.attr('contenteditable', 'true');
      title.focus();
      content.attr('contenteditable', 'true');
      console.log('title');
      console.log('content');
      val.mouseleave(function (event) {
        $('body').click(function () {
          title.attr('contenteditable', 'false');
          content.attr('contenteditable', 'false');
          // BUG: 偶尔误触span会导致多次执行
          // alert('great');
          var titleVal = title.text();
          var contentVal = content.text();
          console.log(titleVal);
          console.log(contentVal);
          ajax('POST', '/Note/api/note/modify.php', 'noteId=' + id + '&title=' + titleVal + '&content=' + contentVal);
          val.unbind('');
          $('body').unbind('');
        });
      });
    };

    function add() {
      var title = $('.addTitle'),
          content = $('.addContent'),
          tag = $('.addTag'),
          date = new Date(),
          dateTime = date.getTime();

      var data = {
        title: title.val(),
        content: content.val(),
        tag: tag.val(),
        date: '2017-03-11'
      };
      ajax('POST', '/Note/api/note/add.php', 'title=' + data.title + '&content=' + data.content + '&tag=' + data.tag + '&date=' + data.date);
    };
    function del() {
      ajax('POST', '/Note/api/note/delete.php', 'noteId=' + id);
    };
    function logout() {
      ajax('POST', '/Note/api/user/logout.php');
    };
    return {
      register: register,
      login: login,
      add: add,
      edit: edit,
      del: del,
      logout: logout
    };
  };
})();