/**********************************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 *********************************************************************************************************************/
(function ($) {
	$(document).ready(function () {
			"use strict";
			/**********************************************************************************************
			 * As desired, tweak the CSS of the previous sibling of certain selected elements in the DOM  *
			 **********************************************************************************************/
			$('div.column > h2').each(function () {
					$(this).prev('hr').addClass('narrow-bottom-margin dark-gray thicker');
			});
			$('div.column > h3').each(function () {
					$(this).prev('hr:not(.subSection)').addClass('narrow-bottom-margin crimson');
			});

			/**********************************************************************************************
			 * Set column heights on fluid-width containters                                              *
			 **********************************************************************************************/
			$('.large-format-friendly > div.column.two').each(function () {
					var $this = $(this);
                    $this.height($this.prev('div.column.one').height());
			});
            $(window).resize(function () {
                $('.large-format-friendly > div.column.two').each(function () {
					var $this = $(this);
                    var $thisPrev = $this.prev('div.column.one');
                    if($this.height() != $thisPrev.height() ) {
                        $this.height($thisPrev.height());
                    }
                });
            });
            
			/**********************************************************************************************
			 * Tweak HTML source to work around some quirks of the WordPress setup                        *
			 **********************************************************************************************/
			/*var surcaSiteURL = window.location.pathname;
			switch(surcaSiteURL) {
                /* TEMPORARILY REMOVED PENDING UCOMM APPROVAL:
                case '/':
					$('#menu-item-XX').remove();
					$('#spine-sitenav ul li').first().css('border-top', 'none');
					$('#spine-sitenav').addClass('homeless');
					break; ***
				case '/news/':
					$('div.column.one').first().parent('section').before('<section class="row single gutter pad-top"><div class="column one"><section class="article-header header-newsEvents"><div class="header-content"><h2>News</h2><h3>What We and Our Students Have Accomplished</h3></div></section></div></section>');
					break;
			}*/
			
			/**********************************************************************************************
			 * Implement dynamic behaviors of interactive elements                                        *
			 **********************************************************************************************/
			$('.drop-down-toggle').click(function () {
                $(this).next('.toggled-panel').toggle(500)
			});
			$('.read-more-toggle-in-ctrl').click(function () {
                var $this = $(this);
                $this.toggle(500);
                $this.next('.read-more-panel').toggle(500);
                $this.next('.read-more-panel').next('.read-more-toggle-out-ctrl').toggle(500);
			});
			$('.read-more-toggle-out-ctrl').click(function () {
                var $this = $(this);
                $this.toggle(500);
                $this.next('.read-more-panel').toggle(500);
                $this.next('.read-more-panel').next('.read-more-toggle-in-ctrl').toggle(500);
			});
			$('.content-flipper').click(function () {
                var $this = $(this);
                $this.next('.flipped-content-front').toggle(500);
                $this.next('.flipped-content-front').next('.flipped-content-back').fadeToggle(500);
			});
			$('.flipped-content-front').click(function () {
                var $this = $(this);
                $this.toggle(500);
                $this.next('.flipped-content-back').fadeToggle(500);
			});
            $('#welcome-message').delay(1000).fadeOut(500, function () {
                $('#post-welcome-message').fadeIn(500);
            });
            $("dl.toggled dt").click(function() {
                var $this = $(this);
                $this.toggleClass('activated');
                $this.next("dd").slideToggle(400, function () {
                    var $parent = $this.parents('.large-format-friendly > div.column.one');
                    var $prntNxt = $parent.next('div.column.two');
                    $prntNxt.animate({height: $parent.css('height')}, 100);
                });
            });
            $("dd").hide();           
            
	});
})(jQuery);
