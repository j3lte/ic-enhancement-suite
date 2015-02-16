// ==UserScript==
// @name         InnerCircle Enhancement Suite
// @namespace    https://github.com/j3lte/ic-enhancement-suite
// @version      0.3.8
// @description  Adds functionalities to InnerCircle
// @author       j3lte
// @updateURL    https://github.com/j3lte/ic-enhancement-suite/raw/master/innercircle-enhancement-suite.user.js
// @downloadURL  https://github.com/j3lte/ic-enhancement-suite/raw/master/innercircle-enhancement-suite.user.js
// @match        https://www.theinnercircle.co/*
// @include      https://www.theinnercircle.co/*
// @icon         https://raw.githubusercontent.com/j3lte/ic-enhancement-suite/master/ic_plus.png
// @license      MIT License https://raw.githubusercontent.com/j3lte/ic-enhancement-suite/master/LICENSE
// @grant        unsafeWindow
// @date         01.26.2015
// ==/UserScript==

function ic_FunctionWrapper(){function e(){if(h.localStorage)if(h.localStorage[s])try{b=JSON.parse(h.localStorage[s])}catch(e){b=p,i()}else b=p,i();else if(l.cookie("ic_enhance_options"))try{b=JSON.parse(l.cookie("ic_enhance_options"))}catch(e){b=p,i()}}function i(){h.localStorage?h.localStorage[s]=JSON.stringify(b):l.cookie&&l.cookie("ic_enhance_options",JSON.stringify(b),{path:"/"})}function o(e,i){l(e.identifier).each(function(){-1===l(this).attr("src").indexOf(e.filename)||i?i&&l(this).data("orig-src")&&l(this).attr("src",l(this).data("orig-src")):(l(this).data("orig-src",l(this).attr("src")),l(this).attr("src",e.replacement))})}function t(){var e,i,t=Object.keys(y);if(b.nightMode)for(B.addClass("night"),e=0;e<t.length;e++)i=y[t[e]],o(i);else if(!b.nightMode&&B.hasClass("night"))for(B.removeClass("night"),e=0;e<t.length;e++)i=y[t[e]],o(i,!0)}function n(e){e?(C.text(e),C.is(":hidden")&&C.show()):C.hide()}function a(e){n("Loading member..."),x.load(e,function(){var i=x.find(".username").parent(),o=x.find(".job_title"),t=x.find("#user_photos"),a=x.find(".profile_field");if(v.html(""),v.append(i),v.append(o),t.find(".rsImg").length){var A=50*Math.round(t.find(".rsImg").length/3);t.css("height",A+"px"),t.find(".rsImg").each(function(){l(this).data("rsbigimg")&&l(this).attr("href",l(this).data("rsbigimg")),l(this).attr("target","_blank")}),v.append(t)}v.append(a),v.append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick close-user-box" style="position: absolute; top: 0; right: 0;"></span>'),R[e]=v.html(),e=null,n(),v.fadeIn(500),h.console.log("[IC Enhancement Suite] :: User shown")})}function A(){return l(this).target="_blank",l(this).prop("href")?h.open(l(this).prop("href")):l(this).prop("src")&&h.open(l(this).prop("src")),F&&(h.clearTimeout(F),k=null),!1}function r(){b.openInNew?(B.on("click",".online_box a, .featured_box a, .interest_box a, a.username, .birthdays_box a",A),B.on("click",".activity_widget a.activity_pic, .activity_widget .activity_description a:first-child",A)):(B.off("click",".online_box a, .featured_box a, .interest_box a, a.username, .birthdays_box a",A),B.off("click",".activity_widget a.activity_pic, .activity_widget .activity_description a:first-child",A))}function d(){b.hideEmptyMatches&&1===l(".potential_match").find(".match").length&&l(".potential_match").find(".match").first().hasClass("match-last")?(console.log("[IC Enhancement Suite] :: No matches, hiding box"),l(".potential_match").hide()):l(".potential_match").show(),l(".nearby-block.question").css("display",b.hideQuestionBlock?"none":"block"),l(".widget.tutorial-welcome").css("display",b.hideWelcomeForm?"none":"block"),l(".widget.invite-form").css("display",b.hideInviteForm?"none":"block")}function c(){for(var e='<div id="enhance_tabs" class="tabs-no-padding">\n',i=0;i<u.length;i++){var o=u[i];o.enabled&&(e+='    <input type="checkbox" class="option_check" data-option="'+o.optionKey+'" id="'+o.identifier+'" name="'+o.identifier+'" '+(b[o.optionKey]?'checked="checked"':"")+">\n",e+='    <label for="'+o.identifier+'" class="optional">'+o.label+"</label>\n",e+='    <div class="clear"></div>\n')}e+="    <dt></dt>\n",e+='    <a href="#" id="saveAndReloadOptions" class="button">Close</a>\n',e+="</div>",S.html(e)}function g(){b={},l(".option_check").each(function(){var e=l(this).data("option");b[e]=l(this).is(":checked")}),i()}var l,s="_ic_enhance_options",h=window;"undefined"!=typeof unsafeWindow&&(h=unsafeWindow),l="undefined"==typeof unsafeWindow?jQuery:unsafeWindow.jQuery||jQuery,h.console||(h.console={log:function(){}});var p={hideQuestionBlock:!1,hideEmptyMatches:!1,hideWelcomeForm:!1,hideInviteForm:!1,loadMemberOnHover:!1,openInNew:!1,nightMode:!1},b=p,u=[{identifier:"option_hide_question",optionKey:"hideQuestionBlock",label:"Hide top question block (top middle)",enabled:!0},{identifier:"option_hide_empty",optionKey:"hideEmptyMatches",label:"Hide matches widget when there are no matches (right)",enabled:!0},{identifier:"option_hide_welcome",optionKey:"hideWelcomeForm",label:"Hide welcome form (top left)",enabled:!0},{identifier:"option_hide_invite",optionKey:"hideInviteForm",label:"Hide invite form (right)",enabled:!0},{identifier:"option_load_hover",optionKey:"loadMemberOnHover",label:"Load members on hover (beta)",enabled:!1},{identifier:"option_open_in_new",optionKey:"openInNew",label:"Open member links in a new window/tab",enabled:!0},{identifier:"option_night_mode",optionKey:"nightMode",label:"Night mode",enabled:!0}];e();var m=["/* ICES ENHANCEMENTS */","#userBox { width: 158px; z-index:10000; padding: 2px; border: 1px solid #0099B0;position: fixed;left: 10px;top: 111px;font-size: 10px;background: #fff; }","#userBox .profile_field { border: 0px solid #000; padding: 0px; line-height: 11px; clear: both; }","#userBox .job_title { clear: both; color: #666; padding-bottom: 0; font-size: 10px; line-height: 11px; white-space: nowrap; overflow: hidden; border-top: 1px solid #CCC; border-bottom: 1px solid #CCC; }","#userBox #user_photos { display: block; width: 158px; min-width: 1px; margin: 3px 0 3px 2px; }","#userBox .rsTmb { width: 50px; margin: 0 2px 2px 0; }",".close-user-box { cursor: pointer; }",".google-link { position: absolute;background: rgba(255,255,255,0.3);left: 0;bottom: 0;width: 100%;text-align: center;color: #000;font-size: 10px;text-decoration: none; }","#saveAndReloadOptions.disabled { opacity: 0.1; }",".navigation a { padding: 8px 7px; }",".navigation-icon img { margin-top: -4px; }","#enhance_tabs label { color:#FFF; }",".header .navigation a.ic_enhance_suite { padding: 0; margin-right: -9px; margin-left: 15px; }",".mutual_box a.fb, .path_user a.fb { color: #0000FF; }","/* SCROLLBARS */","::-webkit-scrollbar { width: 12px; }","::-webkit-scrollbar-track { border-radius: 1px; -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.5); }","::-webkit-scrollbar-thumb { border-radius: 1px; -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.5); }","/* NIGHTMODE */","body.night .white { background-color: #302E31; }","body.night, .night .widget.white { background-color: #302E31; color: #fff; }",'body.night h1 { background-image: url("/images/h1_white.png"); }',"body.night h1, body.night h1 a, body.night .job_title, body.night .profile_field b { color:#fff; }","body.night .rsDefault, body.night .rsDefault .rsOverflow, body.night .rsDefault .rsSlide, body.night .rsDefault .rsVideoFrameHolder, body.night .rsDefault .rsThumbs { background-color: #323232; }","body.night .member_event_date, body.night .event_date, body.night .invites_count, body.night .my_trip_date { background-color: #0099B0; }","body.night .grey, body.night .message_accent { background-color: #151415; }","body.night .grey .free_corner { border-right: 15px solid #0099B0; }","body.night .grey .free_text { background-color: #0099B0; }","body.night .username, body.night a.username, body.night .spotname, body.night a.spotname { color: #FFFFFF; }","body.night .featured_box, body.night .interest_box, body.night .ui-tooltip { color: #FFF; }","body.night .nearby-block { border-top:0px solid #151415; }","body.night .widget, body.night .hotposts_container { color: #FFF; }","body.night .free_action { color: #151415; }","body.night .answer-label, body.night #answers-element label { background-color: #302E31; color: #FFF; }","body.night #answers-element label.answer-common { background-color: #0099B0; }","body.night .message, body.night .message_send, body.night .message_list, body.night .ui-dialog .ui-dialog-content, body.night .ui-tabs .ui-tabs-panel { background-color: #242124; }","body.night .panel-box { background-color: #302E31; }","body.night .double_user, body.night .single_user { background-color: #242124; }","body.night .ui-tabs .ui-tabs-panel, body.night .ui-tabs .ui-widget-header { background-color: #302E31; }","body.night .ui-tooltip { background-color: #0099B0; }","body.night .going_text { background: #302E31; }","body.night .map-users .double_user:nth-child(even) { background-color: #343034; }","body.night .map-users .double_user:nth-child(4n), body.night .map-users .double_user:nth-child(4n+3) { background-color: #343034; }","body.night .accordeon .ui-widget-content { border: 1px #151415 solid; background-color: #302E31; }","body.night input[type=text], body.night input[type=password], body.night textarea { background-color: #302E31; color: #FFF; }","body.night .activity_widget, body.night .circle_messages_widget, body.night .circle_activity_widget { background: #302E31!important; }","body.night .path_arrow { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAoCAYAAADHVmuAAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFhsiWzBgQwAAAIBJREFUOMvt1LERgzAMQNEvLj1MEhsmYISMyghMgGRPkGyQTOBUucvlCKiAzip1T5JVyFJKwRMNzqiwwoOgZTXL2okIIrLZMQCzpqXzjA7AXdMSPW9sgdmyRs8yLTB54Au47cEHMMZrb5/EZQUlYOzD8Pw+5eYf+q2W+gFUeD58Ax+PI0CbsNsrAAAAAElFTkSuQmCC') }","body.night .fancybox-skin { background: #363636; }","body.night #user_search_results { background-color: #302E31; color: #FFF; }","body.night .searchplace:hover, body.night .searchuser:hover, body.night .searchtrip:hover { background-color: #151415; }"].join("\n");if("undefined"!=typeof GM_addStyle)GM_addStyle(m);else if("undefined"!=typeof PRO_addStyle)PRO_addStyle(m);else if("undefined"!=typeof addStyle)addStyle(m);else{var f=document.createElement("style");f.type="text/css",f.appendChild(document.createTextNode(m));var w=document.getElementsByTagName("head");w.length>0?w[0].appendChild(f):document.documentElement.appendChild(f)}var y={inplace_edit:{filename:"edit",identifier:"img.inplace_edit",replacement:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFDcXNzYboAAAArVJREFUWMPFl81LFVEYxn8zqWUfIC4iIiIDQUhP95xdQatctCiiQne1DAokqEj7gCIljQItg/oHXGT0QdQi2kRSLZJz7FgQpVltitIwKj/h3jZz4XC5M3fubbSzuTzvM/O+z33eec+c8TKZDP9zlYURnufFTmKsvgnMAPeBh1Komdxrwv6oF0rEFGCs3gPccULjQDfQLYWaXlABxupy4A1Qm4f+AByQQj2LEuD/YwsPhRQH2Ag8MVYfjkpQsgPG6ipgFKiOIfRkqkF2Je3AmZjFATqHhk1jYgKM1TVAixOaAmYjbhkDnibpwEWgwsHtwCbgQcj1J1INci4RAcbqLUCTE/oMXJFCjUqhdgGXc2557nne7bB8RQl49XrIy1PgdHbejdWVQHMOfzzVIDOJCEin003AVic06Pt+n4OPAOsd3C+FehGV0y/C+gogd5SObq5PZQJ+NXDK4eaAtkJ5i3GgBahx8D0p1ICDzwGrHNwrhRpLRICxujqY++yaB1odvg446PA/gI44ueM6cBaocvB1KdQ7B18ClrhuSKEmExFgrK4N9vzs+gmcd/jtwE6Hfw/ciNvXOA50AeUO7pBCTQTF/Txj2SqFmk9EgLF6G7A3Z0vtdfB+IOXgASnU3WJGu5ADX4BHDm6TQs0G4pYDF3LHstidNVKAFGpECrUD2Af0+75/y6GPAWsd3CeFGixWQEnnAWP1GmAEWBGEZoA6KdSnsHuSPhE1O8UBeqKKl9QCY/WyiNZcBXYDH4HvQGepp5rQFgwNm57A2nYp1J8QkZVAvRTqZaFCpbTgV7DdvjVWN4U4MR2neKlT8C34XQf0G6sfB3t+oitKwHgObgSssbrLWL1yMQRM5IlNAWlg6YJ/GwZPt/sC6gnGbTLJFpQVeAYmgpfNNSnU70X9Oga+AhsWqnB2/QVgL+ZN0utiqwAAAABJRU5ErkJggg=="},ignore_off:{filename:"ignore_off",identifier:".ignore.ignore_icon.icon img",replacement:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQApZ5LMCAAAA9hJREFUWMO1112IVVUUB/DfjFJ+NJopSJEGkmDUHOYcKrIP0RRFoQ80KHqYoOxTqB4ygojqISiohwSxEikzJyLCkNKHQFA0+qBzx2svFUGmDOkgpZaF4dxe1pHD5dw7d2hcsNnn7L32Xv+19n9/rK5Go6GQrq4unUitns/FejyOBjbhlTTJjrUbV7Z13uZYANTq+Ww8g37MQncAaOA3fIh30iT7cVwAHPx+sGtkZGQm7sIDuAkTovsY3kcXHsSMaP8bg9G3sxyVjgDU6vkK3I0+LEBPeCo8PYGt2JAm2ZGIzBw8gfswJ0A1cBbD+AE59uCrvt70VCWAwUO1NdiGyTEBjOAMvsObaZJ92maJenBnRCuJZTpvC+fwZF9v+lbROLFpjtW4GKfwJXZjR+HpaJIm2Wlsx/ZaPZ+CXizBjVFPx0K0BNATnu9Lk+wO/0PSJDuDr6Oo1fN9uLlZr7uZqBGqScZfLor5/2gHoCDHJRcAwJSo2wI43qQ8njK5REStOPBn1JPaMP1FXIWH0yQ7F20TsBmH0yR7ucXQYs6T7QCcadFeGNmIR6NpWq2e3x/fA1gTepdjXQGuiQMw1A7A0aintljDtPS/Brvie2l5A4Tu6RYRONKOA4Ol7Vi1x5djb6l5aZPxvVgeuuXozQhQDfzUDsDPcfJNqtXzeRUgTmIV9ldEaD9WhU6zLAoCnu7rTU+0BJAm2T9xdhchrpLLMLuifXb0VcmSqvWvigAcjHpFBRGvxgHMrxg3HwdCp1n6mpa4LYAdJTKVjV8bYZ5bav48SiFzsT90i3HTcU2s/xedANgVPJhWq+c3lNqHS+dEsfVWRxloOkuGS//LMDO2eEcAhoKpE/BSiR/HsTiIOoD+NMnOpkl2Nl5IA9G3OHQLWRsEPNjXm47OgTTJRrClIE+tns8q9R2N67S/fNDEdz8Whk4R/nm4JcK/pYqdE1uwdnN4PxXPRimMDbe4fs81hR6ejzmGsLNqXHeLyU7hjUD+UK2eLxjrzVOr59ejOKpfT5Ps944BhGzCL7gUG8ZofHqE/OLgxbutdLvbvGiO4bmIwu21en7PGDA8jevwLx6LiBprBKRJ9nHs8y68V6vnizrwfiWeit8P0iTb006/uwNv1sdDZSq2NZ0NVev+USzbN3hhtMlHBRBZzsq4qq/EQK2eJxXGl8Uh1hPPrrVpkg2NNn/HqVkY2Ior4q6/N02y3fFQ6cerkQf8ihVV6dl45Ia34bPw8i98gmmRjHTjUHj+7QVJTkuX0kbcGuQs0rBBrE6T7PAFy46b9vk6PBJPrdfwdiQjY0rP/wOKCGu6HBGxoQAAAABJRU5ErkJggg=="},favorite_off:{filename:"favorite_off",identifier:".favorite.icon img",replacement:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQsXRQcIaAAAAxZJREFUWMPV10toXVUUBuDvpFEbRHxDLdaKVSlCdjhn4MxRFYoVFC21NT4oVYsTR2roQIvUB0EdONOADgRr2kGw6tBhHXTgOfVENNUqlmIRpPjAUijJPU5W4RJvEntuUvHChnv3XXutf/3rtXfWNI3/7efodJUdna6yfnQM9nO4aZr74+vHbXW0Rl/V5QDK+Fnkqei00TPQBwHbMBJr20VloKrLQUzjttj6HsN5KmYvFgOjYfw4fsLtsbfyDFR1eSmOYS2ewlV4Az9jY56KcyvNwC7cFCCm8EGwsD7+WzkGqrocCtqvx/Y8FVOx/wQmcBob8lScXSkGnsEazOCzrv0PA9iakFkeBiLb1+OWSLqXMYTNeSoOz5O9B4dwBnujMn7EicWqI6vqcjU29Fi3RqwH0cT6C6/kqXhrAcCv4lmsDucyzOFEMPTD/JVVdfkung4dHczGoTmcw5/4NTyazFPx6RKsjeIhrItcuQKXRbhXhUPnQz+RHZ2usqZpXsdYADiM/fgaM3kqTvczL6q6vA53YCMewV0BYDzLsj1Zl+BzGA/PX8O+PBVzyzE1q7pchZewJxh4IU/Fm/9Iwqoud+GdiPckdvYLIoy/jx3h+e48Fe/1LMP4Y3sA2IEDy0DAgWjTHTzcbXzBMqzq8u6Y8UM4lKfiwZbef4ItOIsH8lR8/q8aUQhuwu+4r6rLsRbG92IzfsOmXsYX7YR5Ko7g3pB5sgUBj8bZLaGrr1Y82wLA3HLMghQJebIFgFNxNvUDYDiy93gLAN/F2eF+bsUpqKx6dLfHsDWMTOGjPBW/dIl9iceXYmApACMB4EgYvhzPYzeuiTJucCfGqrqcwHieijP4InJnpNU4rupyXdx0ToWSnTEvro7QzWBfiL8YvR7+iLa7HzVuwM15Kk5eaA6MdI3h6ZgT10ZsR+MWPJmnYjLiPIpvcSXexlfn3y+LsTCwRPwHcGPcdI7NM9zp6hmdAJJCZiYurWtDR2oDYDhC9M1Chns0r04PRrLFKmGxJLwkBtLBC312hfxkVZcH49W0dcEk/K+f538DRJIHyXoxFg0AAAAASUVORK5CYII="},like:{filename:"like",identifier:".like.icon img",replacement:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQoXXBw5KQAAA0lJREFUWMPl10uoVlUUwPHfUTPz3aC0UoQoMy73cPepnCQYRNAgadLTW8LlRplkAwdBUFJGGTQJUijQCiGzSU/KQXGprKBB59ixB2QNtCwJzIsvUPB+TZbx+d3vPnx8OGhP9hnsvdZ/rbXX42SNRsOFXBNc4HXBASZBlmUjHqjqchbmYTDlxb6xBFZ1OSPOH8uybG9PdxoW4+awZ41GYxjAzl1V1mg07sIaLMapA/uxCS+lvDjcongp1mJpk2cP4C28mPJi/7gAqrqciS1YhpM4jIOYjkvDa7txR8qLX+POOjyFBo7EnYswK/ZBPJDyYjv0dCdVXQ5/A1VdXoJPQvlBPI6FKS+uwQLcjj1YiIGqLudUdbk2lB/HRnSlvJgX52/Ft5iND6u6XNYajtM8UNXlBqzCH1iS8mJvmxjPxje4Dt8jxwmsTHmxZYR38SoewlF09/X27x3mgaouu/BoWLK8nXJIeTGI2/AZFmEf+kdSHuuxgJ2BF9p6oKrL14LynSzLetu93harpqMHx1JelOPIjgJfxxua39Od9v8HsHNXleHPiNXilBe7OpHzVV3+gOvxSE932tQcgnmYg0OdUh7rOwzhhtZKeFXshzpc+PZEas9tBZgU+8kOAxxtbQGnPv6OfWpVl53sD3NC5z+tAL/hWFS6+R0EuCl0/ngaQMqLk9iBi3FvhzLgCnRFXxlo1463YSL6qrqc1gGGB6Of7O7r7S/bAbwd3e5q3HeerZ+G1WHgy20HkpQXJ/BMZMTzVV3OPU/KJ2A9rowu+vpoE9FmfIXL8EFVl1POA0MvHo5WvTIMbQ+Q8mIIKyJNbgygc7F+CTZgcgwln4/ajlsufhrheAOrU14cP0PlN+Pj6IDv4Z4wcOyRLAQsi8yYjO24ezwQVV1ODJevx0x8FHdPjHsmbBJ2C96NLvlzCPppDOWbcX94bxv6WuM+boAQugjv49qY9TZifcqLIy3nErbGuNbAuizLnjurqXiE4WNDFJMh/IJVKS++iHR9FssxFX9hRcqLgZHknTFAE8ideCXmh+P4HZdHhcvwJp5IeXFgNDlnDdD04/F0VLYpTYPGmpQXX45HxjkBNIEswJPYkWXZ1rFmyFEB/tc/p/8CadxeyIwnmc8AAAAASUVORK5CYII="},message:{filename:"message",identifier:".conversation.icon img",replacement:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQsBsdO9OQAAAbNJREFUWMPt1z1PFFEUxvHf+FapjS9ROomNzSQz0mzQGuwECrXBhFD4JfwS1kSjDdrRCfWSWKAzOBQ0ijYaE4mFWmkxNkezIawssyRb7N5qMpO5z3P+99xz7k3qujbIccyAx8jAyMCJza2yHm4CHc9fcR4fMJOledXtp7quJUnSs0hZFdfxsnN+vN1LYDY+jmOjrIqJo4iwrIobIX4Bu7jfGdw/A1mar4ezXziJ5bIqWn2Kp3iKc0H4VujsnwPhbBLvg8RKRNBEfAIbuIKPmM3S/M2BSZil+WvMB66LeF5Wxc1DirewjFP4HTm13vMuyNL8FebwCZfxuNflCGIrQfAdJv+X0F23YTi+hx1cxepBJkL8RZDbxXwQbVYHsjRvx3J8xxksdTMR75/gEj5jLkj2V4hikmls4xrWNrfK1j7ia0FqB3e7rXmjShgmFvEzSDz7m5ghvoTT+BHY20deisPEVCTWeOyOB1gNMtuY6gV7414Qky/gC8bwCGcj8sXDijdqRoH3Dr7heBCZbiLeuBtGgt3GQyw0Fd/bDZuQaOtzjI5kAzeQlFUx3GfCZHQ3HHoDfwAavJ54vwr+6wAAAABJRU5ErkJggg=="},wink_off:{filename:"wink_off",identifier:".wink.icon img",replacement:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQohk6assAAABEpJREFUWMPFl1tsFUUYx3/nFI4EjBWLKVqLAWMk6o47Izx4iYBiJOIFQrQxRiigxMQHBW0kpCYlRrSpCSagERoUNdxDCODtyQjRiFF2TvaExhQvD0QKIhZoaUuLZ335Fieb057Ti7Ivk52d2e8//+/2n1QURVzOZxRAKpUqutCGQRXwNFAD3AhcKfvTwN9AF3AU2Als08oc6+9f7qFTURQNCMCGwTSgAZgJjC3xYL3A50C9VqZlSABsGFQCq4BngHKZPgt8B+wFvgHagAioAu4F5gAznPWngHeAd7UyHSUDsGFQIVTOkKlWYC2wVStzvoirxgnoOnEVwFdArVbmeFEANgymAAfkVN3Ae0CjVubPwQSXxMxrwCLgCuAn4B6tTHu/AGwYTAC2ArOBi8ALWpnm4US5DYPFwEagDPgUWOR7uj3+nk6sfxW4H+gAnhyucXk+Enf0Ag8Dy92PlxiwYaDEV1dL0Lw4kvluw6AZWAycBmb5nm5JMvAWcA3wK7DmP6g5DcAxYIJk178MZHO2WiI9AyzVymxOoF8AvCFBudz39NelFK8CLLwCNALngSrf0x2j5NtzEqlngO2JTeMlMDMytSubs5VAvoCBZF0/oJWZ6bxvBFZLFV0AbI5d8IiMB7UyPYmfVDjGETdlhuIDrcw54JC81l7qBcBkGXcX2PSzDYO9wOMytc73dE8/Bkrxy35gFnCLCyCu8YcL7Uin0/Pz+fzdQLfv6WCYwRjbKHcBxOPxQjvuuN2PgG9HKBuOyJhxDcfUlbkrfU+PiMVszrqvebcIxkF4Qbpa9f+gQW6Vsc9loEsouRPIxis/3LKpSeYOa2XqSsjz0cA4Sek1wBTge63MSmdZ3GHbXQZ+ETfMS/zzN+A+YIkNg+tKSLM+rcwZAbBQjCWDdo4bCzGAXeKC6TYMrnIW7wD+AsYD66XXF2OhHGiWeDrle3pnQitMk9ftLoDdQKfU6RrnRKeBJgmcecCGIsar5TCzpWyvSCx5CRgjLt+R7Ib7gLkiHB6M1YsNgwywHlgqgNuAD4CPtTKt8n2qqKAaETJ5oMn39KpY9Aq4Q8BEYJPv6WXJbrhaWuVUt1tpZXq1MsukifQBlcBKoMWGQafoxED6/PXACTnp64nTN4rxP6TzFlREjcDLoobqtTJvJyieLLTOBW5wDtAnzOwBNmhlWmPtl83ZMuB50ZRpoM739Nr+AFQIvY+K1q/VymwZQHxOFLpPamW6CsnvbM42APWSZZ8BT/ievjCQKB0L/CjN4iLwibBxYpC9f5LUghrJiB+Ax7QyJ0uR5ZMklR4Q5G1C4TqtTG8RwxXAEuBZ4CaZ3gMs1Mp0D+ZiMkb8vUI0AEAPcBD4UprTUWA0cBtwF/AQMF1SLQJ+B94XjXluqFezm0XfP+U0qyjRxJJKqEMk+JtamSPDuhs6QK6Vy+l8oTZWSpEUnbNAi7juC61MZ8mX08v5/AM7mbBooQ5tRwAAAABJRU5ErkJggg=="},report:{filename:"report",identifier:".report.feedback img",replacement:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFiEAq/n/3gAAAuNJREFUWMPFVz9oE1EY/33vjvQiUpSCgUpLjWkCWloudxahpW7dunSqnVzETRfRpYtglyySoZODm0O2Lt21ENJeLqUlCmLRYqFVQbQgJj3C+1xe4BqT5i5tzJuS79/vd7/ve3fvETOjl0ugx4s6TSyVSoNSykUAEEK8TqfTB/+NwObm5pAQogBgUJkOpJS3Jycn97veglwupwkhVn3gADAohFjN5XJa1wnE4/EHAMwmLlP5uteCnZ2dy57nfQQw0CLkRyQSGR0fH//ZFQU8z3t2CjgADKiY81egVCrdkFJuA9DbhNaEEBPpdPr9uSogpXzRBPwbgK8NNl3Fnl8LXNedAzDbYH5sGMYwgGEADxt8syrn7C0ol8uRarX6DkDCZ963LGuEiCQAMLNwXfezIlNfu4Zh3BwbG/POpMDx8fGjBnAAKNbBAUD9dhtiEiq38xYUCoUYMy81cY02sV1vNDDzUqFQiHVMQNf1ZQD9TVwJZhY+IGpBql/VCD8DxWIxDcBpRVLTtGumae75vg1fWm0gALds2y6FVSB7ml9KmfIplWyjcjZUCxzHWQAwfZp0zJzykUm2mbVpVbM9gXw+HyWiTIAtnPKRSbbd70SZfD4fbUugr6/vCYChdgX9ChBRMgDhIVW79RCqYfoAIBqg4HcieqrIPAdwNUBORUqZ8h9c9IbJzjBzEHAAuMLMr0J+/qOapmUA3P2nBY7jTDHzQohia0Q0Q0QzANaCJjHzguM4UycIMLMgomwI8N8AFi3LWrcsax3AorIFOwMQZesvMqFeOvcAWCGeYsO27aP6f9u2j5h5I8QDWAoTVC6XL1ar1V0AsRAFalLKeH2Y1PB+CnBYOXGWMAwjoVcqlXkiioUcJl0I8dZ13ZdKkfshwQEgVqlU5nUimkNna4SZl890KyKaEwAOe3gzOxTMvAJgrwfge8y8QgCwtbV1qVar3SGiCQAXugz8h5m3dV1/Y5rmL+r19fwvlWwc/MiYpz4AAAAASUVORK5CYII="}},B=l("body");b.nightMode&&B.addClass("night"),t();var x=l("<div />"),v=l('<div id="userBox" style="display: none;" />');B.append(v);var C=l('<div id="loader" style="opacity: 0.6; z-index: 10000; display: none; position: fixed; right: 20px;bottom: 0; width: 240px; height: 16px; background: #0099B0;text-align: center; color: #FFF; padding: 5px 0;"></div>');B.append(C);var F,k,E,Q=/(http|https):\/\/www\.theinnercircle\.co\/member\/\d+/,R={};b.loadMemberOnHover&&(B.on("mouseover","a",function(e){k=e,k.currentTarget&&k.currentTarget.href&&Q.test(k.currentTarget.href)&&k.currentTarget.href!==h.location.href&&-1===k.currentTarget.href.indexOf("#")&&(E=k.currentTarget.href,"undefined"!=typeof R[E]&&null!==R[E]?(v.html(R[E]),v.show()):(n("Loading member in 7s..."),F=h.setTimeout(function(){h.console.log("[IC Enhancement Suite] :: Loading user : "+E),a(E),F=null,k=null},7e3)))}),B.on("mouseout","a",function(){F&&(h.clearTimeout(F),k=null),n()}),B.on("click","#userBox .username",A),B.on("click",".close-user-box",function(){v.hide()})),r(),d(),B.on("click",".fancybox-image",A),B.on("mouseover",".fancybox-image",function(e){if(k=e,l(this).attr("src")&&0===l(this).parent().find(".google-link").length){var i=l(this).attr("src"),o=l('<a class="google-link" href="http://www.google.com/searchbyimage?image_url='+encodeURIComponent(i)+'" target="_blank">Search with google</a>');l(this).parent().append(o)}}),l(".navigation").append('<a href="#" class="ic_enhance_suite navigation-icon navigation_tip" title="InnerCircle Enhancement Suite"><img src="data:image/png;base64,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"/></a>');var S=l('<div id="enhancedialog" title="Enhancements" class="dialog tabs-dialog" />');B.append(S),S.dialog({closeOnEscape:!0,modal:!0,autoOpen:!1,width:400}),l("a.ic_enhance_suite").on("click",function(e){e.preventDefault(),c(),S.dialog("open")}),B.on("click",".option_check",function(){g();var e=l(this).data("option");switch(e){case"nightMode":t();break;case"openInNew":r();break;case"hideEmptyMatches":case"hideQuestionBlock":case"hideWelcomeForm":case"hideInviteForm":d()}}),B.on("click","#saveAndReloadOptions",function(e){e.preventDefault(),g(),S.dialog("close")}),l(".inplace_view").each(function(){var e=l(this),i=e.html();e.html(i.replace("\n","<br /><br />"))}),B.on("click",".wall-pic",function(e){var i=l(e.currentTarget);if(i.hasClass("wall-pic")){var o=i.find("a").first();o.attr("href")&&h.open(o.attr("href"))}});var U=/(http|https):\/\/graph.facebook.com\/(\d+)\/.*/,L=function(){var e=l(this),i=e.prop("src").match(U);if(i){var o=e.parent().find("div").first(),t=o.text();o.html('<a class="fb" href="https://www.facebook.com/profile.php?id='+i[2]+'" target="_blank">'+t+"</a>")}},T=l("#connected");T&&T.find(".path_user img").each(L);var J=l(".mutual_box");J&&J.find("td img").each(L),h.console.log("[IC Enhancement Suite] :: Succesfully loaded Suite")}var ic_ScriptObject=document.createElement("script");ic_ScriptObject.textContent="("+ic_FunctionWrapper.toString()+")();",document.body.appendChild(ic_ScriptObject);