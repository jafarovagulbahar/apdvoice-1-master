/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Utility = {
    ConvertDate: function (dateArg) {
        var mom = $(this).data("DateTimePicker").date();
        if (mom) {
            var y = mom.year();
            var m = mom.month() + 1;
            m = m < 10 ? '0' + m : m;
            var d = mom.date();
            d = d < 10 ? '0' + d : d;
            v = y.toString() + m.toString() + d.toString();
            var k = $(this).attr("id");
            json.kv[k] = v;
        }
    },
    GetConvertedDate: function (elementId) {
        var date = new Date($('#' + elementId).val());
        if (!date) {
            return '';
        }
        var day = date.getDate();
        day = day.toString(10).length === 1 ? '0' + day : day;
        var month = date.getMonth() + 1;
        month = month.toString(10).length === 1 ? '0' + month : month;
        var year = date.getFullYear();
        var d = year + "" + month + '' + day;
        return d;
    },
    AJAXCallFeedback: function (data, elementId) {
        var d = data;

        if ((d.err.length) && d.err.length > 0) {
            //there are/is errors
            for (var i in d.err) {
                try {
                    if (d.err[i].code === 'general') {
                        Utility.Toaster.ShowError(d.err[i].val);
                        return;
                    } else {
                        $('#' + elementId).closest("div.main-form").
                                find("[id=" + d.err[i].code + "]").
                                after('<p class=\'apd-form-error-msg\'>' + d.err[i].val + '</p>');
                    }
                } catch (err) {
                }
            }
        }
    },
    Toaster: {
        ShowGeneralError: function () {
            this.showError("System Error Occured!");
        },
        ShowError: function (msg) {
            var id = makeId(10);
            var div = $('<div>')
                    .attr('id', id)
                    .addClass('toast ml-auto')
                    .addClass('toast-error')
                    .attr('role', 'alert')
                    .attr('data-delay', '700')
                    .attr('data-autohide', false)
                    .append($('<div>')
                            .addClass('toast-header')
                            .append($('<strong>')
                                    .addClass('mr-auto text-primary')
                                    .append('Error Message')
                                    )
                            .append($('<button>')
                                    .addClass('ml-2 mb-1 close')
                                    .attr('type', 'button')
                                    .attr('data-dismiss', 'toast')
                                    .attr('aria-label', 'Close"')
                                    .append($('<span>')
                                            .attr('aria-hidden', true)
                                            .append(('x')))

                                    )
                            )
                    .append($('<div>')
                            .addClass('toast-body')
                            .append(msg)
                            )
                    ;
            $('#body_of_toaster').prepend(div);
            // initialize and show Bootstrap 4 toast
            $('#' + id).toast('show');
            setTimeout(function () {
                $('#' + id).toast('hide');
            }, 3000);
        }
        ,
        ShowMessage: function (msg) {
            var id = makeId(10);
            var div = $('<div>')
                    .attr('id', id)
                    .addClass('toast ml-auto')
                    .addClass('toast-message')
                    .attr('role', 'alert')
                    .attr('data-delay', '700')
                    .attr('data-autohide', false)
                    .append($('<div>')
                            .addClass('toast-header')
                            .append($('<strong>')
                                    .addClass('mr-auto text-primary')
                                    .append('Message')
                                    )
                            .append($('<button>')
                                    .addClass('ml-2 mb-1 close')
                                    .attr('type', 'button')
                                    .attr('data-dismiss', 'toast')
                                    .attr('aria-label', 'Close"')
                                    .append($('<span>')
                                            .attr('aria-hidden', true)
                                            .append(('x')))

                                    )
                            )
                    .append($('<div>')
                            .addClass('toast-body')
                            .append(msg)
                            )
                    ;
            $('#body_of_toaster').prepend(div);
            // initialize and show Bootstrap 4 toast
            $('#' + id).toast('show');
            setTimeout(function () {
                $('#' + id).toast('hide');
            }, 3000);
        }
    }
}
