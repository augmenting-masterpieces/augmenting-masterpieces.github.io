(function(){
  "use strict";

  var app = angular.module("augm", ["ngSanitize", "templates-augm", "ui.router", "mgcrea.ngStrap", "angular-images-loaded", "ngAnimate"]);

  app.constant("$", jQuery);
  app.constant("_", _);

})();

(function(){
  'use strict';

  angular.module("augm").config(["$stateProvider", "$locationProvider", "$urlRouterProvider", routes]); 
    
  function routes($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);
    
    $stateProvider
      .state("home", {
        views: {
          "main": { 
            templateUrl: "../templates/home.html"
          }
        }
      })
      .state('home.subroutes', {
        url: "/",
        views: {
          "nav": { 
            templateUrl: "../templates/home/navHome.html",
            controller: "NavCtrl as nav"      
          },
          "header": { 
            templateUrl: "../templates/home/header.html",
            controller: 'HeaderCtrl as head'                
          },
          "assumptions": { templateUrl: "../templates/home/assumptions.html" },
          "usercamerastudy": { templateUrl: "../templates/home/usercamerastudy.html" },
          "survey": { templateUrl: "../templates/home/survey.html" },
          "masonryviewer": { 
            templateUrl: "../templates/home/masonryviewer.html",
            controller: "MasonryCtrl as mason",
            resolve: {
              photos: ["$http", function($http){
                return $http({
                  method: "GET",
                  url: "/api/fotoData.json",
                  responseType: "json"
                }).then(function(response){
                  return response.data.photos;
                }); 
              }]
            }             
          },
          "demo": { templateUrl: "../templates/home/demo.html" },
          "evaluation": { templateUrl: "../templates/home/evaluation.html" },
          "theory": { templateUrl: "../templates/home/theory.html" },
          "literature": { templateUrl: "../templates/home/literature.html" },
          "about": { templateUrl: "../templates/home/about.html" },
          "footer": { 
            templateUrl: "../templates/home/footerHome.html",
            controller: "NavCtrl as nav",
          }
        }
      })
      .state('impressum', {
        views: {
          "main": { 
            templateUrl: "../templates/impressum.html"
          }
        }
      })
      .state('impressum.subroutes', {
        url: "/impressum",
        views: {
          "nav": { 
            templateUrl: "../templates/functional/navSiteWide.html",
            controller: 'NavCtrl as nav'      
          },
          "main": { 
            templateUrl: "../templates/impressum.html"
          },
          "footer": { 
            templateUrl: "../templates/functional/footerSiteWide.html"
          }
        }
      });

    $urlRouterProvider.when('/', '/');
    // $urlRouterProvider.otherwise('/home');
  }
})();
(function(){
  'use strict';
  angular.module('augm').controller('AppCtrl', ['$state', AppCtrl]);

  function AppCtrl($state, $timeout){
    var vm = this;

    return vm;
  }

})();

(function(){
  'use strict';

  angular.module('augm').controller('NavCtrl', ['$window', '$rootScope', '$state', '$stateParams', '$location', '$scope', '$anchorScroll', '$uiViewScroll', '$timeout',  NavCtrl]);

  angular.module('augm')
    .config(function($collapseProvider) {
      angular.extend($collapseProvider.defaults, {
        startCollapsed: 'true'
      });
    });

  function NavCtrl($window, $rootScope, $state, $stateParams, $location, $scope, $anchorScroll, $uiViewScroll, $timeout){
    var vm = this;

    $(function() {
      $('a[href*="#"]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: (target.offset().top - 50)
            }, 1000);
            return false;
          }
        }
      });
    });
    
    return vm;
  }
})();
(function(){
  'use strict';

  angular.module('augm').controller('DisplayCtrl', [DisplayCtrl]);

	function DisplayCtrl($scope){
	    var vm = this;
		return vm;
	}
})();
(function(){
	"use strict";

	angular.module("augm").controller("MasonryCtrl", ["$scope", "photos", MasonryCtrl]);

	function MasonryCtrl($scope, photos){
		var vm = this;

		// Setting up the viewmodel with the data + first item
		vm.photos = photos;
		vm.currentPhoto = photos[0];

		// Starting up packery after images are loaded
		$scope.imgLoadedEvents = {
	        done: function(instance) {
	        	// Controller is doing dom actions here, packery schould be refactored to the angular way.
				$("#photoPiece").packery({
				  columnWidth: ".grid-sizer",
				  itemSelector: ".item",
				  "isOriginTop": true
				});
	        }
    	};

    	return vm;
	}
})();
(function(){
  'use strict';

  angular.module('augm').controller('HeaderCtrl', [HeaderCtrl]);

	function HeaderCtrl($scope){
    var vm = this;

    // console.log($(".fadeclass")[0]);

    // $(".fadeclass").map(function(){
    // 	var time = Math.random() * (5000 - 1000) + 1000;
    //     $(this).fadeTo(1, 0).delay(time).fadeTo(1000, 1);
    // });

    // $(".logos").hide().delay(7000).fadeIn(1000);
    // $(".headerText").hide().delay(7000).fadeIn(1000);


	return vm;
	}
})();
angular.module('templates-augm', ['../templates/functional/footerSiteWide.html', '../templates/functional/navSiteWide.html', '../templates/home.html', '../templates/home/about.html', '../templates/home/assumptions.html', '../templates/home/demo.html', '../templates/home/evaluation.html', '../templates/home/footerHome.html', '../templates/home/header.html', '../templates/home/literature.html', '../templates/home/masonryviewer.html', '../templates/home/navHome.html', '../templates/home/processmap.html', '../templates/home/survey.html', '../templates/home/theory.html', '../templates/home/usercamerastudy.html', '../templates/impressum.html']);

