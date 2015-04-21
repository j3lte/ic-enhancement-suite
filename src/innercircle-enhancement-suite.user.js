function ICES () {

    this.win = window;
    if (typeof unsafeWindow !== 'undefined') {
        this.win = unsafeWindow;
    }

    this.enhance_id = '_ic_enhance_options';
    this.defaults = {
        hideQuestionBlock : false,
        hideEmptyMatches : false,
        hideInviteForm : false,
        openInNew : false,
        nightMode : false
    };

    this.optionLabels = [
        { identifier: 'option_hide_question', optionKey: 'hideQuestionBlock', label: 'Hide top question block (top middle)', enabled: true },
        { identifier: 'option_hide_empty', optionKey: 'hideEmptyMatches', label: 'Hide matches widget when there are no matches (right)', enabled: true },
        { identifier: 'option_hide_invite', optionKey: 'hideInviteForm', label: 'Hide invite form (right)', enabled: true },
        { identifier: 'option_open_in_new', optionKey: 'openInNew', label: 'Open member links in a new window/tab', enabled: true },
        { identifier: 'option_night_mode', optionKey: 'nightMode', label: 'Night mode', enabled: true }
    ];

    this.opts = this.defaults;

}

ICES.prototype.loadSettings = function (){
    var _this = this;
    if (_this.win.localStorage) {
        if (_this.win.localStorage[_this.enhance_id]) {
            try {
                _this.opts = JSON.parse(_this.win.localStorage[_this.enhance_id]);
            } catch (e) {
                _this.opts = _this.defaults;
                _this.saveSettings();
            }
        } else {
            _this.opts = _this.defaults;
            _this.saveSettings();
        }
    }
};

ICES.prototype.saveSettings = function (){
    var _this = this;
    if (_this.win.localStorage) {
        _this.win.localStorage[_this.enhance_id] = JSON.stringify(_this.opts);
    }
};

