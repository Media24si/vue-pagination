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
        array: function () {
            if(!this.pagination.to) {
                return [];
            }

            var from = this.pagination.current_page - this.offset;
            if(from < 1) {
                from = 1;
            }

            var to = from + (this.offset * 2);
            if(to >= this.pagination.last_page) {
                to = this.pagination.last_page;
            }

            var arr = [];
            while (from <=to) {
                arr.push(from);
                from++;
            }

            return arr;
        }
    },
    watch: {
        'pagination.per_page': function () {
            this.callback();
        }
    },
    methods: {
        changePage: function (page) {
            this.$set('pagination.current_page', page);
            this.callback();
        }
    }
};