angular.module("../templates/functional/footerSiteWide.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/functional/footerSiteWide.html",
    "<div class=\"col-lg-6 col-lg-offset-2 col-md-6 col-md-offset-2 col-sm-8 col-sm-offset-0 col-xs-20 col-xs-offset-2\">\n" +
    "	<ul class=\"list-unstyled\">\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a ui-sref=\"home.subroutes\"> Home </a></h4></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a ui-sref=\"home.subroutes\"> Understand and Observe</a></h4></li>\n" +
    "				<li><a href=\"#assumptions\">Assumptions... - \"That's What We Think They Want\"</a></li>\n" +
    "				<li><a href=\"#usercamerastudy\">...And How To Get Rid Of Them - Visual Feedback Methods</a></li>\n" +
    "				<li><a href=\"#usercamerastudy\">Video: User Video Study of Jakob (7)</a></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a href=\"#analyse\"> Analyse and Ideate </a></h4></li>\n" +
    "				<li><a href=\"#survey\">So, what do visitors relate to? - <i>No comment</i> on the Masterpieces</a></li>\n" +
    "				<li><a href=\"#masonryviewer\">Detailed Case Study: User Camera Study of a Museum Visitor</a></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "<div class=\"col-lg-6 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-8 col-sm-offset-0 col-xs-20 col-xs-offset-2\">\n" +
    "	<ul class=\"list-unstyled\">\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a href=\"#prototype\"> Prototype and Test </a></h4></li>\n" +
    "				<li><a href=\"#demo\">Social Features For Visitors Engagement</a></li>\n" +
    "				<li><a href=\"#demo\">Research Trailer: Testing New App Features in the Museum</a></li>\n" +
    "				<li></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a href=\"#evaluate\"> Evaluate and Outlook </a></h4></li>\n" +
    "				<li><a href=\"#evaluation\">Process Evaluation</a></li>\n" +
    "				<li><a href=\"#evaluation\">Concluding Remarks and Outlook</a></li>\n" +
    "				<li></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a href=\"#theory\"> Theory and Methods </a></h4></li>\n" +
    "				<li><a href=\"#theory\">Social Augmentation vs. Technological Masterpieces?</a></li>\n" +
    "				<li><a href=\"#theory\">About the Interdisciplinary Approach</a></li>\n" +
    "				<li><a href=\"#literature\">Literature</a></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "<div class=\"col-lg-6 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-8 col-sm-offset-0 col-xs-20 col-xs-offset-2\">\n" +
    "	<ul class=\"list-unstyled\">\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a href=\"#about\"> About </a></h4></li>\n" +
    "				<li><h4><a href=\"#about\"> Contact </a></h4></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a ui-sref=\"impressum.subroutes\"> Impressum </a></h4></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<p class=\"copyright\">&#169; 2015 Augmenting Masterpieces</p>\n" +
    "			<li><a href=\"https://github.com/augmenting-masterpieces/AugmentM\">See project on GitHub</a></li>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/functional/navSiteWide.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/functional/navSiteWide.html",
    "<nav class=\"navbar navbar-default navbar-fixed-top\" bs-collapse bs-scrollspy-list role=\"navigation\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle\" bs-collapse-toggle>\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a ui-sref=\"home.subroutes\" class=\"navbar-brand\"><img src=\"images/logos/augmlogosmall.png\" alt=\"\"> Augmenting Masterpieces</a>\n" +
    "    </div>\n" +
    "    <div class=\"collapse navbar-collapse\" id=\"navbarcontents\" bs-collapse-target>\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li ><a ui-sref=\"home.subroutes\">Home</a></li>\n" +
    "        <li ><a ui-sref=\"impressum.subroutes\" ui-sref-active=\"active\">Impressum</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</nav>");
}]);

angular.module("../templates/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home.html",
    "<div ui-view=\"nav\"></div>  \n" +
    "<section id=\"understand\" ui-view=\"header\" class=\"row block maintro\"></section>\n" +
    "<!-- <section ui-view=\"processmap\" class=\"row block processmap\"></section>\n" +
    "<section class=\"row block intermezzo understand\">\n" +
    "	<h1 id=\"understand\" class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\"><span>Understand</span> and <span>Observe</span> </h1>\n" +
    "</section> -->\n" +
    "<section ui-view=\"assumptions\" class=\"row block assumptions\"></section>\n" +
    "<section ui-view=\"usercamerastudy\" class=\"row block userCameraStudy\"></section>\n" +
    "<section id=\"analyse\" class=\"row block intermezzo analyse\">\n" +
    "	<h1 class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\"><span>Analyse</span> and <span>Ideate</span> </h1>\n" +
    "</section>\n" +
    "<section ui-view=\"survey\" class=\"row block\"></section>\n" +
    "<section ui-view=\"masonryviewer\" class=\"row block masonry\"></section>\n" +
    "<section id=\"prototype\" class=\"row block intermezzo proto\">\n" +
    "	<h1 class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\"><span>Prototype</span> and <span>Test</span></h1>\n" +
    "</section>\n" +
    "<section ui-view=\"demo\" class=\"row block\"></section>\n" +
    "<section id=\"evaluate\" class=\"row block intermezzo evaluate\">\n" +
    "	<h1 class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\"><span>Evaluate</span> and <span>Outlook</span></h1>\n" +
    "</section>\n" +
    "<section ui-view=\"evaluation\" class=\"row block\"></section>\n" +
    "<section id=\"theory\" class=\"row block intermezzo theory\">\n" +
    "	<h1 class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\"><span>Theory</span> and <span>Methods</span></h1>\n" +
    "</section>\n" +
    "<section ui-view=\"theory\" class=\"row block\"></section>\n" +
    "<section ui-view=\"literature\" class=\"row block literature\"></section>\n" +
    "<section id=\"about\" class=\"row block intermezzo about\">\n" +
    "	<h1 class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\"><span>About</span></h1>\n" +
    "</section>\n" +
    "<section ui-view=\"about\" class=\"row block about\"></section>\n" +
    "<footer ui-view=\"footer\" class=\"clearfix row\"></footer>\n" +
    "");
}]);

