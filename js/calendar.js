//封装一个获取id的函数
function $(id){
	return document.getElementById(id);
};
var timer = new Date();
    year = timer.getFullYear(),
    month = (timer.getMonth() + 1),
    day = timer.getDate();


//获取当前时间并显示
$("thisTime").innerHTML = year + "年" + month + "月" + day +"日";

$("year").innerHTML = year;
$("month").innerHTML = month;
$("day").innerHTML = day;

$("thisTime").onclick = function(){
	var rtimer = new Date();
    ryear = rtimer.getFullYear(),
    rmonth = (rtimer.getMonth() + 1),
    rday = rtimer.getDate();
	$("year").innerHTML = ryear;
	$("month").innerHTML = rmonth;
	$("day").innerHTML = rday;
	clearData();
	intitalTime (ryear,rmonth,rday);
}
//初始化日期列表
intitalTime (year,month,day);

function intitalTime (year,month,day){
	var firstDay = new Date(year,month-1,1);
	//获取每月前边空余的天数
	var firstBeforDay = parseInt(firstDay.getDay());
	//显示空余天数
	for (var i = 0;i<firstBeforDay-1;i++) {
		createTimeTable("");
	}
	//获取当前月份天数
	var monthDay = getMonthDays(year,month);
	//打印当月日历
	setMonthDays(monthDay,firstBeforDay-1);
	//添加周末样式
	addWeekendCss();
	//添加当天样式
	addTodayCss();
	//操作日期
	customOperate();
	//设置阴历日期
	showLunar(year,month,monthDay);
	//设置国际节日
	setInternationalFestival(month,monthDay);
}
function addTodayCss(){
	var toDay = $("day").innerHTML;
	var div = $("days").getElementsByTagName("div");
	for (var i = 0,len = div.length;i<len;i++) {
		if (div[i].innerHTML == toDay) {
			div[i].className += "myDay";
		}
	}
}
function addWeekendCss(){
	var dateLi = $("days").getElementsByTagName("li");
	var len=dateLi.length;
	for (var i = 1;i <= len;i++){
		//添加周末样式
		if ((i-6) % 7 == 0 || i % 7 == 0) {
			dateLi[i-1].className += "weekend ";
		}
	}
}

function createTimeTable(content){
	var li = document.createElement("li");
	li.id = "li" + content;
	li.className += "dateCss ";
	var div = document.createElement("div");
	div.id = content;
	div.innerHTML = content;
	$("days").appendChild(li).appendChild(div);

}
function getMonthDays(year,month){
	if (month == 4 || month == 6 || month == 9 || month == 11 || month == 30) {
		return 30;
	};
	if (month == 2) {
		var dayNum = year % 4 == 0 ? 29 : 28;
		return dayNum;
	}
	return 31;
}
function setMonthDays(monthDay,firstBeforDay){
	for (var i = 1;i<monthDay+1;i++) {
		createTimeTable(i);
	}
}

//点击三角按钮切换年月
$("year-big").onclick = function(){
	year > 2020 ?"":year++;
	$("year").innerHTML = year;
	//清除上一次操作数据
	clearData();
	intitalTime (year,month,day);
}
$("year-small").onclick = function(){
	year < 1921 ? "":year--;
	$("year").innerHTML = year;
	clearData();
	intitalTime (year,month,day);
}
$("month-big").onclick = function(){
	month < 12 ? month++ : 1 ;
	$("month").innerHTML = month;
	clearData();
	intitalTime (year,month,day);
	
}
$("month-small").onclick = function(){
	month > 1 ? month-- : 12 ;
	$("month").innerHTML = month;
	clearData();
	intitalTime (year,month,day);
}

function clearData(){
	$("days").innerHTML = "";
}
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}
function customOperate(){
	//点击日期显示用户浏览日期
	var dateLi = $("days").getElementsByTagName("div");
	var len=dateLi.length;
	for (var i = 0;i<len;i++) {
		dateLi[i].onclick = function (){
			for (var j = 0;j<len;j++) {
				removeClass(dateLi[j],"myDay");
			}
			var thisDate = this.innerHTML;
			$("day").innerHTML = thisDate;
			this.className += "myDay";
		}
	}

}



