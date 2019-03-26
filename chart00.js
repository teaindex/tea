/*var data = [
				{
					name: '峨眉山茶', 
					data: [[1529366400000,49.16], [1529452800000,50.71], ]
				}, 
				{
					name: '贵州针', 
					data: [[1529366400000,73.41], [1529452800000,78.92], [1529539200000,77.47]]
				}, 
				{
					name: '卷曲形茶',
					data: [[1529366400000,114.29], [1529452800000,121.14], [1529539200000,107.66]]
				}, 
				{
					name: '湄潭翠芽',
					data: [[1529366400000,36.73], [1529452800000,29.52], [1529539200000,37.69]]
				}, 
				{
					name: '湄潭毛峰',
					data: [[1529366400000,52.47], [1529452800000,49.38], [1529539200000,53.04]]
				}, 
				{
					name: '蒙顶山茶', 
					data: [[1529366400000,36.48], [1529452800000,35.79], ]
				}, 
				{
					name: '四川扁形茶',
					data: [[1529366400000,83.27], [1529452800000,82.30], [1529539200000,86.04]]
				}, 
				{
					name: '松阳扁茶', 
					data: [[1529366400000,39.80], , ]
				}, 
				{
					name: '松阳香茶', 
					data: [[1529366400000,53.77], [1529452800000,59.43], ]
				}, 
				{
					name: '条形茶',
					data: [[1529366400000,125.99], [1529452800000,125.58], [1529539200000,125.03]]
				}, 
				{
					name: '永川秀芽',
					data: [[1529366400000,86.29], [1529452800000,95.34], [1529539200000,82.59]]
				}, 
				{
					name: '越州龙井',
					data: [[1529366400000,49.48], [1529452800000,49.16], [1529539200000,48.38]]
				}, 
				{
					name: '炒青绿茶',
					data: [[1529366400000,57.50], [1529452800000,56.31], [1529539200000,54.26]]
				}, 
				{
					name: '川红工夫',
					data: [[1529366400000,98.66], [1529452800000,107.47], [1529539200000,116.04]]
				}, 
				{
					name: '遵义红',
					data: [[1529366400000,128.23], [1529452800000,128.23], [1529539200000,128.23]]
				}, 
				{
					name: '茯砖',
					data: [[1529366400000,98.03], [1529452800000,96.43], [1529539200000,111.41]]
				}, 
				{
					name: '黑砖',
					data: [[1529366400000,107.25], [1529452800000,97.08], [1529539200000,101.95]]
				}, 
				{
					name: '千两',
					data: [[1529366400000,123.38], [1529452800000,131.23], [1529539200000,150.69]]
				}, 
				{
					name: '三尖',
					data: [[1529366400000,191.18], [1529452800000,175.41], [1529539200000,195.72]]
				}, 
				{
					name: '康砖',
					data: [[1529366400000,127.73], [1529452800000,130.32], [1529539200000,129.80]]
				}, 
				{
					name: '普洱生茶',
					data: [[1529366400000,1270.14], [1529452800000,343.60], [1529539200000,1119.89]]
				}, 
				{
					name: '普洱熟茶',
					data: [[1529366400000,254.47], [1529452800000,99.22], [1529539200000,70.04]]
				}, 
				{
					name: '白毫银针', 
					data: [[1529366400000,171.85], [1529452800000,172.22], ]
				}, 
				{
					name: '蒙顶黄芽',
					data: [[1529366400000,78.90], [1529452800000,82.73], [1529539200000,93.44]]
				}, 
				{
					name: '四川茉莉花茶',
					data: [[1529366400000,74.67], [1529452800000,75.70], [1529539200000,64.96]]
				}
			];


console.log(data);
*/

var dataset = [];


