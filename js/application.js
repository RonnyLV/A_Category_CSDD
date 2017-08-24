$(document).ready(function () {
    var i, j, k;
    $.getJSON("http://you.madeit.lv/data/exams.json", function (data) {
        $.each(data, function (i, dept) {
            if ($('body').data('department') == dept.name) {
                $.each(dept.categories, function (j, category) {
                    if ($('body').data('category') == category.name) {
                        var $lastUpdatedEl = $('#last-updated');
                        var $examsEl = $('#exams');
                        if (typeof category.lastUpdated !== 'undefined') {
                            var tbl_body = $examsEl.find("tbody");
                            $.each(category.exams, function (rowNumber) {
                                var _exam = this;
                                var tbl_row = $('<tr>');
                                tbl_row.append($('<th scope="row"></th>').text(Number(rowNumber) + 1));
                                tbl_row.append($('<td>').text(_exam.date.toString()));
                                tbl_row.append($('<td>').text(_exam.freePositions.toString()));
                                tbl_body.append(tbl_row);
                            });
                            $lastUpdatedEl.text(new Date(category.lastUpdated * 1000).toLocaleString("LV"));
                            $lastUpdatedEl.attr("datetime", new Date(category.lastUpdated * 1000).toISOString());
                        } else {
                            $lastUpdatedEl.text("Gaidām nākamo sezonu!");
                            $examsEl.append("Sezona noslēgusies");
                        }
                    }
                });
            }
        });
    });
});