Ext.data.JsonP.controllers({"guide":"<h1>Controllers</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/controllers-section-1'>Relation to <a href=\"#!/api/Ext.app.Application\" rel=\"Ext.app.Application\" class=\"docClass\">Ext.app.Application</a></a></li>\n<li><a href='#!/guide/controllers-section-2'>Launching</a></li>\n<li><a href='#!/guide/controllers-section-3'>Refs and Control</a></li>\n<li><a href='#!/guide/controllers-section-4'>Routes</a></li>\n<li><a href='#!/guide/controllers-section-5'>Before Filters</a></li>\n<li><a href='#!/guide/controllers-section-6'>Profile-specific Controllers</a></li>\n</ol>\n</div>\n\n<p>Controllers are responsible for responding to events that occur within your app. If your app contains a Logout <a href=\"#!/api/Ext.Button\" rel=\"Ext.Button\" class=\"docClass\">button</a> that your user can tap on, a Controller would listen to the Button's tap event and take the appropriate action. It allows the View classes to handle the display of data and the Model classes to handle theloading and saving of data - the Controller is the glue that binds them together.</p>\n\n<h2 id='controllers-section-1'>Relation to <a href=\"#!/api/Ext.app.Application\" rel=\"Ext.app.Application\" class=\"docClass\">Ext.app.Application</a></h2>\n\n<p>Controllers exist within the context of an <a href=\"#!/api/Ext.app.Application\" rel=\"Ext.app.Application\" class=\"docClass\">Application</a>. An Application usually consists of a number of Controllers, each of which handle a specific part of the app. For example, an Application that handles the orders for an online shopping site might have controllers for Orders, Customers and Products.</p>\n\n<p>All of the Controllers that an Application uses are specified in the Application's <a href=\"#!/api/Ext.app.Application-cfg-controllers\" rel=\"Ext.app.Application-cfg-controllers\" class=\"docClass\">Ext.app.Application.controllers</a> config. The Application automatically instantiates each Controller and keepsreferences to each, so it is unusual to need to instantiate Controllers directly. By convention each Controller is named after the thing (usually the Model) that it deals with primarily, usually in the plural - for example if your app is called 'MyApp' and you have a Controller that manages Products, convention is to create a MyApp.controller.Products class in the file app/controller/Products.js.</p>\n\n<h2 id='controllers-section-2'>Launching</h2>\n\n<p>There are 4 main phases in your Application's launch process, 2 of which are inside Controller. Firstly, each Controller is able to define an <a href=\"#!/api/Ext.app.Controller-method-init\" rel=\"Ext.app.Controller-method-init\" class=\"docClass\">init</a> function, which is called before the Application launch function. Secondly, after the Application and Profile launch functions have been called, the Controller's launch function is called as the last phase of the process:</p>\n\n<ol>\n<li>Controller#init functions called</li>\n<li>Profile#launch function called</li>\n<li>Application#launch function called</li>\n<li>Controller#launch functions called</li>\n</ol>\n\n\n<p>Most of the time your Controller-specific launch logic should go into your Controller's launch function. Because this is called after the Application and Profile launch functions, your app's initial UI is expected to be in place by this point. If you need to do some Controller-specific processing before app launch you can implement a Controller init function.</p>\n\n<h2 id='controllers-section-3'>Refs and Control</h2>\n\n<p>The centerpiece of Controllers is the twin configurations <a href=\"#!/api/Ext.app.Controller-cfg-refs\" rel=\"Ext.app.Controller-cfg-refs\" class=\"docClass\">refs</a> and <a href=\"#!/api/Ext.app.Controller-cfg-control\" rel=\"Ext.app.Controller-cfg-control\" class=\"docClass\">control</a>. These are used to easily gain references to Components inside your app and to take action on them based on events that they fire. Let's look at <a href=\"#!/api/Ext.app.Controller-cfg-refs\" rel=\"Ext.app.Controller-cfg-refs\" class=\"docClass\">refs</a> first:</p>\n\n<h3>Refs</h3>\n\n<p>Refs leverage the powerful <a href=\"#!/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">ComponentQuery</a> syntax to easily locate Components on your page. We can define as many refs as we like for each Controller, for example here we define a ref called 'nav' that finds a Component on the page with the ID 'mainNav'. We then use that ref in the addLogoutButton beneath it:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.Main', {\n    extend: '<a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>',\n\n    config: {\n        refs: {\n            nav: '#mainNav'\n        }\n    },\n\n    addLogoutButton: function() {\n        this.getNav().add({\n            text: 'Logout'\n        });\n    }\n});\n</code></pre>\n\n<p>Usually, a ref is just a key/value pair - the key ('nav' in this case) is the name of the reference that will be generated, the value ('#mainNav' in this case) is the <a href=\"#!/api/Ext.ComponentQuery\" rel=\"Ext.ComponentQuery\" class=\"docClass\">ComponentQuery</a> selector that will be used to find the Component.</p>\n\n<p>Underneath that, we have created a simple function called addLogoutButton which uses this ref via its generated 'getNav' function. These getter functions are generated based on the refs you define and always follow the same format - 'get' followed by the capitalized ref name. In this case we're treating the nav reference as though it's a <a href=\"#!/api/Ext.Toolbar\" rel=\"Ext.Toolbar\" class=\"docClass\">Toolbar</a>, and adding a Logout button to it when our function is called. This ref would recognize a Toolbar like this:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-create\" rel=\"Ext-method-create\" class=\"docClass\">Ext.create</a>('<a href=\"#!/api/Ext.Toolbar\" rel=\"Ext.Toolbar\" class=\"docClass\">Ext.Toolbar</a>', {\n    id: 'mainNav',\n\n    items: [\n        {\n            text: 'Some Button'\n        }\n    ]\n});\n</code></pre>\n\n<p>Assuming this Toolbar has already been created by the time we run our 'addLogoutButton' function (we'll see how that is invoked later), it will get the second button added to it.</p>\n\n<h3>Advanced Refs</h3>\n\n<p>Refs can also be passed a couple of additional options, beyond name and selector. These are autoCreate and xtype, which are almost always used together:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.Main', {\n    extend: '<a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>',\n\n    config: {\n        refs: {\n            nav: '#mainNav',\n\n            infoPanel: {\n                selector: 'tabpanel panel[name=fish] infopanel',\n                xtype: 'infopanel',\n                autoCreate: true\n            }\n        }\n    }\n});\n</code></pre>\n\n<p>We've added a second ref to our Controller. Again the name is the key, 'infoPanel' in this case, but this time we've passed an object as the value instead. This time we've used a slightly more complex selector query - in this example imagine that your app contains a <a href=\"#!/api/Ext.tab.Panel\" rel=\"Ext.tab.Panel\" class=\"docClass\">tab panel</a> and that one of the items in the tab panel has been given the name 'fish'. Our selector matches any Component with the xtype 'infopanel' inside that tab panel item.</p>\n\n<p>The difference here is that if that infopanel does not exist already inside the 'fish' panel, it will be automatically created when you call this.getInfoPanel inside your Controller. The Controller is able to do this because we provided the xtype to instantiate with in the event that the selector did not return anything.</p>\n\n<h3>Control</h3>\n\n<p>The sister config to <a href=\"#!/api/Ext.app.Controller-cfg-refs\" rel=\"Ext.app.Controller-cfg-refs\" class=\"docClass\">refs</a> is <a href=\"#!/api/Ext.app.Controller-cfg-control\" rel=\"Ext.app.Controller-cfg-control\" class=\"docClass\">control</a>. <a href=\"#!/api/Ext.app.Controller-cfg-control\" rel=\"Ext.app.Controller-cfg-control\" class=\"docClass\">Control</a> is the means by which your listen to events fired by Components and have your Controller react in some way. Control accepts both ComponentQuery selectors and refs as its keys, and listener objects as values - for example:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.Main', {\n    extend: '<a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>',\n\n    config: {\n        control: {\n            loginButton: {\n                tap: 'doLogin'\n            },\n            'button[action=logout]': {\n                tap: 'doLogout'\n            }\n        },\n\n        refs: {\n            loginButton: 'button[action=login]'\n        }\n    },\n\n    doLogin: function() {\n        //called whenever the Login button is tapped\n    },\n\n    doLogout: function() {\n        //called whenever any Button with action=logout is tapped\n    }\n});\n</code></pre>\n\n<p>Here we have set up two control declarations - one for our loginButton ref and the other for any Button on the page that has been given the action 'logout'. For each declaration we passed in a single event handler - in each case listening for the 'tap' event, specifying the action that should be called when that Button fires the tap event. Note that we specified the 'doLogin' and 'doLogout' methods as strings inside the control block - this is important.</p>\n\n<p>You can listen to as many events as you like in each control declaration, and mix and match ComponentQuery selectors and refs as the keys.</p>\n\n<h2 id='controllers-section-4'>Routes</h2>\n\n<p>As of Sencha Touch 2, Controllers can now directly specify which routes they are interested in. This enables us to provide history support within our app, as well as the ability to deeply link to any part of the application that we provide a route for.</p>\n\n<p>For example, let's say we have a Controller responsible for logging in and viewing user profiles, and want to make those screens accessible via urls. We could achieve that like this:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.Users', {\n    extend: '<a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>',\n\n    config: {\n        routes: {\n            'login': 'showLogin',\n            'user/:id': 'showUserById'\n        },\n\n        refs: {\n            main: '#mainTabPanel'\n        }\n    },\n\n    //uses our 'main' ref above to add a loginpanel to our main TabPanel (note that\n    //'loginpanel' is a custom xtype created for this application)\n    showLogin: function() {\n        this.getMain().add({\n            xtype: 'loginpanel'\n        });\n    },\n\n    //Loads the User then adds a 'userprofile' view to the main TabPanel\n    showUserById: function(id) {\n        MyApp.model.User.load(id, {\n            scope: this,\n            success: function(user) {\n                this.getMain().add({\n                    xtype: 'userprofile',\n                    user: user\n                });\n            }\n        });\n    }\n});\n</code></pre>\n\n<p>The routes we specified above simply map the contents of the browser address bar to a Controller function to call when that route is matched. The routes can be simple text like the login route, which matches against http://myapp.com/#login, or contain wildcards like the 'user/:id' route, which matches urls like http://myapp.com/#user/123. Whenever the address changes the Controller automatically calls the function specified.</p>\n\n<p>Note that in the showUserById function we had to first load the User instance. Whenever you use a route, the function that is called by that route is completely responsible for loading its data and restoring state. This is because your user could either send that url to another person or simply refresh the page, which we wipe clear any cached data you had already loaded. There is a more thorough discussion of restoring state with routes in the application architecture guides.</p>\n\n<h2 id='controllers-section-5'>Before Filters</h2>\n\n<p>The final thing that Controllers provide within the context of Routing is the ability to define filter functions that are run before the function specified in the route. These are an excellent place to authenticate or authorize users for specific actions, or to load classes that are not yet on the page. For example, let's say we want to authenticate a user before allowing them to edit a Product in an e-commerce backend:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.Products', {\n    config: {\n        before: {\n            editProduct: 'authenticate'\n        },\n\n        routes: {\n            'product/edit/:id': 'editProduct'\n        }\n    },\n\n    //this is not directly because our before filter is called first\n    editProduct: function() {\n        //... performs the product editing logic\n    },\n\n    //this is run before editProduct\n    authenticate: function(action) {\n        MyApp.authenticate({\n            success: function() {\n                action.resume();\n            },\n            failure: function() {\n                <a href=\"#!/api/Ext.Msg-method-alert\" rel=\"Ext.Msg-method-alert\" class=\"docClass\">Ext.Msg.alert</a>('Not Logged In', \"You can't do that, you're not logged in\");\n            }\n        });\n    }\n});\n</code></pre>\n\n<p>Whenever the user navigates to a url like http://myapp.com/#product/edit/123 the Controller's authenticate function will be called and passed the <a href=\"#!/api/Ext.app.Action\" rel=\"Ext.app.Action\" class=\"docClass\">Ext.app.Action</a> that would have been executed if the before filter did not exist. An Action simply represents the Controller, function (editProduct in this case) and other data like the ID parsed from the url.</p>\n\n<p>The filter can now perform any kind of processing it needs to, either synchronously or asynchronously. In this case we're using our application's <em>authenticate</em> function to check that the user is currently logged in. This could entail an AJAX request to check the user's credentials on the server so it runs asynchronously - if the authentication was successful we continue the action by calling <em>action.resume()</em>, if not we tell the user that they need to log in first.</p>\n\n<p>Before filters can also be used to load additional classes before certain actions are performed. For example, if some actions are rarely used you may wish to defer loading of their source code until they are needed so that the application boots up faster. To achieve this you can simply set up a filter that uses <a href=\"#!/api/Ext.Loader\" rel=\"Ext.Loader\" class=\"docClass\">Ext.Loader</a> to load code on demand.</p>\n\n<p>Any number of before filters can be specified for each action, to use more than one filter just pass in an array:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.Products', {\n    config: {\n        before: {\n            editProduct: ['authenticate', 'ensureLoaded']\n        },\n\n        routes: {\n            'product/edit/:id': 'editProduct'\n        }\n    },\n\n    //this is not directly because our before filter is called first\n    editProduct: function() {\n        //... performs the product editing logic\n    },\n\n    //this is the first filter that is called \n    authenticate: function(action) {\n        MyApp.authenticate({\n            success: function() {\n                action.resume();\n            },\n            failure: function() {\n                <a href=\"#!/api/Ext.Msg-method-alert\" rel=\"Ext.Msg-method-alert\" class=\"docClass\">Ext.Msg.alert</a>('Not Logged In', \"You can't do that, you're not logged in\");\n            }\n        });\n    },\n\n    //this is the second filter that is called\n    ensureLoaded: function(action) {\n        <a href=\"#!/api/Ext-method-require\" rel=\"Ext-method-require\" class=\"docClass\">Ext.require</a>(['MyApp.custom.Class', 'MyApp.another.Class'], function() {\n            action.resume();\n        });\n    }\n});\n</code></pre>\n\n<p>The filters are called in order, and must each call <a href=\"#!/api/Ext.app.Action-method-resume\" rel=\"Ext.app.Action-method-resume\" class=\"docClass\">action.resume()</a> to continue the processing.</p>\n\n<h2 id='controllers-section-6'>Profile-specific Controllers</h2>\n\n<p>Superclass, shared stuff:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.Users', {\n    extend: '<a href=\"#!/api/Ext.app.Controller\" rel=\"Ext.app.Controller\" class=\"docClass\">Ext.app.Controller</a>',\n\n    config: {\n        routes: {\n            'login': 'showLogin'\n        },\n\n        refs: {\n            loginPanel: {\n                selector: 'loginpanel',\n                xtype: 'loginpanel',\n                autoCreate: true\n            }\n        },\n\n        control: {\n            'logoutbutton': {\n                tap: 'logout'\n            }\n        }\n    },\n\n    logout: function() {\n        //code to close the user's session\n    }\n});\n</code></pre>\n\n<p>Phone Controller:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.phone.Users', {\n    extend: 'MypApp.controller.Users',\n\n    config: {\n        refs: {\n            nav: '#mainNav'\n        }\n    },\n\n    showLogin: function() {\n        this.getNav().setActiveItem(this.getLoginPanel());\n    }\n});\n</code></pre>\n\n<p>Tablet Controller:</p>\n\n<pre><code><a href=\"#!/api/Ext-method-define\" rel=\"Ext-method-define\" class=\"docClass\">Ext.define</a>('MyApp.controller.tablet.Users', {\n    extend: 'MyApp.controller.Users',\n\n    showLogin: function() {\n        this.getLoginPanel().show();\n    }\n});\n</code></pre>\n","title":"Controllers"});