module.exports=function(s){"use strict";s.util.linefeed="\n",RegExp.quote=function(s){return s.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")};var e=require("fs"),t=require("path"),i=require("./grunt/bs-glyphicons-data-generator.js"),r=require("./grunt/bs-lessdoc-parser.js"),n=require("./grunt/bs-raw-files-generator.js"),c=require("./grunt/shrinkwrap.js");s.initConfig({pkg:s.file.readJSON("package.json"),banner:'/*!\n * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n */\n',jqueryCheck:"if (typeof jQuery === 'undefined') { throw new Error('Bootstrap\\'s JavaScript requires jQuery') }\n\n",clean:{dist:["dist","docs/dist"]},jshint:{options:{jshintrc:"js/.jshintrc"},grunt:{options:{jshintrc:"grunt/.jshintrc"},src:["Gruntfile.js","grunt/*.js"]},src:{src:"js/*.js"},test:{src:"js/tests/unit/*.js"},assets:{src:["docs/assets/js/application.js","docs/assets/js/customizer.js"]}},jscs:{options:{config:"js/.jscs.json"},grunt:{src:["Gruntfile.js","grunt/*.js"]},src:{src:"js/*.js"},test:{src:"js/tests/unit/*.js"},assets:{src:["docs/assets/js/application.js","docs/assets/js/customizer.js"]}},csslint:{options:{csslintrc:"less/.csslintrc"},src:["dist/css/bootstrap.css","dist/css/bootstrap-theme.css","docs/assets/css/docs.css","docs/examples/**/*.css"]},concat:{options:{banner:"<%= banner %>\n<%= jqueryCheck %>",stripBanners:!1},bootstrap:{src:["js/transition.js","js/alert.js","js/button.js","js/carousel.js","js/collapse.js","js/dropdown.js","js/modal.js","js/tooltip.js","js/popover.js","js/scrollspy.js","js/tab.js","js/affix.js"],dest:"dist/js/<%= pkg.name %>.js"}},uglify:{options:{report:"min"},bootstrap:{options:{banner:"<%= banner %>"},src:"<%= concat.bootstrap.dest %>",dest:"dist/js/<%= pkg.name %>.min.js"},customize:{options:{preserveComments:"some"},src:["docs/assets/js/vendor/less.min.js","docs/assets/js/vendor/jszip.min.js","docs/assets/js/vendor/uglify.min.js","docs/assets/js/vendor/blob.js","docs/assets/js/vendor/filesaver.js","docs/assets/js/raw-files.min.js","docs/assets/js/customizer.js"],dest:"docs/assets/js/customize.min.js"},docsJs:{options:{preserveComments:"some"},src:["docs/assets/js/vendor/holder.js","docs/assets/js/application.js"],dest:"docs/assets/js/docs.min.js"}},less:{compileCore:{options:{strictMath:!0,sourceMap:!0,outputSourceFiles:!0,sourceMapURL:"<%= pkg.name %>.css.map",sourceMapFilename:"dist/css/<%= pkg.name %>.css.map"},files:{"dist/css/<%= pkg.name %>.css":"less/bootstrap.less"}},compileTheme:{options:{strictMath:!0,sourceMap:!0,outputSourceFiles:!0,sourceMapURL:"<%= pkg.name %>-theme.css.map",sourceMapFilename:"dist/css/<%= pkg.name %>-theme.css.map"},files:{"dist/css/<%= pkg.name %>-theme.css":"less/theme.less"}},minify:{options:{cleancss:!0,report:"min"},files:{"dist/css/<%= pkg.name %>.min.css":"dist/css/<%= pkg.name %>.css","dist/css/<%= pkg.name %>-theme.min.css":"dist/css/<%= pkg.name %>-theme.css"}}},cssmin:{compress:{options:{keepSpecialComments:"*",noAdvanced:!0,report:"min",selectorsMergeMode:"ie8"},src:["docs/assets/css/docs.css","docs/assets/css/pygments-manni.css"],dest:"docs/assets/css/docs.min.css"}},usebanner:{dist:{options:{position:"top",banner:"<%= banner %>"},files:{src:["dist/css/<%= pkg.name %>.css","dist/css/<%= pkg.name %>.min.css","dist/css/<%= pkg.name %>-theme.css","dist/css/<%= pkg.name %>-theme.min.css"]}}},csscomb:{options:{config:"less/.csscomb.json"},dist:{files:{"dist/css/<%= pkg.name %>.css":"dist/css/<%= pkg.name %>.css","dist/css/<%= pkg.name %>-theme.css":"dist/css/<%= pkg.name %>-theme.css"}},examples:{expand:!0,cwd:"docs/examples/",src:["**/*.css"],dest:"docs/examples/"}},copy:{fonts:{expand:!0,src:"fonts/*",dest:"dist/"},docs:{expand:!0,cwd:"./dist",src:["{css,js}/*.min.*","css/*.map","fonts/*"],dest:"docs/dist"}},qunit:{options:{inject:"js/tests/unit/phantom.js"},files:"js/tests/index.html"},connect:{server:{options:{port:3e3,base:"."}}},jekyll:{docs:{}},jade:{compile:{options:{pretty:!0,data:function(){var s=t.join(__dirname,"less/variables.less"),i=e.readFileSync(s,{encoding:"utf8"}),n=new r(i);return{sections:n.parseFile()}}},files:{"docs/_includes/customizer-variables.html":"docs/jade/customizer-variables.jade","docs/_includes/nav-customize.html":"docs/jade/customizer-nav.jade"}}},validation:{options:{charset:"utf-8",doctype:"HTML5",failHard:!0,reset:!0,relaxerror:["Bad value X-UA-Compatible for attribute http-equiv on element meta.","Element img is missing required attribute src."]},files:{src:"_gh_pages/**/*.html"}},watch:{src:{files:"<%= jshint.src.src %>",tasks:["jshint:src","qunit"]},test:{files:"<%= jshint.test.src %>",tasks:["jshint:test","qunit"]},less:{files:"less/*.less",tasks:"less"}},sed:{versionNumber:{pattern:function(){var e=s.option("oldver");return e?RegExp.quote(e):e}(),replacement:s.option("newver"),recursive:!0}},"saucelabs-qunit":{all:{options:{build:process.env.TRAVIS_JOB_ID,concurrency:10,urls:["http://127.0.0.1:3000/js/tests/index.html"],browsers:s.file.readYAML("test-infra/sauce_browsers.yml")}}},exec:{npmUpdate:{command:"npm update"},npmShrinkWrap:{command:"npm shrinkwrap --dev"}}}),require("load-grunt-tasks")(s,{scope:"devDependencies"}),s.registerTask("validate-html",["jekyll","validation"]);var o=[];process.env.TWBS_TEST&&"core"!==process.env.TWBS_TEST||(o=o.concat(["dist-css","csslint","jshint","jscs","qunit","build-customizer-html"])),process.env.TWBS_TEST&&"validate-html"!==process.env.TWBS_TEST||o.push("validate-html"),"undefined"==typeof process.env.SAUCE_ACCESS_KEY||process.env.TWBS_TEST&&"sauce-js-unit"!==process.env.TWBS_TEST||(o.push("connect"),o.push("saucelabs-qunit")),s.registerTask("test",o),s.registerTask("dist-js",["concat","uglify"]),s.registerTask("dist-css",["less","cssmin","csscomb","usebanner"]),s.registerTask("dist-docs","copy:docs"),s.registerTask("dist",["clean","dist-css","copy:fonts","dist-js","dist-docs"]),s.registerTask("default",["test","dist","build-glyphicons-data","build-customizer","update-shrinkwrap"]),s.registerTask("change-version-number","sed"),s.registerTask("build-glyphicons-data",i),s.registerTask("build-customizer",["build-customizer-html","build-raw-files"]),s.registerTask("build-customizer-html","jade"),s.registerTask("build-raw-files","Add scripts/less files to customizer.",function(){var e=s.template.process("<%= banner %>");n(e)}),s.registerTask("update-shrinkwrap",["exec:npmUpdate","exec:npmShrinkWrap","_update-shrinkwrap"]),s.registerTask("_update-shrinkwrap",function(){c.call(this,s)})};