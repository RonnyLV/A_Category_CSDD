$(document).ready(function () {
    $.getJSON("exams.json", function (data) {
        var tbl_body = $("<tbody>");
        var odd_even = false;
        $.each(data.exams, function (rowNumber) {
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
        $("#exams").append(tbl_body);
        $("#last-updated").text(new Date(data.lastUpdated * 1000).toLocaleString("LV"));
    });
});