require(['vue', 'axios', 'base'],
    function (Vue, axios, base) {
        var vm = new Vue({
            el: '#app',
            data: {
                loading: true,
                list: [],
                code: 0
            },
            created: function () {

            },
            mounted: function () {
                this.listData();
            },
            methods: {
                listData: function () {
                    var _this = this;
                    axios({
                        method: 'get',
                        url: '/mock/index.json',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function (response) {
                        if (response.status == 200) {
                            _this.list = response.data;
                            _this.loading = false;
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                },
                // 切换
                select: function (json) {
                    this.code = json.code;
                }
            },
            watch: {
                code: function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        this.listData();
                    }
                }
            }
        });
    });
