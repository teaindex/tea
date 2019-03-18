function chartData() {
    /*$("#chart").highcharts("StockChart", {
        series: data,
        title: {
            text: title,
            style:{"font-family":"'Microsoft YaHei',Arial"}
        },
        chart: { "backgroundColor": "#ffffff","marginRight":40 },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m月%d日',
                week: '%m月%d日',
                month: '%y年%m月',
                year: '%Y'
            }
        },
        yAxis: {
            opposite:false
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%y年%m月%d日',
                week: '%y年%m月%d日',
                month: '%y年%m月',
                year: '%Y'
            }
        },
        rangeSelector: {
            inputStyle: {"backgroundColor":"#ccc"}
        },
        legend: { enabled: true }
        });*/	

	Highcharts.stockChart('chart', {
		rangeSelector: {
			selected: 2
		},
		title: {
			text: '浙江省菜篮子指数'
		},
		plotOptions: {
			series: {
				showInLegend: true
			}
		},
		tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%y年%m月%d日',
                week: '%y年%m月%d日',
                month: '%y年%m月',
                year: '%Y'
            },
			split: false,
			shared: true
        },
		rangeSelector: {
            inputStyle: {"backgroundColor":"#ccc"}
        },
        legend: { enabled: true },
		xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m月%d日',
                week: '%m月%d日',
                month: '%y年%m月',
                year: '%Y'
            }
        },
		
		series: [{
			id: '000001',
			name: '指数',
			data: [[116182400000,2],[116183400000,4],[116184400000,6],[116185400000,8],[116186400000,10],[116187400000,2],[116188400000,4],[116189400000,6],[116190400000,8],[116191400000,10]],
		}]
	
});







}

/*function chartData(scshort,classid,type,start,end) {
    $.ajax({
        url: 'http://zs.zjpi.gov.cn/Data/CData',
        type: 'POST',
        dataType: 'JSONP',
        data: {
            scshort: scshort,
            classid: classid,
            type: type,
            start: start,
            end: end
        },
        success: function (data) {
            if (data.success) {
                showChart(data.data, data.title);
            }
        },
        error: function () {
            alert("数据读取失败！");
        }
    });
}*/
var holding = false, index = 1, count = $("#slider li").length;
//焦点图
function intiSlider() {
    $('.m-slider-contain').hover(function (e) {
        holding = true;
    }, function (e) {
        holding = false;
    })
    $('.m-slider-left').click(function (e) {
        var t = parseInt($(this).attr("ref"));
        if (t < 1) {
            return;
        }
        var margin = (parseInt(t) - 1) * 485;
        $('#slider').animate({ 'margin-left': -margin }, 500);
        $('.m-slider-right').attr("ref", t + 1);
        if (t != 1) {
            $('.m-slider-left').attr("ref", t - 1);
        }
    });
    $('.m-slider-right').click(function (e) {
        var t = parseInt($(this).attr("ref"));
        var l = $('#slider li').length;
        if (t > l) {
            return;
        }
        var margin = (parseInt(t) - 1) * 485;
        $('#slider').animate({ 'margin-left': -margin }, 500);
        $('.m-slider-left').attr("ref", t - 1);
        if (t != l) {
            $('.m-slider-right').attr("ref", t + 1);
        }
    });
    setInterval(function () {
        if (holding) { return; }
        index = index + 1 > count ? 1 : index + 1;
        $('#slider').animate({ 'margin-left': -(485 * (index - 1)) }, 500);
        if (index != count) {
            var leftindex = index == 0 ? 1 : index;
            $('.m-slider-left').attr("ref", leftindex);
        }
        if (index != count) {
            $('.m-slider-right').attr("ref", index + 1);
        }
        //$('.m-slider-nav li.u-active').removeClass('u-active');
        //$('.m-slider-nav li:eq(' + (index - 1) + ')').addClass('u-active');
    }, 5000)
}
intiSlider();
$('.m-cy-list li').hover(function (e) {
    var t = '#desc_'+$(e.currentTarget).data('t');
    var x = $('.m-cy-js div:not(' + t + ')');
    x.hide();
    $('.m-cy-list li.u-active').removeClass('u-active');
    $(e.currentTarget).addClass('u-active');
    $(t).show();
});