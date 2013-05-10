var myScroll, theList, count = 0, is = [], icount = 0 +document.getElementsByTagName('html')[0].getAttribute('n');

if(!icount)
  icount = 0;

function _ob(id){return document.getElementById(id)}

var list = 'lambda-calculus,turing-machine,plankalkul,machine-code,assembly,fortran,flow-matic,apl,algol,lisp,simula,pl-i,basic,c,pascal,smalltalk,prolog,ml,ada,sql,cpp,objective-c,perl,python,ruby,lua,php,java,javascript,c-sharp'.split(',');

function loaded() {
	myScroll = new iScroll('wrapper', {
		snap: true,
		momentum: false,
		hScrollbar: false,
		onScrollEnd: function () {
			document.querySelector('#indicator > li.active').className = '';
			document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';

      if( count < list.length && !is[count]) {
        get("computer/"+list[count]+".html");
      }

      /*/
      if(is[this.currPageX-1])
        is[this.currPageX-1].scrollTo(0, 0);
      if(is[this.currPageX+1])
        is[this.currPageX+1].scrollTo(0, 0);
      //*/
		}
	 });

  theList = _ob("thelist");

  get("computer/"+list[0]+".html");

  for(var k=1; k<list.length; k++) {
    var li = document.createElement('li');
    li.innerHTML = k +1;
    li.title = list[k]=='pl-i'?'PL/I':(list[k]=='cpp'?'C++':list[k].toUpperCase());
    _ob('indicator').appendChild(li);
    li = null;
  }

  _ob("prev").onclick = function(){
    myScroll.scrollToPage('prev', 0);
  };
  _ob("next").onclick = function(){
    myScroll.scrollToPage('next', 0);
  };

  window.onresize = function() {
    var p = document.getElementsByClassName('profile');
    for(var k=0;k<p.length;k++) {
      p[k].style.height = (window.innerHeight - 110) +'px';
    }
  };
  window.onresize();
}

document.addEventListener('DOMContentLoaded', loaded, false);

var nextfn;
function handler() {
  if(this.readyState == this.DONE) {
    if(this.status == 200 &&
       this.responseText != null) {
      var dli = document.createElement("li");
      dli.innerHTML = this.responseText.replace(/ src=\"\.\/\.\.\/\.\.\//g, ' src=\"').replace(/ src=\".\//g, " src=\"profiles/computer/");
      var id = 'who-' + count, po = dli.getElementsByClassName('profile')[0];
      po.id = id;
      po.style.height = (window.innerHeight - 110) +'px';;
      po = null;
      thelist.appendChild(dli);
      list[count] = '';

      setTimeout(function(){
        is[count] = new iScroll(id);
        count += 1;
        _ob('scroller').style.width = 600*count +'px';
        myScroll.refresh();
        if(list[count]) {
          if( count < icount +2 ) {
            get("computer/"+list[count]+".html");
          }
        }
        nextfn && nextfn();
      }, 200);
      dli = null;
      return;
    }
  }
}


function get(profile, fn) {
  var client = new XMLHttpRequest();
  nextfn = fn;
  client.onreadystatechange = handler;
  client.open("GET", "profiles/" + profile);
  client.send();
}