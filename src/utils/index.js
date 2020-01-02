/**
 * Created by kevin on May 7, 2019.
 */

var publicCode = function(){
    var obj = {};
    obj.publicCssCode = '/*=========================================全局共用属性CSS nie ===============================================*/ a, abbr, acronym, address, big, blockquote, body, caption, cite, code, dd, dl, dt, fieldset, form, h1, time, h2, h3, h4, h5, h6, html, img, ins, kbd, label, legend, li, ol, p, pre, q, s, samp, small, span, strike, strong, ul { border: 0; outline: 0; } html { -webkit-overflow-scrolling: touch; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } body { font-family: Arial, "Open Sans", sans-serif, "Heiti SC", "Helvetica", "HelveticaNeue", "Droidsansfallback", "Droid Sans"; font-size: 16px; line-height: 32px; text-align: left; background: #fff; font-style: normal; font-weight: 100; color: #5a5b5c; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; margin: 0; padding: 0; min-height: 100vh; } article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; } a:link, a:active, a:visited, a:hover { -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-tap-highlight-color: transparent; outline: none; } /*解决在移动端上，事件监听的元素被点击的时候会被高亮显示*/ button { border-radius: 0px; -webkit-border-radius: 0px; outline: none; } input { border-radius: 0; -webkit-appearance: none; -webkit-border-radius: 0px; } /*input在ios上圆角*/ input, select { border-radius: 0; outline: none; } input[type="checkbox"] { -webkit-appearance: checkbox; } input:-ms-clear { display: none; } /*消除 IE10 里面的那个叉号*/ input, textarea { border: 0; -webkit-appearance: none; } textarea { resize: none; outline: none; } /*去掉提交框右下角箭头*/ img { border: 0; vertical-align: middle; max-width: 100% !important; height: auto !important; } td { padding: 8px 5px; } ul, li { list-style: none; } * { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; -webkit-touch-callout: none; margin: 0; padding: 0; } *:after, *:before { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; -webkit-touch-callout: none; margin: 0; padding: 0; } button { cursor: pointer; } /*这个可以不用*/ h1, h2, h3, h4, h5, h6 { font-weight: 700; font-variant: normal; white-space: normal; } /*全局的字体链接*/ a:link, a:visited { color: #42474e; text-decoration: none; } a:hover, a:active { color: rgb(212, 42, 42); text-decoration: none; } .clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; font-size: 0px; } .container { clear: both; width: 1440px; margin: 0 auto; padding: 0px; } .container-1280 { clear: both; width: 1280px; margin: 0 auto; padding: 0px; } /*1280分辨率屏幕*/ .container-960 { clear: both; width: 960px; margin: 0 auto; padding: 0px; } /*960分辨率屏幕*/ @media (max-width: 1600px) { body { line-height: 28px; } .container { width: 1280px; } } @media (max-width: 1440px) { body { line-height: 26px; font-size: 14px; } .container, .container-1280 { width: 1120px; } } @media (max-width: 1280px) { body { line-height: 24px; } .container, .container-1280 { width: 960px; } } @media screen and (max-width: 992px) { .container, .container-1280, .container-960 { width: 750px; } } @media screen and (max-width: 782px) { .container, .container-1280, .container-960 { width: 100%; } }';
    obj.fixedIframeData = {
        iframeHtmlCode1:'<div class="aside">',
        iframeHtmlCode2:'</div><div class="main">',
        iframeHtmlCode3:'</div>',
        iframeCssCode:'.aside{width:240px;position:fixed;left:0;top:0;height:100vh;z-index:999;background:#ccc;}.main{clear:both;margin:0 auto;padding:0px 0px 0px 240px;}@media (max-width:1600px){.aside{position:static;height:auto;width:100%;padding:0;}.main{clear:both;margin:0 auto;padding:0;}}',
    };
    return obj;
};
export {publicCode};
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time);
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value]; }
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;
}
  
/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000;
    } else {
        time = +time;
    }
    const d = new Date(time);
    const now = Date.now();
  
    const diff = (now - d) / 1000;
  
    if (diff < 30) {
        return '刚刚';
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
        return '1天前';
    }
    if (option) {
        return parseTime(time, option);
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        );
    }
}
  
/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    const search = url.substring(url.lastIndexOf('?') + 1);
    const obj = {};
    const reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}
  
/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
    // returns the byte length of an utf8 string
    let s = str.length;
    for (var i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) s++;
        else if (code > 0x7ff && code <= 0xffff) s += 2;
        if (code >= 0xDC00 && code <= 0xDFFF) i--;
    }
    return s;
}
  
/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}
  
/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
    if (!json) return '';
    return cleanArray(
        Object.keys(json).map(key => {
            if (json[key] === undefined) return '';
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
        })
    ).join('&');
}
  
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = url.split('?')[1];
    if (!search) {
        return {};
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, ' ') + '"}'
    );
}
  
/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
    const div = document.createElement('div');
    div.innerHTML = val;
    return div.textContent || div.innerText;
}
  
/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
    if (typeof target !== 'object') {
        target = {};
    }
    if (Array.isArray(source)) {
        return source.slice();
    }
    Object.keys(source).forEach(property => {
        const sourceProperty = source[property];
        if (typeof sourceProperty === 'object') {
            target[property] = objectMerge(target[property], sourceProperty);
        } else {
            target[property] = sourceProperty;
        }
    });
    return target;
}
  
/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
    if (!element || !className) {
        return;
    }
    let classString = element.className;
    const nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
        classString += '' + className;
    } else {
        classString =
        classString.substr(0, nameIndex) +
        classString.substr(nameIndex + className.length);
    }
    element.className = classString;
}
  
/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
    if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90;
    } else {
        return new Date(new Date().toDateString());
    }
}
  
/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;
  
    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;
    
        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };
    return function(...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
}
  
/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
    return Array.from(new Set(arr));
}
  
/**
 * @returns {string}
 */
export function createUniqueString() {
    const timestamp = +new Date() + '';
    const randomNum = parseInt((1 + Math.random()) * 65536) + '';
    return (+(randomNum + timestamp)).toString(32);
}
  
/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}
  
/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}
  