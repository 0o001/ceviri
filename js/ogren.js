$(document).ready(function(){
	var modal 			= $('#modal-languages');
	var refreshBtn 		= $('.repeat');
	var changeBtn 		= $('.change');
	var translateText1  = $('.learn-translate-text-1');
	var translateText2  = $('.learn-translate-text-2');
	var transBtn		= $('#translate-translate-btn-element');
	var resultBtn 		= $('#translate-result-btn-element');
	var learnImg		= $('.learn-translate-image');
	var translateSound 	= $('.translate-translate-sound');
	var resultSound 	= $('.translate-result-sound');

	var kelimelerArray  = kelimeler.split(',');

	$('.translate-translate-btn').click(function ()
	{
		modal.attr('data-select', $(this).attr('data-name'));	
	});

	var randomNumber;
	refreshBtn.click(function ()
	{
		//GetTranslate(text, translateLang, resultLang, targetOutput, img, beforeFunction, successFunction)
		var kelime = kelimelerArray[Math.floor((Math.random() * kelimelerArray.length-1) + 1)];
		if(navigator.onLine)
		{
			function Before()
			{
				translateText1.text('...');
				learnImg.attr('src', 'pictures/loading.gif');
			}

			function Success(data)
			{
				var ceviri = data["text"][0];
				if (kelime == ceviri)
				{
					ceviri += " ⚠";
				}
	        	translateText1.text(ceviri);
				$.when(GetGif(kelime, learnImg)).done(function (data)
				{
					changeBtn.unbind('click');
					changeBtn.click(function ()
					{
						var random;
						for (var i = 0; i < 5; i++)
						{
							random = Math.floor((Math.random() * data["data"].length-1) + 1);
							if(random != randomNumber)
							{
								randomNumber = random;
								break;
							}
						}
			        	if(typeof data["data"][random] !== 'undefined')
						{
							learnImg.attr('src', data["data"][random]["images"]["downsized"]["url"]);
							learnImg.attr('data-gif',data["data"][random]['url']);
						}
						else
						{
							learnImg.attr('src', 'pictures/notfound.gif');
							learnImg.attr('data-gif','http://ceviri.nullovy.com');
						}
					});
				});
			}

			GetSelfTranslate(kelime, transBtn.attr('data-code'), Before, Success);
			GetSelfTranslate(kelime, resultBtn.attr('data-code'),
				function Before()
				{
					/*DAHA SONRASI İÇİN*/
					//translateText2.text('...');

					/*BURASI ŞİMDİLİK*/
					translateText2.text(kelime);
					// body...
				},
				function Success(data)
				{
					var ceviri = data["text"][0];
		        	translateText2.text(ceviri);

			});
		}
		else
		{
			alert("İnternet Bağlantınızı Kontrol Ediniz.");
		}
		
	});

	refreshBtn.click();

	Flags(function ()
	{
		var modal = $('#modal-languages');
		var translateBtn;
		var toolUp = $('.learn-translate-div');
		var toolDown = $('.learn-result-div');

		var code  = $(this).attr('data-code');
		var color = $(this).attr('data-color');
		var flag  = $(this).children().attr('src');



		if(modal.attr('data-select') == "modal-languages-select-1")
		{
			translateBtn = $('#translate-translate-btn-element');
			toolUp.css('background-color', color);
		}
		else
		{
			translateBtn = $('#translate-result-btn-element');
			toolDown.css('background-color', color);
		}

		translateBtn.attr('data-code', code);
		translateBtn.attr('data-color', color);
		translateBtn.children().attr('src', flag);				
	});

	var clickChange1 = true;
	translateSound.click(
		function()
		{
			var text = translateText1.text();
			if(text.indexOf('⚠') != -1)
			{
				text = text.substr(0,text.length-2);
			}
			
			var msg = new SpeechSynthesisUtterance(text);
			if(clickChange1)
			{
				clickChange1 = false;
				window.speechSynthesis.speak(msg);
			}
			else
			{
				if (window.speechSynthesis.speaking) {
					clickChange1 = true;
					window.speechSynthesis.cancel();
				}
				else
				{
					clickChange1 = false;
					window.speechSynthesis.speak(msg);
				}
			}
		}
	);

	var clickChange2 = true;
	resultSound.click(
		function()
		{
		var msg = new SpeechSynthesisUtterance(translateText2.text());
			if(clickChange2)
			{
				clickChange2 = false;
				window.speechSynthesis.speak(msg);
			}
			else
			{
				if (window.speechSynthesis.speaking) {
					clickChange2 = true;
					window.speechSynthesis.cancel();
				}
				else
				{
					clickChange2 = false;
					window.speechSynthesis.speak(msg);
				}
			}
		}
	);
});