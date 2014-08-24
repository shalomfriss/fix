/**
	The browser downloads files sequencially, when using the module, make sure to specify
	javascript files correctly in the module json
	https://developers.google.com/speed/docs/best-practices/rtt?csw=1#PutStylesBeforeScripts
*/
	function ModuleLoader()
	{
		this.modules = [];
		this.files = [];
		this.verbose = true;
		
		this.init();
	}
	
	ModuleLoader.prototype.init = function()
	{
		
	}
	
	/**
		Add file related to a module to load
		@param moduleDirectory:String - the module directory
		@param file:String - The file to load
	*/
	ModuleLoader.prototype.addModuleFile = function(moduleDirectory, file)
	{
		var ml = ModuleLoader.getInstance();
		if(!ml.files[moduleDirectory])
		{
			ml.files[moduleDirectory] = {};
			ml.files[moduleDirectory].files = [];
		}
		
		var files = ml.files[moduleDirectory].files;
		files[files.length] = file;
	}
	
	/**
		Each module is a directory with files to be included along with a module.json file
	*/
	ModuleLoader.prototype.loadModule = function(moduleDirectory)
	{
		log("ModuleLoader:loadModule - " + moduleDirectory);
		
		var ml = ModuleLoader.getInstance();
		if(!ml.modules[moduleDirectory])
		{
			ml.modules[moduleDirectory] = {};
			ml.modules[moduleDirectory].moduleDirectory = moduleDirectory;
			ml.modules[moduleDirectory].loaded = false;
			ml.modules[moduleDirectory].filesLoaded = 0;
			ml.modules[moduleDirectory].filesTotal = 0;
			ml.modules[moduleDirectory].handleFileLoad 	= Fix.bind(ml.modules[moduleDirectory], ml.handleFileLoaded);
			ml.modules[moduleDirectory].handleFileError = Fix.bind(ml.modules[moduleDirectory], ml.handleFileError);
		}
		
		var theMod = ml.modules[moduleDirectory];
		var cb = ml.modules[moduleDirectory].handleFileLoad;
		var err = ml.modules[moduleDirectory].handleFileError;
		
		var root = this;
		var opts={
			type:"GET",
			success:function(data)
			{	
				if(root.verbose == true)
				{
					log(JSON.parse(data));
				}
				
				var files = JSON.parse(data);
				var css = files.css;
				var js = files.js;
				var tpl = files.tpl;
				//FUTURE
				//html
				//image
				//sound
				//video
				//other
				
				var file = null;
				var ml = ModuleLoader.getInstance();
				ml.addModuleFile(moduleDirectory, file);
				
				
				theMod.filesTotal = css.length + js.length + tpl.length;
				
				
				var i = 0;
				var len = css.length;
				for(; i < len; i++)
				{
					file = css[i];
					if(root.verbose == true)
					{
						log("CSS: " + file);
					}
					
					ml.loadFile(moduleDirectory + "/" + file, "css", cb, err);
				}
				
				i = 0;
				len = js.length;
				for(; i < len; i++)
				{
					file = js[i];
					if(root.verbose == true)
					{
						log("JS: " + file);
					}
					ml.loadFile(moduleDirectory + "/" + file, "js", cb, err);
				}
				
				i = 0;
				len = tpl.length;
				for(; i < len; i++)
				{
					file = tpl[i];
					if(root.verbose == true)
					{
						log("TPL: " + file);
					}
					ml.loadFile(moduleDirectory + "/" + file, "tpl", cb, err);
				}
				
			},
			error:function(err)
			{
				log(err);
			},
			url:moduleDirectory + "/module.json"
		}
		$.ajax(opts);
	}
	
	/**
		Load an external file dynamically and add it
		@param filename:String - the filename
	*/
	ModuleLoader.prototype.loadFile = function(filename, filetype, callback, errorCallback)
	{
		var callback = callback;	
		var errorCallback = errorCallback;
		
	 	if (filetype=="js")
		{ //if filename is a external JavaScript file
	  		var fileref=document.createElement('script');
	  		fileref.setAttribute("type","text/javascript");
	  		fileref.setAttribute("src", filename);
			fileref.onload = function(evt)
			{
				callback(evt);
			}
			fileref.onerror = function(evt)
			{
				errorCallback(evt);
			}
	 	}
	 	else if (filetype=="css")
		{ //if filename is an external CSS file
	  		var fileref = document.createElement("link");
	  		fileref.setAttribute("rel", "stylesheet");
	  		fileref.setAttribute("type", "text/css");
	  		fileref.setAttribute("href", filename);
			fileref.onload = function(evt)
			{
				callback(evt);
			}
			fileref.onerror = function(evt)
			{
				errorCallback(evt);
			}
	 	}
		else if(filetype == "tpl")
		{
			
			var opts={
				type:"GET",
				success:function(data)
				{
					callback(data);
				},
				error:function(err)
				{
					log(err);
					errorCallback(err);
				},
				url:filename
			}
			$.ajax(opts);
		}
		
		
		
	 	if (typeof fileref!="undefined")
		{
			if(callback)
			{
				//fileref.addEventListener( "onload", callback, false );
			}
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
	  	
	}
	
	ModuleLoader.prototype.handleFileLoaded = function(evt)
	{
		this.filesLoaded++;
		if(this.filesLoaded == this.filesTotal)
		{
			var ml = ModuleLoader.getInstance();
			ml.dispatchModuleLoaded(this.moduleDirectory);
		}
	}
	ModuleLoader.prototype.handleFileError = function(evt)
	{
		log("FILE ERROR");
		log(this);
		this.filesLoaded++;
		if(this.filesLoaded == this.filesTotal)
		{
			var ml = ModuleLoader.getInstance();
			ml.dispatchModuleLoaded(this.moduleDirectory);
		}
	}
	
	ModuleLoader.prototype.dispatchModuleLoaded = function(qualifiedModuleName)
	{
		log("ModuleLoader:moduleLoaded - " + qualifiedModuleName);
		var ml = ModuleLoader.getInstance();
		var temp = qualifiedModuleName.split("/");
		var modName = temp[temp.length - 1];
		var obj = {name: modName, qualifiedName: qualifiedModuleName};
		ml.moduleLoaded(obj);
	}
	
	
	
	/*******************************************************************************************/
	/*******************************************************************************************/
	//SINGLETON
	/*******************************************************************************************/
	/*******************************************************************************************/
	
	/**
		SINGLETONN METHOD - getInstance
		USAGE: ModuleLoader.getInstance();
	**/
	ModuleLoader.getInstance = function ()
	{
	    	if (!ModuleLoader._instance) 
	        {
	        	ModuleLoader._instance = new ModuleLoader();
	        	//Initialize defaults
	        }
				
	        return ModuleLoader._instance;
	}
	    