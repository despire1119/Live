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
    eCode: function (id) {
        var selector = $(id).find('.date')
        ECode.calendar({
            inputBox: selector.find('input'),
            isSelect: true,
            flag: false,
            isTime: false,
            isWeek: false
        })
    },
    logic: function (type) {
        var that = $('#sort-by')
        var _this = $('.sort-ele')
        var opt = $('.ele-opt')
        var tips = $('.basic').find('.tip')

        function toShow(obj) {
            obj.removeClass('hide')
            that.addClass('over')
        }

        function toHide(obj) {
            obj.addClass('hide')
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
                $(this).hasClass('on') ? count++ : null
            })
            count > type ? tip() : noTip()
        })
        $('.ent-btn').find('input').click(function () {
            count > type ? c.popShow() : null
        })
    },

    map: function () {
        var map = $('.map-option').find('a')
        map.on('click', function () {
            $(this).addClass('on').siblings().removeClass('on')
            //console.log('此处回调')
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
    compare: function () {
        var count = 0
        $('.controller').find('.add').on('click', function () {
            $('.controller').find('tr:hidden').removeClass('hide')
            doRefector()
        })
        $('.controller').find('.remove').on('click', function () {
            $(this).parent().parent().addClass('hide').find('input').attr('value', '')
            doRefector()
        })

        function status1() {
            //删除
            $('.controller').find('.add').addClass('hide')
            $('.controller').find('.remove').removeClass('hide')
        }

        function status2() {
            //添加
            var rst = $('.controller').find('tr:visible').eq(1)
            $('.controller').find('.remove').addClass('hide')
            $('.controller').find('.add').removeClass('hide')
            rst.find('.add').addClass('hide')
        }

        //当前状态
        function doRefector() {
            count = 0
            count = $('.controller').find('tr:visible').length
            count > 3 ? status1() : status2()
        }

        doRefector()
    },
    select: function () {
        function allHide() {
            $('.select').addClass('hide')
        }

        function h(_this, inp) {
            _this.addClass('hide')
        }

        function s(_this, inp) {
            _this.removeClass('hide')
        }

        function doit(obj,i) {
            $(obj).is(i) ? null : allHide()
        }

        $('.controller').find('i').on('click', function () {
            var select = $(this).parent().siblings('.select')
            var inp = $(this).siblings('input')
            allHide()
            select.is(':hidden') ? s(select, inp) : h(select, inp)
        })

        $('.select').find('a').on('click', function () {
            var txt = $(this).text()
            var _select = $(this).parent()
            _select.addClass('hide').siblings('p').find('input').attr('value', txt)
        })

        $(document).click(function () {
            e = window.event || e;
            var obj = e.srcElement || e.target;
            var target = $('.select').find('a')
            var i = $('.controller').find('i')
            if ($('.select').is(':visible')) {
                $(obj).is(target) ? null : doit(obj,i)
            }

        })
    },

    init: function () {
        c.select()
        c.popHide()
        c.map()
        c.eCode('#line-1')
        c.eCode('#line-2')
        c.eCode('#line-3')
        c.compare()
    }
}