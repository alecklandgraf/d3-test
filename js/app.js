window.BE = window.BE || {};
BE.Plot = function() {
    var plot = {
        model: (function() {
            var plot_data = [];

            return {
                getAll: function() {
                    return plot_data;
                },
                update: function(data) {
                    plot_data = data.slice(0);
                }
            }
        })(),

        view: {
            render: function(id) {
                document.getElementById(id).innerHTML = plot.view.drawTable(plot.model.getAll());
            },
            drawTable: function(data) {
                html = '<table style="border: 1px;">' +
                    '<thead><tr><td>Building ID</td>' +
                    '<td>Floor area (sq ft)</td>' +
                    '<td>Year</td>' +
                    '<td>Energy consumption (kWh)</td></tr></thead><tbody>',
                end = '</tbody></table>';

                for (var row in data) {
                    html += '<tr>' +
                        '<td>' + data[row].id + '</td>' +
                        '<td>' + data[row]["floor_area"]  + '</td>' +
                        '<td>' + data[row].year + '</td>' +
                        '<td style="text-align: right;">' + data[row]["total_consumption"] + '</td>' +
                    '</tr>';
                }

                html += end;
                return html;
            }
        },

        init: function(settings) {
            plot.view.render(settings.el);
            if (settings.client) {
                // response_about.tell_me_about.buildings
                settings.client.listen_to("response_about.tell_me_about.buildings", function(message) {
                    if (message["data"]) {
                        plot.model.update(message["data"]["buildings"]);
                        plot.view.render(settings.el);
                    }
                });
            }
        }
    };
    return plot;
};