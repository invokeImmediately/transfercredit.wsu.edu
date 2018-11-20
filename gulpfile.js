'use strict';

/* -------------------------------------------------------------------------------------------------
** Variable Declarations
*/

// Gulp task dependencies
var cleanCss = require( 'gulp-clean-css' );
var concat = require( 'gulp-concat' );
var extName = require( 'gulp-extname' );
var gcmq = require( 'gulp-group-css-media-queries' );
var gulp = require( 'gulp' );
var insert = require( 'gulp-insert' );
var insertLines = require( 'gulp-insert-lines' );
var lessc = require( 'gulp-less' );
var replace = require( 'gulp-replace' );
var uglifyJs = require( 'gulp-uglify' );
var pump = require( 'pump' );

/* -------------------------------------------------------------------------------------------------
** Function declarations
*/

function getCssBuildSettings() {
	return {
		commentRemovalNeedle: /^(?:[ \t]*)?\/\*[^!].*$\n(?:^\*\*?[^/].*$\n)*\*\*?\/\n\n?/gm,
		dependenciesPath: './WSU-UE---CSS/',
		destFolder: './CSS/',
		insertLinesSettings: {
			'before': /^@media/,
			'lineBefore': '/*! ╔═══════════════════════════════════════════════════════════════════\
════════════════════════════════════════════════════╗\r\n*   ║ MEDIA QUERIES ######################\
################################################################################# ║\r\n*   ╚═══════\
═══════════════════════════════════════════════════════════════════════════════════════════════════\
═════════════╝\r\n*/',
			'stopAfterFirstMatch': true
		},
		minCssFileExtension: '.min.css',
		minCssFileHeaderStr: '/* Built with the LESS CSS preprocessor [http://lesscss.org/]. Please\
 see [https://github.com/invokeImmediately/transfercredit.wsu.edu] for a repository of source code.\
 */\r\n',
		sourceFile: './CSS/xfercredit-custom.less'
	};
}

function getJsBuildSettings() {
	return {
		buildDependenciesList: [
			'./WSU-UE---JS/jQuery.oue-custom.js',
			'./WSU-UE---JS/jQuery.forms.js',
			'../jQuery.AreYouSure/jquery.are-you-sure.js',
			'./WSU-UE---JS/jQuery.are-you-sure.js',
			'../qTip2/dist/jquery.qtip.min.js',
			'./WSU-UE---JS/jQuery.qTip.js',
			'./JS/xfercredit-custom.js'
		],
		commentNeedle: /^(\/\*)(?!!)/g,
		compiledJsFileName: 'xfercredit-build.js',
		destFolder: './JS/',
		minJsFileExtension: '.min.js',
		replaceCallback: fixFileHeaderComments
	};
}

function fixFileHeaderComments ( match, p1, offset, string ) {
	var replacementStr = match;
	if ( offset == 0 ) {
		replacementStr = '/*!';
	}
	return replacementStr;
}

function setUpCssBuildTask( settings ) {
	gulp.task( 'buildMinCss', function ( callBack ) {
		pump( [
				gulp.src( settings.sourceFile ),
				lessc( {
					paths: [settings.dependenciesPath]
				} ),
				replace( settings.commentRemovalNeedle, '' ),
				gulp.dest( settings.destFolder ),
				gcmq(),
				insertLines( settings.insertLinesSettings ),
				cleanCss(),
				insert.prepend( settings.minCssFileHeaderStr ),
				extName( settings.minCssFileExtension ),
				gulp.dest( settings.destFolder )
			],
			callBack
		);
	} );
}

function setUpJsBuildTask( settings ) {
	gulp.task( 'buildMinJs', function ( callBack ) {
		pump( [
				gulp.src( settings.buildDependenciesList ),
				replace( settings.commentNeedle, settings.replaceCallback ),
				concat( settings.compiledJsFileName ),
				gulp.dest( settings.destFolder ),
				uglifyJs( {
					output: {
						comments: /^!/
					},
					toplevel: true,
				} ),
				extName( settings.minJsFileExtension ),
				gulp.dest( settings.destFolder )
			],
			callBack
		);
	} );
}

/* -------------------------------------------------------------------------------------------------
** Main execution sequence
*/

setUpCssBuildTask( getCssBuildSettings() );
setUpJsBuildTask( getJsBuildSettings() );
