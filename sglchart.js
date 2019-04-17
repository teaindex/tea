var jsondata = {
	"AllIndex":[],
	"OneIndex":[],
	"TwoIndex":[],
	"ThreeIndex":[],
	"FourIndex":[]
};

var path = {
	"AllIndex":"",
	"OneIndex":"",
	"TwoIndex":"",
	"ThreeIndex":""
};


var city = new Array();
var tea = new Array();


var label1 = "DingJi";
var label2 = "DayIndex";
var genre = "AllIndex";		// 级别


var dataset = [];
var stock = [];


var allNames = [];
var dataLine = [];
var dataColumn = [];
var dataEvent = [];


var limitor = false;

//console.log(stock);

Highcharts.setOptions({
	lang: {
		months: ['1月', '2月', '3月', '4月', '5月', '6月',  '7月', '8月', '9月', '10月', '11月', '12月'],
		weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		rangeSelectorZoom: ''
	}
});

Highcharts.stockChart('container00', {
	rangeSelector : {
			selected : 2,
			inputDateFormat: '%Y-%m-%d'
	},
	title : {
			text : '茶指数'
	},
	chart : {
		height : '60%', 
		spacingBottom: 15,
		backgroundColor: {
			linearGradient: [0, 0, 500, 500],
				stops: [
					[0, 'rgb(255, 255, 255)'],
					[1, 'rgb(240, 240, 255)']
				]
		}
	}, 
	exporting : {
		allowHTML: true
	},
	xAxis : {
		type: 'datetime',
		labels: {
			format: '{value:%B%e日}'
		}
	},
	yAxis : [{
		x: -3,
		title: {
			text: "指数"
		}, 
		labels: {
			align: "right", 
			x: -3
		}, 
		height: '65%',
		resize: {
			enabled: true
		},
		lineWidth: 2,
		type: 'logarithmic'
	}, {
		title: {
			text: "销售额"
		}, 
		labels: {
			align: "right", 
			x: -3
		}, 
		top: '65%', 
		height: '35%', 
		offset: 0,
		lineWidth: 2
	}], 
	legend: {
		enabled: true, 
		layout: 'horizontal', 
		floating: false, 
		itemHoverStyle: {'color': 'blue'}, 
		itemWidth: 120, 
		width: 820,
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
	plotOptions : {
		line: {
			connectNulls: true, 
			gapSize: 5
		}, 
		series: {
			cursor: 'pointer', 
			showInNavigator: true, 
			events: {
				legendItemClick: function (event) {
					var same = this.name;
					//console.log(this.name);
					//console.log(this.userOptions.type);
					var legends = (this.userOptions.type=="line") ? 
						$('.highcharts-legend-item.highcharts-column-series') : 
						$('.highcharts-legend-item.highcharts-line-series');
					if (limitor)
						return true;
					for (var m=0;m<legends.length;m++) {
						var found = legends.eq(m).find('tspan');
						if (found[0].innerHTML==same) {
							limitor = true;
							legends.eq(m).click();
							limitor = false;
							break;
						}
					}
					return true;
				}
			}
		}
	},

	series : []
});



$('.highcharts-legend-item.highcharts-column-series').attr("style","visibility: hidden;");

var parent = "AllIndex";


function wait() {
	setTimeout("redraw_chart()",1000);
}

function redraw_chart() {
	//console.log(parent);
	stock = [];


	allNames = [];
	dataLine = [];
	dataColumn = [];
	dataEvent = [];

	if (jsondata[genre].length==0) {
		wait();
	}

	for (var i=0;i<jsondata[genre].length;i++) {
		//console.log(jsondata[genre][i]);
		var thisName = "总计";//jsondata[genre][i]["name"];
		var keyName = "index_all";
		switch (genre) {
			case "AllIndex":
				keyName = "index_all";
				break;
			case "OneIndex":
				keyName = "index_one";
				thisName = jsondata[genre][i]["name"];
				break;
			case "TwoIndex":
				keyName = "index_two";
				thisName = jsondata[genre][i]["cityname"];
				break;
			case "ThreeIndex":
				keyName = "index_three";
				thisName = jsondata[genre][i]["teaname"];
				break;
			case "FourIndex":
				keyName = "index_four";
				thisName = jsondata[genre][i]["picking_standard"];
				break;
		}

		if (genre=="TwoIndex") {
			if (parent!=city[jsondata[genre][i]["belong2class_one"]])
				continue;
		}
		else if (genre=="ThreeIndex") {
			if (parent!=jsondata[genre][i]["cityname"])
				continue;
		}
		else if (genre=="FourIndex") {
			if (parent!=tea[jsondata[genre][i]["tea_id"]])
				continue;
		}

		var flag = -1;
		if (allNames.length!=0)
			for (var a=0;a<allNames.length;a++)
				if (allNames[a]==thisName)
					flag = a;
		if (flag==-1) {
			allNames.push(thisName);
			dataLine.push([]);
			dataColumn.push([]);
			dataEvent.push([]);
			flag = allNames.length-1;
			if (genre=="OneIndex") {
				city[jsondata[genre][i]["id"]] = thisName;
			}
			else if (genre=="ThreeIndex") {
				tea[jsondata[genre][i]["tea_id"]] = thisName;
			}
		}
		//console.log(flag);

		dataLine[flag].push([jsondata[genre][i]["date"],jsondata[genre][i][keyName]]);
		dataColumn[flag].push([jsondata[genre][i]["date"],jsondata[genre][i]["sales_money"]]);
	}

	//console.log(dataLine);
	//console.log(dataColumn);
	//console.log(stock);

	for (var i=0;i<allNames.length;i++) {
		if (genre=="AllIndex") {
			stock.push({
			// 解析折线图数据
				type: 'line',
				name: allNames[i],
				data: dataLine[i],
				tooltip: {
					valuePrefix: "类指数：",
					valueSuffix: "%",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "OneIndex";
						parent = this.getName();//console.log(this.getName());
						path["AllIndex"] = "AllIndex";
						redraw_chart();
					}
				},
				visible: visibility
			}, {
			// 解析柱状图数据
				type: 'column',
				yAxis: 1,
				name: allNames[i],
				data: dataColumn[i],
				tooltip: {
					valuePrefix: "销售额：",
					valueSuffix: "万元",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "OneIndex";
						parent = this.getName();//console.log(this.getName());
						path["AllIndex"] = "AllIndex";
						redraw_chart();
					}
				},
				visible: visibility
			});
		}
		else if (genre=="OneIndex") {
			var visibility = i==0 ? true : false;
			stock.push({
			// 解析折线图数据
				type: 'line',
				name: allNames[i],
				data: dataLine[i],
				tooltip: {
					valuePrefix: "类指数：",
					valueSuffix: "%",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "TwoIndex";
						parent = this.getName();//console.log(this.getName());
						path["OneIndex"] = this.getName();
						redraw_chart();
					}
				},
				visible: visibility
			}, {
			// 解析柱状图数据
				type: 'column',
				yAxis: 1,
				name: allNames[i],
				data: dataColumn[i],
				tooltip: {
					valuePrefix: "销售额：",
					valueSuffix: "万元",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "TwoIndex";
						parent = this.getName();//console.log(this.getName());
						path["OneIndex"] = this.getName();
						redraw_chart();
					}
				},
				visible: visibility
			});
		}
		else if (genre=="TwoIndex") {
			var visibility = i==0 ? true : false;
			stock.push({
			// 解析折线图数据
				type: 'line',
				name: allNames[i],
				data: dataLine[i],
				tooltip: {
					valuePrefix: "类指数：",
					valueSuffix: "%",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "ThreeIndex";
						parent = this.getName();//console.log(this.getName());
						path["TwoIndex"] = this.getName();
						redraw_chart();
					}
				},
				visible: visibility
			}, {
			// 解析柱状图数据
				type: 'column',
				yAxis: 1,
				name: allNames[i],
				data: dataColumn[i],
				tooltip: {
					valuePrefix: "销售额：",
					valueSuffix: "万元",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "ThreeIndex";
						parent = this.getName();//console.log(this.getName());
						path["TwoIndex"] = this.getName();
						redraw_chart();
					}
				},
				visible: visibility
			});
		}
		else if (genre=="ThreeIndex") {
			var visibility = i==0 ? true : false;
			stock.push({
			// 解析折线图数据
				type: 'line',
				name: allNames[i],
				data: dataLine[i],
				tooltip: {
					valuePrefix: "类指数：",
					valueSuffix: "%",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "FourIndex";
						parent = this.getName();//console.log(this.getName());
						path["ThreeIndex"] = this.getName();
						redraw_chart();
					}
				},
				visible: visibility
			}, {
			// 解析柱状图数据
				type: 'column',
				yAxis: 1,
				name: allNames[i],
				data: dataColumn[i],
				tooltip: {
					valuePrefix: "销售额：",
					valueSuffix: "万元",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "FourIndex";
						parent = this.getName();//console.log(this.getName());
						path["ThreeIndex"] = this.getName();
						redraw_chart();
					}
				},
				visible: visibility
			});
		}
		else {
			var visibility = i==0 ? true : false;
			stock.push({
			// 解析折线图数据
				type: 'line',
				name: allNames[i],
				data: dataLine[i],
				tooltip: {
					valuePrefix: "类指数：",
					valueSuffix: "%",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "AllIndex";
						parent = this.getName();//console.log(this.getName());
						redraw_chart();
					}
				},
				visible: visibility
			}, {
			// 解析柱状图数据
				type: 'column',
				yAxis: 1,
				name: allNames[i],
				data: dataColumn[i],
				tooltip: {
					valuePrefix: "销售额：",
					valueSuffix: "万元",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "AllIndex";
						parent = this.getName();//console.log(this.getName());
						redraw_chart();
					}
				},
				visible: visibility
			});
		}
	}

	//console.log(stock);

	Highcharts.stockChart('container00', {
			rangeSelector : {
					selected : 2,
					inputDateFormat: '%Y-%m-%d'
			},
			title : {
					text : '茶指数'
			},
			chart : {
				height : '80%', 
				spacingBottom: 15,
				backgroundColor: {
					linearGradient: [0, 0, 500, 500],
						stops: [
							[0, 'rgb(255, 255, 255)'],
							[1, 'rgb(240, 240, 255)']
						]
				}
			}, 
			yAxis : [{
				x: -3,
				title: {
					text: "指数"
				}, 
				labels: {
					align: "right", 
					x: -3
				}, 
				height: '65%',
				resize: {
					enabled: true
				},
				lineWidth: 2
			}, {
				title: {
					text: "销售额"
				}, 
				labels: {
					align: "right", 
					x: -3
				}, 
				top: '65%', 
				height: '35%', 
				offset: 0,
				lineWidth: 2,
				type: 'logarithmic'
			}],
			legend: {
				enabled: true, 
				layout: 'horizontal', 
				floating: false, 
				itemHoverStyle: {'color': 'blue'}, 
				itemWidth: 120, 
				width: 820,
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
			plotOptions : {
				line: {
					connectNulls: true, 
					gapSize: 5
				}, 
				series: {
					cursor: 'pointer', 
					showInNavigator: true, 
					events: {
						legendItemClick: function (event) {
							var same = this.name;
							//console.log(this.name);
							//console.log(this.userOptions.type);
							var legends = (this.userOptions.type=="line") ? 
								$('.highcharts-legend-item.highcharts-column-series') : 
								$('.highcharts-legend-item.highcharts-line-series');
							if (limitor)
								return true;
							for (var m=0;m<legends.length;m++) {
								//console.log(legends[m]);
								var found = legends.eq(m).find('tspan');
								//console.log(found[0].innerHTML);
								if (found[0].innerHTML==same) {
									limitor = true;
									legends.eq(m).click();
									limitor = false;
									break;
								}
							}
							return true;
						}
					}
				}
			},

			series : stock
	});
	$('.highcharts-legend-item.highcharts-column-series').attr("style","visibility: hidden;");
	//console.log(path);
}


