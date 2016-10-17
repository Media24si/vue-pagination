# vue-pagination
Vue pagination component for use with Bootstrap and Laravel pagination.

* [Vue.js](http://vuejs.org/) (tested with 2.0.1).
* [Bootstrap CSS](http://getbootstrap.com/) (tested with 3.3.7)

To use with Vue.js 1 use the 1x version.

Laravel is not required as long as the pagination object contains the required attributes
* current_page,
* last_page,
* per_page,

### Installation

```bash
$ npm install vue-bootstrap-pagination
```

### Example
```js
new Vue({
  el: '#app',
  data () {
    return {
      items: [],
      pagination: {
        total: 0,
        per_page: 12,    // required
        current_page: 1, // required
        last_page: 0,    // required
        from: 1,
        to: 12           // required
      },
      paginationOptions: {
		offset: 4,
        previousText: 'Prev',
        nextText: 'Next',
        alwaysShowPrevNext: true
      }
    }
  },
  methods: {
    loadData () {
      let options = {
        params: {
          paginate: this.pagination.per_page,
          page: this.pagination.current_page,
          /* additional parameters */
        }
      };
      this.$http.get('/getData', options).then(response => {
        this.items = response.data.data;
        
        // Overwrite pagination object
        this.pagination = response.data.pagination; // API response edited to have pagination data under pagination object
        
        // Or overwrite only values
        /*
          this.pagination.current_page = response.data.current_page;
          this.pagination.last_page = response.data.last_page;
          ...
        */
      }, error => {
        // handle error
      });
    }
  },
  components: {
    pagination: require('vue-bootstrap-pagination')
  }
})
```

```html
<body id="app">
  <ul class="list-group">
    <li class="list-group-item" v-for="item in items">{{ item.name }}</li>
  </ul>

  <pagination :pagination="pagination" :callback="loadData" :options="paginationOptions"></pagination>
</body>
```

#### Props
| Name          | Type     | Default | Required | Description
| :------------ | :--------| :-------| :--------| :-----------
| pagination    | Object   |         | true     | Pagination object used to create pagination
| callback      | Function |         | true     | Callback function used to load data for selected page
| options       | Object   |         |          | Configuration. Look below for available options
| size          | String   |         |          | Change the default size of the pagination. Options: large, small.

Offset prop has ben removed with version 2.10.0. Use `options.offset` instead

##### Options
| Name                | String  | Default     | Description
| :-------------------| :-------| :-----------| :-------
| offset              | Number  | 3           | Left and right offset of pagination numbers to display
| ariaPrevious        | String  | Previous    | Change default aria previous text
| ariaNext            | String  | Next        | Change default aria next text
| previousText        | String  | «           | Change default previous button text
| nextText            | String  | »           | Change default next button text
| alwaysShowPrevNext  | Boolean | false       | Show prev/next button even if on first/last page

If you change `this.pagination.per_page` the callback function will be called
