(function(){
  'use strict';

  var app = angular.module('augm', ['ngSanitize', 'templates-augm', 'ui.router', 'mgcrea.ngStrap']);

  app.constant('$', jQuery);
  app.constant('_', _);

})();

(function(){
  'use strict';

  angular.module('augm').config(['$stateProvider', '$locationProvider', '$urlRouterProvider', routes]); 
    
  function routes($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);
    
    $stateProvider
      .state('displayorderHome', {
        views: {
          "nav": { 
            templateUrl: "../templates/functional/nav.html",
            controller: 'NavCtrl as nav',      
          },
          "displayorder": { 
            templateUrl: "../templates/displayorder.html",
            controller: "DisplayCtrl as disp"
          },
          "footer": { templateUrl: "../templates/functional/footer.html" }
        }
      })
      .state('displayorderHome.withSubroutes', {
        url: '/',
        views: {
          "header": { 
            templateUrl: "../templates/content/header.html",
            controller: 'HeaderCtrl as head'                
          },
          "assumptions": { templateUrl: "../templates/content/assumptions.html" },
          "usercamerastudy": { templateUrl: "../templates/content/usercamerastudy.html" },
          "survey": { templateUrl: "../templates/content/survey.html" },
          "masonryviewer": { 
            templateUrl: "../templates/content/masonryviewer.html",
            controller: 'MasonryCtrl as mason'                
          },
          "demo": { templateUrl: "../templates/content/demo.html" },
          "evaluation": { templateUrl: "../templates/content/evaluation.html" },
          "theory": { templateUrl: "../templates/content/theory.html" },
          "literature": { templateUrl: "../templates/content/literature.html" },
          "about": { templateUrl: "../templates/content/about.html" }
        }
      });

    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');
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

  angular.module('augm').controller('NavCtrl', ['$scope', '$location', NavCtrl]);

  angular.module('augm')
    .config(function($collapseProvider) {
      angular.extend($collapseProvider.defaults, {
        startCollapsed: 'true'
      });
    });

  function NavCtrl($scope, $location, $anchorScroll){
    var vm = this;

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
	'use strict';

	angular.module('augm').controller('MasonryCtrl', [MasonryCtrl]);

	function MasonryCtrl(){
		var vm = this;
		var data = importData();
	  
		function importData() {
			var data = $.ajax({
				url: "api/fotoData.json",
				dataType: "json",
				success: function(data){
					galleryImages(data);
				},
				error: function(obj, err, errObj){
					console.error("Loading the JSON did not go as planned: " + err);
				}
			});
			return data;
		}

	    function galleryImages(data) {
	    	// Creating one long string with all images.
	    	var imgTags = "";

	    	$(data.photos).each(function(){
	    		imgTags += "<div class=\"item\"><img src=\"" +this.src+ "\" alt=\"" +this.name+ "\" " + "data=\""+this.number+ "\" ><hr class=\"itemText\"><p class=\"itemText\">" + this.transcriptSnippet + "<br class=\"itemText\"><br class=\"itemText\"> Title: " + this.name + "<br class=\"itemText\">Tag: " + this.tags[0] + "</p><hr class=\"itemText\"></div>";
	    	});

	    	// Appending to HTML and event listener.
	    	$("#photoPiece").append(imgTags).on("click", "div", data, galleryChange);
	    	$(".legend").html("<h1>" + data.photos[0].name + "</h1><p>" + data.photos[0].transcriptSnippet + "</p><img src=\"" + data.photos[0].src + "\"></img>").fadeIn();

	    	// Running Masonry
	    	masonryConfig();
	    }

	    function galleryChange(evt) {
	    	// galleryChange

				if ($(evt.target).attr("data")) {
					var photoData = {};
					var photoNumber = $(evt.target).attr("data");
				} else {
					return false;
				}
				
				// Necessary loop because toplevel key is not set
				$(evt.data.photos).each(function(){
					if (this.number == photoNumber){
						photoData = this;
						return false;
					}
				});

				// Angular templating Tryout -> To use ngAnimate (and to learn how to make things easyer)
				// vm.name = photoData.name;
				// vm.snippet = photoData.transcriptSnippet;
				// vm.src = photoData.src;

				$(".legend").fadeOut(function(){
					$(this).html("<h1>" + photoData.name + "</h1><p>\"" + photoData.quotes + "\"</p><p>" + photoData.transcriptSnippet + "</p><img src=\"" + photoData.src + "\"></img>").fadeIn();
				});
	    }

	    function masonryConfig() {
	    	var $container = $("#photoPiece");

				$container.imagesLoaded( function() {
				  $container.packery({
					  columnWidth: ".grid-sizer",
					  itemSelector: ".item",
					  "isOriginTop": true
					});
				});
	    }

	    // this.hello = "bye";

    return vm;
	}
})();
(function(){
  'use strict';

  angular.module('augm').controller('HeaderCtrl', [HeaderCtrl]);

	function HeaderCtrl($scope){
    var vm = this;

    // console.log($(".fadeclass")[0]);

    $(".fadeclass").map(function(){
    	var time = Math.random() * (5000 - 1000) + 1000;
        $(this).fadeTo(1, 0).delay(time).fadeTo(1000, 1);
    });

    $(".logos").hide().delay(7000).fadeIn(1000);
    $(".headerText").hide().delay(7000).fadeIn(1000);


	return vm;
	}
})();
angular.module('templates-augm', ['../templates/content/about.html', '../templates/content/assumptions.html', '../templates/content/demo.html', '../templates/content/evaluation.html', '../templates/content/header.html', '../templates/content/literature.html', '../templates/content/masonryviewer.html', '../templates/content/processmap.html', '../templates/content/survey.html', '../templates/content/theory.html', '../templates/content/usercamerastudy.html', '../templates/displayorder.html', '../templates/functional/footer.html', '../templates/functional/nav.html']);

angular.module("../templates/content/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/content/about.html",
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<h1>People</h1>\n" +
    "	<div class=\"person clearfix\">\n" +
    "		<img src=\"./images/persons/johanna2.jpg\" alt=\"Embedded Researcher UvA -> Rijksmuseum\">\n" +
    "		<p>Johanna Barnbeck</p>\n" +
    "	</div>\n" +
    "	<div class=\"person clearfix\">\n" +
    "		<img src=\"./images/persons/janHein.jpg\" alt=\"Jan Hein Hoogstad - Assistant Professor Cultural Analysis\">\n" +
    "		<p>Jan Hein Hoogstad</p>\n" +
    "		<p>Assistant Professor Cultural Analysis</p>\n" +
    "	</div>\n" +
    "	<div class=\"person clearfix\">\n" +
    "		<img src=\"./images/persons/shailoh.jpg\" alt=\"\" class=\"none\">\n" +
    "		<p>Shailoh Phillips</p>\n" +
    "	</div>\n" +
    "	<div class=\"person clearfix\">\n" +
    "		<img src=\"./images/persons/patty.jpg\" alt=\"Intern and Thesis\">\n" +
    "		<p>Patty Jansen</p>\n" +
    "	</div>\n" +
    "	<div class=\"person clearfix\">\n" +
    "		<img src=\"./images/persons/robert.jpg\" alt=\"Intern\">\n" +
    "		<p>Robert-Jan Korteschiel</p>\n" +
    "	</div>\n" +
    "</div>\n" +
    "<div class=\"col-lg-10 col-lg-offset-2 col-md-11 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-24 col-xs-offset-0\" >\n" +
    "	<h1>Contact</h1>\n" +
    "	<p>Johanna Barnbeck</p>\n" +
    "	<p>Locatie 13</p>\n" +
    "	<p>7346HD Amsterdam</p>\n" +
    "	<p>contact@augmenting-masterpieces.nl</p>\n" +
    "	<p>telefoonnr: 103-929476296</p>\n" +
    "	<br>\n" +
    "	<h1>Mailing list</h1>\n" +
    "	<!-- Begin MailChimp Signup Form -->\n" +
    "	<div id=\"mc_embed_signup\">\n" +
    "		<form action=\"//wix.us3.list-manage.com/subscribe/post?u=441ffe1b780f94da8bfedb43c&amp;id=ec4ca8f48f\" method=\"post\" id=\"mc-embedded-subscribe-form\" name=\"mc-embedded-subscribe-form\" class=\"validate\" target=\"_blank\" novalidate>\n" +
    "		    <div id=\"mc_embed_signup_scroll\">\n" +
    "				<h4>Subscribe to our mailing list</h4>\n" +
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
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("../templates/content/assumptions.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/content/assumptions.html",
    "<div class=\"overflow-container\">\n" +
    "	<div class=\"col-lg-8 col-lg-offset-1 col-md-9 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "		<h2> Assumptions...</h2>\n" +
    "		<h3>“That's what we think they want.”</h3>\n" +
    "		<p>An initial interdisciplinary expert meeting, with all parties involved, included a discussion and brainstorm about what kind of digital interfaces the museum uses already, what is in the planning and what people from the different departments might want in the future in order to cater to the visitor's needs and to match their goals of engaging visitors with the exhibition.</p>\n" +
    "\n" +
    "		<p>Soon we found ourselves in the middle of a discussion about what the visitors of the museum actually wanted, seen from different academic and professional perspectives. The discussion culminated in someone provocatively asking: “Do visitors actually want a different experience? Everything that we have discussed is just what we think they want.”</p>\n" +
    "\n" +
    "		<p>This sentence beautifully sums up what kind of reflection one first needs to get out there and subsequently rid off: assumptions about user experiences. Accordingly, I designed my research process with a strong focus on input from the museum visitors, based on how the employees run the Rijksmuseum on a daily basis and on the digital engagement methods they set up for their visitors.</p>\n" +
    "	</div>\n" +
    "	<div class=\"col-lg-13 col-lg-offset-1 col-md-12 col-md-offset-1 col-sm-12 col-sm-offset-0 col-xs-24 col-xs-offset-0 hidden-xs image-container\">\n" +
    "		<img class=\"child\" src=\"images/webimages/visitors_aussumptions.jpg\">\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/content/demo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/content/demo.html",
    "<div class=\"col-lg-20 col-lg-offset-2 col-md-20 col-md-offset-1 col-sm-20 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<h2>It doesn't matter how much 'cultural capital' you bring.</h2>\n" +
    "	<h3>Social features for visitor's engagement</h3>\n" +
    "</div>\n" +
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<p>The visitor's experience of the Rijksmuseum and the interaction of visitors with artworks are necessarily embedded in a strong social framework. As the museum adheres to a large number of social rules it is often thought of as a rather intimidating place, than a place for learning and curiosity and as a visitor, one cannot get anywhere close to knowing everything about the collection.<br>\n" +
    "\n" +
    "	The vast amount of knowledge that is bundled in and around the museum often reminds visitors of their insufficient knowledge, which therefore lets them feel slightly awkward when walking through the exhibition.<br>\n" +
    "	</p>\n" +
    "</div>\n" +
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-2 col-sm-11 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "	<p>Rather than trying to attempt to engage people with in-depth (art) historical background information about art works, we set up three ways of social interaction on a broader range with the museum and the other visitors.</p>\n" +
    "\n" +
    "	<p>Through engaging on more general terms with the surrounding, people will be more likely to find their own access to the museum and ultimately to the artworks in it.</p>\n" +
    "\n" +
    "	<p>Visitors can contribute and share their observations and knowledge, no matter what their <i>cultural capital</i> is, which creates a feeling of being valuable.</p></a>\n" +
    "	<br>\n" +
    "</div>\n" +
    "<div class=\"col-lg-22 col-lg-offset-1 col-md-22 col-md-offset-1 col-sm-22 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<div class='embed-container'>\n" +
    "		<iframe src='http://player.vimeo.com/video/112958657' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/content/evaluation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/content/evaluation.html",
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<h2>Process Evaluation</h2>\n" +
    "	<p>We prototyped and tested three features, which tried to provide answers to the human-centered design question: “How we might engage museum visitors more with their surrounding without indicating a distinction by putting value into the aspect they choose to engage with?”<br>\n" +
    "\n" +
    "	Even stronger, by letting them emphasizing their own aspects in order to find their own approach to the exhibition.</p>\n" +
    "\n" +
    "	<p>The ambition was to take away their feeling of 'social awkwardness' or felt lack of knowledge through letting them contribute their own impressions and observations about the museum and the artworks in it, and through encountering random stories or trivia questions at at random pieces of art by other visitors.<br>\n" +
    "\n" +
    "	The critical feedback we received matched our hypothesis that visitors of the 'cultural professional'-group, who already know how they can personally interact with the museum setting, required and appreciated the informal quality of the stories less than visitors of the other categories. However, all of the visitors said that it made their museum visit more interactive and brought in different perspectives they wouldn't have thought of themselves.</p>\n" +
    "</div>\n" +
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "	<h1>Concluding Remarks</h1>\n" +
    "	<p>Visitors largely appreciated the possibility of submitting own stories and trivia questions, and were tempted to do so.<br>\n" +
    "\n" +
    "	The majority of the test persons indicated that they would use the app throughout the museum if it was available, that they would recommend it to their friends or family and like the idea to contribute to the app content themselves. In that regard, the first prototyped versions of design features are ready to develop further and to be tested with extended functionality.</p>\n" +
    "\n" +
    "	<p>On general terms, the human-centered design approach in combination with creative and visual research methods has proven to\n" +
    "\n" +
    "	be incredibly fruitful when researching the different aspects that visitors deal with when visiting the Rijksmuseum. And to carefully compare those to the assumptions made by museum professional (including ourselves).</p>\n" +
    "\n" +
    "	<p>To take museum visitors serious in their needs and different levels of cultural capital, allowed us to <i>socially</i> augment the masterpieces of the Rijksmuseum.</p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/content/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/content/header.html",
    "<div class=\"col-lg-12 col-lg-offset-7 col-md-14 col-md-offset-7 col-sm-18 col-sm-offset-6 col-xs-24 col-xs-offset-0\">\n" +
    "	<div class=\"title\">\n" +
    "		<h1><span class=\"capitalisation\"><span class=\"fadeclass\">A</span><span class=\"fadeclass\">U</span><span class=\"fadeclass\">G</span><span class=\"fadeclass\">M</span><span class=\"fadeclass\">E</span><span class=\"fadeclass\">N</span><span class=\"fadeclass\">T</span><span class=\"fadeclass\">I</span><span class=\"fadeclass\">N</span><span class=\"fadeclass\">G</span></span>&nbsp;<span class=\"capitalisation\"><span class=\"fadeclass\">M</span><span class=\"fadeclass\">A</span><span class=\"fadeclass\">S</span><span class=\"fadeclass\">T</span><span class=\"fadeclass\">E</span><span class=\"fadeclass\">R</span><span class=\"fadeclass\">P</span><span class=\"fadeclass\">I</span><span class=\"fadeclass\">E</span><span class=\"fadeclass\">C</span><span class=\"fadeclass\">E</span><span class=\"fadeclass\">S</span></span></h1>\n" +
    "		<p class=\"headerText\">Augmenting Masterpieces explores visitors' experiences and the social dimensions of a visit to the Rijksmuseum. It translates the findings into an interface which lets the visitor interact with both the physical and the digital collection. Through embedded and artistic research methods the project reduces the gap between academic research and creative production. Its results manifest in a prototype, academic articles and this multi-medial presentation.</p>\n" +
    "		<div class=\"logos\">\n" +
    "			<a href=\"https://www.rijksmuseum.nl/\"><img src=\"./images/logos/rijkswhite.png\"></a>\n" +
    "			\n" +
    "			<a href=\"http://cdh.uva.nl/\"><img src=\"./images/logos/uvalogowhite.png\"></a>\n" +
    "		</div>\n" +
    "	</div> \n" +
    "</div>");
}]);