var seriesFirst = [
		{
			name: '绿茶', 
			data: [75.54, 76.78, 76.99], 
			events: {
				click: function() {
					dataset = seriesGreen;
					redraw();
				}
			}
		}, {
			name: '红茶', 
			data: [96.93, 110.68, 116.78], 
			events: {
				click: function() {
					dataset = seriesRed;
					redraw();
				}
			}
		}, {
			name: '乌龙茶', 
			data: [null, null, null], 
			events: {
				click: function() {
					dataset = seriesOolong;
					redraw();
				}
			}
		}, {
			name: '黑茶', 
			data: [868.32, 262.22, 763.94], 
			events: {
				click: function() {
					dataset = seriesBlack;
					redraw();
				}
			}
		}, {
			name: '白茶', 
			data: [171.85, 172.22, null], 
			events: {
				click: function() {
					dataset = seriesWhite;
					redraw();
				}
			}
		}, {
			name: '黄茶', 
			data: [78.90, 82.73, 93.44], 
			events: {
				click: function() {
					dataset = seriesYellow;
					redraw();
				}
			}
		}, {
			name: '花茶', 
			data: [74.67, 75.70, 64.96], 
			events: {
				click: function() {
					dataset = seriesFlower;
					redraw();
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
					dataset = seriesGreenFame;
					redraw();
				}
			}
		}, 
		{
			name: '大宗绿茶', 
			data: [57.50, 56.31, 54.26], 
			events: {
				click: function() {
					dataset = seriesGreenCommon;
					redraw();
				}
			}
		}
	];

	var seriesGreenFame = [
		{
			name: '巴山雀舌', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '邓村绿茶', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '峨眉山茶', 
			data: [49.16, 50.71, ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '贵州针', 
			data: [73.41, 78.92, 77.47],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '汉中仙毫', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '黄山毛峰', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '金坛雀舌', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '卷曲形茶',
			data: [114.29, 121.14, 107.66],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '六安瓜片', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '马边绿茶', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '茅山青峰', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '湄潭翠芽',
			data: [36.73, 29.52, 37.69],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '湄潭毛峰',
			data: [52.47, 49.38, 53.04],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '蒙顶甘露', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '蒙顶山茶', 
			data: [36.48, 35.79, ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '蒲江雀舌', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '钱塘龙井', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '四川扁形茶',
			data: [83.27, 82.30, 86.04],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '松阳扁茶', 
			data: [39.80, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '松阳香茶', 
			data: [53.77, 59.43, ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '条形茶',
			data: [125.99, 125.58, 125.03],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '五峰绿茶', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			},
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '信阳毛尖', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '宜宾早茶', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '永川秀芽',
			data: [86.29, 95.34, 82.59],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '越州龙井',
			data: [49.48, 49.16, 48.38],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}
	];

	var seriesGreenCommon = [
		{
			name: '炒青绿茶',
			data: [57.50, 56.31, 54.26],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '烘青绿茶',
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '蒸青绿茶',
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}
	];

	var seriesRed = [
		{
			name: '工夫红茶', 
			data: [103.24, 110.68, 116.78], 
			events: {
				click: function() {
					dataset = seriesRed1;
					redraw();
				}
			}
		}, 
		{
			name: '小种红茶', 
			data: [56.00, , ], 
			events: {
				click: function() {
					dataset = seriesRed2;
					redraw();
				}
			}
		}, 
		{
			name: '红碎茶', 
			data: [, , ], 
			events: {
				click: function() {
					dataset = seriesRed3;
					redraw();
				}
			}
		}
	];

	var seriesRed1 = [
		{
			name: '川红工夫',
			data: [98.66, 107.47, 116.04],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '滇红工夫',
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '宜红工夫',
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '昭平红',
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '遵义红',
			data: [128.23, 128.23, 128.23],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}
	];

	var seriesRed2 = [
		{
			name: '松阳红茶',
			data: [56.00, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}
	];

	var seriesRed3 = [
		{
			name: '南川红碎茶',
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}
	];

	var seriesOolong = [
		{
			name: '闽南乌龙', 
			data: [, , ], 
			events: {
				click: function() {
					dataset = seriesOolong1;
					redraw();
				}
			}
		}
	];

	var seriesOolong1 = [
		{
			name: '安溪铁观音', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '黄金桂', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}
	];

	var seriesBlack = [
		{
			name: '安化黑茶', 
			data: [121.16, 119.76, 136.55], 
			events: {
				click: function() {
					dataset = seriesBlack1;
					redraw();
				}
			}
		}, 
		{
			name: '四川黑茶', 
			data: [127.73, 130.32, 129.80], 
			events: {
				click: function() {
					dataset = seriesBlack2;
					redraw();
				}
			}
		}, 
		{
			name: '普洱', 
			data: [1174.60, 320.61, 1021.13], 
			events: {
				click: function() {
					dataset = seriesBlack3;
					redraw();
				}
			}
		}
	];

	var seriesBlack1 = [
		{
			name: '茯砖',
			data: [98.03, 96.43, 111.41],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '黑砖',
			data: [107.25, 97.08, 101.95],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '千两',
			data: [123.38, 131.23, 150.69],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '三尖',
			data: [191.18, 175.41, 195.72],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}
	];

	var seriesBlack2 = [
		{
			name: '康砖',
			data: [127.73, 130.32, 129.80],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}
	];

	var seriesBlack3 = [
		{
			name: '普洱生茶',
			data: [1270.14, 343.60, 1119.89],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}, 
		{
			name: '普洱熟茶',
			data: [254.47, 99.22, 70.04],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}
	];

	var seriesWhite = [
		{
			name: '白毫银针', 
			data: [171.85, 172.22,], 
			events: {
				click: function() {
					dataset = seriesWhite1;
					redraw();
				}
			}
		}, 
		{
			name: '新工艺白茶', 
			data: [, , ], 
			events: {
				click: function() {
					dataset = seriesWhite2;
					redraw();
				}
			}
		}
	];

	var seriesWhite1 = [
		{
			name: '白毫银针', 
			data: [171.85, 172.22, ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}
	];

	var seriesWhite2 = [
		{
			name: '新工艺白茶', 
			data: [, , ],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}
	];

	var seriesYellow = [
		{
			name: '黄芽茶', 
			data: [78.90, 82.73, 93.44], 
			events: {
				click: function() {
					dataset = seriesYellow1;
					redraw();
				}
			}
		}
	];

	var seriesYellow1 = [
		{
			name: '蒙顶黄芽',
			data: [78.90, 82.73, 93.44],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		}
	];

	var seriesFlower = [
		{
			name: '茉莉花茶', 
			data: [74.67, 75.70, 64.96], 
			events: {
				click: function() {
					dataset = seriesFlower1;
					redraw();
				}
			}
		}
	];

	var seriesFlower1 = [
		{
			name: '四川茉莉花茶',
			data: [74.67, 75.70, 64.96],
			events: {
				click: function() {
					dataset = seriesFirst;
					redraw();
				}
			}
		} 
	];









var dataset = seriesFirst;
var stock = [];


for (var i=0;i<dataset.length;i++) {
	var format = [[1529366400000,73.41], [1529452800000,78.92], [1529539200000,77.47]];
	for (var k=0;k<dataset[i]["data"].length;k++) {
		format[k][1] = dataset[i]["data"][k];
	}
	stock.push({
			type: 'line',
			name: dataset[i]["name"],
			data: format,
			events: dataset[i]["events"]
		});
	stock.push({
			type: 'column',
			yAxis: 1, 
			name: dataset[i]["name"],
			data: format,
			events: dataset[i]["events"]
		});
}

console.log(stock);

Highcharts.stockChart('container00', {
		rangeSelector : {
				selected : 2
		},
		title : {
				text : '茶指数'
		},
		yAxis : [{
			title: {
				text: "指数"
			}, 
			height: '65%', 
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}]
		}, {
			title: {
				text: "销售额"
			}, 
			top: '65%', 
			height: '35%'
		}],
		legend: {
			enabled: false, 
			layout: 'vertical', 
			floating: true, 
			align: 'right', 
			itemHoverStyle: {'color': 'blue'}, 
			itemWidth: 80, 
			navigation: {
				activeColor: '#3E576F',
				animation: true,
				arrowSize: 10,
				inactiveColor: '#CCC',
				style: {
					fontWeight: 'bold',
					color: '#333',
					fontSize: '12px'
				}
			}
		}, 
		tooltip : {
			valueSuffix: '%', 
			split: false
		},
		plotOptions : {
			line: {
				connectNulls: true, 
				gapSize: 5
			}, 
			series: {
				cursor: 'pointer', 
				showInNavigator: true
			}
		},

		series : stock
});

function redraw() {
	stock = [];

	for (var i=0;i<dataset.length;i++) {
		var format = [[1529366400000,73.41], [1529452800000,78.92], [1529539200000,77.47]];
		if (dataset[i]["data"][0]==undefined)
			continue;
		for (var k=0;k<dataset[i]["data"].length;k++) {	
			format[k][1] = dataset[i]["data"][k];
		}
		stock.push({
				type: 'line',
				name: dataset[i]["name"],
				data: format,
				events: dataset[i]["events"]
			});
		stock.push({
				type: 'column',
				yAxis: 1, 
				name: dataset[i]["name"],
				data: format,
				events: dataset[i]["events"]
			});
	}

	Highcharts.stockChart('container00', {
			rangeSelector : {
					selected : 2
			},
			title : {
					text : '茶指数'
			},
			yAxis : [{
				title: {
					text: "指数"
				}, 
				height: '65%', 
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			}, {
				title: {
					text: "销售额"
				}, 
				top: '65%', 
				height: '35%'
			}],
			legend: {
				enabled: false, 
				layout: 'vertical', 
				floating: true, 
				align: 'right', 
				itemHoverStyle: {'color': 'blue'}, 
				itemWidth: 80, 
				navigation: {
					activeColor: '#3E576F',
					animation: true,
					arrowSize: 10,
					inactiveColor: '#CCC',
					style: {
						fontWeight: 'bold',
						color: '#333',
						fontSize: '12px'
					}
				}
			}, 
			tooltip : {
				valueSuffix: '%', 
				split: false
			},
			plotOptions : {
				line: {
					connectNulls: true, 
					gapSize: 5
				}, 
				series: {
					cursor: 'pointer', 
					showInNavigator: true
				}
			},

			series : stock
	});
}


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

$('#chart').after("<button type=\"button\" id=\"confirm\" class=\"btn btn-default\"\
			style=\"position: fixed; top: 90px; left: 1140px; z-index: 999;\">返回</button>");

$('#confirm').click(function(){
		// AJAX
		//stock = stock==seriesGreen ? seriesFirst : seriesGreen;
		if (dataset==seriesFirst) {
			return;
		} else if (dataset==seriesGreenFame || dataset==seriesGreenCommon) {
			dataset = seriesGreen;
		} else if (dataset==seriesRed1 || dataset==seriesRed2 || dataset==seriesRed3) {
			dataset = seriesRed;
		} else if (dataset==seriesOolong1) {
			dataset = seriesOolong;
		} else if (dataset==seriesBlack1 || dataset==seriesBlack2 || dataset==seriesBlack3) {
			dataset = seriesBlack;
		} else if (dataset==seriesWhite1 || dataset==seriesWhite2) {
			dataset = seriesWhite;
		} else if (dataset==seriesYellow1) {
			dataset = seriesYellow;
		} else if (dataset==seriesFlower1) {
			dataset = seriesFlower;
		} else {
			dataset = seriesFirst;
		}
		redraw();
	});