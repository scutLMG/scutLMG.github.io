const { Octokit } = require("@octokit/rest");
var month_olypic = [31,29,31,30,31,30,31,31,30,31,30,31];//闰年每个月份的天数
var month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
var month_name =["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
//获取以上各个部分的id
var holder = document.getElementById("days");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var sign = document.getElementById("sign");
var ctitle = document.getElementById("calendar-title");
var cyear = document.getElementById("calendar-year");
//获取当天的年月日
var my_date = new Date();
var my_year = my_date.getFullYear();//获取年份
var my_month = my_date.getMonth(); //获取月份，一月份的下标为0
var my_day = my_date.getDate();//获取当前日期
//根据年月获取当月第一天是周几
function dayStart(month,year){
    var tmpDate = new Date(year, month, 1);
    return (tmpDate.getDay());
}
//根据年份判断某月有多少天(11,2018),表示2018年12月
function daysMonth(month, year){
    var tmp1 = year % 4;
    var tmp2 = year % 100;
    var tmp3 = year % 400;
    if((tmp1 == 0 && tmp2 != 0) || (tmp3 == 0)){
        return (month_olypic[month]);//闰年
    }else{
        return (month_normal[month]);//非闰年
    }
}
var url = "https://api.github.com/repos/scutLMG/selfTalk_db/issues/2/comments";
function ajax(url){
    return new Promise(function(resolve,reject){
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        
        req.onload = function(){
            if(req.status === 200){
                var json = JSON.parse(req.responseText);
                var raw = json[json.length-1].body;
                resolve(raw);
            }else{
                var empty = 0;
                reject(empty);
            }
        };
        req.send(null);

    });
}
ajax(url).then(function(json){
    refreshDate(json);
}).catch(function(jsonZ){
    refreshDate(jsonZ);
});
//从github获得签到的数据。
// function getsignday(){
// 	var url = "https://api.github.com/repos/scutLMG/selfTalk_db/issues/2/comments";
// 	var request = new XMLHttpRequest();
//     request.open("get", url);/*设置请求方法与路径*/
//     request.send(null);/*不发送数据到服务器*/
//     request.onload = function () {
//         if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
//             var json = JSON.parse(request.responseText);
//             var raw = json[json.length-1].body;
// 			signdayin = raw.split(/,/);
// 			console.log(signdayin);
// 			return(signdayin);
// 		}
// 	}
// }
//js实现str插入li+class,不要忘了用innerhtml进行插入
function refreshDate(j){
	// console.log(j);
	// console.log(typeof(j));
	if (typeof(j)=='string'){
		var signday = j.split(/,/);
	}else{
		var signday = 0;
	}
	var myclass;
    var str = "";
    //计算当月的天数和每月第一天都是周几，day_month和day_year都从上面获得
    var totalDay = daysMonth(my_month,my_year);
    var firstDay = dayStart(my_month, my_year);
    //添加每个月的空白部分
    for(var i = 0; i < firstDay; i++){
        str += "<li>"+"</li>";
    }
    //从一号开始添加知道totalDay，并为pre，next和当天添加样式
    for(var i = 1; i <= totalDay; i++){
        //三种情况年份小，年分相等月份小，年月相等，天数小
        //点击pre和next之后，my_month和my_year会发生变化，将其与现在的直接获取的再进行比较
        //i与my_day进行比较,pre和next变化时，my_day是不变的
        if((my_year < my_date.getFullYear())||(my_year == my_date.getFullYear() && my_month < my_date.getMonth()) || (my_year == my_date.getFullYear() && my_month == my_date.getMonth() && i < my_day)){
            myclass = " class='lightgrey'";
        }else if(my_year == my_date.getFullYear() && my_month == my_date.getMonth() && i == my_day){
            myclass = "class = 'todaybox'";
        }else{
            myclass = "class = 'darkgrey'";
        }
        if(signday.length){
        	if(my_year == my_date.getFullYear() && my_month == my_date.getMonth()){
	        	for(var j = 0; j<signday.length; j++){
	        		if (i == signday[j]){
	        			myclass = "class = 'signday'";
	        		}
	            	
	        	}
	        }
        }
        
        str += "<li "+myclass+">"+i+"</li>";
    }
    holder.innerHTML = str;
    ctitle.innerHTML = month_name[my_month];
    cyear.innerHTML = my_year;
}
//调用refreshDate()函数，日历才会出现
//实现onclick向前或向后移动
pre.onclick = function(e){
    e.preventDefault();
    my_month--;
    if(my_month < 0){
        my_year--;
        my_month = 11; //即12月份
    }
    refreshDate(0);
}
next.onclick = function(e){
    e.preventDefault();
    my_month++;
    if(my_month > 11){
        my_month = 0;
        my_year++;
    }
    refreshDate(0);
}
sign.onclick = function(e){
    e.preventDefault();
    //saveTest();
    var x = prompt ("请输入访问密码: \n Enter your password:");/*第一个变量为提示语，第二个变量为默认初始值*/
    if (x === "jianchijiushishengli"){
    var daystr ="" + signday + my_day;
    const octokit = new Octokit({
        auth:"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",
        userAgent: 'myApp v1.2.3'
    })
    octokit.rest.issues.createComment({
        owner:"scutLMG",
        repo:"selfTalk_db",
        issue_number:2,
        body:"",
    });
    // getsignday();
    }
    else{
    alert("这是个人应用页面，只有站长能用哦。(施工中)\nThis is a private app for blogger, you can only check the calendar.");
    }
}
function over(x){
    //x.style.color = "rgb(92,210,242)";
    x.style.color = "rgb(170,204,230)";
}
function leave(x){
    //x.style.color = "rgb(21,151,255)";
    x.style.color = "rgb(71,89,126)";
}