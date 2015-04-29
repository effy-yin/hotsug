(function(window, $) {
	function StateCache (wrapper, options) {
        var defaults = {
            cookieName: 'words-list',
            dataName: 'cookie',      
            hoverElem: 'div',
            highlightElem: 'a',
            changeTime: '2000',
            expires: 7
        }
        this.$wrapper = $(wrapper);
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
                this.$wrapper.find(this.options.hoverElem).each(function() {
                    for(var i = 0; i < arr.length; i++) {
                        if($(this).data(_this.options.dataName) == arr[i]) {
                            $(this).find(_this.options.highlightElem).addClass('viewed');
                        }
                    }
                });
            }
        },  
        bindListeners: function() {
            var _this = this;
            this.$wrapper.find(this.options.hoverElem).click(function () {
                $(this).find(_this.options.highlightElem).addClass('viewed');
            });

            this.$wrapper.find(this.options.hoverElem).each(function() {
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
                                var cookieValue = $(hoverElem).data(_this.options.dataName);
                                var value = $.cookie(_this.options.cookieName) || '';
                                if(value) {
                                    var arr = value.split(',');
                                    arr.push(cookieValue);
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

    window.StateCache = StateCache;

    $.fn.stateCache = function(options) {
        new StateCache(this, options);
        return $(this);
    }
    
})(window, jQuery);