//添加阴历
var nStr1 = new Array('初','十','廿','三');
var nStr2 = new Array('一','二','三','四','五','六','七','八','九','十','十一','十二');

var CalendarData = new Array(100);
//来自网络素材
// 农历每月只能是29或30天，一年用12(或13)个二进制位表示，从高到低，对应位为1表示30天，否则29天
CalendarData = new Array(0xA4B,0x5164B,0x6A5,0x6D4,0x415B5,0x2B6,0x957,0x2092F,0x497,0x60C96,0xD4A,0xEA5,0x50DA9,0x5AD,
 
0x2B6,0x3126E, 0x92E,0x7192D,0xC95,0xD4A,0x61B4A,0xB55,0x56A,0x4155B, 0x25D,0x92D,0x2192B,0xA95,0x71695,0x6CA,
 
0xB55,0x50AB5,0x4DA,0xA5B,0x30A57,0x52B,0x8152A,0xE95,0x6AA,0x615AA,0xAB5,0x4B6,0x414AE,0xA57,0x526,0x31D26,0xD95,
 
0x70B55,0x56A,0x96D,0x5095D,0x4AD,0xA4D,0x41A4D,0xD25,0x81AA5,0xB54,0xB6A,0x612DA,0x95B,0x49B,0x41497,0xA4B,0xA164B,
 
0x6A5,0x6D4,0x615B4,0xAB6,0x957,0x5092F,0x497,0x64B, 0x30D4A,0xEA5,0x80D65,0x5AC,0xAB6,0x5126D,0x92E,0xC96,0x41A95,
 
0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B, 0x60A57,0x52B,
 
0xA93,0x40E95);

function showLunar(year,month,monthDay){
	//计算阴历日期
	caculateLunar(year,month,monthDay);
};

function caculateLunar(year,month,monthDay){
	var farDate = new Array(0,31,59,90,120,151,181,212,243,273,304,334);
	//获取当前年份与基年的相差天数
    var total=(year-1921)*365+Math.floor((year-1921)/4)+farDate[month-1]-38;
	var disYear,monthNum,k;
	var isEnd=false;
	//判断当前年份是否为闰年
	if( year % 4 == 0) {
		total++;
	}
	for(disYear=0;;disYear++){
		k = ( CalendarData[disYear] < 0xfff )?11:12;
		for(monthNum=k;monthNum>=0;monthNum--){ 
			if(total<=29+GetBit(CalendarData[disYear],monthNum)){
				isEnd=true; break;
			}	 
			total=total-29-GetBit(CalendarData[disYear],monthNum);
		}
		if(isEnd) break;
	} 
	var cYear=1921 + disYear;
	var cMonth= k-monthNum+1;
	var cDay = total;
	if(k==12){
	if(cMonth==Math.floor(CalendarData[disYear]/0x10000)+1){ 
		cMonth=1-cMonth;
	}
	if(cMonth>Math.floor(CalendarData[disYear]/0x10000)+1){
		cMonth--;
	}
	 
	}
	console.log(cYear,cMonth,cDay);
	//获取当月阴历天数
	var lmonthDay = getLunarMonthDate(disYear,cMonth);
	//显示阴历日期
	showLunarDate(disYear,cMonth,cDay,lmonthDay,monthDay);
	//显示节气
	setSolarTerms(cYear,cMonth,cDay,lmonthDay,monthDay,0);
	//显示农历节日
	setLunarFestival(cMonth,cDay,lmonthDay,monthDay);
}

function showLunarDate(disYear,cMonth,cDay,lmonthDay,monthDay){
	for (var i=0;i<monthDay;i++) {
		if (cDay > lmonthDay-1) {
			cDay = 0;
			cMonth++;
		}
		//创建农历表
		var content = createLunarTabe(cMonth-1,cDay);
		appendLunar(content,i+1);
		cDay++;
	}

}

function appendLunar(content,id){

	var fest = document.createElement("span");
	fest.innerHTML = content;
	fest.id = "lunar"+id;
	fest.className += "festival";
	$("li"+id).appendChild(fest);
}
function createLunarTabe(cMonth,cDay){

	var str = [];

	switch (cDay){
		case 0:
		if(cMonth == 12){
			str = "除夕";
		}else{
			str = nStr2[cMonth] + "月"
		};
		break;
		case 9:str = "初十";break;
		case 19:str = "二十";break;
		case 29:str = "三十";break;
		default:
		str = nStr1[Math.floor(cDay/10)];
		str += nStr2[cDay%10];
	}
	
	return str;
}
function getLunarMonthDate(disyear,cMonth){
	return GetBit(CalendarData[disyear],cMonth) == 0 ? 29:30;
}
function GetBit(m,n){
	return (m>>n)&1;
}