$('#back').click(function(){
	switch (genre) {
		case "AllIndex":
			return;
		case "OneIndex":
			genre = "AllIndex";
			break;
		case "TwoIndex":
			parent = path["AllIndex"];
			genre = "OneIndex";
			break;
		case "ThreeIndex":
			parent = path["OneIndex"];
			genre = "TwoIndex";
			break;
		default:
			parent = path["TwoIndex"];
			genre = "ThreeIndex";
	}
	//console.log(parent);
	redraw_chart();
});

$('#display').click(function(){
	/*
	$.get("http://cccqqf.top:8081/test/get?class=0",function(data,status) {
		//console.log(data);
		jsondata["AllIndex"] = data;
		//console.log(jsondata);
		//redraw_chart();
	});
	*/
});

$('#showall').click(function() {
	stock = [];

	allNames = [];
	dataLine = [];
	dataColumn = [];
	dataEvent = [];

    
	for (var i=0;i<jsondata[genre].length;i++) {
		//console.log(jsondata[genre][i]);
		var thisName = "总计";//jsondata[genre][i]["name"];
		var keyName = "index_all";
		switch (genre) {
			case "AllIndex":
				keyName = "index_all";
				break;
			case "OneIndex":
				keyName = "index_one";
				thisName = jsondata[genre][i]["name"];
				break;
			case "TwoIndex":
				keyName = "index_two";
				thisName = jsondata[genre][i]["cityname"];
				break;
			case "ThreeIndex":
				keyName = "index_three";
				thisName = jsondata[genre][i]["teaname"];
				break;
			case "FourIndex":
				keyName = "index_four";
				thisName = jsondata[genre][i]["picking_standard"];
				break;
		}

		if (genre=="TwoIndex") {
			if (parent!=city[jsondata[genre][i]["belong2class_one"]])
				continue;
		}
		else if (genre=="ThreeIndex") {
			if (parent!=jsondata[genre][i]["cityname"])
				continue;
		}
		else if (genre=="FourIndex") {
			if (parent!=tea[jsondata[genre][i]["tea_id"]])
				continue;
		}

		var flag = -1;
		if (allNames.length!=0)
			for (var a=0;a<allNames.length;a++)
				if (allNames[a]==thisName)
					flag = a;
		if (flag==-1) {
			allNames.push(thisName);
			dataLine.push([]);
			dataColumn.push([]);
			dataEvent.push([]);
			flag = allNames.length-1;
			if (genre=="OneIndex") {
				city[jsondata[genre][i]["id"]] = thisName;
			}
			else if (genre=="ThreeIndex") {
				tea[jsondata[genre][i]["tea_id"]] = thisName;
			}
		}
		//console.log(flag);

		dataLine[flag].push([jsondata[genre][i]["date"],jsondata[genre][i][keyName]]);
		dataColumn[flag].push([jsondata[genre][i]["date"],jsondata[genre][i]["sales_money"]]);
	}


	//console.log(dataLine);
	//console.log(dataColumn);
	//console.log(stock);

	for (var i=0;i<allNames.length;i++) {
		if (genre=="AllIndex") {
			stock.push({
			// 解析折线图数据
				type: 'line',
				name: allNames[i],
				data: dataLine[i],
				tooltip: {
					valuePrefix: "类指数：",
					valueSuffix: "%",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "OneIndex";
						parent = this.getName();//console.log(this.getName());
						path["AllIndex"] = this.getName();
						redraw_chart();
					}
				}
			}, {
			// 解析柱状图数据
				type: 'column',
				yAxis: 1,
				name: allNames[i],
				data: dataColumn[i],
				tooltip: {
					valuePrefix: "销售额：",
					valueSuffix: "万元",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "OneIndex";
						parent = this.getName();//console.log(this.getName());
						path["AllIndex"] = this.getName();
						redraw_chart();
					}
				}
			});
		}
		else if (genre=="OneIndex") {
			stock.push({
			// 解析折线图数据
				type: 'line',
				name: allNames[i],
				data: dataLine[i],
				tooltip: {
					valuePrefix: "类指数：",
					valueSuffix: "%",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "TwoIndex";
						parent = this.getName();//console.log(this.getName());
						path["OneIndex"] = this.getName();
						redraw_chart();
					}
				}
			}, {
			// 解析柱状图数据
				type: 'column',
				yAxis: 1,
				name: allNames[i],
				data: dataColumn[i],
				tooltip: {
					valuePrefix: "销售额：",
					valueSuffix: "万元",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "TwoIndex";
						parent = this.getName();//console.log(this.getName());
						path["OneIndex"] = this.getName();
						redraw_chart();
					}
				}
			});
		}
		else if (genre=="TwoIndex") {
			stock.push({
			// 解析折线图数据
				type: 'line',
				name: allNames[i],
				data: dataLine[i],
				tooltip: {
					valuePrefix: "类指数：",
					valueSuffix: "%",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "ThreeIndex";
						parent = this.getName();//console.log(this.getName());
						path["TwoIndex"] = this.getName();
						redraw_chart();
					}
				}
			}, {
			// 解析柱状图数据
				type: 'column',
				yAxis: 1,
				name: allNames[i],
				data: dataColumn[i],
				tooltip: {
					valuePrefix: "销售额：",
					valueSuffix: "万元",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "ThreeIndex";
						parent = this.getName();//console.log(this.getName());
						path["TwoIndex"] = this.getName();
						redraw_chart();
					}
				}
			});
		}
		else if (genre=="ThreeIndex") {
			stock.push({
			// 解析折线图数据
				type: 'line',
				name: allNames[i],
				data: dataLine[i],
				tooltip: {
					valuePrefix: "类指数：",
					valueSuffix: "%",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "FourIndex";
						parent = this.getName();//console.log(this.getName());
						path["ThreeIndex"] = this.getName();
						redraw_chart();
					}
				}
			}, {
			// 解析柱状图数据
				type: 'column',
				yAxis: 1,
				name: allNames[i],
				data: dataColumn[i],
				tooltip: {
					valuePrefix: "销售额：",
					valueSuffix: "万元",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "FourIndex";
						parent = this.getName();//console.log(this.getName());
						path["ThreeIndex"] = this.getName();
						redraw_chart();
					}
				}
			});
		}
		else {
			stock.push({
			// 解析折线图数据
				type: 'line',
				name: allNames[i],
				data: dataLine[i],
				tooltip: {
					valuePrefix: "类指数：",
					valueSuffix: "%",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "AllIndex";
						parent = this.getName();//console.log(this.getName());
						redraw_chart();
					}
				}
			}, {
			// 解析柱状图数据
				type: 'column',
				yAxis: 1,
				name: allNames[i],
				data: dataColumn[i],
				tooltip: {
					valuePrefix: "销售额：",
					valueSuffix: "万元",
					xDateFormat: '%Y年%B%e日'
				},
				events: {
					click: function() {
						genre = "AllIndex";
						parent = this.getName();//console.log(this.getName());
						redraw_chart();
					}
				}
			});
		}
	}

	Highcharts.stockChart('container00', {
			rangeSelector : {
					selected : 2,
					inputDateFormat: '%Y-%m-%d'
			},
			title : {
					text : '茶指数'
			},
			chart : {
				height : '80%', 
				spacingBottom: 15,
				backgroundColor: {
					linearGradient: [0, 0, 500, 500],
						stops: [
							[0, 'rgb(255, 255, 255)'],
							[1, 'rgb(240, 240, 255)']
						]
				}
			}, 
			yAxis : [{
				x: -3,
				title: {
					text: "指数"
				}, 
				labels: {
					align: "right", 
					x: -3
				}, 
				height: '65%',
				resize: {
					enabled: true
				},
				lineWidth: 2
			}, {
				title: {
					text: "销售额"
				}, 
				labels: {
					align: "right", 
					x: -3
				}, 
				top: '65%', 
				height: '35%', 
				offset: 0,
				lineWidth: 2,
				type: 'logarithmic'
			}],
			legend: {
				enabled: true, 
				layout: 'horizontal', 
				floating: false, 
				itemHoverStyle: {'color': 'blue'}, 
				itemWidth: 120, 
				width: 820,
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
			plotOptions : {
				line: {
					connectNulls: true, 
					gapSize: 5
				}, 
				series: {
					cursor: 'pointer', 
					showInNavigator: true, 
					events: {
						legendItemClick: function (event) {
							var same = this.name;
							//console.log(this.name);
							//console.log(this.userOptions.type);
							var legends = (this.userOptions.type=="line") ? 
								$('.highcharts-legend-item.highcharts-column-series') : 
								$('.highcharts-legend-item.highcharts-line-series');
							if (limitor)
								return true;
							for (var m=0;m<legends.length;m++) {
								//console.log(legends[m]);
								var found = legends.eq(m).find('tspan');
								//console.log(found[0].innerHTML);
								if (found[0].innerHTML==same) {
									limitor = true;
									legends.eq(m).click();
									limitor = false;
									break;
								}
							}
							return true;
						}
					}
				}
			},

			series : stock
	});
	$('.highcharts-legend-item.highcharts-column-series').attr("style","visibility: hidden;");
});


console.log("Loading data from database...");

$.get("http://cccqqf.top:8081/test/get?class=0",function(data,status) {
	jsondata["AllIndex"] = data;
	console.log("Total data loaded successfully");
	redraw_chart();
	$.get("http://cccqqf.top:8081/test/get?class=1",function(data,status) {
		jsondata["OneIndex"] = data;
		console.log("First class loaded successfully");
		$.get("http://cccqqf.top:8081/test/get?class=2",function(data,status) {
			jsondata["TwoIndex"] = data;
			console.log("Second class loaded successfully");
			$.get("http://cccqqf.top:8081/test/get?class=3",function(data,status) {
				jsondata["ThreeIndex"] = data;
				console.log("Third class loaded successfully");
				$.get("http://cccqqf.top:8081/test/get?class=4",function(data,status) {
					jsondata["FourIndex"] = data;
					console.log("Fourth class loaded successfully");
					console.log("All data loaded successfully, feel free to check the chart");
				});
			});
		});
	});
});