angular.module("../templates/home/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/about.html",
    "<div class=\"col-lg-11 col-lg-offset-2 col-md-12 col-md-offset-1 col-sm-13 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<h2>About</h2>\n" +
    "	<div class=\"person row\">\n" +
    "		<div class=\"col-lg-6 col-lg-offset-0 col-md-6 col-md-offset-0 col-sm-6 col-sm-offset-0 col-xs-12 col-xs-offset-0 removePadding\">\n" +
    "			<img src=\"./images/logos/augmlogosmall.png\" alt=\"Contributors UvA -> Rijksmuseum\">\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-18 col-lg-offset-0 col-md-18 col-md-offset-0 col-sm-18 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "			<p>Augmenting Masterpieces is a collaboration between the University of Amsterdam and the Rijksmuseum Amsterdam. For building and testing the app features Floris de Langen and Roel van der Wal functioned as tech partner from the creative industries.</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"person row\">\n" +
    "		<div class=\"col-lg-6 col-lg-offset-0 col-md-6 col-md-offset-0 col-sm-6 col-sm-offset-0 col-xs-12 col-xs-offset-0 removePadding\">\n" +
    "			<img src=\"./images/persons/johanna2.jpg\" alt=\"Embedded Researcher UvA -> Rijksmuseum\">\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-18 col-lg-offset-0 col-md-18 col-md-offset-0 col-sm-18 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "			<p><b>Johanna Barnbeck</b> designs the research process and carries out the different phases of creation and experimentation. She is an artist, researcher and creative professional with an expertise in multidisciplinary projects combining Artistic Research, Design Thinking and Cultural Analysis.</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"person row\">\n" +
    "		<div class=\"col-lg-6 col-lg-offset-0 col-md-6 col-md-offset-0 col-sm-6 col-sm-offset-0 col-xs-12 col-xs-offset-0 removePadding\">\n" +
    "			<img src=\"./images/persons/janHein.jpg\" alt=\"Jan Hein Hoogstad - Assistant Professor Cultural Analysis\">\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-18 col-lg-offset-0 col-md-18 col-md-offset-0 col-sm-18 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "			\n" +
    "			<p>Assistant professor <b>Jan Hein Hoogstad</b> teaches a course on the API of the Rijksmuseum at the University of Amsterdam. With his initiative “Coding the Humanities”, he introduces tools and practices - such as automation, collaboration, and testing - from open-source and commercial software development into humanities research and teaching.</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"person row\">\n" +
    "		<div class=\"col-lg-6 col-lg-offset-0 col-md-6 col-md-offset-0 col-sm-6 col-sm-offset-0 col-xs-12 col-xs-offset-0 removePadding\">\n" +
    "			<img src=\"./images/persons/patty.jpg\" alt=\"Intern and Thesis\">\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-18 col-lg-offset-0 col-md-18 col-md-offset-0 col-sm-18 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "			<p>Patty Jansen interns at the project, foremost concerned with the front- and back end of this website, and also takes an active part in Jan Hein Hoogstad's Coding the Humanities project. Patty is completing her master's in Artistic Research at the University of Amsterdam.</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"person row\">\n" +
    "		<div class=\"col-lg-6 col-lg-offset-0 col-md-6 col-md-offset-0 col-sm-6 col-sm-offset-0 col-xs-12 col-xs-offset-0 removePadding\">\n" +
    "			<img src=\"./images/persons/robert.jpg\" alt=\"Intern\">\n" +
    "		</div>\n" +
    "		<div class=\"col-lg-18 col-lg-offset-0 col-md-18 col-md-offset-0 col-sm-18 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "			<p>Robert-Jan Korteschiel is interning at Augmenting Masterpieces, together with Patty he built this website and is also an active contributor for Coding the Humanities. He is studying Art History at the University of Amsterdam.</p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div class=\"col-lg-7 col-lg-offset-2 col-md-8 col-md-offset-1 col-sm-9 col-sm-offset-1 col-xs-24 col-xs-offset-0\" >\n" +
    "	<h2>Partners</h2>\n" +
    "	<a href=\"http://cdh.uva.nl/\"><img class=\"partners\" src=\"./images/logos/uvalogo.png\">\n" +
    "	<a href=\"https://www.rijksmuseum.nl/\"><img class=\"partners\" src=\"./images/logos/rijks.png\"></a>\n" +
    "\n" +
    "<!-- 	<h2>Contact</h2>\n" +
    "	<p>University of Amsterdam <br>Centre for Digital Humanities<br>Vendelstraat 8<br>1012XX Amsterdam<br>\n" +
    "	<p>barnbeck@uva.nl</p>\n" +
    "	<br> -->\n" +
    "\n" +
    "	<h2>Mailing list</h2>\n" +
    "	<!-- Begin MailChimp Signup Form -->\n" +
    "	<div id=\"mc_embed_signup\">\n" +
    "		<form action=\"//wix.us3.list-manage.com/subscribe/post?u=441ffe1b780f94da8bfedb43c&amp;id=ec4ca8f48f\" method=\"post\" id=\"mc-embedded-subscribe-form\" name=\"mc-embedded-subscribe-form\" class=\"validate\" target=\"_blank\" novalidate>\n" +
    "		    <div id=\"mc_embed_signup_scroll\">\n" +
    "				<h4>Subscribe to our low-traffic mailing list</h4>\n" +
    "				<div class=\"mc-field-group\">\n" +
    "					<label for=\"mce-EMAIL\">Email Address</label>\n" +
    "					<input type=\"email\" value=\"\" name=\"EMAIL\" class=\"required email\" id=\"mce-EMAIL\">\n" +
    "				</div>\n" +
    "\n" +
    "				<div id=\"mce-responses\" class=\"clear\">\n" +
    "					<div class=\"response\" id=\"mce-error-response\" style=\"display:none\"></div>\n" +
    "					<div class=\"response\" id=\"mce-success-response\" style=\"display:none\"></div>\n" +
    "				</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->\n" +
    "			    <div style=\"position: absolute; left: -5000px;\">\n" +
    "			    	<input type=\"text\" name=\"b_441ffe1b780f94da8bfedb43c_ec4ca8f48f\" tabindex=\"-1\" value=\"\">\n" +
    "			    </div>\n" +
    "			    <div class=\"clear\">\n" +
    "			    	<input type=\"submit\" value=\"Subscribe\" name=\"subscribe\" id=\"mc-embedded-subscribe\" class=\"button\">\n" +
    "			    </div>\n" +
    "		    </div>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "	<!--End mc_embed_signup-->\n" +
    "\n" +
    "	<h2>Private Partners</h2>\n" +
    "	<div>\n" +
    "		<a href=\"http://cdh.uva.nl/\"><img class=\"privatePartners\" src=\"./images/logos/logo_uncinc.png\"></a>\n" +
    "	</div>\n" +
    "	<div>\n" +
    "		<a href=\"https://www.rijksmuseum.nl/\"><img class=\"privatePartners\" src=\"./images/logos/screenturner_logo_001.svg\"></a>\n" +
    "	</div>\n" +
    "	<div>\n" +
    "		<a href=\"http://cdh.uva.nl/\"><img class=\"privatePartners\" src=\"./images/logos/resultat-logo-mono-2.png\"></a>\n" +
    "	</div>\n" +
    "	<div>\n" +
    "		<a href=\"http://cdh.uva.nl/\"><img class=\"privatePartners\" src=\"./images/logos/cth-logo.svg\"></a>\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("../templates/home/assumptions.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/assumptions.html",
    "<div class=\"overflow-container\">\n" +
    "	<div class=\"col-lg-8 col-lg-offset-1 col-md-9 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "		<h2> Assumptions...</h2>\n" +
    "		<h3>“That's what we think they want.”</h3>\n" +
    "		<p>During an initial expert's meeting at the Rijksmuseum the discussion evolved around digital interfaces the museum already uses, what the different departments wished for in the future in order to cater to the visitor's needs, and how they pursue their goals of engaging museum visitors with the exhibition.</p>\n" +
    "		<p>Soon the discussion focused on what everybody thought the museum visitors actually want - seen from different academic and professional perspectives. The discussion culminated in someone asking: “Do visitors actually want a different experience? Everything that we discuss is just <i>what we think they want<i/>.”</p>\n" +
    "		<p>To reflect on made assumptions can serve as the basis for research. When being aware of them, it is a necessary challenge to get subsequently rid off of them, in order to identify insights for the design thinking process. Thus, to built new interfaces would first of all mean to get valuable input from all the employees running the Rijksmuseum on a daily basis and to engage with the diverse experiences from the museum visitors.</p>\n" +
    "		\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-13 col-lg-offset-1 col-md-12 col-md-offset-1 col-sm-12 col-sm-offset-0 col-xs-24 col-xs-offset-0 hidden-xs image-container\">\n" +
    "		<img class=\"child\" src=\"images/webimages/visitors_aussumptions.jpg\">\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/home/demo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/demo.html",
    "<div class=\"col-lg-20 col-lg-offset-2 col-md-20 col-md-offset-1 col-sm-20 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<h2>Social features for visitor's engagement</h2>\n" +
    "	<h3>Doesn't matter how much 'cultural capital' you bring.</h3>\n" +
    "</div>\n" +
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<p>The insights from the Visual Feeback Studies inspired us to prototype social strategies which let the visitors engage with their surrounding on more general terms and independently of their <i>cultural capital</i>, in order make them feel more comfortable and valuable to the museum.</p>\n" +
    "</div>\n" +
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-11 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "	<p>Instead of providing people with in-depth (art) historical background information about art works, we designed three app features for location-based, random encounters. One of them lets the visitors of the Rijksmuseum discover hidden stories by other visitors throughout the museum, using one of the new app features on their smartphones.</p>\n" +
    "	<p>Rather than following a route, visitors encounter stories coincidentally during their visit and can instantly record and add an observation themselves wherever they like. </p>\n" +
    "	<p>By that, each artwork receives a socially augmented layer. How does it work exactly? Watch the trailer from testing our prototypes. </p></a>\n" +
    "	<br>\n" +
    "</div>\n" +
    "<div class=\"col-lg-22 col-lg-offset-1 col-md-22 col-md-offset-1 col-sm-22 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<div class=\"videos embed-responsive embed-responsive-16by9\">\n" +
    "		<iframe src=\"http://player.vimeo.com/video/112958657\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/home/evaluation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/evaluation.html",
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<h1>Process Evaluation</h1>\n" +
    "	<p>We prototyped and tested three features, which tried to provide answers to the human-centered design question: “How we might engage museum visitors more with their surrounding without indicating a distinction by putting value into the aspect they choose to engage with?”</p>\n" +
    "\n" +
    "	Even stronger, by letting them emphasizing their own aspects in order to find their own approach to the exhibition.</p>\n" +
    "\n" +
    "	<p>The ambition was to take away their feeling of 'social awkwardness' or felt lack of knowledge through letting them contribute their own impressions and observations about the museum and the artworks in it, and through encountering random stories or trivia questions at at random pieces of art by other visitors.</p>\n" +
    "\n" +
    "	<p>The critical feedback we received matched our hypothesis that visitors of the 'cultural professional'-group, who already know how they can personally interact with the museum setting, required and appreciated the informal quality of the stories less than visitors of the other categories. However, all of the visitors said that it made their museum visit more interactive and brought in different perspectives they wouldn't have thought of themselves.</p>\n" +
    "</div>\n" +
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "	<h1>Concluding Remarks</h1>\n" +
    "	<p>Visitors largely appreciated the possibility of submitting own stories and trivia questions, and were tempted to do so.</p>\n" +
    "\n" +
    "	<p>The majority of the test persons indicated that they would use the app throughout the museum if it was available, that they would recommend it to their friends or family and like the idea to contribute to the app content themselves. In that regard, the first prototyped versions of design features are ready to develop further and to be tested with extended functionality.</p>\n" +
    "\n" +
    "	<p>On general terms, the human-centered design approach in combination with creative and visual research methods has proven to be incredibly fruitful when researching the different aspects that visitors deal with when visiting the Rijksmuseum. And to carefully compare those to the assumptions made by museum professional (including ourselves).</p>\n" +
    "\n" +
    "	<p>To take museum visitors serious in their needs and different levels of cultural capital, allowed us to <i>socially</i> augment the masterpieces of the Rijksmuseum.</p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/home/footerHome.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/footerHome.html",
    "<div class=\"col-lg-6 col-lg-offset-2 col-md-6 col-md-offset-2 col-sm-8 col-sm-offset-0 col-xs-20 col-xs-offset-2\">\n" +
    "	<ul class=\"list-unstyled\">\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a href=\"#main\"> Home </a></h4></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a href=\"#understand\"> Understand and Observe</a></h4></li>\n" +
    "				<li><a href=\"#assumptions\">Assumptions... - \"That's What We Think They Want\"</a></li>\n" +
    "				<li><a href=\"#usercamerastudy\">...And How To Get Rid Of Them - Visual Feedback Methods</a></li>\n" +
    "				<li><a href=\"#usercamerastudy\">Video: User Video Study of Jakob (7)</a></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a href=\"#analyse\"> Analyse and Ideate </a></h4></li>\n" +
    "				<li><a href=\"#survey\">So, what do visitors relate to? - <i>No comment</i> on the Masterpieces</a></li>\n" +
    "				<li><a href=\"#masonryviewer\">Detailed Case Study: User Camera Study of a Museum Visitor</a></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "<div class=\"col-lg-6 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-8 col-sm-offset-0 col-xs-20 col-xs-offset-2\">\n" +
    "	<ul class=\"list-unstyled\">\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a href=\"#prototype\"> Prototype and Test </a></h4></li>\n" +
    "				<li><a href=\"#demo\">Social Features For Visitors Engagement</a></li>\n" +
    "				<li><a href=\"#demo\">Research Trailer: Testing New App Features in the Museum</a></li>\n" +
    "				<li></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a href=\"#evaluate\"> Evaluate and Outlook </a></h4></li>\n" +
    "				<li><a href=\"#evaluation\">Process Evaluation</a></li>\n" +
    "				<li><a href=\"#evaluation\">Concluding Remarks and Outlook</a></li>\n" +
    "				<li></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a href=\"#theory\"> Theory and Methods </a></h4></li>\n" +
    "				<li><a href=\"#theory\">Social Augmentation vs. Technological Masterpieces?</a></li>\n" +
    "				<li><a href=\"#theory\">About the Interdisciplinary Approach</a></li>\n" +
    "				<li><a href=\"#literature\">Literature</a></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "<div class=\"col-lg-6 col-lg-offset-1 col-md-6 col-md-offset-1 col-sm-8 col-sm-offset-0 col-xs-20 col-xs-offset-2\">\n" +
    "	<ul class=\"list-unstyled\">\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a href=\"#about\"> About </a></h4></li>\n" +
    "				<li><h4><a href=\"#about\"> Contact </a></h4></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<ul class=\"list-unstyled\">\n" +
    "				<li><h4><a ui-sref=\"impressum.subroutes\"> Impressum </a></h4></li>\n" +
    "			</ul>\n" +
    "		</li>\n" +
    "		<li>\n" +
    "			<p class=\"copyright\">&#169; 2015 Augmenting Masterpieces</p>\n" +
    "			<li><a href=\"https://github.com/augmenting-masterpieces/AugmentM\">See project on GitHub</a></li>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/home/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/header.html",
    "<div class=\"col-lg-10 col-lg-offset-7 col-md-12 col-md-offset-6 col-sm-16 col-sm-offset-4 col-xs-24 col-xs-offset-0\">\n" +
    "	<div class=\"title\">\n" +
    "		<img src=\"images/logos/augmlogo.png\" alt=\"\">\n" +
    "		<p class=\"headerText\">Augmenting Masterpieces explores visitors' experiences and the social dimensions of a visit to the Rijksmuseum. It translates the findings into an interface which lets the visitor interact with both the physical and the digital collection. Through embedded and artistic research methods the project reduces the gap between academic research and creative production. Its results manifest in a prototype, academic articles and this multi-medial presentation.</p>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-lg-12 col-lg-offset-0 col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "				<a href=\"https://www.rijksmuseum.nl/\"><img class=\"alienlogos\" src=\"./images/logos/rijkswhite.png\"></a>\n" +
    "			</div>\n" +
    "			<div class=\"col-lg-12 col-lg-offset-0 col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "				<a href=\"http://cdh.uva.nl/\"><img class=\"alienlogos\" src=\"./images/logos/uvalogowhite.png\"></a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div> \n" +
    "</div>");
}]);

