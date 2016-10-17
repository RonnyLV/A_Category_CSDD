$(document).ready(function () {
    var i, j, k;
    $.getJSON("http://you.madeit.lv/data/exams.json", function (data) {
        $.each(data, function (i, dept) {
            if ($('body').data('department') == dept.name) {
                $.each(dept.categories, function (j, category) {
                    if ($('body').data('category') == category.name) {
                        if (typeof category.lastUpdated !== 'undefined') {
                            var tbl_body = $("<tbody>");
                            var odd_even = false;
                            $.each(category.exams, function (rowNumber) {
                                var tbl_row = $("<tr>");
                                var th_cell = $("<th scope=\"row\"></th>");
                                tbl_row.addClass(odd_even ? "odd" : "even");
                                var first_row = true;
                                $.each(this, function (k, v) {
                                    if (first_row) {
                                        th_cell.text(Number(rowNumber) + 1);
                                        $(tbl_row).append(th_cell);
                                        first_row = false;
                                    }
                                    var cell = $("<td>");
                                    cell.text(v.toString());
                                    tbl_row.append(cell);
                                });
                                tbl_body.append(tbl_row);
                                odd_even = !odd_even;
                            });
                            $("#last-updated").text(new Date(category.lastUpdated * 1000).toLocaleString("LV"));
                            $("#exams").append(tbl_body);
                        } else {
                            $("#last-updated").text("Gaidām nākamo sezonu!");
                            $("#exams").append("Sezona noslēgusies");
                        }
                    }
                });
            }
        });
    });
});