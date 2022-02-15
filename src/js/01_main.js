document.addEventListener("DOMContentLoaded", () => {
	document.querySelector('.topnav__burger-menu').addEventListener('click', (e) => {
		e.target.classList.toggle('open');
		document.querySelector('.topnav__menu').classList.toggle('open');
	})

	function getCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function setCookie(name,value,days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	}

	cookieEl = document.querySelector('.supercookie')

	if(!getCookie('hide-cookie')) {
		cookieEl.style.display = 'block';
	}

	document.querySelector('.supercookie__btn--accept').addEventListener('click', () => {
		setCookie('hide-cookie', 'true', 1);
		cookieEl.style.display = 'none';
	})

	document.querySelector('.supercookie__btn--close').addEventListener('click', () => {
		cookieEl.style.display = 'none';
	})





	let script = document.createElement('script');
	script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A0d45419b883b75f6e2a5ec37c233911fd45d6b1945503ba7ad87f8dafc612503&amp;width=835&amp;height=594&amp;lang=ru_RU&amp;scroll=true';
	const linkAwesome = document.createElement('link');
		  linkAwesome.rel = 'stylesheet';
		  linkAwesome.href = 'css/font-awesome.min.css';
	const linkFancyApps = document.createElement('link');
		  linkFancyApps.rel = 'stylesheet';
		  linkFancyApps.href = 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css';		

	setTimeout(() => {
		document.head.append(linkAwesome);
		document.head.append(linkFancyApps);
		document.querySelector('.contacts__map').append(script)}, 4000);
			

  });
  