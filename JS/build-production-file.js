/* NODE.JS - Build Production JavaScript File */
var concat = require('../../../../AppData/Roaming/npm/node_modules/concat-files');
concat([
 './transfer-central-custom.js',
 '../WSU-UE---JS/jQuery.oue-custom.js',
 '../WSU-UE---JS/jQuery.qTip.js',
 ], './wp-custom-js-source.js', function() {
    console.log('Concatenation complete.');     
 });