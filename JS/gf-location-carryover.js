////////////////////////////////////////////////////////////////////////////////////////////////
// §1.1: GfAdvSelectIntf

/**
 * JQuery-based interface to key UI components of an Gravity Forms select field utilizing the
 * advanced user interface option.
 *
 * @param {jquery} $ - The session's jquery object.
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

var GfAdvSelectIntf = ( function( $, className, lsSels ) {

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
		return evalValidity( this );
	};


	////////////////////////////////////////////////////////////////////////////////////////////
	// §1.1.6: Lexically scoped support functions  

	/**
	 * Evaluate the validity of an instance of GfAdvSelectInf.
	 *
	 * Evaluate the validity of an instance of GfAdvSelectInf based on the parameter it was passed
	 * during its construction and the condition of lexically scoped settings for the module.
	 * Several criteria about the nature of the object and whether it can be used to build an
	 * interface to expected elements within the DOM must be satisfied.
	 *
	 * @param {GfAdvSelectInf} obj - The instance of GfAdvSelectInf to be evaluated.
	 *
	 * @return {boolean} - True if the interface is valid and can be reliably used, false otherwise.
	 */
	function evalValidity( obj ) {
		var classIsCorrect = undefined;
		var hasRightChildren = undefined;
		var is$ = undefined;
		var lenOf1 = undefined;
		var selsMakesSense = undefined;
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
			reportValidityError( classIsCorrect, hasRightChildren, is$, lenOf1, selsMakesSense );
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
	function reportValidityError( classIsCorrect, hasRightChildren, is$, lenOf1, selsMakesSense ) {
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
		console.log( className + " construction error: " + msg );
	}

	return GfAdvSelectIntf;
} )( jQuery, 'GfAdvSelectIntf', {
	gfId: 'gfield',
	gfContId: 'ginput_container_select',
	gfSelSel: '.gfield_select',
	gfChosenSpanSel: '.chosen-single span'
} );
