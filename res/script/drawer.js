'use strict'

; (function(win, mobutil) {

	var manager = {};
	
	var CONST_ARTICLE_ID = "#main"; // single element allowed
	var CONST_MENU_TOGGLE = ".menuToggle"; // multiple elements allowed
	var CONST_MENU_DRAWER = "#menu"; // single element allowed
	
	var CONST_DRAWER_CLASS = ".drawer"; // multiple allowed (currently, only last in DOM will work)

	function getElement(el_id)
	{
		return win.document.querySelector(el_id);
	}
	
	function getElements(sel)
	{
		return win.document.querySelectorAll(sel);
	}
	
	manager.clear = function(evt)
	{
		var drawer = evt.target;
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
		bindMenuToggle();
	}
	function bindMenuToggle()
	{
		var menuToggle = getElements(CONST_MENU_TOGGLE);
		var menuDrawer = getElement(CONST_MENU_DRAWER);
		if (menuToggle.length === 0 || menuDrawer === null) return;
		
		var callback = function(evt)
		{
			menuDrawer.classList.add('visible');
		}
		for (var i=0, len=menuToggle.length; i<len; i++)
		{
			menuToggle[i].addEventListener('click', callback);
		}
	}
	function bindOpen()
	{		
		var drawers = getElements(CONST_DRAWER_CLASS);
		var article = getElement(CONST_ARTICLE_ID);
		if (article === null || drawers.length === 0) return;

		for (var i=0, len=drawers.length; i<len; i++)
		{
			var drawer = drawers[i];
			var in_dir = drawer.getAttribute("data-slide-in-dir");
			
			var callback = function(evt, opts)
			{
				if (opts === null || opts.target_drawer === null) 
				{
					return;
				}
				var drawer = opts.target_drawer;
				drawer.classList.add('visible');
			}
			
			var swipeHandler = new mobutil.swipeHandler({
				element: article,
				opts: { 'target_drawer' : drawer },
				callback: callback,
				direction: in_dir,
				distance: 80
			});
		}		
	}
	function bindClose()
	{		
		var drawers = getElements(CONST_DRAWER_CLASS);
		if (drawers.length === 0) return;

		for (var i=0, len=drawers.length; i<len; i++)
		{
			var drawer = drawers[i];
			var in_dir = drawer.getAttribute("data-slide-in-dir");
			var out_dir = null;
			
			switch(in_dir)
			{
				case "left":
					out_dir = "right";
					break;
				case "right":
					out_dir = "left";
					break;
			}
			
			var callback = function(evt, opts)
			{
				if (opts === null || opts.target_drawer === null) 
				{
					return;
				}
				var drawer = opts.target_drawer;
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
				opts: { 'target_drawer' : drawer },
				callback: callback,
				direction: out_dir,
				distance: 80
			});
		}
	}
	
	bindListeners();

})(this, mobutil);