var language = navigator.language || navigator.userLanguage;

var modalTitle = $('.modal-title');
var modalClose = $('.modal-close');

switch(language)
{
	case "tr-TR":
	case "tr":
		modalTitle.contents().filter(function(){ 
			return this.nodeType == 3; 
		})[0].nodeValue = 'Dil Seçiniz';

		modalClose.contents().filter(function(){ 
			return this.nodeType == 3; 
		})[0].nodeValue = 'Kapat';
		break;
}