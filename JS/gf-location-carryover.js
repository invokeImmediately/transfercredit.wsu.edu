////////////////////////////////////////////////////////////////////////////////////////////////
// §1.1: GfAdvSelectIntf

/**
 * Graviy Forms Advanced Select Interface (GfAdvSelectIntf) module.
 *
 * JQuery-based interface to key UI components of an Gravity Forms select field utilizing the
 * advanced user interface option.
 *
 * @param {jquery} $ - The session's jquery object.
 * @param {string} modName - Stores the name of this module; useful in error reporting.
 * @param {object} lsSels - A collection of lexically scoped jQuery selectors that come from the
 *     design of Gravity Forms select fields utilizing the advanced user interface.
 * @param {string} lsSels.gfId - JQuery Selector for a single CSS class used to identify gravity
 *     fields.
 * @param {string} lsSels.gfContId - JQuery Selector for a single CSS class used to identify whether
 *     the purported selection gravity form field contains an expected child container.
 * @param {string} lsSels.gfSelSel - Selector string used to isolate the select element child within
 *     the gravity form field.
 * @param {string} lsSels.gfChosenSpanSel - Selector string used to isolate the span element that
 *     displays the currently selected option to the user.
 *
 * @class
 */

var GfAdvSelectIntf = ( function( $, modName, lsSels ) {

	'use strict';

	/**
	 * Constructor for GfAdvSelectIntf.
	 *
	 * @param {jquery} $gfield - A jQuery object representing the 
	 */
	function GfAdvSelectIntf( $gfield ) {

		////////////////////////////////////////////////////////////////////////////////////////
		// §1.1.1: Public properties

		/**
		 * JQuery object representing the span element that shows the currently selected location
		 * option to the user.
		 *
		 * @public
		 */
		this.$chosenSpan = undefined;

		/**
		 * Retain a copy of the original prospective gravity forms field used to construct this
		 * interface.
		 *
		 * @public
		 */
		this.$gfield = $gfield;

		/**
		 * JQuery object representing the select element containing the location option that the
		 * user currently has selected.
		 *
		 * @public
		 */
		this.$selElem = undefined;

		////////////////////////////////////////////////////////////////////////////////////////
		// §1.1.4: Constructor's main execution section

		this.buildIntfToField();
	}

	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.1.5: Public methods

	/**
	 * Build the interface to the gravity forms field by populating jQuery objects representing key
	 * components used in carrying over institution location values.
	 */
	GfAdvSelectIntf.prototype.buildIntfToField = function() {
		if ( this.isValid() ) {
			this.$selElem = this.$gfield.find( lsSels.gfSelSel );
			this.$chosenSpan = this.$gfield.find( lsSels.gfChosenSpanSel );
		}
	};

	/**
	 * Build the interface to the gravity forms field by populating jQuery objects representing key
	 * components used in carrying over institution location values.
	 *
	 * @return {boolean} - True if the interface is valid and can be reliably used, false otherwise.
	 */
	// TODO: Write documentation header.
	// TODO: Finish writing function (move to public method).
	GfAdvSelectIntf.prototype.isValid = function () {
		return ls_EvalValidity( this );
	};


	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.1.6: Lexically scoped support functions  

	/**
	 * Evaluate the validity of an instance of GfAdvSelectIntf.
	 *
	 * Evaluate the validity of an instance of GfAdvSelectIntf based on the parameter it was passed
	 * during its construction and the condition of lexically scoped settings for the module.
	 * Several criteria about the nature of the object and whether it can be used to build an
	 * interface to expected elements within the DOM must be satisfied.
	 *
	 * @param {GfAdvSelectIntf} obj - The instance of GfAdvSelectIntf to be evaluated.
	 *
	 * @return {boolean} - True if the interface is valid and can be reliably used, false otherwise.
	 */
	function ls_EvalValidity( obj ) {
		var classIsCorrect = undefined;
		var hasRightChildren = undefined;
		var is$ = undefined;
		var lenOf1 = undefined;
		var selsMakeSense = undefined;
		var valid = false;

		try {
			selsMakeSense = $.isCssClass( lsSels.gfId ) && $.isCssClass( lsSels.gfContId );
			is$ = $.isJQueryObj( obj.$gfield );
			lenOf1 = is$ ?
					obj.$gfield.length === 1 :
					false;
			classIsCorrect = lenOf1 && selsMakeSense ?
					obj.$gfield.hasClass( lsSels.gfId ) :
					false;
			// TODO: Add check for correct children being present
			valid = is$ && lenOf1 && classIsCorrect;
		} catch ( e ) {
			console.log( e.name + ': ' + e.message );
		}
		if ( !valid ) {
			reportValidityError( classIsCorrect, hasRightChildren, is$, lenOf1, selsMakeSense );
		}

		return valid;
	}

	/**
	 * Tells the user why an instance of GfAdvSelectIntf is invalid.
	 * 
	 * Debugging function that uses the console's log to tell the user why an instance of
	 * GfAdvSelectIntf is invalid and cannot be used as expected. Validity is based on the condition
	 * of the $gfield parameter passed to the instance during its construction.
	 *
	 * @param {undefined|boolean} classIsCorrect - Indicates whether $gfield has a class applied to
	 *     it that indicates it is a genuine gravity forms field.
	 * @param {undefined|boolean} hasRightChildren - Indicates whether $gfield contains child
	 *     elements that are associated with the advanced user interface option for drop downs.
	 */
	function reportValidityError( classIsCorrect, hasRightChildren, is$, lenOf1, selsMakeSense ) {
		var msg;

		if ( typeof selsMakeSense === 'undefined' || typeof is$ === undefined ) {
			msg = 'Object validity could not be determined because jQuery extensions from jQuery.ou\
e.js are missing.';
		} else if ( selsMakeSense === false ) {
			msg = 'I was passed inappropriate values for my lexically scoped selectors.';
		} else if ( is$ === false ) {
			msg = 'The "gravity forms field" I was passed is not even a jQuery object.';
		} else if ( lenOf1 === false ) {
			msg = 'I was given a valid jQuery object to build myself from, but found that it did no\
t represent a single element.';
		} else if ( classIsCorrect === false ) {
			msg = 'I was given a valid jQuery object representing a single element to build myself \
from, but found that it did not represent a gravity forms field.';
		} else if ( hasRightChildren === false ) {
			msg = "The jQuery object representing the gravity forms field I was given to build myse\
lf from did not contain the expected child elements that are associated with the GF select field's \
advanced user interface option.";
		} else {
			msg = "I'm not sure what is wrong, but I was unable to build myself; careful debugging \
will be needed to determine the nature of this unforseen error condition.";
		}
		console.log( modName + " construction error: " + msg );
	}

	return GfAdvSelectIntf;
} )( jQuery, 'GfAdvSelectIntf', {
	gfId: 'gfield',
	gfContId: 'ginput_container_select',
	gfSelSel: '.gfield_select',
	gfChosenSpanSel: '.chosen-single span'
} );