ICES.prototype.appendCSS = function () {
    var css = [
        '/* ICES ENHANCEMENTS */',
        '.tutorial-welcome { padding-bottom: 10px; }',
        '.nearby-block { margin-top: -10px; }',
        '.fancybox-nav { width: 20%; }',
        '.google-link, .upload-date { position: absolute; height: 15px; line-height: 15px; left: 0;width: 100%;text-align: center;color: #000;font-size: 11px;text-decoration: none; }',
        '.google-link { bottom: -14px; }',
        '.upload-date { top: -15px; }',
        '#saveAndReloadOptions.disabled { opacity: 0.1; }',
        '.navigation a { padding: 8px 7px; }',
        '.navigation-icon img { margin-top: -4px; }',
        '.tabs-dialog .ui-tabs-panel.enhance_tab { padding:10px 0 10px 10px; }',
        '#enhance_credits p { margin-bottom: 10px; }',
        '.header a.ic_enhance_suite { font-weight: bold; padding: 0 17px; }',
        '.mutual_box a.fb, .path_user a.fb { color: #0000FF; }',
        '.online_box a, .birthdays_box a, .path_user { position: relative; }',
        '.age_count { top: 28px; right: -3px; font-size: 9px; height: 14px; line-height: 14px; padding: 0 5px; }',
        '.fb_flair { top: -7px; background: #3a5795; font-size: 10px; padding: 0 4px; }',
        '/* SCROLLBARS */',
        '::-webkit-scrollbar { width: 12px; }',
        '::-webkit-scrollbar-track { border-radius: 1px; -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.5); }',
        '::-webkit-scrollbar-thumb { border-radius: 1px; -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.5); }',
        '/* NIGHTMODE */',
        'html.night .white, html.night nav.canvas { background-color: #302E31; }',
        'html.night .google-link, html.night .upload-date { color: #FFF; }',
        'html.night .header { border-top-color: #302E31; }',
        'html.night body, .night .widget.white { background-color: #302E31; color: #fff; }',
        'html.night h1 { background-image: url("/images/h1_white.png"); }',
        'html.night .ui-state-default .ui-icon { background-image: url(/css/ui/images/ui-icons_ffffff_256x240.png); }',
        'html.night h1, html.night h1 a, html.night .job_title, html.night .profile_field b { color:#fff; }',
        'html.night .rsDefault, html.night .rsDefault .rsOverflow, html.night .rsDefault .rsSlide, html.night .rsDefault .rsVideoFrameHolder, html.night .rsDefault .rsThumbs { background-color: #323232; }',
        'html.night .member_event_date, html.night .event_date, html.night .invites_count, html.night .my_trip_date { background-color: #0099B0; }',
        'html.night .grey, html.night .message_accent { background-color: #151415; }',
        'html.night .grey .free_corner { border-right: 15px solid #0099B0; }',
        'html.night .grey .free_text { background-color: #0099B0; }',
        'html.night .username, html.night a.username, html.night .spotname, html.night a.spotname { color: #FFFFFF; }',
        'html.night .featured_box, html.night .interest_box, html.night .ui-tooltip { color: #FFF; }',
        'html.night .nearby-block { border-top:0px solid #151415; }',
        'html.night .widget, html.night .hotposts_container { color: #FFF; }',
        'html.night .free_action { color: #151415; }',
        'html.night .answer-label, html.night #answers-element label { background-color: #302E31; color: #FFF; }',
        'html.night #answers-element label.answer-common { background-color: #0099B0; }',
        'html.night .message, html.night .message_send, html.night .message_list, html.night .ui-dialog .ui-dialog-content, html.night .ui-tabs .ui-tabs-panel, html.night .ui-dialog { background-color: #242124; border-color: #242124; }',
        'html.night .panel-box { background-color: #302E31; }',
        'html.night .double_user, html.night .single_user { background-color: #242124; }',
        'html.night .ui-tabs .ui-tabs-panel, html.night .ui-tabs .ui-widget-header { background-color: #302E31; }',
        'html.night .ui-tooltip { background-color: #0099B0; }',
        'html.night .going_text { background: #302E31; }',
        'html.night .map-users .double_user:nth-child(even) { background-color: #343034; }',
        'html.night .map-users .double_user:nth-child(4n), html.night .map-users .double_user:nth-child(4n+3) { background-color: #343034; }',
        'html.night .accordeon .ui-widget-content { border: 1px #151415 solid; background-color: #302E31; }',
        'html.night input[type=text], html.night input[type=password], html.night textarea { background-color: #302E31; color: #FFF; }',
        'html.night .activity_widget, html.night .circle_messages_widget, html.night .circle_activity_widget { background: #302E31!important; }',
        'html.night .path_arrow { background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAoCAYAAADHVmuAAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFhsiWzBgQwAAAIBJREFUOMvt1LERgzAMQNEvLj1MEhsmYISMyghMgGRPkGyQTOBUucvlCKiAzip1T5JVyFJKwRMNzqiwwoOgZTXL2okIIrLZMQCzpqXzjA7AXdMSPW9sgdmyRs8yLTB54Au47cEHMMZrb5/EZQUlYOzD8Pw+5eYf+q2W+gFUeD58Ax+PI0CbsNsrAAAAAElFTkSuQmCC\') }',
        'html.night .fancybox-skin { background: #363636; }',
        'html.night #user_search_results { background-color: #302E31; color: #FFF; }',
        'html.night .searchplace:hover, html.night .searchuser:hover, html.night .searchtrip:hover { background-color: #151415; }'
    ].join('\n');

    if (typeof GM_addStyle !== 'undefined') {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle !== 'undefined') {
        PRO_addStyle(css);
    } else if (typeof addStyle !== 'undefined') {
        addStyle(css);
    } else {
        var node = document.createElement('style');
        node.type = 'text/css';
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName('head');
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }

    if (this.opts.nightMode) {
        document.documentElement.className += ' night';
    }
};

