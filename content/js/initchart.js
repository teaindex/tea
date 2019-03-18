Highcharts.setOptions({
    global: {
        useUTC: false
    },
    lang: {
        rangeSelectorZoom: '',
        resetZoom: '恢复原始大小',
        resetZoomTitle: '恢复到1：1的大小',
        weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        rangeSelectorTo: '到',
        rangeSelectorFrom: ''
    }
});
(function ($) {
    $.fn.extend({
        //将可选择的变量传递给方法
        initChart: function (data,options) {
            var defaults = {
                width: null,
                title: '我的图表',
                spacingRight: 10,
                spacingLeft: 10,
                minTickInterval: undefined//1000 * 60 * 60 * 24 * 30
            };
            options = $.extend(defaults, options);
            var myChart = new Highcharts.StockChart({
                chart: { borderWidth: 1, borderColor: '#dddddd', renderTo: $(this)[0], width: options.width, zoomType: 'x' },
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
                    },
                    minTickInterval: options.minTickInterval
                },
                tooltip: {
                    formatter: function () {
                        var s='';
                        $.each(this.points, function (i, point) {
                            s += '<b>';
                            if (point.series.name.indexOf('周') >= 0) {
                                var d = this.x - (1000 * 60 * 60 * 24 * 6); 
                                s += Highcharts.dateFormat('%y年%m月%d日', d) + '—' + Highcharts.dateFormat('%y年%m月%d日', this.x);
                            } else if (point.series.name.indexOf('月') >= 0 || point.series.name.indexOf('翘尾') >= 0 || point.series.name.indexOf('新涨价') >= 0) {
                                s += Highcharts.dateFormat('%y年%m月', this.x);
                            } else if (point.series.name.indexOf('季') >= 0) {
                                var t = new Date(this.x);
                                s += t.getFullYear() + '年' + (t.getMonth() + 1) / 3 + '季度';
                            } else if (point.series.name.indexOf('年') >= 0) {
                                s += Highcharts.dateFormat('%y年', this.x);
                            } else {
                                s += Highcharts.dateFormat('%y年%m月%d日', this.x);
                            }
                            s += '</b>';
                            s += '<br/><span>' + point.series.name + '</span>';
                            s += '：<b>' + point.y + '</b><br/>' + point.key + '<br/>';
                        });
                        return s;
                    }
                },
                exporting: {
                    buttons: {
                        contextButton: {
                            menuItems: [ {
                                text: '导出图片',
                                onclick: function () {
                                    this.exportChart({
                                        sourceWidth: 900,
                                        sourceHeight: 400
                                    });
                                },
                                separator: false
                            }]
                        }
                    }
                },
                navigator: {
                    adaptToUpdatedData: false,
                    xAxis: {
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
                    }
                },
                credits: { enabled: false },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    //alert(this.series.name, this.x);
                                }
                            }
                        },
                        dataGrouping: {
                            //approximation: 'close'
                            enabled: false
                        }
                    },
                    line: {
                        marker: {
                            enabled: true,
                            radius: 3,
                            states: {
                                hover: {
                                    enabled: true,
                                    radius: 4
                                }
                            }
                        },
                    }
                },
                rangeSelector: {
                    selected: 1,
                    inputDateFormat: '%Y-%m-%d %H:%M',
                    inputEditDateFormat: '%Y-%m-%d %H:%M',
                    inputBoxWidth: 125,
                    buttonTheme: {
                        //fill: '#066EA5',
                        //stroke: '#066EA5',
                        width: 45
                    },
                    buttons: [{
                        type: 'month',
                        count: 1,
                        text: '1个月'
                    }, {
                        type: 'month',
                        count: 3,
                        text: '3个月'
                    }, {
                        type: 'month',
                        count: 6,
                        text: '6个月'
                    }, , {
                        type: 'month',
                        count: 9,
                        text: '9个月'
                    }, {
                        type: 'month',
                        count: 12,
                        text: '1年'
                    }, {
                        type: 'all',
                        text: '全部'
                    }]
                },
                title: {
                    text: options.title
                },
                legend: {
                    enabled: true
                },
                series: data
            });
            return myChart;
        }
    });
})(jQuery);

function initChart(title, data) {
    
}