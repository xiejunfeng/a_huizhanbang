window.myResize = function(r_size_s) {
	
	var scale = 1,
		$wrapper = document.getElementsByTagName('body')[0],
		$body = document.getElementsByTagName('body')[0],
		windowWidth = document.documentElement && document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth,
		deviceAgent = navigator.userAgent.toLowerCase();
	var  r_size = r_size_s ? r_size_s : 1024;

	var setScale = function(scales) {
		if ($wrapper.style.zoom == undefined) {
			$wrapper.style.margin = '0px';
			$wrapper.style.transformOrigin = 'top left';
			$wrapper.style.transform = 'scale(' + scales + ')';
			$wrapper.style.MozTransformOrigin = 'top left';
			$wrapper.style.MozTransform = 'scale(' + scales + ')';
		} else {
			$wrapper.style.zoom = scales;
		}
		$body.style.display = 'block';

	};


	try {
		if (deviceAgent.match(/(iphone|ipod|android|windows\s*phone|symbianos)/)) {
			scale = parseFloat(windowWidth / r_size);
			if ($(window).height() > $(window).width()) {} else {
				$(window).on('ortchange', function() { //当转屏的时候触发
					if ($(window).height() > $(window).width()) {
						windowWidth = document.documentElement && document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
						scale = parseFloat(windowWidth / r_size);
						setScale(scale);
					}
				});
			}
			//}

			//微信2.3版本的处理
			if (deviceAgent.match(/android\s*2.3/) && deviceAgent.match(/micromessenger/)) {
				scale = 1;
			}
			if ($wrapper) {
				setScale(scale);
			}

		} else {

			if ($wrapper) {
				if (deviceAgent.match(/(ipad)/)) {
					windowWidth = document.documentElement && document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
					scale = parseFloat(windowWidth / r_size);
				} else {
					scale = 1.2;
				}
				setScale(scale);
			}
		}
	} catch (e) {
		windowWidth = document.documentElement && document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
		scale = parseFloat(windowWidth / r_size);
		if ($wrapper) {
			setScale(scale);
		}
	}
}