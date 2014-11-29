'use strict'

; (function(win, mobutil) {

	var manager = {};
	
	var CONST_MENU_TOGGLE = ".menuToggle"
	var CONST_DRAWER_ID = "#drawer";
	var CONST_ARTICLE_ID = "#main";

	function getElement(el_id)
	{
		return document.querySelector(el_id);
	}
	
	manager.clear = function(evt)
	{
		var drawer = getElement(CONST_DRAWER_ID);
		if (drawer === null) return;

		drawer.classList.remove("visible");
		drawer.classList.remove("flyoff");

		drawer.removeEventListener(
			'animationend',
			manager.clear,
			false);
		drawer.removeEventListener(
			'webkitAnimationEnd',
			manager.clear,
			false);
	}
	
	function bindListeners()
	{
		bindOpen();
		bindClose();
	}
	function bindOpen()
	{		
		var drawer = getElement(CONST_DRAWER_ID);
		var article = getElement(CONST_ARTICLE_ID);
		if (article === null || drawer === null) return;

		var callback = function(evt)
		{
			drawer.classList.add('visible');
		}

		var swipeHandler = new mobutil.swipeHandler({
			element: article,
			callback: callback,
			direction: 'right',
			distance: 80
		});
		
		var menuToggle = document.querySelectorAll(CONST_MENU_TOGGLE);
		if (menuToggle.length === 0) return;
		for (var i=0, len=menuToggle.length; i<len; i++)
		{
			menuToggle[i].addEventListener('click', callback);
		}
	}
	function bindClose()
	{		
		var drawer = getElement(CONST_DRAWER_ID);
		if (drawer === null) return;

		var callback = function(evt)
		{
			drawer.classList.add('flyoff');

			drawer.addEventListener(
				'animationend',
				manager.clear,
				false);
			drawer.addEventListener(
				'webkitAnimationEnd',
				manager.clear,
				false);
		}

		var swipeHandler = new mobutil.swipeHandler({
			element: drawer,
			callback: callback,
			direction: 'left',
			distance: 80
		});
	}
	
	bindListeners();

})(this, mobutil);