////////////////////////////////////////////////////////////////////////////////////////////////
// §1.2: GfAddCourseBinder

/**
 * Add course carry over initiator (AddCrseCoInr) module.
 *
 * Module that can bind an event handler to a transfer course evaluation request form that causes
 * the location and name of the previous course to be carried over to a new course once it is added
 * to the request.
 *
 * @param {jquery} $ - The session's jquery object.
 * @param {string} modName - Stores the name of this module; useful in error reporting.
 * @param {object} lsSels - A collection of lexically scoped jQuery selectors that are determined by
 *     the design of transfer course evaluation request forms.
 * @param {string} lsSels.gfCont - Selector for the wrapper of a transfer course evaluation request
 *     form.
 * @param {string} lsSels.gfFld - Selector for gravity forms fields.
 * @param {string} lsSels.locFld - Selector for the institution location field in a transfer course
 *     evaluation request form, which is the first field in the set of fields that identifies the
 *     institution associated with the course to be entered.
 *
 * @todo Finish adding inline documentation to module.
 *
 * @class
 */

var AddCrseCoInr = ( function( $, modName, lsSels ) {

	'use strict';

	function AddCrseCoInr( selFields ) {
		this.selFields = selFields;
		this.$fields = $( selFields );
		this.enactCarryOver();
	}

	AddCrseCoInr.prototype.enactCarryOver = function() {
		var $gfCont = $( lsSels.gfCont );
		var $this = undefined;
		var isChecked = undefined;
		var inst = this;

		$gfCont.on( 'change', inst.selFields, function() {
			$this = $( this );
			isChecked = $this.prop( 'checked' );
			if ( isChecked ) {
				console.log( 'Checkbox is checked.' );
				ls_CarryOverLocationFlds( inst, $this );
			}
		} );
	};

	function ls_CarryOverLocationFlds( inst, $fld ) {
		var $nextCountryFld = undefined;
		var $nextIntlNameFld = undefined;
		var $nextLocFld = undefined;
		var $nextNameFld = undefined;
		var $nextNameOtherFld = undefined;
		var $parentFld = undefined;
		var $prevCountryFld = undefined;
		var $prevIntlNameFld = undefined;
		var $prevLocFld = undefined;
		var $prevNameFld = undefined;
		var $prevNameOtherFld = undefined;

		// First find the parent gfield.
		$parentFld = $fld.parents( lsSels.gfFld ).first();

		// Using the parent gfield, find the next set of location fields following the checkbox that
		// will copy previous set of location fields preceding the check box.
		$nextLocFld = $parentFld.nextAll( lsSels.locFld ).first();
		$nextNameFld = $nextLocFld.next();
		$nextNameOtherFld = $nextNameFld.next();
		$nextCountryFld = $nextNameOtherFld.next();
		$nextIntlNameFld = $nextCountryFld.next();

		// Using the parent gfield, find the previous set of location fields preceding the checkbox
		// that will be copied over to the newly revealed set of fields following the check box.
		$prevLocFld = $parentFld.prevAll( lsSels.locFld ).first();
		$nextNameFld = $nextLocFld.next();
		$nextNameOtherFld = $nextNameFld.next();
		$nextCountryFld = $nextNameOtherFld.next();
		$nextIntlNameFld = $nextCountryFld.next();

		// Copy the values from the previous field set to the next.
		ls_CopyOverLocFld( $prevLocFld, $nextLocFld );
	}

	function ls_CopyLocFld( $prevLocFld, $nextLocFld ) {
		var prevLocIntf = new GfAdvSelectIntf( $prevLocFld );
		var nextLocIntf = new GfAdvSelectIntf( $nextLocFld );

		nextLocIntf.$selElem.val( prevLocIntf.$selElem.val() );
		nextLocIntf.$chosenSpan.html( prevLocIntf.$chosenSpan.html() );
		nextLocIntf.$selElem.trigger( 'change' );
	}

	return AddCrseCoInr;
} )( jQuery, 'AddCrseCoInr', {
	gfCont: '.gform_wrapper',
	gfFld: '.gfield',
	locFld: '.oue-gf-instn-locn'
} );
