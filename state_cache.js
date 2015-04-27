(function(window, $) {
	function StateCache (ele, options) {
        var defaults = {
            cookieName: 'words-list',            
            hoverElem: 'div',
            highlightElem: 'a',
            changeTime: '2000',
            expires: 7
        }
        this.$ele = $(ele);
        this.options = $.extend(defaults, options);
        this.init();
        this.bindListeners();
    }

    StateCache.prototype = {
        init: function() {
            var _this = this;
            var value = $.cookie(this.options.cookieName);

            if(value) {
                var arr = value.split(',');
                this.$ele.find(this.options.hoverElem).each(function() {
                    for(var i = 0; i < arr.length; i++) {
                        if($(this).data('num') == arr[i]) {
                            $(this).find(_this.options.highlightElem).addClass('viewed');
                        }
                    }
                });
            }
        },  
        bindListeners: function() {
            var _this = this;
            this.$ele.find(this.options.hoverElem).click(function () {
                $(this).find(_this.options.highlightElem).addClass('viewed');
            });

            this.$ele.find(this.options.hoverElem).each(function() {
                var timerO, timerI, longEnough = false, hoverElem = this;

                $(this).mouseenter(function() {
                    var highlightElem = $(this).find(_this.options.highlightElem);
                    if(!highlightElem.hasClass('viewed')) {   //放在事件内判断，不能放在事件外判断，否则定时器定义语句每次鼠标enter都会执行
             
                        timerO = setTimeout(function() {
                            longEnough = true;
                        }, _this.options.changeTime);
                        timerI = setInterval(function () {
                            if(longEnough) {
                                highlightElem.addClass('viewed');
                                var index = $(hoverElem).data('num');
                                var value = $.cookie(_this.options.cookieName) || '';
                                if(value) {
                                    var arr = value.split(',');
                                    arr.push(index);
                                    value = arr.join(',')
                                } else {
                                    value = index;
                                }
                                $.cookie(_this.options.cookieName, value, { expires: _this.options.expires});
                            }
                        }, 200);
                    }            
                }).mouseleave(function() {
                    clearTimeout(timerO)
                    clearInterval(timerI);                        
                });
            });

        }
    }

    $.fn.stateCache = function(options) {
        new StateCache(this, options);
        return $(this);
    }
})(window, jQuery);