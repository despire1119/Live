var crm = crm || {};
var expand = false;
crm = {
    //首页-最新动态hover
    tagHover: function () {
        $('.list-item').hover(function () {
            $(this).stop().animate({
                'top': '-5px',
                'left': '0'
            }, 500)
        }, function () {
            $(this).stop().animate({
                'top': '0',
                'left': '0'
            }, 500)
        })
    },
    //标签页-标签tab
    labelTab: function () {
        var tabItemTitle = $('.label-tab-title-item'),
            tabItemContent = $('.label-tab-content');

        tabItemTitle.eq(0).addClass('current');
        tabItemContent.eq(0).css({
            'display': 'block',
            'opacity': '1',
            'top': '0'
        });

        tabItemTitle.each(function (i) {
            tabItemTitle.eq(i).bind({
                click: function () {
                    tabItemTitle.eq(i).addClass('current').siblings().removeClass('current');
                    tabItemContent.each(function () {
                        $(this).css({
                            'display': 'none',
                            'opacity': '0',
                            'top': '10px'
                        });
                    });
                    var target = undefined;
                    if (tabItemContent.size() == 1) {
                        target = tabItemContent;
                    } else {
                        target = tabItemContent.eq(i);
                    }
                    target.stop().animate({
                        'opacity': '1',
                        'top': '0'
                    }, 400).css('display', 'block');
                }
            });
        })
    },
    //tab-tab
    tabTab: function () {
        var tabItemTitle = $('.listitem'),
            tabItemContent = $('.label-tab-content');

        tabItemTitle.eq(0).addClass('current');
        tabItemContent.eq(0).css({
            'display': 'block',
            'opacity': '1',
            'top': '0'
        });

        tabItemTitle.each(function (i) {
            tabItemTitle.eq(i).bind({
                click: function () {
                    tabItemTitle.eq(i).addClass('current').siblings().removeClass('current');
                    tabItemContent.css({
                        'display': 'none',
                        'opacity': '0',
                        'top': '10px'
                    });
                    var target = undefined;
                    if (tabItemContent.size() == 1) {
                        target = tabItemContent;
                    } else {
                        target = tabItemContent.eq(i);
                    }
                    target.stop().animate({
                        'opacity': '1',
                        'top': '0'
                    }, 400).css('display', 'block');
                }
            });
        })
    },
    //标签页-分类hover
    classifyHover: function () {
        $('.description-tag-item').hover(function () {
            $(this).find('.description-tag-item-second').stop().animate({
                'opacity': '1',
                'top': '26px'
            }, 300).css('display', 'block')
        }, function () {
            $(this).find('.description-tag-item-second').stop().animate({
                'opacity': '0',
                'top': '21px'
            }, 300, function () {
                $(this).css('display', 'none');
            })
        })
    },
    //人群页-新建营销人群hover
    throngNewHover: function () {
        $('.throng-new').hover(function () {
            $(this).find('.throng-new-second').stop().animate({
                'opacity': '1',
                'top': '52px'
            }, 300).css('display', 'block')
        }, function () {
            $(this).find('.throng-new-second').stop().animate({
                'opacity': '0',
                'top': '47px'
            }, 300, function () {
                $(this).css('display', 'none');
            })
        })
    },

    //弹框zhuxm
    dialogOpt: function () {

        //选中品类
        var sortItem = $(".selected-items .item");
        sortItem.hover(function () {
            var _this = $(this),
                btnCancle = _this.find(".cancle-selected");
            _this.addClass("hover").siblings().removeClass("hover");
            btnCancle.show();
        }, function () {
            var _this = $(this),
                parent = _this.parent(),
                btnCancle = parent.find(".cancle-selected");
            _this.removeClass("hover");
            btnCancle.hide();
        }).live("click", function () {
            var _this = $(this);
            _this.remove();
        });


        // $(".sort-list li").live("click",function(){
        // 	var _this = $(this);
        // 	_this.addClass("selected")
        // });

        // 取消
        $(".crm-dialog .btn-cancle").live("click", function () {
            $(".ui-me-close", parent.document).click();
        });

        //获取日历
        $(".crm-dialog .time-default").focus(function () {
            var _this = $(this);
            _this.addClass("hover");
            // var h = $(".crm-dialog").height(),
            // 	w = $(".crm-dialog").width();
            // if (!expand) {
            // 	$(".ui-me-content", parent.document).css({
            // 		"height": (h + 144) + 'px',
            // 		"background": '#FFF'
            // 	});
            // 	$(".crm-dialog").css("height", (h + 144) + 'px');
            // 	expand = true;
            // }
            //日历
            ECode.calendar({
                inputBox: this,
                isSelect: true,
                flag: true,
                isWeek: false,
                callback: function () {
                    // $(".ui-me-content", parent.document).css({
                    // 	"height": h + 'px',
                    // 	"background": '#FFF'
                    // });
                    // $(".crm-dialog").css("height", h + 'px');
                    // expand = false;
                    _this.parent().find("i[rel='placeholder']").css({
                        'display': 'none'
                    })
                }
            });
        }).blur(function () {
            var _this = $(this);
            _this.removeClass("hover");
        });
    }
}

