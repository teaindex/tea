var trans = document.getElementsByClassName("trans");
/*console.log(trans);*/
var num = new Array();
for (var i=0; i<trans.length; i++) {
	num[i] = trans[i].innerHTML;
	if (num[i]=="&nbsp;")
		num[i]=" ";
	/*console.log("<input type=\"text\" name=\"value\" value=\""+num[i]+"\" />");*/
	trans[i].innerHTML = "<input class=\"ubp\" type=\"text\" name=\"value\" placeholder=\""+num[i]+"\" value=\""+num[i]+"\"/>";
}
var input = document.getElementsByClassName("ubp");
for (var i=0; i<input.length; i++) {
	input[i].value = num[i];
}