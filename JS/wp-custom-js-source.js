/***************************************************************************************************
 CUSTOM JQUERY-BASED DYNAMIC CONTENT
 **************************************************************************************************/
(function ($) {
	$(document).ready(function () {
        //traverseInputs('.ugrf-general-reqd');        
        if($("div.gform_body").length > 0) {
            setupInstitutionSelectors(".oue-gf-instn-locn", ".oue-gf-instn-name");
            setupEnhancedUploadChain(".oue-gf-upload-chain-enhncd", ".oue-gf-upload-chain-extra");
        }
	});

    /******************************************************************************************\
    | Setup a chain of file uploading inputs, wherein only the left-most input in the tree is  |
    | visible. As the user uploads files in sequence, the next nearest neighbor is unveiled.   |
    \******************************************************************************************/
    function setupEnhancedUploadChain (selector, selectorExtra) {
        if ($.type(selector) === "string") {
            /* CHECK IF UPLOADS ALREADY EXIST:
             *  It is possible to arrive at this point in execution after the user has submitted a
             *  form containing errors that also already contains transcripts uploaded to input
             *  fields that will be hidden by default. The following blocks of code resolve this
             *  situation by showing such fields, as well as their nearest neighbors.
             */
            var $inputs = $(selector + " input[type='file']");
            $inputs.each(function () {
                var $thisInput = $(this);
                var $nextDiv = $thisInput.nextAll("div[id]").first();
                if($nextDiv.length > 0) {
                    $thisInput.addClass("gf-value-entered");
                    var $parentOfInput = $thisInput.parents(selector).first();
                    var $parentNextExtra = $parentOfInput.nextAll(selectorExtra).first();
                    var $parentNextSblngs = $parentOfInput.nextAll(selector).first();
                    $parentOfInput.removeClass("gf-hidden");
                    $parentOfInput.addClass("gf_left_half");
                    $parentNextExtra.removeClass("gf-hidden");
                    $parentNextSblngs.removeClass("gf-hidden");
                }
            });
            $(".gform_body").on("change", selector + " input[type='file']", function () {
                var $thisInput = $(this);
                if($thisInput.prop("files") != null && $thisInput.prop("files").length > 0) {
                    var valuePassed = true;
                    var $parentOfInput = $thisInput.parents(selector).first();
                    var $parentNextSblngs = $parentOfInput.nextAll(selector);
                    var $parentPrevSblngs = $parentOfInput.prevAll(selector);
                    if($parentNextSblngs.length != 0 || $parentPrevSblngs.length != 0) {
                        var originalFileName = $thisInput.prop("files").item(0).name;
                        $parentPrevSblngs.each(function () {
                            if(valuePassed) {
                                var $thisSblng = $(this);
                                var $thisSblngInput = $thisSblng.find("input[type='file']").first();
                                if($thisSblngInput.prop("files") != null && $thisSblngInput.prop("files").length > 0) {
                                    var thisFileName = $thisSblngInput.prop("files").item(0).name;
                                    valuePassed = originalFileName != thisFileName;
                                }
                            }
                        });
                        $parentNextSblngs.each(function () {
                            if(valuePassed) {
                                var $thisSblng = $(this);
                                var $thisSblngInput = $thisSblng.find("input[type='file']").first();
                                if($thisSblngInput.prop("files") != null && $thisSblngInput.prop("files").length > 0) {
                                    var thisFileName = $thisSblngInput.prop("files").item(0).name;
                                    valuePassed = originalFileName != thisFileName;
                                }
                            }
                        });
                    }
                    if(valuePassed) {                      
                        var $parentNextExtra = $parentOfInput.nextAll(selectorExtra).first();
                        $thisInput.addClass("gf-value-entered");
                        $parentNextSblngs.first().removeClass("gf-hidden");
                        $parentOfInput.addClass("gf_left_half");
                        $parentNextExtra.removeClass("gf-hidden");
                    }
                    else
                    {
                        alert("A file with the same name has already been uploaded; please choose a different file.");
                        $thisInput.get(0).value = "";
                    }
                }
                else {
                    $thisChild.removeClass("gf-value-entered");
                }
            });
        }
    }

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
                    case "Alabama":
                        newOpts = {
                            "": "",
                            "Alabama Agricultural and Mechanical University": "Alabama Agricultural and Mechanical University",
                            "Alabama Christian School of Religion": "Alabama Christian School of Religion",
                            "Alabama Southern Community College": "Alabama Southern Community College",
                            "Alabama State University": "Alabama State University",
                            "Amridge University": "Amridge University",
                            "Athens State College": "Athens State College",
                            "Auburn University": "Auburn University",
                            "Auburn University at Montgomery": "Auburn University at Montgomery",
                            "Bevill State Community College": "Bevill State Community College",
                            "Birmingham-Southern College": "Birmingham-Southern College",
                            "Bishop State Community College": "Bishop State Community College",
                            "Brewer State Junior College": "Brewer State Junior College",
                            "Calhoun Community College": "Calhoun Community College",
                            "Central Alabama Community College": "Central Alabama Community College",
                            "Chattahoochee Valley State Community College": "Chattahoochee Valley State Community College",
                            "Community College of The Air Force": "Community College of The Air Force",
                            "Concordia College": "Concordia College",
                            "Enterprise State Community College": "Enterprise State Community College",
                            "Faulkner University": "Faulkner University",
                            "Gadsden State Community College": "Gadsden State Community College",
                            "George C Wallace State Community College": "George C Wallace State Community College",
                            "Huntingdon College": "Huntingdon College",
                            "International Bible College": "International Bible College",
                            "Jacksonville State University": "Jacksonville State University",
                            "James H Faulkner State Junior College": "James H Faulkner State Junior College",
                            "Jefferson Davis State Junior College": "Jefferson Davis State Junior College",
                            "Jefferson State Community College": "Jefferson State Community College",
                            "Judson College": "Judson College",
                            "Lawson State Community College": "Lawson State Community College",
                            "Livingston University": "Livingston University",
                            "Lurleen B Wallace State Junior College": "Lurleen B Wallace State Junior College",
                            "Marion Military Institute": "Marion Military Institute",
                            "Miles College": "Miles College",
                            "Northeast Alabama State Junior College": "Northeast Alabama State Junior College",
                            "Northwest Alabama State Junior College": "Northwest Alabama State Junior College",
                            "Northwest Shoals Community College": "Northwest Shoals Community College",
                            "Oakwood College": "Oakwood College",
                            "Patrick Henry State Junior College": "Patrick Henry State Junior College",
                            "Phillips Junior College": "Phillips Junior College",
                            "Rets Electronic Institute": "Rets Electronic Institute",
                            "Samford University": "Samford University",
                            "Selma University": "Selma University",
                            "Shelton State Community College": "Shelton State Community College",
                            "Shoals Community College": "Shoals Community College",
                            "Snead State Junior College": "Snead State Junior College",
                            "Southeastern Bible College": "Southeastern Bible College",
                            "Southern Christian University": "Southern Christian University",
                            "Southern Junior College of Business": "Southern Junior College of Business",
                            "Southern Union State Junior College": "Southern Union State Junior College",
                            "Spring Hill College": "Spring Hill College",
                            "Stillman College": "Stillman College",
                            "Talladega College": "Talladega College",
                            "Troy State University": "Troy State University",
                            "Troy State University at Dothan": "Troy State University at Dothan",
                            "Troy State University in Montgomery": "Troy State University in Montgomery",
                            "Troy University": "Troy University",
                            "Tuskegee University": "Tuskegee University",
                            "UAB Walker College": "UAB Walker College",
                            "Unites States Sports Academy": "Unites States Sports Academy",
                            "University of Alabama": "University of Alabama",
                            "University of Alabama at Birmingham": "University of Alabama at Birmingham",
                            "University of Alabama in Huntsville": "University of Alabama in Huntsville",
                            "University of Mobile": "University of Mobile",
                            "University of Montevallo": "University of Montevallo",
                            "University of North Alabama": "University of North Alabama",
                            "University of South Alabama": "University of South Alabama",
                            "University of West Alabama": "University of West Alabama",
                            "Walker College": "Walker College",
                            "Wallace State Community College": "Wallace State Community College",
                            "Other": "Other"
                        };
                        break;
                    case "Alaska":
                        newOpts = {
                            "": "",
                            "Alaska Bible College": "Alaska Bible College",
                            "Alaska Pacific University": "Alaska Pacific University",
                            "Career Academy": "Career Academy",
                            "Chukchi College": "Chukchi College",
                            "Covenant Life College": "Covenant Life College",
                            "Ilisagvik College": "Ilisagvik College",
                            "Kenai Peninsula College": "Kenai Peninsula College",
                            "Kodiak College": "Kodiak College",
                            "Kuskokwim College": "Kuskokwim College",
                            "Matanuska-Susitna College": "Matanuska-Susitna College",
                            "Northwest College": "Northwest College",
                            "Prince William Sound Community College": "Prince William Sound Community College",
                            "Sheldon Jackson College": "Sheldon Jackson College",
                            "Tanana Community College": "Tanana Community College",
                            "University of Alaska": "University of Alaska",
                            "University of Alaska Fairbanks": "University of Alaska Fairbanks",
                            "University of Alaska Southeast": "University of Alaska Southeast",
                            "University of Alaska Southeast Ketchikan Campus": "University of Alaska Southeast Ketchikan Campus",
                            "University of Alaska Southeast Sitka Campus": "University of Alaska Southeast Sitka Campus",
                            "Other": "Other"
                        };
                        break;
                    case "Arkansas":
                        newOpts = {
                            "": "",
                            "Arkansas Baptist College": "Arkansas Baptist College",
                            "Arkansas Northeastern College": "Arkansas Northeastern College",
                            "Arkansas State University": "Arkansas State University",
                            "Arkansas State University - Newport": "Arkansas State University - Newport",
                            "Arkansas State University Beebe Campus": "Arkansas State University Beebe Campus",
                            "Arkansas State University Mountain Home": "Arkansas State University Mountain Home",
                            "Arkansas Tech University": "Arkansas Tech University",
                            "Black River Technical College": "Black River Technical College",
                            "Capital City Junior College": "Capital City Junior College",
                            "Central Baptist College": "Central Baptist College",
                            "College of the Ouachitas": "College of the Ouachitas",
                            "Crowley's Ridge Christian College": "Crowley's Ridge Christian College",
                            "East Arkansas Community College": "East Arkansas Community College",
                            "Garland County Community College": "Garland County Community College",
                            "Harding University": "Harding University",
                            "Henderson State University": "Henderson State University",
                            "Hendrix College": "Hendrix College",
                            "John Brown University": "John Brown University",
                            "Lyon College": "Lyon College",
                            "Mid South Community College": "Mid South Community College",
                            "Mississippi County Community College": "Mississippi County Community College",
                            "National Educ Ctr-Arkansas Coll of Tech Campus": "National Educ Ctr-Arkansas Coll of Tech Campus",
                            "National Park Community College": "National Park Community College",
                            "North Arkansas Community College": "North Arkansas Community College",
                            "Northwest Arkansas Community College": "Northwest Arkansas Community College",
                            "Ouachita Baptist University": "Ouachita Baptist University",
                            "Ozarka College": "Ozarka College",
                            "Philander Smith College": "Philander Smith College",
                            "Phillips County Community College": "Phillips County Community College",
                            "Pulaski Technical College": "Pulaski Technical College",
                            "Rich Mountain Community College": "Rich Mountain Community College",
                            "Shorter College": "Shorter College",
                            "Southeast Arkansas College": "Southeast Arkansas College",
                            "Southern Arkansas University": "Southern Arkansas University",
                            "Southern Arkansas University, El Dorado Branch": "Southern Arkansas University, El Dorado Branch",
                            "Southern Arkansas University, Technical Branch": "Southern Arkansas University, Technical Branch",
                            "University of Arkansas": "University of Arkansas",
                            "University of Arkansas - Fort Smith": "University of Arkansas - Fort Smith",
                            "University of Arkansas at Little Rock": "University of Arkansas at Little Rock",
                            "University of Arkansas at Monticello": "University of Arkansas at Monticello",
                            "University of Arkansas at Pine Bluff": "University of Arkansas at Pine Bluff",
                            "University of Arkansas CC at Batesville": "University of Arkansas CC at Batesville",
                            "University of Arkansas Community College Morrilton": "University of Arkansas Community College Morrilton",
                            "University of Central Arkansas": "University of Central Arkansas",
                            "University of The Ozarks": "University of The Ozarks",
                            "Westark Community College": "Westark Community College",
                            "Williams Baptist College": "Williams Baptist College",
                            "Other": "Other"
                        };
                        break;
                    case "American Samoa":
                        newOpts = {
                            "": "",
                            "American Samoa Community College": "American Samoa Community College",
                            "Other": "Other"
                        };
                        break;
                    case "Arizona":
                        newOpts = {
                            "": "",
                            "American Graduate Sch of International Management": "American Graduate Sch of International Management",
                            "American Indian College of The Assemblies of God": "American Indian College of The Assemblies of God",
                            "Argosy University": "Argosy University",
                            "Arizona Christian University": "Arizona Christian University",
                            "Arizona College of The Bible": "Arizona College of The Bible",
                            "Arizona State University": "Arizona State University",
                            "Arizona Western College": "Arizona Western College",
                            "Central Arizona College": "Central Arizona College",
                            "Chandler-Gilbert Community College": "Chandler-Gilbert Community College",
                            "Chandler-Gilbert Community College Center": "Chandler-Gilbert Community College Center",
                            "Chaparral Career College": "Chaparral Career College",
                            "Cochise College": "Cochise College",
                            "Coconino County Community College": "Coconino County Community College",
                            "Devry Institute of Technology": "Devry Institute of Technology",
                            "Devry University": "Devry University",
                            "Dine College": "Dine College",
                            "Eastern Arizona College": "Eastern Arizona College",
                            "Embry Riddle Aeronautical University": "Embry Riddle Aeronautical University",
                            "Estrella Mountain Community College": "Estrella Mountain Community College",
                            "Everest College": "Everest College",
                            "Gateway Community College": "Gateway Community College",
                            "Glendale Community College": "Glendale Community College",
                            "Grand Canyon University": "Grand Canyon University",
                            "Lamson College": "Lamson College",
                            "Mesa Community College": "Mesa Community College",
                            "Midwestern University": "Midwestern University",
                            "Mohave Community College": "Mohave Community College",
                            "Navajo Community College": "Navajo Community College",
                            "Northcentral University": "Northcentral University",
                            "Northern Arizona University": "Northern Arizona University",
                            "Northland Pioneer College": "Northland Pioneer College",
                            "Paradise Valley Community College Center": "Paradise Valley Community College Center",
                            "Penn Foster College": "Penn Foster College",
                            "Phoenix College": "Phoenix College",
                            "Pima Community College": "Pima Community College",
                            "Prescott College": "Prescott College",
                            "Rio Salado Community College": "Rio Salado Community College",
                            "Scottsdale Community College": "Scottsdale Community College",
                            "South Mountain Community College": "South Mountain Community College",
                            "Southwest Coll of Naturopathic Med & Health Scis": "Southwest Coll of Naturopathic Med & Health Scis",
                            "Thunderbird School of Global Management": "Thunderbird School of Global Management",
                            "Tucson College": "Tucson College",
                            "University of Advancing Technology": "University of Advancing Technology",
                            "University of Arizona": "University of Arizona",
                            "University of Phoenix": "University of Phoenix",
                            "Western International University": "Western International University",
                            "Yavapai College": "Yavapai College",
                            "Other": "Other"
                        };
                        break;
                    case "California":
                        newOpts = {
                            "": "",
                            "Academy of Art University": "Academy of Art University",
                            "Allan Hancock College": "Allan Hancock College",
                            "Alliant International University - San Diego": "Alliant International University - San Diego",
                            "Ambassador College": "Ambassador College",
                            "American Academy of Dramatic Arts West": "American Academy of Dramatic Arts West",
                            "American Baptist Seminary of The West": "American Baptist Seminary of The West",
                            "American Conservatory Theatre": "American Conservatory Theatre",
                            "American Film Inst Ctr Advanced Film & TV Studies": "American Film Inst Ctr Advanced Film & TV Studies",
                            "American Jewish University": "American Jewish University",
                            "American River College": "American River College",
                            "Antelope Valley College": "Antelope Valley College",
                            "Antioch University Southern California": "Antioch University Southern California",
                            "Armstrong College": "Armstrong College",
                            "Art Center College of Design": "Art Center College of Design",
                            "Art Institute of California - Orange": "Art Institute of California - Orange",
                            "Art Institute of California - Hollywood": "Art Institute of California - Hollywood",
                            "Art Institute of California - San Diego": "Art Institute of California - San Diego",
                            "Art Institute of Southern California": "Art Institute of Southern California",
                            "Azusa Pacific University": "Azusa Pacific University",
                            "Bakersfield College": "Bakersfield College",
                            "Barstow College": "Barstow College",
                            "Bay-Valley Tech": "Bay-Valley Tech",
                            "Berkeley City College": "Berkeley City College",
                            "Bethany Bible College": "Bethany Bible College",
                            "Biola University": "Biola University",
                            "Brandman University": "Brandman University",
                            "Brooks College": "Brooks College",
                            "Brooks Institute of Photography": "Brooks Institute of Photography",
                            "Butte College": "Butte College",
                            "Cabrillo College": "Cabrillo College",
                            "California Baptist University": "California Baptist University",
                            "California Coast University": "California Coast University",
                            "California College for Health Sciences": "California College for Health Sciences",
                            "California College of Arts": "California College of Arts",
                            "California College of Podiatric Medicine": "California College of Podiatric Medicine",
                            "California Family Study Center": "California Family Study Center",
                            "California Institute of Integral Studies": "California Institute of Integral Studies",
                            "California Institute of Technology": "California Institute of Technology",
                            "California Institute of The Arts": "California Institute of The Arts",
                            "California Lutheran University": "California Lutheran University",
                            "California Maritime Academy": "California Maritime Academy",
                            "California Northstate University": "California Northstate University",
                            "California Polytechnic State Univ, San Luis Obispo": "California Polytechnic State Univ, San Luis Obispo",
                            "California Sch of Prof Psychology, Los Angeles": "California Sch of Prof Psychology, Los Angeles",
                            "California State College, Sonoma": "California State College, Sonoma",
                            "California State Polytechnic University, Pomona": "California State Polytechnic University, Pomona",
                            "California State University, Bakersfield": "California State University, Bakersfield",
                            "California State University, Channel Islands": "California State University, Channel Islands",
                            "California State University, Chico": "California State University, Chico",
                            "California State University, Dominguez Hills": "California State University, Dominguez Hills",
                            "California State University, East Bay": "California State University, East Bay",
                            "California State University, Fresno": "California State University, Fresno",
                            "California State University, Fullerton": "California State University, Fullerton",
                            "California State University, Hayward": "California State University, Hayward",
                            "California State University, Long Beach": "California State University, Long Beach",
                            "California State University, Los Angeles": "California State University, Los Angeles",
                            "California State University, Monterey Bay": "California State University, Monterey Bay",
                            "California State University, Northridge": "California State University, Northridge",
                            "California State University, Sacramento": "California State University, Sacramento",
                            "California State University, San Bernardino": "California State University, San Bernardino",
                            "California State University, San Marcos": "California State University, San Marcos",
                            "California State University, Stanislaus": "California State University, Stanislaus",
                            "Cañada College": "Cañada College",
                            "Carrington College - Sacramento": "Carrington College - Sacramento",
                            "Carrington College - San Leandro": "Carrington College - San Leandro",
                            "Carrington College - Stockton": "Carrington College - Stockton",
                            "Cerritos College": "Cerritos College",
                            "Cerro Coso Community College": "Cerro Coso Community College",
                            "Chabot College": "Chabot College",
                            "Chaffey College": "Chaffey College",
                            "Chapman University": "Chapman University",
                            "Chouinard Art Institute": "Chouinard Art Institute",
                            "Christ College Irvine": "Christ College Irvine",
                            "Church Divinity School of The Pacific": "Church Divinity School of The Pacific",
                            "Citrus College": "Citrus College",
                            "City College of San Francisco": "City College of San Francisco",
                            "Claremont Graduate School": "Claremont Graduate School",
                            "Claremont McKenna College": "Claremont McKenna College",
                            "Claremont School of Theology": "Claremont School of Theology",
                            "Cleveland Chiropractic College": "Cleveland Chiropractic College",
                            "Coastline Community College": "Coastline Community College",
                            "Cogswell Polytechnical College": "Cogswell Polytechnical College",
                            "Coleman College": "Coleman College",
                            "College for Developmental Studies": "College for Developmental Studies",
                            "College of Alameda": "College of Alameda",
                            "College of Marin": "College of Marin",
                            "College of Oceaneering": "College of Oceaneering",
                            "College of San Mateo": "College of San Mateo",
                            "College of The Canyons": "College of The Canyons",
                            "College of The Desert": "College of The Desert",
                            "College of The Redwoods": "College of The Redwoods",
                            "College of The Sequoias": "College of The Sequoias",
                            "College of The Siskiyous": "College of The Siskiyous",
                            "Columbia College": "Columbia College",
                            "Columbia College, Los Angeles": "Columbia College, Los Angeles",
                            "Compton Community College": "Compton Community College",
                            "Concordia University": "Concordia University",
                            "Consortium of The California State University": "Consortium of The California State University",
                            "Contra Costa College": "Contra Costa College",
                            "Copper Mountain College": "Copper Mountain College",
                            "Cosumnes River College": "Cosumnes River College",
                            "Crafton Hills College": "Crafton Hills College",
                            "Cuesta College": "Cuesta College",
                            "Cuyamaca College": "Cuyamaca College",
                            "Cypress College": "Cypress College",
                            "Deanza College": "Deanza College",
                            "Deep Springs College": "Deep Springs College",
                            "Deep Springs College": "Deep Springs College",
                            "Defense Language Institute, Foreign Language Center": "Defense Language Institute, Foreign Language Center",
                            "Devry Institute of Technology": "Devry Institute of Technology",
                            "Devry University": "Devry University",
                            "Devry University": "Devry University",
                            "Dharma Realm Budd Un": "Dharma Realm Budd Un",
                            "Diablo Valley College": "Diablo Valley College",
                            "Domincan University of California": "Domincan University of California",
                            "Dominican School of Philosophy and Theology": "Dominican School of Philosophy and Theology",
                            "Dominquez Seminary Clarentian Junior Se": "Dominquez Seminary Clarentian Junior Se",
                            "Don Bosco Technical Institute": "Don Bosco Technical Institute",
                            "D-Q University": "D-Q University",
                            "East Los Angeles College": "East Los Angeles College",
                            "El Camino College": "El Camino College",
                            "Empire College": "Empire College",
                            "Evergreen Valley College": "Evergreen Valley College",
                            "Fashion Institute of Design and Merchandising": "Fashion Institute of Design and Merchandising",
                            "Feather River College": "Feather River College",
                            "Folsom Lake College": "Folsom Lake College",
                            "Foothill College": "Foothill College",
                            "Fresno City College": "Fresno City College",
                            "Fresno Pacific College": "Fresno Pacific College",
                            "Fuller Theological Seminary": "Fuller Theological Seminary",
                            "Fullerton College": "Fullerton College",
                            "Gavilan College": "Gavilan College",
                            "Glendale Community College": "Glendale Community College",
                            "Golden Gate University": "Golden Gate University",
                            "Golden West College": "Golden West College",
                            "Grantham College of Engineering": "Grantham College of Engineering",
                            "Grossmont College": "Grossmont College",
                            "Hartnell College": "Hartnell College",
                            "Harvey Mudd College": "Harvey Mudd College",
                            "Heald 4C's College": "Heald 4C's College",
                            "Heald Business College, Hayward": "Heald Business College, Hayward",
                            "Heald Business College, Oakland": "Heald Business College, Oakland",
                            "Heald Business College, Rancho Cordova": "Heald Business College, Rancho Cordova",
                            "Heald Business College, Rohnert Park": "Heald Business College, Rohnert Park",
                            "Heald Business College, San Diego": "Heald Business College, San Diego",
                            "Heald Business College, San Francisco": "Heald Business College, San Francisco",
                            "Heald Business College, San Jose": "Heald Business College, San Jose",
                            "Heald Business College, Walnut Creek": "Heald Business College, Walnut Creek",
                            "Heald Institute of Technology, Hayward": "Heald Institute of Technology, Hayward",
                            "Heald Institute of Technology, Martinez": "Heald Institute of Technology, Martinez",
                            "Heald Institute of Technology, Rancho Cordova": "Heald Institute of Technology, Rancho Cordova",
                            "Heald Institute of Technology, San Francisco": "Heald Institute of Technology, San Francisco",
                            "Heald Institute of Technology, San Jose": "Heald Institute of Technology, San Jose",
                            "Hebrew Union College - Jewish Institute of Religion": "Hebrew Union College - Jewish Institute of Religion",
                            "Holy Names College": "Holy Names College",
                            "Hope International University": "Hope International University",
                            "Humboldt State University": "Humboldt State University",
                            "Humphreys College": "Humphreys College",
                            "Immaculate Heart College": "Immaculate Heart College",
                            "Imperial Valley College": "Imperial Valley College",
                            "Irvine Valley College": "Irvine Valley College",
                            "ITT Technical Institute": "ITT Technical Institute",
                            "John F Kennedy University": "John F Kennedy University",
                            "Kelsey-Jenney Business College": "Kelsey-Jenney Business College",
                            "L.I.F.E. Bible College": "L.I.F.E. Bible College",
                            "La Sierra University": "La Sierra University",
                            "Lake Tahoe Community College": "Lake Tahoe Community College",
                            "Laney College": "Laney College",
                            "Language Center Pacific": "Language Center Pacific",
                            "Las Positas College": "Las Positas College",
                            "Lassen College": "Lassen College",
                            "Life Pacific College": "Life Pacific College",
                            "Lincoln University": "Lincoln University",
                            "Loma Linda University": "Loma Linda University",
                            "Lone Mountain College": "Lone Mountain College",
                            "Long Beach City College": "Long Beach City College",
                            "Los Angeles Business College": "Los Angeles Business College",
                            "Los Angeles City College": "Los Angeles City College",
                            "Los Angeles County Coll of Nursing & Allied Health": "Los Angeles County Coll of Nursing & Allied Health",
                            "Los Angeles Harbor College": "Los Angeles Harbor College",
                            "Los Angeles Mission College": "Los Angeles Mission College",
                            "Los Angeles Pierce College": "Los Angeles Pierce College",
                            "Los Angeles Southwest College": "Los Angeles Southwest College",
                            "Los Angeles Trade-Technical College": "Los Angeles Trade-Technical College",
                            "Los Angeles Valley College": "Los Angeles Valley College",
                            "Los Medanos College": "Los Medanos College",
                            "Louise Salinger Academy of Fashion": "Louise Salinger Academy of Fashion",
                            "Loyola Marymount University": "Loyola Marymount University",
                            "Marymount California University": "Marymount California University",
                            "Mendocino College": "Mendocino College",
                            "Menlo College": "Menlo College",
                            "Mennonite Brethren Biblical Seminary": "Mennonite Brethren Biblical Seminary",
                            "Merced College": "Merced College",
                            "Merritt College": "Merritt College",
                            "Mills College": "Mills College",
                            "Mira Costa College": "Mira Costa College",
                            "Mission College": "Mission College",
                            "Modesto Junior College": "Modesto Junior College",
                            "Monterey Institute of International Studies": "Monterey Institute of International Studies",
                            "Monterey Peninsula College": "Monterey Peninsula College",
                            "Moorpark College": "Moorpark College",
                            "Moreno Valley College": "Moreno Valley College",
                            "Mount Saint Mary's College": "Mount Saint Mary's College",
                            "MT San Antonio College": "MT San Antonio College",
                            "MT San Jacinto College": "MT San Jacinto College",
                            "MTI College": "MTI College",
                            "Napa Valley College": "Napa Valley College",
                            "National Polytechnic College of Science": "National Polytechnic College of Science",
                            "National Technical Schools": "National Technical Schools",
                            "National University, Administrative Center": "National University, Administrative Center",
                            "National University, San Diego": "National University, San Diego",
                            "National Hispanic University": "National Hispanic University",
                            "Naval Postgraduate School": "Naval Postgraduate School",
                            "New College of California": "New College of California",
                            "Norco College": "Norco College",
                            "Northrop University": "Northrop University",
                            "Notre Dame De Namur University": "Notre Dame De Namur University",
                            "Occidental College": "Occidental College",
                            "Ohlone College": "Ohlone College",
                            "Orange Coast College": "Orange Coast College",
                            "Otis Art Institute of Parsons School of Design": "Otis Art Institute of Parsons School of Design",
                            "Oxnard College": "Oxnard College",
                            "Pacific Coast Junior College": "Pacific Coast Junior College",
                            "Pacific Graduate School of Psychology": "Pacific Graduate School of Psychology",
                            "Pacific Lutheran Theological Seminary": "Pacific Lutheran Theological Seminary",
                            "Pacific Oaks College and Children's School": "Pacific Oaks College and Children's School",
                            "Pacific Union College": "Pacific Union College",
                            "Palo Verde College": "Palo Verde College",
                            "Palomar College": "Palomar College",
                            "Pasadena City College": "Pasadena City College",
                            "Patten University": "Patten University",
                            "Pepperdine University": "Pepperdine University",
                            "Phillips Junior College - Condie Campus": "Phillips Junior College - Condie Campus",
                            "Pitzer College": "Pitzer College",
                            "Point Loma Nazarene College": "Point Loma Nazarene College",
                            "Pomona College": "Pomona College",
                            "Porterville College": "Porterville College",
                            "Quebec University": "Quebec University",
                            "Queen of The Holy Rosary": "Queen of The Holy Rosary",
                            "Rand Graduate School of Policy Studies": "Rand Graduate School of Policy Studies",
                            "Reedley College": "Reedley College",
                            "Rio Hondo College": "Rio Hondo College",
                            "Riverside City College": "Riverside City College",
                            "Russell College": "Russell College",
                            "Sacramento City College": "Sacramento City College",
                            "Saddleback College": "Saddleback College",
                            "Saint John's Seminary": "Saint John's Seminary",
                            "Saint John's Seminary College": "Saint John's Seminary College",
                            "Saint Mary's College of California": "Saint Mary's College of California",
                            "Saint Patrick's Seminary": "Saint Patrick's Seminary",
                            "Samuel Merritt College": "Samuel Merritt College",
                            "San Bernardino Valley College": "San Bernardino Valley College",
                            "San Diego Christian College": "San Diego Christian College",
                            "San Diego City College": "San Diego City College",
                            "San Diego Mesa College": "San Diego Mesa College",
                            "San Diego Miramar College": "San Diego Miramar College",
                            "San Diego State University": "San Diego State University",
                            "San Francisco Art Institute": "San Francisco Art Institute",
                            "San Francisco College of Mortuary Science": "San Francisco College of Mortuary Science",
                            "San Francisco Conservatory of Music": "San Francisco Conservatory of Music",
                            "San Francisco State University": "San Francisco State University",
                            "San Francisco Theological Seminary": "San Francisco Theological Seminary",
                            "San Joaquin Delta College": "San Joaquin Delta College",
                            "San Joaquin Valley College": "San Joaquin Valley College",
                            "San Jose Christian College": "San Jose Christian College",
                            "San Jose City College": "San Jose City College",
                            "San Jose State University": "San Jose State University",
                            "Santa Ana College": "Santa Ana College",
                            "Santa Barbara City College": "Santa Barbara City College",
                            "Santa Clara University": "Santa Clara University",
                            "Santa Monica College": "Santa Monica College",
                            "Santa Rosa Junior College": "Santa Rosa Junior College",
                            "Santiago Canyon College": "Santiago Canyon College",
                            "Saybrook Institute": "Saybrook Institute",
                            "School of Theology at Claremont": "School of Theology at Claremont",
                            "Scripps College": "Scripps College",
                            "Shasta Bible College": "Shasta Bible College",
                            "Shasta College": "Shasta College",
                            "Sierra College": "Sierra College",
                            "Simpson University": "Simpson University",
                            "Skyline College": "Skyline College",
                            "Soka University of America": "Soka University of America",
                            "Solano Community College": "Solano Community College",
                            "Sonoma State University": "Sonoma State University",
                            "Southern California College of Optometry": "Southern California College of Optometry",
                            "Southern California Institute of Architecture": "Southern California Institute of Architecture",
                            "Southern California Institute of Technology": "Southern California Institute of Technology",
                            "Southern California University of Health Sciences": "Southern California University of Health Sciences",
                            "Southwestern College": "Southwestern College",
                            "St Joseph's College": "St Joseph's College",
                            "Stanford University": "Stanford University",
                            "Starr King School for The Ministry": "Starr King School for The Ministry",
                            "Taft College": "Taft College",
                            "The Master's College": "The Master's College",
                            "Thomas Aquinas College": "Thomas Aquinas College",
                            "Trident University International": "Trident University International",
                            "United College of Business": "United College of Business",
                            "United States International University": "United States International University",
                            "University of California, Berkeley": "University of California, Berkeley",
                            "University of California, Davis": "University of California, Davis",
                            "University of California, Irvine": "University of California, Irvine",
                            "University of California, Los Angeles": "University of California, Los Angeles",
                            "University of California, Merced": "University of California, Merced",
                            "University of California, Riverside": "University of California, Riverside",
                            "University of California, San Diegio - Extension": "University of California, San Diegio - Extension",
                            "University of California, San Diego": "University of California, San Diego",
                            "University of California, San Francisco": "University of California, San Francisco",
                            "University of California, Santa Barbara": "University of California, Santa Barbara",
                            "University of California, Santa Cruz": "University of California, Santa Cruz",
                            "University of Laverne": "University of Laverne",
                            "University of Phoenix, San Diego Campus": "University of Phoenix, San Diego Campus",
                            "University of Redlands": "University of Redlands",
                            "University of San Diego": "University of San Diego",
                            "University of San Francisco": "University of San Francisco",
                            "University of Southern California": "University of Southern California",
                            "University of The Pacific": "University of The Pacific",
                            "University of The Pacific McGeorge School of Law": "University of The Pacific McGeorge School of Law",
                            "Vanguard University": "Vanguard University",
                            "Ventura College": "Ventura College",
                            "Victor Valley College": "Victor Valley College",
                            "Watterson College": "Watterson College",
                            "West Coast Christian College": "West Coast Christian College",
                            "West Coast University": "West Coast University",
                            "West Hills Community College": "West Hills Community College",
                            "West Los Angeles College": "West Los Angeles College",
                            "West Valley College": "West Valley College",
                            "Western Career College": "Western Career College",
                            "Western Career College Antioch": "Western Career College Antioch",
                            "Western State Univ College of Law of Orange County": "Western State Univ College of Law of Orange County",
                            "Western State University College of Law": "Western State University College of Law",
                            "Western University of Health Sciences": "Western University of Health Sciences",
                            "Westminster Theological Seminary in California": "Westminster Theological Seminary in California",
                            "Westmont College": "Westmont College",
                            "Whittier College": "Whittier College",
                            "William Jessup University": "William Jessup University",
                            "Woodbury University": "Woodbury University",
                            "Woodland Community College": "Woodland Community College",
                            "World College West": "World College West",
                            "Wright Institute": "Wright Institute",
                            "Yeshiva University Los Angeles": "Yeshiva University Los Angeles",
                            "Yuba College": "Yuba College",
                            "Other": "Other"
                        };
                        break;
                    case "Colorado":
                        newOpts = {
                            "": "",
                            "Adams State University": "Adams State University",
                            "Aims Community College": "Aims Community College",
                            "American College Paris": "American College Paris",
                            "Arapahoe Community College": "Arapahoe Community College",
                            "Art Institute of Colorado": "Art Institute of Colorado",
                            "Belleview College": "Belleview College",
                            "Bel-Rea Institute of Animal Technology": "Bel-Rea Institute of Animal Technology",
                            "Beth-El College of Nursing": "Beth-El College of Nursing",
                            "Blair Junior College": "Blair Junior College",
                            "Cherry Creek Bapt College": "Cherry Creek Bapt College",
                            "College for Financial Planning": "College for Financial Planning",
                            "Colorado Bible College": "Colorado Bible College",
                            "Colorado Christian University": "Colorado Christian University",
                            "Colorado College": "Colorado College",
                            "Colorado Mesa University": "Colorado Mesa University",
                            "Colorado Mesa University": "Colorado Mesa University",
                            "Colorado Mountain Coll System, Timberline Campus": "Colorado Mountain Coll System, Timberline Campus",
                            "Colorado Mountain College": "Colorado Mountain College",
                            "Colorado Mountain College System, Alpine Campus": "Colorado Mountain College System, Alpine Campus",
                            "Colorado Northwestern Community College": "Colorado Northwestern Community College",
                            "Colorado State University": "Colorado State University",
                            "Colorado State University Global Campus": "Colorado State University Global Campus",
                            "Colorado State University-Pueblo": "Colorado State University-Pueblo",
                            "Colorado Technical University": "Colorado Technical University",
                            "Colorado Women's College": "Colorado Women's College",
                            "Community College of Aurora": "Community College of Aurora",
                            "Community College of Denver": "Community College of Denver",
                            "Denver Baptist Bible College": "Denver Baptist Bible College",
                            "Denver Business College": "Denver Business College",
                            "Denver Conservative Baptist Seminary": "Denver Conservative Baptist Seminary",
                            "Denver Institute of Technology": "Denver Institute of Technology",
                            "Denver School of Nursing": "Denver School of Nursing",
                            "Denver Technical College": "Denver Technical College",
                            "Devry University": "Devry University",
                            "Electronic Technical Institute": "Electronic Technical Institute",
                            "Fort Lewis College": "Fort Lewis College",
                            "Front Range Community College": "Front Range Community College",
                            "Iliff School of Theology": "Iliff School of Theology",
                            "Johnson & Wales University": "Johnson & Wales University",
                            "Jones International University": "Jones International University",
                            "Lamar Community College": "Lamar Community College",
                            "Loretto Heights College": "Loretto Heights College",
                            "Metropolitan State College of Denver": "Metropolitan State College of Denver",
                            "Morgan Community College": "Morgan Community College",
                            "Naropa Institute": "Naropa Institute",
                            "National College, Colorado Springs": "National College, Colorado Springs",
                            "National College, Denver": "National College, Denver",
                            "National College, Pueblo": "National College, Pueblo",
                            "National Technological University": "National Technological University",
                            "Nazarene Bible College": "Nazarene Bible College",
                            "Northeastern Junior College": "Northeastern Junior College",
                            "Otero Junior College": "Otero Junior College",
                            "Parks Junior College": "Parks Junior College",
                            "Pikes Peak Community College": "Pikes Peak Community College",
                            "Pueblo Community College": "Pueblo Community College",
                            "Ravencrest Bible School": "Ravencrest Bible School",
                            "Red Rocks Community College": "Red Rocks Community College",
                            "Regis University": "Regis University",
                            "Rocky Mountain College of Art and Design": "Rocky Mountain College of Art and Design",
                            "St Thomas Seminary": "St Thomas Seminary",
                            "State of CO School of Mines-Conference Services": "State of CO School of Mines-Conference Services",
                            "Trinidad State Junior College": "Trinidad State Junior College",
                            "United States Air Force Academy": "United States Air Force Academy",
                            "University of Colorado at Boulder": "University of Colorado at Boulder",
                            "University of Colorado at Colorado Springs": "University of Colorado at Colorado Springs",
                            "University of Colorado at Denver": "University of Colorado at Denver",
                            "University of Colorado Health Sciences Center": "University of Colorado Health Sciences Center",
                            "University of Denver": "University of Denver",
                            "University of Northern Colorado": "University of Northern Colorado",
                            "Western Colorado Community College": "Western Colorado Community College",
                            "Western State College of Colorado": "Western State College of Colorado",
                            "Westwood College": "Westwood College",
                            "Other": "Other"
                        };
                        break;
                    case "Connecticut":
                        newOpts = {
                            "": "",
                            "Albertus Magnus College": "Albertus Magnus College",
                            "Artos Bible College": "Artos Bible College",
                            "Asnuntuck Community College": "Asnuntuck Community College",
                            "Berkeley Divinity School": "Berkeley Divinity School",
                            "Bridgeport Engineering Institute": "Bridgeport Engineering Institute",
                            "Capital Community - Technical College": "Capital Community - Technical College",
                            "Central Connecticut State University": "Central Connecticut State University",
                            "Charter Oak College": "Charter Oak College",
                            "Connecticut College": "Connecticut College",
                            "Eastern Connecticut State University": "Eastern Connecticut State University",
                            "Fairfield University": "Fairfield University",
                            "Gateway Community College": "Gateway Community College",
                            "Gateway Community College, Long Wharf Campus": "Gateway Community College, Long Wharf Campus",
                            "Hartford College for Women": "Hartford College for Women",
                            "Hartford Graduate Center": "Hartford Graduate Center",
                            "Hartford Seminary": "Hartford Seminary",
                            "Holy Apostles College": "Holy Apostles College",
                            "Housatonic Community College": "Housatonic Community College",
                            "Katherine Gibbs School": "Katherine Gibbs School",
                            "Lincoln College of New England": "Lincoln College of New England",
                            "Manchester Community College": "Manchester Community College",
                            "Mattatuck Community College": "Mattatuck Community College",
                            "Middlesex Community College": "Middlesex Community College",
                            "Mitchell College": "Mitchell College",
                            "Mohegan Community College": "Mohegan Community College",
                            "Morse School of Business": "Morse School of Business",
                            "Naugatuck Valley Community College": "Naugatuck Valley Community College",
                            "New Britain Hosp School of Nsg": "New Britain Hosp School of Nsg",
                            "Northwestern Connecticut Community College": "Northwestern Connecticut Community College",
                            "Norwalk Community College": "Norwalk Community College",
                            "Paier College of Art": "Paier College of Art",
                            "Post University": "Post University",
                            "Quinebaug Valley Community College": "Quinebaug Valley Community College",
                            "Quinnipiac University": "Quinnipiac University",
                            "Sacred Heart University": "Sacred Heart University",
                            "Saint Thomas Seminary": "Saint Thomas Seminary",
                            "South Central Community College": "South Central Community College",
                            "Southern Connecticut State University": "Southern Connecticut State University",
                            "St Alphonsus College": "St Alphonsus College",
                            "St Basils College": "St Basils College",
                            "Swiss Hospitality Institute 'Cesar Ritz'": "Swiss Hospitality Institute 'Cesar Ritz'",
                            "Thames Valley State Technical College": "Thames Valley State Technical College",
                            "Three Rivers Community Technical College": "Three Rivers Community Technical College",
                            "Trinity College": "Trinity College",
                            "Tunxis Community College": "Tunxis Community College",
                            "United States Coast Guard Academy": "United States Coast Guard Academy",
                            "University of Bridgeport": "University of Bridgeport",
                            "University of Connecticut": "University of Connecticut",
                            "University of Hartford": "University of Hartford",
                            "University of New Haven": "University of New Haven",
                            "University of Saint Joseph": "University of Saint Joseph",
                            "Waterbury State Technical College": "Waterbury State Technical College",
                            "Wesleyan University": "Wesleyan University",
                            "Western Connecticut State University": "Western Connecticut State University",
                            "Yale University": "Yale University",
                            "Other": "Other"
                        };
                        break;
                    case "District of Columbia (DC)":
                        newOpts = {
                            "": "",
                            "American University": "American University",
                            "Catholic University of America": "Catholic University of America",
                            "Corcoran School of Art": "Corcoran School of Art",
                            "Desales Hall School of Theology": "Desales Hall School of Theology",
                            "Dominican House of Studies": "Dominican House of Studies",
                            "Gallaudet University": "Gallaudet University",
                            "George Washington University": "George Washington University",
                            "Georgetown University": "Georgetown University",
                            "Howard University": "Howard University",
                            "International Baccalaureate": "International Baccalaureate",
                            "Marine Corps Institute": "Marine Corps Institute",
                            "Mount Vernon College": "Mount Vernon College",
                            "National Intelligence University": "National Intelligence University",
                            "Oblate College": "Oblate College",
                            "Southeastern University": "Southeastern University",
                            "Strayer University": "Strayer University",
                            "Trinity College": "Trinity College",
                            "United States Dept of Agriculture Graduate Sch": "United States Dept of Agriculture Graduate Sch",
                            "University of The District of Columbia": "University of The District of Columbia",
                            "Washington Musc Institute": "Washington Musc Institute",
                            "Wesley Theological Seminary": "Wesley Theological Seminary",
                            "Other": "Other"
                        };
                        break;
                    case "Delaware":
                        newOpts = {
                            "": "",
                            "Brandywine College of Widener University": "Brandywine College of Widener University",
                            "Delaware State University": "Delaware State University",
                            "Delaware Technical & CC, Southern Campus": "Delaware Technical & CC, Southern Campus",
                            "Delaware Technical & CC, Stanton-Wilmington Campus": "Delaware Technical & CC, Stanton-Wilmington Campus",
                            "Delaware Technical & CC, Terry Campus": "Delaware Technical & CC, Terry Campus",
                            "Goldey Beacom College": "Goldey Beacom College",
                            "Kent Christian College": "Kent Christian College",
                            "University of Delaware": "University of Delaware",
                            "Wesley College": "Wesley College",
                            "Wilmington College": "Wilmington College",
                            "Other": "Other"
                        };
                        break;
                    case "Florida":
                        newOpts = {
                            "": "",
                            "American Institute for Paralegal Studies": "American Institute for Paralegal Studies",
                            "Art Institute of Fort Lauderdale": "Art Institute of Fort Lauderdale",
                            "Ave Maria University": "Ave Maria University",
                            "Barry University": "Barry University",
                            "Bethune-Cookman University": "Bethune-Cookman University",
                            "Briarcliffe College": "Briarcliffe College",
                            "Broward Community College": "Broward Community College",
                            "Chipola Community College": "Chipola Community College",
                            "Clearwater Christian College": "Clearwater Christian College",
                            "College of Central Florida.": "College of Central Florida.",
                            "Daytona State College": "Daytona State College",
                            "Eastern Florida State College": "Eastern Florida State College",
                            "Eckerd College": "Eckerd College",
                            "Edward Waters College": "Edward Waters College",
                            "Embry Riddle Aeronautical University": "Embry Riddle Aeronautical University",
                            "Everglades University": "Everglades University",
                            "Flagler College": "Flagler College",
                            "Florida Agricultural and Mechanical University": "Florida Agricultural and Mechanical University",
                            "Florida Atlantic University": "Florida Atlantic University",
                            "Florida Beacon Bible College": "Florida Beacon Bible College",
                            "Florida Bible College": "Florida Bible College",
                            "Florida College": "Florida College",
                            "Florida Gateway College": "Florida Gateway College",
                            "Florida Gulf Coast University": "Florida Gulf Coast University",
                            "Florida Hospital College of Health Sciences": "Florida Hospital College of Health Sciences",
                            "Florida Institute of Technology": "Florida Institute of Technology",
                            "Florida International University": "Florida International University",
                            "Florida Keys Community College": "Florida Keys Community College",
                            "Florida Memorial College": "Florida Memorial College",
                            "Florida National College": "Florida National College",
                            "Florida Southern College": "Florida Southern College",
                            "Florida SouthWestern State College": "Florida SouthWestern State College",
                            "Florida State College at Jacksonville": "Florida State College at Jacksonville",
                            "Florida State University": "Florida State University",
                            "Fort Lauderdale College": "Fort Lauderdale College",
                            "Gulf Coast State College": "Gulf Coast State College",
                            "Hillsborough Community College": "Hillsborough Community College",
                            "Hobe Sound Bible College": "Hobe Sound Bible College",
                            "Indian River State College": "Indian River State College",
                            "International College": "International College",
                            "Jacksonville University": "Jacksonville University",
                            "Jones College": "Jones College",
                            "Keiser University": "Keiser University",
                            "Lake-Sumter Community College": "Lake-Sumter Community College",
                            "Landmark Baptist College": "Landmark Baptist College",
                            "Lincoln International Academy": "Lincoln International Academy",
                            "Lynn University": "Lynn University",
                            "Miami International University of Art & Design": "Miami International University of Art & Design",
                            "Miami-Dade College": "Miami-Dade College",
                            "National Education Ctr-Bauder Fashion Coll Campus": "National Education Ctr-Bauder Fashion Coll Campus",
                            "New College of University of South Florida": "New College of University of South Florida",
                            "North Florida Junior College": "North Florida Junior College",
                            "Northwest Florida State College": "Northwest Florida State College",
                            "Northwood University": "Northwood University",
                            "Nova Southeastern University": "Nova Southeastern University",
                            "Palm Beach Atlantic College": "Palm Beach Atlantic College",
                            "Palm Beach Community College": "Palm Beach Community College",
                            "Panama Canal College": "Panama Canal College",
                            "Pasco-Hernando Community College - East": "Pasco-Hernando Community College - East",
                            "Pasco-Hernando Community College - North": "Pasco-Hernando Community College - North",
                            "Pasco-Hernando Community College - West": "Pasco-Hernando Community College - West",
                            "Pensacola Christian College": "Pensacola Christian College",
                            "Pensacola State College": "Pensacola State College",
                            "Polk Community College": "Polk Community College",
                            "Ringling School of Art and Design": "Ringling School of Art and Design",
                            "Rollins College": "Rollins College",
                            "Santa Fe College": "Santa Fe College",
                            "Santa Rosa Christian College": "Santa Rosa Christian College",
                            "Schiller Intl Univ": "Schiller Intl Univ",
                            "Seminole Community College": "Seminole Community College",
                            "South Florida Community College": "South Florida Community College",
                            "Southeastern Academy": "Southeastern Academy",
                            "Southeastern University": "Southeastern University",
                            "Southern College": "Southern College",
                            "Spurgeon Baptist Bible College": "Spurgeon Baptist Bible College",
                            "St John Vianney College Seminary": "St John Vianney College Seminary",
                            "St John's River Community College": "St John's River Community College",
                            "St Leo University": "St Leo University",
                            "St Petersburg Junior College": "St Petersburg Junior College",
                            "St Thomas University": "St Thomas University",
                            "State College of Florida": "State College of Florida",
                            "Stetson University": "Stetson University",
                            "Tallahassee Community College": "Tallahassee Community College",
                            "Tampa College": "Tampa College",
                            "Union Institute": "Union Institute",
                            "United Electronics Institute": "United Electronics Institute",
                            "University of Central Florida": "University of Central Florida",
                            "University of Florida": "University of Florida",
                            "University of Miami": "University of Miami",
                            "University of North Florida": "University of North Florida",
                            "University of Sarasota": "University of Sarasota",
                            "University of South Florida": "University of South Florida",
                            "University of Tampa": "University of Tampa",
                            "University of West Florida": "University of West Florida",
                            "Valencia Community College": "Valencia Community College",
                            "Walden University": "Walden University",
                            "Warner Southern College": "Warner Southern College",
                            "Webber College": "Webber College",
                            "Webster College": "Webster College",
                            "Other": "Other"
                        };
                        break;
                    case "Georgia":
                        newOpts = {
                            "": "",
                            "Abraham Baldwin Agricultural College": "Abraham Baldwin Agricultural College",
                            "Agnes Scott College": "Agnes Scott College",
                            "Albany State College": "Albany State College",
                            "Altamaha Technical College": "Altamaha Technical College",
                            "American Intercontinental University": "American Intercontinental University",
                            "Andrew College": "Andrew College",
                            "Armstrong Atlantic State University": "Armstrong Atlantic State University",
                            "Art Institute of Atlanta": "Art Institute of Atlanta",
                            "Athens Technical College": "Athens Technical College",
                            "Atlanta Area Tech School": "Atlanta Area Tech School",
                            "Atlanta College of Art": "Atlanta College of Art",
                            "Atlanta Metropolitan College": "Atlanta Metropolitan College",
                            "Augusta College": "Augusta College",
                            "Augusta Technical Institute": "Augusta Technical Institute",
                            "Bainbridge Junior College": "Bainbridge Junior College",
                            "Baptist University America": "Baptist University America",
                            "Bauder Fashion College of Atlanta": "Bauder Fashion College of Atlanta",
                            "Berry College": "Berry College",
                            "Beulah Heights Bible College": "Beulah Heights Bible College",
                            "Brenau University": "Brenau University",
                            "Brewton-Parker College": "Brewton-Parker College",
                            "Brunswick College": "Brunswick College",
                            "Central Georgia Technical College": "Central Georgia Technical College",
                            "Chapel Hill College": "Chapel Hill College",
                            "Chattahoochee Technical Institute": "Chattahoochee Technical Institute",
                            "Clark Atlanta University": "Clark Atlanta University",
                            "Clayton College and State University": "Clayton College and State University",
                            "Clayton State College": "Clayton State College",
                            "College of Coastal Georgia": "College of Coastal Georgia",
                            "Columbus State University": "Columbus State University",
                            "Columbus Technical Institute": "Columbus Technical Institute",
                            "Covenant College": "Covenant College",
                            "Dalton State College": "Dalton State College",
                            "Darton College": "Darton College",
                            "De Kalb College - Central": "De Kalb College - Central",
                            "De Kalb College - North": "De Kalb College - North",
                            "De Kalb College - South": "De Kalb College - South",
                            "Dekalb College": "Dekalb College",
                            "Devry Institute of Technology GA": "Devry Institute of Technology GA",
                            "Devry University": "Devry University",
                            "Devry University": "Devry University",
                            "Draughons Junior College": "Draughons Junior College",
                            "Earl Paulk Kngdm Institute": "Earl Paulk Kngdm Institute",
                            "East Georgia College": "East Georgia College",
                            "Emmanuel College": "Emmanuel College",
                            "Emory University": "Emory University",
                            "Emory University Allied Health P": "Emory University Allied Health P",
                            "Fort Valley State College": "Fort Valley State College",
                            "Gainesville College": "Gainesville College",
                            "Georgia College and State University": "Georgia College and State University",
                            "Georgia Health Sciences University": "Georgia Health Sciences University",
                            "Georgia Highlands College": "Georgia Highlands College",
                            "Georgia Institute of Technology": "Georgia Institute of Technology",
                            "Georgia Military College": "Georgia Military College",
                            "Georgia Northwester Tech College": "Georgia Northwester Tech College",
                            "Georgia Perimeter College": "Georgia Perimeter College",
                            "Georgia Regents University": "Georgia Regents University",
                            "Georgia Southern University": "Georgia Southern University",
                            "Georgia Southwestern State University": "Georgia Southwestern State University",
                            "Georgia State University": "Georgia State University",
                            "Gordon State College": "Gordon State College",
                            "Gwinnett Area Tech S": "Gwinnett Area Tech S",
                            "Institute of Paper Science and Technology": "Institute of Paper Science and Technology",
                            "John Marshall University Law": "John Marshall University Law",
                            "Kennesaw State University": "Kennesaw State University",
                            "Kennesaw State University": "Kennesaw State University",
                            "Lagrange College": "Lagrange College",
                            "Lanier Technical College": "Lanier Technical College",
                            "Life University": "Life University",
                            "Mercer University": "Mercer University",
                            "Mercer University Atlanta": "Mercer University Atlanta",
                            "Mercer University Sthn S Phar": "Mercer University Sthn S Phar",
                            "Middle Georgia College": "Middle Georgia College",
                            "Middle Georgia State University": "Middle Georgia State University",
                            "Middle Georgia Technical College": "Middle Georgia Technical College",
                            "Morehouse College": "Morehouse College",
                            "Morris Brown College": "Morris Brown College",
                            "North Georgia Technical Institute": "North Georgia Technical Institute",
                            "Oglethorpe University": "Oglethorpe University",
                            "Oxford College of Emory University": "Oxford College of Emory University",
                            "Paine College": "Paine College",
                            "Piedmont College": "Piedmont College",
                            "Point University": "Point University",
                            "Reinhardt College": "Reinhardt College",
                            "Savannah College of Art and Design": "Savannah College of Art and Design",
                            "Savannah State University": "Savannah State University",
                            "Savannah Tech": "Savannah Tech",
                            "Shorter University": "Shorter University",
                            "South Georgia College": "South Georgia College",
                            "South Georgia Technical College": "South Georgia Technical College",
                            "South University": "South University",
                            "Southern Crescent Technical College": "Southern Crescent Technical College",
                            "Spelman College": "Spelman College",
                            "Swainsboro Area Vocational-Technical School": "Swainsboro Area Vocational-Technical School",
                            "Thomas College": "Thomas College",
                            "Toccoa Falls College": "Toccoa Falls College",
                            "Truett McConnell College": "Truett McConnell College",
                            "University of Georgia": "University of Georgia",
                            "University of Georgia Education Center": "University of Georgia Education Center",
                            "University of North Georgia": "University of North Georgia",
                            "University of West Georgia": "University of West Georgia",
                            "Valdosta State University": "Valdosta State University",
                            "Waycross College": "Waycross College",
                            "Wesleyan College": "Wesleyan College",
                            "Young Harris College": "Young Harris College",
                            "Other": "Other"
                        };
                        break;
                    case "Guam":
                        newOpts = {
                            "": "",
                            "Guam Community College": "Guam Community College",
                            "University of Guam": "University of Guam",
                            "Other": "Other"
                        };
                        break;
                    case "Hawaii":
                        newOpts = {
                            "": "",
                            "Argosy University": "Argosy University",
                            "Brigham Young University, Hawaii Campus": "Brigham Young University, Hawaii Campus",
                            "Chaminade University of Honolulu": "Chaminade University of Honolulu",
                            "Hawaii Loa College": "Hawaii Loa College",
                            "Hawaii Pacific University": "Hawaii Pacific University",
                            "Heald College": "Heald College",
                            "Honolulu Community College": "Honolulu Community College",
                            "International College & Graduate Schs of Theology": "International College & Graduate Schs of Theology",
                            "Kapiolani Community College": "Kapiolani Community College",
                            "Kauai Community College": "Kauai Community College",
                            "Leeward Community College": "Leeward Community College",
                            "Pacific and Asia Christian University": "Pacific and Asia Christian University",
                            "Tokai International College": "Tokai International College",
                            "Transpacific Hawaii College": "Transpacific Hawaii College",
                            "University of Hawaii - Maui College": "University of Hawaii - Maui College",
                            "University of Hawaii at Hilo": "University of Hawaii at Hilo",
                            "University of Hawaii at Manoa": "University of Hawaii at Manoa",
                            "University of Hawaii at West Oahu": "University of Hawaii at West Oahu",
                            "University of Hawaii, Hawaii Community College": "University of Hawaii, Hawaii Community College",
                            "Windward Community College": "Windward Community College",
                            "Other": "Other"
                        };
                        break;
                    case "Iowa":
                        newOpts = {
                            "": "",
                            "American Institute of Business": "American Institute of Business",
                            "American Institute of Commerce": "American Institute of Commerce",
                            "Ashford University": "Ashford University",
                            "Briar Cliff University": "Briar Cliff University",
                            "Buena Vista University": "Buena Vista University",
                            "Central College": "Central College",
                            "Clarke University": "Clarke University",
                            "Clinton Community College": "Clinton Community College",
                            "Coe College": "Coe College",
                            "Cornell College": "Cornell College",
                            "Des Moines Area Community College": "Des Moines Area Community College",
                            "Des Moines Area Community College": "Des Moines Area Community College",
                            "Divine Word College": "Divine Word College",
                            "Dordt College": "Dordt College",
                            "Drake University": "Drake University",
                            "Eastern Iowa Community College District": "Eastern Iowa Community College District",
                            "Ellsworth Community College Iowa Valley": "Ellsworth Community College Iowa Valley",
                            "Emmaus Bible College": "Emmaus Bible College",
                            "Faith Baptist Bible College": "Faith Baptist Bible College",
                            "Graceland University": "Graceland University",
                            "Grand View University": "Grand View University",
                            "Grinnell College": "Grinnell College",
                            "Hamilton College Des Moines": "Hamilton College Des Moines",
                            "Hawkeye Community College": "Hawkeye Community College",
                            "Indian Hills CC - Centerville Campus": "Indian Hills CC - Centerville Campus",
                            "Indian Hills Community College - Ottumwa Campus": "Indian Hills Community College - Ottumwa Campus",
                            "Iowa Central CC - Webster City Center": "Iowa Central CC - Webster City Center",
                            "Iowa Central Community College": "Iowa Central Community College",
                            "Iowa Central Community College - Fort Dodge Center": "Iowa Central Community College - Fort Dodge Center",
                            "Iowa Lakes CC - North Attendance Center": "Iowa Lakes CC - North Attendance Center",
                            "Iowa Lakes CC - South Attendance Center": "Iowa Lakes CC - South Attendance Center",
                            "Iowa State University of Science and Technology": "Iowa State University of Science and Technology",
                            "Iowa Wesleyan University": "Iowa Wesleyan University",
                            "Iowa Western CC - Council Bluffs Center": "Iowa Western CC - Council Bluffs Center",
                            "Iowa Western Community College - Clarinda Center": "Iowa Western Community College - Clarinda Center",
                            "Kaplan University": "Kaplan University",
                            "Kirkwood Community College": "Kirkwood Community College",
                            "Loras College": "Loras College",
                            "Luther College": "Luther College",
                            "Maharishi University of Management": "Maharishi University of Management",
                            "Marshalltown Community College - Iowa Valley": "Marshalltown Community College - Iowa Valley",
                            "Marycrest College": "Marycrest College",
                            "Mercy College of Health Sciences": "Mercy College of Health Sciences",
                            "Morningside College": "Morningside College",
                            "MT Mercy University": "MT Mercy University",
                            "Muscatine Community College": "Muscatine Community College",
                            "North Iowa Area Community College": "North Iowa Area Community College",
                            "Northeast Iowa Community College, Calmar-Peosta": "Northeast Iowa Community College, Calmar-Peosta",
                            "Northeast Iowa Technical Institute - North Center": "Northeast Iowa Technical Institute - North Center",
                            "Northwest Iowa Community College": "Northwest Iowa Community College",
                            "Northwest Iowa Technical College": "Northwest Iowa Technical College",
                            "Northwestern College": "Northwestern College",
                            "Palmer College of Chiropractic": "Palmer College of Chiropractic",
                            "Parsons College": "Parsons College",
                            "Scott Community College": "Scott Community College",
                            "Simpson College": "Simpson College",
                            "Sioux Empire College": "Sioux Empire College",
                            "Southeastern Community College - North Campus": "Southeastern Community College - North Campus",
                            "Southeastern Community College - South Campus": "Southeastern Community College - South Campus",
                            "Southeastern Community College South": "Southeastern Community College South",
                            "Southwestern Community College - Creston": "Southwestern Community College - Creston",
                            "St Ambrose University": "St Ambrose University",
                            "Univ of Osteopathic Medicine & Health Sciences": "Univ of Osteopathic Medicine & Health Sciences",
                            "University of Dubuque": "University of Dubuque",
                            "University of Iowa": "University of Iowa",
                            "University of Northern Iowa": "University of Northern Iowa",
                            "Upper Iowa Universty": "Upper Iowa Universty",
                            "Vennard College": "Vennard College",
                            "Waldorf College": "Waldorf College",
                            "Wartburg College": "Wartburg College",
                            "Western Iowa Tech Community College": "Western Iowa Tech Community College",
                            "Westmar University": "Westmar University",
                            "William Penn University": "William Penn University",
                            "Other": "Other"
                        };
                        break;
                    case "Idaho":
                        newOpts = {
                            "": "",
                            "Boise State University": "Boise State University",
                            "Brigham Young University, Idaho": "Brigham Young University, Idaho",
                            "College of Idaho": "College of Idaho",
                            "College of Southern Idaho": "College of Southern Idaho",
                            "College of St Gertrude": "College of St Gertrude",
                            "College of Western Idaho": "College of Western Idaho",
                            "Eastern Idaho Technical College": "Eastern Idaho Technical College",
                            "Idaho State University": "Idaho State University",
                            "Lewis-Clark State College": "Lewis-Clark State College",
                            "Links School of Business": "Links School of Business",
                            "North Idaho College": "North Idaho College",
                            "Northwest Nazarene University": "Northwest Nazarene University",
                            "University of Idaho": "University of Idaho",
                            "University of Idaho  GENERIC": "University of Idaho  GENERIC",
                            "Valley Business College": "Valley Business College",
                            "Other": "Other"
                        };
                        break;
                    case "Illinois":
                        newOpts = {
                            "": "",
                            "American Academy of Art": "American Academy of Art",
                            "American Conservatory of Music": "American Conservatory of Music",
                            "American Intercontinental University": "American Intercontinental University",
                            "American Islamic College": "American Islamic College",
                            "Augustana College Illinois": "Augustana College Illinois",
                            "Aurora University": "Aurora University",
                            "Barat College": "Barat College",
                            "Benedictine University": "Benedictine University",
                            "Black Hawk College - East Campus": "Black Hawk College - East Campus",
                            "Black Hawk College - Quad Cities Campus": "Black Hawk College - Quad Cities Campus",
                            "Blackburn College": "Blackburn College",
                            "Bloomington-Normal": "Bloomington-Normal",
                            "Bradley University": "Bradley University",
                            "Carl Sandburg College": "Carl Sandburg College",
                            "Central YMCA Community College": "Central YMCA Community College",
                            "Chicago College of Commerce": "Chicago College of Commerce",
                            "Chicago School of Professional Psychology": "Chicago School of Professional Psychology",
                            "Chicago State University": "Chicago State University",
                            "Chicago Theological Seminary": "Chicago Theological Seminary",
                            "City Colleges of Chicago": "City Colleges of Chicago",
                            "City Colls of Chicago, Chicago City Wide Coll": "City Colls of Chicago, Chicago City Wide Coll",
                            "College of Dupage": "College of Dupage",
                            "College of Lake County": "College of Lake County",
                            "College of St Francis": "College of St Francis",
                            "Columbia College": "Columbia College",
                            "Concordia College": "Concordia College",
                            "Danville Area Community College": "Danville Area Community College",
                            "Depaul University": "Depaul University",
                            "Devry Institute of Technology": "Devry Institute of Technology",
                            "Devry Institute of Technology": "Devry Institute of Technology",
                            "Devry Institute of Technology AZ": "Devry Institute of Technology AZ",
                            "Devry Institute of Technology Can": "Devry Institute of Technology Can",
                            "Devry Institute of Technology MO": "Devry Institute of Technology MO",
                            "Devry University": "Devry University",
                            "Devry University": "Devry University",
                            "Devry University": "Devry University",
                            "Dominican University": "Dominican University",
                            "Eastern Illinois University": "Eastern Illinois University",
                            "Elgin Community College": "Elgin Community College",
                            "Ellis University": "Ellis University",
                            "Elmhurst College": "Elmhurst College",
                            "Eureka College": "Eureka College",
                            "Frontier Community College": "Frontier Community College",
                            "Governors State University": "Governors State University",
                            "Greenville College": "Greenville College",
                            "Harold Washington College Chicago": "Harold Washington College Chicago",
                            "Harper College": "Harper College",
                            "Harper College": "Harper College",
                            "Harry S Truman College": "Harry S Truman College",
                            "Heartland Community College": "Heartland Community College",
                            "Highland Community College": "Highland Community College",
                            "Illinois Central College": "Illinois Central College",
                            "Illinois College": "Illinois College",
                            "Illinois College of Optometry": "Illinois College of Optometry",
                            "Illinois Institute of Art-Chicago": "Illinois Institute of Art-Chicago",
                            "Illinois Institute of Technology": "Illinois Institute of Technology",
                            "Illinois State University": "Illinois State University",
                            "Illinois Valley Community College": "Illinois Valley Community College",
                            "Illinois Wesleyan University": "Illinois Wesleyan University",
                            "John A Logan College": "John A Logan College",
                            "John Wood Community College": "John Wood Community College",
                            "Joliet Junior College": "Joliet Junior College",
                            "Judson Univeristy": "Judson Univeristy",
                            "Kankakee Community College": "Kankakee Community College",
                            "Kaplan University": "Kaplan University",
                            "Kaskaskia College": "Kaskaskia College",
                            "Kendall College": "Kendall College",
                            "Kennedy-King College": "Kennedy-King College",
                            "Kishwaukee College": "Kishwaukee College",
                            "Knox College": "Knox College",
                            "Lake Forest College": "Lake Forest College",
                            "Lake Land College": "Lake Land College",
                            "Lewis and Clark Community College": "Lewis and Clark Community College",
                            "Lewis University": "Lewis University",
                            "Lexington Institute Hosp Crs": "Lexington Institute Hosp Crs",
                            "Lincoln Christian University": "Lincoln Christian University",
                            "Lincoln College": "Lincoln College",
                            "Lincoln Land Community College": "Lincoln Land Community College",
                            "Loyola University of Chicago": "Loyola University of Chicago",
                            "Maccormac Junior College": "Maccormac Junior College",
                            "Macmurray College": "Macmurray College",
                            "Malcolm X College - City Colleges of Chicago": "Malcolm X College - City Colleges of Chicago",
                            "Mallinckrodt College of The North Shore": "Mallinckrodt College of The North Shore",
                            "Maryknoll College": "Maryknoll College",
                            "McCormick Theological Seminary": "McCormick Theological Seminary",
                            "McHenry County College": "McHenry County College",
                            "McKendree College": "McKendree College",
                            "Midstate College": "Midstate College",
                            "Midwest College of Engineering": "Midwest College of Engineering",
                            "Millikin University": "Millikin University",
                            "Monmouth College": "Monmouth College",
                            "Montay College": "Montay College",
                            "Moody Bible Institute": "Moody Bible Institute",
                            "Moraine Valley Community College": "Moraine Valley Community College",
                            "Morrison Institute of Technology": "Morrison Institute of Technology",
                            "Morton College": "Morton College",
                            "Mundelein College": "Mundelein College",
                            "National College of Chiropratic": "National College of Chiropratic",
                            "National College of Education, Chicago": "National College of Education, Chicago",
                            "National-Louis University": "National-Louis University",
                            "Niles College Loyola University": "Niles College Loyola University",
                            "North Central College": "North Central College",
                            "North Park University": "North Park University",
                            "Northeastern Illinois University": "Northeastern Illinois University",
                            "Northern Illinois University": "Northern Illinois University",
                            "Northwestern University": "Northwestern University",
                            "Oakton Community College": "Oakton Community College",
                            "Olive-Harvey College": "Olive-Harvey College",
                            "Olivet Nazarene University": "Olivet Nazarene University",
                            "Olney Central College": "Olney Central College",
                            "Our Lady Ang Fran SM": "Our Lady Ang Fran SM",
                            "Parkland College": "Parkland College",
                            "Parks College of St Louis University": "Parks College of St Louis University",
                            "Prairie State College": "Prairie State College",
                            "Principia College": "Principia College",
                            "Quincy Univeristy": "Quincy Univeristy",
                            "Rend Lake College": "Rend Lake College",
                            "Richard J Daley College": "Richard J Daley College",
                            "Richland Community College": "Richland Community College",
                            "Robert Morris University": "Robert Morris University",
                            "Rock Valley College": "Rock Valley College",
                            "Rockford College": "Rockford College",
                            "Roosevelt University": "Roosevelt University",
                            "Rosary College": "Rosary College",
                            "Rush University": "Rush University",
                            "Sauk Valley Community College": "Sauk Valley Community College",
                            "School of The Art Institute of Chicago": "School of The Art Institute of Chicago",
                            "Shawnee Community College": "Shawnee Community College",
                            "Sherwood Conservatory of Music": "Sherwood Conservatory of Music",
                            "Shimer College": "Shimer College",
                            "South Suburban College": "South Suburban College",
                            "Southeastern Illinois College": "Southeastern Illinois College",
                            "Southern Illinois University - Carbondale": "Southern Illinois University - Carbondale",
                            "Southern Illinois University - Edwardsville": "Southern Illinois University - Edwardsville",
                            "Southwestern Illinois College": "Southwestern Illinois College",
                            "Spertus College of Judaica": "Spertus College of Judaica",
                            "Spoon River College": "Spoon River College",
                            "Springfield College in Illinois": "Springfield College in Illinois",
                            "St Augustine College": "St Augustine College",
                            "St Xavier University": "St Xavier University",
                            "State Community College": "State Community College",
                            "Trinity Christian College": "Trinity Christian College",
                            "Trinity Evangelical Divinity School": "Trinity Evangelical Divinity School",
                            "Trinity International University": "Trinity International University",
                            "Triton College": "Triton College",
                            "Truman College": "Truman College",
                            "Univ of Health Sciences / The Chicago Medical Sch": "Univ of Health Sciences / The Chicago Medical Sch",
                            "University of Chicago": "University of Chicago",
                            "University of Illinois at Chicago": "University of Illinois at Chicago",
                            "University of Illinois at Springfield": "University of Illinois at Springfield",
                            "University of Illinois at Urbana-Champaign": "University of Illinois at Urbana-Champaign",
                            "University of St Francis": "University of St Francis",
                            "Vandercook College of Music": "Vandercook College of Music",
                            "Wabash Valley College": "Wabash Valley College",
                            "Waubonsee Community College": "Waubonsee Community College",
                            "West Suburban College of Nursing": "West Suburban College of Nursing",
                            "Western Illinois University": "Western Illinois University",
                            "Wheaton College": "Wheaton College",
                            "Wilbur Wright College": "Wilbur Wright College",
                            "William Rainey Harper College": "William Rainey Harper College",
                            "Other": "Other"
                        };
                        break;
                    case "Indiana":
                        newOpts = {
                            "": "",
                            "American College of Education": "American College of Education",
                            "Ancilla College": "Ancilla College",
                            "Anderson University": "Anderson University",
                            "Ball State University": "Ball State University",
                            "Bethel College": "Bethel College",
                            "Butler University": "Butler University",
                            "Calumet College of St Joseph": "Calumet College of St Joseph",
                            "Concordia Theological Seminary": "Concordia Theological Seminary",
                            "Depauw University": "Depauw University",
                            "Earlham College": "Earlham College",
                            "Franklin College": "Franklin College",
                            "Goshen Biblical Seminary": "Goshen Biblical Seminary",
                            "Goshen College": "Goshen College",
                            "Grace College": "Grace College",
                            "Hanover College": "Hanover College",
                            "Herron School of Art": "Herron School of Art",
                            "Holy Cross College": "Holy Cross College",
                            "Huntington College": "Huntington College",
                            "Indiana Institute of Technology": "Indiana Institute of Technology",
                            "Indiana State University": "Indiana State University",
                            "Indiana Tech Community College": "Indiana Tech Community College",
                            "Indiana University": "Indiana University",
                            "Indiana University-East": "Indiana University-East",
                            "Indiana University-Kokomo": "Indiana University-Kokomo",
                            "Indiana University-Northwest": "Indiana University-Northwest",
                            "Indiana University-Purdue University at Fort Wayne": "Indiana University-Purdue University at Fort Wayne",
                            "Indiana University-South Bend": "Indiana University-South Bend",
                            "Indiana University-Southeast": "Indiana University-Southeast",
                            "Indiana Univ-Purdue Univ at Indianapolis": "Indiana Univ-Purdue Univ at Indianapolis",
                            "Indiana Vocational Technical College, Columbus": "Indiana Vocational Technical College, Columbus",
                            "Indiana Vocational Technical College, Evansville": "Indiana Vocational Technical College, Evansville",
                            "Indiana Vocational Technical College, Fort Wayne": "Indiana Vocational Technical College, Fort Wayne",
                            "Indiana Vocational Technical College, Gary": "Indiana Vocational Technical College, Gary",
                            "Indiana Vocational Technical College, Indianapolis": "Indiana Vocational Technical College, Indianapolis",
                            "Indiana Vocational Technical College, Richmond": "Indiana Vocational Technical College, Richmond",
                            "Indiana Vocational Technical College, South Bend": "Indiana Vocational Technical College, South Bend",
                            "Indiana Vocational Technical College, Terre Haute": "Indiana Vocational Technical College, Terre Haute",
                            "Indiana Vocational Technical College-South Central": "Indiana Vocational Technical College-South Central",
                            "Indiana Vocational Technical College-Southeast": "Indiana Vocational Technical College-Southeast",
                            "Indiana Wesleyan University": "Indiana Wesleyan University",
                            "International Business College": "International Business College",
                            "Interstate Technical Institute": "Interstate Technical Institute",
                            "IPFW": "IPFW",
                            "ITT Business Institute": "ITT Business Institute",
                            "ITT Technical and Business Institute": "ITT Technical and Business Institute",
                            "ITT Technical Institute": "ITT Technical Institute",
                            "Ivy Tech Community College": "Ivy Tech Community College",
                            "Ivy Tech Community College of Indiana": "Ivy Tech Community College of Indiana",
                            "Ivy Tech State College": "Ivy Tech State College",
                            "Ivy Tech State College": "Ivy Tech State College",
                            "Manchester College": "Manchester College",
                            "Marian College": "Marian College",
                            "Michiana College": "Michiana College",
                            "Oakland City College": "Oakland City College",
                            "Oakland City College Bedford": "Oakland City College Bedford",
                            "Purdue University": "Purdue University",
                            "Purdue University Hammond": "Purdue University Hammond",
                            "Purdue University Westvlle": "Purdue University Westvlle",
                            "Rose-Hulman Institute of Technology": "Rose-Hulman Institute of Technology",
                            "St Francis College": "St Francis College",
                            "St Josephs College": "St Josephs College",
                            "St Mary-of-The-Woods College": "St Mary-of-The-Woods College",
                            "St Marys College Indiana": "St Marys College Indiana",
                            "St Meinrad College": "St Meinrad College",
                            "Summit Christian College": "Summit Christian College",
                            "Taylor University": "Taylor University",
                            "Tri-State University": "Tri-State University",
                            "University of Evansville": "University of Evansville",
                            "University of Indianapolis": "University of Indianapolis",
                            "University of Notre Dame": "University of Notre Dame",
                            "University of Southern Indiana": "University of Southern Indiana",
                            "Valparaiso Tech Institute": "Valparaiso Tech Institute",
                            "Valparaiso University": "Valparaiso University",
                            "Vincennes University": "Vincennes University",
                            "Vincennes University": "Vincennes University",
                            "Wabash College": "Wabash College",
                            "Other": "Other"
                        };
                        break;
                    case "Kansas":
                        newOpts = {
                            "": "",
                            "Allen County Community College": "Allen County Community College",
                            "Baker University": "Baker University",
                            "Barton County Community College": "Barton County Community College",
                            "Benedictine College": "Benedictine College",
                            "Bethany College": "Bethany College",
                            "Bethel College Kansas": "Bethel College Kansas",
                            "Brown Mackie College": "Brown Mackie College",
                            "Butler Community College": "Butler Community College",
                            "Central Christian College": "Central Christian College",
                            "Cloud County Community College": "Cloud County Community College",
                            "Coffeyville Community College": "Coffeyville Community College",
                            "Colby Community College": "Colby Community College",
                            "Cowley County CC & Vocational-Technical School": "Cowley County CC & Vocational-Technical School",
                            "Dodge City Community College": "Dodge City Community College",
                            "Donnelly College": "Donnelly College",
                            "Emporia State University": "Emporia State University",
                            "Fort Hays State University": "Fort Hays State University",
                            "Fort Scott Community College": "Fort Scott Community College",
                            "Friends Bible College": "Friends Bible College",
                            "Friends University": "Friends University",
                            "Garden City Community College": "Garden City Community College",
                            "Haskell Indian Nations University": "Haskell Indian Nations University",
                            "Hesston College": "Hesston College",
                            "Highland Community College": "Highland Community College",
                            "Hutchinson Community College": "Hutchinson Community College",
                            "Independence Community College": "Independence Community College",
                            "Johnson County Community College": "Johnson County Community College",
                            "Kansas City Kansas Community College": "Kansas City Kansas Community College",
                            "Kansas College of Technology": "Kansas College of Technology",
                            "Kansas Newman College": "Kansas Newman College",
                            "Kansas State Univ at Salina College of Technology": "Kansas State Univ at Salina College of Technology",
                            "Kansas State University": "Kansas State University",
                            "Kansas Wesleyan University": "Kansas Wesleyan University",
                            "Labette Community College": "Labette Community College",
                            "Manhattan Area Techical College": "Manhattan Area Techical College",
                            "Manhattan Christian College": "Manhattan Christian College",
                            "Marymount College of Kansas": "Marymount College of Kansas",
                            "McPherson College": "McPherson College",
                            "Mid-America Nazarene College": "Mid-America Nazarene College",
                            "Neosho County Community College": "Neosho County Community College",
                            "Ottawa University": "Ottawa University",
                            "Pittsburg State University": "Pittsburg State University",
                            "Pratt Community College": "Pratt Community College",
                            "Saint Mary of The Plains College": "Saint Mary of The Plains College",
                            "Seward County Community College": "Seward County Community College",
                            "Southwestern College": "Southwestern College",
                            "St Johns College": "St Johns College",
                            "St Marys College St Mary": "St Marys College St Mary",
                            "Sterling College Kansas": "Sterling College Kansas",
                            "Tabor College": "Tabor College",
                            "University of Kansas": "University of Kansas",
                            "University of Saint Mary": "University of Saint Mary",
                            "US Army Command and General Staff College": "US Army Command and General Staff College",
                            "Washburn Institute of Technology": "Washburn Institute of Technology",
                            "Way College Emporia": "Way College Emporia",
                            "Wichita State University": "Wichita State University",
                            "Other": "Other"
                        };
                        break;
                    case "Kentucky":
                        newOpts = {
                            "": "",
                            "Alice Lloyd College": "Alice Lloyd College",
                            "Asbury College": "Asbury College",
                            "Ashland Community College": "Ashland Community College",
                            "Bellarmine College": "Bellarmine College",
                            "Berea College": "Berea College",
                            "Big Sandy Community & Technical College": "Big Sandy Community & Technical College",
                            "Bluegrass Community & Technical College": "Bluegrass Community & Technical College",
                            "Brescia University": "Brescia University",
                            "Campbellsville College": "Campbellsville College",
                            "Centre College": "Centre College",
                            "Cumberland College": "Cumberland College",
                            "Eastern Kentucky University": "Eastern Kentucky University",
                            "Elizabethtown Community College": "Elizabethtown Community College",
                            "Georgetown College": "Georgetown College",
                            "Henderson Community College": "Henderson Community College",
                            "Hopkinsville Community College": "Hopkinsville Community College",
                            "Jefferson Community College": "Jefferson Community College",
                            "Kentucky Christian College": "Kentucky Christian College",
                            "Kentucky Mountain Bible Institute": "Kentucky Mountain Bible Institute",
                            "Kentucky State University": "Kentucky State University",
                            "Kentucky Wesleyan College": "Kentucky Wesleyan College",
                            "Lees College": "Lees College",
                            "Lexington Community College": "Lexington Community College",
                            "Lindsey Wilson College": "Lindsey Wilson College",
                            "Madisonville Community College": "Madisonville Community College",
                            "Maysville Community College": "Maysville Community College",
                            "Midway College": "Midway College",
                            "Morehead State University": "Morehead State University",
                            "Murray State University": "Murray State University",
                            "Northern Kentucky University": "Northern Kentucky University",
                            "Owensboro Community & Technical College": "Owensboro Community & Technical College",
                            "Pikeville College": "Pikeville College",
                            "Somerset Community College": "Somerset Community College",
                            "Southeast Community College": "Southeast Community College",
                            "Southern Baptist Theological Seminary": "Southern Baptist Theological Seminary",
                            "Spalding University": "Spalding University",
                            "St Catharine College": "St Catharine College",
                            "Sue Bennett College": "Sue Bennett College",
                            "Sullivan University": "Sullivan University",
                            "Sullivan University-Lexington": "Sullivan University-Lexington",
                            "Thomas More College": "Thomas More College",
                            "Transylvania University": "Transylvania University",
                            "Union College": "Union College",
                            "University of Kentucky Fort Knox Center College": "University of Kentucky Fort Knox Center College",
                            "University of Kentucky/Ashland Community College": "University of Kentucky/Ashland Community College",
                            "University of Kentucky-Vet Diag Lab": "University of Kentucky-Vet Diag Lab",
                            "University of Louisville": "University of Louisville",
                            "Watterson College": "Watterson College",
                            "West Kentucky Community & Technical College": "West Kentucky Community & Technical College",
                            "Western Kentucky University": "Western Kentucky University",
                            "Other": "Other"
                        };
                        break;
                    case "Louisiana":
                        newOpts = {
                            "": "",
                            "Baton Rouge Community College": "Baton Rouge Community College",
                            "Bossier Parish Community College": "Bossier Parish Community College",
                            "Centenary College": "Centenary College",
                            "Delgado Community College": "Delgado Community College",
                            "Dillard University": "Dillard University",
                            "Faith Bible College": "Faith Bible College",
                            "Grambling State University": "Grambling State University",
                            "Jimmy Swaggart Bible College and Seminary": "Jimmy Swaggart Bible College and Seminary",
                            "La Salle University": "La Salle University",
                            "Louisiana College": "Louisiana College",
                            "Louisiana State Univ & Agric. & Mechanical Coll": "Louisiana State Univ & Agric. & Mechanical Coll",
                            "Louisiana State University at Alexandria": "Louisiana State University at Alexandria",
                            "Louisiana State University at Eunice": "Louisiana State University at Eunice",
                            "Louisiana State University at Shreveport": "Louisiana State University at Shreveport",
                            "Louisiana State University Medical Center": "Louisiana State University Medical Center",
                            "Louisiana Tech University": "Louisiana Tech University",
                            "Loyola University": "Loyola University",
                            "McNeese State University": "McNeese State University",
                            "New Orleans Baptist Theological Seminary": "New Orleans Baptist Theological Seminary",
                            "Nicholls State University": "Nicholls State University",
                            "Northwestern State University of Louisiana": "Northwestern State University of Louisiana",
                            "Notre Dame Seminary": "Notre Dame Seminary",
                            "Our Lady of Holy Cross College": "Our Lady of Holy Cross College",
                            "Southeastern Louisiana University": "Southeastern Louisiana University",
                            "Southern Univ & Agricultural & Mechanical College": "Southern Univ & Agricultural & Mechanical College",
                            "Southern University": "Southern University",
                            "Sowela Technical Community College": "Sowela Technical Community College",
                            "St Joseph Seminary College": "St Joseph Seminary College",
                            "St Marys Dominican College": "St Marys Dominican College",
                            "The University of Louisiana at Monroe": "The University of Louisiana at Monroe",
                            "Tulane University": "Tulane University",
                            "University of Louisiana at Lafayette": "University of Louisiana at Lafayette",
                            "University of Louisiana at Monroe": "University of Louisiana at Monroe",
                            "University of New Orleans": "University of New Orleans",
                            "Xavier University": "Xavier University",
                            "Other": "Other"
                        };
                        break;
                    case "Massachusetts":
                        newOpts = {
                            "": "",
                            "American International College": "American International College",
                            "Amherst College": "Amherst College",
                            "Anna Maria College M & W": "Anna Maria College M & W",
                            "Aquinas Junior College, Milton": "Aquinas Junior College, Milton",
                            "Aquinas Junior College, Newton": "Aquinas Junior College, Newton",
                            "Art Institute of Boston": "Art Institute of Boston",
                            "Assumption College": "Assumption College",
                            "Atlantic Union College": "Atlantic Union College",
                            "Babson College": "Babson College",
                            "Bay Path Junior College": "Bay Path Junior College",
                            "Bay State Junior College": "Bay State Junior College",
                            "Becker College, Leicester": "Becker College, Leicester",
                            "Becker College, Worcester": "Becker College, Worcester",
                            "Bentley College": "Bentley College",
                            "Berklee College of Music": "Berklee College of Music",
                            "Berkshire Christian College": "Berkshire Christian College",
                            "Berkshire Community College": "Berkshire Community College",
                            "Boston Architectural Center": "Boston Architectural Center",
                            "Boston College": "Boston College",
                            "Boston University": "Boston University",
                            "Bradford College": "Bradford College",
                            "Brandeis University": "Brandeis University",
                            "Bridgewater State University": "Bridgewater State University",
                            "Bristol Community College": "Bristol Community College",
                            "Bunker Hill Community College": "Bunker Hill Community College",
                            "Burdett School": "Burdett School",
                            "Cambridge College": "Cambridge College",
                            "Cape Cod Community College": "Cape Cod Community College",
                            "Cardinal Cushing College": "Cardinal Cushing College",
                            "Central New England College of Technology": "Central New England College of Technology",
                            "Chamberlayne Junior College": "Chamberlayne Junior College",
                            "Clark University": "Clark University",
                            "College of The Holy Cross": "College of The Holy Cross",
                            "Curry College": "Curry College",
                            "Dean Junior College": "Dean Junior College",
                            "East Coast Aero Technical School": "East Coast Aero Technical School",
                            "Eastern Nazarene College": "Eastern Nazarene College",
                            "Elms College": "Elms College",
                            "Emerson College": "Emerson College",
                            "Emmanuel College": "Emmanuel College",
                            "Endicott College": "Endicott College",
                            "Essex Agriculture and Technical Institute": "Essex Agriculture and Technical Institute",
                            "Fanning School Health Tec": "Fanning School Health Tec",
                            "Fisher Junior College": "Fisher Junior College",
                            "Fitchburg State College": "Fitchburg State College",
                            "Forsyth School of Dental Hygiene": "Forsyth School of Dental Hygiene",
                            "Framingham State College": "Framingham State College",
                            "Franklin Institute of Boston": "Franklin Institute of Boston",
                            "Gordon College": "Gordon College",
                            "Gordon-Conwell Theological Seminary": "Gordon-Conwell Theological Seminary",
                            "Greenfield Community College": "Greenfield Community College",
                            "Hampshire College": "Hampshire College",
                            "Harvard University": "Harvard University",
                            "Hebrew College": "Hebrew College",
                            "Hellenic College": "Hellenic College",
                            "Holyoke Community College": "Holyoke Community College",
                            "Katharine Gibbs School Boston": "Katharine Gibbs School Boston",
                            "Laboure Junior College": "Laboure Junior College",
                            "Lasell Junior College": "Lasell Junior College",
                            "Lesley University": "Lesley University",
                            "Marian Court Junior College of Business": "Marian Court Junior College of Business",
                            "Massachusetts Bay Community College": "Massachusetts Bay Community College",
                            "Massachusetts College of Art": "Massachusetts College of Art",
                            "Massachusetts College of Liberal Arts": "Massachusetts College of Liberal Arts",
                            "Massachusetts College of Pharmacy": "Massachusetts College of Pharmacy",
                            "Massachusetts Institute of Technology": "Massachusetts Institute of Technology",
                            "Massachusetts Maritime Academy": "Massachusetts Maritime Academy",
                            "Massasoit Community College": "Massasoit Community College",
                            "Merrimack College": "Merrimack College",
                            "Middlesex Community College": "Middlesex Community College",
                            "Montserrat College of Art": "Montserrat College of Art",
                            "Mount Holyoke College": "Mount Holyoke College",
                            "Mount Ida College": "Mount Ida College",
                            "MT Wachusett Community College": "MT Wachusett Community College",
                            "New England College of Optometry": "New England College of Optometry",
                            "New England Conservatory of Music": "New England Conservatory of Music",
                            "New England Institute of Applied Arts and Sciences": "New England Institute of Applied Arts and Sciences",
                            "New England School of Art/Design": "New England School of Art/Design",
                            "Newbury College": "Newbury College",
                            "Newbury Junior College-Boston": "Newbury Junior College-Boston",
                            "Newton Junior College": "Newton Junior College",
                            "Nichols College": "Nichols College",
                            "North Shore Community College": "North Shore Community College",
                            "Northeast Institute Industrial Tech": "Northeast Institute Industrial Tech",
                            "Northeastern University": "Northeastern University",
                            "Northern Essex Community College": "Northern Essex Community College",
                            "Pine Manor College": "Pine Manor College",
                            "Pope John Xxiii National Seminary": "Pope John Xxiii National Seminary",
                            "Quincy Junior College": "Quincy Junior College",
                            "Quinsigamond Community College": "Quinsigamond Community College",
                            "Radcliff College": "Radcliff College",
                            "Regis College": "Regis College",
                            "Roxbury Community College": "Roxbury Community College",
                            "Salem State College": "Salem State College",
                            "School of The Museum of Fine Arts": "School of The Museum of Fine Arts",
                            "Simmons College": "Simmons College",
                            "Simons Rock of Bard College": "Simons Rock of Bard College",
                            "Smith College": "Smith College",
                            "Springfield College": "Springfield College",
                            "Springfield Technical Community College": "Springfield Technical Community College",
                            "St Hyacinth College and Seminary": "St Hyacinth College and Seminary",
                            "St Johns Seminary": "St Johns Seminary",
                            "Stockbridge Sch of Ag at Univ of Massachusetts": "Stockbridge Sch of Ag at Univ of Massachusetts",
                            "Stonehill College": "Stonehill College",
                            "Suffolk University": "Suffolk University",
                            "Swain School of Design": "Swain School of Design",
                            "The Boston Conservatory of Music": "The Boston Conservatory of Music",
                            "The Center for Cross-Cultural Study, Inc": "The Center for Cross-Cultural Study, Inc",
                            "The New England Institute of Art": "The New England Institute of Art",
                            "Tufts University": "Tufts University",
                            "University of Massachusetts at Amherst": "University of Massachusetts at Amherst",
                            "University of Massachusetts at Boston": "University of Massachusetts at Boston",
                            "University of Massachusetts Dartmouth": "University of Massachusetts Dartmouth",
                            "University of Massachusetts Lowell": "University of Massachusetts Lowell",
                            "University of Massachusetts Medical School": "University of Massachusetts Medical School",
                            "Wellesley College": "Wellesley College",
                            "Wentworth Institute of Technology": "Wentworth Institute of Technology",
                            "Western New England College": "Western New England College",
                            "Westfield State College": "Westfield State College",
                            "Weston School of Theology": "Weston School of Theology",
                            "Wheaton College": "Wheaton College",
                            "Wheelock College": "Wheelock College",
                            "Williams College": "Williams College",
                            "Worcester Industrial Technical Institute": "Worcester Industrial Technical Institute",
                            "Worcester Junior College": "Worcester Junior College",
                            "Worcester Polytechnic Institute": "Worcester Polytechnic Institute",
                            "Worcester State College": "Worcester State College",
                            "Other": "Other"
                        };
                        break;
                    case "Maryland":
                        newOpts = {
                            "": "",
                            "Allegany Community College": "Allegany Community College",
                            "Anne Arundel Community College": "Anne Arundel Community College",
                            "Antietam Bible College": "Antietam Bible College",
                            "Arlington Bible College": "Arlington Bible College",
                            "Baltimore City Community College": "Baltimore City Community College",
                            "Baltimore International College": "Baltimore International College",
                            "Bowie State University": "Bowie State University",
                            "Capitol College": "Capitol College",
                            "Carroll Community College": "Carroll Community College",
                            "Cecil Community College": "Cecil Community College",
                            "Chesapeake College": "Chesapeake College",
                            "College of Notre Dame of Maryland": "College of Notre Dame of Maryland",
                            "College of Southern Maryland": "College of Southern Maryland",
                            "Columbia Union College": "Columbia Union College",
                            "Community College of Baltimore County Catonsville": "Community College of Baltimore County Catonsville",
                            "Community College of Baltimore Harbor Campus": "Community College of Baltimore Harbor Campus",
                            "Community College of Baltimore Liberty Campus": "Community College of Baltimore Liberty Campus",
                            "Coppin State College": "Coppin State College",
                            "Dundalk Community College": "Dundalk Community College",
                            "Eastern Christian College": "Eastern Christian College",
                            "Essex Community College": "Essex Community College",
                            "Frederick Community College": "Frederick Community College",
                            "Frostburg State University": "Frostburg State University",
                            "Garrett Community College": "Garrett Community College",
                            "Goucher Co Post-Bacc": "Goucher Co Post-Bacc",
                            "Goucher College": "Goucher College",
                            "Hagerstown Community College": "Hagerstown Community College",
                            "Harford Community College": "Harford Community College",
                            "Hood College": "Hood College",
                            "Howard Community College": "Howard Community College",
                            "Johns Hopkins University": "Johns Hopkins University",
                            "Loyola College": "Loyola College",
                            "Maryland College of Art and Design": "Maryland College of Art and Design",
                            "Maryland Institute, College of Art": "Maryland Institute, College of Art",
                            "McDaniel College": "McDaniel College",
                            "Montgomery College Germantown": "Montgomery College Germantown",
                            "Montgomery College Rockville": "Montgomery College Rockville",
                            "Montgomery College Takoma Park": "Montgomery College Takoma Park",
                            "Morgan State University": "Morgan State University",
                            "Mount St Marys College Maryland": "Mount St Marys College Maryland",
                            "National Labor College": "National Labor College",
                            "Ocean City College": "Ocean City College",
                            "Prince Georges Community College": "Prince Georges Community College",
                            "Saint Marys College of Maryland": "Saint Marys College of Maryland",
                            "Saint Marys Seminary and University": "Saint Marys Seminary and University",
                            "Salisbury University": "Salisbury University",
                            "Sojourner-Douglass College": "Sojourner-Douglass College",
                            "St Johns College Maryland": "St Johns College Maryland",
                            "Stevenson University": "Stevenson University",
                            "Towson University": "Towson University",
                            "Uniformed Services University of Health Science": "Uniformed Services University of Health Science",
                            "United States Naval Academy": "United States Naval Academy",
                            "University of Baltimore": "University of Baltimore",
                            "University of Maryland at Baltimore": "University of Maryland at Baltimore",
                            "University of Maryland at College Park": "University of Maryland at College Park",
                            "University of Maryland Baltimore County": "University of Maryland Baltimore County",
                            "University of Maryland Eastern Shore": "University of Maryland Eastern Shore",
                            "University of Maryland University College": "University of Maryland University College",
                            "Washington Bible College": "Washington Bible College",
                            "Washington College": "Washington College",
                            "Western Maryland College": "Western Maryland College",
                            "Wor-Wic Community College": "Wor-Wic Community College",
                            "Other": "Other"
                        };
                        break;
                    case "Maine":
                        newOpts = {
                            "": "",
                            "Bangor Community College of Maine University": "Bangor Community College of Maine University",
                            "Bates College": "Bates College",
                            "Beal College": "Beal College",
                            "Bowdoin College": "Bowdoin College",
                            "Casco Bay College": "Casco Bay College",
                            "Central Maine Vocational-Technical Institute": "Central Maine Vocational-Technical Institute",
                            "Colby College": "Colby College",
                            "College of The Atlantic": "College of The Atlantic",
                            "Eastern Maine Vocational-Technical Institute": "Eastern Maine Vocational-Technical Institute",
                            "Husson College": "Husson College",
                            "Kennebec Valley Vocational-Technical Institute": "Kennebec Valley Vocational-Technical Institute",
                            "Maine College of Art": "Maine College of Art",
                            "Maine Maritime Academy": "Maine Maritime Academy",
                            "Northern Maine Community College": "Northern Maine Community College",
                            "Portland School of Art": "Portland School of Art",
                            "Saint Joseph's College": "Saint Joseph's College",
                            "Southern Maine Community College": "Southern Maine Community College",
                            "Thomas College Maine": "Thomas College Maine",
                            "Unity College": "Unity College",
                            "University of Maine": "University of Maine",
                            "University of Maine at Augusta": "University of Maine at Augusta",
                            "University of Maine at Bangor": "University of Maine at Bangor",
                            "University of Maine at Farmington": "University of Maine at Farmington",
                            "University of Maine at Fort Kent": "University of Maine at Fort Kent",
                            "University of Maine at Machias": "University of Maine at Machias",
                            "University of Maine at Presque Isle": "University of Maine at Presque Isle",
                            "University of New England": "University of New England",
                            "University of Southern Maine": "University of Southern Maine",
                            "Washington County Vocational-Technical Institute": "Washington County Vocational-Technical Institute",
                            "Westbrook College": "Westbrook College",
                            "York County Community College": "York County Community College",
                            "Other": "Other"
                        };
                        break;
                    case "Michigan":
                        newOpts = {
                            "": "",
                            "Adrian College": "Adrian College",
                            "Albion College": "Albion College",
                            "Alma College": "Alma College",
                            "Alpena Community College": "Alpena Community College",
                            "Andrews University": "Andrews University",
                            "Aquinas College": "Aquinas College",
                            "Ave Maria College": "Ave Maria College",
                            "Baker College of Clinton Township": "Baker College of Clinton Township",
                            "Baker College of Flint": "Baker College of Flint",
                            "Baker College of Muskegon": "Baker College of Muskegon",
                            "Baker College of Owosso": "Baker College of Owosso",
                            "Bay De Noc Community College": "Bay De Noc Community College",
                            "Bay Mills Community College": "Bay Mills Community College",
                            "Calvin College": "Calvin College",
                            "Central Michigan University": "Central Michigan University",
                            "Charles Stewart Mott College": "Charles Stewart Mott College",
                            "Cleary College": "Cleary College",
                            "College for Creative Studies": "College for Creative Studies",
                            "Concordia College": "Concordia College",
                            "Cornerstone University": "Cornerstone University",
                            "Davenport College of Business - Lansing": "Davenport College of Business - Lansing",
                            "Davenport University": "Davenport University",
                            "Davenport University - Dearborn": "Davenport University - Dearborn",
                            "Davenport University - Midland": "Davenport University - Midland",
                            "Delta College": "Delta College",
                            "Detroit Engrg Institute": "Detroit Engrg Institute",
                            "Detroit Institute of Technology": "Detroit Institute of Technology",
                            "Eastern Michigan University": "Eastern Michigan University",
                            "Ferris State University": "Ferris State University",
                            "Finlandia University": "Finlandia University",
                            "Glen Oaks Community College": "Glen Oaks Community College",
                            "Gmi Engineering & Management Institute": "Gmi Engineering & Management Institute",
                            "Gogebic Community College": "Gogebic Community College",
                            "Grace Bible College": "Grace Bible College",
                            "Grand Rapids Baptist College and Seminary": "Grand Rapids Baptist College and Seminary",
                            "Grand Rapids Community College": "Grand Rapids Community College",
                            "Grand Valley State University": "Grand Valley State University",
                            "Henry Ford Community College": "Henry Ford Community College",
                            "Highland Park Community College": "Highland Park Community College",
                            "Hillsdale College": "Hillsdale College",
                            "Hope College": "Hope College",
                            "Jackson Community College": "Jackson Community College",
                            "Jordan College": "Jordan College",
                            "Kalamazoo College": "Kalamazoo College",
                            "Kalamazoo Valley Community College": "Kalamazoo Valley Community College",
                            "Kellogg Community College": "Kellogg Community College",
                            "Kettering University": "Kettering University",
                            "Kirtland Community College": "Kirtland Community College",
                            "Lake Michigan College": "Lake Michigan College",
                            "Lake Superior State University": "Lake Superior State University",
                            "Lansing Community College": "Lansing Community College",
                            "Lawrence Institute of Technology": "Lawrence Institute of Technology",
                            "Lewis College of Business": "Lewis College of Business",
                            "Mackinac College": "Mackinac College",
                            "Macomb Community College": "Macomb Community College",
                            "Macomb Community College Center": "Macomb Community College Center",
                            "Madonna College": "Madonna College",
                            "Marygrove College": "Marygrove College",
                            "Mercy College of Detroit": "Mercy College of Detroit",
                            "Michigan State University": "Michigan State University",
                            "Michigan Technological University": "Michigan Technological University",
                            "Mid Michigan Community College": "Mid Michigan Community College",
                            "Monroe County Community College": "Monroe County Community College",
                            "Montcalm Community College": "Montcalm Community College",
                            "Muskegon Business College": "Muskegon Business College",
                            "Muskegon Community College": "Muskegon Community College",
                            "Nazareth College Kalamazoo": "Nazareth College Kalamazoo",
                            "North Central Michigan College": "North Central Michigan College",
                            "Northern Michigan University": "Northern Michigan University",
                            "Northwestern Michigan College": "Northwestern Michigan College",
                            "Northwood University": "Northwood University",
                            "Oakland Community College Bloomfield Hills": "Oakland Community College Bloomfield Hills",
                            "Oakland University": "Oakland University",
                            "Olivet College": "Olivet College",
                            "Reformed Bible College": "Reformed Bible College",
                            "Rochester College": "Rochester College",
                            "Sacred Heart Seminary": "Sacred Heart Seminary",
                            "Saginaw Valley State University": "Saginaw Valley State University",
                            "Saint Clair County Community College": "Saint Clair County Community College",
                            "Schoolcraft College": "Schoolcraft College",
                            "Siena Heights College": "Siena Heights College",
                            "Southwestern Michigan College": "Southwestern Michigan College",
                            "Spring Arbor College": "Spring Arbor College",
                            "St Marys College Michigan": "St Marys College Michigan",
                            "Thomas Cooley Law School": "Thomas Cooley Law School",
                            "University of Detroit": "University of Detroit",
                            "University of Detroit/Mercy": "University of Detroit/Mercy",
                            "University of Michigan, Ann Arbor": "University of Michigan, Ann Arbor",
                            "University of Michigan, Dearborn": "University of Michigan, Dearborn",
                            "University of Michigan, Flint": "University of Michigan, Flint",
                            "Walsh College": "Walsh College",
                            "Washtenaw Community College": "Washtenaw Community College",
                            "Wayne County Community College": "Wayne County Community College",
                            "Wayne State University": "Wayne State University",
                            "West Shore Community College": "West Shore Community College",
                            "Western Michigan University": "Western Michigan University",
                            "William Tyndale College": "William Tyndale College",
                            "Other": "Other"
                        };
                        break;
                    case "Minnesota":
                        newOpts = {
                            "": "",
                            "Alexandria Technical College": "Alexandria Technical College",
                            "Anoka Tech Coll Formerly Anoka-Hennepin Tech Coll": "Anoka Tech Coll Formerly Anoka-Hennepin Tech Coll",
                            "Anoka-Ramsey Community College": "Anoka-Ramsey Community College",
                            "Argosy University": "Argosy University",
                            "Augsburg College": "Augsburg College",
                            "Austin Community College Minnesota": "Austin Community College Minnesota",
                            "Bemidji State University": "Bemidji State University",
                            "Bethany Lutheran College": "Bethany Lutheran College",
                            "Bethel Theological Seminary": "Bethel Theological Seminary",
                            "Bethel University": "Bethel University",
                            "Brown Institute": "Brown Institute",
                            "Capella University": "Capella University",
                            "Carleton College": "Carleton College",
                            "Central Lakes College": "Central Lakes College",
                            "Century College": "Century College",
                            "College of St Benedict": "College of St Benedict",
                            "College of St Catherine": "College of St Catherine",
                            "College of St Scholastica": "College of St Scholastica",
                            "College of St Teresa": "College of St Teresa",
                            "College of Visual Arts": "College of Visual Arts",
                            "Concordia College": "Concordia College",
                            "Concordia College St Paul": "Concordia College St Paul",
                            "Crosier Seminary Junior College": "Crosier Seminary Junior College",
                            "Crown College": "Crown College",
                            "Dakota County Technical College": "Dakota County Technical College",
                            "Dr Martin Luther College": "Dr Martin Luther College",
                            "Dunwoody College of Technology": "Dunwoody College of Technology",
                            "Fergus Falls Community College": "Fergus Falls Community College",
                            "Fond Du Lac Tribal and Community College": "Fond Du Lac Tribal and Community College",
                            "Globe University": "Globe University",
                            "Golden Valley Lutheran College": "Golden Valley Lutheran College",
                            "Gustavus Adolphus College": "Gustavus Adolphus College",
                            "Hamline University": "Hamline University",
                            "Hennepin Technical College": "Hennepin Technical College",
                            "Hibbing Community College": "Hibbing Community College",
                            "Inver Hills Community College": "Inver Hills Community College",
                            "Itasca Community College": "Itasca Community College",
                            "Lake Superior College": "Lake Superior College",
                            "Luther Northwestern Theological Seminary": "Luther Northwestern Theological Seminary",
                            "Macalester College": "Macalester College",
                            "Martin Luther College": "Martin Luther College",
                            "Medical Institute of Minnesota": "Medical Institute of Minnesota",
                            "Mesabi Community College": "Mesabi Community College",
                            "Metropolitan State University": "Metropolitan State University",
                            "Minneapolis College of Art and Design": "Minneapolis College of Art and Design",
                            "Minneapolis Community and Technical College": "Minneapolis Community and Technical College",
                            "Minneapolis Community College": "Minneapolis Community College",
                            "Minnesota Bible College": "Minnesota Bible College",
                            "Minnesota State College-Southeast Technical": "Minnesota State College-Southeast Technical",
                            "Minnesota State Community & Technical College": "Minnesota State Community & Technical College",
                            "Minnesota State University": "Minnesota State University",
                            "Minnesota State University Moorhead": "Minnesota State University Moorhead",
                            "Minnesota West Community and Technical College": "Minnesota West Community and Technical College",
                            "Normandale Community College": "Normandale Community College",
                            "North Central Bible College": "North Central Bible College",
                            "North Central University": "North Central University",
                            "North Hennepin Community College": "North Hennepin Community College",
                            "Northland Community College": "Northland Community College",
                            "Northwestern College of Chiropractic": "Northwestern College of Chiropractic",
                            "Pine Technical & Community College": "Pine Technical & Community College",
                            "Rainy River Community College": "Rainy River Community College",
                            "Rasmussen College": "Rasmussen College",
                            "Ridgewater College": "Ridgewater College",
                            "Riverland Community College": "Riverland Community College",
                            "Rochester Community College": "Rochester Community College",
                            "Saint Paul College A Community & Technical College": "Saint Paul College A Community & Technical College",
                            "South Central Technical College": "South Central Technical College",
                            "Southwest Minnesota State Univ": "Southwest Minnesota State Univ",
                            "Southwest State University": "Southwest State University",
                            "St Catherine University": "St Catherine University",
                            "St Cloud State University": "St Cloud State University",
                            "St Cloud Technical College": "St Cloud Technical College",
                            "St Johns University": "St Johns University",
                            "St Marys College of Minnesota": "St Marys College of Minnesota",
                            "St Olaf College": "St Olaf College",
                            "University of Minnesota": "University of Minnesota",
                            "University of Minnesota-Crookston": "University of Minnesota-Crookston",
                            "University of Minnesota-Duluth": "University of Minnesota-Duluth",
                            "University of Minnesota-Morris": "University of Minnesota-Morris",
                            "University of Minnesota-Waseca": "University of Minnesota-Waseca",
                            "University of Northwestern": "University of Northwestern",
                            "University of St Thomas": "University of St Thomas",
                            "Vermilion Community College": "Vermilion Community College",
                            "Walden University": "Walden University",
                            "Winona State University": "Winona State University",
                            "Other": "Other"
                        };
                        break;
                    case "Missouri":
                        newOpts = {
                            "": "",
                            "Assemblies of God Theological Seminary": "Assemblies of God Theological Seminary",
                            "Avila College": "Avila College",
                            "Calvary Bible College": "Calvary Bible College",
                            "Cardinal Newman College": "Cardinal Newman College",
                            "Central Bible College": "Central Bible College",
                            "Central Christian College of The Bible": "Central Christian College of The Bible",
                            "Central Methodist University": "Central Methodist University",
                            "Chamberlain College of Nursing": "Chamberlain College of Nursing",
                            "College of The Ozarks": "College of The Ozarks",
                            "Columbia College": "Columbia College",
                            "Conception Seminary College": "Conception Seminary College",
                            "Concordia Seminary": "Concordia Seminary",
                            "Cottey College": "Cottey College",
                            "Crowder College": "Crowder College",
                            "Culver-Stockton College": "Culver-Stockton College",
                            "Devry Institute of Technology": "Devry Institute of Technology",
                            "Drury University": "Drury University",
                            "East Central College": "East Central College",
                            "Evangel University": "Evangel University",
                            "Fontbonne College": "Fontbonne College",
                            "Gateway College Evanglsm": "Gateway College Evanglsm",
                            "Global University": "Global University",
                            "Hannibal-Lagrange College": "Hannibal-Lagrange College",
                            "Harris-Stowe State College": "Harris-Stowe State College",
                            "Jefferson College": "Jefferson College",
                            "Kansas City Art Institute": "Kansas City Art Institute",
                            "Kemper Military Junior College": "Kemper Military Junior College",
                            "Lincoln University": "Lincoln University",
                            "Lindenwood University": "Lindenwood University",
                            "Living Word College": "Living Word College",
                            "Logan College of Chiropractic": "Logan College of Chiropractic",
                            "Longview Community College": "Longview Community College",
                            "Maple Woods Community College": "Maple Woods Community College",
                            "Maryville University": "Maryville University",
                            "Metropolitan Community Colleges": "Metropolitan Community Colleges",
                            "Midwestern Baptist Theological Seminary": "Midwestern Baptist Theological Seminary",
                            "Mineral Area College": "Mineral Area College",
                            "Missouri Baptist University": "Missouri Baptist University",
                            "Missouri Hills School": "Missouri Hills School",
                            "Missouri Southern State College": "Missouri Southern State College",
                            "Missouri State University": "Missouri State University",
                            "Missouri State University - West Plains": "Missouri State University - West Plains",
                            "Missouri Univ of Science & Technology": "Missouri Univ of Science & Technology",
                            "Missouri Valley College": "Missouri Valley College",
                            "Missouri Western State College": "Missouri Western State College",
                            "Moberly Area Community College": "Moberly Area Community College",
                            "Nazarene Theological Seminary": "Nazarene Theological Seminary",
                            "North Central Missouri College": "North Central Missouri College",
                            "Northwest Missouri State University": "Northwest Missouri State University",
                            "Ozark Christian College": "Ozark Christian College",
                            "Ozarks Technical Community College": "Ozarks Technical Community College",
                            "Park University": "Park University",
                            "Penn Valley Community College": "Penn Valley Community College",
                            "Pioneer Community College": "Pioneer Community College",
                            "Platt College": "Platt College",
                            "Ranken Technical College": "Ranken Technical College",
                            "Research College of Nursing": "Research College of Nursing",
                            "Rockhurst University": "Rockhurst University",
                            "Saint Marys College of O'Fallon": "Saint Marys College of O'Fallon",
                            "Saint Paul School of Theology": "Saint Paul School of Theology",
                            "Southeast Missouri State University": "Southeast Missouri State University",
                            "Southwest Baptist University": "Southwest Baptist University",
                            "St Charles Community College": "St Charles Community College",
                            "St Charles County Community College": "St Charles County Community College",
                            "St Louis College of Pharmacy": "St Louis College of Pharmacy",
                            "St Louis Community College at Florissant Valley": "St Louis Community College at Florissant Valley",
                            "St Louis Community College at Forest Park": "St Louis Community College at Forest Park",
                            "St Louis Community College at Meramec": "St Louis Community College at Meramec",
                            "St Louis Conservatory of Music": "St Louis Conservatory of Music",
                            "St Louis University": "St Louis University",
                            "State Fair Community College": "State Fair Community College",
                            "Stephens College": "Stephens College",
                            "Tarkio College": "Tarkio College",
                            "Three Rivers Community College": "Three Rivers Community College",
                            "Truman State University": "Truman State University",
                            "University of Central Missouri": "University of Central Missouri",
                            "University of Missouri, Columbia": "University of Missouri, Columbia",
                            "University of Missouri, Kansas City": "University of Missouri, Kansas City",
                            "University of Missouri, St Louis": "University of Missouri, St Louis",
                            "Washington University": "Washington University",
                            "Webster University": "Webster University",
                            "Wentworth Military Academy and Junior College": "Wentworth Military Academy and Junior College",
                            "Westminster College": "Westminster College",
                            "William Jewell College": "William Jewell College",
                            "William Woods College": "William Woods College",
                            "Other": "Other"
                        };
                        break;
                    case "Northern Mariana Islands":
                        newOpts = {
                            "": "",
                            "Northern Marianas College": "Northern Marianas College",
                            "Other": "Other"
                        };
                        break;
                    case "Mississippi":
                        newOpts = {
                            "": "",
                            "Alcorn State University": "Alcorn State University",
                            "Belhaven College": "Belhaven College",
                            "Blue Mountain College": "Blue Mountain College",
                            "Clarke College Mississippi": "Clarke College Mississippi",
                            "Coahoma Junior College": "Coahoma Junior College",
                            "Copiah-Lincoln Junior College": "Copiah-Lincoln Junior College",
                            "Delta State University": "Delta State University",
                            "East Central Community College": "East Central Community College",
                            "East Mississippi Community College": "East Mississippi Community College",
                            "Hinds Community College": "Hinds Community College",
                            "Holmes Junior College": "Holmes Junior College",
                            "Itawamba Community College": "Itawamba Community College",
                            "Jackson State University": "Jackson State University",
                            "Jones County Junior College": "Jones County Junior College",
                            "Mary Holmes College": "Mary Holmes College",
                            "Meridian Junior College": "Meridian Junior College",
                            "Millsaps College": "Millsaps College",
                            "Mississippi College": "Mississippi College",
                            "Mississippi Delta Junior College": "Mississippi Delta Junior College",
                            "Mississippi Gulf Coast Community College": "Mississippi Gulf Coast Community College",
                            "Mississippi Gulf Coast Junior College": "Mississippi Gulf Coast Junior College",
                            "Mississippi Gulf Coast Junior College": "Mississippi Gulf Coast Junior College",
                            "Mississippi State University": "Mississippi State University",
                            "Mississippi University for Women": "Mississippi University for Women",
                            "Mississippi Valley State University": "Mississippi Valley State University",
                            "Northeast Mississippi Community College": "Northeast Mississippi Community College",
                            "Northwest Mississippi Community College": "Northwest Mississippi Community College",
                            "Pearl River Junior College": "Pearl River Junior College",
                            "Phillips Junior College": "Phillips Junior College",
                            "Prentiss Normal/Industrial College": "Prentiss Normal/Industrial College",
                            "Rust College": "Rust College",
                            "Southeastern Baptist College": "Southeastern Baptist College",
                            "Southwest Mississippi Junior College": "Southwest Mississippi Junior College",
                            "Tougaloo College": "Tougaloo College",
                            "University of Mississippi": "University of Mississippi",
                            "University of Southern Mississippi": "University of Southern Mississippi",
                            "Wesley College": "Wesley College",
                            "William Carey College": "William Carey College",
                            "Wood Junior College": "Wood Junior College",
                            "Other": "Other"
                        };
                        break;
                    case "Montana":
                        newOpts = {
                            "": "",
                            "Blackfeet Community College": "Blackfeet Community College",
                            "Carroll College": "Carroll College",
                            "Chief Dull Knife College": "Chief Dull Knife College",
                            "Dawson Community College": "Dawson Community College",
                            "Deer Lodge College": "Deer Lodge College",
                            "Dull Knife Memorial Community College": "Dull Knife Memorial Community College",
                            "Flathead Valley Community College": "Flathead Valley Community College",
                            "Fort Belknap College": "Fort Belknap College",
                            "Fort Peck Community College": "Fort Peck Community College",
                            "Glacier College": "Glacier College",
                            "Helena College": "Helena College",
                            "Intermountain Community College": "Intermountain Community College",
                            "Little Big Horn College": "Little Big Horn College",
                            "Miles Community College": "Miles Community College",
                            "Mission Mountain College": "Mission Mountain College",
                            "Missoula Vocational-Technical Center": "Missoula Vocational-Technical Center",
                            "Montana State Univ Coll of Technology-Great Falls": "Montana State Univ Coll of Technology-Great Falls",
                            "Montana State University, Billings": "Montana State University, Billings",
                            "Montana State University, Bozeman": "Montana State University, Bozeman",
                            "Montana State University, Northern": "Montana State University, Northern",
                            "Montana Tech of The University of Montana": "Montana Tech of The University of Montana",
                            "Montana Wilderness School of The Bible": "Montana Wilderness School of The Bible",
                            "Mountain States Baptist College": "Mountain States Baptist College",
                            "Rocky Mountain College": "Rocky Mountain College",
                            "Salish Kootenai College": "Salish Kootenai College",
                            "Stone Child College": "Stone Child College",
                            "The University of Montana - Western": "The University of Montana - Western",
                            "University of Great Falls": "University of Great Falls",
                            "University of Montana": "University of Montana",
                            "Other": "Other"
                        };
                        break;
                    case "North Carolina":
                        newOpts = {
                            "": "",
                            "Alamance Community College": "Alamance Community College",
                            "Alpha & Omega Christian College": "Alpha & Omega Christian College",
                            "American Business / Fashion Institute": "American Business / Fashion Institute",
                            "Appalachian State University": "Appalachian State University",
                            "Ashville-Buncombe Technical College": "Ashville-Buncombe Technical College",
                            "Barber-Scotia College": "Barber-Scotia College",
                            "Barton College": "Barton College",
                            "Beaufort County Community College": "Beaufort County Community College",
                            "Belmont Abbey College": "Belmont Abbey College",
                            "Bennett College North Carolina": "Bennett College North Carolina",
                            "Bladen Community College": "Bladen Community College",
                            "Blantons Junior College": "Blantons Junior College",
                            "Blue Ridge Community College": "Blue Ridge Community College",
                            "Bowman Gray School of Medecine": "Bowman Gray School of Medecine",
                            "Brevard College": "Brevard College",
                            "Brookstone College of Business": "Brookstone College of Business",
                            "Brunswick Community College": "Brunswick Community College",
                            "Caldwell Community College and Technical Institute": "Caldwell Community College and Technical Institute",
                            "Campbell University": "Campbell University",
                            "Cape Fear Community College": "Cape Fear Community College",
                            "Carolinas College of Health Sciences": "Carolinas College of Health Sciences",
                            "Carteret Technical College": "Carteret Technical College",
                            "Catawba College": "Catawba College",
                            "Catawba Valley Community College": "Catawba Valley Community College",
                            "Catawba Valley Tech College": "Catawba Valley Tech College",
                            "Central Carolina Community College": "Central Carolina Community College",
                            "Central Piedmont Community College": "Central Piedmont Community College",
                            "Chowan College": "Chowan College",
                            "Cleveland Community College": "Cleveland Community College",
                            "Coastal Carolina Community College": "Coastal Carolina Community College",
                            "College of The Albemarle": "College of The Albemarle",
                            "Craven Community College": "Craven Community College",
                            "Davidson College": "Davidson College",
                            "Davidson County Community College": "Davidson County Community College",
                            "Duke University": "Duke University",
                            "Duke University Allied Health Program": "Duke University Allied Health Program",
                            "Durham Technical Community College": "Durham Technical Community College",
                            "East Carolina University": "East Carolina University",
                            "Edgecombe Technical College": "Edgecombe Technical College",
                            "Elizabeth City State University": "Elizabeth City State University",
                            "Elon College": "Elon College",
                            "Fayetteville State University": "Fayetteville State University",
                            "Fayetteville Technical Community College": "Fayetteville Technical Community College",
                            "Forsyth Technical College": "Forsyth Technical College",
                            "Gardner-Webb College": "Gardner-Webb College",
                            "Gaston College": "Gaston College",
                            "Greensboro College": "Greensboro College",
                            "Guilford College": "Guilford College",
                            "Guilford Technical Community College, Jamestown": "Guilford Technical Community College, Jamestown",
                            "Halifax Community College": "Halifax Community College",
                            "Hardbarger Junior College of Business": "Hardbarger Junior College of Business",
                            "Haywood Community College": "Haywood Community College",
                            "High Point University": "High Point University",
                            "Isothermal Community College": "Isothermal Community College",
                            "James Sprunt Community College": "James Sprunt Community College",
                            "John Wesley College": "John Wesley College",
                            "Johnson C Smith University": "Johnson C Smith University",
                            "Johnston Community College": "Johnston Community College",
                            "Kings College": "Kings College",
                            "Lees-McRae College": "Lees-McRae College",
                            "Lenoir Community College": "Lenoir Community College",
                            "Lenoir-Rhyne College": "Lenoir-Rhyne College",
                            "Livingstone College": "Livingstone College",
                            "Louisburg College": "Louisburg College",
                            "Manna Christian College": "Manna Christian College",
                            "Mars Hill College": "Mars Hill College",
                            "Martin Community College": "Martin Community College",
                            "Mayland Community College": "Mayland Community College",
                            "McDowell Technical Community College": "McDowell Technical Community College",
                            "Meredith College": "Meredith College",
                            "Methodist University": "Methodist University",
                            "Miller-Motte Business College": "Miller-Motte Business College",
                            "Mitchell Community College": "Mitchell Community College",
                            "Montreat College": "Montreat College",
                            "Mount Olive College": "Mount Olive College",
                            "Nash Community College": "Nash Community College",
                            "North Carolina Agricultural & Technical State Univ": "North Carolina Agricultural & Technical State Univ",
                            "North Carolina Central University": "North Carolina Central University",
                            "North Carolina State University": "North Carolina State University",
                            "North Carolina Wesleyan College": "North Carolina Wesleyan College",
                            "Pamlico Community College": "Pamlico Community College",
                            "Peace College": "Peace College",
                            "Pfeiffer College": "Pfeiffer College",
                            "Piedmont Bible College": "Piedmont Bible College",
                            "Piedmont Community College": "Piedmont Community College",
                            "Pitt Community College": "Pitt Community College",
                            "Queens University of Charlotte": "Queens University of Charlotte",
                            "Randolph Community College": "Randolph Community College",
                            "Randolph Technical College": "Randolph Technical College",
                            "Richmond Community College": "Richmond Community College",
                            "Roanoke Bible College": "Roanoke Bible College",
                            "Roanoke-Chowan Community College": "Roanoke-Chowan Community College",
                            "Robeson Community College": "Robeson Community College",
                            "Rockingham Community College": "Rockingham Community College",
                            "Rowan-Cabarrus Community": "Rowan-Cabarrus Community",
                            "Rutledge College, Raleigh": "Rutledge College, Raleigh",
                            "Saint Marys College": "Saint Marys College",
                            "Salem College North Carolina": "Salem College North Carolina",
                            "Sampson Community College": "Sampson Community College",
                            "Sandhills Community College": "Sandhills Community College",
                            "Shaw University": "Shaw University",
                            "South Piedmont Community College": "South Piedmont Community College",
                            "Southeastern Community College": "Southeastern Community College",
                            "Southwestern Community College": "Southwestern Community College",
                            "St Andrews Presbyterian College": "St Andrews Presbyterian College",
                            "St Augustines College": "St Augustines College",
                            "Stanly Community College": "Stanly Community College",
                            "Surry Community College": "Surry Community College",
                            "Tri-County Community College": "Tri-County Community College",
                            "University of North Carolina at Asheville": "University of North Carolina at Asheville",
                            "University of North Carolina at Chapel Hill": "University of North Carolina at Chapel Hill",
                            "University of North Carolina at Charlotte": "University of North Carolina at Charlotte",
                            "University of North Carolina at Greensboro": "University of North Carolina at Greensboro",
                            "University of North Carolina at Pembroke": "University of North Carolina at Pembroke",
                            "University of North Carolina at Wilmington": "University of North Carolina at Wilmington",
                            "University of North Carolina School of The Arts": "University of North Carolina School of The Arts",
                            "Vance-Granville Community College": "Vance-Granville Community College",
                            "Wake Forest University": "Wake Forest University",
                            "Wake Technical College": "Wake Technical College",
                            "Warren Wilson College": "Warren Wilson College",
                            "Wayne Community College": "Wayne Community College",
                            "Western Carolina University": "Western Carolina University",
                            "Western Piedmont Community College": "Western Piedmont Community College",
                            "Wilkes Community College": "Wilkes Community College",
                            "William Carter College": "William Carter College",
                            "Wilson County Technical College": "Wilson County Technical College",
                            "Wingate College": "Wingate College",
                            "Winston-Salem State University": "Winston-Salem State University",
                            "Other": "Other"
                        };
                        break;
                    case "North Dakota":
                        newOpts = {
                            "": "",
                            "Bismarck State College": "Bismarck State College",
                            "Dakota College at Bottineau": "Dakota College at Bottineau",
                            "Dickinson State University": "Dickinson State University",
                            "Fort Berthold Community College": "Fort Berthold Community College",
                            "Jamestown College": "Jamestown College",
                            "Lake Region State College": "Lake Region State College",
                            "Little Hoop Community College": "Little Hoop Community College",
                            "Mayville State University": "Mayville State University",
                            "Med Center One College of Nursing": "Med Center One College of Nursing",
                            "Minot State University, Minot": "Minot State University, Minot",
                            "North Dakota State College of Science": "North Dakota State College of Science",
                            "North Dakota State University": "North Dakota State University",
                            "North Dakota State University - Bottineau": "North Dakota State University - Bottineau",
                            "Northwest Bible College": "Northwest Bible College",
                            "Rasmussen College": "Rasmussen College",
                            "Rasmussen College": "Rasmussen College",
                            "Standing Rock Community College": "Standing Rock Community College",
                            "Tri-College University": "Tri-College University",
                            "Trinity Bible College": "Trinity Bible College",
                            "Turtle Mountain Community College": "Turtle Mountain Community College",
                            "United Tribes Technical College": "United Tribes Technical College",
                            "University of Mary": "University of Mary",
                            "University of North Dakota": "University of North Dakota",
                            "Valley City State University": "Valley City State University",
                            "Williston State College": "Williston State College",
                            "Other": "Other"
                        };
                        break;
                    case "Nebraska":
                        newOpts = {
                            "": "",
                            "Bellevue University": "Bellevue University",
                            "Bishop Clarkson College": "Bishop Clarkson College",
                            "Central Community College, Grand Island Campus": "Central Community College, Grand Island Campus",
                            "Central Community College, Hastings": "Central Community College, Hastings",
                            "Central Community College, Platte Campus": "Central Community College, Platte Campus",
                            "Chadron State College": "Chadron State College",
                            "College of Saint Mary": "College of Saint Mary",
                            "Concordia University": "Concordia University",
                            "Creighton University": "Creighton University",
                            "Dana College": "Dana College",
                            "Doane College": "Doane College",
                            "Grace College of The Bible": "Grace College of The Bible",
                            "Hastings College": "Hastings College",
                            "Lincoln School of Commerce": "Lincoln School of Commerce",
                            "McCook Community College": "McCook Community College",
                            "Metropolitan Community College": "Metropolitan Community College",
                            "Midland Lutheran College": "Midland Lutheran College",
                            "Mid-Plains Community College": "Mid-Plains Community College",
                            "Nebraska Christian College": "Nebraska Christian College",
                            "Nebraska College of Business": "Nebraska College of Business",
                            "Nebraska College of Technical Agriculture": "Nebraska College of Technical Agriculture",
                            "Nebraska Indian Community College": "Nebraska Indian Community College",
                            "Nebraska Methodist College": "Nebraska Methodist College",
                            "Nebraska Wesleyan University": "Nebraska Wesleyan University",
                            "Northeast Community College": "Northeast Community College",
                            "Omaha College of Health Careers": "Omaha College of Health Careers",
                            "Peru State College": "Peru State College",
                            "Southeast Community College at Beatrice": "Southeast Community College at Beatrice",
                            "Southeast Community College at Lincoln": "Southeast Community College at Lincoln",
                            "Southeast Community College at Milford": "Southeast Community College at Milford",
                            "Union College": "Union College",
                            "University of Nebraska at Kearney": "University of Nebraska at Kearney",
                            "University of Nebraska at Omaha": "University of Nebraska at Omaha",
                            "University of Nebraska Medical Center": "University of Nebraska Medical Center",
                            "University of Nebraska-Lincoln": "University of Nebraska-Lincoln",
                            "Wayne State College": "Wayne State College",
                            "Western Nebraska College": "Western Nebraska College",
                            "Western Nebraska Community College": "Western Nebraska Community College",
                            "York College": "York College",
                            "Other": "Other"
                        };
                        break;
                    case "New Hampshire":
                        newOpts = {
                            "": "",
                            "Castle Junior College": "Castle Junior College",
                            "Colby-Sawyer College": "Colby-Sawyer College",
                            "College for Lifelong Learning": "College for Lifelong Learning",
                            "Daniel Webster College": "Daniel Webster College",
                            "Dartmouth College": "Dartmouth College",
                            "Franklin Pierce College": "Franklin Pierce College",
                            "Granite State College": "Granite State College",
                            "Great Bay Community College": "Great Bay Community College",
                            "Hawthorne College": "Hawthorne College",
                            "Hesser College": "Hesser College",
                            "Keene State College": "Keene State College",
                            "Lakes Region Community College": "Lakes Region Community College",
                            "Magdalen College": "Magdalen College",
                            "McIntosh College": "McIntosh College",
                            "Nashua Community College": "Nashua Community College",
                            "New England College": "New England College",
                            "New Hampshire Vocational-Technical College": "New Hampshire Vocational-Technical College",
                            "New Hampshire Vocational-Technical College": "New Hampshire Vocational-Technical College",
                            "Nhti Concords Community College": "Nhti Concords Community College",
                            "Notre Dame College": "Notre Dame College",
                            "Plymouth State College": "Plymouth State College",
                            "River Valley Community College": "River Valley Community College",
                            "Rivier College": "Rivier College",
                            "Sch of Lifelong Learning, Univ of New Hampshire": "Sch of Lifelong Learning, Univ of New Hampshire",
                            "Southern New Hampshire University": "Southern New Hampshire University",
                            "St Anselm College": "St Anselm College",
                            "Thomas More Inst L A": "Thomas More Inst L A",
                            "Univ of New Hampshire": "Univ of New Hampshire",
                            "University of New Hampshire": "University of New Hampshire",
                            "White Mountains Community College": "White Mountains Community College",
                            "White Pines College": "White Pines College",
                            "Other": "Other"
                        };
                        break;
                    case "New Jersey":
                        newOpts = {
                            "": "",
                            "Assumpton College for Sisters": "Assumpton College for Sisters",
                            "Atlantic Cape Community College": "Atlantic Cape Community College",
                            "Atlantic Community College": "Atlantic Community College",
                            "Bergen Community College": "Bergen Community College",
                            "Berkeley College": "Berkeley College",
                            "Berkeley College": "Berkeley College",
                            "Bloomfield College": "Bloomfield College",
                            "Brookdale Community College": "Brookdale Community College",
                            "Burlington County College": "Burlington County College",
                            "Caldwell College": "Caldwell College",
                            "Camden County College": "Camden County College",
                            "Centenary College": "Centenary College",
                            "College of St Elizabeth": "College of St Elizabeth",
                            "County College of Morris": "County College of Morris",
                            "Cumberland County College": "Cumberland County College",
                            "Devry Technical Institute": "Devry Technical Institute",
                            "Don Bosco College": "Don Bosco College",
                            "Drew University": "Drew University",
                            "Englewood Cliffs College": "Englewood Cliffs College",
                            "Essex County College": "Essex County College",
                            "Fairleigh Dickinson Univ, Edward Williams College": "Fairleigh Dickinson Univ, Edward Williams College",
                            "Fairleigh Dickinson University": "Fairleigh Dickinson University",
                            "Fairleigh Dickinson University, Florham Madison": "Fairleigh Dickinson University, Florham Madison",
                            "Fairleigh Dickinson University, Rutherford": "Fairleigh Dickinson University, Rutherford",
                            "Fairleigh Dickinson University, Teaneck": "Fairleigh Dickinson University, Teaneck",
                            "Felician College": "Felician College",
                            "Georgian Court College": "Georgian Court College",
                            "Glassboro State College": "Glassboro State College",
                            "Gloucester County College": "Gloucester County College",
                            "Hudson County Community College": "Hudson County Community College",
                            "Immaculate Conception Seminary": "Immaculate Conception Seminary",
                            "Joe Kubert School of Cartoon and Graphic Art, Inc": "Joe Kubert School of Cartoon and Graphic Art, Inc",
                            "Kean University": "Kean University",
                            "Mercer County Community College": "Mercer County Community College",
                            "Middlesex County College": "Middlesex County College",
                            "Monmouth College": "Monmouth College",
                            "Montclair State University": "Montclair State University",
                            "New Brunswick Theological Seminary": "New Brunswick Theological Seminary",
                            "New Jersey City University": "New Jersey City University",
                            "New Jersey Institute of Technology": "New Jersey Institute of Technology",
                            "Northeastern Bible College": "Northeastern Bible College",
                            "Ocean County College": "Ocean County College",
                            "Passaic County Community College": "Passaic County Community College",
                            "Princeton Theological Seminary": "Princeton Theological Seminary",
                            "Princeton University": "Princeton University",
                            "Ramapo College of New Jersey": "Ramapo College of New Jersey",
                            "Raritan Valley Community College": "Raritan Valley Community College",
                            "Rider College": "Rider College",
                            "Rowan University": "Rowan University",
                            "Rutgers University, Camden Campus": "Rutgers University, Camden Campus",
                            "Rutgers University, New Brunswick Campus": "Rutgers University, New Brunswick Campus",
                            "Rutgers University, Newark Campus": "Rutgers University, Newark Campus",
                            "Salem Community College": "Salem Community College",
                            "Seton Hall University": "Seton Hall University",
                            "Seton Hall University, Newark": "Seton Hall University, Newark",
                            "Shelton Coll": "Shelton Coll",
                            "Somerset County Technical Inst": "Somerset County Technical Inst",
                            "St Peters College": "St Peters College",
                            "St Peter's College": "St Peter's College",
                            "State University of New Jersey, Rutgers University": "State University of New Jersey, Rutgers University",
                            "Stevens Institute of Technology": "Stevens Institute of Technology",
                            "Stockton State College": "Stockton State College",
                            "Stockton University": "Stockton University",
                            "Strayer University": "Strayer University",
                            "Sussex County Community College": "Sussex County Community College",
                            "Sussex County Community College Commission": "Sussex County Community College Commission",
                            "The College of New Jersey": "The College of New Jersey",
                            "The Rabbinical College of America": "The Rabbinical College of America",
                            "Thomas A Edison State College": "Thomas A Edison State College",
                            "Thomas Edison State College": "Thomas Edison State College",
                            "Trenton State College": "Trenton State College",
                            "Union County College": "Union County College",
                            "University of Medicine and Dentistry of New Jersey": "University of Medicine and Dentistry of New Jersey",
                            "Upsala College": "Upsala College",
                            "Warren County Community College Commission": "Warren County Community College Commission",
                            "Westminster Choir College": "Westminster Choir College",
                            "William Paterson College": "William Paterson College",
                            "Other": "Other"
                        };
                        break;
                    case "New Mexico":
                        newOpts = {
                            "": "",
                            "Central New Mexico Community College": "Central New Mexico Community College",
                            "Clovis Community College": "Clovis Community College",
                            "College of Santa Fe": "College of Santa Fe",
                            "College of The Southwest": "College of The Southwest",
                            "Eastern New Mexico University": "Eastern New Mexico University",
                            "Eastern New Mexico University Roswell Campus": "Eastern New Mexico University Roswell Campus",
                            "Institute of American Indian Arts": "Institute of American Indian Arts",
                            "ITT Technical Institute": "ITT Technical Institute",
                            "Luna Community College": "Luna Community College",
                            "Mesalands Community College": "Mesalands Community College",
                            "National American University": "National American University",
                            "New Mexico Highlands University": "New Mexico Highlands University",
                            "New Mexico Institute of Mining and Technology": "New Mexico Institute of Mining and Technology",
                            "New Mexico Junior College": "New Mexico Junior College",
                            "New Mexico Military Institute": "New Mexico Military Institute",
                            "New Mexico State University": "New Mexico State University",
                            "New Mexico State University Alamogordo Branch": "New Mexico State University Alamogordo Branch",
                            "New Mexico State University Carlsbad Branch": "New Mexico State University Carlsbad Branch",
                            "New Mexico State University Dona Ana Branch CC": "New Mexico State University Dona Ana Branch CC",
                            "New Mexico State University Grants Branch": "New Mexico State University Grants Branch",
                            "Northern New Mexico College": "Northern New Mexico College",
                            "Parks College": "Parks College",
                            "Saint John's College": "Saint John's College",
                            "San Juan College": "San Juan College",
                            "Santa Fe Community College": "Santa Fe Community College",
                            "Southwestern Indian Polytechnic Institute": "Southwestern Indian Polytechnic Institute",
                            "The Art Center Design College": "The Art Center Design College",
                            "University of Albuquerque": "University of Albuquerque",
                            "University of New Mexico": "University of New Mexico",
                            "University of New Mexico Gallup Branch": "University of New Mexico Gallup Branch",
                            "University of New Mexico Los Alamos Branch": "University of New Mexico Los Alamos Branch",
                            "University of New Mexico Valencia County Branch": "University of New Mexico Valencia County Branch",
                            "Western New Mexico University": "Western New Mexico University",
                            "Other": "Other"
                        };
                        break;
                    case "Nevada":
                        newOpts = {
                            "": "",
                            "College of Southern Nevada": "College of Southern Nevada",
                            "Deep Springs College": "Deep Springs College",
                            "Great Basin College": "Great Basin College",
                            "Morrison College": "Morrison College",
                            "Nevada State College": "Nevada State College",
                            "Reno Business College": "Reno Business College",
                            "Sierra Nevada College": "Sierra Nevada College",
                            "Truckee Meadows Community College": "Truckee Meadows Community College",
                            "University of Nevada, Las Vegas": "University of Nevada, Las Vegas",
                            "University of Nevada, Reno": "University of Nevada, Reno",
                            "Western Nevada Community College": "Western Nevada Community College",
                            "Other": "Other"
                        };
                        break;
                    case "New York":
                        newOpts = {
                            "": "",
                            "Adelphi University": "Adelphi University",
                            "Adirondack Community College": "Adirondack Community College",
                            "Adlai E Stevenson High School": "Adlai E Stevenson High School",
                            "Albany Business College": "Albany Business College",
                            "Albany College of Pharmacy": "Albany College of Pharmacy",
                            "Albany Law School": "Albany Law School",
                            "Albany Medical College of Union University": "Albany Medical College of Union University",
                            "Alfred University": "Alfred University",
                            "American Academy McAllister Institute": "American Academy McAllister Institute",
                            "American Academy of Dramatic Arts": "American Academy of Dramatic Arts",
                            "American Univ Cairo": "American Univ Cairo",
                            "American University of Beirut": "American University of Beirut",
                            "Bank Street College of Education": "Bank Street College of Education",
                            "Bard College": "Bard College",
                            "Bar-Ilan Univ Israel": "Bar-Ilan Univ Israel",
                            "Barnard College": "Barnard College",
                            "Berkeley School of Nassau, Inc.": "Berkeley School of Nassau, Inc.",
                            "Berkeley School of New York City, Inc.": "Berkeley School of New York City, Inc.",
                            "Boricua College": "Boricua College",
                            "Bramson Ort Technical Institute": "Bramson Ort Technical Institute",
                            "Briarcliffe School, Inc.": "Briarcliffe School, Inc.",
                            "Brooklyn Law School": "Brooklyn Law School",
                            "Broome Community College": "Broome Community College",
                            "Bryant & Stratton Business Institute of Rochester": "Bryant & Stratton Business Institute of Rochester",
                            "Bryant and Stratton Business Institute of Buffalo": "Bryant and Stratton Business Institute of Buffalo",
                            "Bryant and Stratton Business Institute of Syracuse": "Bryant and Stratton Business Institute of Syracuse",
                            "Buffalo Suburban Campus": "Buffalo Suburban Campus",
                            "Canisius College": "Canisius College",
                            "Cathedral College of The Immaculate Conception": "Cathedral College of The Immaculate Conception",
                            "Catholic Medical Ctr of Brooklyn, Inc. Sch Nursing": "Catholic Medical Ctr of Brooklyn, Inc. Sch Nursing",
                            "Cayuga Community College": "Cayuga Community College",
                            "Cazenovia College": "Cazenovia College",
                            "Central City Business Institute": "Central City Business Institute",
                            "Christ The King Seminary": "Christ The King Seminary",
                            "City Univ of New York, Bernard M Baruch College": "City Univ of New York, Bernard M Baruch College",
                            "City Univ of New York, Borough of Manhattan CC": "City Univ of New York, Borough of Manhattan CC",
                            "City Univ of New York, College of Staten Island": "City Univ of New York, College of Staten Island",
                            "City Univ of New York, Graduate Sch & Univ Center": "City Univ of New York, Graduate Sch & Univ Center",
                            "City Univ of New York, Herbert H Lehman College": "City Univ of New York, Herbert H Lehman College",
                            "City Univ of New York, Mount Sinai Sch of Medicine": "City Univ of New York, Mount Sinai Sch of Medicine",
                            "City Univ of New York, New York City Tech Coll": "City Univ of New York, New York City Tech Coll",
                            "City Univ of NY, John Jay Coll of Criminal Justice": "City Univ of NY, John Jay Coll of Criminal Justice",
                            "City University of New York": "City University of New York",
                            "City University of New York, Bronx CC": "City University of New York, Bronx CC",
                            "City University of New York, Brooklyn College": "City University of New York, Brooklyn College",
                            "City University of New York, City College": "City University of New York, City College",
                            "City University of New York, Hostos CC": "City University of New York, Hostos CC",
                            "City University of New York, Hunter College": "City University of New York, Hunter College",
                            "City University of New York, Kingsborough CC": "City University of New York, Kingsborough CC",
                            "City University of New York, La Guardia CC": "City University of New York, La Guardia CC",
                            "City University of New York, Medger Evers College": "City University of New York, Medger Evers College",
                            "City University of New York, Queens College": "City University of New York, Queens College",
                            "City University of New York, Queensborough CC": "City University of New York, Queensborough CC",
                            "City University of New York, York College": "City University of New York, York College",
                            "Clarkson University": "Clarkson University",
                            "Clinton Community College": "Clinton Community College",
                            "Cochran School of Nursing": "Cochran School of Nursing",
                            "Colgate Rochester-Bexley-Crozer Divinity School": "Colgate Rochester-Bexley-Crozer Divinity School",
                            "Colgate University": "Colgate University",
                            "College for Human Services": "College for Human Services",
                            "College of Insurance": "College of Insurance",
                            "College of MT. St Vincent": "College of MT. St Vincent",
                            "College of New Rochelle": "College of New Rochelle",
                            "College of St Rose": "College of St Rose",
                            "College of Staten Island": "College of Staten Island",
                            "College of The Holy Names": "College of The Holy Names",
                            "College of Westchester": "College of Westchester",
                            "Columbia University": "Columbia University",
                            "Columbia University Colummbia C": "Columbia University Colummbia C",
                            "Columbia University Dental Hygiene": "Columbia University Dental Hygiene",
                            "Columbia University School of Engineering": "Columbia University School of Engineering",
                            "Columbia University School of Nursing": "Columbia University School of Nursing",
                            "Columbia-Greene Community College": "Columbia-Greene Community College",
                            "Community College of The Finger Lakes": "Community College of The Finger Lakes",
                            "Concordia College": "Concordia College",
                            "Cooper Union": "Cooper Union",
                            "Cope Institute": "Cope Institute",
                            "Cornell University": "Cornell University",
                            "Corning Community College": "Corning Community College",
                            "Culinary Institute of America": "Culinary Institute of America",
                            "Daemen College": "Daemen College",
                            "Dominican College of Blauvelt": "Dominican College of Blauvelt",
                            "Dowling College": "Dowling College",
                            "Dutchess Community College": "Dutchess Community College",
                            "D'Youville College": "D'Youville College",
                            "Eastman Sch of Music": "Eastman Sch of Music",
                            "Edna McConnell Clark School of Nursing": "Edna McConnell Clark School of Nursing",
                            "Elizabeth Seton College": "Elizabeth Seton College",
                            "Elmira College": "Elmira College",
                            "Erie Community College": "Erie Community College",
                            "Erie Community College City Campus": "Erie Community College City Campus",
                            "Erie Community College South Campus": "Erie Community College South Campus",
                            "Eugene Lang College": "Eugene Lang College",
                            "Excelsior College": "Excelsior College",
                            "Farmingdale State University of New York": "Farmingdale State University of New York",
                            "Finger Lakes Community College": "Finger Lakes Community College",
                            "Five Towns College": "Five Towns College",
                            "Fordham Univ, Fordham College of Liberal Arts": "Fordham Univ, Fordham College of Liberal Arts",
                            "Fordham University": "Fordham University",
                            "Franklin College of Switzerland": "Franklin College of Switzerland",
                            "Friends World College": "Friends World College",
                            "Fulton-Montgomery Community College": "Fulton-Montgomery Community College",
                            "General Theological Seminary": "General Theological Seminary",
                            "Genesee Community College": "Genesee Community College",
                            "Graduate School of Political Management": "Graduate School of Political Management",
                            "Hamilton College": "Hamilton College",
                            "Harlem Hospital Center Physician Asst Prog": "Harlem Hospital Center Physician Asst Prog",
                            "Hartwick College": "Hartwick College",
                            "Hebrew Union College-Jewish Institute of Religion": "Hebrew Union College-Jewish Institute of Religion",
                            "Hebrew Univ Us Stds": "Hebrew Univ Us Stds",
                            "Helene Fuld School of Nursing": "Helene Fuld School of Nursing",
                            "Herbert H Lehman College": "Herbert H Lehman College",
                            "Herkimer County Community College": "Herkimer County Community College",
                            "Hilbert College": "Hilbert College",
                            "Hobart and William Smith Colleges": "Hobart and William Smith Colleges",
                            "Hofstra University": "Hofstra University",
                            "Holy Trinity Orthodox Seminary": "Holy Trinity Orthodox Seminary",
                            "Houghton College": "Houghton College",
                            "Hudson Valley Community College": "Hudson Valley Community College",
                            "Institute of Design and Construction": "Institute of Design and Construction",
                            "Interboro Institute": "Interboro Institute",
                            "Interfaith Medical Center School of Nursing": "Interfaith Medical Center School of Nursing",
                            "Iona College": "Iona College",
                            "Ithaca College": "Ithaca College",
                            "Itri Torah Resrch in": "Itri Torah Resrch in",
                            "Jamestown Business College": "Jamestown Business College",
                            "Jamestown Community College": "Jamestown Community College",
                            "Jamestown Community College": "Jamestown Community College",
                            "Jefferson Community College": "Jefferson Community College",
                            "Jewish Theological Seminary of America": "Jewish Theological Seminary of America",
                            "Julliard School": "Julliard School",
                            "Katharine Gibbs School": "Katharine Gibbs School",
                            "Keuka College": "Keuka College",
                            "Kings College": "Kings College",
                            "Ladycliff College": "Ladycliff College",
                            "Lemoyne College": "Lemoyne College",
                            "LIM College": "LIM College",
                            "Long Island College Hospital School of Nursing": "Long Island College Hospital School of Nursing",
                            "Long Island Univ Schwartz Coll Pharm & Hlth Sci": "Long Island Univ Schwartz Coll Pharm & Hlth Sci",
                            "Long Island University, Brentwood Campus": "Long Island University, Brentwood Campus",
                            "Long Island University, Brooklyn Campus": "Long Island University, Brooklyn Campus",
                            "Long Island University, C. W. Post Campus": "Long Island University, C. W. Post Campus",
                            "Long Island University, Rockland Campus": "Long Island University, Rockland Campus",
                            "Long Island University, Westchester Campus": "Long Island University, Westchester Campus",
                            "Manhattan College": "Manhattan College",
                            "Manhattan School of Music": "Manhattan School of Music",
                            "Manhattanville College": "Manhattanville College",
                            "Mannes College of Music": "Mannes College of Music",
                            "Maria College": "Maria College",
                            "Maria Regina College": "Maria Regina College",
                            "Marist College": "Marist College",
                            "Maryknoll School of Theology": "Maryknoll School of Theology",
                            "Marymount College": "Marymount College",
                            "Marymount Manhattan College": "Marymount Manhattan College",
                            "Mater Dei College": "Mater Dei College",
                            "Medaille College": "Medaille College",
                            "Memorial Hosp SC Rad": "Memorial Hosp SC Rad",
                            "Mercy College": "Mercy College",
                            "Michlalah College": "Michlalah College",
                            "Mohawk Valley Community College": "Mohawk Valley Community College",
                            "Molloy College": "Molloy College",
                            "Monroe Business Institute - New Rochester": "Monroe Business Institute - New Rochester",
                            "Monroe College": "Monroe College",
                            "Monroe Community College": "Monroe Community College",
                            "Mount St Mary College": "Mount St Mary College",
                            "Nassau Community College": "Nassau Community College",
                            "Nazareth College of Rochester": "Nazareth College of Rochester",
                            "New School University": "New School University",
                            "New York City Technical College": "New York City Technical College",
                            "New York Institute of Technology": "New York Institute of Technology",
                            "New York Medical College": "New York Medical College",
                            "New York University": "New York University",
                            "Niagara County Community College": "Niagara County Community College",
                            "Niagara University": "Niagara University",
                            "North Country Community College": "North Country Community College",
                            "Nyack College": "Nyack College",
                            "Olean Business Institute": "Olean Business Institute",
                            "Onondaga Community College": "Onondaga Community College",
                            "Orange County Community College": "Orange County Community College",
                            "Our Lady of Hope Mission Seminary": "Our Lady of Hope Mission Seminary",
                            "Pace University": "Pace University",
                            "Pace University at Pleasantville/Briarcliff": "Pace University at Pleasantville/Briarcliff",
                            "Paul Smith's College of Arts and Science": "Paul Smith's College of Arts and Science",
                            "Polytechnic University": "Polytechnic University",
                            "Polytechnic University": "Polytechnic University",
                            "Practical Bible Training School": "Practical Bible Training School",
                            "Pratt Institute": "Pratt Institute",
                            "Rabbinical Seminary of America": "Rabbinical Seminary of America",
                            "Rensselaer Polytechnic Institute": "Rensselaer Polytechnic Institute",
                            "Roberts Wesleyan College": "Roberts Wesleyan College",
                            "Rochester Business Institute": "Rochester Business Institute",
                            "Rochester Institute of Technology": "Rochester Institute of Technology",
                            "Rockland Community College": "Rockland Community College",
                            "Rogers College": "Rogers College",
                            "Russell Sage College": "Russell Sage College",
                            "Russell Sage College, Junior College of Albany": "Russell Sage College, Junior College of Albany",
                            "Russell Sage College, Junior College of Albany": "Russell Sage College, Junior College of Albany",
                            "Saint Bonaventure University": "Saint Bonaventure University",
                            "Saint John Fisher College": "Saint John Fisher College",
                            "Samaritan Hosp Nrsng": "Samaritan Hosp Nrsng",
                            "Sarah Lawrence College": "Sarah Lawrence College",
                            "Schenectady County Community College": "Schenectady County Community College",
                            "School of Visual Arts": "School of Visual Arts",
                            "Seminary of The Immaculate Conception": "Seminary of The Immaculate Conception",
                            "Siena College": "Siena College",
                            "Skidmore College": "Skidmore College",
                            "St Bonaventure University": "St Bonaventure University",
                            "St Francis College": "St Francis College",
                            "St John Fisher College": "St John Fisher College",
                            "St Johns University": "St Johns University",
                            "St Johns University, Staten Island Campus": "St Johns University, Staten Island Campus",
                            "St Josephs College - Suffolk Branch, Patchogue": "St Josephs College - Suffolk Branch, Patchogue",
                            "St Josephs College, Brooklyn": "St Josephs College, Brooklyn",
                            "St Lawrence University": "St Lawrence University",
                            "St Thomas Aquinas College": "St Thomas Aquinas College",
                            "State Univ of New York, Coll of Tech at Alfred": "State Univ of New York, Coll of Tech at Alfred",
                            "State Univ of New York, Coll of Tech at Canton": "State Univ of New York, Coll of Tech at Canton",
                            "State Univ of New York, Coll of Tech at Delhi": "State Univ of New York, Coll of Tech at Delhi",
                            "State Univ of New York, Coll of Tech Farmingdale": "State Univ of New York, Coll of Tech Farmingdale",
                            "State Univ of New York, College at Brockport": "State Univ of New York, College at Brockport",
                            "State Univ of New York, College at Cortland": "State Univ of New York, College at Cortland",
                            "State Univ of New York, College at Geneseo": "State Univ of New York, College at Geneseo",
                            "State Univ of New York, College at Geneseo": "State Univ of New York, College at Geneseo",
                            "State Univ of New York, College at New Paltz": "State Univ of New York, College at New Paltz",
                            "State Univ of New York, College at Old Westbury": "State Univ of New York, College at Old Westbury",
                            "State Univ of New York, College at Oneonta": "State Univ of New York, College at Oneonta",
                            "State Univ of New York, College at Oswego": "State Univ of New York, College at Oswego",
                            "State Univ of New York, College at Plattsburgh": "State Univ of New York, College at Plattsburgh",
                            "State Univ of New York, College at Potsdam": "State Univ of New York, College at Potsdam",
                            "State Univ of New York, College at Purchase": "State Univ of New York, College at Purchase",
                            "State Univ of New York, College of Fredonia": "State Univ of New York, College of Fredonia",
                            "State Univ of New York, Empire State College": "State Univ of New York, Empire State College",
                            "State Univ of New York, Fashion Inst of Technology": "State Univ of New York, Fashion Inst of Technology",
                            "State Univ of New York, Health Sci Ctr at Brooklyn": "State Univ of New York, Health Sci Ctr at Brooklyn",
                            "State Univ of New York, Health Sci Ctr at Syracuse": "State Univ of New York, Health Sci Ctr at Syracuse",
                            "State Univ of New York, Inst of Tech at Utica/Rome": "State Univ of New York, Inst of Tech at Utica/Rome",
                            "State Univ of New York, Purchase College": "State Univ of New York, Purchase College",
                            "State Univ of New York, State Univ at Albany": "State Univ of New York, State Univ at Albany",
                            "State Univ of New York, State Univ at Binghamton": "State Univ of New York, State Univ at Binghamton",
                            "State Univ of New York, State Univ at Buffalo": "State Univ of New York, State Univ at Buffalo",
                            "State Univ of New York, State Univ at Stony Brook": "State Univ of New York, State Univ at Stony Brook",
                            "State Univ of New York, Univ at Buffalo": "State Univ of New York, Univ at Buffalo",
                            "State Univ of NY, Coll of Ag & Tech at Cobleskill": "State Univ of NY, Coll of Ag & Tech at Cobleskill",
                            "State Univ of NY, Coll of Ag & Tech at Morrisville": "State Univ of NY, Coll of Ag & Tech at Morrisville",
                            "State Univ of NY, Coll of Ceramics at Alfred Univ": "State Univ of NY, Coll of Ceramics at Alfred Univ",
                            "State Univ of NY, Coll of Env Sci & Forestry": "State Univ of NY, Coll of Env Sci & Forestry",
                            "State Univ of NY, Maritime Coll at Fort Schuyler": "State Univ of NY, Maritime Coll at Fort Schuyler",
                            "Suffolk County Community College - Eastern Campus": "Suffolk County Community College - Eastern Campus",
                            "Suffolk County Community College - Western Campus": "Suffolk County Community College - Western Campus",
                            "Suffolk County Community College Ammer": "Suffolk County Community College Ammer",
                            "Sullivan County Community College, Loch Sheldrake": "Sullivan County Community College, Loch Sheldrake",
                            "Syracuse University": "Syracuse University",
                            "Technical Career Institutes": "Technical Career Institutes",
                            "Tel Aviv University": "Tel Aviv University",
                            "The Sage Colleges": "The Sage Colleges",
                            "Tobe-Coburn School for Fashion Careers": "Tobe-Coburn School for Fashion Careers",
                            "Tompkins-Cortland Community College": "Tompkins-Cortland Community College",
                            "Touro College": "Touro College",
                            "Traphagen School of Fashion": "Traphagen School of Fashion",
                            "Trocaire College": "Trocaire College",
                            "Ulster County Community College": "Ulster County Community College",
                            "Union College": "Union College",
                            "United States Merchant Marine Academy": "United States Merchant Marine Academy",
                            "United States Military Academy": "United States Military Academy",
                            "University College of Pace University": "University College of Pace University",
                            "University Maryland Munich": "University Maryland Munich",
                            "University of Rochester": "University of Rochester",
                            "Utica College": "Utica College",
                            "Vassar College": "Vassar College",
                            "Vaughn College of Aeronautics & Technology": "Vaughn College of Aeronautics & Technology",
                            "Villa Maria College of Buffalo": "Villa Maria College of Buffalo",
                            "Wadhams Hall": "Wadhams Hall",
                            "Wagner College": "Wagner College",
                            "Webb Institute of Naval Architecture": "Webb Institute of Naval Architecture",
                            "Wells College": "Wells College",
                            "Westchester Community College": "Westchester Community College",
                            "William Smith College": "William Smith College",
                            "Wood School": "Wood School",
                            "Yeshiva University, New York City": "Yeshiva University, New York City",
                            "Other": "Other"
                        };
                        break;
                    case "Ohio":
                        newOpts = {
                            "": "",
                            "Air Force Institute of Technology": "Air Force Institute of Technology",
                            "Antioch University": "Antioch University",
                            "Art Academy of Cincinnati": "Art Academy of Cincinnati",
                            "Ashland University": "Ashland University",
                            "Baldwin-Wallace College": "Baldwin-Wallace College",
                            "Belmont Technical College": "Belmont Technical College",
                            "Bliss College": "Bliss College",
                            "Bluffton College": "Bluffton College",
                            "Borromeo College of Ohio": "Borromeo College of Ohio",
                            "Bowling Green State University": "Bowling Green State University",
                            "Bowling Green State University - Firelands": "Bowling Green State University - Firelands",
                            "Capital University": "Capital University",
                            "Case Western Reserve University-Generic": "Case Western Reserve University-Generic",
                            "Cedarville College": "Cedarville College",
                            "Central Ohio Technical College": "Central Ohio Technical College",
                            "Central State University": "Central State University",
                            "Chatfield College": "Chatfield College",
                            "Cincinnati Christian University": "Cincinnati Christian University",
                            "Cincinnati Technical College": "Cincinnati Technical College",
                            "Circleville Bible College": "Circleville Bible College",
                            "Clark State Community College": "Clark State Community College",
                            "Cleveland Institute of Art": "Cleveland Institute of Art",
                            "Cleveland Institute of Music": "Cleveland Institute of Music",
                            "Cleveland State University": "Cleveland State University",
                            "College of Mount St Joseph": "College of Mount St Joseph",
                            "College of Wooster": "College of Wooster",
                            "Columbus College of Art and Design": "Columbus College of Art and Design",
                            "Columbus State Community College": "Columbus State Community College",
                            "Cuyahoga Community College, Eastern Campus": "Cuyahoga Community College, Eastern Campus",
                            "Cuyahoga Community College, Metropolitan Campus": "Cuyahoga Community College, Metropolitan Campus",
                            "Cuyahoga Community College, Western Campus": "Cuyahoga Community College, Western Campus",
                            "David N Myers College": "David N Myers College",
                            "Davis College": "Davis College",
                            "Denison University": "Denison University",
                            "Devry Institute of Technology": "Devry Institute of Technology",
                            "Devry Institute of Technology OH": "Devry Institute of Technology OH",
                            "Eastern Gateway Community College": "Eastern Gateway Community College",
                            "Edison State Community College": "Edison State Community College",
                            "Franciscan University of Steubenville": "Franciscan University of Steubenville",
                            "Franklin University": "Franklin University",
                            "Gods Bible School and College": "Gods Bible School and College",
                            "Heidelberg College": "Heidelberg College",
                            "Hiram College": "Hiram College",
                            "Hocking Technical College": "Hocking Technical College",
                            "James A Rhodes State College": "James A Rhodes State College",
                            "John Carroll University": "John Carroll University",
                            "Kent State University": "Kent State University",
                            "Kenyon College": "Kenyon College",
                            "Kettering College of Medical Arts": "Kettering College of Medical Arts",
                            "Lake Erie College": "Lake Erie College",
                            "Lakeland Community College": "Lakeland Community College",
                            "Lorain County Community College": "Lorain County Community College",
                            "Lourdes College": "Lourdes College",
                            "Malone College": "Malone College",
                            "Marietta College": "Marietta College",
                            "Marion Technical College": "Marion Technical College",
                            "Medical College of Ohio": "Medical College of Ohio",
                            "Miami University": "Miami University",
                            "Miami University Regional Campuses, Hamilton": "Miami University Regional Campuses, Hamilton",
                            "Miami University Regional Campuses, Middletown": "Miami University Regional Campuses, Middletown",
                            "Miami-Jacobs Junior Business College": "Miami-Jacobs Junior Business College",
                            "Mount Union College": "Mount Union College",
                            "Mount Vernon Nazarene College": "Mount Vernon Nazarene College",
                            "Muskingum Area Technical College": "Muskingum Area Technical College",
                            "Muskingum College": "Muskingum College",
                            "Newark Technical College": "Newark Technical College",
                            "North Central Technical College": "North Central Technical College",
                            "Northwest State Community College": "Northwest State Community College",
                            "Notre Dame College Ohio": "Notre Dame College Ohio",
                            "Oberlin College": "Oberlin College",
                            "Ohio College of Podiatric Medicine": "Ohio College of Podiatric Medicine",
                            "Ohio Dominican College": "Ohio Dominican College",
                            "Ohio Northern University": "Ohio Northern University",
                            "Ohio State Univ Agricultural Technical Institute": "Ohio State Univ Agricultural Technical Institute",
                            "Ohio State University": "Ohio State University",
                            "Ohio University": "Ohio University",
                            "Ohio Wesleyan University": "Ohio Wesleyan University",
                            "Otterbein College": "Otterbein College",
                            "Owens Community College": "Owens Community College",
                            "Pontifical College Josephinum": "Pontifical College Josephinum",
                            "Rabbinical College of Telshe": "Rabbinical College of Telshe",
                            "Raymond Walters College, University of Cincinnati": "Raymond Walters College, University of Cincinnati",
                            "Shawnee State University": "Shawnee State University",
                            "Sinclair Community College": "Sinclair Community College",
                            "Southern Ohio College": "Southern Ohio College",
                            "Southern State Community College": "Southern State Community College",
                            "Stark Technical College": "Stark Technical College",
                            "Terra Community College": "Terra Community College",
                            "The Defiance College": "The Defiance College",
                            "The Union Institute": "The Union Institute",
                            "The University of Findlay": "The University of Findlay",
                            "Tiffin University": "Tiffin University",
                            "Trumbull Memorial Hosp": "Trumbull Memorial Hosp",
                            "Univ of Northwestern Ohio": "Univ of Northwestern Ohio",
                            "University of Akron": "University of Akron",
                            "University of Cincinnati": "University of Cincinnati",
                            "University of Dayton": "University of Dayton",
                            "University of Rio Grande": "University of Rio Grande",
                            "University of Toledo": "University of Toledo",
                            "Urbana University": "Urbana University",
                            "Ursuline College": "Ursuline College",
                            "Walsh College": "Walsh College",
                            "Washington State Community College": "Washington State Community College",
                            "Wayne General and Technical College": "Wayne General and Technical College",
                            "Wilberforce University": "Wilberforce University",
                            "Wilmington College": "Wilmington College",
                            "Wittenberg University": "Wittenberg University",
                            "Wright State University": "Wright State University",
                            "Wright State University - Celina": "Wright State University - Celina",
                            "Xavier University": "Xavier University",
                            "Youngstown State University": "Youngstown State University",
                            "Other": "Other"
                        };
                        break;
                    case "Oklahoma":
                        newOpts = {
                            "": "",
                            "Bacone College": "Bacone College",
                            "Cameron University": "Cameron University",
                            "Carl Albert State College": "Carl Albert State College",
                            "Connors State College": "Connors State College",
                            "East Central University": "East Central University",
                            "Eastern Oklahoma State College": "Eastern Oklahoma State College",
                            "El Reno Junior College": "El Reno Junior College",
                            "Langston University": "Langston University",
                            "Mid-America Christian Univesity": "Mid-America Christian Univesity",
                            "Murray State College": "Murray State College",
                            "North Oklahoma College": "North Oklahoma College",
                            "Northeastern Oklahoma A & M College": "Northeastern Oklahoma A & M College",
                            "Northeastern State University": "Northeastern State University",
                            "Northern Oklahoma College": "Northern Oklahoma College",
                            "Northwestern Oklahoma State University": "Northwestern Oklahoma State University",
                            "Oklahoma Baptist University": "Oklahoma Baptist University",
                            "Oklahoma Christian University of Science and Arts": "Oklahoma Christian University of Science and Arts",
                            "Oklahoma City Community College": "Oklahoma City Community College",
                            "Oklahoma City University": "Oklahoma City University",
                            "Oklahoma Junior College": "Oklahoma Junior College",
                            "Oklahoma Junior College of Business & Technology": "Oklahoma Junior College of Business & Technology",
                            "Oklahoma Panhandle State University": "Oklahoma Panhandle State University",
                            "Oklahoma State University, Oklahoma City": "Oklahoma State University, Oklahoma City",
                            "Oklahoma State University, Okmulgee": "Oklahoma State University, Okmulgee",
                            "Oklahoma Wesleyan University": "Oklahoma Wesleyan University",
                            "Oral Roberts University": "Oral Roberts University",
                            "OSU Animal Disease Diagnostic Lab": "OSU Animal Disease Diagnostic Lab",
                            "Phillips University": "Phillips University",
                            "Redlands Community College": "Redlands Community College",
                            "Rogers University": "Rogers University",
                            "Rose State College": "Rose State College",
                            "Saint Gregorys College": "Saint Gregorys College",
                            "Seminole State College": "Seminole State College",
                            "Southeastern Oklahoma State University": "Southeastern Oklahoma State University",
                            "Southern Nazarene University": "Southern Nazarene University",
                            "Southwestern Oklahoma State University": "Southwestern Oklahoma State University",
                            "Southwestern Oklahoma State University at Sayre": "Southwestern Oklahoma State University at Sayre",
                            "Tulsa Community College": "Tulsa Community College",
                            "University of Central Oklahoma": "University of Central Oklahoma",
                            "University of Oklahoma": "University of Oklahoma",
                            "University of Science and Arts of Oklahoma": "University of Science and Arts of Oklahoma",
                            "University of Tulsa": "University of Tulsa",
                            "Western Oklahoma State College": "Western Oklahoma State College",
                            "Other": "Other"
                        };
                        break;
                    case "Oregon":
                        newOpts = {
                            "": "",
                            "Blue Mountain Community College": "Blue Mountain Community College",
                            "Cascade College": "Cascade College",
                            "Central Oregon Community College": "Central Oregon Community College",
                            "Chemeketa Community College": "Chemeketa Community College",
                            "Clackamas Community College": "Clackamas Community College",
                            "Clatsop Community College": "Clatsop Community College",
                            "Columbia Christian College": "Columbia Christian College",
                            "Columbia Gorge Community College": "Columbia Gorge Community College",
                            "Concordia University": "Concordia University",
                            "Devry University": "Devry University",
                            "Division of Continuing Education": "Division of Continuing Education",
                            "Eastern Oregon University": "Eastern Oregon University",
                            "Ecola Bible School": "Ecola Bible School",
                            "Eugene Bible College": "Eugene Bible College",
                            "George Fox University": "George Fox University",
                            "Heald College": "Heald College",
                            "Judson Baptist College": "Judson Baptist College",
                            "Klamath Community College": "Klamath Community College",
                            "Lane Community College": "Lane Community College",
                            "Lewis and Clark College and Law School": "Lewis and Clark College and Law School",
                            "Linfield College": "Linfield College",
                            "Linn-Benton Community College": "Linn-Benton Community College",
                            "Marylhurst University": "Marylhurst University",
                            "Mount Angel Seminary": "Mount Angel Seminary",
                            "MT Angel College": "MT Angel College",
                            "MT Hood Community College": "MT Hood Community College",
                            "Multnomah Bible College & Seminary": "Multnomah Bible College & Seminary",
                            "Multnomah College": "Multnomah College",
                            "Northwest Christian College": "Northwest Christian College",
                            "Oregon Coast Comunity College": "Oregon Coast Comunity College",
                            "Oregon College of Art & Craft": "Oregon College of Art & Craft",
                            "Oregon Graduate Institute": "Oregon Graduate Institute",
                            "Oregon Health Sciences University": "Oregon Health Sciences University",
                            "Oregon Institute of Technology": "Oregon Institute of Technology",
                            "Oregon Polytechnic Institute": "Oregon Polytechnic Institute",
                            "Oregon State University": "Oregon State University",
                            "Pacific Northwest College of Art": "Pacific Northwest College of Art",
                            "Pacific University": "Pacific University",
                            "Portland Community College": "Portland Community College",
                            "Portland State University": "Portland State University",
                            "Reed College": "Reed College",
                            "Rogue Community College": "Rogue Community College",
                            "Southern Oregon University": "Southern Oregon University",
                            "Southwestern Oregon Community College": "Southwestern Oregon Community College",
                            "The Art Institute of Portland": "The Art Institute of Portland",
                            "Tillamook Bay Community College": "Tillamook Bay Community College",
                            "Treasure Valley Community College": "Treasure Valley Community College",
                            "Umpqua Community College": "Umpqua Community College",
                            "University of Oregon": "University of Oregon",
                            "University of Portland": "University of Portland",
                            "University of The Nations": "University of The Nations",
                            "University of Western States": "University of Western States",
                            "Warner Pacific College": "Warner Pacific College",
                            "Western Evangelical Seminary": "Western Evangelical Seminary",
                            "Western Oregon University": "Western Oregon University",
                            "Western Seminary": "Western Seminary",
                            "Western States Chiropractic College": "Western States Chiropractic College",
                            "Willamette University": "Willamette University",
                            "Other": "Other"
                        };
                        break;
                    case "Pennsylvania":
                        newOpts = {
                            "": "",
                            "Academy of The New Church": "Academy of The New Church",
                            "Albright College": "Albright College",
                            "Allegheny College": "Allegheny College",
                            "Alvernia College": "Alvernia College",
                            "Arcadia University": "Arcadia University",
                            "Art Institute of Philadelphia": "Art Institute of Philadelphia",
                            "Art Institute of Pittsburgh": "Art Institute of Pittsburgh",
                            "Baptist Bible College of Pennsylvania": "Baptist Bible College of Pennsylvania",
                            "Biblical Theological Seminary": "Biblical Theological Seminary",
                            "Bloomsburg University of Pennsylvania": "Bloomsburg University of Pennsylvania",
                            "Bryn Athyn College of The New Church": "Bryn Athyn College of The New Church",
                            "Bryn Mawr College": "Bryn Mawr College",
                            "Bucknell University": "Bucknell University",
                            "Bucks County Community College": "Bucks County Community College",
                            "Butler County Community College": "Butler County Community College",
                            "Cabrini College": "Cabrini College",
                            "California University of Pennsylvania": "California University of Pennsylvania",
                            "Carlow College": "Carlow College",
                            "Carnegie Mellon University": "Carnegie Mellon University",
                            "Cedar Crest College": "Cedar Crest College",
                            "Chatham College": "Chatham College",
                            "Chestnut Hill College": "Chestnut Hill College",
                            "Cheyney University of Pennsylvania": "Cheyney University of Pennsylvania",
                            "Chubb Institute /Keystone": "Chubb Institute /Keystone",
                            "Clarion University of Pennsylvania": "Clarion University of Pennsylvania",
                            "College Misericordia": "College Misericordia",
                            "Combs College of Music": "Combs College of Music",
                            "Community College of Alleghany County - North": "Community College of Alleghany County - North",
                            "Community College of Allegheny County - Allegheny": "Community College of Allegheny County - Allegheny",
                            "Community College of Allegheny County - South": "Community College of Allegheny County - South",
                            "Community College of Beaver County": "Community College of Beaver County",
                            "Community College of Philadelphia": "Community College of Philadelphia",
                            "Conemaugh Valley Mem High School": "Conemaugh Valley Mem High School",
                            "Curtis Institute of Music": "Curtis Institute of Music",
                            "Delaware County Community College": "Delaware County Community College",
                            "Delaware Valley College of Science and Agriculture": "Delaware Valley College of Science and Agriculture",
                            "DeSales University": "DeSales University",
                            "Dickinson College": "Dickinson College",
                            "Drexel University": "Drexel University",
                            "Duffs Business Institute": "Duffs Business Institute",
                            "Duquesne University": "Duquesne University",
                            "East Stroudsbrg University of Pennsylvania": "East Stroudsbrg University of Pennsylvania",
                            "Eastern College": "Eastern College",
                            "Edinboro University of Pennsylvania": "Edinboro University of Pennsylvania",
                            "Education Direct": "Education Direct",
                            "Elizabethtown College": "Elizabethtown College",
                            "Erie Business Center": "Erie Business Center",
                            "Franklin and Marshall College": "Franklin and Marshall College",
                            "Gannon University": "Gannon University",
                            "Geneva College": "Geneva College",
                            "Gettysburg College": "Gettysburg College",
                            "Gratz College": "Gratz College",
                            "Grove City College": "Grove City College",
                            "Gwynedd-Mercy College": "Gwynedd-Mercy College",
                            "Hahnemann University": "Hahnemann University",
                            "Harcum Junior College": "Harcum Junior College",
                            "Harrisburg Area Community College": "Harrisburg Area Community College",
                            "Haverford College": "Haverford College",
                            "Holy Family College": "Holy Family College",
                            "ICS Center for Degree Studies": "ICS Center for Degree Studies",
                            "Immaculata College": "Immaculata College",
                            "Indiana University of Pennsylvania": "Indiana University of Pennsylvania",
                            "Juniata College": "Juniata College",
                            "Keystone Junior College": "Keystone Junior College",
                            "Kings College": "Kings College",
                            "Kutztown University of Pennsylvania": "Kutztown University of Pennsylvania",
                            "Lackawanna Junior College": "Lackawanna Junior College",
                            "Lafayette College": "Lafayette College",
                            "Lancaster Bible College": "Lancaster Bible College",
                            "Laroche College": "Laroche College",
                            "Lasalle University": "Lasalle University",
                            "Lebanon Valley College": "Lebanon Valley College",
                            "Lehigh Carbon Community College": "Lehigh Carbon Community College",
                            "Lehigh University": "Lehigh University",
                            "Lincoln Tech Institute Philadelphia": "Lincoln Tech Institute Philadelphia",
                            "Lincoln Technical Institute": "Lincoln Technical Institute",
                            "Lincoln University Commonwealth Pennsylvania": "Lincoln University Commonwealth Pennsylvania",
                            "Lock Haven Universty of Pennsylvania": "Lock Haven Universty of Pennsylvania",
                            "Luzerne County Community College": "Luzerne County Community College",
                            "Lycoming College": "Lycoming College",
                            "Manna Bible Institute": "Manna Bible Institute",
                            "Manor Junior College": "Manor Junior College",
                            "Mansfield University of Pennsylvania": "Mansfield University of Pennsylvania",
                            "Marywood College": "Marywood College",
                            "Mercyhurst College": "Mercyhurst College",
                            "Messiah College": "Messiah College",
                            "Millersville University of Pennsylvania": "Millersville University of Pennsylvania",
                            "Montgomery County Community College": "Montgomery County Community College",
                            "Moore College of Art": "Moore College of Art",
                            "Moravian College": "Moravian College",
                            "Mount Aloysius Junior College": "Mount Aloysius Junior College",
                            "Muhlenberg College": "Muhlenberg College",
                            "Neumann College": "Neumann College",
                            "New Castle Business School": "New Castle Business School",
                            "Northampton County Area Community College": "Northampton County Area Community College",
                            "Northeastern Christian Junior College": "Northeastern Christian Junior College",
                            "Peirce Junior College": "Peirce Junior College",
                            "Pennsylvania College of Optometry": "Pennsylvania College of Optometry",
                            "Pennsylvania College of Technology": "Pennsylvania College of Technology",
                            "Pennsylvania Highlands CC": "Pennsylvania Highlands CC",
                            "Pennsylvania Institute of Technology": "Pennsylvania Institute of Technology",
                            "Philadelphia College of Bible": "Philadelphia College of Bible",
                            "Philadelphia College of Osteopatic Medicine": "Philadelphia College of Osteopatic Medicine",
                            "Philadelphia College Pharmacy and Science": "Philadelphia College Pharmacy and Science",
                            "Philadelphia University": "Philadelphia University",
                            "Pinebrook Junior College": "Pinebrook Junior College",
                            "Pittsburgh Technical Institute": "Pittsburgh Technical Institute",
                            "Point Park College": "Point Park College",
                            "Reading Area Community College": "Reading Area Community College",
                            "Robert Morris College Pennsylvania": "Robert Morris College Pennsylvania",
                            "Rosemont College": "Rosemont College",
                            "School of Hotel & Restaurant Management": "School of Hotel & Restaurant Management",
                            "Seton Hill College": "Seton Hill College",
                            "Shippensburg University of Pennsylvania": "Shippensburg University of Pennsylvania",
                            "Slippery Rock University of Pennsylvania": "Slippery Rock University of Pennsylvania",
                            "Spring Garden College": "Spring Garden College",
                            "St Charles Borromeo Seminary": "St Charles Borromeo Seminary",
                            "St Francis University": "St Francis University",
                            "St Josephs University": "St Josephs University",
                            "St Vincent College": "St Vincent College",
                            "St Vincent Seminary": "St Vincent Seminary",
                            "Susquehanna University": "Susquehanna University",
                            "Swarthmore College": "Swarthmore College",
                            "Temple University": "Temple University",
                            "The American College": "The American College",
                            "The Pennsylvania State University": "The Pennsylvania State University",
                            "Thiel College": "Thiel College",
                            "Thomas Jefferson University": "Thomas Jefferson University",
                            "United States Army War College": "United States Army War College",
                            "United Wesleyan College": "United Wesleyan College",
                            "University of Pennsylvania": "University of Pennsylvania",
                            "University of Pittsburgh": "University of Pittsburgh",
                            "University of Sciences in Philadelphia": "University of Sciences in Philadelphia",
                            "University of Scranton": "University of Scranton",
                            "University of The Arts": "University of The Arts",
                            "University Pennsylvania College General Studies": "University Pennsylvania College General Studies",
                            "University Pennsylvania Dent Medical": "University Pennsylvania Dent Medical",
                            "Ursinus College": "Ursinus College",
                            "Valley Forge Christian College": "Valley Forge Christian College",
                            "Valley Forge Military Junior College": "Valley Forge Military Junior College",
                            "Villa Maria College Pennsylvania": "Villa Maria College Pennsylvania",
                            "Villa Maria Hous Std": "Villa Maria Hous Std",
                            "Villanova University": "Villanova University",
                            "Washington and Jefferson College": "Washington and Jefferson College",
                            "Waynesburg College": "Waynesburg College",
                            "West Chester University of Pennsylvania": "West Chester University of Pennsylvania",
                            "Westminster College Pennsylvania": "Westminster College Pennsylvania",
                            "Westminster Theological Seminary": "Westminster Theological Seminary",
                            "Westmoreland County Community College": "Westmoreland County Community College",
                            "Widener University": "Widener University",
                            "Wilkes University": "Wilkes University",
                            "Wilson College": "Wilson College",
                            "York College of Pennsylvania": "York College of Pennsylvania",
                            "Other": "Other"
                        };
                        break;
                    case "Puerto Rico":
                        newOpts = {
                            "": "",
                            "Bayamon Central University": "Bayamon Central University",
                            "Caribbean Univ College": "Caribbean Univ College",
                            "Catholic University of Puerto Rico": "Catholic University of Puerto Rico",
                            "Centro de Estudios Multidisciplinarios": "Centro de Estudios Multidisciplinarios",
                            "Colegio Regional De Bayamon": "Colegio Regional De Bayamon",
                            "Escuela de Artes Plasticas": "Escuela de Artes Plasticas",
                            "Inter American Univ Puerto Rico, Aguadilla Regnl": "Inter American Univ Puerto Rico, Aguadilla Regnl",
                            "Inter American Univ Puerto Rico, Arecibo Univ Coll": "Inter American Univ Puerto Rico, Arecibo Univ Coll",
                            "Inter American Univ Puerto Rico, Barranquitas Reg": "Inter American Univ Puerto Rico, Barranquitas Reg",
                            "Inter American Univ Puerto Rico, Bayamon Univ Coll": "Inter American Univ Puerto Rico, Bayamon Univ Coll",
                            "Inter American Univ Puerto Rico, Fajardo Campus": "Inter American Univ Puerto Rico, Fajardo Campus",
                            "Inter American Univ Puerto Rico, Guayama Campus": "Inter American Univ Puerto Rico, Guayama Campus",
                            "Inter American Univ Puerto Rico, Metro Campus": "Inter American Univ Puerto Rico, Metro Campus",
                            "Inter American Univ Puerto Rico, Ponce Campus": "Inter American Univ Puerto Rico, Ponce Campus",
                            "Inter American Univ Puerto Rico, San German": "Inter American Univ Puerto Rico, San German",
                            "Inter American Univ Puerto Rico, Sch of Optometry": "Inter American Univ Puerto Rico, Sch of Optometry",
                            "Inter American Univ Puerto Rico, School of Law": "Inter American Univ Puerto Rico, School of Law",
                            "International Christian University": "International Christian University",
                            "Metropolitan University": "Metropolitan University",
                            "Polytechnic University, Puerto Rico": "Polytechnic University, Puerto Rico",
                            "Puerto Rico Junior College": "Puerto Rico Junior College",
                            "Turabo University": "Turabo University",
                            "Univ of Puerto Rico, Aguadilla Regional College": "Univ of Puerto Rico, Aguadilla Regional College",
                            "Univ of Puerto Rico, Arecibo Tech Univ Coll": "Univ of Puerto Rico, Arecibo Tech Univ Coll",
                            "Univ of Puerto Rico, Bayamon Tech Univ Coll": "Univ of Puerto Rico, Bayamon Tech Univ Coll",
                            "Univ of Puerto Rico, Carolina Regional College": "Univ of Puerto Rico, Carolina Regional College",
                            "Univ of Puerto Rico, Cayey Univ College": "Univ of Puerto Rico, Cayey Univ College",
                            "Univ of Puerto Rico, Humacao Univ College": "Univ of Puerto Rico, Humacao Univ College",
                            "Univ of Puerto Rico, La Montana Regional College": "Univ of Puerto Rico, La Montana Regional College",
                            "Univ of Puerto Rico, Ponce Technological Univ Coll": "Univ of Puerto Rico, Ponce Technological Univ Coll",
                            "Universidad De Puerto Rico En Cayey": "Universidad De Puerto Rico En Cayey",
                            "Universidad Del Sagrado Corazon": "Universidad Del Sagrado Corazon",
                            "University of Puerto Rico, Mayaguez Campus": "University of Puerto Rico, Mayaguez Campus",
                            "University of Puerto Rico, Medical Sciences Campus": "University of Puerto Rico, Medical Sciences Campus",
                            "University of Puerto Rico, Rio Piedras Campus": "University of Puerto Rico, Rio Piedras Campus",
                            "University of The Sacred Heart": "University of The Sacred Heart",
                            "Other": "Other"
                        };
                        break;
                    case "Rhode Island":
                        newOpts = {
                            "": "",
                            "Brown University": "Brown University",
                            "Bryant College": "Bryant College",
                            "Community College of Rhode Island": "Community College of Rhode Island",
                            "Johnson & Wales University": "Johnson & Wales University",
                            "Katherine Gibbs School": "Katherine Gibbs School",
                            "New England Institute of Technology": "New England Institute of Technology",
                            "Providence College": "Providence College",
                            "Rhode Island College": "Rhode Island College",
                            "Rhode Island School of Design": "Rhode Island School of Design",
                            "Roger Williams College": "Roger Williams College",
                            "Salve Regina - The Newport College": "Salve Regina - The Newport College",
                            "United States Naval War College": "United States Naval War College",
                            "University of Rhode Island": "University of Rhode Island",
                            "Other": "Other"
                        };
                        break;
                    case "South Carolina":
                        newOpts = {
                            "": "",
                            "Aiken Technical College": "Aiken Technical College",
                            "Allen University": "Allen University",
                            "Anderson College": "Anderson College",
                            "Baptist College at Charleston": "Baptist College at Charleston",
                            "Beaufort Technical College": "Beaufort Technical College",
                            "Benedict College": "Benedict College",
                            "Bob Jones University": "Bob Jones University",
                            "Central Carolina Technical College": "Central Carolina Technical College",
                            "Central Wesleyan College": "Central Wesleyan College",
                            "Charleston Southern University": "Charleston Southern University",
                            "Chesterfield-Marlboro Technical College": "Chesterfield-Marlboro Technical College",
                            "Citadel Evening College": "Citadel Evening College",
                            "Claflin University": "Claflin University",
                            "Clemson University": "Clemson University",
                            "Clinton Junior College": "Clinton Junior College",
                            "Coastal Carolina University": "Coastal Carolina University",
                            "Coker College": "Coker College",
                            "College of Charleston": "College of Charleston",
                            "Columbia College South Carolina": "Columbia College South Carolina",
                            "Columbia Junior College of Business": "Columbia Junior College of Business",
                            "Columiba International University": "Columiba International University",
                            "Converse College": "Converse College",
                            "Denmark Technical College": "Denmark Technical College",
                            "Erskine College": "Erskine College",
                            "Florence Darlington Technical College": "Florence Darlington Technical College",
                            "Francis Marion College": "Francis Marion College",
                            "Furman University": "Furman University",
                            "Greenville Technical College": "Greenville Technical College",
                            "Horry-Georgetown Tecnical College Conway": "Horry-Georgetown Tecnical College Conway",
                            "Lander University": "Lander University",
                            "Limestone College": "Limestone College",
                            "Medical University of South Carolina": "Medical University of South Carolina",
                            "Midlands Technical College - Beltline": "Midlands Technical College - Beltline",
                            "Morris College": "Morris College",
                            "Newberry College": "Newberry College",
                            "North Greenville College": "North Greenville College",
                            "Northeastern Technical College": "Northeastern Technical College",
                            "Orangeburg-Calhoun Technical College": "Orangeburg-Calhoun Technical College",
                            "Piedmont Technical College": "Piedmont Technical College",
                            "Presbyterian College": "Presbyterian College",
                            "South Carolina State University": "South Carolina State University",
                            "Southern Methodist College": "Southern Methodist College",
                            "Southern Wesleyan University": "Southern Wesleyan University",
                            "Spartanburg Methodist College": "Spartanburg Methodist College",
                            "Spartanburg Technical College": "Spartanburg Technical College",
                            "Technical College of The Lowcountry": "Technical College of The Lowcountry",
                            "The Citadel": "The Citadel",
                            "Tri-County Technical College": "Tri-County Technical College",
                            "Trident Technical College Main": "Trident Technical College Main",
                            "Trident Technical College Palmer": "Trident Technical College Palmer",
                            "Univ of South Carolina, Coastal Carolina College": "Univ of South Carolina, Coastal Carolina College",
                            "University of South Carolina": "University of South Carolina",
                            "University of South Carolina at Aiken": "University of South Carolina at Aiken",
                            "University of South Carolina at Beaufort": "University of South Carolina at Beaufort",
                            "University of South Carolina at Lancaster": "University of South Carolina at Lancaster",
                            "University of South Carolina at Salkehatchie": "University of South Carolina at Salkehatchie",
                            "University of South Carolina at Spartanburg": "University of South Carolina at Spartanburg",
                            "University of South Carolina at Sumter": "University of South Carolina at Sumter",
                            "University of South Carolina at Union": "University of South Carolina at Union",
                            "Voorhees College": "Voorhees College",
                            "Williamsburg Technical College": "Williamsburg Technical College",
                            "Winthrop University": "Winthrop University",
                            "Wofford College": "Wofford College",
                            "York Technical College": "York Technical College",
                            "Other": "Other"
                        };
                        break;
                    case "South Dakota":
                        newOpts = {
                            "": "",
                            "Augustana College": "Augustana College",
                            "Black Hills State University": "Black Hills State University",
                            "Dakota State University": "Dakota State University",
                            "Dakota Wesleyan University": "Dakota Wesleyan University",
                            "Huron College": "Huron College",
                            "Kilian Community College": "Kilian Community College",
                            "Lake Area Vocational-Technical Institute": "Lake Area Vocational-Technical Institute",
                            "Mitchell Technical Institute": "Mitchell Technical Institute",
                            "MT Marty College": "MT Marty College",
                            "National American University": "National American University",
                            "Nettleton College": "Nettleton College",
                            "North American Baptist Seminary": "North American Baptist Seminary",
                            "Northern State University": "Northern State University",
                            "Oglala Lakota College": "Oglala Lakota College",
                            "Presentation College": "Presentation College",
                            "Si Tanka University-Huron Campus": "Si Tanka University-Huron Campus",
                            "Sinte Gleska University": "Sinte Gleska University",
                            "Sisseton-Wahpeton Community College": "Sisseton-Wahpeton Community College",
                            "South Dakota School of Mines and Technology": "South Dakota School of Mines and Technology",
                            "South Dakota State University": "South Dakota State University",
                            "Southeast Vocational-Technical Institute": "Southeast Vocational-Technical Institute",
                            "University of Sioux Falls": "University of Sioux Falls",
                            "University of South Dakota, Vermillion": "University of South Dakota, Vermillion",
                            "Western Dakota Vocational-Technical Institute": "Western Dakota Vocational-Technical Institute",
                            "Other": "Other"
                        };
                        break;
                    case "Tennessee":
                        newOpts = {
                            "": "",
                            "Aquinas College": "Aquinas College",
                            "Austin Peay State University": "Austin Peay State University",
                            "Belmont College": "Belmont College",
                            "Belmont University": "Belmont University",
                            "Bethel College Tennessee": "Bethel College Tennessee",
                            "Bristol College": "Bristol College",
                            "Bryan College": "Bryan College",
                            "Carson-Newman College": "Carson-Newman College",
                            "Chattanooga State Technical Community College": "Chattanooga State Technical Community College",
                            "Christian Brothers University": "Christian Brothers University",
                            "Clarksvlle Baptist College": "Clarksvlle Baptist College",
                            "Cleveland State Community College": "Cleveland State Community College",
                            "Columbia State Community College": "Columbia State Community College",
                            "Crichton College": "Crichton College",
                            "Cumberland University": "Cumberland University",
                            "David Lipscomb College": "David Lipscomb College",
                            "Draughons Junior College": "Draughons Junior College",
                            "Dyersburg State Community College": "Dyersburg State Community College",
                            "East Tennessee State University": "East Tennessee State University",
                            "Edmondson Junior College of Business": "Edmondson Junior College of Business",
                            "Faith Baptist Bible Institute": "Faith Baptist Bible Institute",
                            "Fisk University": "Fisk University",
                            "Free Will Baptist Bible College": "Free Will Baptist Bible College",
                            "Freed-Hardeman College": "Freed-Hardeman College",
                            "Hiwassee College": "Hiwassee College",
                            "Jackson State Community College": "Jackson State Community College",
                            "Johnson University": "Johnson University",
                            "King College, Inc": "King College, Inc",
                            "Knoxville College": "Knoxville College",
                            "Lambuth University": "Lambuth University",
                            "Lane College": "Lane College",
                            "Lee University": "Lee University",
                            "Lemoyne-Owen College": "Lemoyne-Owen College",
                            "Lincoln Memorial University": "Lincoln Memorial University",
                            "Lipscomb University": "Lipscomb University",
                            "Martin Methodist College": "Martin Methodist College",
                            "Maryville College": "Maryville College",
                            "Meharry Medical College": "Meharry Medical College",
                            "Memphis College of Art": "Memphis College of Art",
                            "Middle Tennessee State University": "Middle Tennessee State University",
                            "Milligan College": "Milligan College",
                            "Morristown College": "Morristown College",
                            "Motlow State Community College": "Motlow State Community College",
                            "Nashville State Community College": "Nashville State Community College",
                            "Northeast State Technical Community College": "Northeast State Technical Community College",
                            "Pellissippi State Community College": "Pellissippi State Community College",
                            "Rhodes College": "Rhodes College",
                            "Roane State Community College": "Roane State Community College",
                            "Shelby State Community College": "Shelby State Community College",
                            "South College": "South College",
                            "Southern Adventist University": "Southern Adventist University",
                            "Southern College of Optometry": "Southern College of Optometry",
                            "Southwest Tennessee Community College": "Southwest Tennessee Community College",
                            "State Technical Institute at Memphis": "State Technical Institute at Memphis",
                            "Tennessee State University": "Tennessee State University",
                            "Tennessee Technological University": "Tennessee Technological University",
                            "Tennessee Wesleyan College": "Tennessee Wesleyan College",
                            "Tomlinson College": "Tomlinson College",
                            "Trevecca Nazarene College": "Trevecca Nazarene College",
                            "Tusculum College": "Tusculum College",
                            "Union University": "Union University",
                            "University of Memphis": "University of Memphis",
                            "University of Tennessee at Chattanooga": "University of Tennessee at Chattanooga",
                            "University of Tennessee at Knoxville": "University of Tennessee at Knoxville",
                            "University of Tennessee at Martin": "University of Tennessee at Martin",
                            "University of Tennessee at Memphis": "University of Tennessee at Memphis",
                            "University of The South": "University of The South",
                            "Vanderbilt University": "Vanderbilt University",
                            "Volunteer State Community College": "Volunteer State Community College",
                            "Walters State Community College": "Walters State Community College",
                            "Other": "Other"
                        };
                        break;
                    case "Texas":
                        newOpts = {
                            "": "",
                            "Abilene Christian University": "Abilene Christian University",
                            "Alvin Community College": "Alvin Community College",
                            "Amarillo College": "Amarillo College",
                            "Ambassador College": "Ambassador College",
                            "Amber University": "Amber University",
                            "American Technological University": "American Technological University",
                            "Angelina College": "Angelina College",
                            "Angelo State University": "Angelo State University",
                            "Arlington Baptist College": "Arlington Baptist College",
                            "Art Institute Houston": "Art Institute Houston",
                            "Austin College": "Austin College",
                            "Austin Community College - Texas": "Austin Community College - Texas",
                            "Austin Presbyterian Theological Seminary": "Austin Presbyterian Theological Seminary",
                            "Bauder Fashion College": "Bauder Fashion College",
                            "Baylor College of Dentistry": "Baylor College of Dentistry",
                            "Baylor College of Medicine": "Baylor College of Medicine",
                            "Baylor University-Baylor Athletics": "Baylor University-Baylor Athletics",
                            "Bishop College": "Bishop College",
                            "Blinn College": "Blinn College",
                            "Brazosport College": "Brazosport College",
                            "Brookhaven College": "Brookhaven College",
                            "Cedar Valley College": "Cedar Valley College",
                            "Central Texas College": "Central Texas College",
                            "Cisco Junior College": "Cisco Junior College",
                            "Clarendon College": "Clarendon College",
                            "Coastal Bend College": "Coastal Bend College",
                            "College of The Mainland": "College of The Mainland",
                            "Collin County Community College": "Collin County Community College",
                            "Concordia University Texas": "Concordia University Texas",
                            "Cooke County College": "Cooke County College",
                            "Criswell College": "Criswell College",
                            "CY Fair College": "CY Fair College",
                            "Dallas Baptist University": "Dallas Baptist University",
                            "Dallas Theological Seminary": "Dallas Theological Seminary",
                            "Del Mar College": "Del Mar College",
                            "Devry Institute of Technology": "Devry Institute of Technology",
                            "East Texas Baptist University": "East Texas Baptist University",
                            "East Texas State University at Texarkana": "East Texas State University at Texarkana",
                            "Eastfield College": "Eastfield College",
                            "El Centro College": "El Centro College",
                            "El Paso Community College": "El Paso Community College",
                            "Faith Christian College": "Faith Christian College",
                            "Fashion Institute Houston": "Fashion Institute Houston",
                            "Frank Phillips College": "Frank Phillips College",
                            "Galveston College": "Galveston College",
                            "Grayson County College": "Grayson County College",
                            "Hardin-Simmons University": "Hardin-Simmons University",
                            "Hill College": "Hill College",
                            "Houston Baptist University": "Houston Baptist University",
                            "Houston Community College System": "Houston Community College System",
                            "Howard College": "Howard College",
                            "Howard Payne University": "Howard Payne University",
                            "Huston-Tillotson College": "Huston-Tillotson College",
                            "ICI University": "ICI University",
                            "Jacksonville College": "Jacksonville College",
                            "Jarvis Christian College": "Jarvis Christian College",
                            "Kilgore College": "Kilgore College",
                            "Kingwood College": "Kingwood College",
                            "Lamar State College-Port Arthur": "Lamar State College-Port Arthur",
                            "Lamar University": "Lamar University",
                            "Laredo Junior College": "Laredo Junior College",
                            "Lee College": "Lee College",
                            "Letourneau College": "Letourneau College",
                            "Lon Morris College": "Lon Morris College",
                            "Lone Star College System": "Lone Star College System",
                            "Lubbock Christian University": "Lubbock Christian University",
                            "McLennan Community College": "McLennan Community College",
                            "McMurry College": "McMurry College",
                            "Midland College": "Midland College",
                            "Midwestern State University": "Midwestern State University",
                            "Montgomery College": "Montgomery College",
                            "Mountain View College": "Mountain View College",
                            "Navarro College": "Navarro College",
                            "North Central Texas College": "North Central Texas College",
                            "North Harris College": "North Harris College",
                            "North Lake College": "North Lake College",
                            "Northeast Texas Community College": "Northeast Texas Community College",
                            "Northwest Vista College": "Northwest Vista College",
                            "Northwood Institute": "Northwood Institute",
                            "Odessa College": "Odessa College",
                            "Our Lady of The Lake University of San Antonio": "Our Lady of The Lake University of San Antonio",
                            "Palo Alto College": "Palo Alto College",
                            "Panola Junior College": "Panola Junior College",
                            "Paris Junior College": "Paris Junior College",
                            "Parker University": "Parker University",
                            "Paul Quinn College": "Paul Quinn College",
                            "Prairie View A & M University": "Prairie View A & M University",
                            "Ranger Junior College": "Ranger Junior College",
                            "Rice University": "Rice University",
                            "Richland College": "Richland College",
                            "Saint Philips College": "Saint Philips College",
                            "Sam Houston State University": "Sam Houston State University",
                            "San Antonio College": "San Antonio College",
                            "San Jacinto College, Central Campus": "San Jacinto College, Central Campus",
                            "San Jacinto College, North Campus": "San Jacinto College, North Campus",
                            "San Jacinto College, South Campus": "San Jacinto College, South Campus",
                            "Schreiner College": "Schreiner College",
                            "South Plains College": "South Plains College",
                            "South Texas Community College": "South Texas Community College",
                            "Southern Methodist University": "Southern Methodist University",
                            "Southwest Texas Junior College": "Southwest Texas Junior College",
                            "Southwestern Adventist College": "Southwestern Adventist College",
                            "Southwestern Assemblies of God University": "Southwestern Assemblies of God University",
                            "Southwestern Baptist Theological Seminary": "Southwestern Baptist Theological Seminary",
                            "Southwestern Christian College": "Southwestern Christian College",
                            "Southwestern University": "Southwestern University",
                            "St Edwards University": "St Edwards University",
                            "St Edward's University": "St Edward's University",
                            "St Marys University of San Antonio": "St Marys University of San Antonio",
                            "Stephen F Austin State University": "Stephen F Austin State University",
                            "Sul Ross State University": "Sul Ross State University",
                            "Tarleton State University": "Tarleton State University",
                            "Tarleton State University Central Texas": "Tarleton State University Central Texas",
                            "Tarrant County College District": "Tarrant County College District",
                            "Tarrant County Junior College - Northeast Campus": "Tarrant County Junior College - Northeast Campus",
                            "Temple Junior College": "Temple Junior College",
                            "Texarkana College": "Texarkana College",
                            "Texas A & M International University": "Texas A & M International University",
                            "Texas A & M University": "Texas A & M University",
                            "Texas A & M University - Commerce": "Texas A & M University - Commerce",
                            "Texas A & M University - Corpus Christi": "Texas A & M University - Corpus Christi",
                            "Texas A & M University - Galveston": "Texas A & M University - Galveston",
                            "Texas A & M University - Kingsville": "Texas A & M University - Kingsville",
                            "Texas Chiropractic College": "Texas Chiropractic College",
                            "Texas Christian University": "Texas Christian University",
                            "Texas College": "Texas College",
                            "Texas Lutheran College": "Texas Lutheran College",
                            "Texas Southern University": "Texas Southern University",
                            "Texas Southmost College": "Texas Southmost College",
                            "Texas State Technical College": "Texas State Technical College",
                            "Texas State Technical College": "Texas State Technical College",
                            "Texas State Technical College - Waco": "Texas State Technical College - Waco",
                            "Texas State Technical Institute - Harlingen": "Texas State Technical Institute - Harlingen",
                            "Texas State University, San Marcos": "Texas State University, San Marcos",
                            "Texas Tech University": "Texas Tech University",
                            "Texas Tech University Health Science College": "Texas Tech University Health Science College",
                            "Texas Wesleyan College": "Texas Wesleyan College",
                            "Texas Woman's University": "Texas Woman's University",
                            "The Art Institute of Dallas": "The Art Institute of Dallas",
                            "Tomball College": "Tomball College",
                            "Trinity University": "Trinity University",
                            "Trinity Valley Community College": "Trinity Valley Community College",
                            "Tyler Junior College": "Tyler Junior College",
                            "Univ of Texas Health Science Center at San Antonio": "Univ of Texas Health Science Center at San Antonio",
                            "Univ of Texas Health Science Center-San Antonio": "Univ of Texas Health Science Center-San Antonio",
                            "Univ of Texas Southwestern Medical Ctr at Dallas": "Univ of Texas Southwestern Medical Ctr at Dallas",
                            "University of Dallas": "University of Dallas",
                            "University of Houston - Clear Lake": "University of Houston - Clear Lake",
                            "University of Houston - Downtown": "University of Houston - Downtown",
                            "University of Houston - University Park": "University of Houston - University Park",
                            "University of Houston - Victoria": "University of Houston - Victoria",
                            "University of Mary Hardin-Baylor": "University of Mary Hardin-Baylor",
                            "University of North Texas": "University of North Texas",
                            "University of St Thomas": "University of St Thomas",
                            "University of Texas Medical Branch": "University of Texas Medical Branch",
                            "University of Texas-Arlington": "University of Texas-Arlington",
                            "University of Texas-Austin": "University of Texas-Austin",
                            "University of Texas-Brownsville": "University of Texas-Brownsville",
                            "University of Texas-Dallas": "University of Texas-Dallas",
                            "University of Texas-El Paso": "University of Texas-El Paso",
                            "University of Texas-Houston": "University of Texas-Houston",
                            "University of Texas-Permian Basin": "University of Texas-Permian Basin",
                            "University of Texas-Rio Grande Valley": "University of Texas-Rio Grande Valley",
                            "University of Texas-San Antonio": "University of Texas-San Antonio",
                            "University of Texas-Tyler": "University of Texas-Tyler",
                            "University of The Incarnate Word": "University of The Incarnate Word",
                            "Vernon Regional Junior College": "Vernon Regional Junior College",
                            "Victoria College": "Victoria College",
                            "Wade College": "Wade College",
                            "Wayland Baptist University": "Wayland Baptist University",
                            "Weatherford College": "Weatherford College",
                            "West Texas A&M University": "West Texas A&M University",
                            "Western Texas College": "Western Texas College",
                            "Wharton County Junior College": "Wharton County Junior College",
                            "Wiley College": "Wiley College",
                            "Woodcrest College": "Woodcrest College",
                            "Other": "Other"
                        };
                        break;
                    case "Utah":
                        newOpts = {
                            "": "",
                            "Brigham Young University": "Brigham Young University",
                            "Broadview University": "Broadview University",
                            "College of Eastern Utah": "College of Eastern Utah",
                            "Dixie State College": "Dixie State College",
                            "George Wythe College": "George Wythe College",
                            "Lds Business College": "Lds Business College",
                            "Salt Lake Community College": "Salt Lake Community College",
                            "Snow College": "Snow College",
                            "Southern Utah University": "Southern Utah University",
                            "The Stevens-Henager College of Business": "The Stevens-Henager College of Business",
                            "The Stevens-Henager College of Business": "The Stevens-Henager College of Business",
                            "University of Utah": "University of Utah",
                            "Utah State University": "Utah State University",
                            "Utah Technical College": "Utah Technical College",
                            "Utah Valley University": "Utah Valley University",
                            "Weber State University": "Weber State University",
                            "Western Governors University": "Western Governors University",
                            "Westminster College of Salt Lake City": "Westminster College of Salt Lake City",
                            "Other": "Other"
                        };
                        break;
                    case "Virginia":
                        newOpts = {
                            "": "",
                            "Apprentice School of The": "Apprentice School of The",
                            "Art Institute of Washington": "Art Institute of Washington",
                            "Atlantic Baptist Bible College": "Atlantic Baptist Bible College",
                            "Averett College": "Averett College",
                            "Blue Ridge Community College": "Blue Ridge Community College",
                            "Bluefield College": "Bluefield College",
                            "Bridgewater College": "Bridgewater College",
                            "Bryant & Stratton College": "Bryant & Stratton College",
                            "Central Virginia Community College": "Central Virginia Community College",
                            "Christendom College": "Christendom College",
                            "Christopher Newport College": "Christopher Newport College",
                            "Clinch Valley College": "Clinch Valley College",
                            "College of Health Science": "College of Health Science",
                            "College of William and Mary in Virginia": "College of William and Mary in Virginia",
                            "Commonwealth College Hampton": "Commonwealth College Hampton",
                            "Commonwealth College Norfolk": "Commonwealth College Norfolk",
                            "Commonwealth College Richmond": "Commonwealth College Richmond",
                            "Dabney S Lancaster Community College": "Dabney S Lancaster Community College",
                            "Danville Community College": "Danville Community College",
                            "DeVry University": "DeVry University",
                            "Eastern Mennonite College & Seminary": "Eastern Mennonite College & Seminary",
                            "Eastern Shore Community College": "Eastern Shore Community College",
                            "Eastern Virginia Medical School": "Eastern Virginia Medical School",
                            "ECPI University": "ECPI University",
                            "Emory & Henry College": "Emory & Henry College",
                            "Ferrum College": "Ferrum College",
                            "George Mason University": "George Mason University",
                            "Germanna Community College": "Germanna Community College",
                            "Hampden-Sydney College": "Hampden-Sydney College",
                            "Hampton University": "Hampton University",
                            "Hollins College": "Hollins College",
                            "J Sargent Reynolds Community College": "J Sargent Reynolds Community College",
                            "J Sargent Reynolds Community College Parham": "J Sargent Reynolds Community College Parham",
                            "James Madison University": "James Madison University",
                            "John Tyler Community College": "John Tyler Community College",
                            "Katherine Gibbs School": "Katherine Gibbs School",
                            "Liberty University": "Liberty University",
                            "Longwood College": "Longwood College",
                            "Lord Fairfax Community College": "Lord Fairfax Community College",
                            "Lynchburg College": "Lynchburg College",
                            "Mary Baldwin College": "Mary Baldwin College",
                            "Mary Washington College": "Mary Washington College",
                            "Marymount University": "Marymount University",
                            "Mountain Empire Community College": "Mountain Empire Community College",
                            "New River Community College": "New River Community College",
                            "Norfolk State University": "Norfolk State University",
                            "Northern Virginia Community College": "Northern Virginia Community College",
                            "Northern Virginia Community College": "Northern Virginia Community College",
                            "Northern Virginia Community College": "Northern Virginia Community College",
                            "Northern Virginia Community College": "Northern Virginia Community College",
                            "Northern Virginia Community College": "Northern Virginia Community College",
                            "Notre Dame Graduate School of Christendom College": "Notre Dame Graduate School of Christendom College",
                            "Old Dominion University": "Old Dominion University",
                            "Patrick Henry Community College": "Patrick Henry Community College",
                            "Paul D Camp Community College": "Paul D Camp Community College",
                            "Piedmont Virginia Community College": "Piedmont Virginia Community College",
                            "Presbyterian School of Christian Education": "Presbyterian School of Christian Education",
                            "Radford University": "Radford University",
                            "Randolph-Macon College": "Randolph-Macon College",
                            "Randolph-Macon Women's College": "Randolph-Macon Women's College",
                            "Rappahannock Community College": "Rappahannock Community College",
                            "Regent University": "Regent University",
                            "Richard Bland College": "Richard Bland College",
                            "Roanoke College": "Roanoke College",
                            "Shenandoah University": "Shenandoah University",
                            "Skyline College": "Skyline College",
                            "Southern Seminary College": "Southern Seminary College",
                            "Southern Virginia University": "Southern Virginia University",
                            "Southside Virginia Community College": "Southside Virginia Community College",
                            "Southside Virginia Community College": "Southside Virginia Community College",
                            "Southwest Virginia Community College": "Southwest Virginia Community College",
                            "St Lukes Hospital": "St Lukes Hospital",
                            "St Pauls College Virginia": "St Pauls College Virginia",
                            "Stratford College": "Stratford College",
                            "Strayer University": "Strayer University",
                            "Strayer University - Global Campus": "Strayer University - Global Campus",
                            "Sweet Briar College": "Sweet Briar College",
                            "Thomas Nelson Community College": "Thomas Nelson Community College",
                            "Tidewater Community College": "Tidewater Community College",
                            "University of Mary Washington": "University of Mary Washington",
                            "University of Richmond": "University of Richmond",
                            "University of Virginia": "University of Virginia",
                            "University of Virginia College at Wise": "University of Virginia College at Wise",
                            "Virginia Commonwealth University": "Virginia Commonwealth University",
                            "Virginia Highlands Community College": "Virginia Highlands Community College",
                            "Virginia Intermont College": "Virginia Intermont College",
                            "Virginia Military Institute": "Virginia Military Institute",
                            "Virginia Polytechnic Institute & State University": "Virginia Polytechnic Institute & State University",
                            "Virginia State University": "Virginia State University",
                            "Virginia Union University": "Virginia Union University",
                            "Virginia Wesleyan College": "Virginia Wesleyan College",
                            "Virginia Western Community College": "Virginia Western Community College",
                            "Washington and Lee University": "Washington and Lee University",
                            "Wytheville Community College": "Wytheville Community College",
                            "Other": "Other"
                        };
                        break;
                    case "U.S. Virgin Islands":
                        newOpts = {
                            "": "",
                            "H Lavity Stoutt Community College": "H Lavity Stoutt Community College",
                            "University of The Virgin Islands": "University of The Virgin Islands",
                            "Other": "Other"
                        };
                        break;
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
                            "Vermont Technical College": "Vermont Technical College",
                            "Other": "Other"
                        };
                        break;
                    case "Washington":
                        newOpts = {
                            "": "",
                            "Antioch University": "Antioch University",
                            "Argosy University": "Argosy University",
                            "Art Institute of Seattle": "Art Institute of Seattle",
                            "Bastyr University": "Bastyr University",
                            "Bates Technical College": "Bates Technical College",
                            "Bellevue College": "Bellevue College",
                            "Bellingham Technical College": "Bellingham Technical College",
                            "Big Bend Community College": "Big Bend Community College",
                            "Career Floral Design Institute": "Career Floral Design Institute",
                            "Carrington College Spokane": "Carrington College Spokane",
                            "Cascadia Community College": "Cascadia Community College",
                            "Central Washington University": "Central Washington University",
                            "Centralia College": "Centralia College",
                            "City University": "City University",
                            "Clark College": "Clark College",
                            "Clover Park Technical College": "Clover Park Technical College",
                            "Cogswell College North": "Cogswell College North",
                            "Columbia Basin College": "Columbia Basin College",
                            "Corban University": "Corban University",
                            "Cornish College of The Arts": "Cornish College of The Arts",
                            "Devry University": "Devry University",
                            "Eastern Washington University": "Eastern Washington University",
                            "Edmonds Community College": "Edmonds Community College",
                            "Everett Community College": "Everett Community College",
                            "Evergreen State College": "Evergreen State College",
                            "Fort Wright College": "Fort Wright College",
                            "Foundation for International Services Inc": "Foundation for International Services Inc",
                            "Garrett Heyns Education Center": "Garrett Heyns Education Center",
                            "Gonzaga University": "Gonzaga University",
                            "Grays Harbor College": "Grays Harbor College",
                            "Green River Community College": "Green River Community College",
                            "Griffin College": "Griffin College",
                            "Henry Cogswell College": "Henry Cogswell College",
                            "Heritage University": "Heritage University",
                            "Highline Community College": "Highline Community College",
                            "ITT Technical Institute": "ITT Technical Institute",
                            "John Bastyr College": "John Bastyr College",
                            "L H Bates Vocational-Technical College": "L H Bates Vocational-Technical College",
                            "Lake Wash Tech Coll Kirkland": "Lake Wash Tech Coll Kirkland",
                            "Lake Washington Technical College": "Lake Washington Technical College",
                            "Lower Columbia College": "Lower Columbia College",
                            "Lutheran Bible Institute": "Lutheran Bible Institute",
                            "Moody Northwest": "Moody Northwest",
                            "North Seattle Community College": "North Seattle Community College",
                            "Northwest College of The Assemblies of God": "Northwest College of The Assemblies of God",
                            "Northwest Indian College": "Northwest Indian College",
                            "Northwest University": "Northwest University",
                            "Olympia Technical Community College": "Olympia Technical Community College",
                            "Olympic College": "Olympic College",
                            "Other Wash State Jr Coll": "Other Wash State Jr Coll",
                            "Other Wash State Sr Coll": "Other Wash State Sr Coll",
                            "Pacific Lutheran University": "Pacific Lutheran University",
                            "Peninsula College": "Peninsula College",
                            "Pierce College": "Pierce College",
                            "Puget Sound Christian College": "Puget Sound Christian College",
                            "Renton Technical College": "Renton Technical College",
                            "Saint Martins": "Saint Martins",
                            "Saint Martin's University": "Saint Martin's University",
                            "Seattle Central Community College": "Seattle Central Community College",
                            "Seattle Community College": "Seattle Community College",
                            "Seattle Pacific University": "Seattle Pacific University",
                            "Seattle University": "Seattle University",
                            "Seattle University of Law": "Seattle University of Law",
                            "Seattle Vocational Institute": "Seattle Vocational Institute",
                            "Shoreline Community College": "Shoreline Community College",
                            "Skagit Valley College": "Skagit Valley College",
                            "South Puget Sound Community College": "South Puget Sound Community College",
                            "South Seattle Community College": "South Seattle Community College",
                            "Spokane Community College": "Spokane Community College",
                            "Spokane Falls Community College": "Spokane Falls Community College",
                            "St Edwards Seminary": "St Edwards Seminary",
                            "Tacoma Community College": "Tacoma Community College",
                            "Trinity Lutheran College": "Trinity Lutheran College",
                            "University of Puget Sound": "University of Puget Sound",
                            "University of Washington": "University of Washington",
                            "Walla Walla Community College": "Walla Walla Community College",
                            "Walla Walla University": "Walla Walla University",
                            "Washington Baptist College of Biblical Education": "Washington Baptist College of Biblical Education",
                            "Washington Community College": "Washington Community College",
                            "Washington State University": "Washington State University",
                            "Wenatchee Valley College": "Wenatchee Valley College",
                            "Western Washington University": "Western Washington University",
                            "Whatcom Community College": "Whatcom Community College",
                            "Whitman College": "Whitman College",
                            "Whitworth University": "Whitworth University",
                            "Yakima Valley Community College": "Yakima Valley Community College",
                            "Other": "Other"
                        };
                        break;
                    case "Wisconsin":
                        newOpts = {
                            "": "",
                            "Alverno College": "Alverno College",
                            "Bellin College of Nursing": "Bellin College of Nursing",
                            "Beloit College": "Beloit College",
                            "Blackhawk Technical College": "Blackhawk Technical College",
                            "Bryant & Stratton College": "Bryant & Stratton College",
                            "Cardinal Stritch College": "Cardinal Stritch College",
                            "Carroll College Wisconsin": "Carroll College Wisconsin",
                            "Carthage College": "Carthage College",
                            "Chippewa Valley Technical College": "Chippewa Valley Technical College",
                            "Concordia University Wisconsin": "Concordia University Wisconsin",
                            "Edgewood College": "Edgewood College",
                            "Fox Valley Technical College": "Fox Valley Technical College",
                            "Gateway Technical College": "Gateway Technical College",
                            "Herzing University": "Herzing University",
                            "Immanuel Lutheran College": "Immanuel Lutheran College",
                            "Lakeland College": "Lakeland College",
                            "Lakeshore Technical College": "Lakeshore Technical College",
                            "Lawrence University": "Lawrence University",
                            "Madison Area Technology College - Madison": "Madison Area Technology College - Madison",
                            "Maranatha Baptist Bible College": "Maranatha Baptist Bible College",
                            "Marian College of Fond Du Lac": "Marian College of Fond Du Lac",
                            "Marquette University": "Marquette University",
                            "Medical College of Wisconsin": "Medical College of Wisconsin",
                            "Mid State Technical College": "Mid State Technical College",
                            "Milwaukee Area Technical College": "Milwaukee Area Technical College",
                            "Milwaukee Institute of Art and Design": "Milwaukee Institute of Art and Design",
                            "Milwaukee School of Engineering": "Milwaukee School of Engineering",
                            "Moraine Park Technical College": "Moraine Park Technical College",
                            "Mount Mary College": "Mount Mary College",
                            "Mount Senario College": "Mount Senario College",
                            "Nicolet Area Technical College": "Nicolet Area Technical College",
                            "Northcentral Technical College": "Northcentral Technical College",
                            "Northeast Wisconsin Technical College": "Northeast Wisconsin Technical College",
                            "Northland College": "Northland College",
                            "Northwestern College Wisconsin": "Northwestern College Wisconsin",
                            "Racine-Kenosha County Teachers College": "Racine-Kenosha County Teachers College",
                            "Ripon College": "Ripon College",
                            "Silver Lake College of The Holy Family": "Silver Lake College of The Holy Family",
                            "St Josephs Hospital": "St Josephs Hospital",
                            "St Norbert College": "St Norbert College",
                            "Stratton College": "Stratton College",
                            "University of Wisconsin Colleges": "University of Wisconsin Colleges",
                            "University of Wisconsin-Eau Claire": "University of Wisconsin-Eau Claire",
                            "University of Wisconsin-Green Bay": "University of Wisconsin-Green Bay",
                            "University of Wisconsin-Lacrosse": "University of Wisconsin-Lacrosse",
                            "University of Wisconsin-Madison": "University of Wisconsin-Madison",
                            "University of Wisconsin-Milwaukee": "University of Wisconsin-Milwaukee",
                            "University of Wisconsin-Oshkosh": "University of Wisconsin-Oshkosh",
                            "University of Wisconsin-Parkside": "University of Wisconsin-Parkside",
                            "University of Wisconsin-Platteville": "University of Wisconsin-Platteville",
                            "University of Wisconsin-River Falls": "University of Wisconsin-River Falls",
                            "University of Wisconsin-Stevens Point": "University of Wisconsin-Stevens Point",
                            "University of Wisconsin-Stout": "University of Wisconsin-Stout",
                            "University of Wisconsin-Superior": "University of Wisconsin-Superior",
                            "University of Wisconsin-Whitewater": "University of Wisconsin-Whitewater",
                            "Viterbo College": "Viterbo College",
                            "Waukesha County Technical College": "Waukesha County Technical College",
                            "Western Wisconsin Technical College": "Western Wisconsin Technical College",
                            "Wisconsin Lutheran College": "Wisconsin Lutheran College",
                            "Other": "Other"
                        };
                        break;
                    case "West Virginia":
                        newOpts = {
                            "": "",
                            "Alderson-Broaddus College": "Alderson-Broaddus College",
                            "American Public University System": "American Public University System",
                            "Bethany College": "Bethany College",
                            "Bluefield State College": "Bluefield State College",
                            "Concord College": "Concord College",
                            "Davis & Elkins College": "Davis & Elkins College",
                            "Fairmont State College": "Fairmont State College",
                            "Glenville State College": "Glenville State College",
                            "Huntington Junior College": "Huntington Junior College",
                            "Marshall University": "Marshall University",
                            "Mountain State University": "Mountain State University",
                            "Ohio Valley University": "Ohio Valley University",
                            "Ohio Valley University": "Ohio Valley University",
                            "Potomac State College of West Virginia University": "Potomac State College of West Virginia University",
                            "Salem Teikyo University": "Salem Teikyo University",
                            "Shepherd University": "Shepherd University",
                            "Southern West Virginia Community & Technical Coll": "Southern West Virginia Community & Technical Coll",
                            "University of Charleston": "University of Charleston",
                            "West Liberty State College": "West Liberty State College",
                            "West Virginia Institute of Technology": "West Virginia Institute of Technology",
                            "West Virginia Northern Community College": "West Virginia Northern Community College",
                            "West Virginia State College": "West Virginia State College",
                            "West Virginia University": "West Virginia University",
                            "West Virginia University at Parkersburg": "West Virginia University at Parkersburg",
                            "West Virginia Wesleyan College": "West Virginia Wesleyan College",
                            "Wheeling Jesuit University": "Wheeling Jesuit University",
                            "Other": "Other"
                        };
                        break;
                    case "Wyoming":
                        newOpts = {
                            "": "",
                            "Casper College": "Casper College",
                            "Central Wyoming College": "Central Wyoming College",
                            "Eastern Wyoming College": "Eastern Wyoming College",
                            "Laramie County Community College": "Laramie County Community College",
                            "Northern Wyoming Community College District": "Northern Wyoming Community College District",
                            "Northwest College": "Northwest College",
                            "Powell Community College": "Powell Community College",
                            "University of Wyoming": "University of Wyoming",
                            "Western Wyoming College": "Western Wyoming College",
                            "Other": "Other"
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
    
    // function traverseInputs (selector) {
    //     if ($.type(selector) === "string") {
    //         $(selector).each(function () {
    //             var $this = $(this);
    //             var $inputs = $this.find('input');
    //             $inputs.each(function () {
    //                 var $thisChild = $(this);
    //                 $thisChild.blur(function () {
    //                     var $thisParent, $parentsInputs;
    //                     var inputReady = true;
                        
    //                     if ($thisChild.val() == "") {
    //                         $thisChild.removeClass('value-entered');
    //                     }
    //                     else {
    //                         $thisChild.addClass('value-entered');
    //                     }
                        
    //                     $thisParent = $thisChild.parents(selector);
    //                     $parentsInputs = $thisParent.find('input');
    //                     $parentsInputs.each(function () {
    //                         if ($(this).val() == "") {
    //                             inputReady = false;
    //                         }
    //                     });
    //                     if (inputReady) {
    //                         $thisParent.addClass('inputs-ready');
    //                     }
    //                     else {
    //                         $thisParent.removeClass('inputs-ready');
    //                     }
    //                 });
    //             });
    //         });
    //     }
    // }
})(jQuery);
/***************************************************************************************************************************
 * jQuery.oue-custom.js: custom JavaScript code common to all WSU Undergraduate Education websites                         *
 ***************************************************************************************************************************/
"use strict";

(function ($) {
	var thisFileName = "jQuery.oue-custom.js";

	/*******************************************************************************************************************
	 * ADDITION OF FUNCTIONS to jQuery                                                                                 *
	 *******************************************************************************************************************/
	 
	/**
	 * jQuery.isJQueryObj
	 * DESCRIPTION: Checking function to verify that the passed parameter is a valid jQuery object.
	 */
	$.isJQueryObj = function ($obj) {
		return ($obj && ($obj instanceof $ || $obj.constructor.prototype.jquery));
	}
	
	/**
	 * jQuery.logError
	 * DESCRIPTION: Log an error using the browser console in JSON notation.
	 * PARAMETERS:
	 *   - fileName: the name of the JS source file wherein the error was encountered
	 *   - fnctnName: the name of the function that called $.logError
	 *   - fnctnDesc: a description of what the calling function is supposed to do
	 *   - errorMsg: the message that describes what went wrong within the calling function
	 */
	$.logError = function (fileName, fnctnName, fnctnDesc, errorMsg) {
		var thisFuncName = "jQuery.logError";
		var thisFuncDesc = "Log an error using the browser console in JSON notation.";
		var bitMask;
		
		bitMask = typeof fileName === "string";
		bitMask = (typeof fnctnName === "string") | (bitMask << 1);
		bitMask = (typeof fnctnDesc === "string") | (bitMask << 1);
		bitMask = (typeof errorMsg === "string") | (bitMask << 1);
		if (bitMask === 15) {
			console.log("error = {\n\tfile: '" + fileName + "',\n\tfunctionName: '" + fnctnName + "'\n\tfunctionDesc: '" + fnctnDesc + "'\n\terrorMessage: '" + errorMsg + "'\n\t};");
		} else {
			var incorrectTypings;
			var bitMaskCopy;
			var newErrorMsg;
			
			// Determine how many incorrectly typed arguments were encountered
			for (var i=0, incorrectTypings = 0, bitMaskCopy = bitMask; i < 4; i++) {
				incorrectTypings += bitMaskCopy & 1;
				bitMaskCopy = bitMaskCopy >> 1;
			}
			
			// Construct a new error message
			if (incorrectTypings == 1) {
				newErrorMsg = "Unfortunately, a call to jQuery.error was made with an incorrectly typed argument."
			} else {
				newErrorMsg = "Unfortunately, a call to jQuery.error was made with incorrectly typed arguments."
			}
			newErrorMsg += "Here are the arguments that were passed to jQuery.logError:\n";
			newErrorMsg += "\t\tfileName = " + fileName + "\n";
			if (!(bitMask & 1)) {
				newErrorMsg = "\t\ttypeof filename = " + (typeof fileName) + "\n";
			}
			newErrorMsg += "\t\tfnctnName = " + fnctnName + "\n";
			if(!((bitMask & 2) >> 1)) {
				newErrorMsg = "\t\ttypeof fnctnName = " + (typeof fnctnName) + "\n";
			}
			newErrorMsg += "\t\tfnctnDesc = " + fnctnDesc + "\n";
			if(!((bitMask & 4) >> 2)) {
				newErrorMsg = "\t\ttypeof fnctnDesc = " + (typeof fnctnDesc) + "\n";
			}
			newErrorMsg += "\t\terrorMsg = " + errorMsg + "\n";
			if(!((bitMask & 8) >> 3)) {
				newErrorMsg = "\t\ttypeof errorMsg = " + (typeof errorMsg) + "\n";
			}

			// Recursively call jQuery.logError with the new error message.
			$.logError(
				thisFileName,
				thisFuncName,
				thisFuncDesc,
				newErrorMsg
			);
		}
	}

	/*******************************************************************************************************************
	 * Function calls made once the DOM IS READY                                                                       *
	 *******************************************************************************************************************/
    $(function () {
		var argsList = new Object(); // List of arguments that will be passed to functions
		var args;
		
		// Set up organized list of arguments to be passed to functions called during document initialization
		argsList.fixDogears = {
			slctrSiteNav: "#spine-sitenav",
			slctrDogeared: "li.current.active.dogeared",
			removedClasses: "current active dogeared"
		};
		argsList.addBlankTargetAttributes = {
			slctrSpine: "#spine",
			slctrExternalLinks: "a.external"
		};
		argsList.checkForLrgFrmtSingle = {
			slctrSingle: ".single.large-format-friendly",
			slctrMainHdr: "header.main-header",
			slctrHdrGroup: ".header-group",
			centeringClass: "centered"
		};
		argsList.initHrH2Motif = {
			slctrStandardH2: ".column > h2:not(.fancy), .column > section > h2:not(.fancy)",
			slctrPrevHr: "hr:not(.subSection)",
			h2ClassesAdded: "no-top-margin",
			hrClassesAdded: "narrow-bottom-margin dark-gray thicker",
			animAddDrtn: 250
		};
		argsList.initFancyHrH2Motif = {
			slctrFancyH2: ".column > h2.fancy, .column > section > h2.fancy",
			slctrPrevHr: "hr:not(.subSection)",
			hrClassesAdded: "no-bottom-margin dark-gray thicker encroach-horizontal",
			animAddDrtn: 250
		};
		argsList.initHrH3Motif = {
			slctrStandardH3: ".column > h3:not(.fancy), .column > section > h3:not(.fancy)",
			slctrPrevHr: "hr:not(.subSection)",
			hrClassesAdded: "narrow-bottom-margin crimson",
			animAddDrtn: 250
		};
		argsList.initFancyHrH3Motif = {
			slctrFancyH3: ".column > h3.fancy, .column > section > h3.fancy",
			slctrPrevHr: "hr:not(.subSection)",
			hrClassesAdded: "no-bottom-margin crimson encroach-horizontal",
			animAddDrtn: 250
		};
		argsList.initDropDownToggles = {
			slctrToggle: ".drop-down-toggle",
			slctrWhatsToggled: ".toggled-panel",
			activatingClass: "activated",
			animDuration: 500
		};
		argsList.initReadMoreToggles = {
			slctrToggleIn: ".read-more-toggle-in-ctrl",
			slctrToggleOut: ".read-more-toggle-out-ctrl",
			slctrPanel: ".read-more-panel",
			animDuration: 500
		};
		argsList.initContentFlippers = {
			slctrCntntFlppr: ".content-flipper",
			slctrFlppdFront: ".flipped-content-front",
			slctrFlppdBack: ".flipped-content-back",
			animDuration: 500
		};
		argsList.initDefinitionLists = {
			slctrDefList: "dl.toggled",
			slctrLrgFrmtSection: ".large-format-friendly",
			slctrColOne: ".column.one",
			slctrColTwo: ".column.two",
			dtActivatingClass: "activated",
			ddRevealingClass: "revealed",
			animSldDrtn: 400,
			animHghtDrtn: 100
		};
		argsList.addDefinitionListButtons = {
			slctrDefList: argsList.initDefinitionLists.slctrDefList,
			expandAllClass: "expand-all-button",
			collapseAllClass: "collapse-all-button",
			btnDisablingClass: "disabled",
			dtActivatingClass: argsList.initDefinitionLists.dtActivatingClass,
			ddRevealingClass: argsList.initDefinitionLists.ddRevealingClass,
			animSldDrtn: argsList.initDefinitionLists.animSldDrtn
		};
		argsList.initQuickTabs = {
			slctrQtSctn: "section.row.single.quick-tabs"
		};
		argsList.initTocFloating = {
			slctrToc: "p.vpue-jump-bar",
			slctrBackToToc: "p.vpue-jump-back"
		};
		argsList.initTriggeredByHover = {
			slctrTrggrdOnHvr: ".triggered-on-hover",
			slctrCntntRvld: ".content-revealed",
			slctrCntntHddn: ".content-hidden",
			animDuration: 200
		};
		
		// Call document initialization functions
		args = argsList.fixDogears;
        fixDogears(
			args.slctrSiteNav,
			args.slctrDogeared,
			args.removedClasses
		);
		
		args = argsList.addBlankTargetAttributes;
		addBlankTargetAttributes(
			args.slctrSpine,
			args.slctrExternalLinks
		);
		
		args = argsList.checkForLrgFrmtSingle;
        checkForLrgFrmtSingle(
			args.slctrSingle,
			args.slctrMainHdr,
			args.slctrHdrGroup,
			args.centeringClass
		);
		
		args = argsList.initHrH2Motif;
        initHrH2Motif(
			args.slctrStandardH2,
			args.slctrPrevHr,
			args.h2ClassesAdded,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initFancyHrH2Motif;
        initFancyHrH2Motif(
			args.slctrFancyH2,
			args.slctrPrevHr,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initHrH3Motif;
        initHrH3Motif(
			args.slctrStandardH3,
			args.slctrPrevHr,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initFancyHrH3Motif;
        initFancyHrH3Motif(
			args.slctrFancyH3,
			args.slctrPrevHr,
			args.hrClassesAdded,
			args.animAddDrtn
		);
		
		args = argsList.initDropDownToggles;
        initDropDownToggles(
			args.slctrToggle,
			args.slctrWhatsToggled,
			args.activatingClass,
			args.animDuration
		);
		
		args = argsList.initReadMoreToggles;
        initReadMoreToggles(
			args.slctrToggleIn,
			args.slctrToggleOut,
			args.slctrPanel,
			args.animDuration
		);
		
		args = argsList.initContentFlippers;
        initContentFlippers(
			args.slctrCntntFlppr,
			args.slctrFlppdFront,
			args.slctrFlppdBack,
			args.animDuration
		);
		
		args = argsList.initDefinitionLists;
        initDefinitionLists(
			args.slctrDefList,
			args.slctrLrgFrmtSection,
			args.slctrColOne,
			args.slctrColTwo,
			args.dtActivatingClass,
			args.ddRevealingClass,
			args.animSldDrtn,
			args.animHghtDrtn
		);
		
		args = argsList.addDefinitionListButtons;
        addDefinitionListButtons(
			args.slctrDefList,
			args.expandAllClass,
			args.collapseAllClass,
			args.btnDeactivatingClass,
			args.dtActivatingClass,
			args.ddRevealingClass,
			args.animSldDrtn
		);
		
		args = argsList.initQuickTabs;
		initQuickTabs(
			args.slctrQtSctn
		);
		
		args = argsList.initTocFloating;
		initTocFloating(
			args.slctrToc,
			args.slctrBackToToc
		);

		args = argsList.initTriggeredByHover;
        initTriggeredByHover(
			args.slctrTrggrdOnHvr,
			args.slctrCntntRvld,
			args.slctrCntntHddn,
			args.animDuration
		);
		
		// TODO: initScrollingSidebars("...");
        
    });
    
	/*******************************************************************************************************************
	 * WINDOW LOAD event bindings                                                                                      *
	 *******************************************************************************************************************/
    $(window).on("load", function () {
		var params = new Object();
		var theseParams;
		
		// Set up parameters for functions called during the window load event
		params.finalizeLrgFrmtSideRight = {
			slctrSideRight: ".side-right.large-format-friendly",
			slctrColOne: ".column.one",
			slctrColTwo: ".column.two",
			trggrWidth: 1051,
			animDuration: 100
		};
		params.showDefinitionListButtons = {
			slctrDefList: "dl.toggled",
			expandAllClass: "expand-all-button",
			collapseAllClass: "collapse-all-button",
			animFadeInDrtn: 400
		};
		params.initWelcomeMessage = {
			slctrWlcmMsg: "#welcome-message",
			slctrPostWlcmMsg: "#post-welcome-message",
			msgDelay: 1000,
			fadeOutDuration: 500,
			fadeInDuration: 500
		};
		
		// Make calls to functions
		theseParams = params.finalizeLrgFrmtSideRight;
        finalizeLrgFrmtSideRight(
			theseParams.slctrSideRight,
			theseParams.slctrColOne,
			theseParams.slctrColTwo,
			theseParams.trggrWidth,
			theseParams.animDuration
		);
		theseParams = params.showDefinitionListButtons;
		showDefinitionListButtons(
			theseParams.slctrDefList,
			theseParams.expandAllClass,
			theseParams.collapseAllClass,
			theseParams.animFadeInDrtn
		);
		theseParams = params.initWelcomeMessage;
		initWelcomeMessage(
			theseParams.slctrWlcmMsg,
			theseParams.slctrPostWlcmMsg,
			theseParams.msgDelay,
			theseParams.fadeOutDuration,
			theseParams.fadeInDuration
		);
    });
    
	/*******************************************************************************************************************
	 * WINDOW RESIZE event bindings                                                                                    *
	 *******************************************************************************************************************/
    $(window).resize(function () {
        resizeLrgFrmtSideRight(".side-right.large-format-friendly", "div.column.one", "div.column.two",
         1051, 100);
    });
    
	/*******************************************************************************************************************
	 * DOCUMENT INITIALIZATION function definitions (designed to be called after DOM is ready)                         *
	 *******************************************************************************************************************/
	
	/**
	 * addBlankTargetAttributes
	 * DESCRIPTION: Adds missing blank target attributes to links within the WSU Spine as needed.
	 * PARAMETERS:
	 *   - slctrSpine: selector string for locating the spine object within the DOM
	 *   - slctrExternalLinks: selector string for locating links within the spine that lead to destination external to the domain
	 */
	function addBlankTargetAttributes(slctrSpine, slctrExternalLinks) {
		var thisFnctnName = "addBlankTargetAttributes";
		var thisFnctnDesc = "Adds missing blank target attributes to links within the WSU Spine as needed.";
		if (typeof slctrSpine === "string" && typeof slctrExternalLinks === "string") {
			var $spine = $(slctrSpine);
			if ($spine.length === 1) {
				var $links = $spine.find(slctrExternalLinks);
				$links.each(function () {
					var $thisLink = $(this);
					if ($thisLink.attr("target") != "_blank") {
						$thisLink.attr("target", "_blank");
						var relStr = $thisLink.attr("rel");
						if (relStr == undefined) {
							$thisLink.attr("rel", "noopener noreferrer");
						} else {
							if (relStr.search(/noopener/i) < 0) {
								relStr += " noopener";
							}
							if (relStr.search(/noreferrer/i) < 0) {
								relStr += " noreferrer";
							}
							$thisLink.attr("rel", relStr);
						}
					}
				});
			} else {
				$.logError(
					thisFileName, thisFnctnName, thisFnctnDesc,
					"I could not locate the WSU Spine element within the DOM."
				);
			}
		} else {
			$.logError(
				thisFileName, thisFnctnName, thisFnctnDesc,
				"I was passed one or more incorrectly typed parameters. Here's what I was passed:\n\ttypeof slctrSpine = " + (typeof slctrSpine) + "\n\ttypeof slctrExternalLinks = " + (typeof slctrExternalLinks)
			);
		}
	}
	
	/**
	 * addDefinitionListButtons
	 * DESCRIPTION: Automatically creates and binds events to expand/collapse all buttons designed for improving UX of OUE site definition lists.
	 * PARAMETERS:
	 *   - slctrDefList: selector string for locating definition list elements within the DOM that contain collapsible definitions
	 *   - expandAllClass: CSS class for controlling the layout of expand all buttons
	 *   - collapseAllClass: CSS class for controlling the layout of collapse all buttons
	 *   - btnDisablingClass: CSS class applied to disable expand/collapse all buttons
	 *   - dtActivatingClass: CSS class used to indicate an active/expanded state for definition terms
	 *   - ddRevealingClass: CSS class used to realize a revealed, visible state on definitions
	 */
    function addDefinitionListButtons(slctrDefList, expandAllClass, collapseAllClass, btnDisablingClass,
	 dtActivatingClass, ddRevealingClass, animSldDrtn) {
		var thisFuncName = "addDefinitionListButtons";
		var thisFuncDesc = "Automatically creates and binds events to expand/collapse all buttons designed for improving UX of OUE site definition lists";
		
		// Find and remove any pre-existing expand/collapse all buttons
		var $lists = $(slctrDefList);
		var $existingExpandAlls = $lists.children("." + expandAllClass);
		var $existingCollapseAlls = $lists.children("." + collapseAllClass);
		if ($existingExpandAlls.length > 0) {
			$existingExpandAlls.remove();
			$.logError(
				thisFileName, thisFuncName, thisFuncDesc,
				"Expand all buttons were already discovered in the DOM upon document initialization; please remove all buttons from the HTML source code to avoid wasting computational resources."
			);
		}
		if ($existingCollapseAlls.length > 0) {
			$existingCollapseAlls.remove();
			$.logError(
				thisFileName, thisFuncName, thisFuncDesc,
				"Collapse all buttons were already discovered in the DOM upon document initialization; please remove all buttons from the HTML source code to avoid wasting computational resources."
			);
		}
		
		// Add initially hidden (via CSS) expand/collapse all buttons to definition lists
		$lists.prepend('<div class="collapse-all-button">[-] Collapse All</div>');
		$lists.prepend('<div class="expand-all-button">[+] Expand All</div>');
		var slctrExpandAll = slctrDefList + " > ." + expandAllClass;
		var $expandAlls = $(slctrExpandAll);
		var slctrCollapseAll = slctrDefList + " > ." + collapseAllClass;
		var $collapseAlls = $(slctrCollapseAll);
		
		// Bind handling functions to button click events
		$expandAlls.click(function() {
			var $thisExpand = $(this);
			if (!$thisExpand.hasClass(btnDisablingClass)) {
				var $nextCollapse = $thisExpand.next("." + collapseAllClass);
				var $parentList = $thisExpand.parent(slctrDefList);
				if ($parentList.length == 1) {
					// TODO: Disable buttons
					var $defTerms = $parentList.children("dt");
					$defTerms.each(function() {
						var $thisDefTerm = $(this);
						if (!$thisDefTerm.hasClass(dtActivatingClass)) {
							$thisDefTerm.addClass(dtActivatingClass);
							var $thisDefTermNext = $thisDefTerm.next("dd");
							$thisDefTermNext.addClass(ddRevealingClass);
							$thisDefTermNext.stop().animate({
								maxHeight: $thisDefTermNext[0].scrollHeight
							}, animSldDrtn);
						}
					});
					// TODO: Enable buttons
				} else {
					$.logError(
						thisFileName, thisFuncName, thisFunDesc,
						"When trying to bind a click event on an expand all button to a handling function, could not locate the parental definition list within DOM."
					);
				}
			}
		});
		$collapseAlls.click(function() {
			var $thisCollapse = $(this);
			if (!$thisCollapse.hasClass(btnDisablingClass)) {
				var $prevExpand = $thisCollapse.prev("." + expandAllClass);
				var $parentList = $thisCollapse.parent(slctrDefList);
				if ($parentList.length == 1) {
					// TODO: Disable buttons
					var $defTerms = $parentList.children("dt");
					$defTerms.each(function() {
						var $thisDefTerm = $(this);
						if ($thisDefTerm.hasClass(dtActivatingClass)) {
							$thisDefTerm.removeClass(dtActivatingClass);
							var $thisDefTermNext = $thisDefTerm.next("dd");
							$thisDefTermNext.removeClass(ddRevealingClass);
							$thisDefTermNext.stop().animate({
								maxHeight: 0
							}, animSldDrtn);
						}
					});
					// TODO: Enable buttons
				} else {
					$.logError(
						thisFileName, thisFuncName, thisFunDesc,
						"When trying to bind a click event on collapse all button #" + $thisCollapse.index() + "to a handling function, could not locate the parental definition list within DOM."
					);
				}
			}
		});
    }
    
    function checkForLrgFrmtSingle(slctrSingle, slctrMainHdr, slctrHdrGroup, centeringClass) {
        var $lrgFrmtSnglSctns = $(slctrSingle);
        if ($lrgFrmtSnglSctns.length > 0) {
            var $mainHeader = $(slctrMainHdr);
            $mainHeader.addClass(centeringClass);
            var $mnHdrChldDiv = $mainHeader.find(slctrHdrGroup);
            $mnHdrChldDiv.addClass(centeringClass);
        }
    }
    
    function fixDogears(slctrSiteNav, slctrDogeared, removedClasses) {
        // Fix bug wherein the wrong items in the spine become dogeared
        var $dogearedItems = $(slctrSiteNav).find(slctrDogeared);
        if ($dogearedItems.length > 1) {
            var currentURL = window.location.href;
            var currentPage = currentURL.substring(currentURL.substring(0, currentURL.length - 1).lastIndexOf("/") + 1, currentURL.length - 1);
            $dogearedItems.each(function () {
                var $this = $(this);
                var $navLink = $this.children("a");
                if ($navLink.length == 1) {
                    var navLinkURL = $navLink.attr("href");
                    var navLinkPage = navLinkURL.substring(navLinkURL.substring(0, navLinkURL.length - 1).lastIndexOf("/") + 1, navLinkURL.length - 1);
                    if (navLinkPage != currentPage) {
                        $this.removeClass(removedClasses);
                    }
                }
            });
        }
    }

    function initContentFlippers(slctrCntntFlppr, slctrFlppdFront, slctrFlppdBack, animDuration) {
        $(slctrCntntFlppr).click(function () {
            var $this = $(this);
            $this.next(slctrFlppdFront).toggle(animDuration);
            $this.next(slctrFlppdFront).next(slctrFlppdBack).fadeToggle(animDuration);
        });
        $(slctrFlppdFront).click(function () {
            var $this = $(this);
            $this.toggle(animDuration);
            $this.next(slctrFlppdBack).fadeToggle(animDuration);
        });
    }
    
    function initDefinitionLists(slctrDefList, slctrLrgFrmtSection, slctrColOne, slctrColTwo,
     dtActivatingClass, ddRevealingClass, animHghtDrtn) {
		var $listDts = $(slctrDefList + " dt");
		$listDts.attr("tabindex", 0);
        $listDts.click(function() {
            var $this = $(this);
            $this.toggleClass(dtActivatingClass);
			var $thisNext = $this.next("dd");
            $thisNext.toggleClass(ddRevealingClass);
			if ($thisNext.hasClass(ddRevealingClass)) {
				$thisNext.stop().animate({
					maxHeight: $thisNext[0].scrollHeight
				});
			} else {
				$thisNext.stop().animate({
					maxHeight: 0
				});
			}
			var $parent = $this.parents(slctrLrgFrmtSection + ">" + slctrColOne);
			var $prntNxt = $parent.next(slctrColTwo);
			$prntNxt.delay(400).animate({height: $parent.css('height')}, animHghtDrtn);
        });
		$listDts.on("keydown", function(e) {
			var regExMask = /Enter| /g; // TODO: Divide and conquer
			if (regExMask.exec(e.key) != null) {
				e.preventDefault();
				var $this = $(this);
				$this.toggleClass(dtActivatingClass);
				var $thisNext = $this.next("dd");
				$thisNext.toggleClass(ddRevealingClass);
				if ($thisNext.hasClass(ddRevealingClass)) {
					$thisNext.stop().animate({
						maxHeight: $thisNext[0].scrollHeight
					});
				} else {
					$thisNext.stop().animate({
						maxHeight: 0
					});
				}
				var $parent = $this.parents(slctrLrgFrmtSection + ">" + slctrColOne);
				var $prntNxt = $parent.next(slctrColTwo);
				$prntNxt.delay(400).animate({height: $parent.css('height')}, animHghtDrtn);
			}
		});
        $(slctrDefList + " dd").removeClass(ddRevealingClass);
    }
    
    function initDropDownToggles(slctrToggle, slctrWhatsToggled, activatingClass, animDuration) {
		var $toggles =  $(slctrToggle);
		$toggles.attr("tabindex", 0);
		$toggles.addClass("no-anchor-highlighting");
		effectDropDownTogglePermanence($toggles, slctrWhatsToggled, activatingClass, animDuration);
        $toggles.click(function () {
            var $this = $(this);
			$this.blur();
            $this.toggleClass(activatingClass);
            $this.next(slctrWhatsToggled).toggle(animDuration);
			setupDropDownTogglePermanence($this, activatingClass);
        }); // TODO: change implementation to height + overflow based hiding approach
		$toggles.on("keydown", function(e) {
			var regExMask = /Enter| /g;
			if (regExMask.exec(e.key) != null) {
				e.preventDefault();
				var $this = $(this);
				$this.toggleClass(activatingClass);
				$this.next(slctrWhatsToggled).toggle(animDuration);
				setupDropDownTogglePermanence($this, activatingClass);
			}
		});
    }
	
	function effectDropDownTogglePermanence($toggles, slctrWhatsToggled, activatingClass, animDuration) {
		var thisFuncName = "effectDropDownTogglePermanence";
		var thisFuncDesc = "Upon page load, sets the expansion state of a drop down toggle element based on previous user interactions during the session.";
		if ($.isJQueryObj($toggles)) {
			$toggles.each(function() {
				var $this = $(this);
				if ($this[0].id) {
					try {
						var state = sessionStorage.getItem($this[0].id);
						if (state == "expanded") {
							$this.toggleClass(activatingClass);
							$this.next(slctrWhatsToggled).toggle(animDuration);							
						}
					} catch(e) {
						$.logError(thisFileName, thisFuncName, thisFuncDesc, e.message);
					}
				} else {
					$.logError(thisFileName, thisFuncName, thisFuncDesc,
						"No ID was set for this drop down toggle element; thus, expansion state permanence cannot be effected.");
				}
			});
		} else {
			$.logError(thisFileName, thisFuncName, thisFuncDesc,
				"I was not passed a valid jQuery object.");
		}
	}
	
	function setupDropDownTogglePermanence($toggle, activatingClass) {
		var thisFuncName = "setupDropDownTogglePermanence";
		var thisFuncDesc = "Records the expansion state of a drop down toggle element in local storage to later effect permanence.";
		if ($.isJQueryObj($toggle)) {
			if ($toggle[0].id) {
				try {
					var state = $toggle.hasClass(activatingClass) ? "expanded" : "collapsed";
					sessionStorage.setItem($toggle[0].id, state);
				} catch(e) {
					$.logError(thisFileName, thisFuncName, thisFuncDesc, e.message);
				}
			} else {
				$.logError(thisFileName, thisFuncName, thisFuncDesc,
					"No ID was set for this drop down toggle element; thus, expansion state permanence cannot be effected.");
			}
		} else {
			$.logError(thisFileName, thisFuncName, thisFuncDesc,
				"I was not passed a valid jQuery object.");
		}
	}
    
    function initFancyHrH2Motif(slctrFancyH2, slctrPrevHr, hrClassesAdded, animAddDrtn) {
        $(slctrFancyH2).each(function () {
                $(this).prev(slctrPrevHr).addClass(hrClassesAdded, animAddDrtn);
        });
    }
    
    function initFancyHrH3Motif(slctrFancyH3, slctrPrevHr, hrClassesAdded, animAddDrtn) {
        $(slctrFancyH3).each(function () {
            $(this).prev(slctrPrevHr).addClass(hrClassesAdded, animAddDrtn);
        });
    }
    
    function initHrH2Motif(slctrStandardH2, slctrPrevHr, h2ClassesAdded, hrClassesAdded, animAddDrtn) {
        $(slctrStandardH2).each(function () {
                var $this = $(this);
				var $prevElem = $this.prev(slctrPrevHr);
				if ($prevElem.length > 0) {
					$this.addClass(h2ClassesAdded);
					$prevElem.addClass(hrClassesAdded, animAddDrtn);
				}
        });
    }
    
    function initHrH3Motif(slctrStandardH3, slctrPrevHr, hrClassesAdded, animAddDrtn) {
        $(slctrStandardH3).each(function () {
            $(this).prev(slctrPrevHr).addClass(hrClassesAdded, animAddDrtn);
        });
    }
    
	function initQuickTabs(slctrQtSctn) {
		var $qtSctn = $(slctrQtSctn);
		$qtSctn.each(function () {
			var $thisSctn = $(this);
			var $tabCntnr = $thisSctn.find("div.column > ul");
			var $tabs = $tabCntnr.find("li");
			var $panelCntnr = $thisSctn.find("table");
			var $panels = $panelCntnr.find("tbody:first-child > tr");
			if($tabs.length == $panels.length) {
				var idx;
				var jdx;
				for (idx = 0; idx < $tabs.length; idx++) {
					$tabs.eq(idx).click(function() {
						var $thisTab = $(this);
						var kdx = $tabs.index($thisTab);
						if (kdx == 0) {
							if ($thisTab.hasClass("deactivated")) {
								$thisTab.removeClass("deactivated");
								$panels.eq(kdx).removeClass("deactivated");
								for (jdx = 1; jdx < $tabs.length; jdx++) {
									if ($tabs.eq(jdx).hasClass("activated")) {
										$tabs.eq(jdx).removeClass("activated");
										$panels.eq(jdx).removeClass("activated");
									}
								}
								$("html, body").animate({
									scrollTop: $thisTab.offset().top
								}, 500);								
							}
						} else {
							if (!$thisTab.hasClass("activated")) {
								if (!$tabs.eq(0).hasClass("deactivated")) {
									$tabs.eq(0).addClass("deactivated");
									$panels.eq(0).addClass("deactivated");
								}
								for (jdx = 1; jdx < kdx; jdx++) {
									if ($tabs.eq(jdx).hasClass("activated")) {
										$tabs.eq(jdx).removeClass("activated");
										$panels.eq(jdx).removeClass("activated");
									}
								}
								$thisTab.addClass("activated");
								$panels.eq(kdx).addClass("activated");
								for (jdx = kdx + 1; jdx < $tabs.length; jdx++) {
									if ($tabs.eq(jdx).hasClass("activated")) {
										$tabs.eq(jdx).removeClass("activated");
										$panels.eq(jdx).removeClass("activated");
									}
								}
								$("html, body").animate({
									scrollTop: $thisTab.offset().top
								}, 500);								
							}
						}
					});
				}
			}
		});
	}

    function initReadMoreToggles(slctrToggleIn, slctrToggleOut, slctrPanel, animDuration) {
        $(slctrToggleIn).click(function () {
            var $this = $(this);
            var $next = $this.next(slctrPanel);
            $this.toggle(animDuration);
            $this.$next.toggle(animDuration);
            $this.$next.next(slctrToggleOut).toggle(animDuration);
        });
        $(slctrToggleOut).click(function () {
            var $this = $(this);
            var $next = $this.next(slctrPanel);
            $this.toggle(animDuration);
            $this.$next.toggle(animDuration);
            $this.$next.next(slctrToggleIn).toggle(animDuration);
        });
    }
	
	function initTocFloating(slctrToc, slctrBackToToc) {
		var $toc = $(slctrToc);
		var $backToToc = $(slctrBackToToc);
		var $linkToTop = $backToToc.first().children("a");
		var $mainHeader = $("header.main-header");
		if($toc.length === 1 && $mainHeader.length === 1) {
			var $window = $(window);
			var tocTrigger = $toc.offset().top + $toc.height() + 100;
			var $tocClone = $toc.clone().addClass("floating").removeAttr("id").insertAfter($toc);
			$tocClone.find("span.title + br").remove();
			$tocClone.find("span.title").remove();
			var counter = 1;
			$tocClone.find("br").each(function () {
				if (counter % 2 != 0) {
					$(this).before(" //");
				}
				$(this).remove();
				counter++;
			});
			if($linkToTop.length === 1) {
				var linkText = $linkToTop.text();
				var idxMatched = linkText.search(/\u2014Back to ([^\u2014]+)\u2014/);
				if(idxMatched != -1) {
					var $linkToTopClone = $linkToTop.clone();
					$linkToTopClone.text(linkText.replace(/\u2014Back to ([^\u2014]+)\u2014/, "$1"));
					$tocClone.prepend(" //&nbsp;");
					$linkToTopClone.prependTo($tocClone);
					$backToToc.remove();
				} else {
					$.logError("initTocFloating", "Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Did not find the correct textual pattern within the link back to the top of the page.' }");
				}
			} else {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Did not find a single hyperlink within the first link back to the top of the page.' }");
			}
			$window.scroll(function(e) {
				var windowScrollPos = $window.scrollTop();
				if(windowScrollPos > tocTrigger && !$tocClone.is(":visible")) {
					$tocClone.width($mainHeader.width() * .8);
					$tocClone.css({
						left: $mainHeader.offset().left + $mainHeader.width() / 2,
					});
					$tocClone.fadeIn(300);
				}
				else if(windowScrollPos <= tocTrigger && $tocClone.is(":visible")) {
					$tocClone.hide();
				}
			});
			$window.resize(function () {
				$tocClone.width($mainHeader.width() * .8);
				$tocClone.css({
					left: $mainHeader.offset().left + $mainHeader.width() / 2,
				});
			});
		}
		else {
			if($toc.length > 1) {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Found more than one table of contents elements; this function only works with one table of contents.' }");
			}
			if($mainHeader.length === 0) {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Could not find the main header  element within the DOM.' }");
			}
			else if($mainHeader.length > 1) {
				console.log("ERROR: { function: initTocFloating, description: 'Cause the table of contents element to float after scrolling past a certain point', whatWentWrong: 'Found more than one table of contents elements; this function only works with one table of contents.' }");
			}
		}
	}
    
    function initTriggeredByHover(slctrTrggrdOnHvr, slctrCntntRvld, slctrCntntHddn, animDuration) {
        $(slctrTrggrdOnHvr).mouseenter(function () {
            var $this = $(this);
            var $rvldCntnt = $this.find(slctrCntntRvld);
            var $hddnCntnt = $this.find(slctrCntntHddn);
            $rvldCntnt.stop().show(animDuration);
            $hddnCntnt.stop().hide(animDuration);
        }).mouseleave(function () {
            var $this = $(this);
            var $rvldCntnt = $this.find(slctrCntntRvld);
            var $hddnCntnt = $this.find(slctrCntntHddn);
            $rvldCntnt.stop().hide(animDuration);
            $hddnCntnt.stop().show(animDuration);
        });
    }
    
    function initWelcomeMessage(slctrWlcmMsg, slctrPostWlcmMsg, msgDelay, fadeOutDuration,
     fadeInDuration) {
        $(slctrWlcmMsg).delay(msgDelay).fadeOut(fadeOutDuration, function () {
            $(slctrPostWlcmMsg).fadeIn(fadeInDuration);
        });
    }

	/*******************************************************************************************************************
	 * LOADED WINDOW FUNCTIONS                                                                                         * 
	 *******************************************************************************************************************/
    function finalizeLrgFrmtSideRight(slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration) {
        if($(window).width() >= trggrWidth) {
            $(slctrSideRight + ">" + slctrColTwo).each(function () {
                var $this = $(this);
                var $thisPrev = $this.prev(slctrColOne);
                if($this.height() != $thisPrev.height() ) {
                    $this.height($thisPrev.height());
                }
                var crrntOpacity = $this.css("opacity");
                if (crrntOpacity == 0) {
                    $this.animate({opacity: 1.0}, animDuration);
                }
            });
        }
    }
	
	/**
	 * showDefinitionListButtons
	 * DESCRIPTION: Display expand/collapse all buttons, which were initially hidden
	 * PARAMETERS:
	 *   += slctrDefList: selector string for locating definition list elements within the DOM that contain collapsible definitions
	 *   += expandAllClass: CSS class for controlling the layout of expand all buttons
	 *   += collapseAllClass: CSS class for controlling the layout of collapse all buttons
	 *   += animFadeInDrtn: the animation speed by which definitions fade into view
	 */
	function showDefinitionListButtons(slctrDefList, expandAllClass, collapseAllClass, animFadeInDrtn) {
		var thisFuncName = "addDefinitionListButtons";
		var thisFuncDesc = "Display expand/collapse all buttons, which were initially hidden";
		
		// Display expand/collapse all buttons
		var $lists = $(slctrDefList);
		var $expandAlls = $lists.children("." + expandAllClass);
		var $collapseAlls = $lists.children("." + collapseAllClass);
		$lists.animate({
			marginTop: "+=39px"
		}, animFadeInDrtn, function() {
			$expandAlls.fadeIn(animFadeInDrtn);
			$collapseAlls.fadeIn(animFadeInDrtn);
		});
	}
		
	/*******************************************************************************************************************
	 * WINDOW-RESIZE TRIGGERED FUNCTIONS                                                                               *
	 *******************************************************************************************************************/
    function resizeLrgFrmtSideRight(slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration) {
        finalizeLrgFrmtSideRight(slctrSideRight, slctrColOne, slctrColTwo, trggrWidth, animDuration);
    }
	
})(jQuery);
/************************************************************************************************************\
| JQUERY-MEDIATED ENHANCED INTERACTIVITY OF GRAVITY FORM FIELDS                                              |
\************************************************************************************************************/
(function ($) {
    "use strict";
    
	$(document).bind("gform_post_render", function () {
		var $rqrdFlds =  $("li.gfield_contains_required");
		checkRqrdInpts($rqrdFlds.find("input"));
		checkRqrdChckbxs($rqrdFlds.find("ul.gfield_checkbox, ul.gfield_radio"));
		checkRqrdTxtAreas($rqrdFlds.find("textarea"));
	});
	$(document).ready(function () {
        if($("div.gform_body").length > 0) {
			initWsuIdInputs(".gf-is-wsu-id");
            setupActvtrChckbxs(".oue-gf-actvtr-checkbox");
            setupActvtrChain(".oue-gf-actvtr-chain");
            setupUploadChain(".oue-gf-upload-chain");
			
            // TODO: streamline functions by querying all ul.gform_fields li.gfield, then determine 
            //   how to handle object by finding div children with gfield_container_class.
			var $rqrdFlds =  $("li.gfield_contains_required");
			hghlghtRqrdInpts($rqrdFlds.find("input"));
			hghlghtRqrdChckbxs($rqrdFlds.find("ul.gfield_checkbox, ul.gfield_radio"));
			hghlghtRqrdTxtAreas($rqrdFlds.find("textarea"));
			hghlghtRqrdSelects($rqrdFlds.find("select"));
        }
    });
	$(window).load(function () {
		hghlghtRqrdRchTxtEdtrs( $( '.gfield_contains_required.uses-rich-editor' ) );
	});
    
    /****************************************************************************************************\
    | Highlight required INPUTS until a value has been properly entered                                  |
    \****************************************************************************************************/
    function checkRqrdInpts ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $thisInput = $(this);
				if ($thisInput.val() == "") {
					$thisInput.removeClass("gf-value-entered");
				}
				else {
					$thisInput.addClass("gf-value-entered");
				}
            });
        }
    }
	
    function hghlghtRqrdInpts ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $thisInput = $(this);
				$thisInput.blur(function () {
					if ($thisInput.val() == "") {
						$thisInput.removeClass("gf-value-entered");
					}
					else {
						$thisInput.addClass("gf-value-entered");
					}
				});
            });
        }
    }

    /****************************************************************************************************\
    | Highlight required CHECKBOXES until at least one has been checked                                  |
    \****************************************************************************************************/
    function checkRqrdChckbxs ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $this = $(this);
                var $inputs = $this.find("input");
				var inputReady = false;
                $inputs.each(function () {
					if ($(this).prop("checked") == true && !inputReady) {
						inputReady = true;
					}
				});
				if (inputReady) {
					$this.addClass("gf-value-entered");
				}
				else {
					$this.removeClass("gf-value-entered");
				}
			});
		}
	}

    function hghlghtRqrdChckbxs ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $this = $(this);
                var $inputs = $this.find("input");
                $inputs.each(function () {
                    var $thisChild = $(this);
                    $thisChild.change(function () {
                        var $thisParent, $parentsInputs;
                        var inputReady = false;
                        
                        $thisParent = $thisChild.parents("ul.gfield_checkbox, ul.gfield_radio");
                        $parentsInputs = $thisParent.find("input");
                        $parentsInputs.each(function () {
                            if ($(this).prop("checked") == true && !inputReady) {
                                inputReady = true;
                            }
                        });
                        if (inputReady) {
                            $thisParent.addClass("gf-value-entered");
                        }
                        else {
                            $thisParent.removeClass("gf-value-entered");
                        }
                    });
                });
            });
        }
    }

    /****************************************************************************************************\
    | Highlight required TEXT AREA inputs until a value has been properly entered                        |
    \****************************************************************************************************/
    function checkRqrdTxtAreas ($fields) {
		checkRqrdInpts($fields);
    }

    function hghlghtRqrdTxtAreas ($fields) {
		hghlghtRqrdInpts($fields);
    }

    /****************************************************************************************************\
    | Highlight required RICH TEXT EDITOR containters until a value has been properly entered            |
    \****************************************************************************************************/
	function hghlghtRqrdRchTxtEdtrs($fields) {
        if ($.isJQueryObj($fields) && $fields.length > 0) {
            $fields.each(function () {
				var $edtrFrm = $(this).find("iframe");
				$edtrFrm.each(function () {
					var $edtrBdy = $(this).contents().find("#tinymce");
					$edtrBdy.css( {
						 backgroundColor: 'rgba(255,0,0,0.1)',
						 fontFamily: '"Open sans", sans-serif'
					} );
					$edtrBdy.focus(function () {
						$(this).css("background-color", "rgba(255,255,255,1)");
					});
					$edtrBdy.blur(function () {
						var $this = $(this);
						if($this.text().replace(/\n|\uFEFF/g, "") == "") {
							$this.css("background-color","rgba(255,0,0,0.1)");
						}
					});
				});
			});
		}
	}

    /****************************************************************************************************\
    | Highlight required SELECTS until at least one has been checked                                     |
    \****************************************************************************************************/
    function hghlghtRqrdSelects ($fields) {
        if ($.isJQueryObj($fields)) {
            $fields.each(function () {
                var $thisInput = $(this);
				var $childSlctdOptn = $thisInput.find("option:selected");
				var optionVal = $childSlctdOptn.text();                        
				if (optionVal != "") {
					$thisInput.addClass("gf-value-entered");
				}
				else {
					$thisInput.removeClass("gf-value-entered");
				}
				$thisInput.change(function () {
					$childSlctdOptn = $thisInput.find("option:selected");
					optionVal = $childSlctdOptn.text();                        
					if (optionVal != "") {
						$thisInput.addClass("gf-value-entered");
					}
					else {
						$thisInput.removeClass("gf-value-entered");
					}
				});
            });
        }
    }

    /****************************************************************************************************\
    | Initialize RegEx filtration of inputs that accept WSU ID numbers                                   |
    \****************************************************************************************************/
    function initWsuIdInputs(slctrInputs) {
        var $wsuIdInputs = $(slctrInputs).find("input[type='text']");
		$wsuIdInputs.keydown(function(e) {
            var $this = $(this);
            var inputText = $this.val();
			if((e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 96) || e.keyCode > 105) &&
			 !~[8, 9, 20, 35, 36, 37, 39, 46, 110, 144].indexOf(e.keyCode) &&
			 !(e.keyCode == 86 && e.ctrlKey)) {
				e.preventDefault();
			}
			else if (!~[8, 9, 20, 35, 36, 37, 39, 46, 110, 144].indexOf(e.keyCode) && inputText.length >= 9) {
				e.preventDefault();
				alert("Note: WSU ID numbers are no greater than nine (9) digits in length.");
			}
		});
        $wsuIdInputs.on("paste", function (e) {
            var $this = $(this);
			var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
			var inputText = clipboardData.getData('Text');
            var regExMask = /[^0-9]+/g;
            if (regExMask.exec(inputText) != null) {
				var errorMsg = "Note: WSU ID numbers can only contain digits.";
				e.stopPropagation();
				e.preventDefault();
                $this.val(inputText.replace(regExMask, ""));
                inputText = $this.val();
				if (inputText.length > 9) {
					$this.val(inputText.slice(0,9));
					errorMsg += " Also, they must be no greater than nine (9) digits in length.";
				}
				errorMsg += " What you pasted will automatically be corrected; please check the result to see if further corrections are needed."
				alert(errorMsg);
            }
            else if (inputText.length > 9) {
				e.stopPropagation();
				e.preventDefault();
                $this.val(inputText.slice(0,9));
				alert("WSU ID numbers are no greater than nine (9) digits in length. What you pasted will automatically be corrected; please check the result to see if further corrections are needed.");
            }
        });
        $wsuIdInputs.blur(function () {
            var $this = $(this);
            var regExFinalPttrn = /(?:^[0-9]{8}$)|(?:^0[0-9]{8}$)/;
            var inputText = $this.val();
			if (inputText != "") {
				if (regExFinalPttrn.exec(inputText) == null) {					
					$this.val("");
					alert("Please try again: when the leading zero is included, WSU ID numbers are nine (9) digits long. (You can also drop the leading zero and enter in eight (8) digits.)");
				}
			}
        });
    }
	
    /****************************************************************************************************\
    | Setup activator checkboxes that disappear once one is selected                                     |
    \****************************************************************************************************/
    function setupActvtrChckbxs (selector) {
        if ($.type(selector) === "string") {
            $(".gform_body").on("change", selector + " input", function () {
                var $thisChild = $(this);
                var $thisParent = $thisChild.parents(selector);
                $thisParent.addClass("gf-activated");
            });
        }
    }
    
    /****************************************************************************************************\
    | Setup a chain of activator checkboxes, wherein once a checkbox is activated/deactivated,           |
    | only its closest previous sibling is hidden/shown.                                                 |
    \****************************************************************************************************/
    function setupActvtrChain (selector) {
        if ($.type(selector) === "string") {
            $(".gform_body").on("change", selector + " input", function () {
                var $thisChild = $(this);
                var $thisParent = $thisChild.parents(selector);
                var $parentPrevSblngs = $thisParent.prevAll(selector);
                if($thisChild.prop("checked")) {
                    $parentPrevSblngs.first().addClass("gf-hidden");
                }
                else {
                    $parentPrevSblngs.first().removeClass("gf-hidden");
                }
            });
        }
    }

    /****************************************************************************************************\
    | Setup a chain of file uploading inputs, wherein only the left-most input in the tree is            |
    | visible. As the user uploads files in sequence, the next nearest neighbor is unveiled.             |
    \****************************************************************************************************/
    function setupUploadChain (selector) {
        if ($.type(selector) === "string") {
            /* CHECK IF UPLOADS ALREADY EXIST:
             *  It is possible to arrive at this point in execution after the user has submitted a
             *  form containing errors that also already contains transcripts uploaded to input
             *  fields that will be hidden by default. The following blocks of code resolve this
             *  situation by showing such fields, as well as their nearest neighbors.
             */
            var $inputs = $(selector + " input[type='file']");
            $inputs.each(function () {
                var $thisInput = $(this);
                var $nextDiv = $thisInput.nextAll("div[id]").first();
                if($nextDiv.length > 0) {
                    $thisInput.addClass("gf-value-entered");
                    var $parentOfInput = $thisInput.parents(selector).first();
                    $parentOfInput.removeClass("gf-hidden");
                    var $parentNextSblngs = $parentOfInput.nextAll(selector).first();
                    $parentNextSblngs.removeClass("gf-hidden");
                }
            });
            $(".gform_body").on("change", selector + " input[type='file']", function () {
                var $thisInput = $(this);
                if($thisInput.prop("files") != null && $thisInput.prop("files").length > 0) {
                    var valuePassed = true;
                    var $parentOfInput = $thisInput.parents(selector).first();
                    var $parentNextSblngs = $parentOfInput.nextAll(selector);
                    var $parentPrevSblngs = $parentOfInput.prevAll(selector);
                    if($parentNextSblngs.length != 0 || $parentPrevSblngs.length != 0) {
                        var originalFileName = $thisInput.prop("files").item(0).name;
                        $parentPrevSblngs.each(function () {
                            if(valuePassed) {
                                var $thisSblng = $(this);
                                var $thisSblngInput = $thisSblng.find("input[type='file']").first();
                                if($thisSblngInput.prop("files") != null && $thisSblngInput.prop("files").length > 0) {
                                    var thisFileName = $thisSblngInput.prop("files").item(0).name;
                                    valuePassed = originalFileName != thisFileName;
                                }
                            }
                        });
                        $parentNextSblngs.each(function () {
                            if(valuePassed) {
                                var $thisSblng = $(this);
                                var $thisSblngInput = $thisSblng.find("input[type='file']").first();
                                if($thisSblngInput.prop("files") != null && $thisSblngInput.prop("files").length > 0) {
                                    var thisFileName = $thisSblngInput.prop("files").item(0).name;
                                    valuePassed = originalFileName != thisFileName;
                                }
                            }
                        });
                    }
                    if(valuePassed) {                      
                        $thisInput.addClass("gf-value-entered");
                        $parentNextSblngs.first().removeClass("gf-hidden");
                    }
                    else
                    {
                        alert("A file with the same name has already been uploaded; please choose a different file.");
                        $thisInput.get(0).value = "";
                    }
                }
                else {
                    $thisChild.removeClass("gf-value-entered");
                }
            });
        }
    }
    
 })(jQuery);
/* qtip2 v3.0.3 | Plugins: tips modal viewport svg imagemap ie6 | Styles: core basic css3 | qtip2.com | Licensed MIT | Wed May 11 2016 22:31:31 */

!function(a,b,c){!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):jQuery&&!jQuery.fn.qtip&&a(jQuery)}(function(d){"use strict";function e(a,b,c,e){this.id=c,this.target=a,this.tooltip=F,this.elements={target:a},this._id=S+"-"+c,this.timers={img:{}},this.options=b,this.plugins={},this.cache={event:{},target:d(),disabled:E,attr:e,onTooltip:E,lastClass:""},this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=E}function f(a){return a===F||"object"!==d.type(a)}function g(a){return!(d.isFunction(a)||a&&a.attr||a.length||"object"===d.type(a)&&(a.jquery||a.then))}function h(a){var b,c,e,h;return f(a)?E:(f(a.metadata)&&(a.metadata={type:a.metadata}),"content"in a&&(b=a.content,f(b)||b.jquery||b.done?(c=g(b)?E:b,b=a.content={text:c}):c=b.text,"ajax"in b&&(e=b.ajax,h=e&&e.once!==E,delete b.ajax,b.text=function(a,b){var f=c||d(this).attr(b.options.content.attr)||"Loading...",g=d.ajax(d.extend({},e,{context:b})).then(e.success,F,e.error).then(function(a){return a&&h&&b.set("content.text",a),a},function(a,c,d){b.destroyed||0===a.status||b.set("content.text",c+": "+d)});return h?f:(b.set("content.text",f),g)}),"title"in b&&(d.isPlainObject(b.title)&&(b.button=b.title.button,b.title=b.title.text),g(b.title||E)&&(b.title=E))),"position"in a&&f(a.position)&&(a.position={my:a.position,at:a.position}),"show"in a&&f(a.show)&&(a.show=a.show.jquery?{target:a.show}:a.show===D?{ready:D}:{event:a.show}),"hide"in a&&f(a.hide)&&(a.hide=a.hide.jquery?{target:a.hide}:{event:a.hide}),"style"in a&&f(a.style)&&(a.style={classes:a.style}),d.each(R,function(){this.sanitize&&this.sanitize(a)}),a)}function i(a,b){for(var c,d=0,e=a,f=b.split(".");e=e[f[d++]];)d<f.length&&(c=e);return[c||a,f.pop()]}function j(a,b){var c,d,e;for(c in this.checks)if(this.checks.hasOwnProperty(c))for(d in this.checks[c])this.checks[c].hasOwnProperty(d)&&(e=new RegExp(d,"i").exec(a))&&(b.push(e),("builtin"===c||this.plugins[c])&&this.checks[c][d].apply(this.plugins[c]||this,b))}function k(a){return V.concat("").join(a?"-"+a+" ":" ")}function l(a,b){return b>0?setTimeout(d.proxy(a,this),b):void a.call(this)}function m(a){this.tooltip.hasClass(aa)||(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this.timers.show=l.call(this,function(){this.toggle(D,a)},this.options.show.delay))}function n(a){if(!this.tooltip.hasClass(aa)&&!this.destroyed){var b=d(a.relatedTarget),c=b.closest(W)[0]===this.tooltip[0],e=b[0]===this.options.show.target[0];if(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this!==b[0]&&"mouse"===this.options.position.target&&c||this.options.hide.fixed&&/mouse(out|leave|move)/.test(a.type)&&(c||e))try{a.preventDefault(),a.stopImmediatePropagation()}catch(f){}else this.timers.hide=l.call(this,function(){this.toggle(E,a)},this.options.hide.delay,this)}}function o(a){!this.tooltip.hasClass(aa)&&this.options.hide.inactive&&(clearTimeout(this.timers.inactive),this.timers.inactive=l.call(this,function(){this.hide(a)},this.options.hide.inactive))}function p(a){this.rendered&&this.tooltip[0].offsetWidth>0&&this.reposition(a)}function q(a,c,e){d(b.body).delegate(a,(c.split?c:c.join("."+S+" "))+"."+S,function(){var a=y.api[d.attr(this,U)];a&&!a.disabled&&e.apply(a,arguments)})}function r(a,c,f){var g,i,j,k,l,m=d(b.body),n=a[0]===b?m:a,o=a.metadata?a.metadata(f.metadata):F,p="html5"===f.metadata.type&&o?o[f.metadata.name]:F,q=a.data(f.metadata.name||"qtipopts");try{q="string"==typeof q?d.parseJSON(q):q}catch(r){}if(k=d.extend(D,{},y.defaults,f,"object"==typeof q?h(q):F,h(p||o)),i=k.position,k.id=c,"boolean"==typeof k.content.text){if(j=a.attr(k.content.attr),k.content.attr===E||!j)return E;k.content.text=j}if(i.container.length||(i.container=m),i.target===E&&(i.target=n),k.show.target===E&&(k.show.target=n),k.show.solo===D&&(k.show.solo=i.container.closest("body")),k.hide.target===E&&(k.hide.target=n),k.position.viewport===D&&(k.position.viewport=i.container),i.container=i.container.eq(0),i.at=new A(i.at,D),i.my=new A(i.my),a.data(S))if(k.overwrite)a.qtip("destroy",!0);else if(k.overwrite===E)return E;return a.attr(T,c),k.suppress&&(l=a.attr("title"))&&a.removeAttr("title").attr(ca,l).attr("title",""),g=new e(a,k,c,!!j),a.data(S,g),g}function s(a){return a.charAt(0).toUpperCase()+a.slice(1)}function t(a,b){var d,e,f=b.charAt(0).toUpperCase()+b.slice(1),g=(b+" "+va.join(f+" ")+f).split(" "),h=0;if(ua[b])return a.css(ua[b]);for(;d=g[h++];)if((e=a.css(d))!==c)return ua[b]=d,e}function u(a,b){return Math.ceil(parseFloat(t(a,b)))}function v(a,b){this._ns="tip",this.options=b,this.offset=b.offset,this.size=[b.width,b.height],this.qtip=a,this.init(a)}function w(a,b){this.options=b,this._ns="-modal",this.qtip=a,this.init(a)}function x(a){this._ns="ie6",this.qtip=a,this.init(a)}var y,z,A,B,C,D=!0,E=!1,F=null,G="x",H="y",I="width",J="height",K="top",L="left",M="bottom",N="right",O="center",P="flipinvert",Q="shift",R={},S="qtip",T="data-hasqtip",U="data-qtip-id",V=["ui-widget","ui-tooltip"],W="."+S,X="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),Y=S+"-fixed",Z=S+"-default",$=S+"-focus",_=S+"-hover",aa=S+"-disabled",ba="_replacedByqTip",ca="oldtitle",da={ie:function(){var a,c;for(a=4,c=b.createElement("div");(c.innerHTML="<!--[if gt IE "+a+"]><i></i><![endif]-->")&&c.getElementsByTagName("i")[0];a+=1);return a>4?a:NaN}(),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||E};z=e.prototype,z._when=function(a){return d.when.apply(d,a)},z.render=function(a){if(this.rendered||this.destroyed)return this;var b=this,c=this.options,e=this.cache,f=this.elements,g=c.content.text,h=c.content.title,i=c.content.button,j=c.position,k=[];return d.attr(this.target[0],"aria-describedby",this._id),e.posClass=this._createPosClass((this.position={my:j.my,at:j.at}).my),this.tooltip=f.tooltip=d("<div/>",{id:this._id,"class":[S,Z,c.style.classes,e.posClass].join(" "),width:c.style.width||"",height:c.style.height||"",tracking:"mouse"===j.target&&j.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":E,"aria-describedby":this._id+"-content","aria-hidden":D}).toggleClass(aa,this.disabled).attr(U,this.id).data(S,this).appendTo(j.container).append(f.content=d("<div />",{"class":S+"-content",id:this._id+"-content","aria-atomic":D})),this.rendered=-1,this.positioning=D,h&&(this._createTitle(),d.isFunction(h)||k.push(this._updateTitle(h,E))),i&&this._createButton(),d.isFunction(g)||k.push(this._updateContent(g,E)),this.rendered=D,this._setWidget(),d.each(R,function(a){var c;"render"===this.initialize&&(c=this(b))&&(b.plugins[a]=c)}),this._unassignEvents(),this._assignEvents(),this._when(k).then(function(){b._trigger("render"),b.positioning=E,b.hiddenDuringWait||!c.show.ready&&!a||b.toggle(D,e.event,E),b.hiddenDuringWait=E}),y.api[this.id]=this,this},z.destroy=function(a){function b(){if(!this.destroyed){this.destroyed=D;var a,b=this.target,c=b.attr(ca);this.rendered&&this.tooltip.stop(1,0).find("*").remove().end().remove(),d.each(this.plugins,function(){this.destroy&&this.destroy()});for(a in this.timers)this.timers.hasOwnProperty(a)&&clearTimeout(this.timers[a]);b.removeData(S).removeAttr(U).removeAttr(T).removeAttr("aria-describedby"),this.options.suppress&&c&&b.attr("title",c).removeAttr(ca),this._unassignEvents(),this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=F,delete y.api[this.id]}}return this.destroyed?this.target:(a===D&&"hide"!==this.triggering||!this.rendered?b.call(this):(this.tooltip.one("tooltiphidden",d.proxy(b,this)),!this.triggering&&this.hide()),this.target)},B=z.checks={builtin:{"^id$":function(a,b,c,e){var f=c===D?y.nextid:c,g=S+"-"+f;f!==E&&f.length>0&&!d("#"+g).length?(this._id=g,this.rendered&&(this.tooltip[0].id=this._id,this.elements.content[0].id=this._id+"-content",this.elements.title[0].id=this._id+"-title")):a[b]=e},"^prerender":function(a,b,c){c&&!this.rendered&&this.render(this.options.show.ready)},"^content.text$":function(a,b,c){this._updateContent(c)},"^content.attr$":function(a,b,c,d){this.options.content.text===this.target.attr(d)&&this._updateContent(this.target.attr(c))},"^content.title$":function(a,b,c){return c?(c&&!this.elements.title&&this._createTitle(),void this._updateTitle(c)):this._removeTitle()},"^content.button$":function(a,b,c){this._updateButton(c)},"^content.title.(text|button)$":function(a,b,c){this.set("content."+b,c)},"^position.(my|at)$":function(a,b,c){"string"==typeof c&&(this.position[b]=a[b]=new A(c,"at"===b))},"^position.container$":function(a,b,c){this.rendered&&this.tooltip.appendTo(c)},"^show.ready$":function(a,b,c){c&&(!this.rendered&&this.render(D)||this.toggle(D))},"^style.classes$":function(a,b,c,d){this.rendered&&this.tooltip.removeClass(d).addClass(c)},"^style.(width|height)":function(a,b,c){this.rendered&&this.tooltip.css(b,c)},"^style.widget|content.title":function(){this.rendered&&this._setWidget()},"^style.def":function(a,b,c){this.rendered&&this.tooltip.toggleClass(Z,!!c)},"^events.(render|show|move|hide|focus|blur)$":function(a,b,c){this.rendered&&this.tooltip[(d.isFunction(c)?"":"un")+"bind"]("tooltip"+b,c)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){if(this.rendered){var a=this.options.position;this.tooltip.attr("tracking","mouse"===a.target&&a.adjust.mouse),this._unassignEvents(),this._assignEvents()}}}},z.get=function(a){if(this.destroyed)return this;var b=i(this.options,a.toLowerCase()),c=b[0][b[1]];return c.precedance?c.string():c};var ea=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,fa=/^prerender|show\.ready/i;z.set=function(a,b){if(this.destroyed)return this;var c,e=this.rendered,f=E,g=this.options;return"string"==typeof a?(c=a,a={},a[c]=b):a=d.extend({},a),d.each(a,function(b,c){if(e&&fa.test(b))return void delete a[b];var h,j=i(g,b.toLowerCase());h=j[0][j[1]],j[0][j[1]]=c&&c.nodeType?d(c):c,f=ea.test(b)||f,a[b]=[j[0],j[1],c,h]}),h(g),this.positioning=D,d.each(a,d.proxy(j,this)),this.positioning=E,this.rendered&&this.tooltip[0].offsetWidth>0&&f&&this.reposition("mouse"===g.position.target?F:this.cache.event),this},z._update=function(a,b){var c=this,e=this.cache;return this.rendered&&a?(d.isFunction(a)&&(a=a.call(this.elements.target,e.event,this)||""),d.isFunction(a.then)?(e.waiting=D,a.then(function(a){return e.waiting=E,c._update(a,b)},F,function(a){return c._update(a,b)})):a===E||!a&&""!==a?E:(a.jquery&&a.length>0?b.empty().append(a.css({display:"block",visibility:"visible"})):b.html(a),this._waitForContent(b).then(function(a){c.rendered&&c.tooltip[0].offsetWidth>0&&c.reposition(e.event,!a.length)}))):E},z._waitForContent=function(a){var b=this.cache;return b.waiting=D,(d.fn.imagesLoaded?a.imagesLoaded():(new d.Deferred).resolve([])).done(function(){b.waiting=E}).promise()},z._updateContent=function(a,b){this._update(a,this.elements.content,b)},z._updateTitle=function(a,b){this._update(a,this.elements.title,b)===E&&this._removeTitle(E)},z._createTitle=function(){var a=this.elements,b=this._id+"-title";a.titlebar&&this._removeTitle(),a.titlebar=d("<div />",{"class":S+"-titlebar "+(this.options.style.widget?k("header"):"")}).append(a.title=d("<div />",{id:b,"class":S+"-title","aria-atomic":D})).insertBefore(a.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(a){d(this).toggleClass("ui-state-active ui-state-focus","down"===a.type.substr(-4))}).delegate(".qtip-close","mouseover mouseout",function(a){d(this).toggleClass("ui-state-hover","mouseover"===a.type)}),this.options.content.button&&this._createButton()},z._removeTitle=function(a){var b=this.elements;b.title&&(b.titlebar.remove(),b.titlebar=b.title=b.button=F,a!==E&&this.reposition())},z._createPosClass=function(a){return S+"-pos-"+(a||this.options.position.my).abbrev()},z.reposition=function(c,e){if(!this.rendered||this.positioning||this.destroyed)return this;this.positioning=D;var f,g,h,i,j=this.cache,k=this.tooltip,l=this.options.position,m=l.target,n=l.my,o=l.at,p=l.viewport,q=l.container,r=l.adjust,s=r.method.split(" "),t=k.outerWidth(E),u=k.outerHeight(E),v=0,w=0,x=k.css("position"),y={left:0,top:0},z=k[0].offsetWidth>0,A=c&&"scroll"===c.type,B=d(a),C=q[0].ownerDocument,F=this.mouse;if(d.isArray(m)&&2===m.length)o={x:L,y:K},y={left:m[0],top:m[1]};else if("mouse"===m)o={x:L,y:K},(!r.mouse||this.options.hide.distance)&&j.origin&&j.origin.pageX?c=j.origin:!c||c&&("resize"===c.type||"scroll"===c.type)?c=j.event:F&&F.pageX&&(c=F),"static"!==x&&(y=q.offset()),C.body.offsetWidth!==(a.innerWidth||C.documentElement.clientWidth)&&(g=d(b.body).offset()),y={left:c.pageX-y.left+(g&&g.left||0),top:c.pageY-y.top+(g&&g.top||0)},r.mouse&&A&&F&&(y.left-=(F.scrollX||0)-B.scrollLeft(),y.top-=(F.scrollY||0)-B.scrollTop());else{if("event"===m?c&&c.target&&"scroll"!==c.type&&"resize"!==c.type?j.target=d(c.target):c.target||(j.target=this.elements.target):"event"!==m&&(j.target=d(m.jquery?m:this.elements.target)),m=j.target,m=d(m).eq(0),0===m.length)return this;m[0]===b||m[0]===a?(v=da.iOS?a.innerWidth:m.width(),w=da.iOS?a.innerHeight:m.height(),m[0]===a&&(y={top:(p||m).scrollTop(),left:(p||m).scrollLeft()})):R.imagemap&&m.is("area")?f=R.imagemap(this,m,o,R.viewport?s:E):R.svg&&m&&m[0].ownerSVGElement?f=R.svg(this,m,o,R.viewport?s:E):(v=m.outerWidth(E),w=m.outerHeight(E),y=m.offset()),f&&(v=f.width,w=f.height,g=f.offset,y=f.position),y=this.reposition.offset(m,y,q),(da.iOS>3.1&&da.iOS<4.1||da.iOS>=4.3&&da.iOS<4.33||!da.iOS&&"fixed"===x)&&(y.left-=B.scrollLeft(),y.top-=B.scrollTop()),(!f||f&&f.adjustable!==E)&&(y.left+=o.x===N?v:o.x===O?v/2:0,y.top+=o.y===M?w:o.y===O?w/2:0)}return y.left+=r.x+(n.x===N?-t:n.x===O?-t/2:0),y.top+=r.y+(n.y===M?-u:n.y===O?-u/2:0),R.viewport?(h=y.adjusted=R.viewport(this,y,l,v,w,t,u),g&&h.left&&(y.left+=g.left),g&&h.top&&(y.top+=g.top),h.my&&(this.position.my=h.my)):y.adjusted={left:0,top:0},j.posClass!==(i=this._createPosClass(this.position.my))&&(j.posClass=i,k.removeClass(j.posClass).addClass(i)),this._trigger("move",[y,p.elem||p],c)?(delete y.adjusted,e===E||!z||isNaN(y.left)||isNaN(y.top)||"mouse"===m||!d.isFunction(l.effect)?k.css(y):d.isFunction(l.effect)&&(l.effect.call(k,this,d.extend({},y)),k.queue(function(a){d(this).css({opacity:"",height:""}),da.ie&&this.style.removeAttribute("filter"),a()})),this.positioning=E,this):this},z.reposition.offset=function(a,c,e){function f(a,b){c.left+=b*a.scrollLeft(),c.top+=b*a.scrollTop()}if(!e[0])return c;var g,h,i,j,k=d(a[0].ownerDocument),l=!!da.ie&&"CSS1Compat"!==b.compatMode,m=e[0];do"static"!==(h=d.css(m,"position"))&&("fixed"===h?(i=m.getBoundingClientRect(),f(k,-1)):(i=d(m).position(),i.left+=parseFloat(d.css(m,"borderLeftWidth"))||0,i.top+=parseFloat(d.css(m,"borderTopWidth"))||0),c.left-=i.left+(parseFloat(d.css(m,"marginLeft"))||0),c.top-=i.top+(parseFloat(d.css(m,"marginTop"))||0),g||"hidden"===(j=d.css(m,"overflow"))||"visible"===j||(g=d(m)));while(m=m.offsetParent);return g&&(g[0]!==k[0]||l)&&f(g,1),c};var ga=(A=z.reposition.Corner=function(a,b){a=(""+a).replace(/([A-Z])/," $1").replace(/middle/gi,O).toLowerCase(),this.x=(a.match(/left|right/i)||a.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(a.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase(),this.forceY=!!b;var c=a.charAt(0);this.precedance="t"===c||"b"===c?H:G}).prototype;ga.invert=function(a,b){this[a]=this[a]===L?N:this[a]===N?L:b||this[a]},ga.string=function(a){var b=this.x,c=this.y,d=b!==c?"center"===b||"center"!==c&&(this.precedance===H||this.forceY)?[c,b]:[b,c]:[b];return a!==!1?d.join(" "):d},ga.abbrev=function(){var a=this.string(!1);return a[0].charAt(0)+(a[1]&&a[1].charAt(0)||"")},ga.clone=function(){return new A(this.string(),this.forceY)},z.toggle=function(a,c){var e=this.cache,f=this.options,g=this.tooltip;if(c){if(/over|enter/.test(c.type)&&e.event&&/out|leave/.test(e.event.type)&&f.show.target.add(c.target).length===f.show.target.length&&g.has(c.relatedTarget).length)return this;e.event=d.event.fix(c)}if(this.waiting&&!a&&(this.hiddenDuringWait=D),!this.rendered)return a?this.render(1):this;if(this.destroyed||this.disabled)return this;var h,i,j,k=a?"show":"hide",l=this.options[k],m=this.options.position,n=this.options.content,o=this.tooltip.css("width"),p=this.tooltip.is(":visible"),q=a||1===l.target.length,r=!c||l.target.length<2||e.target[0]===c.target;return(typeof a).search("boolean|number")&&(a=!p),h=!g.is(":animated")&&p===a&&r,i=h?F:!!this._trigger(k,[90]),this.destroyed?this:(i!==E&&a&&this.focus(c),!i||h?this:(d.attr(g[0],"aria-hidden",!a),a?(this.mouse&&(e.origin=d.event.fix(this.mouse)),d.isFunction(n.text)&&this._updateContent(n.text,E),d.isFunction(n.title)&&this._updateTitle(n.title,E),!C&&"mouse"===m.target&&m.adjust.mouse&&(d(b).bind("mousemove."+S,this._storeMouse),C=D),o||g.css("width",g.outerWidth(E)),this.reposition(c,arguments[2]),o||g.css("width",""),l.solo&&("string"==typeof l.solo?d(l.solo):d(W,l.solo)).not(g).not(l.target).qtip("hide",new d.Event("tooltipsolo"))):(clearTimeout(this.timers.show),delete e.origin,C&&!d(W+'[tracking="true"]:visible',l.solo).not(g).length&&(d(b).unbind("mousemove."+S),C=E),this.blur(c)),j=d.proxy(function(){a?(da.ie&&g[0].style.removeAttribute("filter"),g.css("overflow",""),"string"==typeof l.autofocus&&d(this.options.show.autofocus,g).focus(),this.options.show.target.trigger("qtip-"+this.id+"-inactive")):g.css({display:"",visibility:"",opacity:"",left:"",top:""}),this._trigger(a?"visible":"hidden")},this),l.effect===E||q===E?(g[k](),j()):d.isFunction(l.effect)?(g.stop(1,1),l.effect.call(g,this),g.queue("fx",function(a){j(),a()})):g.fadeTo(90,a?1:0,j),a&&l.target.trigger("qtip-"+this.id+"-inactive"),this))},z.show=function(a){return this.toggle(D,a)},z.hide=function(a){return this.toggle(E,a)},z.focus=function(a){if(!this.rendered||this.destroyed)return this;var b=d(W),c=this.tooltip,e=parseInt(c[0].style.zIndex,10),f=y.zindex+b.length;return c.hasClass($)||this._trigger("focus",[f],a)&&(e!==f&&(b.each(function(){this.style.zIndex>e&&(this.style.zIndex=this.style.zIndex-1)}),b.filter("."+$).qtip("blur",a)),c.addClass($)[0].style.zIndex=f),this},z.blur=function(a){return!this.rendered||this.destroyed?this:(this.tooltip.removeClass($),this._trigger("blur",[this.tooltip.css("zIndex")],a),this)},z.disable=function(a){return this.destroyed?this:("toggle"===a?a=!(this.rendered?this.tooltip.hasClass(aa):this.disabled):"boolean"!=typeof a&&(a=D),this.rendered&&this.tooltip.toggleClass(aa,a).attr("aria-disabled",a),this.disabled=!!a,this)},z.enable=function(){return this.disable(E)},z._createButton=function(){var a=this,b=this.elements,c=b.tooltip,e=this.options.content.button,f="string"==typeof e,g=f?e:"Close tooltip";b.button&&b.button.remove(),e.jquery?b.button=e:b.button=d("<a />",{"class":"qtip-close "+(this.options.style.widget?"":S+"-icon"),title:g,"aria-label":g}).prepend(d("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"})),b.button.appendTo(b.titlebar||c).attr("role","button").click(function(b){return c.hasClass(aa)||a.hide(b),E})},z._updateButton=function(a){if(!this.rendered)return E;var b=this.elements.button;a?this._createButton():b.remove()},z._setWidget=function(){var a=this.options.style.widget,b=this.elements,c=b.tooltip,d=c.hasClass(aa);c.removeClass(aa),aa=a?"ui-state-disabled":"qtip-disabled",c.toggleClass(aa,d),c.toggleClass("ui-helper-reset "+k(),a).toggleClass(Z,this.options.style.def&&!a),b.content&&b.content.toggleClass(k("content"),a),b.titlebar&&b.titlebar.toggleClass(k("header"),a),b.button&&b.button.toggleClass(S+"-icon",!a)},z._storeMouse=function(a){return(this.mouse=d.event.fix(a)).type="mousemove",this},z._bind=function(a,b,c,e,f){if(a&&c&&b.length){var g="."+this._id+(e?"-"+e:"");return d(a).bind((b.split?b:b.join(g+" "))+g,d.proxy(c,f||this)),this}},z._unbind=function(a,b){return a&&d(a).unbind("."+this._id+(b?"-"+b:"")),this},z._trigger=function(a,b,c){var e=new d.Event("tooltip"+a);return e.originalEvent=c&&d.extend({},c)||this.cache.event||F,this.triggering=a,this.tooltip.trigger(e,[this].concat(b||[])),this.triggering=E,!e.isDefaultPrevented()},z._bindEvents=function(a,b,c,e,f,g){var h=c.filter(e).add(e.filter(c)),i=[];h.length&&(d.each(b,function(b,c){var e=d.inArray(c,a);e>-1&&i.push(a.splice(e,1)[0])}),i.length&&(this._bind(h,i,function(a){var b=this.rendered?this.tooltip[0].offsetWidth>0:!1;(b?g:f).call(this,a)}),c=c.not(h),e=e.not(h))),this._bind(c,a,f),this._bind(e,b,g)},z._assignInitialEvents=function(a){function b(a){return this.disabled||this.destroyed?E:(this.cache.event=a&&d.event.fix(a),this.cache.target=a&&d(a.target),clearTimeout(this.timers.show),void(this.timers.show=l.call(this,function(){this.render("object"==typeof a||c.show.ready)},c.prerender?0:c.show.delay)))}var c=this.options,e=c.show.target,f=c.hide.target,g=c.show.event?d.trim(""+c.show.event).split(" "):[],h=c.hide.event?d.trim(""+c.hide.event).split(" "):[];this._bind(this.elements.target,["remove","removeqtip"],function(){this.destroy(!0)},"destroy"),/mouse(over|enter)/i.test(c.show.event)&&!/mouse(out|leave)/i.test(c.hide.event)&&h.push("mouseleave"),this._bind(e,"mousemove",function(a){this._storeMouse(a),this.cache.onTarget=D}),this._bindEvents(g,h,e,f,b,function(){return this.timers?void clearTimeout(this.timers.show):E}),(c.show.ready||c.prerender)&&b.call(this,a)},z._assignEvents=function(){var c=this,e=this.options,f=e.position,g=this.tooltip,h=e.show.target,i=e.hide.target,j=f.container,k=f.viewport,l=d(b),q=d(a),r=e.show.event?d.trim(""+e.show.event).split(" "):[],s=e.hide.event?d.trim(""+e.hide.event).split(" "):[];d.each(e.events,function(a,b){c._bind(g,"toggle"===a?["tooltipshow","tooltiphide"]:["tooltip"+a],b,null,g)}),/mouse(out|leave)/i.test(e.hide.event)&&"window"===e.hide.leave&&this._bind(l,["mouseout","blur"],function(a){/select|option/.test(a.target.nodeName)||a.relatedTarget||this.hide(a)}),e.hide.fixed?i=i.add(g.addClass(Y)):/mouse(over|enter)/i.test(e.show.event)&&this._bind(i,"mouseleave",function(){clearTimeout(this.timers.show)}),(""+e.hide.event).indexOf("unfocus")>-1&&this._bind(j.closest("html"),["mousedown","touchstart"],function(a){var b=d(a.target),c=this.rendered&&!this.tooltip.hasClass(aa)&&this.tooltip[0].offsetWidth>0,e=b.parents(W).filter(this.tooltip[0]).length>0;b[0]===this.target[0]||b[0]===this.tooltip[0]||e||this.target.has(b[0]).length||!c||this.hide(a)}),"number"==typeof e.hide.inactive&&(this._bind(h,"qtip-"+this.id+"-inactive",o,"inactive"),this._bind(i.add(g),y.inactiveEvents,o)),this._bindEvents(r,s,h,i,m,n),this._bind(h.add(g),"mousemove",function(a){if("number"==typeof e.hide.distance){var b=this.cache.origin||{},c=this.options.hide.distance,d=Math.abs;(d(a.pageX-b.pageX)>=c||d(a.pageY-b.pageY)>=c)&&this.hide(a)}this._storeMouse(a)}),"mouse"===f.target&&f.adjust.mouse&&(e.hide.event&&this._bind(h,["mouseenter","mouseleave"],function(a){return this.cache?void(this.cache.onTarget="mouseenter"===a.type):E}),this._bind(l,"mousemove",function(a){this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(aa)&&this.tooltip[0].offsetWidth>0&&this.reposition(a)})),(f.adjust.resize||k.length)&&this._bind(d.event.special.resize?k:q,"resize",p),f.adjust.scroll&&this._bind(q.add(f.container),"scroll",p)},z._unassignEvents=function(){var c=this.options,e=c.show.target,f=c.hide.target,g=d.grep([this.elements.target[0],this.rendered&&this.tooltip[0],c.position.container[0],c.position.viewport[0],c.position.container.closest("html")[0],a,b],function(a){return"object"==typeof a});e&&e.toArray&&(g=g.concat(e.toArray())),f&&f.toArray&&(g=g.concat(f.toArray())),this._unbind(g)._unbind(g,"destroy")._unbind(g,"inactive")},d(function(){q(W,["mouseenter","mouseleave"],function(a){var b="mouseenter"===a.type,c=d(a.currentTarget),e=d(a.relatedTarget||a.target),f=this.options;b?(this.focus(a),c.hasClass(Y)&&!c.hasClass(aa)&&clearTimeout(this.timers.hide)):"mouse"===f.position.target&&f.position.adjust.mouse&&f.hide.event&&f.show.target&&!e.closest(f.show.target[0]).length&&this.hide(a),c.toggleClass(_,b)}),q("["+U+"]",X,o)}),y=d.fn.qtip=function(a,b,e){var f=(""+a).toLowerCase(),g=F,i=d.makeArray(arguments).slice(1),j=i[i.length-1],k=this[0]?d.data(this[0],S):F;return!arguments.length&&k||"api"===f?k:"string"==typeof a?(this.each(function(){var a=d.data(this,S);if(!a)return D;if(j&&j.timeStamp&&(a.cache.event=j),!b||"option"!==f&&"options"!==f)a[f]&&a[f].apply(a,i);else{if(e===c&&!d.isPlainObject(b))return g=a.get(b),E;a.set(b,e)}}),g!==F?g:this):"object"!=typeof a&&arguments.length?void 0:(k=h(d.extend(D,{},a)),this.each(function(a){var b,c;return c=d.isArray(k.id)?k.id[a]:k.id,c=!c||c===E||c.length<1||y.api[c]?y.nextid++:c,b=r(d(this),c,k),b===E?D:(y.api[c]=b,d.each(R,function(){"initialize"===this.initialize&&this(b)}),void b._assignInitialEvents(j))}))},d.qtip=e,y.api={},d.each({attr:function(a,b){if(this.length){var c=this[0],e="title",f=d.data(c,"qtip");if(a===e&&f&&f.options&&"object"==typeof f&&"object"==typeof f.options&&f.options.suppress)return arguments.length<2?d.attr(c,ca):(f&&f.options.content.attr===e&&f.cache.attr&&f.set("content.text",b),this.attr(ca,b))}return d.fn["attr"+ba].apply(this,arguments)},clone:function(a){var b=d.fn["clone"+ba].apply(this,arguments);return a||b.filter("["+ca+"]").attr("title",function(){return d.attr(this,ca)}).removeAttr(ca),b}},function(a,b){if(!b||d.fn[a+ba])return D;var c=d.fn[a+ba]=d.fn[a];d.fn[a]=function(){return b.apply(this,arguments)||c.apply(this,arguments)}}),d.ui||(d["cleanData"+ba]=d.cleanData,d.cleanData=function(a){for(var b,c=0;(b=d(a[c])).length;c++)if(b.attr(T))try{b.triggerHandler("removeqtip")}catch(e){}d["cleanData"+ba].apply(this,arguments)}),y.version="3.0.3",y.nextid=0,y.inactiveEvents=X,y.zindex=15e3,y.defaults={prerender:E,id:E,overwrite:D,suppress:D,content:{text:D,attr:"title",title:E,button:E},position:{my:"top left",at:"bottom right",target:E,container:E,viewport:E,adjust:{x:0,y:0,mouse:D,scroll:D,resize:D,method:"flipinvert flipinvert"},effect:function(a,b){d(this).animate(b,{duration:200,queue:E})}},show:{target:E,event:"mouseenter",effect:D,delay:90,solo:E,ready:E,autofocus:E},hide:{target:E,event:"mouseleave",effect:D,delay:0,fixed:E,inactive:E,leave:"window",distance:E},style:{classes:"",widget:E,width:E,height:E,def:D},events:{render:F,move:F,show:F,hide:F,toggle:F,visible:F,hidden:F,focus:F,blur:F}};var ha,ia,ja,ka,la,ma="margin",na="border",oa="color",pa="background-color",qa="transparent",ra=" !important",sa=!!b.createElement("canvas").getContext,ta=/rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,ua={},va=["Webkit","O","Moz","ms"];sa?(ka=a.devicePixelRatio||1,la=function(){var a=b.createElement("canvas").getContext("2d");return a.backingStorePixelRatio||a.webkitBackingStorePixelRatio||a.mozBackingStorePixelRatio||a.msBackingStorePixelRatio||a.oBackingStorePixelRatio||1}(),ja=ka/la):ia=function(a,b,c){return"<qtipvml:"+a+' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" '+(b||"")+' style="behavior: url(#default#VML); '+(c||"")+'" />'},d.extend(v.prototype,{init:function(a){var b,c;c=this.element=a.elements.tip=d("<div />",{"class":S+"-tip"}).prependTo(a.tooltip),sa?(b=d("<canvas />").appendTo(this.element)[0].getContext("2d"),b.lineJoin="miter",b.miterLimit=1e5,b.save()):(b=ia("shape",'coordorigin="0,0"',"position:absolute;"),this.element.html(b+b),a._bind(d("*",c).add(c),["click","mousedown"],function(a){a.stopPropagation()},this._ns)),a._bind(a.tooltip,"tooltipmove",this.reposition,this._ns,this),this.create()},_swapDimensions:function(){this.size[0]=this.options.height,this.size[1]=this.options.width},_resetDimensions:function(){this.size[0]=this.options.width,this.size[1]=this.options.height},_useTitle:function(a){var b=this.qtip.elements.titlebar;return b&&(a.y===K||a.y===O&&this.element.position().top+this.size[1]/2+this.options.offset<b.outerHeight(D))},_parseCorner:function(a){var b=this.qtip.options.position.my;return a===E||b===E?a=E:a===D?a=new A(b.string()):a.string||(a=new A(a),a.fixed=D),a},_parseWidth:function(a,b,c){var d=this.qtip.elements,e=na+s(b)+"Width";return(c?u(c,e):u(d.content,e)||u(this._useTitle(a)&&d.titlebar||d.content,e)||u(d.tooltip,e))||0},_parseRadius:function(a){var b=this.qtip.elements,c=na+s(a.y)+s(a.x)+"Radius";return da.ie<9?0:u(this._useTitle(a)&&b.titlebar||b.content,c)||u(b.tooltip,c)||0},_invalidColour:function(a,b,c){var d=a.css(b);return!d||c&&d===a.css(c)||ta.test(d)?E:d},_parseColours:function(a){var b=this.qtip.elements,c=this.element.css("cssText",""),e=na+s(a[a.precedance])+s(oa),f=this._useTitle(a)&&b.titlebar||b.content,g=this._invalidColour,h=[];return h[0]=g(c,pa)||g(f,pa)||g(b.content,pa)||g(b.tooltip,pa)||c.css(pa),h[1]=g(c,e,oa)||g(f,e,oa)||g(b.content,e,oa)||g(b.tooltip,e,oa)||b.tooltip.css(e),d("*",c).add(c).css("cssText",pa+":"+qa+ra+";"+na+":0"+ra+";"),h},_calculateSize:function(a){var b,c,d,e=a.precedance===H,f=this.options.width,g=this.options.height,h="c"===a.abbrev(),i=(e?f:g)*(h?.5:1),j=Math.pow,k=Math.round,l=Math.sqrt(j(i,2)+j(g,2)),m=[this.border/i*l,this.border/g*l];return m[2]=Math.sqrt(j(m[0],2)-j(this.border,2)),m[3]=Math.sqrt(j(m[1],2)-j(this.border,2)),b=l+m[2]+m[3]+(h?0:m[0]),c=b/l,d=[k(c*f),k(c*g)],e?d:d.reverse()},_calculateTip:function(a,b,c){c=c||1,b=b||this.size;var d=b[0]*c,e=b[1]*c,f=Math.ceil(d/2),g=Math.ceil(e/2),h={br:[0,0,d,e,d,0],bl:[0,0,d,0,0,e],tr:[0,e,d,0,d,e],tl:[0,0,0,e,d,e],tc:[0,e,f,0,d,e],bc:[0,0,d,0,f,e],rc:[0,0,d,g,0,e],lc:[d,0,d,e,0,g]};return h.lt=h.br,h.rt=h.bl,h.lb=h.tr,h.rb=h.tl,h[a.abbrev()]},_drawCoords:function(a,b){a.beginPath(),a.moveTo(b[0],b[1]),a.lineTo(b[2],b[3]),a.lineTo(b[4],b[5]),a.closePath()},create:function(){var a=this.corner=(sa||da.ie)&&this._parseCorner(this.options.corner);return this.enabled=!!this.corner&&"c"!==this.corner.abbrev(),this.enabled&&(this.qtip.cache.corner=a.clone(),this.update()),this.element.toggle(this.enabled),this.corner},update:function(b,c){if(!this.enabled)return this;var e,f,g,h,i,j,k,l,m=this.qtip.elements,n=this.element,o=n.children(),p=this.options,q=this.size,r=p.mimic,s=Math.round;b||(b=this.qtip.cache.corner||this.corner),r===E?r=b:(r=new A(r),r.precedance=b.precedance,"inherit"===r.x?r.x=b.x:"inherit"===r.y?r.y=b.y:r.x===r.y&&(r[b.precedance]=b[b.precedance])),f=r.precedance,b.precedance===G?this._swapDimensions():this._resetDimensions(),e=this.color=this._parseColours(b),e[1]!==qa?(l=this.border=this._parseWidth(b,b[b.precedance]),p.border&&1>l&&!ta.test(e[1])&&(e[0]=e[1]),this.border=l=p.border!==D?p.border:l):this.border=l=0,k=this.size=this._calculateSize(b),n.css({width:k[0],height:k[1],lineHeight:k[1]+"px"}),j=b.precedance===H?[s(r.x===L?l:r.x===N?k[0]-q[0]-l:(k[0]-q[0])/2),s(r.y===K?k[1]-q[1]:0)]:[s(r.x===L?k[0]-q[0]:0),s(r.y===K?l:r.y===M?k[1]-q[1]-l:(k[1]-q[1])/2)],sa?(g=o[0].getContext("2d"),g.restore(),g.save(),g.clearRect(0,0,6e3,6e3),h=this._calculateTip(r,q,ja),i=this._calculateTip(r,this.size,ja),o.attr(I,k[0]*ja).attr(J,k[1]*ja),o.css(I,k[0]).css(J,k[1]),this._drawCoords(g,i),g.fillStyle=e[1],g.fill(),g.translate(j[0]*ja,j[1]*ja),this._drawCoords(g,h),g.fillStyle=e[0],g.fill()):(h=this._calculateTip(r),h="m"+h[0]+","+h[1]+" l"+h[2]+","+h[3]+" "+h[4]+","+h[5]+" xe",j[2]=l&&/^(r|b)/i.test(b.string())?8===da.ie?2:1:0,o.css({coordsize:k[0]+l+" "+k[1]+l,antialias:""+(r.string().indexOf(O)>-1),left:j[0]-j[2]*Number(f===G),top:j[1]-j[2]*Number(f===H),width:k[0]+l,height:k[1]+l}).each(function(a){var b=d(this);b[b.prop?"prop":"attr"]({coordsize:k[0]+l+" "+k[1]+l,path:h,fillcolor:e[0],filled:!!a,stroked:!a}).toggle(!(!l&&!a)),!a&&b.html(ia("stroke",'weight="'+2*l+'px" color="'+e[1]+'" miterlimit="1000" joinstyle="miter"'))})),a.opera&&setTimeout(function(){m.tip.css({display:"inline-block",visibility:"visible"})},1),c!==E&&this.calculate(b,k)},calculate:function(a,b){if(!this.enabled)return E;var c,e,f=this,g=this.qtip.elements,h=this.element,i=this.options.offset,j={};
return a=a||this.corner,c=a.precedance,b=b||this._calculateSize(a),e=[a.x,a.y],c===G&&e.reverse(),d.each(e,function(d,e){var h,k,l;e===O?(h=c===H?L:K,j[h]="50%",j[ma+"-"+h]=-Math.round(b[c===H?0:1]/2)+i):(h=f._parseWidth(a,e,g.tooltip),k=f._parseWidth(a,e,g.content),l=f._parseRadius(a),j[e]=Math.max(-f.border,d?k:i+(l>h?l:-h)))}),j[a[c]]-=b[c===G?0:1],h.css({margin:"",top:"",bottom:"",left:"",right:""}).css(j),j},reposition:function(a,b,d){function e(a,b,c,d,e){a===Q&&j.precedance===b&&k[d]&&j[c]!==O?j.precedance=j.precedance===G?H:G:a!==Q&&k[d]&&(j[b]=j[b]===O?k[d]>0?d:e:j[b]===d?e:d)}function f(a,b,e){j[a]===O?p[ma+"-"+b]=o[a]=g[ma+"-"+b]-k[b]:(h=g[e]!==c?[k[b],-g[b]]:[-k[b],g[b]],(o[a]=Math.max(h[0],h[1]))>h[0]&&(d[b]-=k[b],o[b]=E),p[g[e]!==c?e:b]=o[a])}if(this.enabled){var g,h,i=b.cache,j=this.corner.clone(),k=d.adjusted,l=b.options.position.adjust.method.split(" "),m=l[0],n=l[1]||l[0],o={left:E,top:E,x:0,y:0},p={};this.corner.fixed!==D&&(e(m,G,H,L,N),e(n,H,G,K,M),j.string()===i.corner.string()&&i.cornerTop===k.top&&i.cornerLeft===k.left||this.update(j,E)),g=this.calculate(j),g.right!==c&&(g.left=-g.right),g.bottom!==c&&(g.top=-g.bottom),g.user=this.offset,o.left=m===Q&&!!k.left,o.left&&f(G,L,N),o.top=n===Q&&!!k.top,o.top&&f(H,K,M),this.element.css(p).toggle(!(o.x&&o.y||j.x===O&&o.y||j.y===O&&o.x)),d.left-=g.left.charAt?g.user:m!==Q||o.top||!o.left&&!o.top?g.left+this.border:0,d.top-=g.top.charAt?g.user:n!==Q||o.left||!o.left&&!o.top?g.top+this.border:0,i.cornerLeft=k.left,i.cornerTop=k.top,i.corner=j.clone()}},destroy:function(){this.qtip._unbind(this.qtip.tooltip,this._ns),this.qtip.elements.tip&&this.qtip.elements.tip.find("*").remove().end().remove()}}),ha=R.tip=function(a){return new v(a,a.options.style.tip)},ha.initialize="render",ha.sanitize=function(a){if(a.style&&"tip"in a.style){var b=a.style.tip;"object"!=typeof b&&(b=a.style.tip={corner:b}),/string|boolean/i.test(typeof b.corner)||(b.corner=D)}},B.tip={"^position.my|style.tip.(corner|mimic|border)$":function(){this.create(),this.qtip.reposition()},"^style.tip.(height|width)$":function(a){this.size=[a.width,a.height],this.update(),this.qtip.reposition()},"^content.title|style.(classes|widget)$":function(){this.update()}},d.extend(D,y.defaults,{style:{tip:{corner:D,mimic:E,width:6,height:6,border:D,offset:0}}});var wa,xa,ya="qtip-modal",za="."+ya;xa=function(){function a(a){if(d.expr[":"].focusable)return d.expr[":"].focusable;var b,c,e,f=!isNaN(d.attr(a,"tabindex")),g=a.nodeName&&a.nodeName.toLowerCase();return"area"===g?(b=a.parentNode,c=b.name,a.href&&c&&"map"===b.nodeName.toLowerCase()?(e=d("img[usemap=#"+c+"]")[0],!!e&&e.is(":visible")):!1):/input|select|textarea|button|object/.test(g)?!a.disabled:"a"===g?a.href||f:f}function c(a){j.length<1&&a.length?a.not("body").blur():j.first().focus()}function e(a){if(h.is(":visible")){var b,e=d(a.target),g=f.tooltip,i=e.closest(W);b=i.length<1?E:parseInt(i[0].style.zIndex,10)>parseInt(g[0].style.zIndex,10),b||e.closest(W)[0]===g[0]||c(e)}}var f,g,h,i=this,j={};d.extend(i,{init:function(){return h=i.elem=d("<div />",{id:"qtip-overlay",html:"<div></div>",mousedown:function(){return E}}).hide(),d(b.body).bind("focusin"+za,e),d(b).bind("keydown"+za,function(a){f&&f.options.show.modal.escape&&27===a.keyCode&&f.hide(a)}),h.bind("click"+za,function(a){f&&f.options.show.modal.blur&&f.hide(a)}),i},update:function(b){f=b,j=b.options.show.modal.stealfocus!==E?b.tooltip.find("*").filter(function(){return a(this)}):[]},toggle:function(a,e,j){var k=a.tooltip,l=a.options.show.modal,m=l.effect,n=e?"show":"hide",o=h.is(":visible"),p=d(za).filter(":visible:not(:animated)").not(k);return i.update(a),e&&l.stealfocus!==E&&c(d(":focus")),h.toggleClass("blurs",l.blur),e&&h.appendTo(b.body),h.is(":animated")&&o===e&&g!==E||!e&&p.length?i:(h.stop(D,E),d.isFunction(m)?m.call(h,e):m===E?h[n]():h.fadeTo(parseInt(j,10)||90,e?1:0,function(){e||h.hide()}),e||h.queue(function(a){h.css({left:"",top:""}),d(za).length||h.detach(),a()}),g=e,f.destroyed&&(f=F),i)}}),i.init()},xa=new xa,d.extend(w.prototype,{init:function(a){var b=a.tooltip;return this.options.on?(a.elements.overlay=xa.elem,b.addClass(ya).css("z-index",y.modal_zindex+d(za).length),a._bind(b,["tooltipshow","tooltiphide"],function(a,c,e){var f=a.originalEvent;if(a.target===b[0])if(f&&"tooltiphide"===a.type&&/mouse(leave|enter)/.test(f.type)&&d(f.relatedTarget).closest(xa.elem[0]).length)try{a.preventDefault()}catch(g){}else(!f||f&&"tooltipsolo"!==f.type)&&this.toggle(a,"tooltipshow"===a.type,e)},this._ns,this),a._bind(b,"tooltipfocus",function(a,c){if(!a.isDefaultPrevented()&&a.target===b[0]){var e=d(za),f=y.modal_zindex+e.length,g=parseInt(b[0].style.zIndex,10);xa.elem[0].style.zIndex=f-1,e.each(function(){this.style.zIndex>g&&(this.style.zIndex-=1)}),e.filter("."+$).qtip("blur",a.originalEvent),b.addClass($)[0].style.zIndex=f,xa.update(c);try{a.preventDefault()}catch(h){}}},this._ns,this),void a._bind(b,"tooltiphide",function(a){a.target===b[0]&&d(za).filter(":visible").not(b).last().qtip("focus",a)},this._ns,this)):this},toggle:function(a,b,c){return a&&a.isDefaultPrevented()?this:void xa.toggle(this.qtip,!!b,c)},destroy:function(){this.qtip.tooltip.removeClass(ya),this.qtip._unbind(this.qtip.tooltip,this._ns),xa.toggle(this.qtip,E),delete this.qtip.elements.overlay}}),wa=R.modal=function(a){return new w(a,a.options.show.modal)},wa.sanitize=function(a){a.show&&("object"!=typeof a.show.modal?a.show.modal={on:!!a.show.modal}:"undefined"==typeof a.show.modal.on&&(a.show.modal.on=D))},y.modal_zindex=y.zindex-200,wa.initialize="render",B.modal={"^show.modal.(on|blur)$":function(){this.destroy(),this.init(),this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth>0)}},d.extend(D,y.defaults,{show:{modal:{on:E,effect:D,blur:D,stealfocus:D,escape:D}}}),R.viewport=function(c,d,e,f,g,h,i){function j(a,b,c,e,f,g,h,i,j){var k=d[f],s=u[a],t=v[a],w=c===Q,x=s===f?j:s===g?-j:-j/2,y=t===f?i:t===g?-i:-i/2,z=q[f]+r[f]-(n?0:m[f]),A=z-k,B=k+j-(h===I?o:p)-z,C=x-(u.precedance===a||s===u[b]?y:0)-(t===O?i/2:0);return w?(C=(s===f?1:-1)*x,d[f]+=A>0?A:B>0?-B:0,d[f]=Math.max(-m[f]+r[f],k-C,Math.min(Math.max(-m[f]+r[f]+(h===I?o:p),k+C),d[f],"center"===s?k-x:1e9))):(e*=c===P?2:0,A>0&&(s!==f||B>0)?(d[f]-=C+e,l.invert(a,f)):B>0&&(s!==g||A>0)&&(d[f]-=(s===O?-C:C)+e,l.invert(a,g)),d[f]<q[f]&&-d[f]>B&&(d[f]=k,l=u.clone())),d[f]-k}var k,l,m,n,o,p,q,r,s=e.target,t=c.elements.tooltip,u=e.my,v=e.at,w=e.adjust,x=w.method.split(" "),y=x[0],z=x[1]||x[0],A=e.viewport,B=e.container,C={left:0,top:0};return A.jquery&&s[0]!==a&&s[0]!==b.body&&"none"!==w.method?(m=B.offset()||C,n="static"===B.css("position"),k="fixed"===t.css("position"),o=A[0]===a?A.width():A.outerWidth(E),p=A[0]===a?A.height():A.outerHeight(E),q={left:k?0:A.scrollLeft(),top:k?0:A.scrollTop()},r=A.offset()||C,"shift"===y&&"shift"===z||(l=u.clone()),C={left:"none"!==y?j(G,H,y,w.x,L,N,I,f,h):0,top:"none"!==z?j(H,G,z,w.y,K,M,J,g,i):0,my:l}):C},R.polys={polygon:function(a,b){var c,d,e,f={width:0,height:0,position:{top:1e10,right:0,bottom:0,left:1e10},adjustable:E},g=0,h=[],i=1,j=1,k=0,l=0;for(g=a.length;g--;)c=[parseInt(a[--g],10),parseInt(a[g+1],10)],c[0]>f.position.right&&(f.position.right=c[0]),c[0]<f.position.left&&(f.position.left=c[0]),c[1]>f.position.bottom&&(f.position.bottom=c[1]),c[1]<f.position.top&&(f.position.top=c[1]),h.push(c);if(d=f.width=Math.abs(f.position.right-f.position.left),e=f.height=Math.abs(f.position.bottom-f.position.top),"c"===b.abbrev())f.position={left:f.position.left+f.width/2,top:f.position.top+f.height/2};else{for(;d>0&&e>0&&i>0&&j>0;)for(d=Math.floor(d/2),e=Math.floor(e/2),b.x===L?i=d:b.x===N?i=f.width-d:i+=Math.floor(d/2),b.y===K?j=e:b.y===M?j=f.height-e:j+=Math.floor(e/2),g=h.length;g--&&!(h.length<2);)k=h[g][0]-f.position.left,l=h[g][1]-f.position.top,(b.x===L&&k>=i||b.x===N&&i>=k||b.x===O&&(i>k||k>f.width-i)||b.y===K&&l>=j||b.y===M&&j>=l||b.y===O&&(j>l||l>f.height-j))&&h.splice(g,1);f.position={left:h[0][0],top:h[0][1]}}return f},rect:function(a,b,c,d){return{width:Math.abs(c-a),height:Math.abs(d-b),position:{left:Math.min(a,c),top:Math.min(b,d)}}},_angles:{tc:1.5,tr:7/4,tl:5/4,bc:.5,br:.25,bl:.75,rc:2,lc:1,c:0},ellipse:function(a,b,c,d,e){var f=R.polys._angles[e.abbrev()],g=0===f?0:c*Math.cos(f*Math.PI),h=d*Math.sin(f*Math.PI);return{width:2*c-Math.abs(g),height:2*d-Math.abs(h),position:{left:a+g,top:b+h},adjustable:E}},circle:function(a,b,c,d){return R.polys.ellipse(a,b,c,c,d)}},R.svg=function(a,c,e){for(var f,g,h,i,j,k,l,m,n,o=c[0],p=d(o.ownerSVGElement),q=o.ownerDocument,r=(parseInt(c.css("stroke-width"),10)||0)/2;!o.getBBox;)o=o.parentNode;if(!o.getBBox||!o.parentNode)return E;switch(o.nodeName){case"ellipse":case"circle":m=R.polys.ellipse(o.cx.baseVal.value,o.cy.baseVal.value,(o.rx||o.r).baseVal.value+r,(o.ry||o.r).baseVal.value+r,e);break;case"line":case"polygon":case"polyline":for(l=o.points||[{x:o.x1.baseVal.value,y:o.y1.baseVal.value},{x:o.x2.baseVal.value,y:o.y2.baseVal.value}],m=[],k=-1,i=l.numberOfItems||l.length;++k<i;)j=l.getItem?l.getItem(k):l[k],m.push.apply(m,[j.x,j.y]);m=R.polys.polygon(m,e);break;default:m=o.getBBox(),m={width:m.width,height:m.height,position:{left:m.x,top:m.y}}}return n=m.position,p=p[0],p.createSVGPoint&&(g=o.getScreenCTM(),l=p.createSVGPoint(),l.x=n.left,l.y=n.top,h=l.matrixTransform(g),n.left=h.x,n.top=h.y),q!==b&&"mouse"!==a.position.target&&(f=d((q.defaultView||q.parentWindow).frameElement).offset(),f&&(n.left+=f.left,n.top+=f.top)),q=d(q),n.left+=q.scrollLeft(),n.top+=q.scrollTop(),m},R.imagemap=function(a,b,c){b.jquery||(b=d(b));var e,f,g,h,i,j=(b.attr("shape")||"rect").toLowerCase().replace("poly","polygon"),k=d('img[usemap="#'+b.parent("map").attr("name")+'"]'),l=d.trim(b.attr("coords")),m=l.replace(/,$/,"").split(",");if(!k.length)return E;if("polygon"===j)h=R.polys.polygon(m,c);else{if(!R.polys[j])return E;for(g=-1,i=m.length,f=[];++g<i;)f.push(parseInt(m[g],10));h=R.polys[j].apply(this,f.concat(c))}return e=k.offset(),e.left+=Math.ceil((k.outerWidth(E)-k.width())/2),e.top+=Math.ceil((k.outerHeight(E)-k.height())/2),h.position.left+=e.left,h.position.top+=e.top,h};var Aa,Ba='<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';d.extend(x.prototype,{_scroll:function(){var b=this.qtip.elements.overlay;b&&(b[0].style.top=d(a).scrollTop()+"px")},init:function(c){var e=c.tooltip;d("select, object").length<1&&(this.bgiframe=c.elements.bgiframe=d(Ba).appendTo(e),c._bind(e,"tooltipmove",this.adjustBGIFrame,this._ns,this)),this.redrawContainer=d("<div/>",{id:S+"-rcontainer"}).appendTo(b.body),c.elements.overlay&&c.elements.overlay.addClass("qtipmodal-ie6fix")&&(c._bind(a,["scroll","resize"],this._scroll,this._ns,this),c._bind(e,["tooltipshow"],this._scroll,this._ns,this)),this.redraw()},adjustBGIFrame:function(){var a,b,c=this.qtip.tooltip,d={height:c.outerHeight(E),width:c.outerWidth(E)},e=this.qtip.plugins.tip,f=this.qtip.elements.tip;b=parseInt(c.css("borderLeftWidth"),10)||0,b={left:-b,top:-b},e&&f&&(a="x"===e.corner.precedance?[I,L]:[J,K],b[a[1]]-=f[a[0]]()),this.bgiframe.css(b).css(d)},redraw:function(){if(this.qtip.rendered<1||this.drawing)return this;var a,b,c,d,e=this.qtip.tooltip,f=this.qtip.options.style,g=this.qtip.options.position.container;return this.qtip.drawing=1,f.height&&e.css(J,f.height),f.width?e.css(I,f.width):(e.css(I,"").appendTo(this.redrawContainer),b=e.width(),1>b%2&&(b+=1),c=e.css("maxWidth")||"",d=e.css("minWidth")||"",a=(c+d).indexOf("%")>-1?g.width()/100:0,c=(c.indexOf("%")>-1?a:1*parseInt(c,10))||b,d=(d.indexOf("%")>-1?a:1*parseInt(d,10))||0,b=c+d?Math.min(Math.max(b,d),c):b,e.css(I,Math.round(b)).appendTo(g)),this.drawing=0,this},destroy:function(){this.bgiframe&&this.bgiframe.remove(),this.qtip._unbind([a,this.qtip.tooltip],this._ns)}}),Aa=R.ie6=function(a){return 6===da.ie?new x(a):E},Aa.initialize="render",B.ie6={"^content|style$":function(){this.redraw()}}})}(window,document);
//# sourceMappingURL=jquery.qtip.min.map
/*!
 * jQuery.qTip.js: Application of qTip2 jQuery plugin to WSU OUE websites. Please see
 *     https://github.com/qTip2/qTip2/ for more details.
 * Author:  Daniel Rieck (danielcrieck@gmail.com) [https://github.com/invokeImmediately]
 * Version: 2.0.0
 *
 * Published under the MIT license [https://opensource.org/licenses/MIT]
 */
 
( function ( $ ) {

var thisFileName = 'jquery.are-you-sure.js';

// Code executed once DOM is ready
$( function () {
	var thisFuncName = 'DOM loaded';
	var thisFuncDesc = 'Code executed after the DOM has loaded';
	var qTipSlctr = '.has-tool-tip';
	
	try {
		assertQTipPluginLoaded();
		processQTips(qTipSlctr);
	} catch (errorMsg) {
		$.logError(thisFileName, thisFuncName, thisFuncDesc, errorMsg);
	}
} );

function assertQTipPluginLoaded() {
	if ( !$.fn.qtip ) {
		throw 'The QTip2 plugin is missing; please verify that you included it as a build dependency.';
	}
}

function processQTips(qTipSlctr) {
	// TODO: Refactor for improved maintainability; add try/catch processing
	var $this;
	var qTipContentSource; // Either a span or a div tag will be accepted.
	var qTipStyle; // Blue and dark qTips are implemented.
	var qTipCntnt; // Object enabling the optional use of titles within qTips.
	$( qTipSlctr ).each( function () {
		$this = $( this );
		$this.hasClass( 'blue' ) ? qTipStyle = 'qtip-blue' : qTipStyle = 'qtip-dark';
		if ( $this.hasClass( 'parental-neighbor-is-source' ) ) {
			qTipCntnt = new QTipContent( $this.parent().next( 'div' ) );
			if ( qTipCntnt.qTipTitle == null ) {
				$this.qtip( {
					style: qTipStyle,
					content: {
						text: qTipCntnt.qTipInnerHTML
					},
					position: {
						target: 'mouse', // Track the mouse as the positioning target
						adjust: { x: 5, y: 15 } // Offset it slightly from under the mouse
					},
					show: {
						effect: function () {
							$( this ).slideDown( 200 );
						}
					},
					hide: {
						effect: function () {
							$( this ).slideUp( 200 );
						}
					}
				} );
			}
			else {
				$this.qtip( {
					style: qTipStyle,
					content: {
						title: qTipCntnt.qTipTitle,
						text: qTipCntnt.qTipInnerHTML
					},
					position: {
						target: 'mouse', // Track the mouse as the positioning target
						adjust: { x: 5, y: 15 } // Offset it slightly from under the mouse
					},
					show: {
						effect: function () {
							$( this ).slideDown( 200 );
						}
					},
					hide: {
						effect: function () {
							$( this ).slideUp( 200 );
						}
					}
				} );
			}
		} else {
			$this.hasClass( 'span-is-source' ) ?
				qTipContentSource = 'span' :
				qTipContentSource = 'div';
			qTipCntnt = new QTipContent( $this.next( qTipContentSource ) );
			if ( qTipCntnt.qTipTitle == null ) {
				$this.qtip( {
					style: qTipStyle,
					content: {
						text: qTipCntnt.qTipInnerHTML
					},
					position: {
						target: 'mouse',
						adjust: { x: 5, y: 15 }
					},
					show: {
						effect: function () {
							$( this ).slideDown( 200 );
						}
					},
					hide: {
						effect: function () {
							$( this ).slideUp( 200 );
						}
					}
				} );
			} else {
				$this.qtip( {
					style: qTipStyle,
					content: {
						title: qTipCntnt.qTipTitle,
						text: qTipCntnt.qTipInnerHTML
					},
					position: {
						target: 'mouse',
						adjust: { x: 5, y: 15 }
					},
					show: {
						effect: function () {
							$( this ).slideDown( 200 );
						}
					},
					hide: {
						effect: function () {
							$( this ).slideUp( 200 );
						}
					}
				} );
			}
		}
	} );
}

/*!
 *  QTip content class
 */
function QTipContent( $qTipSlctr ) {
	var regExPttrn1 = /^\(tooltip: ?(.+)\|(.+)(?=\))\)$/;
	var regExPttrn2 = /^(.+)\|(.+)$/;
	var regExResult;
	this.qTipTitle = null;
	this.qTipText = null;
	this.qTipInnerHTML = null;
	regExResult = regExPttrn1.exec( $qTipSlctr.text() );
	if ( regExResult != null && regExResult.length == 3 ) {
		this.qTipTitle = regExResult[1];
		this.qTipText = regExResult[2];
		regExPttrn = /^(.+)\|/;
		this.qTipInnerHTML = ( regExResult[1] + '|' + regExResult[2] ).replace( regExPttrn, '' );
	} else {
		regExResult = regExPttrn2.exec( $qTipSlctr.text() );
		if ( regExResult != null && regExResult.length == 3 ) {
			this.qTipTitle = regExResult[1];
			this.qTipText = regExResult[2];
			regExPttrn = /^(.+)\|/;
			this.qTipInnerHTML = $qTipSlctr.html().replace( regExPttrn, '' );
		} else {
			this.qTipText = $qTipSlctr.text();
			this.qTipInnerHTML = $qTipSlctr.html();
		}
	}
}

} )( jQuery );