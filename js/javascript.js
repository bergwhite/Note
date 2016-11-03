var note = {
  tme:function(){
    var t,time,year,month,day,hours,minutes,seconds,zero
    t = new Date()
    year = t.getFullYear()
    month = t.getMonth() + 1
    day = t.getDate()
    hours = t.getHours()
    minutes = t.getMinutes()
    seconds = t.getSeconds()
    zero = [month,day,hours,minutes,seconds]
    time = String(year)
    for (var i = 0; i < zero.length; i++) {
      zero[i] < 10 ? zero[i] = '0' + zero[i] : String(zero[i])
      time = time + zero[i]
    }
    return time
  },
  get:function(s){
    var k,v,d,p,t,f,e,y,o,l,tagName,tag,tagZh,sss
    tag=['td','yd','yy','bw','bk','wz','sq','zx','h5','c3','js','py','xm','zj','sf','yl']
    tagZh=['全部','阅读','英语','备忘','博客','文章','社区','总结','HTML5','CSS3','JavaScript','Python','项目','组件','算法','原理']
    d = document.getElementsByClassName('td-display')[0]
    d.innerHTML=''
    t = document.createElement('h1')
    for(var i=0;i<tag.length;i++){
      if (s==tag[i]) {
        d.innerHTML=tagZh[i]
      }
    }
    for (var i = localStorage.length-1 ; i >= 0; i--) {
      if (localStorage.key(i).match(s)) {
        k = localStorage.key(i)
        v = localStorage.getItem(k)
        p = document.createElement('pre')
        p.className = 'td-all'
        p.setAttribute('data-save',k)
        p.innerHTML = v
        d.appendChild(p)
        f = document.createElement('a')
        f.className = 'td-del'
        f.setAttribute('data-save',k)
        f.setAttribute('onclick','note.del(this)')
        f.innerHTML = '删除'
        d.appendChild(f)
        e = document.createElement('a')
        e.className = 'td-mod'
        e.setAttribute('data-save',k)
        e.setAttribute('onclick','note.mod(this)')
        e.innerHTML = '修改'
        d.appendChild(e)
        y = document.createElement('a')
        y.className = 'td-mov'
        y.setAttribute('data-save',k)
        y.setAttribute('onclick','note.mov(this)')
        y.innerHTML = '移动'
        d.appendChild(y)
      }
    }
    l = document.querySelector('.td-ctrl')
    l.value='打开'
  },
  getSearch:function(reg){
    var k,v,d,p,t,f,e,y,o,l
    note.get('zxx')
    d = document.getElementsByClassName('td-display')[0]
    for (var i = localStorage.length-1 ; i >= 0; i--) {
      k = localStorage.key(i)
      v = localStorage.getItem(k)
      if (v.match(reg)) {
        p = document.createElement('pre')
        p.className = 'td-all'
        p.setAttribute('data-save',k)
        p.innerHTML = v
        d.appendChild(p)
        f = document.createElement('a')
        f.className = 'td-del'
        f.setAttribute('data-save',k)
        f.setAttribute('onclick','note.del(this)')
        f.innerHTML = '删除'
        d.appendChild(f)
        e = document.createElement('a')
        e.className = 'td-mod'
        e.setAttribute('data-save',k)
        e.setAttribute('onclick','note.mod(this)')
        e.innerHTML = '修改'
        d.appendChild(e)
        y = document.createElement('a')
        y.className = 'td-mov'
        y.setAttribute('data-save',k)
        y.setAttribute('onclick','note.mov(this)')
        y.innerHTML = '移动'
        d.appendChild(y)
      }
    }
    l = document.querySelector('.td-ctrl')
    l.value='打开'
  },
  add:function(){
    var tag,ctx,key
    tag = document.getElementsByClassName('td-choose')[0].value
    ctx = document.getElementsByClassName('td-input')[0].value
    if (tag === '' || ctx === '') {
      alert('内容不能为空')
    }
    else {
      key = 'td_'+tag+'_'+this.tme()
      localStorage.setItem(key,ctx)
      this.get(tag)
      document.getElementsByClassName('td-input')[0].value = ''
    }
  },
  del:function (s){
    var v,a,t
    v = s.getAttribute("data-save")
    t = v[3]+v[4]
    a = prompt('Are you sure ?')
    if (a === 'sure') {
      localStorage.removeItem(v)
      this.get(t)
    }
    else {
      alert('删除失败')
    }
  },
  save:function (s) {
    var v,a,t,h,c
    v = s.getAttribute("data-save")
    a = document.querySelector('#box-dot')
    h = a.innerHTML
    localStorage.v = h
    this.get(t)
  },
  ctrl:function (v) {
    var s = document.querySelectorAll('.td-del,.td-mod,.td-mov')
    s[0].style.display==='inline' ? v.value='打开' : v.value='关闭'
    for(var i=0;i<s.length;i++){
      s[i].style.display==='' ? s[i].style.display='inline' : s[i].style.display=''
    }
  }
}

var x = localStorage.getItem('td_welcome')
if(!x){
  localStorage.setItem('td_bw_welcome','> 使用指南<br><br>+ 欢迎使用伯格笔记，你可以在左边保存笔记，或者按标签阅读笔记。<br><br>+ 删除笔记需要点击打开按钮，并且在提示框中输入sure进行确认。<br><br>+ 笔记将进行离线存储，长期有效（请勿清空浏览器）。')
  localStorage.setItem('td_bw_welcome_1','> 项目地址<br><br>+ github https://github.com/bergwhite/bergnote/tree/dev<br><br>+ GPL 3.0')
  localStorage.setItem('td_bw_welcome_2','> 开发者说<br><br>+ 项目还在开发阶段，还有很多设计不佳的地方有待改善（比如删除笔记的时候布局会错乱、分类不能自定义和响应式布局）<br><br>+ 有更好的建议欢迎提交issue')
}

var enter = function(reg) {
  if (event.keyCode == 13) {
    note.getSearch(reg)
  }
}
