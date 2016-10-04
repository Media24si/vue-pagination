module.exports = {
    template: '<nav>' +
        '<ul class="pagination">' +
            '<li v-if="pagination.current_page > 1">' +
                '<a href="#" aria-label="Previous" @click.prevent="changePage(pagination.current_page - 1)">' +
                    '<span aria-hidden="true">&laquo;</span>' +
                '</a>' +
            '</li>' +
            '<li v-for="num in array" :class="{\'active\': num == pagination.current_page}">' +
                '<a href="#" @click.prevent="changePage(num)">{{ num }}</a>' +
            '</li>' +
            '<li v-if="pagination.current_page < pagination.last_page">' +
                '<a href="#" aria-label="Next" @click.prevent="changePage(pagination.current_page + 1)">' +
                    '<span aria-hidden="true">&raquo;</span>' +
                '</a>' +
            '</li>' +
        '</ul>' +
    '</nav>',
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
        array () {
            if (!this.pagination.to) {
                return [];
            }

            let from = this.pagination.current_page - this.offset;
            if (from < 1) {
                from = 1;
            }

            let to = from + (this.offset * 2);
            if (to >= this.pagination.last_page) {
                to = this.pagination.last_page;
            }

            let arr = [];
            while (from <=to) {
                arr.push(from);
                from++;
            }

            return arr;
        }
    },
    watch: {
        'pagination.per_page' () {
            this.callback();
        }
    },
    methods: {
        changePage (page) {
            this.$set(this.pagination, 'current_page', page)
            this.callback();
        }
    }
};
