// jQuery.editable.js v1.1.2
// http://shokai.github.io/jQuery.editable
// (c) 2012-2015 Sho Hashimoto <hashimoto@shokai.org>
// The MIT License

/* Liam */
var current = 0;

var finish;

(function($){
  var escape_html = function(str){
    return str.replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
  };
  var unescape_html = function(str){
    return str.replace(/&lt;/gm, '<').replace(/&gt;/gm, '>');
  };
  $.fn.editable = function(event, callback){
    console.log("current is : " + current);
    console.log("this is : " + typeof event.target);
    console.log($(current).id);
    console.log($(this).id);

    console.dir(current);
    console.dir(this);
    current = this;
    if(typeof callback !== 'function') callback = function(){};
    if(typeof event === 'string'){
      var trigger = this;
      var action = event;
      var type = 'input';
    }
    else if(typeof event === 'object'){
      var trigger = event.trigger || this;
      if(typeof trigger === 'string') trigger = $(trigger);
      var action = event.action || 'click';
      var type = event.type || 'input';
    }
    else{
      throw('Argument Error - jQuery.editable("click", function(){ ~~ })');
    }

    var target = this;
    var edit = {};
    edit.start = function(e){
      console.log("Start");
      trigger.unbind(action === 'clickhold' ? 'mousedown' : action);
      if(trigger !== target) trigger.hide();
      var old_value = (
        type === 'textarea' ?
          target.text().replace(/<br( \/)?>/gm, '\n').replace(/&gt;/gm, '>').replace(/&lt;/gm, '<') :
          target.text()
      ).replace(/^\s+/,'').replace(/\s+$/,'');

      var input = type === 'textarea' ? $('<textarea>') : $('<input>');
      input.val(old_value).
        css('width', type === 'textarea' ? '100%' : target.width()+target.height() ).
        css('font-size','100%').
        css('margin',0).attr('id','editable_'+(new Date()*1)).
        addClass('editable');
      if(type === 'textarea') input.css('height', target.height());

      console.log("finish is before : " + finish);

      finish = function(e){
        var result = input.val().replace(/^\s+/,'').replace(/\s+$/,'');
        var html = escape_html(result);
        if(type === 'textarea') html = html.replace(/[\r\n]/gm, '<br />');
        //tooltip도 html형식으로 해야 띄어지겠군.
        //아, br로 저장까진 좋은데,(finish후에 보이는게 띄어진 형태니까.)
        //그걸 다시 읽어오는 과정에서 저게 없어지네. 이럼 html로 해야하는가.?
        target.html(html);
        console.log("in finish, before callback()");
        callback({value : result, target : target, old_value : old_value});
        edit.register(); // for rebind
        if(trigger !== target) trigger.show();
      };

      console.log("finish is after : " + finish);

      input.blur(finish); // listener with handler
      
      $(window.document.body).on("click", function(event) {
          if(!($(event.target).hasClass("tooltipstered") || 
          $(event.target).parents('.tooltipster-base').length > 0)) {
            input.blur();
          }
      });
      

      if(type === 'input'){
        input.keydown(function(e){ // lisner with handler
          if(e.keyCode === 13) { // enter key
            finish()};
        });
      }
      target.html(input);
      input.focus(); // fire focus event.

    };

    edit.register = function(){

      if(action === 'clickhold'){
        var tid = null;
        trigger.bind('mousedown', function(e){
          tid = setTimeout(function(){
            edit.start(e);
          }, 500);
        });
        trigger.bind('mouseup mouseout', function(e){
          clearTimeout(tid);
        });
      }
      else{
        console.log("rebind");
        trigger.bind(action, edit.start);
      }
    };
    edit.register();

    return this;
  };
})(jQuery);