# vue-pagination
Vue pagination component for use with Bootstrap and Laravel pagination.

* [Vue.js](http://vuejs.org/) (tested with 1.0.16).
* [Bootstrap CSS](http://getbootstrap.com/) (tested with 3.3.6)

Laravel is not required as long as the pagination object contains the required attributes
* current_page,
* last_page,
* per_page,
* to

### Installation

#### NPM

```bash
$ npm install vue-bootstrap-pagination
```

#### Bower

```bash
$ bower install vue-bootstrap-pagination
```

### Example
```js
new Vue({
  el: '#app',
  data: function () {
    return {
      items: [],
      pagination: {
        total: 0, per_page: 12,
        from: 1, to: 0,
        current_page: 1
      }
    }
  },
  methods: {
    loadData: function () {
      var data = {
        paginate: this.pagination.per_page,
        page: this.pagination.current_page,
        /* additional parameters */
      };
      this.$http.get('/getData', data).then(function (response) {
        this.$set('items', response.data.data);
        this.$set('pagination', response.data.pagination);
      }, function(error) {
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

  <pagination :pagination="pagination" :callback="loadData" :offset="3"></pagination>
</body>
```

#### Options
| Name          | Type     | Default | Required | Description
| :------------ | :--------| :-------| :--------| :-----------
| pagination    | Object   |         | true     | Pagination object used to create pagination
| callback      | Function |         | true     | Callback function used to load data for selected page
| offset        | Number   | 4       |          | Left and right offset of pagination numbers to display