angular.module("../templates/content/literature.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/content/literature.html",
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

angular.module("../templates/content/masonryviewer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/content/masonryviewer.html",
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-0 col-xs-24 col-xs-offset-0 legend\">\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-lg-10 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-12 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "<!-- 	<blockquote>A detailed profile and script from a participating Cultural Tourist illustrating collected input from museum visitors.</blockquote> -->\n" +
    "	<div id=\"photoPiece\">\n" +
    "		<div class=\"grid-sizer\"></div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("../templates/content/processmap.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/content/processmap.html",
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

angular.module("../templates/content/survey.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/content/survey.html",
    "<div class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<h2>No comment on the Masterpieces.</h2>\n" +
    "	<h3>“I know they are important.”</h3>\n" +
    "	<p>The qualitative survey had twelve participants who belong to four of the five  visitors' categories the Rijksmuseum works with on a daily basis in education and marketing. The focus lies on the unaccompanied visitors: Three Cultural Tourists, three Art Lover's, two Cultural Professionals and one Family (with three children, who each participated as well) participated in the survey.</p> \n" +
    "\n" +
    "	<p>As an example the photographs show one profile of a 'cultural tourist'. About 70% of the museum visitors belong to the group of cultural tourists, as the Rijksmuseum calls people who don't visit museums more than three times a year and is probably found in the Rijksmuseum, because it is part of what you do when you visit Amsterdam.</p>\n" +
    "\n" +
    "	<p>In the example, the participant Chris gave 'no comment' on seven out of the 42 pictures. From those seven, five were photographs of paintings, one of an object and one photograph of the building. When being asked later on, why he took those pictures, he said: “I know they are important, so I took a picture of them.”</p>\n" +
    "\n" +
    "	<p>However, Chris described in detail the other pictures that he took, the observed situations and he told stories that he overheard from other visitors. He seemed more relaxed and engaged with his surrounding.</p>\n" +
    "\n" +
    "	<p>Whereas the amount of time spent on looking at art works and written information varied largely between different visitors, all participants carefully observed other visitors, listened into their conversations or were wondering about their own – proper - behaviour at times. So people don't leave their social consciousness in the wardrobe with their bags, but on the contrary move silently and with a high level of awareness for social interaction, through the museum.</p>\n" +
    "\n" +
    "	<p>Thus, social dimensions are highly important for all types of visitors, and are often accompanied by a feeling of social awkwardness. The degree of feeling engaged or addressed by the museum surrounding seems to be connected to the degree of how much visitors can relate to other situations in their daily life. Listening into other people's conversations and re-telling those stories, often served as a bridge to connect with the museum setting in general.</p>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"col-lg-10 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-0 col-xs-24 col-xs-offset-0\">\n" +
    "	<img src=\"images/webimages/infographic_new.jpg\">\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/content/theory.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/content/theory.html",
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

angular.module("../templates/content/usercamerastudy.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/content/usercamerastudy.html",
    "<div class=\"col-lg-13 col-lg-offset-1 col-md-12 col-md-offset-1 col-sm-22 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<div class='embed-container'>\n" +
    "		<iframe src='http://player.vimeo.com/video/112510250' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"col-lg-8 col-lg-offset-1 col-md-9 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\">\n" +
    "	<h2>...and how to get rid of them.</h2>\n" +
    "	<h3>Visual Feedback Methods</h3>\n" +
    "	<p>I use Visual User Feedback methods to understand different perspectives and gain insights from the museum visitors. Those methods not only give room to individual oral feedback, but also to visual stories and experiences. Therefore the oral and visual feedback from the user, reveals different kinds of information than a thematically focused survey. </p>\n" +
    "</div>\n" +
    "<div class=\"col-lg-8 col-lg-offset-1 col-md-9 col-md-offset-1 col-sm-11 col-sm-offset-0 col-xs-24 col-xs-offset-0\">	\n" +
    "	<p>The Photographic User Camera Study consists of two phases. First, the participants are given a camera with which they walk through the museum and take pictures of anything drawing their attention. They can choose themselves what they capture, for how long they want to stay in the exhibition and how many pictures they take.</p>\n" +
    "	<p>The collecting phase is followed by a qualitative interview in which the participant first gets to talk about the photographs in a way that is comparable to someone showing their vacation pictures: descriptive and as detailed as they prefer. Later on specific questions concerning sensual experiences (what did you hear, smell, touch?) and digital devices (which devices did you use during your visit and to do what?) are asked.</p>\n" +
    "</div>");
}]);

