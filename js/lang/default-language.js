var language = navigator.language || navigator.userLanguage;

var navLi = $('.navbar-links > li');
var title = $('title');

switch(language)
{
	case "tr-TR":
	case "tr":
		title.text('Giftr - Gifli Çeviri');
		navLi.children().eq(0).text('Çeviri');
		navLi.children().eq(1).text('Öğren');
		navLi.children().eq(2).text('Nedir');
		navLi.children().eq(3).text('İndir');
		break;
}