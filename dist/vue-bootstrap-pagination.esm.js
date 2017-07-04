var VueBootstrapPagination$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',[(_vm.pagination.last_page > 0)?_c('ul',{staticClass:"pagination",class:_vm.sizeClass},[(_vm.showPrevious())?_c('li',{class:{ 'disabled' : _vm.pagination.current_page <= 1 }},[(_vm.pagination.current_page <= 1)?_c('span',[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v(_vm._s(_vm.config.previousText))])]):_vm._e(),(_vm.pagination.current_page > 1 )?_c('a',{attrs:{"href":"#","aria-label":_vm.config.ariaPrevioius},on:{"click":function($event){$event.preventDefault();_vm.changePage(_vm.pagination.current_page - 1);}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v(_vm._s(_vm.config.previousText))])]):_vm._e()]):_vm._e(),_vm._l((_vm.array),function(num){return _c('li',{class:{ 'active' : num === _vm.pagination.current_page }},[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();_vm.changePage(num);}}},[_vm._v(_vm._s(num))])])}),(_vm.showNext())?_c('li',{class:{ 'disabled' : _vm.pagination.current_page === _vm.pagination.last_page || _vm.pagination.last_page === 0 }},[(_vm.pagination.current_page === _vm.pagination.last_page || _vm.pagination.last_page === 0)?_c('span',[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v(_vm._s(_vm.config.nextText))])]):_vm._e(),(_vm.pagination.current_page < _vm.pagination.last_page)?_c('a',{attrs:{"href":"#","aria-label":_vm.config.ariaNext},on:{"click":function($event){$event.preventDefault();_vm.changePage(_vm.pagination.current_page + 1);}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v(_vm._s(_vm.config.nextText))])]):_vm._e()]):_vm._e()],2):_vm._e()])},staticRenderFns: [],
  name: 'pagination',
  props: {
    pagination: {
      type: Object,
      required: true,
    },
    callback: {
      type: Function,
      required: true,
    },
    options: {
      type: Object,
    },
    size: {
      type: String,
    },
  },
  computed: {
    array: function array() {
      if (this.pagination.last_page <= 0) {
        return [];
      }
      var from = this.pagination.current_page - this.config.offset;
      if (from < 1) {
        from = 1;
      }
      var to = from + (this.config.offset * 2);
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      var arr = [];
      while (from <= to) {
        arr.push(from);
        from += 1;
      }
      return arr;
    },
    config: function config() {
      return Object.assign({
        offset: 3,
        ariaPrevious: 'Previous',
        ariaNext: 'Next',
        previousText: '«',
        nextText: '»',
        alwaysShowPrevNext: false,
      }, this.options);
    },
    sizeClass: function sizeClass() {
      if (this.size === 'large') {
        return 'pagination-lg';
      } else if (this.size === 'small') {
        return 'pagination-sm';
      }
      return '';
    },
  },
  watch: {
    'pagination.per_page': function pagination_per_page(newVal, oldVal) { // eslint-disable-line
      if (+newVal !== +oldVal) {
        this.callback();
      }
    },
  },
  methods: {
    showPrevious: function showPrevious() {
      return this.config.alwaysShowPrevNext || this.pagination.current_page > 1;
    },
    showNext: function showNext() {
      return this.config.alwaysShowPrevNext ||
          this.pagination.current_page < this.pagination.last_page;
    },
    changePage: function changePage(page) {
      if (this.pagination.current_page === page) {
        return;
      }
      this.$set(this.pagination, 'current_page', page);
      this.callback();
    },
  },
};

export default VueBootstrapPagination$1;
