var jsondata = {
	"AllIndex":[],
	"OneIndex":[],
	"TwoIndex":[],
	"ThreeIndex":[],
	"FourIndex":[]
};
var jsondataWeek = {
	"AllIndex":[],
	"OneIndex":[],
	"TwoIndex":[],
	"ThreeIndex":[],
	"FourIndex":[]
};
var jsondataMonth = {
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
			inputDateFormat: '%Y-%m-%d',
			buttons: [
				{
					type: 'week',
					count: 1,
					text: '1w'
				}, {
					type: 'month',
					count: 1,
					text: '1m'
				}, {
					type: 'month',
					count: 3,
					text: '3m'
				}, {
					type: 'month',
					count: 6,
					text: '6m'
				}, {
					type: 'ytd',
					text: 'YTD'
				}, {
					type: 'year',
					count: 1,
					text: '1y'
				}, {
					type: 'all',
					text: 'All'
				}
			]
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
			lineWidth: 1,
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


	if (label2=="DayIndex") {
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "OneIndex";
							parent = this.getName();//console.log(this.getName());
							path["AllIndex"] = "AllIndex";
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "TwoIndex";
							parent = this.getName();//console.log(this.getName());
							path["OneIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "ThreeIndex";
							parent = this.getName();//console.log(this.getName());
							path["TwoIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "FourIndex";
							parent = this.getName();//console.log(this.getName());
							path["ThreeIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "AllIndex";
							parent = this.getName();//console.log(this.getName());
							try{redraw_chart();}catch(error){}
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
						inputDateFormat: '%Y-%m-%d',
						buttons: [
								{
									type: 'week',
									count: 1,
									text: '1w'
								}, {
									type: 'month',
									count: 1,
									text: '1m'
								}, {
									type: 'month',
									count: 3,
									text: '3m'
								}, {
									type: 'month',
									count: 6,
									text: '6m'
								}, {
									type: 'ytd',
									text: 'YTD'
								}, {
									type: 'year',
									count: 1,
									text: '1y'
								}, {
									type: 'all',
									text: 'All'
								}
							]
				},
				exporting : {
					allowHTML: true
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
						lineWidth: 1,
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

	else if (label2=="WeekIndex") {
		var weekNumber = [];
		if (jsondataWeek[genre].length==0) {
			wait();
		}
		for (var i=0;i<jsondataWeek[genre].length;i++) {
			//console.log(jsondataWeek[genre][i]);
			var thisName = "总计";//jsondataWeek[genre][i]["name"];
			var keyName = "index_all";
			switch (genre) {
				case "AllIndex":
					keyName = "index_all";
					break;
				case "OneIndex":
					keyName = "index_one";
					thisName = jsondataWeek[genre][i]["name"];
					break;
				case "TwoIndex":
					keyName = "index_two";
					thisName = jsondataWeek[genre][i]["cityname"];
					break;
				case "ThreeIndex":
					keyName = "index_three";
					thisName = jsondataWeek[genre][i]["teaname"];
					break;
				case "FourIndex":
					keyName = "index_four";
					thisName = jsondataWeek[genre][i]["picking_standard"];
					break;
			}

			if (genre=="TwoIndex") {
				if (parent!=city[jsondataWeek[genre][i]["belong2class_one"]])
					continue;
			}
			else if (genre=="ThreeIndex") {
				if (parent!=jsondataWeek[genre][i]["cityname"])
					continue;
			}
			else if (genre=="FourIndex") {
				if (parent!=tea[jsondataWeek[genre][i]["tea_id"]])
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
					city[jsondataWeek[genre][i]["id"]] = thisName;
				}
				else if (genre=="ThreeIndex") {
					tea[jsondataWeek[genre][i]["tea_id"]] = thisName;
				}
			}
			//console.log(flag);
			var UnixTime = 1515079180800 + (jsondataWeek[genre][i]["year"] - 2018) * 31536000000
							+ jsondataWeek[genre][i]["week"] * 604800000;
			//1515079180800
			dataLine[flag].push([UnixTime,jsondataWeek[genre][i][keyName]]);
			dataColumn[flag].push([UnixTime,jsondataWeek[genre][i]["sales_money"]]);
			weekNumber.push(jsondataWeek[genre][i]["week"]);
			//console.log("weekNumber["+(weekNumber.length-1)+"] = "+jsondataWeek[genre][i]["week"]);
		}

		//console.log(dataLine);
		//console.log(dataColumn);
		//console.log(stock);
		//console.log(weekNumber);

		for (var i=0;i<allNames.length;i++) {
			if (genre=="AllIndex") {
				var weekNum = weekNumber[i];
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "OneIndex";
							parent = this.getName();//console.log(this.getName());
							path["AllIndex"] = "AllIndex";
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "TwoIndex";
							parent = this.getName();//console.log(this.getName());
							path["OneIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "ThreeIndex";
							parent = this.getName();//console.log(this.getName());
							path["TwoIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "FourIndex";
							parent = this.getName();//console.log(this.getName());
							path["ThreeIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "AllIndex";
							parent = this.getName();//console.log(this.getName());
							try{redraw_chart();}catch(error){}
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
						inputDateFormat: '%Y-%m',
						buttons: [
							{
								type: 'month',
								count: 3,
								text: '3m'
							}, {
								type: 'month',
								count: 6,
								text: '6m'
							}, {
								type: 'ytd',
								text: 'YTD'
							}, {
								type: 'year',
								count: 1,
								text: '1y'
							}, {
								type: 'all',
								text: 'All'
							}
						]
				},
				exporting : {
					allowHTML: true
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
						lineWidth: 1,
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

	else if (label2=="MonthIndex") {
		if (jsondataMonth[genre].length==0) {
			wait();
		}

		for (var i=0;i<jsondataMonth[genre].length;i++) {
			//console.log(jsondataMonth[genre][i]);
			var thisName = "总计";//jsondataMonth[genre][i]["name"];
			var keyName = "index_all";
			switch (genre) {
				case "AllIndex":
					keyName = "index_all";
					break;
				case "OneIndex":
					keyName = "index_one";
					thisName = jsondataMonth[genre][i]["name"];
					break;
				case "TwoIndex":
					keyName = "index_two";
					thisName = jsondataMonth[genre][i]["cityname"];
					break;
				case "ThreeIndex":
					keyName = "index_three";
					thisName = jsondataMonth[genre][i]["teaname"];
					break;
				case "FourIndex":
					keyName = "index_four";
					thisName = jsondataMonth[genre][i]["picking_standard"];
					break;
			}

			if (genre=="TwoIndex") {
				if (parent!=city[jsondataMonth[genre][i]["belong2class_one"]])
					continue;
			}
			else if (genre=="ThreeIndex") {
				if (parent!=jsondataMonth[genre][i]["cityname"])
					continue;
			}
			else if (genre=="FourIndex") {
				if (parent!=tea[jsondataMonth[genre][i]["tea_id"]])
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
					city[jsondataMonth[genre][i]["id"]] = thisName;
				}
				else if (genre=="ThreeIndex") {
					tea[jsondataMonth[genre][i]["tea_id"]] = thisName;
				}
			}
			//console.log(flag);

			var UnixTime = 1513351180800 + (jsondataMonth[genre][i]["year"] - 2018) * 31536000000
							+ jsondataMonth[genre][i]["month"] * 2628000000;
			//1513351180800
			dataLine[flag].push([UnixTime,jsondataMonth[genre][i][keyName]]);
			dataColumn[flag].push([UnixTime,jsondataMonth[genre][i]["sales_money"]]);
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
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "OneIndex";
							parent = this.getName();//console.log(this.getName());
							path["AllIndex"] = "AllIndex";
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "OneIndex";
							parent = this.getName();//console.log(this.getName());
							path["AllIndex"] = "AllIndex";
							try{redraw_chart();}catch(error){}
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
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "TwoIndex";
							parent = this.getName();//console.log(this.getName());
							path["OneIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "TwoIndex";
							parent = this.getName();//console.log(this.getName());
							path["OneIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "ThreeIndex";
							parent = this.getName();//console.log(this.getName());
							path["TwoIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "ThreeIndex";
							parent = this.getName();//console.log(this.getName());
							path["TwoIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "FourIndex";
							parent = this.getName();//console.log(this.getName());
							path["ThreeIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "FourIndex";
							parent = this.getName();//console.log(this.getName());
							path["ThreeIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "AllIndex";
							parent = this.getName();//console.log(this.getName());
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "AllIndex";
							parent = this.getName();//console.log(this.getName());
							try{redraw_chart();}catch(error){}
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
						inputDateFormat: '%Y-%m',
						buttons: [
								{
									type: 'month',
									count: 6,
									text: '6m'
								}, {
									type: 'ytd',
									text: 'YTD'
								}, {
									type: 'year',
									count: 1,
									text: '1y'
								}, {
									type: 'all',
									text: 'All'
								}
							]
				},
				exporting : {
					allowHTML: true
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
						lineWidth: 1,
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
	try{redraw_chart();}catch(error){}
});

$('#display').click(function(){
	/*
	$.get("http://cccqqf.top:8081/test/get?class=0",function(data,status) {
		//console.log(data);
		jsondata["AllIndex"] = data;
		//console.log(jsondata);
		//try{redraw_chart();}catch(error){}
	});
	*/
});

$('#showall').click(function() {
	stock = [];

	allNames = [];
	dataLine = [];
	dataColumn = [];
	dataEvent = [];


	if (label2=="DayIndex") {
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "OneIndex";
							parent = this.getName();//console.log(this.getName());
							path["AllIndex"] = "AllIndex";
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "TwoIndex";
							parent = this.getName();//console.log(this.getName());
							path["OneIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "ThreeIndex";
							parent = this.getName();//console.log(this.getName());
							path["TwoIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "FourIndex";
							parent = this.getName();//console.log(this.getName());
							path["ThreeIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "AllIndex";
							parent = this.getName();//console.log(this.getName());
							try{redraw_chart();}catch(error){}
						}
					}
				});
			}
		}

		//console.log(stock);

		Highcharts.stockChart('container00', {
				rangeSelector : {
						selected : 2,
						inputDateFormat: '%Y-%m-%d',
						buttons: [
								{
									type: 'week',
									count: 1,
									text: '1w'
								}, {
									type: 'month',
									count: 1,
									text: '1m'
								}, {
									type: 'month',
									count: 3,
									text: '3m'
								}, {
									type: 'month',
									count: 6,
									text: '6m'
								}, {
									type: 'ytd',
									text: 'YTD'
								}, {
									type: 'year',
									count: 1,
									text: '1y'
								}, {
									type: 'all',
									text: 'All'
								}
							]
				},
				exporting : {
					allowHTML: true
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
						lineWidth: 1,
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

	else if (label2=="WeekIndex") {
		var weekNumber = [];
		if (jsondataWeek[genre].length==0) {
			wait();
		}
		for (var i=0;i<jsondataWeek[genre].length;i++) {
			//console.log(jsondataWeek[genre][i]);
			var thisName = "总计";//jsondataWeek[genre][i]["name"];
			var keyName = "index_all";
			switch (genre) {
				case "AllIndex":
					keyName = "index_all";
					break;
				case "OneIndex":
					keyName = "index_one";
					thisName = jsondataWeek[genre][i]["name"];
					break;
				case "TwoIndex":
					keyName = "index_two";
					thisName = jsondataWeek[genre][i]["cityname"];
					break;
				case "ThreeIndex":
					keyName = "index_three";
					thisName = jsondataWeek[genre][i]["teaname"];
					break;
				case "FourIndex":
					keyName = "index_four";
					thisName = jsondataWeek[genre][i]["picking_standard"];
					break;
			}

			if (genre=="TwoIndex") {
				if (parent!=city[jsondataWeek[genre][i]["belong2class_one"]])
					continue;
			}
			else if (genre=="ThreeIndex") {
				if (parent!=jsondataWeek[genre][i]["cityname"])
					continue;
			}
			else if (genre=="FourIndex") {
				if (parent!=tea[jsondataWeek[genre][i]["tea_id"]])
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
					city[jsondataWeek[genre][i]["id"]] = thisName;
				}
				else if (genre=="ThreeIndex") {
					tea[jsondataWeek[genre][i]["tea_id"]] = thisName;
				}
			}
			//console.log(flag);
			var UnixTime = 1515079180800 + (jsondataWeek[genre][i]["year"] - 2018) * 31536000000
							+ jsondataWeek[genre][i]["week"] * 604800000;
			//1515079180800
			dataLine[flag].push([UnixTime,jsondataWeek[genre][i][keyName]]);
			dataColumn[flag].push([UnixTime,jsondataWeek[genre][i]["sales_money"]]);
			weekNumber.push({UnixTime: jsondataWeek[genre][i]["week"]});
			//console.log("weekNumber["+(weekNumber.length-1)+"] = "+jsondataWeek[genre][i]["week"]);
		}

		//console.log(dataLine);
		//console.log(dataColumn);
		//console.log(stock);
		//console.log(weekNumber);

		for (var i=0;i<allNames.length;i++) {
			if (genre=="AllIndex") {
				var weekNum = weekNumber[i];
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "OneIndex";
							parent = this.getName();//console.log(this.getName());
							path["AllIndex"] = "AllIndex";
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "TwoIndex";
							parent = this.getName();//console.log(this.getName());
							path["OneIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "ThreeIndex";
							parent = this.getName();//console.log(this.getName());
							path["TwoIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "FourIndex";
							parent = this.getName();//console.log(this.getName());
							path["ThreeIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B%e日'
					},
					events: {
						click: function() {
							genre = "AllIndex";
							parent = this.getName();//console.log(this.getName());
							try{redraw_chart();}catch(error){}
						}
					}
				});
			}
		}

		//console.log(stock);

		Highcharts.stockChart('container00', {
				rangeSelector : {
						selected : 2,
						inputDateFormat: '%Y-%m',
						buttons: [
							{
								type: 'month',
								count: 3,
								text: '3m'
							}, {
								type: 'month',
								count: 6,
								text: '6m'
							}, {
								type: 'ytd',
								text: 'YTD'
							}, {
								type: 'year',
								count: 1,
								text: '1y'
							}, {
								type: 'all',
								text: 'All'
							}
						]
				},
				exporting : {
					allowHTML: true
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
						lineWidth: 1,
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

	else if (label2=="MonthIndex") {
		if (jsondataMonth[genre].length==0) {
			wait();
		}

		for (var i=0;i<jsondataMonth[genre].length;i++) {
			//console.log(jsondataMonth[genre][i]);
			var thisName = "总计";//jsondataMonth[genre][i]["name"];
			var keyName = "index_all";
			switch (genre) {
				case "AllIndex":
					keyName = "index_all";
					break;
				case "OneIndex":
					keyName = "index_one";
					thisName = jsondataMonth[genre][i]["name"];
					break;
				case "TwoIndex":
					keyName = "index_two";
					thisName = jsondataMonth[genre][i]["cityname"];
					break;
				case "ThreeIndex":
					keyName = "index_three";
					thisName = jsondataMonth[genre][i]["teaname"];
					break;
				case "FourIndex":
					keyName = "index_four";
					thisName = jsondataMonth[genre][i]["picking_standard"];
					break;
			}

			if (genre=="TwoIndex") {
				if (parent!=city[jsondataMonth[genre][i]["belong2class_one"]])
					continue;
			}
			else if (genre=="ThreeIndex") {
				if (parent!=jsondataMonth[genre][i]["cityname"])
					continue;
			}
			else if (genre=="FourIndex") {
				if (parent!=tea[jsondataMonth[genre][i]["tea_id"]])
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
					city[jsondataMonth[genre][i]["id"]] = thisName;
				}
				else if (genre=="ThreeIndex") {
					tea[jsondataMonth[genre][i]["tea_id"]] = thisName;
				}
			}
			//console.log(flag);

			var UnixTime = 1513351180800 + (jsondataMonth[genre][i]["year"] - 2018) * 31536000000
							+ jsondataMonth[genre][i]["month"] * 2628000000;
			//1513351180800
			dataLine[flag].push([UnixTime,jsondataMonth[genre][i][keyName]]);
			dataColumn[flag].push([UnixTime,jsondataMonth[genre][i]["sales_money"]]);
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
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "OneIndex";
							parent = this.getName();//console.log(this.getName());
							path["AllIndex"] = "AllIndex";
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "OneIndex";
							parent = this.getName();//console.log(this.getName());
							path["AllIndex"] = "AllIndex";
							try{redraw_chart();}catch(error){}
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
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "TwoIndex";
							parent = this.getName();//console.log(this.getName());
							path["OneIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "TwoIndex";
							parent = this.getName();//console.log(this.getName());
							path["OneIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "ThreeIndex";
							parent = this.getName();//console.log(this.getName());
							path["TwoIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "ThreeIndex";
							parent = this.getName();//console.log(this.getName());
							path["TwoIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "FourIndex";
							parent = this.getName();//console.log(this.getName());
							path["ThreeIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "FourIndex";
							parent = this.getName();//console.log(this.getName());
							path["ThreeIndex"] = this.getName();
							try{redraw_chart();}catch(error){}
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
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "AllIndex";
							parent = this.getName();//console.log(this.getName());
							try{redraw_chart();}catch(error){}
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
						valueSuffix: "元",
						xDateFormat: '%Y年%B'
					},
					events: {
						click: function() {
							genre = "AllIndex";
							parent = this.getName();//console.log(this.getName());
							try{redraw_chart();}catch(error){}
						}
					}
				});
			}
		}

		//console.log(stock);

		Highcharts.stockChart('container00', {
				rangeSelector : {
						selected : 2,
						inputDateFormat: '%Y-%m',
						buttons: [
								{
									type: 'month',
									count: 6,
									text: '6m'
								}, {
									type: 'ytd',
									text: 'YTD'
								}, {
									type: 'year',
									count: 1,
									text: '1y'
								}, {
									type: 'all',
									text: 'All'
								}
							]
				},
				exporting : {
					allowHTML: true
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
						lineWidth: 1,
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
	
});



loadDayIndex();



function loadDayIndex() {
	console.log("◇【日指数】 正在访问数据库...◇");
	$.get("http://cccqqf.top:8081/test/get?class=0",function(data,status) {
		jsondata["AllIndex"] = data;
		console.log("【日指数】 总指数加载成功");
		try{redraw_chart();}catch(error){}
		$.get("http://cccqqf.top:8081/test/get?class=1",function(data,status) {
			jsondata["OneIndex"] = data;
			console.log("【日指数】 一级类别加载成功");
			$.get("http://cccqqf.top:8081/test/get?class=2",function(data,status) {
				jsondata["TwoIndex"] = data;
				console.log("【日指数】 二级类别加载成功");
				$.get("http://cccqqf.top:8081/test/get?class=3",function(data,status) {
					jsondata["ThreeIndex"] = data;
					console.log("【日指数】 三级类别加载成功");
					$.get("http://cccqqf.top:8081/test/get?class=4",function(data,status) {
						jsondata["FourIndex"] = data;
						console.log("【日指数】 四级类别加载成功");
						console.log("◇【日指数】 加载完成！◇");
						if (jsondataWeek["AllIndex"].length==0) {
							loadWeekIndex();
						}
					});
				});
			});
		});
	});
}

function loadWeekIndex() {
	console.log("◇【周指数】 正在访问数据库...◇");
	$.get("http://www.cccqqf.top:8081/test/get/MonOrWeek?class=0&type=0",function(data,status) {
		jsondataWeek["AllIndex"] = data;
		console.log("【周指数】 总指数加载成功");
		$.get("http://www.cccqqf.top:8081/test/get/MonOrWeek?class=1&type=0",function(data,status) {
			jsondataWeek["OneIndex"] = data;
			console.log("【周指数】 一级类别加载成功");
			$.get("http://www.cccqqf.top:8081/test/get/MonOrWeek?class=2&type=0",function(data,status) {
				jsondataWeek["TwoIndex"] = data;
				console.log("【周指数】 二级类别加载成功");
				$.get("http://www.cccqqf.top:8081/test/get/MonOrWeek?class=3&type=0",function(data,status) {
					jsondataWeek["ThreeIndex"] = data;
					console.log("【周指数】 三级类别加载成功");
					$.get("http://www.cccqqf.top:8081/test/get/MonOrWeek?class=4&type=0",function(data,status) {
						jsondataWeek["FourIndex"] = data;
						console.log("【周指数】 四级类别加载成功");
						console.log("◇【周指数】 加载完成！◇");
						if (jsondataMonth["AllIndex"].length==0) {
							loadMonthIndex();
						}
					});
				});
			});
		});
	});
}

function loadMonthIndex() {
	console.log("◇【月指数】 正在访问数据库...◇");
	$.get("http://www.cccqqf.top:8081/test/get/MonOrWeek?class=0&type=1",function(data,status) {
		jsondataMonth["AllIndex"] = data;
		console.log("【月指数】 总指数加载成功");
		$.get("http://www.cccqqf.top:8081/test/get/MonOrWeek?class=1&type=1",function(data,status) {
			jsondataMonth["OneIndex"] = data;
			console.log("【月指数】 一级类别加载成功");
			$.get("http://www.cccqqf.top:8081/test/get/MonOrWeek?class=2&type=1",function(data,status) {
				jsondataMonth["TwoIndex"] = data;
				console.log("【月指数】 二级类别加载成功");
				$.get("http://www.cccqqf.top:8081/test/get/MonOrWeek?class=3&type=1",function(data,status) {
					jsondataMonth["ThreeIndex"] = data;
					console.log("【月指数】 三级类别加载成功");
					$.get("http://www.cccqqf.top:8081/test/get/MonOrWeek?class=4&type=1",function(data,status) {
						jsondataMonth["FourIndex"] = data;
						console.log("【月指数】 四级类别加载成功");
						console.log("◇【月指数】 加载完成！◇");
					});
				});
			});
		});
	});
}
 

$('#slc20').click(function() {
	if (label2 == "DayIndex")
		return;
	label2 = "DayIndex";
	$('#slc2').text("日指数");
	try{redraw_chart();}catch(error){}
});

$('#slc21').click(function() {
	if (label2 == "WeekIndex")
		return;
	label2 = "WeekIndex";
	$('#slc2').text("周指数");
	if (jsondataWeek["AllIndex"].length==0) {
		try{redraw_chart();}catch(error){}
		loadWeekIndex();
	}
	try{redraw_chart();}catch(error){}
});

$('#slc22').click(function() {
	if (label2 == "MonthIndex")
		return;
	label2 = "MonthIndex";
	$('#slc2').text("月指数");
	if (jsondataMonth["AllIndex"].length==0) {
		try{redraw_chart();}catch(error){}
		loadMonthIndex();
	}
	try{redraw_chart();}catch(error){}
});

var here;

function output() {
	try {
		if (label2!="WeekIndex")
			return;
		here = d3.select("#chart").select("#container00").select(".highcharts-container").select("svg")
					.select(".highcharts-tooltip").select("text").select("tspan");
		if ((here.html()).indexOf("月")==-1)
			return;
		var monthD = 0;
		for (var i=0;i<parseInt(here.html().slice(5,(here.html()).indexOf("月")));i++)
			monthD += monthDay[i];
		monthD += parseInt(here.html().slice((here.html()).indexOf("月")+1,(here.html()).indexOf("日")));
		here.html(parseInt(here.html().slice(0,5))+"年 第 "+parseInt(monthD/7)+" 周");
	}
	catch (error) {}
}
setInterval("output()",30);

var monthDay = [0,31,28,31,30,31,30,31,31,30,31,30,31];