var JPlaceHolder = {
    _check: function () {
        return 'placeholder' in document.createElement('input');
    },
    init: function () {
        if (!this._check()) {
            this.fix();
        }
    },
    fix: function () {
        jQuery(':input[placeholder]').each(function (index, element) {
            var self = $(this),
                txt = self.attr('placeholder');
            self.next("[rel='placeholder']").remove();
            self.wrap($('<span></span>').css({
                position: 'relative',
                display: 'inline-block',
                padding: 0,
                zoom: '1',
                border: 'none',
                background: 'none',
                margin: 0
            }));

            var pos = self.position(),
                h = self.outerHeight(true),
                paddingleft = self.css('padding-left');

            var holder = $('<i rel="placeholder"></i>').text(txt).css({
                position: 'absolute',
                whiteSpace: 'nowrap',
                left: 0,
                top: 0,
                height: '30px',
                lineHeight: '30px',
                paddingLeft: paddingleft,
                color: '#aaa'
            }).appendTo(self.parent());
            if (self.is(".textarea")) {
                self.parent().css({
                    display: 'block'
                });
                holder.css({
                    height: '30px',
                    lineHeight: '30px'
                });
            }
            if (self.val() != '') {
                holder.hide();
            }
            self.focusin(function (e) {
                holder.hide();
            }).focusout(function (e) {
                if (!self.val()) {
                    holder.show();
                }
            });
            holder.click(function (e) {
                holder.hide();
                self.focus();
                setTimeout(function () {
                    self.trigger('click');
                }, 20)
            });
        });
    }
};

var JTimeBox = {
    init: function () {
        this.fix();
    },
    fix: function () {
        jQuery(':input.timebox').each(function (index, element) {
            var self = $(this);
            if (!self.parent().is('span')) {
                self.wrap($('<span></span>').css({
                    position: 'relative',
                    display: 'inline-block',
                    padding: 0,
                    zoom: '1',
                    border: 'none',
                    background: 'none',
                    margin: 0
                }));
            }
            self.parent('span').append("<i class='timeicon'></i>");
        });
    }
};

var getInputLength = {
    init: function () {
        var totalNum, curNum;
        if (typeof($('.textbox').attr('maxlength')) !== 'undefined') {
            curNum = $('.form-dd').find('.textbox').val().length;
            totalNum = $('.form-dd').find('.textbox').attr('maxlength');
            $('.form-dd').find('.input-value-length').html(curNum + '/' + totalNum);
            $('.form-dd').each(function (index, element) {
                $(this).find('.textbox').keyup(function () {
                    var curNum = $(this).val().length;
                    $(this).parent().find('.input-value-length').html(curNum + '/' + totalNum);
                });
            });
        }
        ;
    }
};

//push-step2计算消息内容+页面ID长度
var calcLength = {
    init: function () {
        if ($('#mesContent').size() > 0 && $('#mesID').size() > 0) {
            var length1 = $('#mesContent').find('.textbox').val().length;
            $('#mesContent').find('.input-value-length').html(length1 + '字符');

            $('#mesContent').find('.textbox').keyup(function () {
                var length2 = $('#mesContent').find('.textbox').val().length;
                $('.form-dd').find('.input-value-length').html(length2 + '字符');
            });

            $('#mesID').find('.textbox').keyup(function () {
                var length3 = $('#mesContent').find('.textbox').val().length;
                var length4 = $('#mesID').find('.textbox').val().length;
                if ((length3 + length4) > 131) {
                    $('#mesID').find('.warning').html('消息内容+页面ID超过131字');
                }
                ;
            });
        }
        ;

    }
};

