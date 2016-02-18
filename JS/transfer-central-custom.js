/***************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 **************************************************************************************************/
(function ($) {
	$(document).ready(function () {
        traverseInputs('.ugrf-general-reqd');        
        if($("div.gform_body").length > 0) {
            setupInstitutionSelectors(".oue-gf-instn-locn", ".oue-gf-instn-name");
        }
	});

    /******************************************************************************************\
    | Setup activator checkboxes that disappear once one is selected                           |
    \******************************************************************************************/
    function setupInstitutionSelectors (selector, nextSelector) {
        if ($.type(selector) === "string") {
            $(".gform_body").on("change", selector + " select", function () {
                var $thisChild = $(this);
                var slctdLocation = $thisChild.val();
                var $thisParent = $thisChild.parents(selector).first();
                var $nextParent = $thisParent.nextAll(nextSelector).first();
                var $nextParentInput = $nextParent.find("select").first();
                var newOpts = null;
                switch(slctdLocation) {
                    case "Vermont":
                        newOpts = {
                            "": "",
                            "Bennington College": "Bennington College",
                            "Burlington College": "Burlington College",
                            "Castleton State College": "Castleton State College",
                            "Champlain College": "Champlain College",
                            "College of St Joseph in Vermont": "College of St Joseph in Vermont",
                            "Community College of Vermont": "Community College of Vermont",
                            "Goddard College": "Goddard College",
                            "Green Mountain College": "Green Mountain College",
                            "Johnson State College": "Johnson State College",
                            "Landmark College": "Landmark College",
                            "Lyndon State College": "Lyndon State College",
                            "Marlboro College": "Marlboro College",
                            "Middlebury College": "Middlebury College",
                            "Norwich University": "Norwich University",
                            "Royalton College": "Royalton College",
                            "School for International Training": "School for International Training",
                            "Southern Vermont College": "Southern Vermont College",
                            "St Michaels College": "St Michaels College",
                            "Sterling College": "Sterling College",
                            "Trinity College": "Trinity College",
                            "University of Vermont": "University of Vermont",
                            "Vermont College of Norwich University": "Vermont College of Norwich University",
                            "Vermont Law School": "Vermont Law School",
                            "Vermont Technical College": "Vermont Technical College"
                        };
                        break;
                    default:
                }
                if(newOpts != null && $nextParentInput != null) {
                    $nextParentInput.empty();
                    $.each(newOpts, function( key, value ) {
                        $nextParentInput.append($("<option></option>").attr("value", value).text(key));
                    });
                    $nextParentInput.trigger("chosen:updated");
                }
            });
        }
    }
    
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
