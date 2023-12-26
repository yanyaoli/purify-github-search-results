// ==UserScript==
// @name         Purify GitHub Search Results
// @namespace
// @version      1.0
// @description  This is a Tampermonkey script for filtering GitHub search results. You can specify users or repositories to block certain inappropriate display results, such as repositories from cirosantilli and wumaoland.
// @author       yanyaoli
// @match        https://github.com/search*
// @grant        none
// @namespace https://greasyfork.org/users/1080143
// @downloadURL https://update.greasyfork.org/scripts/483086/Purify%20GitHub%20Search%20Results.user.js
// @updateURL https://update.greasyfork.org/scripts/483086/Purify%20GitHub%20Search%20Results.meta.js
// ==/UserScript==

(function() {
    'use strict';

    var blockList = ['cirosantilli', 'wumaoland', 'codin-stuffs', 'cheezcharmer', 'Dimples1337', 'Dujltqzv', 'gege-circle', 'PCL/', 'zhaohmng-outlook-com', 'zaohmeing', 'Daravai1234', 'candice531033938', 'jk-ice-cream', 'sky8964', 'pxvr-official', 'zpc1314521', 'jjzhang166', 'panbinibn'];

    function addPrefix(blockList) {
        return blockList.map(function(blockedItem) {
            if (blockedItem.includes('/')) {
                return '-repo:' + blockedItem;
            } else {
                return '-user:' + blockedItem;
            }
        });
    }

    blockList = addPrefix(blockList);

    function updateSearchQuery() {
        var searchParams = new URLSearchParams(window.location.search);
        var q = searchParams.get('q') || '';

        var searchTerms = q.split(' ');

        var isBlockListInQuery = blockList.every(function(blockedItem) {
            return searchTerms.includes(blockedItem);
        });

        if (!isBlockListInQuery) {
            q += ' ' + blockList.join(' ');
            searchParams.set('q', q);
            window.location.search = searchParams.toString();
        }
    }

    if (window.location.href.includes('/search')) {
        updateSearchQuery();
    }

    var searchForm = document.querySelector('form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            updateSearchQuery();
            location.reload();
            event.preventDefault();
        });
    }
})();