//短信内容preview
var smsPreview = {
    init: function (initText, resType) {
        $('.sms-filed-preview').html('');
        var resContent = (resType == '05') ? '券号：XXXXXXXXXXXXXX，密码：XXXXXX' : '';
        smsPreview.output(initText, resContent);
        var initVal, finalVal;
        $('.sms-filed-editable').keyup(function () {
            initVal = $('.sms-filed-editable').val();
            $('.sms-filed-preview').html('');
            smsPreview.output(initVal, resContent);
        });
    },
    output: function (initVal, resContent) {
        finalVal = '【苏宁】' + initVal + resContent + '回复TD退订';
        var numList, valLength, step;
        step = 63;//短信字符长度
        valLength = finalVal.length;//短信字符长度
        numList = Math.ceil(valLength / step);//短信需要分多少条

        for (var i = 0; i < numList; i++) {
            var elementMes = document.createElement('div');
            elementMes.className = 'sms-message-list';
            var elementMesCotent = finalVal.substr(step * i, step);
            elementMes.innerHTML = elementMesCotent;
            $('.sms-filed-preview').append(elementMes);
        }
        ;
    }
};

//模型
var modal = {
    init: function () {
        var mWrap = $('.modal-select-wrap'),
            mDo = $('.modal-do');

        mDo.click(function () {
            if (mWrap.css('display') == 'block' && mDo.hasClass('done')) {
                mWrap.css('display', 'none');
                mDo.removeClass('done');
                mDo.find('span').html('添加标签');
            } else {
                mWrap.css('display', 'block');
                mDo.addClass('done');
                mDo.find('span').html('收起');
            }

        });
    }
};

//选择品类
var vriItem = {
    pushSelItem: function () {
        var parant_htm = $(parent.window.document.getElementById('brandCatSelect')),
        //var parant_htm = $(parent.window.document.getElementById('itm-selected')),
            parant_ch = $(parent.window.document.getElementById('btnChooseBrandCat'));
        //parant_ch = $(parent.window.document.getElementById('sel-config'));

        function noItm() {
            parant_htm.hide()
            parant_ch.show()
        }

        function hasItm() {
            parant_htm.show()
            parant_ch.hide()
        }

        $('#itm-config').on('click', function () {
            var conf = '',
                htm = parant_htm.find('#brandCatSelected')
            //htm = parant_htm.find('em')
            $('.itm-area').find('.itm-in').each(function () {
                var that = $(this);
                that.is(':checked') ? conf += that.val() + '、' : console.log(-1)
            });
            conf = conf.substring(0, conf.length - 1);
            htm.html(conf)
            htm.html() == '' ? noItm() : hasItm()
        }).live('click', function () {
            $(".ui-me-close", parent.document).click();
        })
    },
    logic: function () {
        $('.select-text-style').change(function () {
            var check = $(this).children('option:selected').val();
            check == '品类营销' ? $('#sel-config').show() : $('#sel-config').hide()
            //check == '品牌营销' ? $('#sel-config').show():
        });
        $('input[name=items]').on('change', function () {
            $('#sel').is(':checked') ? $('.itm-area').find('input').removeAttr('disabled') : $('.itm-area').find('input').attr('disabled', 'true')
        })
        $('.itm-area').on('change', function () {
            var count = 0
            $(this).find('span').each(function () {
                $(this).find('input').is(':checked') ? count++ : console.log('-1')
                console.log(count)
            })
            //count > 6 ? $('.itm-area').find('input').is(':checked') ? console.log('已选') : $(this).attr('disabled', 'true') : console.log(0)
            if(count>5){
                $('.itm-area').find('input').each(function () {
                    $(this).is(':checked')?console.log('已选') : $(this).attr('disabled', 'true')
                })
            }else{
                //$('.itm-area').find('input').each(function () {
                //    $(this).attr('disabled','false')
                //})
                $('.itm-area').find('input').removeAttr('disabled')
            }
        })
    },
    init: function () {
        vriItem.logic()
        vriItem.pushSelItem()
    }
}


