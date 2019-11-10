var language = navigator.language || navigator.userLanguage;

var selectLang = $('.translate-translate-select');
var translateRes = $('.translate-result-btn');
var modalTitle = $('.modal-title');
var modalClose = $('.modal-close');
var translateText = $('.translate-textarea');

switch(language)
{
	case "tr-TR":
	case "tr":
		selectLang.contents().filter(function(){ 
			return this.nodeType == 3; 
		})[0].nodeValue = 'Dil Seç';

		selectLang.contents().filter(function(){ 
			return this.nodeType == 3; 
		})[1].nodeValue = 'Dil Seç';

		translateRes.contents().filter(function(){ 
			return this.nodeType == 3; 
		})[0].nodeValue = 'Çevir';

		translateText.attr('placeholder','Çevrilecek yazı...');

		modalTitle.contents().filter(function(){ 
			return this.nodeType == 3; 
		})[0].nodeValue = 'Dil Seçiniz';

		modalClose.contents().filter(function(){ 
			return this.nodeType == 3; 
		})[0].nodeValue = 'Kapat';
		break;
}