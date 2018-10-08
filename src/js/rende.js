($(function() {
    var bscroll = new BScroll(".wrap", {
        click: true
    })
    $.ajax({
        url: "./js/data.json",
        success: function(data) {
            var datas = []
            var newdata = {}
            for (var i in data.data) {
                var first = data.data[i].Spelling.slice(0, 1);
                if (!newdata[first]) {
                    newdata[first] = {
                        title: first,
                        list: []
                    }
                }
                newdata[first].list.push(data.data[i]);
            }
            for (var i in newdata) {
                datas.push(newdata[i]);
            }
            datas.sort(function(a, b) {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            })
            apply(datas);

            function apply(datas) {
                var html = "";
                datas.forEach(function(v) {
                    html += `<h2>${v.title}</h2><li><ol>`
                    v.list.forEach(function(file) {
                        html += `<li>${file.Name}</li>`;
                    })
                    html += `</ol></li>`;
                })
                $(".uls").append(html);

                var test = "";
                datas.forEach(function(file) {
                    test += `<li>${file.title}</li>`;
                })
                $(".right").append(test)
            }
        }
    })

    $(".right").on("click", "li", function() {
        var index = $(this).index();
        console.log(index);
        bscroll.scrollToElement($(".uls").find("h2").eq(index)[0]);
    })
}))