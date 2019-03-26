$(document).ready(function() {
	
	var title = {
		text: "茶指数"
	};
	var subtitle = {
		text: "指数"
	};

	var xAxis = {
		categories: ['6.18', '6.19', '6.20']
	};
	var yAxis = {
		title: {
			text: "指数"
		}, 
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	/*var scrollbar = {
		enabled: true
	};*/

	var tooltip = {
		valueSuffix: '%'
	};

	var legend = {
		layout: 'vertical', 
		align: 'right', 
		verticalAlign: 'middle', 
		borderWidth: 0
	};

	var plotOptions = {
		line: {
			connectNulls: true, 
			gapSize: 5
		}, 
		series: {
			cursor: 'pointer', 
			showInNavigator: true/*, 
			selected: false, 
			visible: false, 
			events: {
				click: function() {
					window.open('caiji_excel.html', '_blank', 'height=400, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
				}
			}*/
		}
	};

	var seriesFirst = [
		{
			name: '绿茶', 
			data: [75.54, 76.78, 76.99], 
			events: {
				click: function() {
					json.series = seriesGreen;
					$('#container').highcharts(json);
				}
			}
		}, {
			name: '红茶', 
			data: [96.93, 110.68, 116.78], 
			events: {
				click: function() {
					json.series = seriesRed;
					$('#container').highcharts(json);
				}
			}
		}, {
			name: '乌龙茶', 
			data: [null, null, null], 
			events: {
				click: function() {
					json.series = seriesOolong;
					$('#container').highcharts(json);
				}
			}
		}, {
			name: '黑茶', 
			data: [868.32, 262.22, 763.94], 
			events: {
				click: function() {
					json.series = seriesBlack;
					$('#container').highcharts(json);
				}
			}
		}, {
			name: '白茶', 
			data: [171.85, 172.22, null], 
			events: {
				click: function() {
					json.series = seriesWhite;
					$('#container').highcharts(json);
				}
			}
		}, {
			name: '黄茶', 
			data: [78.90, 82.73, 93.44], 
			events: {
				click: function() {
					json.series = seriesYellow;
					$('#container').highcharts(json);
				}
			}
		}, {
			name: '花茶', 
			data: [74.67, 75.70, 64.96], 
			events: {
				click: function() {
					json.series = seriesFlower;
					$('#container').highcharts(json);
				}
			}
		}
		];

	var seriesGreen = [
		{
			name: '名优绿茶', 
			data: [78.26, 79.87, 80.42], 
			events: {
				click: function() {
					json.series = seriesGreenFame;
					$('#container').highcharts(json);
				}
			}
		}, 
		{
			name: '大宗绿茶', 
			data: [57.50, 56.31, 54.26], 
			events: {
				click: function() {
					json.series = seriesGreenCommon;
					$('#container').highcharts(json);
				}
			}
		}
	];

	var seriesGreenFame = [
		{
			name: '巴山雀舌', 
			data: [, , ]
		}, 
		{
			name: '邓村绿茶', 
			data: [, , ]
		}, 
		{
			name: '峨眉山茶', 
			data: [49.16, 50.71, ]
		}, 
		{
			name: '贵州针', 
			data: [73.41, 78.92, 77.47]
		}, 
		{
			name: '汉中仙毫', 
			data: [, , ]
		}, 
		{
			name: '黄山毛峰', 
			data: [, , ]
		}, 
		{
			name: '金坛雀舌', 
			data: [, , ]
		}, 
		{
			name: '卷曲形茶',
			data: [114.29, 121.14, 107.66]
		}, 
		{
			name: '六安瓜片', 
			data: [, , ]
		}, 
		{
			name: '马边绿茶', 
			data: [, , ]
		}, 
		{
			name: '茅山青峰', 
			data: [, , ]
		}, 
		{
			name: '湄潭翠芽',
			data: [36.73, 29.52, 37.69]
		}, 
		{
			name: '湄潭毛峰',
			data: [52.47, 49.38, 53.04]
		}, 
		{
			name: '蒙顶甘露', 
			data: [, , ]
		}, 
		{
			name: '蒙顶山茶', 
			data: [36.48, 35.79, ]
		}, 
		{
			name: '蒲江雀舌', 
			data: [, , ]
		}, 
		{
			name: '钱塘龙井', 
			data: [, , ]
		}, 
		{
			name: '四川扁形茶',
			data: [83.27, 82.30, 86.04]
		}, 
		{
			name: '松阳扁茶', 
			data: [39.80, , ]
		}, 
		{
			name: '松阳香茶', 
			data: [53.77, 59.43, ]
		}, 
		{
			name: '条形茶',
			data: [125.99, 125.58, 125.03]
		}, 
		{
			name: '五峰绿茶', 
			data: [, , ]
		}, 
		{
			name: '信阳毛尖', 
			data: [, , ]
		}, 
		{
			name: '宜宾早茶', 
			data: [, , ]
		}, 
		{
			name: '永川秀芽',
			data: [86.29, 95.34, 82.59]
		}, 
		{
			name: '越州龙井',
			data: [49.48, 49.16, 48.38]
		}
	];

	var seriesGreenCommon = [
		{
			name: '炒青绿茶',
			data: [57.50, 56.31, 54.26]
		}, 
		{
			name: '烘青绿茶',
			data: [, , ]
		}, 
		{
			name: '蒸青绿茶',
			data: [, , ]
		}
	];

	var seriesRed = [
		{
			name: '工夫红茶', 
			data: [103.24, 110.68, 116.78], 
			events: {
				click: function() {
					json.series = seriesRed1;
					$('#container').highcharts(json);
				}
			}
		}, 
		{
			name: '小种红茶', 
			data: [56.00, , ], 
			events: {
				click: function() {
					json.series = seriesRed2;
					$('#container').highcharts(json);
				}
			}
		}, 
		{
			name: '红碎茶', 
			data: [, , ], 
			events: {
				click: function() {
					json.series = seriesRed3;
					$('#container').highcharts(json);
				}
			}
		}
	];

	var seriesRed1 = [
		{
			name: '川红工夫',
			data: [98.66, 107.47, 116.04]
		}, 
		{
			name: '滇红工夫',
			data: [, , ]
		}, 
		{
			name: '宜红工夫',
			data: [, , ]
		}, 
		{
			name: '昭平红',
			data: [, , ]
		}, 
		{
			name: '遵义红',
			data: [128.23, 128.23, 128.23]
		}
	];

	var seriesRed2 = [
		{
			name: '松阳红茶',
			data: [56.00, , ]
		}
	];

	var seriesRed3 = [
		{
			name: '南川红碎茶',
			data: [, , ]
		}
	];

	var seriesOolong = [
		{
			name: '闽南乌龙', 
			data: [, , ], 
			events: {
				click: function() {
					json.series = seriesOolong1;
					$('#container').highcharts(json);
				}
			}
		}
	];

	var seriesOolong1 = [
		{
			name: '安溪铁观音', 
			data: [, , ]
		}, 
		{
			name: '黄金桂', 
			data: [, , ]
		}
	];

	var seriesBlack = [
		{
			name: '安化黑茶', 
			data: [121.16, 119.76, 136.55], 
			events: {
				click: function() {
					json.series = seriesBlack1;
					$('#container').highcharts(json);
				}
			}
		}, 
		{
			name: '四川黑茶', 
			data: [127.73, 130.32, 129.80], 
			events: {
				click: function() {
					json.series = seriesBlack2;
					$('#container').highcharts(json);
				}
			}
		}, 
		{
			name: '普洱', 
			data: [1174.60, 320.61, 1021.13], 
			events: {
				click: function() {
					json.series = seriesBlack3;
					$('#container').highcharts(json);
				}
			}
		}
	];

	var seriesBlack1 = [
		{
			name: '茯砖',
			data: [98.03, 96.43, 111.41]
		}, 
		{
			name: '黑砖',
			data: [107.25, 97.08, 101.95]
		}, 
		{
			name: '千两',
			data: [123.38, 131.23, 150.69]
		}, 
		{
			name: '三尖',
			data: [191.18, 175.41, 195.72]
		}
	];

	var seriesBlack2 = [
		{
			name: '康砖',
			data: [127.73, 130.32, 129.80]
		}
	];

	var seriesBlack3 = [
		{
			name: '普洱生茶',
			data: [1270.14, 343.60, 1119.89]
		}, 
		{
			name: '普洱熟茶',
			data: [254.47, 99.22, 70.04]
		}
	];

	var seriesWhite = [
		{
			name: '白毫银针', 
			data: [171.85, 172.22,], 
			events: {
				click: function() {
					json.series = seriesWhite1;
					$('#container').highcharts(json);
				}
			}
		}, 
		{
			name: '新工艺白茶', 
			data: [, , ], 
			events: {
				click: function() {
					json.series = seriesWhite2;
					$('#container').highcharts(json);
				}
			}
		}
	];

	var seriesWhite1 = [
		{
			name: '白毫银针', 
			data: [171.85, 172.22, ]
		}
	];

	var seriesWhite2 = [
		{
			name: '新工艺白茶', 
			data: [, , ]
		}
	];

	var seriesYellow = [
		{
			name: '黄芽茶', 
			data: [78.90, 82.73, 93.44], 
			events: {
				click: function() {
					json.series = seriesYellow1;
					$('#container').highcharts(json);
				}
			}
		}
	];

	var seriesYellow1 = [
		{
			name: '蒙顶黄芽',
			data: [78.90, 82.73, 93.44]
		}
	];

	var seriesFlower = [
		{
			name: '茉莉花茶', 
			data: [74.67, 75.70, 64.96], 
			events: {
				click: function() {
					json.series = seriesFlower1;
					$('#container').highcharts(json);
				}
			}
		}
	];

	var seriesFlower1 = [
		{
			name: '四川茉莉花茶',
			data: [74.67, 75.70, 64.96]
		} 
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.plotOptions = plotOptions;
	json.tooltip = tooltip;
	json.legend = legend;

	$('#container').highcharts(json);

	//console.log(series);
	json.series = seriesFirst;
	
	$('#container').highcharts(json);
	//$('#container').highcharts(json);
	$('#confirm').click(function(){
		// AJAX
		//json.series = json.series==seriesGreen ? seriesFirst : seriesGreen;
		if (json.series==seriesFirst) {
			return;
		} else if (json.series==seriesGreenFame || json.series==seriesGreenCommon) {
			json.series = seriesGreen;
		} else if (json.series==seriesRed1 || json.series==seriesRed2 || json.series==seriesRed3) {
			json.series = seriesRed;
		} else if (json.series==seriesOolong1) {
			json.series = seriesOolong;
		} else if (json.series==seriesBlack1 || json.series==seriesBlack2 || json.series==seriesBlack3) {
			json.series = seriesBlack;
		} else if (json.series==seriesWhite1 || json.series==seriesWhite2) {
			json.series = seriesWhite;
		} else if (json.series==seriesYellow1) {
			json.series = seriesYellow;
		} else if (json.series==seriesFlower1) {
			json.series = seriesFlower;
		} else {
			json.series = seriesFirst;
		}
		$('#container').highcharts(json);
	});


	$('#slc10').click(function(){
		$('#slc1').html("定基");
	});
	$('#slc11').click(function(){
		$('#slc1').html("同比");
	});
	$('#slc12').click(function(){
		$('#slc1').html("环比");
	});

	$('#slc20').click(function(){
		$('#slc2').html("日指数");
	});
	$('#slc21').click(function(){
		$('#slc2').html("周指数");
	});
	$('#slc22').click(function(){
		$('#slc2').html("月指数");
	});

});


/*
[
	{
		"id": 76,
		"name": null,
		"posttime": "2019-03-12 23:09:07",
		"lastmodify": null,
		"clicknum": null,
		"up": null,
		"good": null,
		"bad": null 
	}, 
	{
		"id": 77,
		"name": null,
		"posttime": "2019-03-17 17:33:09",
		"lastmodify": null,
		"clicknum": null,
		"up": null,
		"good": null,
		"bad": null
	}
]
*/