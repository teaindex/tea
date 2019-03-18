/**
 * Grid-light theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
Highcharts.theme = {
	colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee","#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
	chart: {
		backgroundColor: null,
		style: {
			fontFamily: "sans-serif"
		},
    borderWidth: 1,
    borderRadius: 5,
    borderColor:'#cbcbcb',
		spacing:[10, 22, 10, 22]
	},
	title: {
		style: {
			fontSize: '16px',
			fontWeight: 'bold',
			textTransform: 'uppercase'
		}
	},
	tooltip: {
		borderWidth: 0,
		backgroundColor: 'rgba(219,219,216,0.8)',
		shadow: false
	},
	legend: {
		itemStyle: {
			fontWeight: 'bold',
			fontSize: '13px'
		}
	},
	xAxis: {
		gridLineWidth: 1,
		labels: {
			style: {
				fontSize: '12px'
			}
		},
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
		minorTickInterval: 5,
		title: {
			style: {
				textTransform: 'uppercase'
			}
		},
		labels: {
			style: {
				fontSize: '12px'
			}
		}
	},
	plotOptions: {
		candlestick: {
			lineColor: '#404048'
		},
		series:{
			lineWidth:1,
			marker:{
				enabled:true,
				radius:3
			}
		}
	},
	rangeSelector: {
		selected: 1,
		inputDateFormat: '%Y年%m月',
		inputEditDateFormat: '%Y-%m', //'%Y-%m-%d'
		buttons: [{
			type: 'month',
			count: 3,
			text: '3个月'
		}, {
			type: 'month',
			count: 6,
			text: '6个月'
		}, {
			type: 'month',
			count: 12,
			text: '一年'
		}, {
			type: 'all',
			text: '全部'
		}]
	},
	background2: '#F0F0EA' ,
  credits: { enabled: false }
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);