angular.module("../templates/displayorder.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/displayorder.html",
    "<section ui-view=\"header\" class=\"row block maintro\"></section>\n" +
    "<!-- <section ui-view=\"processmap\" class=\"row block processmap\"></section>\n" +
    "<section class=\"row block intermezzo understand\">\n" +
    "	<h1 id=\"understand\" class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\"><span>Understand</span> and <span>Observe</span> </h1>\n" +
    "</section> -->\n" +
    "<section ui-view=\"assumptions\" class=\"row block assumptions\"></section>\n" +
    "<section ui-view=\"usercamerastudy\" class=\"row block userCameraStudy\"></section>\n" +
    "<section class=\"row block intermezzo analyse\">\n" +
    "	<h1 id=\"analyse\" class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\"><span>Analyse</span> and <span>Ideate</span> </h1>\n" +
    "</section>\n" +
    "<section ui-view=\"survey\" class=\"row block\"></section>\n" +
    "<section ui-view=\"masonryviewer\" class=\"row block masonry\"></section>\n" +
    "<section class=\"row block intermezzo proto\">\n" +
    "	<h1 id=\"prototype\" class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\"><span>Prototype</span> and <span>Test</span></h1>\n" +
    "</section>\n" +
    "<section ui-view=\"demo\" class=\"row block\"></section>\n" +
    "<section class=\"row block intermezzo evaluate\">\n" +
    "	<h1 id=\"evaluate\" class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\"><span>Evaluate</span> and <span>Outlook</span></h1>\n" +
    "</section>\n" +
    "<section ui-view=\"evaluation\" class=\"row block\"></section>\n" +
    "<section class=\"row block intermezzo theory\">\n" +
    "	<h1 id=\"theory\" class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\"><span>Theory</span> and <span>Methods</span></h1>\n" +
    "</section>\n" +
    "<section ui-view=\"theory\" class=\"row block\"></section>\n" +
    "<section ui-view=\"literature\" class=\"row block literature\"></section>\n" +
    "<section class=\"row block intermezzo about\">\n" +
    "	<h1 id=\"about\" class=\"col-lg-9 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-24 col-xs-offset-0\"><span>About</span></h1>\n" +
    "</section>\n" +
    "<section ui-view=\"about\" class=\"row block people\"></section>");
}]);