angular.module("../templates/home/literature.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/literature.html",
    "<div class=\"col-lg-22 col-lg-offset-1 col-md-22 col-md-offset-0 col-sm-22 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "	<h1>Literature</h1>\n" +
    "</div>\n" +
    "<div class=\"col-lg-10 col-lg-offset-1 col-md-11 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-24 col-xs-offset-0 literatureDiv\">\n" +
    "	<ul>\n" +
    "		<li>A Touch of Code. Interactive Installations and Experiences. Ed. Robert Klanten, Sven Ehmann, and Verena Hanschke. Berlin: Gestalten, 2011. Print.</li>\n" +
    "\n" +
    "		<li>Bal, Mieke. Reading Rembrandt: Beyond the Word-Image Opposition. Amsterdam: Amsterdam University Press, 2006. Print.</li>\n" +
    "\n" +
    "		<li>Birringer, Johannes “Moveable worlds/Digital scenographies”,            International Journal of Performance Arts &amp; Digital Media, Volume 6, Number 1, 1 June 2010 , pp. 89-107(19).</li>\n" +
    "\n" +
    "		<li>Bostock, Michael, Vadim Ogievetsky, and Jeffrey Heer. “D3: Data-Driven Documents” IEEE Trans. Visualization &amp; Comp. Graphics. 2011. Online.</li>\n" +
    "\n" +
    "		<li>Bullivant, Lucy. Interactive Architecture 4D Social: Interactive Design Environments. Indianapolis: Wiley and Sons, 2007. Print.</li>\n" +
    "\n" +
    "		<li>Certeau, Michel de. “Spatial Stories.” The Practice of Everyday Life. Minneapolis: University Of Minnesota Press, 1984. 115–130. Print.</li>\n" +
    "\n" +
    "		<li>Falk, J. (2009). Identity and the Museum Visitor Experience. Walnut Creek, CA Left Coast Press.</li>\n" +
    "\n" +
    "		<li>Glogner, Patrick; Föhl, Patrick (2010) Das Kulturpublikum:             Fragestellungen und Befunde der empirischen Forschung. VS Verlag für Sozialwissenschaften.</li>\n" +
    "\n" +
    "		<li>Heer, Jeffrey, Bostock Mike. “Declarative Language Design for Interactive Visualization.” IEEE Trans. Visualization &amp; Comp. Graphics. 2010. Online.</li>\n" +
    "\n" +
    "		<li>Hermes, Joke “Audience Studies 2.0. On the theory, politics and method of qualitative audience research.” In: Interactions: Studies in       Communication &amp; Culture, Volume 1, Number 1, 1 September 2009, pp. 111-127(17).</li>\n" +
    "\n" +
    "		<li>Informotion. Animated Infographics. Ed. Tim Finke and Sebastian Manger.Berlin: Gestalten, 2012. Print.</li>\n" +
    "\n" +
    "		<li>Kirchberg, Volker (2009) Innovative Besucher- und Museumsforschung: Hintergrundbericht, \n" +
    "		<a href=\"http://www.kulturmanagement.net/beitraege/prm/39/v__d/ni__879/index.html\">website</a></li>\n" +
    "\n" +
    "		<li>Kittler, Friedrich. “The Perspective of Print.” Configurations. 10.1 (2002): 37–50. Print. “Universities: Wet, Hard, Soft, and Harder.” Critical Inquiry 31.1 (2004): 244–255. Print.</li>\n" +
    "\n" +
    "		<li>Kossman, Herman, and Mark de Jong. Engaging Spaces: Exhibition DesignExplored. Amsterdam: Frame, 2010. Print.</li>\n" +
    "\n" +
    "		<li>Museum Informatics: People, Information, and Technology in Museums. Ed. Paul F. Marty, and Katherine Burton Burton Jones. New York: Routledge, 2009. Print.</li>\n" +
    "\n" +
    "		<li>Park, Ki-Woong, et al. “Towards Interactive Museum: Mapping Cultural\n" +
    "		Contexts to Historical Objects.” Relation 10.1.142 (2009): 5630. Print.</li>\n" +
    "\n" +
    "	</ul>\n" +
    "</div>\n" +
    "<div class=\"col-lg-10 col-lg-offset-2 col-md-11 col-md-offset-1 col-sm-12 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "    <ul>\n" +
    "		<li>Parry, Ross. Museums in a Digital Age. New York: Routledge, 2010. Print.</li>\n" +
    "\n" +
    "		<li>Reas, Casey, and Ben Fry. Processing. A Programming Handbook for Visual Designers and Artists. Cambridge MA: MIT Press, 2007. Print.</li>\n" +
    "\n" +
    "		<li>Renden, Sandra. Information Graphics. Ed. Julius Wiedemann. Cologne, Taschen, 2012. Print.</li>\n" +
    "\n" +
    "		<li>Ronell, Avitall. “Proving Grounds: On Nietzsche and the Test Drive.” MLN.118.3 (2003): 653–669. Print.</li>\n" +
    "\n" +
    "		<li>Rowea, Anthony “Digital Creativity - Designing for engagement in mixed reality experiences that combine projection mapping and camera- based interaction.” http://www.tandfonline.com/toc/ndcr20/current#.UZOLYCvOSjw</li>\n" +
    "\n" +
    "		<li>Simon, Nina. The Participatory Museum. Santa Cruz, CA: Museum 2.0, 2010.Print. </li>\n" +
    "	\n" +
    "		<li>Smeets, Ionica &amp; Schraffenberger Hanna “OK, Glass?”, In: AR[t] – Augmented Reality, Art and Technology, 04 nov 2013, p. 42-48. http://issuu.com/arlab/docs/art4_issuu</li>\n" +
    "\n" +
    "		<li>Schraffenberger, Hanna &amp; E. van der Heide “Interaction Models for Audience-Artwork Interaction: Current State and Future Directions.” In: Arts and Technology, Second International Conference, ArtsIT 2011, Lecture Notes of the Institute for Computer Sciences, Social Informatics and Telecommunications Engineering (LNICST), 2011.</li>\n" +
    "\n" +
    "		<li>Tröndle, Martin (2011): The Entanglement of Arts and Sciences: On the Transaction Costs of Transdisciplinary Research Settings. In: Journalfor Artistic Research. Issue 1.</li>\n" +
    "\n" +
    "		<li>Tröndle, Martin / Greenwood, Steven / Kirchberg, Volker / Tschacher, Wolfgang: An Integrative and Comprehensive Methodology for Studying Aesthetic Experience in the Field: Merging Movement Tracking, Physiology and Psychological Data. Environment and Behavior. 2012. doi:10.1177/0013916512453839</li>\n" +
    "\n" +
    "		<li>Tschacher, Wolfgang (2012). Physiological correlates of aesthetic perception in a museum, In: Journal of Psychology of Aesthetics, Creativity, and the Arts, 6, 96-103. doi: 10.1037/a0023845</li>\n" +
    "\n" +
    "		<li>Tufte, Edward R. Visual Explanations: Images and Quantities, Evidence and Narrative. Chesire CT: Graphics Press, 1997. Print.</li>\n" +
    "\n" +
    "		<li>Van Hage, Willem Robert, et al. “Finding your way through the Rijksmuseum with an adaptive mobile museum guide.” The Semantic Web: Research and Applications. Berlin: Springer, 2010. 46–59. Print.</li>\n" +
    "\n" +
    "		<li>Visser, Jasper; Richardson, Jim (2013) Digital Engagement In Culture, Heritage and the Arts.http://www.digitalengagementframework.com/</li>\n" +
    "	</ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/home/masonryviewer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/masonryviewer.html",
    "<div class=\"col-lg-8 col-lg-offset-2 col-md-9 col-md-offset-1 col-sm-10 col-sm-offset-0 col-xs-24 col-xs-offset-0 legend\">\n" +
    "	<h1>Camera Study</h1>\n" +
    "	<h3>{{mason.currentPhoto.name}}</h3>\n" +
    "	<p>{{mason.currentPhoto.quotes}}</p>\n" +
    "	<p>{{mason.currentPhoto.transcriptSnippet}}</p>\n" +
    "	<img ng-src=\"{{mason.currentPhoto.src}}\">\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-lg-11 col-lg-offset-1 col-md-12 col-md-offset-1 col-sm-13 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "<!-- 	<blockquote>A detailed profile and script from a participating Cultural Tourist illustrating collected input from museum visitors.</blockquote> -->\n" +
    "	<p class=\"centerText\">(click on the images)</p>\n" +
    "	<div id=\"photoPiece\" images-loaded=\"imgLoadedEvents\">\n" +
    "		<div class=\"grid-sizer\"></div>\n" +
    "		<div class=\"item\" ng-repeat=\"photo in mason.photos\">\n" +
    "			<img ng-src=\"{{::photo.src}}\" ng-click=\"mason.currentPhoto = photo\" alt=\"\">\n" +
    "		</div>	\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("../templates/home/navHome.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/navHome.html",
    "<nav class=\"navbar navbar-default navbar-fixed-top\" bs-collapse bs-scrollspy-list role=\"navigation\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle\" bs-collapse-toggle>\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a class=\"navbar-brand\" bs-scrollspy href=\"#main\"><img src=\"images/logos/augmlogosmall.png\" alt=\"\"> Augmenting Masterpieces</a>\n" +
    "    </div>\n" +
    "    <div class=\"collapse navbar-collapse\" id=\"navbarcontents\" bs-collapse-target>\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li bs-scrollspy data-target=\"#understand\"><a href=\"#understand\">Understand <span class=\"hidden-sm hidden-md\">and Observe</span></a></li>\n" +
    "        <li bs-scrollspy data-target=\"#analyse\"><a href=\"#analyse\">Analyse <span class=\"hidden-sm hidden-md\">and Ideate</span></a></li>\n" +
    "        <li bs-scrollspy data-target=\"#prototype\"><a href=\"#prototype\">Prototype <span class=\"hidden-sm hidden-md\">and Test</span></a></li>\n" +
    "        <li bs-scrollspy data-target=\"#evaluate\" ><a href=\"#evaluate\">Evaluate <span class=\"hidden-sm hidden-md\">and Outlook</span></a></li>\n" +
    "        <li bs-scrollspy data-target=\"#theory\"><a href=\"#theory\">Theory <span class=\"hidden-sm hidden-md\">and Methods</span></a></li>\n" +
    "      </ul>\n" +
    "      <ul class=\"nav navbar-nav navbar-right\">\n" +
    "        <li bs-scrollspy data-target=\"#about\"><a href=\"#about\">About</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</nav>");
}]);

