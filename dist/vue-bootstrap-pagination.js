(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = '<nav>\n    <ul class="pagination">\n        <li v-if="pagination.current_page > 1">\n            <a href="#" aria-label="Previous" @click.prevent="changePage(pagination.current_page - 1)">\n                <span aria-hidden="true">&laquo;</span>\n            </a>\n        </li>\n        <li v-for="num in array" :class="{\'active\': num == pagination.current_page}">\n            <a href="#" @click.prevent="changePage(num)">{{ num }}</a>\n        </li>\n        <li v-if="pagination.current_page < pagination.last_page">\n            <a href="#" aria-label="Next" @click.prevent="changePage(pagination.current_page + 1)">\n                <span aria-hidden="true">&raquo;</span>\n            </a>\n        </li>\n    </ul>\n</nav>';
},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
    template: require('./pagination.html'),
    props: {
        pagination: {
            type: Object,
            required: true
        },
        callback: {
            type: Function,
            required: true
        },
        offset: {
            type: Number,
            default: 4
        }
    },
    computed: {
        array: function array() {
            if (!this.pagination.to) {
                return [];
            }

            var from = this.pagination.current_page - this.offset;
            if (from < 1) {
                from = 1;
            }

            var to = from + this.offset * 2;
            if (to >= this.pagination.last_page) {
                to = this.pagination.last_page;
            }

            var arr = [];
            while (from <= to) {
                arr.push(from);
                from++;
            }

            return arr;
        }
    },
    watch: {
        'pagination.per_page': function paginationPer_page() {
            this.callback();
        }
    },
    methods: {
        changePage: function changePage(page) {
            this.$set('pagination.current_page', page);
            this.callback();
        }
    }
};

},{"./pagination.html":1}]},{},[2]);
