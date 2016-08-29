
function setInternationalFestival(month,dayNum){
	//设置国际节日
	var wFtv = [
		{val:"11",festival:"元旦"},
		{val:"214",festival:"情人节"},
		{val:"38",festival:"妇女节"},
		{val:"312",festival:"植树节"},
		{val:"41",festival:"愚人节"},
		{val:"51",festival:"劳动节"},
		{val:"54",festival:"青年节"},
		{val:"61",festival:"儿童节"},
		{val:"71",festival:"建党节"},
		{val:"81",festival:"建军节"},
		{val:"910",festival:"教师节"},
		{val:"101",festival:"国庆节"},
		{val:"1225",festival:"圣诞节"}
	];
	var result = [];
	for (var j in wFtv){
		for (var i = 0 ;i<dayNum;i++) {
			result[i] = month.toString() + i.toString();
			if (result[i] == wFtv[j].val) {
				appendFestival(wFtv[j].festival,i);
			}
		}
	}
}

function appendFestival(content,id){
	//删除阴历添加节日
	var lunar = $("lunar"+id);
	$("li"+id).removeChild(lunar);
	var fest = document.createElement("span");
	fest.innerHTML = content;
	fest.className += "festival";
	$("li"+id).appendChild(fest);
}

//来自网络素材
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);

//返回某年的第n个节气为几日(从0小寒起算)
function sTerm(y,n) {
   var offDate = new Date((31556925974.7*(y-1900)+sTermInfo[n]*60000)+Date.UTC(1900,0,6,2,5));
   return (offDate.getUTCDate());
}
function setSolarTerms(cYear,cMonth,cDay,lmonthDay,wmonthDay,reset){
	var solarTerms = []; //节气
	if (cMonth == 12){cMonth = 0;};
	var tmp1=sTerm(cYear,cMonth*2)-1;
    var tmp2=sTerm(cYear,cMonth*2+1)-1;
    solarTerms[tmp1] = solarTerm[cMonth*2];
    solarTerms[tmp2] = solarTerm[cMonth*2+1];
    var isEnd = false;
    console.log(cYear,cMonth,cDay,lmonthDay,wmonthDay);
    for (var i = reset;i<wmonthDay;i++){
    	if ( cDay< lmonthDay) {
    		if (cDay == tmp1) {
    			appendFestival(solarTerms[tmp1],i);
    		}
    		if (cDay == tmp2) {
    			appendFestival(solarTerms[tmp2],i);
    		}
    		cDay++;
    	}else{
    		cDay = 0;
    		cMonth == 12 ? cMonth = 1 : cMonth++;
    		setSolarTerms(cYear,cMonth,cDay,lmonthDay,wmonthDay,i);
    		isEnd = true;
    	}
    	if (isEnd) break;
    }
}
function setLunarFestival(cMonth,cDay,lmonthDay,wmonthDay){	
	var lFtv = [
		{val:"11",fst:"春节"},
		{val:"115",fst:"元宵节"},
		{val:"55",fst:"端午节"},
		{val:"77",fst:"七夕"},
		{val:"815",fst:"中秋节"},
		{val:"99",fst:"重阳节"},
		{val:"128",fst:"腊八节"},
		{val:"1224",fst:"小年"}
	];
	var str = [];
	var i,j;
	var k = 0;
	var result = cMonth;
	while ( k < wmonthDay){
		for (var i=cDay;i<lmonthDay;i++) {
			str[i] = cMonth.toString() + i.toString();
			for (j in lFtv){
				if (str[i] == lFtv[j].val) {
					appendFestival(lFtv[j].fst,k);
				}
			}
			k++;
		}
		if (cMonth == 12){
			cDay = 0;
			cMonth = 1;
		}

		if (i > lmonthDay-1 && cMonth!= 12 && cMonth == result) {
			cDay = 0;
			cMonth++;
		}
	}

}
