var count = 0

var c = {
    searcher: function (id, url) {
        $(id).autocomplete(url, {
//      dataType:'json',
            width: 160,
            mustMatch: true,
            scroll: true,
            scrollHeight: 180,
            matchContains: true,
            formatResult: function (row, i, max) {
//            显示格式
            },
            parse: function (data) {
                return $.map(data, function (row) {
                    return {
                        data: row,
                        value: row.name,
                        result: row.name
                    }
                });
            }
        });
        $("#autocomplete").result(function (event, data, formatted) {
//        如选择后给其他控件赋值，触发别的事件等等
//        event: 事件对象. event.type为result;
//        data: 选中的数据行;
//        formatted:formatResult函数返回的值
        })
    },
    eCode: function () {
        ECode.calendar({
            inputBox: $('.date').find('input'),
            isSelect: true,
            flag: false,
            isTime: false,
            isWeek: false
        })
    },
    logic: function () {
        var that = $('#sort-by')
        var _this = $('.sort-ele')
        var opt = $('.ele-opt')
        var tips = $('.basic').find('.tip')

        function toShow(obj) {
            obj.fadeIn(200)
            that.addClass('over')
        }

        function toHide(obj) {
            obj.fadeOut(200)
            that.removeClass('over')
        }

        function tip() {
            tips.removeClass('hide')
        }

        function noTip() {
            tips.addClass('hide')
        }

        //筛选列表展示
        that.on('click', function () {
            _this.is(':hidden') ? toShow(_this) : toHide(_this)
        })

        //筛选个数检测
        opt.find('input').on('click', function () {
            //选中
            $(this).hasClass('on') ? $(this).removeClass('on') : $(this).addClass('on')
            //个数
            count = 0
            opt.find('input').each(function () {
                $(this).hasClass('on') ? count++ : console.log(0)
            })
            count > 6 ? tip() : noTip()
        })
        $('.ent-btn').find('input').click(function () {
            count > 6 ? c.popShow() : console.log('此处回调')
        })
    },

    map: function () {
        var map = $('.map-option').find('a')
        map.on('click', function () {
            $(this).addClass('on').siblings().removeClass('on')
            console.log('此处回调')
        })
    },

    popShow: function () {
        $('.pop,.cover').removeClass('hide')
    },

    popHide: function () {
        var pop = $('.pop')
        pop.find('.tit i').click(function () {
            $('.cover,.pop').addClass('hide')
        })
        pop.find('input').click(function () {
            $('.cover,.pop').addClass('hide')
        })
    },

    init: function () {
        c.logic()
        c.popHide()
        c.map()
        c.eCode()
    }
}