$(function () {
    crm.tagHover();
    crm.labelTab();
    crm.tabTab();
    crm.classifyHover();
    crm.throngNewHover();
    crm.dialogOpt();
    JPlaceHolder.init();
    JTimeBox.init();
    getInputLength.init();
    calcLength.init();
    vriItem.init();

    modal.init();

    //smsPreview.init('');
    //弹出层短信预览
    // smsPreview.init('后台数据文本');
    if (!(typeof(ECode) == "undefined")) {
        $('.timebox').each(function () {
            _this = $(this);
            _this.addClass("hover");
//			if(!_this.attr("id")){
//				_this.attr("id","time_"+new Date())
//			}

            //计算今天后的三个月
            var now = new Date(),
                year = now.getFullYear(),
                month = now.getMonth(),
                day = now.getDate();

            if (month + 3 > 12) {
                month = (month + 3) % 12;
                year = year + 1
            } else {
                month = (month + 3);
            }
            //日历
            ECode.calendar({
                inputBox: _this,
                isSelect: true,
                flag: true,
                isWeek: false,
                range: {
                    mindate: new Date(),
                    maxdate: new Date(year, month, day)
                }, //限制可选日期
                callback: function () {
                    _this.parent().find("i[rel='placeholder']").css({
                        'display': 'none'
                    })
                }
            });
        });
    }

    $('.interest').each(function (index, element) {
        $(this).find('.interestHit input').click(function () {
            $('.interest').eq(index).find('.interestContent').show();
        });
    });

    $('.time-sel, .timebox').attr('readOnly', 'true');

    //input file截取文件名
    if ($('#fileField')[0]) {
        $('#fileField').live('change', function () {
            var originValue, splitArr, splitValue;
            originValue = document.getElementById('fileField').value;
            splitArr = originValue.split("\\");
            splitValue = splitArr[splitArr.length - 1];
            document.getElementById('textfield').value = splitValue;
            $('#file-input i').css('display', 'none');
        })
    }

    $('.link-screen').toggle(function () {
        $(this).find('.down').stop().animate({
            backgroundPositionX: '-136px',
            backgroundPositionY: '-31px'
        }, 400);
        $(this).parent().parent().find('.more-screen').stop(true, true).show(400);
    }, function () {
        $(this).find('.down').stop().animate({
            backgroundPositionX: '-136px',
            backgroundPositionY: '-38px'
        }, 400);
        $(this).parent().parent().find('.more-screen').stop(true, true).hide(400);
    });

    //营销渠道checked选项内的input给操作
    $('.ditch-list').find('input:gt(0)').attr('disabled', true);
    $('input[name=ditch]').each(function (index, element) {
        if ($('input[name=ditch]').eq(index).attr('checked') == 'checked') {
            $(this).parent().parent().find('input:gt(0)').attr('disabled', false);
        }
    });
    $('input[name=ditch]').click(function () {
        $('input[name=ditch]').each(function (index, element) {
            if ($(this).attr('checked') == 'checked') {
                $(this).parent().parent().find('input:gt(0)').attr('disabled', false);
            } else {
                $(this).parent().parent().find('input:gt(0)').attr('disabled', true);
            }
            ;
        });
    })

    //select的val为消息中心时显示文本框
    $('select[name=pageType]').change(function () {
        if ($('select[name=pageType]').val() == '消息中心') {
            $('#dl-picLink').animate({
                height: '32px',
                opacity: '1'
            }, 200).css({
                display: 'block'
            });
        } else {
            $('#dl-picLink').animate({
                height: '0px',
                opacity: '0'
            }, 200, function () {
                $(this).css({
                    display: 'none'
                });
            });
        }
        ;
    });

    $('input[name=yesOrNo]').change(function () {
        if ($('input[name=yesOrNo]:checked').val() == '是') {
            $('#dl-customerID').animate({
                height: '32px',
                opacity: '1'
            }, 200).css({
                display: 'block'
            });
        } else {
            $('#dl-customerID').animate({
                height: '0px',
                opacity: '0'
            }, 200, function () {
                $(this).css({
                    display: 'none'
                });
            });
        }
        ;
    });

    // 审核通过还是驳回填写备注
    $('input[name=check-agree]').change(function () {
        if ($('input[name=check-agree]:checked').val() == 'true') {
            $('#passCheck').css('display', 'block');
            $('#rejectCheck').css('display', 'none');
        } else if ($('input[name=check-agree]:checked').val() == 'false') {
            $('#passCheck').css('display', 'none');
            $('#rejectCheck').css('display', 'block');
        }
        ;
    });

})