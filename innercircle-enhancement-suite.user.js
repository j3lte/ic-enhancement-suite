// ==UserScript==
// @name         InnerCircle Enhancement Suite
// @namespace    https://github.com/j3lte/ic-enhancement-suite
// @version      0.3.5
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

function ic_FunctionWrapper() {

    // Define global version
    var version = '0.3.5';
    var enhance_id = '_ic_enhance_options';

    // Variables
    var win = window;
    var $ic;

    if (typeof unsafeWindow != 'undefined') win = unsafeWindow;
    if (typeof unsafeWindow == 'undefined' ) $ic = jQuery;
    else $ic = unsafeWindow.jQuery || jQuery;

    if (!win.console) {
        win.console = {
            log : function(){}
        };
    }

    var defaults = {
        version : version,
        hideQuestionBlock : false,
        hideEmptyMatches : false,
        hideWelcomeForm : false,
        hideInviteForm : false,
        loadMemberOnHover : false,
        openInNew : false,
        nightMode : false
    };
    var opts = defaults;

    var optionLabels = [
        { identifier: 'option_hide_question', optionKey: 'hideQuestionBlock', label: 'Hide top question block (top middle)', enabled: true },
        { identifier: 'option_hide_empty', optionKey: 'hideEmptyMatches', label: 'Hide matches widget when there are no matches (right)', enabled: true },
        { identifier: 'option_hide_welcome', optionKey: 'hideWelcomeForm', label:'Hide welcome form (top left)', enabled: true },
        { identifier: 'option_hide_invite', optionKey: 'hideInviteForm', label: 'Hide invite form (right)', enabled: true },
        { identifier: 'option_load_hover', optionKey: 'loadMemberOnHover', label: 'Load members on hover (beta)', enabled: false },
        { identifier: 'option_open_in_new', optionKey: 'openInNew', label: 'Open member links in a new window/tab', enabled: true },
        { identifier: 'option_night_mode', optionKey: 'nightMode', label: 'Night mode', enabled: true }
    ];

    function loadSettings() {
        if (win.localStorage) {
            if (win.localStorage[enhance_id]) {
                try {
                    opts = JSON.parse(win.localStorage[enhance_id]);
                } catch (e) {
                    opts = defaults;
                    saveSettings();
                }
            } else {
                opts = defaults;
                saveSettings();
            }
        } else if ($ic.cookie('ic_enhance_options')) {
            try {
                opts = JSON.parse($ic.cookie('ic_enhance_options'));
            } catch (e) {
                opts = defaults;
                saveSettings();
            }
        }
    }

    function saveSettings() {
        if (win.localStorage) {
            win.localStorage[enhance_id] = JSON.stringify(opts);
        } else if ($ic.cookie) {
            $ic.cookie('ic_enhance_options', JSON.stringify(opts), { path: '/' });
        }
    }

    loadSettings();

    var css = [
        '/* ICES ENHANCEMENTS */',
        '#userBox { width: 158px; z-index:10000; padding: 2px; border: 1px solid #0099B0;position: fixed;left: 10px;top: 111px;font-size: 10px;background: #fff; }',
        '#userBox .profile_field { border: 0px solid #000; padding: 0px; line-height: 11px; clear: both; }',
        '#userBox .job_title { clear: both; color: #666; padding-bottom: 0; font-size: 10px; line-height: 11px; white-space: nowrap; overflow: hidden; border-top: 1px solid #CCC; border-bottom: 1px solid #CCC; }',
        '#userBox #user_photos { display: block; width: 158px; min-width: 1px; margin: 3px 0 3px 2px; }',
        '#userBox .rsTmb { width: 50px; margin: 0 2px 2px 0; }',
        '.close-user-box { cursor: pointer; }',
        '.google-link { position: absolute;background: rgba(255,255,255,0.3);left: 0;bottom: 0;width: 100%;text-align: center;color: #000;font-size: 10px;text-decoration: none; }',
        '#saveAndReloadOptions.disabled { opacity: 0.1; }',
        '.navigation a { padding: 8px 7px; }',
        '.navigation-icon img { margin-top: -4px; }',
        '#enhance_tabs label { color:#FFF; }',
        '.header .navigation a.ic_enhance_suite { padding: 0; margin-right: -9px; margin-left: 15px; }',
        '/* SCROLLBARS */',
        '::-webkit-scrollbar { width: 12px; }',
        '::-webkit-scrollbar-track { border-radius: 1px; -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.5); }',
        '::-webkit-scrollbar-thumb { border-radius: 1px; -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.5); }',
        '/* NIGHTMODE */',
        'body.night .white { background-color: #302E31; }',
        'body.night, .night .widget.white { background-color: #302E31; color: #fff; }',
        'body.night h1 { background-image: url("/images/h1_white.png"); }',
        'body.night h1, body.night h1 a, body.night .job_title, body.night .profile_field b { color:#fff; }',
        'body.night .rsDefault, body.night .rsDefault .rsOverflow, body.night .rsDefault .rsSlide, body.night .rsDefault .rsVideoFrameHolder, body.night .rsDefault .rsThumbs { background-color: #323232; }',
        'body.night .member_event_date, body.night .event_date, body.night .invites_count, body.night .my_trip_date { background-color: #0099B0; }',
        'body.night .grey, body.night .message_accent { background-color: #151415; }',
        'body.night .grey .free_corner { border-right: 15px solid #0099B0; }',
        'body.night .grey .free_text { background-color: #0099B0; }',
        'body.night .username, body.night a.username, body.night .spotname, body.night a.spotname { color: #FFFFFF; }',
        'body.night .featured_box, body.night .interest_box, body.night .ui-tooltip { color: #FFF; }',
        'body.night .nearby-block { border-top:0px solid #151415; }',
        'body.night .widget, body.night .hotposts_container { color: #FFF; }',
        'body.night .free_action { color: #151415; }',
        'body.night .answer-label, body.night #answers-element label { background-color: #302E31; color: #FFF; }',
        'body.night #answers-element label.answer-common { background-color: #0099B0; }',
        'body.night .message, body.night .message_send, body.night .message_list, body.night .ui-dialog .ui-dialog-content, body.night .ui-tabs .ui-tabs-panel { background-color: #242124; }',
        'body.night .panel-box { background-color: #302E31; }',
        'body.night .double_user, body.night .single_user { background-color: #242124; }',
        'body.night .ui-tabs .ui-tabs-panel, body.night .ui-tabs .ui-widget-header { background-color: #302E31; }',
        'body.night .ui-tooltip { background-color: #0099B0; }',
        'body.night .going_text { background: #302E31; }',
        'body.night .map-users .double_user:nth-child(even) { background-color: #343034; }',
        'body.night .map-users .double_user:nth-child(4n), body.night .map-users .double_user:nth-child(4n+3) { background-color: #343034; }',
        'body.night .accordeon .ui-widget-content { border: 1px #151415 solid; background-color: #302E31; }',
        'body.night input[type=text], body.night input[type=password], body.night textarea { background-color: #302E31; color: #FFF; }',
        'body.night .activity_widget, body.night .circle_messages_widget, body.night .circle_activity_widget { background: #302E31!important; }',
        'body.night .path_arrow { background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAoCAYAAADHVmuAAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFhsiWzBgQwAAAIBJREFUOMvt1LERgzAMQNEvLj1MEhsmYISMyghMgGRPkGyQTOBUucvlCKiAzip1T5JVyFJKwRMNzqiwwoOgZTXL2okIIrLZMQCzpqXzjA7AXdMSPW9sgdmyRs8yLTB54Au47cEHMMZrb5/EZQUlYOzD8Pw+5eYf+q2W+gFUeD58Ax+PI0CbsNsrAAAAAElFTkSuQmCC\') }',
        'body.night .fancybox-skin { background: #363636; }',
        'body.night #user_search_results { background-color: #302E31; color: #FFF; }',
        'body.night .searchplace:hover, body.night .searchuser:hover, body.night .searchtrip:hover { background-color: #151415; }'
    ].join('\n');

    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }

    // Nightmode images
    var nightmode_img = {
        inplace_edit : {
            filename: 'edit',
            identifier: 'img.inplace_edit',
            replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFDcXNzYboAAAArVJREFUWMPFl81LFVEYxn8zqWUfIC4iIiIDQUhP95xdQatctCiiQne1DAokqEj7gCIljQItg/oHXGT0QdQi2kRSLZJz7FgQpVltitIwKj/h3jZz4XC5M3fubbSzuTzvM/O+z33eec+c8TKZDP9zlYURnufFTmKsvgnMAPeBh1Komdxrwv6oF0rEFGCs3gPccULjQDfQLYWaXlABxupy4A1Qm4f+AByQQj2LEuD/YwsPhRQH2Ag8MVYfjkpQsgPG6ipgFKiOIfRkqkF2Je3AmZjFATqHhk1jYgKM1TVAixOaAmYjbhkDnibpwEWgwsHtwCbgQcj1J1INci4RAcbqLUCTE/oMXJFCjUqhdgGXc2557nne7bB8RQl49XrIy1PgdHbejdWVQHMOfzzVIDOJCEin003AVic06Pt+n4OPAOsd3C+FehGV0y/C+gogd5SObq5PZQJ+NXDK4eaAtkJ5i3GgBahx8D0p1ICDzwGrHNwrhRpLRICxujqY++yaB1odvg446PA/gI44ueM6cBaocvB1KdQ7B18ClrhuSKEmExFgrK4N9vzs+gmcd/jtwE6Hfw/ciNvXOA50AeUO7pBCTQTF/Txj2SqFmk9EgLF6G7A3Z0vtdfB+IOXgASnU3WJGu5ADX4BHDm6TQs0G4pYDF3LHstidNVKAFGpECrUD2Af0+75/y6GPAWsd3CeFGixWQEnnAWP1GmAEWBGEZoA6KdSnsHuSPhE1O8UBeqKKl9QCY/WyiNZcBXYDH4HvQGepp5rQFgwNm57A2nYp1J8QkZVAvRTqZaFCpbTgV7DdvjVWN4U4MR2neKlT8C34XQf0G6sfB3t+oitKwHgObgSssbrLWL1yMQRM5IlNAWlg6YJ/GwZPt/sC6gnGbTLJFpQVeAYmgpfNNSnU70X9Oga+AhsWqnB2/QVgL+ZN0utiqwAAAABJRU5ErkJggg=='
        },
        ignore_off: {
            filename: 'ignore_off',
            identifier: '.ignore.ignore_icon.icon img',
            replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQApZ5LMCAAAA9hJREFUWMO1112IVVUUB/DfjFJ+NJopSJEGkmDUHOYcKrIP0RRFoQ80KHqYoOxTqB4ygojqISiohwSxEikzJyLCkNKHQFA0+qBzx2svFUGmDOkgpZaF4dxe1pHD5dw7d2hcsNnn7L32Xv+19n9/rK5Go6GQrq4unUitns/FejyOBjbhlTTJjrUbV7Z13uZYANTq+Ww8g37MQncAaOA3fIh30iT7cVwAHPx+sGtkZGQm7sIDuAkTovsY3kcXHsSMaP8bg9G3sxyVjgDU6vkK3I0+LEBPeCo8PYGt2JAm2ZGIzBw8gfswJ0A1cBbD+AE59uCrvt70VCWAwUO1NdiGyTEBjOAMvsObaZJ92maJenBnRCuJZTpvC+fwZF9v+lbROLFpjtW4GKfwJXZjR+HpaJIm2Wlsx/ZaPZ+CXizBjVFPx0K0BNATnu9Lk+wO/0PSJDuDr6Oo1fN9uLlZr7uZqBGqScZfLor5/2gHoCDHJRcAwJSo2wI43qQ8njK5REStOPBn1JPaMP1FXIWH0yQ7F20TsBmH0yR7ucXQYs6T7QCcadFeGNmIR6NpWq2e3x/fA1gTepdjXQGuiQMw1A7A0aintljDtPS/Brvie2l5A4Tu6RYRONKOA4Ol7Vi1x5djb6l5aZPxvVgeuuXozQhQDfzUDsDPcfJNqtXzeRUgTmIV9ldEaD9WhU6zLAoCnu7rTU+0BJAm2T9xdhchrpLLMLuifXb0VcmSqvWvigAcjHpFBRGvxgHMrxg3HwdCp1n6mpa4LYAdJTKVjV8bYZ5bav48SiFzsT90i3HTcU2s/xedANgVPJhWq+c3lNqHS+dEsfVWRxloOkuGS//LMDO2eEcAhoKpE/BSiR/HsTiIOoD+NMnOpkl2Nl5IA9G3OHQLWRsEPNjXm47OgTTJRrClIE+tns8q9R2N67S/fNDEdz8Whk4R/nm4JcK/pYqdE1uwdnN4PxXPRimMDbe4fs81hR6ejzmGsLNqXHeLyU7hjUD+UK2eLxjrzVOr59ejOKpfT5Ps944BhGzCL7gUG8ZofHqE/OLgxbutdLvbvGiO4bmIwu21en7PGDA8jevwLx6LiBprBKRJ9nHs8y68V6vnizrwfiWeit8P0iTb006/uwNv1sdDZSq2NZ0NVev+USzbN3hhtMlHBRBZzsq4qq/EQK2eJxXGl8Uh1hPPrrVpkg2NNn/HqVkY2Ior4q6/N02y3fFQ6cerkQf8ihVV6dl45Ia34bPw8i98gmmRjHTjUHj+7QVJTkuX0kbcGuQs0rBBrE6T7PAFy46b9vk6PBJPrdfwdiQjY0rP/wOKCGu6HBGxoQAAAABJRU5ErkJggg=='
        },
        favorite_off: {
            filename: 'favorite_off',
            identifier: '.favorite.icon img',
            replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQsXRQcIaAAAAxZJREFUWMPV10toXVUUBuDvpFEbRHxDLdaKVSlCdjhn4MxRFYoVFC21NT4oVYsTR2roQIvUB0EdONOADgRr2kGw6tBhHXTgOfVENNUqlmIRpPjAUijJPU5W4RJvEntuUvHChnv3XXutf/3rtXfWNI3/7efodJUdna6yfnQM9nO4aZr74+vHbXW0Rl/V5QDK+Fnkqei00TPQBwHbMBJr20VloKrLQUzjttj6HsN5KmYvFgOjYfw4fsLtsbfyDFR1eSmOYS2ewlV4Az9jY56KcyvNwC7cFCCm8EGwsD7+WzkGqrocCtqvx/Y8FVOx/wQmcBob8lScXSkGnsEazOCzrv0PA9iakFkeBiLb1+OWSLqXMYTNeSoOz5O9B4dwBnujMn7EicWqI6vqcjU29Fi3RqwH0cT6C6/kqXhrAcCv4lmsDucyzOFEMPTD/JVVdfkung4dHczGoTmcw5/4NTyazFPx6RKsjeIhrItcuQKXRbhXhUPnQz+RHZ2usqZpXsdYADiM/fgaM3kqTvczL6q6vA53YCMewV0BYDzLsj1Zl+BzGA/PX8O+PBVzyzE1q7pchZewJxh4IU/Fm/9Iwqoud+GdiPckdvYLIoy/jx3h+e48Fe/1LMP4Y3sA2IEDy0DAgWjTHTzcbXzBMqzq8u6Y8UM4lKfiwZbef4ItOIsH8lR8/q8aUQhuwu+4r6rLsRbG92IzfsOmXsYX7YR5Ko7g3pB5sgUBj8bZLaGrr1Y82wLA3HLMghQJebIFgFNxNvUDYDiy93gLAN/F2eF+bsUpqKx6dLfHsDWMTOGjPBW/dIl9iceXYmApACMB4EgYvhzPYzeuiTJucCfGqrqcwHieijP4InJnpNU4rupyXdx0ToWSnTEvro7QzWBfiL8YvR7+iLa7HzVuwM15Kk5eaA6MdI3h6ZgT10ZsR+MWPJmnYjLiPIpvcSXexlfn3y+LsTCwRPwHcGPcdI7NM9zp6hmdAJJCZiYurWtDR2oDYDhC9M1Chns0r04PRrLFKmGxJLwkBtLBC312hfxkVZcH49W0dcEk/K+f538DRJIHyXoxFg0AAAAASUVORK5CYII='
        },
        like: {
            filename: 'like',
            identifier: '.like.icon img',
            replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQoXXBw5KQAAA0lJREFUWMPl10uoVlUUwPHfUTPz3aC0UoQoMy73cPepnCQYRNAgadLTW8LlRplkAwdBUFJGGTQJUijQCiGzSU/KQXGprKBB59ixB2QNtCwJzIsvUPB+TZbx+d3vPnx8OGhP9hnsvdZ/rbXX42SNRsOFXBNc4HXBASZBlmUjHqjqchbmYTDlxb6xBFZ1OSPOH8uybG9PdxoW4+awZ41GYxjAzl1V1mg07sIaLMapA/uxCS+lvDjcongp1mJpk2cP4C28mPJi/7gAqrqciS1YhpM4jIOYjkvDa7txR8qLX+POOjyFBo7EnYswK/ZBPJDyYjv0dCdVXQ5/A1VdXoJPQvlBPI6FKS+uwQLcjj1YiIGqLudUdbk2lB/HRnSlvJgX52/Ft5iND6u6XNYajtM8UNXlBqzCH1iS8mJvmxjPxje4Dt8jxwmsTHmxZYR38SoewlF09/X27x3mgaouu/BoWLK8nXJIeTGI2/AZFmEf+kdSHuuxgJ2BF9p6oKrL14LynSzLetu93harpqMHx1JelOPIjgJfxxua39Od9v8HsHNXleHPiNXilBe7OpHzVV3+gOvxSE932tQcgnmYg0OdUh7rOwzhhtZKeFXshzpc+PZEas9tBZgU+8kOAxxtbQGnPv6OfWpVl53sD3NC5z+tAL/hWFS6+R0EuCl0/ngaQMqLk9iBi3FvhzLgCnRFXxlo1463YSL6qrqc1gGGB6Of7O7r7S/bAbwd3e5q3HeerZ+G1WHgy20HkpQXJ/BMZMTzVV3OPU/KJ2A9rowu+vpoE9FmfIXL8EFVl1POA0MvHo5WvTIMbQ+Q8mIIKyJNbgygc7F+CTZgcgwln4/ajlsufhrheAOrU14cP0PlN+Pj6IDv4Z4wcOyRLAQsi8yYjO24ezwQVV1ODJevx0x8FHdPjHsmbBJ2C96NLvlzCPppDOWbcX94bxv6WuM+boAQugjv49qY9TZifcqLIy3nErbGuNbAuizLnjurqXiE4WNDFJMh/IJVKS++iHR9FssxFX9hRcqLgZHknTFAE8ideCXmh+P4HZdHhcvwJp5IeXFgNDlnDdD04/F0VLYpTYPGmpQXX45HxjkBNIEswJPYkWXZ1rFmyFEB/tc/p/8CadxeyIwnmc8AAAAASUVORK5CYII='
        },
        message: {
            filename: 'message',
            identifier: '.conversation.icon img',
            replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQsBsdO9OQAAAbNJREFUWMPt1z1PFFEUxvHf+FapjS9ROomNzSQz0mzQGuwECrXBhFD4JfwS1kSjDdrRCfWSWKAzOBQ0ijYaE4mFWmkxNkezIawssyRb7N5qMpO5z3P+99xz7k3qujbIccyAx8jAyMCJza2yHm4CHc9fcR4fMJOledXtp7quJUnSs0hZFdfxsnN+vN1LYDY+jmOjrIqJo4iwrIobIX4Bu7jfGdw/A1mar4ezXziJ5bIqWn2Kp3iKc0H4VujsnwPhbBLvg8RKRNBEfAIbuIKPmM3S/M2BSZil+WvMB66LeF5Wxc1DirewjFP4HTm13vMuyNL8FebwCZfxuNflCGIrQfAdJv+X0F23YTi+hx1cxepBJkL8RZDbxXwQbVYHsjRvx3J8xxksdTMR75/gEj5jLkj2V4hikmls4xrWNrfK1j7ia0FqB3e7rXmjShgmFvEzSDz7m5ghvoTT+BHY20deisPEVCTWeOyOB1gNMtuY6gV7414Qky/gC8bwCGcj8sXDijdqRoH3Dr7heBCZbiLeuBtGgt3GQyw0Fd/bDZuQaOtzjI5kAzeQlFUx3GfCZHQ3HHoDfwAavJ54vwr+6wAAAABJRU5ErkJggg=='
        },
        wink_off: {
            filename: 'wink_off',
            identifier: '.wink.icon img',
            replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQohk6assAAABEpJREFUWMPFl1tsFUUYx3/nFI4EjBWLKVqLAWMk6o47Izx4iYBiJOIFQrQxRiigxMQHBW0kpCYlRrSpCSagERoUNdxDCODtyQjRiFF2TvaExhQvD0QKIhZoaUuLZ335Fieb057Ti7Ivk52d2e8//+/2n1QURVzOZxRAKpUqutCGQRXwNFAD3AhcKfvTwN9AF3AU2Als08oc6+9f7qFTURQNCMCGwTSgAZgJjC3xYL3A50C9VqZlSABsGFQCq4BngHKZPgt8B+wFvgHagAioAu4F5gAznPWngHeAd7UyHSUDsGFQIVTOkKlWYC2wVStzvoirxgnoOnEVwFdArVbmeFEANgymAAfkVN3Ae0CjVubPwQSXxMxrwCLgCuAn4B6tTHu/AGwYTAC2ArOBi8ALWpnm4US5DYPFwEagDPgUWOR7uj3+nk6sfxW4H+gAnhyucXk+Enf0Ag8Dy92PlxiwYaDEV1dL0Lw4kvluw6AZWAycBmb5nm5JMvAWcA3wK7DmP6g5DcAxYIJk178MZHO2WiI9AyzVymxOoF8AvCFBudz39NelFK8CLLwCNALngSrf0x2j5NtzEqlngO2JTeMlMDMytSubs5VAvoCBZF0/oJWZ6bxvBFZLFV0AbI5d8IiMB7UyPYmfVDjGETdlhuIDrcw54JC81l7qBcBkGXcX2PSzDYO9wOMytc73dE8/Bkrxy35gFnCLCyCu8YcL7Uin0/Pz+fzdQLfv6WCYwRjbKHcBxOPxQjvuuN2PgG9HKBuOyJhxDcfUlbkrfU+PiMVszrqvebcIxkF4Qbpa9f+gQW6Vsc9loEsouRPIxis/3LKpSeYOa2XqSsjz0cA4Sek1wBTge63MSmdZ3GHbXQZ+ETfMS/zzN+A+YIkNg+tKSLM+rcwZAbBQjCWDdo4bCzGAXeKC6TYMrnIW7wD+AsYD66XXF2OhHGiWeDrle3pnQitMk9ftLoDdQKfU6RrnRKeBJgmcecCGIsar5TCzpWyvSCx5CRgjLt+R7Ib7gLkiHB6M1YsNgwywHlgqgNuAD4CPtTKt8n2qqKAaETJ5oMn39KpY9Aq4Q8BEYJPv6WXJbrhaWuVUt1tpZXq1MsukifQBlcBKoMWGQafoxED6/PXACTnp64nTN4rxP6TzFlREjcDLoobqtTJvJyieLLTOBW5wDtAnzOwBNmhlWmPtl83ZMuB50ZRpoM739Nr+AFQIvY+K1q/VymwZQHxOFLpPamW6CsnvbM42APWSZZ8BT/ievjCQKB0L/CjN4iLwibBxYpC9f5LUghrJiB+Ax7QyJ0uR5ZMklR4Q5G1C4TqtTG8RwxXAEuBZ4CaZ3gMs1Mp0D+ZiMkb8vUI0AEAPcBD4UprTUWA0cBtwF/AQMF1SLQJ+B94XjXluqFezm0XfP+U0qyjRxJJKqEMk+JtamSPDuhs6QK6Vy+l8oTZWSpEUnbNAi7juC61MZ8mX08v5/AM7mbBooQ5tRwAAAABJRU5ErkJggg=='
        },
        report: {
            filename: 'report',
            identifier: '.report.feedback img',
            replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFiEAq/n/3gAAAuNJREFUWMPFVz9oE1EY/33vjvQiUpSCgUpLjWkCWloudxahpW7dunSqnVzETRfRpYtglyySoZODm0O2Lt21ENJeLqUlCmLRYqFVQbQgJj3C+1xe4BqT5i5tzJuS79/vd7/ve3fvETOjl0ugx4s6TSyVSoNSykUAEEK8TqfTB/+NwObm5pAQogBgUJkOpJS3Jycn97veglwupwkhVn3gADAohFjN5XJa1wnE4/EHAMwmLlP5uteCnZ2dy57nfQQw0CLkRyQSGR0fH//ZFQU8z3t2CjgADKiY81egVCrdkFJuA9DbhNaEEBPpdPr9uSogpXzRBPwbgK8NNl3Fnl8LXNedAzDbYH5sGMYwgGEADxt8syrn7C0ol8uRarX6DkDCZ963LGuEiCQAMLNwXfezIlNfu4Zh3BwbG/POpMDx8fGjBnAAKNbBAUD9dhtiEiq38xYUCoUYMy81cY02sV1vNDDzUqFQiHVMQNf1ZQD9TVwJZhY+IGpBql/VCD8DxWIxDcBpRVLTtGumae75vg1fWm0gALds2y6FVSB7ml9KmfIplWyjcjZUCxzHWQAwfZp0zJzykUm2mbVpVbM9gXw+HyWiTIAtnPKRSbbd70SZfD4fbUugr6/vCYChdgX9ChBRMgDhIVW79RCqYfoAIBqg4HcieqrIPAdwNUBORUqZ8h9c9IbJzjBzEHAAuMLMr0J+/qOapmUA3P2nBY7jTDHzQohia0Q0Q0QzANaCJjHzguM4UycIMLMgomwI8N8AFi3LWrcsax3AorIFOwMQZesvMqFeOvcAWCGeYsO27aP6f9u2j5h5I8QDWAoTVC6XL1ar1V0AsRAFalLKeH2Y1PB+CnBYOXGWMAwjoVcqlXkiioUcJl0I8dZ13ZdKkfshwQEgVqlU5nUimkNna4SZl890KyKaEwAOe3gzOxTMvAJgrwfge8y8QgCwtbV1qVar3SGiCQAXugz8h5m3dV1/Y5rmL+r19fwvlWwc/MiYpz4AAAAASUVORK5CYII='
        }
    };

    // Body element
    var $body = $ic('body');
    // Make sure nightmode is already set before we do all the checks (matter of speed)
    if (opts.nightMode) {
        $body.addClass('night');
    }

    function replaceImg(img, revert) {
        $ic(img.identifier).each(function () {
            if ($ic(this).attr('src').indexOf(img.filename) !== -1 && !revert) {
                $ic(this).data('orig-src', $ic(this).attr('src'));
                $ic(this).attr('src',img.replacement);
            } else if (revert && $ic(this).data('orig-src')) {
                $ic(this).attr('src',$ic(this).data('orig-src'));
            }
        });
    }

    function flipNightMode() {
        var keys = Object.keys(nightmode_img);
        if (opts.nightMode) {
            $body.addClass('night');
            // replace all img with the white base64 version
            for (var i = 0; i < keys.length; i++) {
                var img = nightmode_img[keys[i]];
                replaceImg(img);
            }
        } else if (!opts.nightMode && $body.hasClass('night')) {
            $body.removeClass('night');
            for (var i = 0; i < keys.length; i++) {
                var img = nightmode_img[keys[i]];
                replaceImg(img, true);
            }
        }
    }

    flipNightMode();

    // $membox is used for the downloaded content
    var $memBox = $ic('<div />');

    // Userbox is the box that is shown when a member is loaded
    var $userBox = $ic('<div id="userBox" style="display: none;" />');
    $body.append($userBox);

    // Loader that is shown at the bottom right of the window
    var $loader = $ic('<div id="loader" style="opacity: 0.6; z-index: 10000; display: none; position: fixed; right: 20px;bottom: 0; width: 240px; height: 16px; background: #0099B0;text-align: center; color: #FFF; padding: 5px 0;"></div>');
    $body.append($loader);

    function loader(message) {
        if (message) {
            $loader.text(message);
            if ($loader.is(':hidden')) {
                $loader.show();
            }
        } else {
            $loader.hide();
        }
    }

    // Regex to determine whether a link contains a member link
    var memLinkRegEx = /(http|https):\/\/www\.theinnercircle\.co\/member\/\d+/;
    var timer, ev, link, userBoxes  = {};

    // Loads the member page
    function loadMember(link) {
        loader('Loading member...');
        $memBox.load(link, function(){
            //callback after your data is in loaded into body.
            var userName = $memBox.find('.username').parent();
            var jobTitle = $memBox.find('.job_title');
            var thumbs = $memBox.find('#user_photos');
            var profileFields = $memBox.find('.profile_field');

            $userBox.html('');
            $userBox.append(userName);
            $userBox.append(jobTitle);
            if (thumbs.find('.rsImg').length) {

                var h = Math.round(thumbs.find('.rsImg').length / 3) * 50;
                thumbs.css('height', h + 'px');

                thumbs.find('.rsImg').each(function (i){
                    if ($ic(this).data('rsbigimg')) {
                        $ic(this).attr('href', $ic(this).data('rsbigimg'));
                    }
                    $ic(this).attr('target',"_blank");
                });

                $userBox.append(thumbs);
            }
            $userBox.append(profileFields);
            $userBox.append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick close-user-box" style="position: absolute; top: 0; right: 0;"></span>');

            userBoxes[link] = $userBox.html();
            link = null;

            loader();
            $userBox.fadeIn(500);

            win.console.log('[IC Enhancement Suite] :: User shown');
        });
    }

    // Load member on hover
    if (opts.loadMemberOnHover){
        $body.on('mouseover', 'a', function(event) {
            ev = event;
            // Only set timer if it has a target link, matches a member and is not equal to current member
            if (ev.currentTarget && ev.currentTarget.href && memLinkRegEx.test(ev.currentTarget.href) && (ev.currentTarget.href !== win.location.href) && ev.currentTarget.href.indexOf('#') === -1) {

                link = ev.currentTarget.href;

                if (typeof(userBoxes[link]) !== 'undefined' && userBoxes[link] !== null) {

                    $userBox.html(userBoxes[link]);
                    $userBox.show();

                } else {
                    loader('Loading member in 7s...');
                    timer = win.setTimeout(function() {
                        // Execute when timer reached
                        win.console.log('[IC Enhancement Suite] :: Loading user : ' + link);
                        loadMember(link);

                        timer = null;
                        ev = null;

                    }, 7000);

                }
            }
        });

        $body.on('mouseout', 'a', function(event) {
            if (timer) {
                win.clearTimeout(timer);
                ev = null;
            }
            loader();
        });

        // Userbox clicks
        $body.on('click', '#userBox .username', open_new);
        $body.on('click','.close-user-box', function() { $userBox.hide(); });
    }

    function open_new() {
        $ic(this).target = "_blank";
        if ($ic(this).prop('href')) {
            win.open($ic(this).prop('href'));
        } else if ($ic(this).prop('src')) {
            win.open($ic(this).prop('src'));
        }
        if (timer) {
            win.clearTimeout(timer);
            ev = null;
        }
        return false;
    }

    function switchOpenInNew() {
        if (opts.openInNew) {
            $body.on('click', '.online_box a', open_new); // Open online members in new tab/window
            $body.on('click','.featured_box a', open_new); // Open featured in new tab/window
            $body.on('click','.interest_box a', open_new); // Open interest in new tab/window
        } else {
            $body.off('click', '.online_box a', open_new); // Open online members in new tab/window
            $body.off('click','.featured_box a', open_new); // Open featured in new tab/window
            $body.off('click','.interest_box a', open_new); // Open interest in new tab/window
        }
    }

    switchOpenInNew();

    function switchHideElements() {

        if (opts.hideEmptyMatches && $ic('.potential_match .match-last').length) {
            console.log('[IC Enhancement Suite] :: No matches, hiding box');
            $ic('.potential_match').hide();
        } else {
            $ic('.potential_match').show();
        }

        $ic('.nearby-block.question').css('display', (opts.hideQuestionBlock ? 'none' : 'block'));
        $ic('.widget.tutorial-welcome').css('display', (opts.hideWelcomeForm ? 'none' : 'block'));
        $ic('.widget.invite-form').css('display', (opts.hideInviteForm ? 'none' : 'block'));
    }

    switchHideElements();

    // Open fancybox images originals
    $body.on('click','.fancybox-image', open_new);

    // Add 'Search with google' link to popup images
    $body.on('mouseover', '.fancybox-image', function(event) {
        ev = event;
        if ($ic(this).attr('src') && $ic(this).parent().find('.google-link').length === 0) {
            var href = $ic(this).attr('src');
            var link = $ic('<a class="google-link" href="http://www.google.com/searchbyimage?image_url=' + encodeURIComponent(href) +'" target="_blank">Search with google</a>');
            $ic(this).parent().append(link);
        }
    });

    // Enhance Dialog (Options screen)
    //$ic('.navigation').append('<a href="#" class="ic_enhance_suite">Enhance</a>');
    $ic('.navigation').append('<a href="#" class="ic_enhance_suite navigation-icon navigation_tip" title="InnerCircle Enhancement Suite"><img src="data:image/png;base64,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"/></a>');

    var $enhDialog = $ic('<div id="enhancedialog" title="Enhancements" class="dialog tabs-dialog" />');
    function createEnhanceDialog() {
        var dialogContent =  '<div id="enhance_tabs" class="tabs-no-padding">\n';
        for (var i = 0; i < optionLabels.length; i++) {
            var opt = optionLabels[i];
            if (opt.enabled) {
                dialogContent += '    <input type="checkbox" class="option_check" data-option="' + opt.optionKey + '" id="' + opt.identifier + '" name="' + opt.identifier + '" ' + (opts[opt.optionKey] ? 'checked="checked"' : '') + '>\n';
                dialogContent += '    <label for="' + opt.identifier + '" class="optional">' + opt.label + '</label>\n';
                dialogContent += '    <div class="clear"></div>\n';
            }
        }
        // SUBMIT
        dialogContent += '    <dt></dt>\n';
        dialogContent += '    <a href="#" id="saveAndReloadOptions" class="button">Close</a>\n';
        dialogContent += '</div>';
        $enhDialog.html(dialogContent);
    }

    $body.append($enhDialog);
    $enhDialog.dialog({
        closeOnEscape: true,
        modal: true,
        autoOpen: false,
        width: 400
    });

    $ic('a.ic_enhance_suite').on('click', function (e){
        e.preventDefault();
        createEnhanceDialog();
        $enhDialog.dialog('open');
    });

    function saveForm() {
        opts = { version : version };
        $ic('.option_check').each(function () {
            var key = $ic(this).data('option');
            opts[key] = $ic(this).is(':checked');
        });
        saveSettings();
    }

    $body.on('click', '.option_check',function (e){
        saveForm();
        var option = $ic(this).data('option');
        switch(option) {
            case 'nightMode':
                flipNightMode();
                break;
            case 'openInNew':
                switchOpenInNew();
                break;
            case 'hideEmptyMatches':
            case 'hideQuestionBlock':
            case 'hideWelcomeForm':
            case 'hideInviteForm':
                switchHideElements();
                break;
        }
    });

    $body.on('click', '#saveAndReloadOptions',function (e){
        e.preventDefault();
        saveForm();
        $enhDialog.dialog('close');
    });

    // Fix the inplace editor for profile editing (Need to debug this further)
    $ic('.inplace_view').each(function (){
        var $this = $ic(this);
        var html = $this.html();
        $this.html(html.replace('\n','<br /><br />'));
    });

    // Make wall pics clickable
    $body.on('click', '.wall-pic', function (e) {
        var $target = $ic(e.currentTarget);
        if ($target.hasClass('wall-pic')) {
            // get href
            var $link = $target.find('a').first();
            if ($link.attr('href')) {
                win.open($link.attr('href'));
            }
        }
    });

    // DEBUG
    win.console.log("[IC Enhancement Suite] :: Succesfully loaded Suite, version " + version);
}

var ic_ScriptObject = document.createElement("script");
ic_ScriptObject.textContent = "(" + ic_FunctionWrapper.toString() + ")();";
document.body.appendChild(ic_ScriptObject);