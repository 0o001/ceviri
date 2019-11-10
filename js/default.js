function Flags(clickEvent)
{
	$.ajax({ 
       type:'GET',
       url:'ajax/flag-json.json',
       cache:false,
       success: function(data)
       { 
            var languages = data.languages;
            $.each(languages, function (key, value) {
            	var menu = $('#modal-languages-menu');

            	var $li = $("<li>");
            	var $button = $('<button>');
            	var $img = $('<img>');

            	$button.text(value.lang);
            	$button.addClass('btn btn-default btn-translate-country');
            	$button.attr('data-code', value.code);
            	$button.attr('data-color', value.color);
            	$button.attr('data-dismiss','modal');

				$button.click(clickEvent);

            	$img.attr('src', 'pictures/' + value.flag);
            	$img.addClass('translate-flag');

            	$button.prepend($img);
            	$li.append($button);

            	menu.append($li);
            })
       }
  	});
};

function GetTranslate(text, translateLang, resultLang, targetOutput, img, beforeFunction, successFunction) {
	if(text.trim() != "")
	{
		if(navigator.onLine)
		{
			$.ajax({
			        crossDomain: true,
			        url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=API_KEY&lang=' + translateLang + '-'+ resultLang + '&text=' + encodeURIComponent(text.trim()),
			        type:'GET',
			        dataType:'jsonp',
			        beforeSend: beforeFunction || function() {},
			        success: function (data)
			        {
			        	var ceviri =  data["text"][0];
			        	var gifText;

			        	targetOutput.text(ceviri);

			        	if(translateLang == "en")
			        	{
			        		gifText = text;
			        		$.when(GetGif(gifText, img)).done(successFunction || function(data){});
			        	}	
			        	else if(resultLang == "en")
			        	{
			        		gifText = ceviri;
			        		$.when(GetGif(gifText, img)).done(successFunction || function(data){});
			        	}
			        	else
			        	{
			        		$.ajax({
							        crossDomain: true,
							        url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=API_KEY&lang=' + translateLang + '-en&text=' + encodeURIComponent(text.trim()),
							        type:'GET',
							        dataType:'jsonp',
							        success: function (data)
							        {
					        			gifText =  data["text"][0];
					        			$.when(GetGif(gifText, img)).done(successFunction || function(data){});
			        				},
			        				error: function ()
			        				{
			        					gifText =  text.trim();
			        				}
			        		});
			        	}

					},
			        error: function ()
			        {
			        	targetOutput.text("Error");
			        	GetGif("error", img);
			        }
        	});		
		}
		else
		{
			alert("İnternet Bağlantınızı Kontrol Ediniz.");
		}
	}
	else
	{
		targetOutput.text('');
	}
}
function GetSelfTranslate(text, translateLang, beforeFunction, successFunction)
{
	if(text.trim() != "")
	{
		if(navigator.onLine)
		{
			$.ajax({
			        crossDomain: true,
			        url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=API_KEY&lang=en-'+ translateLang + '&text=' + encodeURIComponent(text.trim()),
			        type:'GET',
			        dataType:'jsonp',
			        beforeSend: beforeFunction || function(data){},
			        success: successFunction || function(data){}
			    });
		}
	}
}

function GetGif(text, img)
{	
   return	$.ajax({
	        crossDomain: true,
	        url: 'http://api.giphy.com/v1/gifs/search?q=' + encodeURIComponent(text) +'&limit=10&api_key=dc6zaTOxFJmzC',
	        type:'GET',
	        dataType:'json',
	        success: function (data)
	        {
	        	var random = Math.floor((Math.random() * data["data"].length-1) + 1);
	        	if(typeof data["data"][random] !== 'undefined')
				{
					img.attr('src',data["data"][random]["images"]["downsized"]["url"]);
					img.attr('data-gif',data["data"][random]['url']);
				}
				else
				{
					img.attr('src', 'pictures/notfound.gif');
					img.attr('data-gif',"http://ceviri.nullovy.com");
				}
	        },
	        error: function ()
	        {
	        	img.attr('src','pictures/notfound.gif');
	        	img.attr('data-gif',"http://ceviri.nullovy.com");
	        }
	    });
}