/**********************************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 *********************************************************************************************************************/
(function ($) {
	$(document).ready(function () {
        traverseInputs('.ugrf-general-reqd');        
	});
    
    function traverseInputs (selector) {
        if ($.type(selector) === "string") {
            $(selector).each(function () {
                var $this = $(this);
                var $inputs = $this.find('input');
                $inputs.each(function () {
                    var $thisChild = $(this);
                    $thisChild.blur(function () {
                        var $thisParent, $parentsInputs;
                        var inputReady = true;
                        
                        if ($thisChild.val() == "") {
                            $thisChild.removeClass('value-entered');
                        }
                        else {
                            $thisChild.addClass('value-entered');
                        }
                        
                        $thisParent = $thisChild.parents(selector);
                        $parentsInputs = $thisParent.find('input');
                        $parentsInputs.each(function () {
                            if ($(this).val() == "") {
                                inputReady = false;
                            }
                        });
                        if (inputReady) {
                            $thisParent.addClass('inputs-ready');
                        }
                        else {
                            $thisParent.removeClass('inputs-ready');
                        }
                    });
                });
            });
        }
    }
})(jQuery);
