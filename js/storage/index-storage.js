if (typeof(Storage) !== "undefined")
{
    if(localStorage.getItem('lang') !== null)
    {
    	var translateBtn 	= $('#translate-translate-btn-element');
    	var resultBtn 	 	= $('#translate-result-btn-element');
    	var toolRight 		= $('.translate-tools-right');
		var toolLeft 		= $('.translate-tools-left');

    	var data1 = JSON.parse(localStorage.getItem('lang'));
    	var data2 =  JSON.parse(localStorage.getItem('lang-r'));

	    translateBtn.attr('data-code', data1.code);
		translateBtn.attr('data-color', data1.color);
		translateBtn.children().attr('src', data1.flag);
		translateBtn.contents().filter(function(){ 
			return this.nodeType == 3; 
		})[0].nodeValue = data1.lang;
		toolLeft.css('background-color', data1.color);

		resultBtn.attr('data-code', data2.code);
		resultBtn.attr('data-color', data2.color);
		resultBtn.children().attr('src', data2.flag);
		resultBtn.contents().filter(function(){ 
			return this.nodeType == 3; 
		})[0].nodeValue = data2.lang;
		toolRight.css('background-color', data2.color);

    }
}


$(window).on('beforeunload', function()
{
  if(typeof(Storage) !== "undefined")
  {
  	var translateBtn 	= $('#translate-translate-btn-element');
	var resultBtn 		= $('#translate-result-btn-element');

	var tCode  = translateBtn.attr('data-code');
	var tLang  = translateBtn.text();
	var tColor = translateBtn.attr('data-color');
	var tFlag  = translateBtn.children().attr('src');

	var rCode  = resultBtn.attr('data-code');
	var rLang  = resultBtn.text();
	var rColor = resultBtn.attr('data-color');
	var rFlag  = resultBtn.children().attr('src');

    localStorage.setItem('lang', JSON.stringify({"lang": tLang, "code": tCode, "color": tColor, "flag": tFlag}));
    localStorage.setItem('lang-r',JSON.stringify({"lang": rLang, "code": rCode, "color": rColor, "flag":rFlag}));

  }
});