angular.module("../templates/home/processmap.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/processmap.html",
    "<div>\n" +
    "	<div class=\"col-lg-6 col-lg-offset-2 col-md-22 col-md-offset-1 col-sm-20 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "		<a href=\"#understand\"><h1>Understand and Observe</h1></a>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-2 col-lg-offset-0 col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-1 col-xs-4 col-xs-offset-0\">\n" +
    "		<p class=\"arrow\">&#8594;</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-5 col-lg-offset-0 col-md-10 col-md-offset-0 col-sm-11 col-sm-offset-0 col-xs-20 col-xs-offset-0\">\n" +
    "		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ducimus eos magni in, culpa animi obcaecati quidem totam hic, nostrum veniam, et corporis molestias facilis nobis ex assumenda vel accusamus suscipit. Culpa quisquam dignissimos quam modi, ipsum hic vitae sit sunt, eligendi officia nesciunt magni atque nisi et ducimus voluptate.</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-2 col-lg-offset-0 col-md-4 col-md-offset-7 col-sm-4 col-sm-offset-5 col-xs-4 col-xs-offset-2\">\n" +
    "		<p class=\"arrow\">&#8594;</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-5 col-lg-offset-0 col-md-10 col-md-offset-0 col-sm-11 col-sm-offset-0 col-xs-18 col-xs-offset-0\">\n" +
    "		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis at dolor sapiente quod rerum praesentium blanditiis nobis, amet minus quaerat quisquam a nihil laudantium unde iure, recusandae, reprehenderit aperiam. Numquam, libero magni pariatur fugiat ab iste minus fuga, omnis ea nemo saepe? Cum, vitae, recusandae. Sunt iure est dolore placeat!</p>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div>\n" +
    "	<div class=\"col-lg-6 col-lg-offset-2 col-md-22 col-md-offset-1 col-sm-20 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "		<a href=\"#analyse\"><h1>Analyse and Ideate</h1></a>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-2 col-lg-offset-0 col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-1 col-xs-4 col-xs-offset-0\">\n" +
    "		<p class=\"arrow\">&#8594;</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-5 col-lg-offset-0 col-md-10 col-md-offset-0 col-sm-11 col-sm-offset-0 col-xs-20 col-xs-offset-0\">\n" +
    "		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ducimus eos magni in, culpa animi obcaecati quidem totam hic, nostrum veniam, et corporis molestias facilis nobis ex assumenda vel accusamus suscipit. Culpa quisquam dignissimos quam modi, ipsum hic vitae sit sunt, eligendi officia nesciunt magni atque nisi et ducimus voluptate.</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-2 col-lg-offset-0 col-md-4 col-md-offset-7 col-sm-4 col-sm-offset-5 col-xs-4 col-xs-offset-2\">\n" +
    "		<p class=\"arrow\">&#8594;</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-5 col-lg-offset-0 col-md-10 col-md-offset-0 col-sm-11 col-sm-offset-0 col-xs-18 col-xs-offset-0\">\n" +
    "		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis at dolor sapiente quod rerum praesentium blanditiis nobis, amet minus quaerat quisquam a nihil laudantium unde iure, recusandae, reprehenderit aperiam. Numquam, libero magni pariatur fugiat ab iste minus fuga, omnis ea nemo saepe? Cum, vitae, recusandae. Sunt iure est dolore placeat!</p>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div>\n" +
    "	<div class=\"col-lg-6 col-lg-offset-2 col-md-22 col-md-offset-1 col-sm-20 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "		<a href=\"#prototype\"><h1>Prototype and Test</h1></a>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-2 col-lg-offset-0 col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-1 col-xs-4 col-xs-offset-0\">\n" +
    "		<p class=\"arrow\">&#8594;</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-5 col-lg-offset-0 col-md-10 col-md-offset-0 col-sm-11 col-sm-offset-0 col-xs-20 col-xs-offset-0\">\n" +
    "		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ducimus eos magni in, culpa animi obcaecati quidem totam hic, nostrum veniam, et corporis molestias facilis nobis ex assumenda vel accusamus suscipit. Culpa quisquam dignissimos quam modi, ipsum hic vitae sit sunt, eligendi officia nesciunt magni atque nisi et ducimus voluptate.</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-2 col-lg-offset-0 col-md-4 col-md-offset-7 col-sm-4 col-sm-offset-5 col-xs-4 col-xs-offset-2\">\n" +
    "		<p class=\"arrow\">&#8594;</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-5 col-lg-offset-0 col-md-10 col-md-offset-0 col-sm-11 col-sm-offset-0 col-xs-18 col-xs-offset-0\">\n" +
    "		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis at dolor sapiente quod rerum praesentium blanditiis nobis, amet minus quaerat quisquam a nihil laudantium unde iure, recusandae, reprehenderit aperiam. Numquam, libero magni pariatur fugiat ab iste minus fuga, omnis ea nemo saepe? Cum, vitae, recusandae. Sunt iure est dolore placeat!</p>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div>\n" +
    "	<div class=\"col-lg-6 col-lg-offset-2 col-md-22 col-md-offset-1 col-sm-20 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "		<a href=\"#evaluate\"><h1>Evaluate and Outlook</h1></a>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-2 col-lg-offset-0 col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-1 col-xs-4 col-xs-offset-0\">\n" +
    "		<p class=\"arrow\">&#8594;</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-5 col-lg-offset-0 col-md-10 col-md-offset-0 col-sm-11 col-sm-offset-0 col-xs-20 col-xs-offset-0\">\n" +
    "		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod ducimus eos magni in, culpa animi obcaecati quidem totam hic, nostrum veniam, et corporis molestias facilis nobis ex assumenda vel accusamus suscipit. Culpa quisquam dignissimos quam modi, ipsum hic vitae sit sunt, eligendi officia nesciunt magni atque nisi et ducimus voluptate.</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-2 col-lg-offset-0 col-md-4 col-md-offset-7 col-sm-4 col-sm-offset-5 col-xs-4 col-xs-offset-2\">\n" +
    "		<p class=\"arrow\">&#8594;</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-5 col-lg-offset-0 col-md-10 col-md-offset-0 col-sm-11 col-sm-offset-0 col-xs-18 col-xs-offset-0\">\n" +
    "		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis at dolor sapiente quod rerum praesentium blanditiis nobis, amet minus quaerat quisquam a nihil laudantium unde iure, recusandae, reprehenderit aperiam. Numquam, libero magni pariatur fugiat ab iste minus fuga, omnis ea nemo saepe? Cum, vitae, recusandae. Sunt iure est dolore placeat!</p>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("../templates/home/survey.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/survey.html",
    "<div class=\"col-lg-8 col-lg-offset-2 col-md-9 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<h2>So, what do visitors relate to?</h2>\n" +
    "	<h3><i>No comment</i> on the Masterpieces.</h3>\n" +
    "	<p>Whereas the amount of time spent in the museum looking at artworks varied largely between the different participants, all of them carefully observed other visitors, listened into their conversations or were reflecting on their own (proper) behaviour. Most of them also described a feeling of awkwardness at times, that was connected to a felt lack of knowledge.</p> \n" +
    "	<p>The gallery below shows interview snippets and photographs by Chris, a participating 'cultural tourist'. The infographic depicts how long he stayed and what he took pictures of. Chris gave 'no comment' on seven out of his 42 pictures. Five of them, were photographs of famous paintings. When being asked, why he took those pictures, he said: “I know they [the artworks] are important, so I took a picture of them.”</p>\n" +
    "	<p>Though he referenced the pictures as important, their cultural status did not make him retrieve information about them. All his descriptions were based on (coincidental) experiences and social encounters.</p>\n" +
    "	<p>Thus, the <i>social dimensions<i/> of a museum visit are highly important for museum visitors. All of them share a high level of interest in indirect social interaction and in being able to share narratives in an unbiased way.</p>	\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"col-lg-11 col-lg-offset-1 col-md-12 col-md-offset-1 col-sm-13 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "	<img src=\"images/webimages/infographic_new.jpg\">\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/home/theory.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/theory.html",
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<h2>Social augmentation vs. technological masterpieces?</h2>\n" +
    "	<h3>Project objectives</h3>\n" +
    "	<p>'Augmentation' is currently often brought up in relation to 'augmented reality' which uses a virtual layer over what we conceive as our real life. Often the use of the word goes hand in hand with a supposed technological innovation, and also our project title suggests that a superimposed “computer-generated image on a user's view of the real world, thus providing a composite view”1 will be in the centre of attention.<br> \n" +
    "	However, the research at stake is not implying an augmented reality but much rather the process of augmentation of artworks in the Rijksmuseum by means of technology.<br> \n" +
    "	When the literal meaning of 'augmentation' simply describes it as 'make something greater by adding to it', 'to increase' or the 'act of making greater'2, the questions arise of (a) what aspects of the artworks should be highlighted, (b) for whom, (c) how does the interface between the object and the viewer look like and (d) through which digital device and software will the work of art be enhanced? </p>\n" +
    "</div>\n" +
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "	<h1>Interdisciplinary approach</h1>\n" +
    "	<p>In order to tackle the first two questions, the design thinking method was used for structuring the whole process of the project, substituted by Visual Feedback Methods which are partly taken from the design thinking toolbox3 and partly developed in my artistic research practice throughout the past years.<br> \n" +
    "	Embedded research projects stimulate collaborations between cultural institutions, the creative industries and universities.<br> \n" +
    "	In order to do justice to not only theoretically investigate, but also practically implement research results within the same project, this new form of research within the humanities, also needs a revised set of tools and possible forms for output.<br> \n" +
    "	The methodological combination of the above mentioned toolboxes from design thinking and artistic research, guaranteed an adequate interdisciplinary assemblage of techniques and media. Whereas Artistic Research allows to creatively and practically work with post-modern theories, the Design Thinking approach gives access to co-creation frameworks and user innovation while building a product-oriented bridge between academic research, creative output and technological prototype.</p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/home/usercamerastudy.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/home/usercamerastudy.html",
    "<div class=\"col-lg-13 col-lg-offset-1 col-md-12 col-md-offset-1 col-sm-22 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<div class=\"videos embed-responsive embed-responsive-16by9\">\n" +
    "		<iframe src=\"http://player.vimeo.com/video/112510250\" frameborder=\"0\" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>\n" +
    "	</div>\n" +
    "	<h4>We asked children to wear a video camera during their museum visit. Their perspective differs due to their height and we were interested in what they looked at since they are not as culturally trained to visit a museum yet.</h4>\n" +
    "	<p>Language: Dutch. For English subtitles click 'CC' in the player</p>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-lg-8 col-lg-offset-1 col-md-9 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<h2>...And How To Get Rid Of Them.</h2>\n" +
    "	<h3>Visual Feedback Methods</h3>\n" +
    "	<p>When being interviewed, survey participants can put their experiences and opinions into words. They describe what they see, feel and thought during their visit. With the User Camera Study we carried out, they are given a digital compact camera as an additional medium to capture details and to express themselves. For the User Video Study we supplied visitors with a wearable camera to collect footage from a first person perspective.</p>\n" +
    "</div>\n" +
    "<div class=\"col-lg-8 col-lg-offset-1 col-md-9 col-md-offset-1 col-sm-11 col-sm-offset-0 col-xs-24 col-xs-offset-0\">	\n" +
    "	<p>The Photographic User Camera Study consists of two phases. First, the participants are given a camera with which they walk through the museum and take pictures of anything drawing their attention. They can choose themselves what they capture, for how long they want to stay in the exhibition and how many pictures they take.</p>\n" +
    "	<p>The collecting phase is followed by a qualitative interview in which the participant first gets to talk about the photographs in a way that is comparable to someone showing their vacation pictures: descriptive and as detailed as they prefer. Later on specific questions concerning sensual experiences <i>(What did you hear, smell, touch?)</i> and digital devices <i>(Which device(s) did you use during your visit and what did you do with it?)</i> are asked.</p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/impressum.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/impressum.html",
    "<div ui-view=\"nav\"></div>  \n" +
    "<div class=\"impressum block row\">\n" +
    "	<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "		<h3>Contributor's (in Alphabetical Order)</h3>\n" +
    "		<ul>\n" +
    "			<li>App animation: Wim Dijksterhuis, <a href=\"http://www.screenturner.nl\">Screenturner</a></li>\n" +
    "			<li>App development: <a href=\"http://www.uncinc.nl\">UncInc</a> in collaboration with Johanna Barnbeck</li>\n" +
    "			<li>Conceptural Sparring for the Prototypes: Jan Hein Hoogstad, Roel van der Wal, Floris de Langen</li>\n" +
    "			<li>Infographics User Camera Study: Patty Jansen</li>\n" +
    "			<li>Logo Design: <a href=\"http://www.resultat.nl\">Creatief Bureau Resultåt</a></li>\n" +
    "			<li>Research Design, articles, videos and photographs (unless stated otherwise): Johanna Barnbeck</li>\n" +
    "			<li>Website: Robert-Jan Korteschiel and Patty Jansen</li>\n" +
    "			<li>Trailer testing prototype at the Rijksmuseum: <a href=\"http://www.screenturner.nl\">Screenturner</a> in collaboration with Johanna Barnbeck</li> \n" +
    "		</ul>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "		<h3>Disclaimer</h3>\n" +
    "		<p><strong>Limitation of liability for internal content</strong></p>\n" +
    "		<p>The content of our website has been compiled with meticulous care and to the best of our knowledge. However, we cannot assume any liability for the up-to-dateness, completeness or accuracy of any of the pages.</p>\n" +
    "		<p>Pursuant to section 7, para. 1 of the TMG (Telemediengesetz –  Tele Media Act by German law), we as service providers are liable for our own content on these pages in accordance with general laws. However, pursuant to sections 8 to 10 of the TMG, we as service providers are not under obligation to monitor external information provided or stored on our website. Once we have become aware of a specific infringement of the law, we will immediately remove the content in question. Any liability concerning this matter can only be assumed from the point in time at which the infringement becomes known to us.</p>\n" +
    "		<p><strong>Limitation of liability for external links</strong></p>\n" +
    "		<p>Our website contains links to the websites of third parties (“external links”). As the content of these websites is not under our control, we cannot assume any liability for such external content. In all cases, the provider of information of the linked websites is liable for the content and accuracy of the information provided. At the point in time when the links were placed, no infringements of the law were recognisable to us. As soon as an infringement of the law becomes known to us, we will immediately remove the link in question.</p>\n" +
    "		<p><strong>Copyright</strong></p>\n" +
    "		<p>The content and works published on this website are governed by the copyright laws of Germany. Any duplication, processing, distribution or any form of utilisation beyond the scope of copyright law shall require the prior written consent of the author or authors in question.</p>\n" +
    "		<p><strong>Data protection</strong></p>\n" +
    "		<p>A visit to our website can result in the storage on our server of information about the access (date, time, page accessed). This does not represent any analysis of personal data (e.g., name, address or e-mail address). If personal data are collected, this only occurs – to the extent possible – with the prior consent of the user of the website. Any forwarding of the data to third parties without the express consent of the user shall not take place.</p>\n" +
    "		<p>We would like to expressly point out that the transmission of data via the Internet (e.g., by e-mail) can offer security vulnerabilities. It is therefore impossible to safeguard the data completely against access by third parties. We cannot assume any liability for damages arising as a result of such security vulnerabilities.</p>\n" +
    "		<p>The use by third parties of all published contact details for the purpose of advertising is expressly excluded. We reserve the right to take legal steps in the case of the unsolicited sending of advertising information; e.g., by means of spam mail.</p>\n" +
    "		<p>Source: <a href=\"http://www.mustervorlage.net/disclaimer-muster#Englisch\">English Disclaimer on Mustervorlage.net</a></p>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<footer ui-view=\"footer\" class=\"clearfix row\"></footer>\n" +
    "");
}]);

//# sourceMappingURL=app.js.map