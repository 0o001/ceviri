$(document).ready(function(){
	var btnSelect 		= $('.translate-translate-select');
	var modal 			= $('#modal-languages');
	var translateText 	= $('.translate-translate-select');
	var translateSound 	= $('.translate-translate-sound');
	var resultSound 	= $('.translate-result-sound');
	var translateTextArea = $('.translate-textarea');
	var resultText 		= $('.translate-result-div');
	var resultCopy 		= $('.translate-result-copy');
	var resultDownload 	= $('.translate-result-download');
	var transferBtn 	= $('#translate-transfer-btn');
	var translateBtn 	= $('#translate-translate-btn-element');
	var resultBtn 		= $('#translate-result-btn-element');
	var toolRight 		= $('.translate-tools-right');
	var toolLeft 		= $('.translate-tools-left');
	var changeBtn		= $('.change');
	var translateImg	= $('.translate-image');
	var translater    	= $('.translate-result-btn');

	btnSelect.click(function (argument) {
		modal.attr('data-select', $(this).attr('data-name'));
	});

	$(window).resize(function()
	{
		TranslateImg();
	});
	TranslateImg();

	transferBtn.click(function () {

		var translateCode  = translateBtn.attr('data-code');
		var translateFlag  = translateBtn.children().attr('src');
		var translateText  = translateBtn.text();
		var translateColor = toolRight.css('background-color');

		var resultCode = resultBtn.attr('data-code');
		var resultFlag = resultBtn.children().attr('src');
		var resultText = resultBtn.text();
		var resultColor   = toolLeft.css('background-color');

		translateBtn.attr('data-code', resultCode);
		resultBtn.attr('data-code', translateCode);

		translateBtn.attr('data-color', translateColor);
		resultBtn.attr('data-color', resultColor);

		translateBtn.contents().filter(function(){ 
			return this.nodeType == 3; 
		})[0].nodeValue = resultText;
		resultBtn.contents().filter(function(){ 
			return this.nodeType == 3; 
		})[0].nodeValue = translateText;

		toolRight.css('background-color', resultColor);
		toolLeft.css('background-color', translateColor);

		translateBtn.children().attr('src', resultFlag);
		resultBtn.children().attr('src', translateFlag);

		if(translateTextArea.val().trim() != "")
		{
			translater.click();
		}
		else
		{
			$('.translate-result-div').text('');
		}

	});


	var clickChange1 = true;
	translateSound.click(
		function()
		{
			var msg = new SpeechSynthesisUtterance(translateTextArea.val());
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
			var msg = new SpeechSynthesisUtterance(resultText.text());
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

	resultCopy.click(function ()
	{
		if(resultText.text() && resultText.text().trim())
		{
			var $temp = $("<input>");
			//$temp.css('display','none');
		    $("body").append($temp);
		    $temp.hide();
		    $temp.val($(resultText).text()).select();
		    document.execCommand("copy");
		    $temp.remove();
		}
	});

	resultDownload.click(function ()
	{

		if(resultText.text() && resultText.text().trim())
		{
			var element = document.createElement('a');
		    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(resultText.text()));
		    element.setAttribute('download', "ceviri.txt");
		 	element.setAttribute('target', "_blank");
		    element.style.display = 'none';
		    document.body.appendChild(element);
		 
		    element.click();
		 
		    document.body.removeChild(element);
		}
	});

	var randomNumber;
	translater.click(function() {

		GetTranslate(translateTextArea.val(), translateBtn.attr('data-code'), resultBtn.attr('data-code'), resultText, translateImg,
		function Before()
		{
			translateImg.attr('src', 'pictures/loading.gif').one('load',function()
			{
	            translateImg.css(
	            {
	                paddingLeft: "0px",
	                paddingRight: "0px"
	            });
	        });
			$(window).off("resize");

			resultText.text('Translating...');
			changeBtn.fadeIn("slow");
		},
		function Data(data)
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
					translateImg.attr('src', data["data"][random]["images"]["downsized"]["url"]);
					translateImg.attr('data-gif',data["data"][random]['url']);
				}
				else
				{
					translateImg.attr('src', 'pictures/notfound.gif');
					translateImg.attr('data-gif','http://ceviri.nullovy.com');
				}
			});
		});
	});

	translater.add(transferBtn).focus(function(event)
	{
    	event.target.blur();
	});

	Flags(function ()
	{
		var modal = $('#modal-languages');
		var translateBtn;
		var toolRight = $('.translate-tools-right');
		var toolLeft = $('.translate-tools-left');

		var code  = $(this).attr('data-code');
		var lang  = $(this).text();
		var color = $(this).attr('data-color');
		var flag  = $(this).children().attr('src');



		if(modal.attr('data-select') == "modal-languages-select-1")
		{
			translateBtn = $('#translate-translate-btn-element');
			toolLeft.css('background-color', color);
		}
		else
		{
			translateBtn = $('#translate-result-btn-element');
			toolRight.css('background-color', color);
		}

		translateBtn.attr('data-code', code);
		translateBtn.attr('data-color', color);
		translateBtn.children().attr('src', flag);
		translateBtn.contents().filter(function(){ 
				return this.nodeType == 3; 
		})[0].nodeValue = lang;
						
	});

	function TranslateImg()
	{
		var square = (parseFloat(translateImg.outerWidth()) - parseFloat(translateImg.outerHeight())) / 2;
		translateImg.css(
		{
			paddingLeft: square,
			paddingRight: square,
			backgroundColor: "#303145"
		});
	};
});