angular.module("../templates/functional/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/functional/footer.html",
    "<div class=\"sitemap\">\n" +
    "	<a href=\"#main\"> Home </a> &nbsp;\n" +
    "	<a href=\"#understand\"> Understand and Observe</a>&nbsp;\n" +
    "	<a href=\"#analyse\"> Analyse and Ideate </a>&nbsp;\n" +
    "	<a href=\"#prototype\"> Prototype and Test </a>&nbsp;\n" +
    "	<a href=\"#evaluate\"> Evaluate and Outlook </a>&nbsp;\n" +
    "	<a href=\"#theory\"> Theory and Methods </a>&nbsp;\n" +
    "	<a href=\"#about\"> About </a>\n" +
    "</div>\n" +
    "<p>4 Januari 2015 - Augmenting Masterpieces</p>\n" +
    "\n" +
    "");
}]);

angular.module("../templates/functional/nav.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/functional/nav.html",
    "<nav class=\"navbar navbar-default navbar-fixed-top\" bs-collapse bs-scrollspy-list role=\"navigation\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle\" bs-collapse-toggle>\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a class=\"navbar-brand\" bs-scrollspy href=\"#main\">Augmenting Masterpieces</a>\n" +
    "    </div>\n" +
    "    <div class=\"collapse navbar-collapse\" id=\"navbarcontents\" bs-collapse-target>\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li bs-scrollspy data-target=\"#understand\"><a href=\"#understand\">Understand <span class=\"hidden-sm hidden-md\">and Observe</span></a></li>\n" +
    "        <li bs-scrollspy data-target=\"#analyse\"><a href=\"#analyse\">Analyse <span class=\"hidden-sm hidden-md\">and Ideate</span></a></li>\n" +
    "        <li bs-scrollspy data-target=\"#prototype\"><a href=\"#prototype\">Prototype <span class=\"hidden-sm hidden-md\">and Test</span></a></li>\n" +
    "        <li bs-scrollspy data-target=\"#evaluate\"><a href=\"#evaluate\">Evaluate <span class=\"hidden-sm hidden-md\">and Outlook</span></a></li>\n" +
    "        <li bs-scrollspy data-target=\"#theory\"><a href=\"#theory\">Theory <span class=\"hidden-sm hidden-md\">and Methods</span></a></li>\n" +
    "      </ul>\n" +
    "      <ul class=\"nav navbar-nav navbar-right\">\n" +
    "        <li bs-scrollspy data-target=\"#about\"><a href=\"#about\">About</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</nav>");
}]);

//# sourceMappingURL=app.js.map