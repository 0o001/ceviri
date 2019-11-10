var box = function(value) {
	window.open(
	  value,
	  'share-dialog',
	  'width=626, height=436'
	);
};

function ShareFacebook(link) {
	box('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(link));
};

function ShareTwitter(link) {

	box('http://twitter.com/home?status=' + encodeURIComponent(link) + ' @giftranslate');
};

function ShareWhatsapp(link) {

	window.open('whatsapp://send?text=' + encodeURIComponent(link), 'share-dialog');
};

$(document).ready(function () {
	var twitter = $('.twitter');
	var facebook = $('.facebook');
	var whatsapp = $('.whatsapp');
	var gifImg = $('.share-gif');

	twitter.click(function ()
	{
		var gifLink = gifImg.attr('data-gif') || gifImg.attr('src');
		ShareTwitter(gifLink);
	});

	facebook.click(function ()
	{
		var gifLink = gifImg.attr('data-gif') || gifImg.attr('src');
		ShareFacebook(gifLink);
	});

	whatsapp.click(function ()
	{
		var gifLink = gifImg.attr('data-gif') || gifImg.attr('src');
		ShareWhatsapp(gifLink);
	});

	var twitterTool = $('.twitter-tool');
	var resultText = $('.translate-result-div');

	twitterTool.click(function ()
	{
		var text = resultText.text();
		if(text.length > 0)
			ShareTwitter(text);
	});

});