ICES.prototype.setup = function () {

    // Variables
    var win = this.win;
    var $ic;

    if (typeof unsafeWindow === 'undefined' ) {
        $ic = jQuery;
    } else {
        $ic = unsafeWindow.jQuery || jQuery
    }

    if (!this.win.console) {
        this.win.console = {
            log : function(){}
        };
    }

    if (!$ic || !$ic.fn.jquery) {
      win.console.log('[IC Enhancement Suite] :: Terminated because no jQuery is loaded');
      return;
    }

    // body element
    var $body = $ic('body');
    var _this = this;

    // Nightmode images
    var nightmode_img = {
        inplace_edit : { filename: 'edit', identifier: 'img.inplace_edit', replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFDcXNzYboAAAArVJREFUWMPFl81LFVEYxn8zqWUfIC4iIiIDQUhP95xdQatctCiiQne1DAokqEj7gCIljQItg/oHXGT0QdQi2kRSLZJz7FgQpVltitIwKj/h3jZz4XC5M3fubbSzuTzvM/O+z33eec+c8TKZDP9zlYURnufFTmKsvgnMAPeBh1Komdxrwv6oF0rEFGCs3gPccULjQDfQLYWaXlABxupy4A1Qm4f+AByQQj2LEuD/YwsPhRQH2Ag8MVYfjkpQsgPG6ipgFKiOIfRkqkF2Je3AmZjFATqHhk1jYgKM1TVAixOaAmYjbhkDnibpwEWgwsHtwCbgQcj1J1INci4RAcbqLUCTE/oMXJFCjUqhdgGXc2557nne7bB8RQl49XrIy1PgdHbejdWVQHMOfzzVIDOJCEin003AVic06Pt+n4OPAOsd3C+FehGV0y/C+gogd5SObq5PZQJ+NXDK4eaAtkJ5i3GgBahx8D0p1ICDzwGrHNwrhRpLRICxujqY++yaB1odvg446PA/gI44ueM6cBaocvB1KdQ7B18ClrhuSKEmExFgrK4N9vzs+gmcd/jtwE6Hfw/ciNvXOA50AeUO7pBCTQTF/Txj2SqFmk9EgLF6G7A3Z0vtdfB+IOXgASnU3WJGu5ADX4BHDm6TQs0G4pYDF3LHstidNVKAFGpECrUD2Af0+75/y6GPAWsd3CeFGixWQEnnAWP1GmAEWBGEZoA6KdSnsHuSPhE1O8UBeqKKl9QCY/WyiNZcBXYDH4HvQGepp5rQFgwNm57A2nYp1J8QkZVAvRTqZaFCpbTgV7DdvjVWN4U4MR2neKlT8C34XQf0G6sfB3t+oitKwHgObgSssbrLWL1yMQRM5IlNAWlg6YJ/GwZPt/sC6gnGbTLJFpQVeAYmgpfNNSnU70X9Oga+AhsWqnB2/QVgL+ZN0utiqwAAAABJRU5ErkJggg==' },
        ignore_off: { filename: 'ignore_off', identifier: '.ignore.ignore_icon.icon img', replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQApZ5LMCAAAA9hJREFUWMO1112IVVUUB/DfjFJ+NJopSJEGkmDUHOYcKrIP0RRFoQ80KHqYoOxTqB4ygojqISiohwSxEikzJyLCkNKHQFA0+qBzx2svFUGmDOkgpZaF4dxe1pHD5dw7d2hcsNnn7L32Xv+19n9/rK5Go6GQrq4unUitns/FejyOBjbhlTTJjrUbV7Z13uZYANTq+Ww8g37MQncAaOA3fIh30iT7cVwAHPx+sGtkZGQm7sIDuAkTovsY3kcXHsSMaP8bg9G3sxyVjgDU6vkK3I0+LEBPeCo8PYGt2JAm2ZGIzBw8gfswJ0A1cBbD+AE59uCrvt70VCWAwUO1NdiGyTEBjOAMvsObaZJ92maJenBnRCuJZTpvC+fwZF9v+lbROLFpjtW4GKfwJXZjR+HpaJIm2Wlsx/ZaPZ+CXizBjVFPx0K0BNATnu9Lk+wO/0PSJDuDr6Oo1fN9uLlZr7uZqBGqScZfLor5/2gHoCDHJRcAwJSo2wI43qQ8njK5REStOPBn1JPaMP1FXIWH0yQ7F20TsBmH0yR7ucXQYs6T7QCcadFeGNmIR6NpWq2e3x/fA1gTepdjXQGuiQMw1A7A0aintljDtPS/Brvie2l5A4Tu6RYRONKOA4Ol7Vi1x5djb6l5aZPxvVgeuuXozQhQDfzUDsDPcfJNqtXzeRUgTmIV9ldEaD9WhU6zLAoCnu7rTU+0BJAm2T9xdhchrpLLMLuifXb0VcmSqvWvigAcjHpFBRGvxgHMrxg3HwdCp1n6mpa4LYAdJTKVjV8bYZ5bav48SiFzsT90i3HTcU2s/xedANgVPJhWq+c3lNqHS+dEsfVWRxloOkuGS//LMDO2eEcAhoKpE/BSiR/HsTiIOoD+NMnOpkl2Nl5IA9G3OHQLWRsEPNjXm47OgTTJRrClIE+tns8q9R2N67S/fNDEdz8Whk4R/nm4JcK/pYqdE1uwdnN4PxXPRimMDbe4fs81hR6ejzmGsLNqXHeLyU7hjUD+UK2eLxjrzVOr59ejOKpfT5Ps944BhGzCL7gUG8ZofHqE/OLgxbutdLvbvGiO4bmIwu21en7PGDA8jevwLx6LiBprBKRJ9nHs8y68V6vnizrwfiWeit8P0iTb006/uwNv1sdDZSq2NZ0NVev+USzbN3hhtMlHBRBZzsq4qq/EQK2eJxXGl8Uh1hPPrrVpkg2NNn/HqVkY2Ior4q6/N02y3fFQ6cerkQf8ihVV6dl45Ia34bPw8i98gmmRjHTjUHj+7QVJTkuX0kbcGuQs0rBBrE6T7PAFy46b9vk6PBJPrdfwdiQjY0rP/wOKCGu6HBGxoQAAAABJRU5ErkJggg==' },
        favorite_off: { filename: 'favorite_off', identifier: '.favorite.icon img', replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQsXRQcIaAAAAxZJREFUWMPV10toXVUUBuDvpFEbRHxDLdaKVSlCdjhn4MxRFYoVFC21NT4oVYsTR2roQIvUB0EdONOADgRr2kGw6tBhHXTgOfVENNUqlmIRpPjAUijJPU5W4RJvEntuUvHChnv3XXutf/3rtXfWNI3/7efodJUdna6yfnQM9nO4aZr74+vHbXW0Rl/V5QDK+Fnkqei00TPQBwHbMBJr20VloKrLQUzjttj6HsN5KmYvFgOjYfw4fsLtsbfyDFR1eSmOYS2ewlV4Az9jY56KcyvNwC7cFCCm8EGwsD7+WzkGqrocCtqvx/Y8FVOx/wQmcBob8lScXSkGnsEazOCzrv0PA9iakFkeBiLb1+OWSLqXMYTNeSoOz5O9B4dwBnujMn7EicWqI6vqcjU29Fi3RqwH0cT6C6/kqXhrAcCv4lmsDucyzOFEMPTD/JVVdfkung4dHczGoTmcw5/4NTyazFPx6RKsjeIhrItcuQKXRbhXhUPnQz+RHZ2usqZpXsdYADiM/fgaM3kqTvczL6q6vA53YCMewV0BYDzLsj1Zl+BzGA/PX8O+PBVzyzE1q7pchZewJxh4IU/Fm/9Iwqoud+GdiPckdvYLIoy/jx3h+e48Fe/1LMP4Y3sA2IEDy0DAgWjTHTzcbXzBMqzq8u6Y8UM4lKfiwZbef4ItOIsH8lR8/q8aUQhuwu+4r6rLsRbG92IzfsOmXsYX7YR5Ko7g3pB5sgUBj8bZLaGrr1Y82wLA3HLMghQJebIFgFNxNvUDYDiy93gLAN/F2eF+bsUpqKx6dLfHsDWMTOGjPBW/dIl9iceXYmApACMB4EgYvhzPYzeuiTJucCfGqrqcwHieijP4InJnpNU4rupyXdx0ToWSnTEvro7QzWBfiL8YvR7+iLa7HzVuwM15Kk5eaA6MdI3h6ZgT10ZsR+MWPJmnYjLiPIpvcSXexlfn3y+LsTCwRPwHcGPcdI7NM9zp6hmdAJJCZiYurWtDR2oDYDhC9M1Chns0r04PRrLFKmGxJLwkBtLBC312hfxkVZcH49W0dcEk/K+f538DRJIHyXoxFg0AAAAASUVORK5CYII=' },
        like: { filename: 'like', identifier: '.like.icon img', replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQoXXBw5KQAAA0lJREFUWMPl10uoVlUUwPHfUTPz3aC0UoQoMy73cPepnCQYRNAgadLTW8LlRplkAwdBUFJGGTQJUijQCiGzSU/KQXGprKBB59ixB2QNtCwJzIsvUPB+TZbx+d3vPnx8OGhP9hnsvdZ/rbXX42SNRsOFXBNc4HXBASZBlmUjHqjqchbmYTDlxb6xBFZ1OSPOH8uybG9PdxoW4+awZ41GYxjAzl1V1mg07sIaLMapA/uxCS+lvDjcongp1mJpk2cP4C28mPJi/7gAqrqciS1YhpM4jIOYjkvDa7txR8qLX+POOjyFBo7EnYswK/ZBPJDyYjv0dCdVXQ5/A1VdXoJPQvlBPI6FKS+uwQLcjj1YiIGqLudUdbk2lB/HRnSlvJgX52/Ft5iND6u6XNYajtM8UNXlBqzCH1iS8mJvmxjPxje4Dt8jxwmsTHmxZYR38SoewlF09/X27x3mgaouu/BoWLK8nXJIeTGI2/AZFmEf+kdSHuuxgJ2BF9p6oKrL14LynSzLetu93harpqMHx1JelOPIjgJfxxua39Od9v8HsHNXleHPiNXilBe7OpHzVV3+gOvxSE932tQcgnmYg0OdUh7rOwzhhtZKeFXshzpc+PZEas9tBZgU+8kOAxxtbQGnPv6OfWpVl53sD3NC5z+tAL/hWFS6+R0EuCl0/ngaQMqLk9iBi3FvhzLgCnRFXxlo1463YSL6qrqc1gGGB6Of7O7r7S/bAbwd3e5q3HeerZ+G1WHgy20HkpQXJ/BMZMTzVV3OPU/KJ2A9rowu+vpoE9FmfIXL8EFVl1POA0MvHo5WvTIMbQ+Q8mIIKyJNbgygc7F+CTZgcgwln4/ajlsufhrheAOrU14cP0PlN+Pj6IDv4Z4wcOyRLAQsi8yYjO24ezwQVV1ODJevx0x8FHdPjHsmbBJ2C96NLvlzCPppDOWbcX94bxv6WuM+boAQugjv49qY9TZifcqLIy3nErbGuNbAuizLnjurqXiE4WNDFJMh/IJVKS++iHR9FssxFX9hRcqLgZHknTFAE8ideCXmh+P4HZdHhcvwJp5IeXFgNDlnDdD04/F0VLYpTYPGmpQXX45HxjkBNIEswJPYkWXZ1rFmyFEB/tc/p/8CadxeyIwnmc8AAAAASUVORK5CYII=' },
        message: { filename: 'message', identifier: '.conversation.icon img', replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQsBsdO9OQAAAbNJREFUWMPt1z1PFFEUxvHf+FapjS9ROomNzSQz0mzQGuwECrXBhFD4JfwS1kSjDdrRCfWSWKAzOBQ0ijYaE4mFWmkxNkezIawssyRb7N5qMpO5z3P+99xz7k3qujbIccyAx8jAyMCJza2yHm4CHc9fcR4fMJOledXtp7quJUnSs0hZFdfxsnN+vN1LYDY+jmOjrIqJo4iwrIobIX4Bu7jfGdw/A1mar4ezXziJ5bIqWn2Kp3iKc0H4VujsnwPhbBLvg8RKRNBEfAIbuIKPmM3S/M2BSZil+WvMB66LeF5Wxc1DirewjFP4HTm13vMuyNL8FebwCZfxuNflCGIrQfAdJv+X0F23YTi+hx1cxepBJkL8RZDbxXwQbVYHsjRvx3J8xxksdTMR75/gEj5jLkj2V4hikmls4xrWNrfK1j7ia0FqB3e7rXmjShgmFvEzSDz7m5ghvoTT+BHY20deisPEVCTWeOyOB1gNMtuY6gV7414Qky/gC8bwCGcj8sXDijdqRoH3Dr7heBCZbiLeuBtGgt3GQyw0Fd/bDZuQaOtzjI5kAzeQlFUx3GfCZHQ3HHoDfwAavJ54vwr+6wAAAABJRU5ErkJggg==' },
        wink_off: { filename: 'wink_off', identifier: '.wink.icon img', replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFQohk6assAAABEpJREFUWMPFl1tsFUUYx3/nFI4EjBWLKVqLAWMk6o47Izx4iYBiJOIFQrQxRiigxMQHBW0kpCYlRrSpCSagERoUNdxDCODtyQjRiFF2TvaExhQvD0QKIhZoaUuLZ335Fieb057Ti7Ivk52d2e8//+/2n1QURVzOZxRAKpUqutCGQRXwNFAD3AhcKfvTwN9AF3AU2Als08oc6+9f7qFTURQNCMCGwTSgAZgJjC3xYL3A50C9VqZlSABsGFQCq4BngHKZPgt8B+wFvgHagAioAu4F5gAznPWngHeAd7UyHSUDsGFQIVTOkKlWYC2wVStzvoirxgnoOnEVwFdArVbmeFEANgymAAfkVN3Ae0CjVubPwQSXxMxrwCLgCuAn4B6tTHu/AGwYTAC2ArOBi8ALWpnm4US5DYPFwEagDPgUWOR7uj3+nk6sfxW4H+gAnhyucXk+Enf0Ag8Dy92PlxiwYaDEV1dL0Lw4kvluw6AZWAycBmb5nm5JMvAWcA3wK7DmP6g5DcAxYIJk178MZHO2WiI9AyzVymxOoF8AvCFBudz39NelFK8CLLwCNALngSrf0x2j5NtzEqlngO2JTeMlMDMytSubs5VAvoCBZF0/oJWZ6bxvBFZLFV0AbI5d8IiMB7UyPYmfVDjGETdlhuIDrcw54JC81l7qBcBkGXcX2PSzDYO9wOMytc73dE8/Bkrxy35gFnCLCyCu8YcL7Uin0/Pz+fzdQLfv6WCYwRjbKHcBxOPxQjvuuN2PgG9HKBuOyJhxDcfUlbkrfU+PiMVszrqvebcIxkF4Qbpa9f+gQW6Vsc9loEsouRPIxis/3LKpSeYOa2XqSsjz0cA4Sek1wBTge63MSmdZ3GHbXQZ+ETfMS/zzN+A+YIkNg+tKSLM+rcwZAbBQjCWDdo4bCzGAXeKC6TYMrnIW7wD+AsYD66XXF2OhHGiWeDrle3pnQitMk9ftLoDdQKfU6RrnRKeBJgmcecCGIsar5TCzpWyvSCx5CRgjLt+R7Ib7gLkiHB6M1YsNgwywHlgqgNuAD4CPtTKt8n2qqKAaETJ5oMn39KpY9Aq4Q8BEYJPv6WXJbrhaWuVUt1tpZXq1MsukifQBlcBKoMWGQafoxED6/PXACTnp64nTN4rxP6TzFlREjcDLoobqtTJvJyieLLTOBW5wDtAnzOwBNmhlWmPtl83ZMuB50ZRpoM739Nr+AFQIvY+K1q/VymwZQHxOFLpPamW6CsnvbM42APWSZZ8BT/ievjCQKB0L/CjN4iLwibBxYpC9f5LUghrJiB+Ax7QyJ0uR5ZMklR4Q5G1C4TqtTG8RwxXAEuBZ4CaZ3gMs1Mp0D+ZiMkb8vUI0AEAPcBD4UprTUWA0cBtwF/AQMF1SLQJ+B94XjXluqFezm0XfP+U0qyjRxJJKqEMk+JtamSPDuhs6QK6Vy+l8oTZWSpEUnbNAi7juC61MZ8mX08v5/AM7mbBooQ5tRwAAAABJRU5ErkJggg==' },
        report: { filename: 'report', identifier: '.report.feedback img', replacement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH3wEZFiEAq/n/3gAAAuNJREFUWMPFVz9oE1EY/33vjvQiUpSCgUpLjWkCWloudxahpW7dunSqnVzETRfRpYtglyySoZODm0O2Lt21ENJeLqUlCmLRYqFVQbQgJj3C+1xe4BqT5i5tzJuS79/vd7/ve3fvETOjl0ugx4s6TSyVSoNSykUAEEK8TqfTB/+NwObm5pAQogBgUJkOpJS3Jycn97veglwupwkhVn3gADAohFjN5XJa1wnE4/EHAMwmLlP5uteCnZ2dy57nfQQw0CLkRyQSGR0fH//ZFQU8z3t2CjgADKiY81egVCrdkFJuA9DbhNaEEBPpdPr9uSogpXzRBPwbgK8NNl3Fnl8LXNedAzDbYH5sGMYwgGEADxt8syrn7C0ol8uRarX6DkDCZ963LGuEiCQAMLNwXfezIlNfu4Zh3BwbG/POpMDx8fGjBnAAKNbBAUD9dhtiEiq38xYUCoUYMy81cY02sV1vNDDzUqFQiHVMQNf1ZQD9TVwJZhY+IGpBql/VCD8DxWIxDcBpRVLTtGumae75vg1fWm0gALds2y6FVSB7ml9KmfIplWyjcjZUCxzHWQAwfZp0zJzykUm2mbVpVbM9gXw+HyWiTIAtnPKRSbbd70SZfD4fbUugr6/vCYChdgX9ChBRMgDhIVW79RCqYfoAIBqg4HcieqrIPAdwNUBORUqZ8h9c9IbJzjBzEHAAuMLMr0J+/qOapmUA3P2nBY7jTDHzQohia0Q0Q0QzANaCJjHzguM4UycIMLMgomwI8N8AFi3LWrcsax3AorIFOwMQZesvMqFeOvcAWCGeYsO27aP6f9u2j5h5I8QDWAoTVC6XL1ar1V0AsRAFalLKeH2Y1PB+CnBYOXGWMAwjoVcqlXkiioUcJl0I8dZ13ZdKkfshwQEgVqlU5nUimkNna4SZl890KyKaEwAOe3gzOxTMvAJgrwfge8y8QgCwtbV1qVar3SGiCQAXugz8h5m3dV1/Y5rmL+r19fwvlWwc/MiYpz4AAAAASUVORK5CYII=' }
    };

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
        var keys = Object.keys(nightmode_img),
            i, img;
        if (_this.opts.nightMode) {
            $ic('html').addClass('night');
            // replace all img with the white base64 version
            for (i = 0; i < keys.length; i++) {
                img = nightmode_img[keys[i]];
                replaceImg(img);
            }
        } else if (!_this.opts.nightMode && $ic('html').hasClass('night')) {
            $ic('html').removeClass('night');
            for (i = 0; i < keys.length; i++) {
                img = nightmode_img[keys[i]];
                replaceImg(img, true);
            }
        }
    }

    flipNightMode();

    // Regex to determine whether a link contains a member link
    //var memLinkRegEx = /(http|https):\/\/www\.theinnercircle\.co\/member\/\d+/;
    var ev;

    function open_new() {
        $ic(this).target = '_blank';
        if ($ic(this).prop('href')) {
            win.open($ic(this).prop('href'));
        } else if ($ic(this).prop('src')) {
            win.open($ic(this).prop('src'));
        }
        return false;
    }

    function switchOpenInNew() {
        if (_this.opts.openInNew) {
            $body.on('click', '.online_box a, .featured_box a, .interest_box a, a.username, .birthdays_box a', open_new);
            $body.on('click', '.activity_widget a.activity_pic, .activity_widget .activity_description a:first-child', open_new);
        } else {
            $body.off('click', '.online_box a, .featured_box a, .interest_box a, a.username, .birthdays_box a', open_new);
            $body.off('click', '.activity_widget a.activity_pic, .activity_widget .activity_description a:first-child', open_new);
        }
    }

    switchOpenInNew();

    function switchHideElements() {

        if (_this.opts.hideEmptyMatches && $ic('.potential_match').find('.match').length === 1 && $ic('.potential_match').find('.match').first().hasClass('match-last')) {
            console.log('[IC Enhancement Suite] :: No matches, hiding box');
            $ic('.potential_match').hide();
        } else {
            $ic('.potential_match').show();
        }

        $ic('.nearby-block.question').css('display', (_this.opts.hideQuestionBlock ? 'none' : 'block'));
        /*$ic('.widget.tutorial-welcome').css('display', (_this.opts.hideWelcomeForm ? 'none' : 'block'));*/
        $ic('.widget.invite-form').css('display', (_this.opts.hideInviteForm ? 'none' : 'block'));
    }

    switchHideElements();

    // Open fancybox images originals
    $body.on('click','.fancybox-image', open_new);

    // Add 'Search with google' link to popup images
    $body.on('mouseover', '.fancybox-image', function(event) {
        ev = event;
        var imgRegExp = /^.*\/(\d+)_(\d+)\..*/;
        if ($ic(this).attr('src') && $ic(this).parent().find('.google-link').length === 0) {
            var href = $ic(this).attr('src');
            if (href.match(imgRegExp)) {
              var epochNum = href.split(imgRegExp)[1];
              var uploadDate = new Date(epochNum * 1000);
              var $date = $ic('<span class="upload-date">Uploaded at: ' + uploadDate.toLocaleString() + '</span>');
              $ic(this).parent().append($date);
            }
            var $link = $ic('<a class="google-link" href="http://www.google.com/searchbyimage?image_url=' + encodeURIComponent(href) +'" target="_blank">Search with google</a>');
            $ic(this).parent().append($link);
        }
    });

    // Enhance Dialog (Options screen)
    $ic('.header .grid_12 > nav > ul').find('li.has-underline').last().after('<li class="has-underline"><a href="#" class="ic_enhance_suite navigation-icon navigation_tip"><img src="data:image/png;base64,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" /></a></li>');

    var $enhDialog = $ic('<div id="enhancedialog" title="Enhancements" class="dialog tabs-dialog" />');
    function createEnhanceDialog() {
        var dialogContent = '<div class="enhtabs"><ul><li><a href="#enhance_tabs">Enhancements</a></li><li><a href="#enhance_credits">Credits</a></li></ul>\n';
        dialogContent += '<div id="enhance_tabs" class="enhance_tab">\n';
        for (var i = 0; i < _this.optionLabels.length; i++) {
            var opt = _this.optionLabels[i];
            if (opt.enabled) {
                dialogContent += '    <input type="checkbox" class="option_check" data-option="' + opt.optionKey + '" id="' + opt.identifier + '" name="' + opt.identifier + '" ' + (_this.opts[opt.optionKey] ? 'checked="checked"' : '') + '>\n';
                dialogContent += '    <label for="' + opt.identifier + '" class="optional">' + opt.label + '</label>\n';
                dialogContent += '    <div class="clear"></div>\n';
            }
        }
        // SUBMIT
        dialogContent += '    <dt></dt>\n';
        dialogContent += '    <a href="#" id="saveAndReloadOptions" class="button">Close</a>\n';
        dialogContent += '</div>\n';
        dialogContent += '<div id="enhance_credits" class="enhance_tab">\n';
        dialogContent += '<p>Created by <a href="http://jeltelagendijk.nl" target="_blank">Jelte Lagendijk</a></p><p><strong>Disclaimer:</strong> InnerCircle Enhancement Suite is Not Affiliated with The Inner Circle or Circle Imperium B.V. (company behind The Inner Circle) in any way.</p></div>'
        dialogContent += '</div>';
        $enhDialog.html(dialogContent);
    }

    $body.append($enhDialog);
    $enhDialog.dialog({
        closeOnEscape: true,
        modal: true,
        autoOpen: false,
        width: 400,
        open: function () {
          $ic('#enhancedialog .enhtabs').tabs();
        }
    });

    $ic('a.ic_enhance_suite').on('click', function (e){
        e.preventDefault();
        createEnhanceDialog();
        $enhDialog.dialog('open');
    });

    function saveForm() {
        _this.opts = {};
        $ic('.option_check').each(function () {
            var key = $ic(this).data('option');
            _this.opts[key] = $ic(this).is(':checked');
        });
        _this.saveSettings();
    }

    $body.on('click', '.option_check',function (){
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


    var graphRexExp = /(http|https):\/\/graph.facebook.com\/(\d+)\/.*/;
    var addGraphLink = function() {
        var $img = $ic(this);
        var match = $img.prop('src').match(graphRexExp);
        if (match) {
            var $div = $img.parent().find('div').first();
            $img.parent().append('<span class="count fb_flair">FB</span>');
            var txt = $div.text();
            $div.html('<a class="fb" href="https://www.facebook.com/profile.php?id=' + match[2] + '" target="_blank">' + txt + '</a>');
        }
    };

    // Add Facebook links (connected)
    var $connected = $ic('#connected');
    if ($connected) {
        // Find elements
        $connected.find('.path_user img').each(addGraphLink);
    }

    // Add Facebook links (mutual)
    var $mutual = $ic('.mutual_box');
    if ($mutual) {
        $mutual.find('td img').each(addGraphLink);
    }

    // Improve search by removing city selection
    $ic('.search-widget').append('<input type="hidden" name="city_id" id="city_id" value="0">');
    $ic('.search-widget').append('<input type="hidden" name="search" id="search" value="Search">');

    // Hide canvas on wrapper click
    $body.on('click', '.wrapper > .container_16',function (){
        if ($body.hasClass('canvas-open')) {
            $body.removeClass('canvas-open');
        }
    });

    var addAgeFlairs = function(box) {
      var $box = $ic(box);
      var titleRegExp = /^.*.\((\d+)\)/;
      $box.find('a').each(function () {
        var $link = $ic(this);
        var age = '?';
        if ($link.find('.count').length === 0 && $link.attr('title') && $link.attr('title').match(titleRegExp)) {
          age = parseInt($link.attr('title').split(titleRegExp)[1], 10);
          $link.append('<span class="count age_count">' + age + '</span>');
        }
      });
    };

    addAgeFlairs('.birthdays_box');
    addAgeFlairs('.online_box');

    // Socket magic for adding age flairs
    if (socket) {
      socket.on('activity', function(data) {
        if (data.type && data.type === 'online') {
          addAgeFlairs('.online_box');
        }
      });
    }

    // DEBUG
    win.console.log('[IC Enhancement Suite] :: Succesfully loaded Suite');

};

////////////////////////////////////////////////////////////////////////////////

innerCircleEnhancementSuite = new ICES();

innerCircleEnhancementSuite.loadSettings();
innerCircleEnhancementSuite.appendCSS();

//console.log ("==> Script start.", new Date() );

// 1ST PART OF SCRIPT RUN GOES HERE.
//console.log ("==> 1st part of script run.", new Date() );

document.addEventListener ('DOMContentLoaded', DOM_ContentReady);
//window.addEventListener ("load", pageFullyLoaded);

function DOM_ContentReady () {
    innerCircleEnhancementSuite.setup();
}

//function pageFullyLoaded () {
//    console.log ("==> Page is fully loaded, including images.", new Date() );
//}

//console.log ("==> Script end.", new Date() );
