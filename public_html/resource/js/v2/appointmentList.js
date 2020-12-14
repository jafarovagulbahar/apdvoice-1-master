//  AppointmentList Section

var pageRowCountAppointment=10;

$(document).on('change', '#appointmentListTable_length select', function(){
    pageRowCountAppointment=$(this).val()
    $('#appointmentListTable').DataTable().clear().destroy();
    $('#DoctorDataTableHeader').empty();
    $('#DoctorDataTable').empty();     
    GetAppointmentList(1, pageRowCountAppointment)
  
 });
$(document).on("page",'#pagination-appointment', function (event, num_a) {
   
    $('#appointmentListTable').DataTable().clear().destroy();
    $('#DoctorDataTableHeader').empty();
    $('#DoctorDataTable').empty();     
    GetAppointmentList(num_a, pageRowCountAppointment)
})

function appointmentListTableGen(currentPage, rowCount, pageRowCountAppointment) {

    $('#pagination-appointment').bootpag({
        total: Math.ceil(rowCount/pageRowCountAppointment),           
        page: currentPage,            
        maxVisible: 5,     
        leaps: true,
    })

    $('#appointmentListTable').DataTable({
        destroy:true,
        "dom": 'Bfrl',
        responsive: true,
        "pageLength": pageRowCountAppointment,   
        "paging": true,
        "autoWidth": true,
        "buttons": [
         
            {
                extend: 'colvis',
                text: function (dt, button, config) {
                    return dt.i18n('buttons.colvis', 'Column');
                }
            },

            {
                extend: 'copyHtml5',
                exportOptions: {
                    columns: "thead th:not(.noExport)",
                  

                }
                
            },
            {

                extend: 'excelHtml5',
                exportOptions: {
                    columns: "thead th:not(.noExport)",
                    pageSize: 'A4',

                }
            },
            {
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'LEGAL',
                pageSize: 'A4',
                exportOptions: {
                    columns: "thead th:not(.noExport)",

                }

            },
            {
                extend: 'print',
                exportOptions: {
                    columns: "thead th:not(.noExport)",
                    pageSize: 'A4',

                }
            },
        ],

        initComplete: function () {
            $('.buttons-copy').html('<i class="fa fa-copy" />')

            $('.buttons-excel').html('<i class="fa fa-file-excel-o" />')
            $('.buttons-pdf').html('<i class="fa fa-file-pdf-o" />')
            $('.buttons-print').html('<i class="fa fa-print" />')

        },
        "language": {
            "lengthMenu": " _MENU_ ",
            "search": "",

            paginate: {
                next: '<i class="fa fa-angle-double-right">',
                previous: '<i class="fa fa-angle-double-left">'
            }
        },
        
    });
    

}


//2. Appointment MAIN TABLE-------------------------------------------------
function GetAppointmentList(currentPage, pageRowCountAppointment) {

    var startLimit_a= currentPage * pageRowCountAppointment - pageRowCountAppointment;
        

    var json = { kv: {} };
    try {
        json.kv.cookie = getToken();
        json.kv.startLimit = startLimit_a; 
        json.kv.endLimit = currentPage * pageRowCountAppointment; 
    } catch (err) {
   
    }

    // var json = initJSON();

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetAppointmentList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            doctorDataTable(res, startLimit_a);
            appointmentListTableGen(currentPage, res.tbl[0].rowCount, pageRowCountAppointment);
            $('.hide-content-pasient').hide()
           
        },
        error: function (res, status) {
            lert(getMessage('somethingww'));
        }
    });
}


function doctorDataTable(res, startLimit_a) {
    var thead = $('#DoctorDataTableHeader')
    thead.html('');

    var p = $('<tr>')
            .append($('<th>').append('№'))
            .append($('<th>').addClass('noExport').append('Suallar'))
            .append($('<th>').append('Status'))
            .append($('<th>').append('Təyinat'))
            .append($('<th>').append('Tarix&nbsp;&nbsp;&nbsp;&nbsp;'))
            .append($('<th>').append('Saat(dan)'))
            .append($('<th>').append('Saat(a)'))
            .append($('<th>').append('Status'))
            .append($('<th>').append('Patient ID'))
            .append($('<th>').append('Həkim'))
            .append($('<th>').append('Izahat'))
            .append($('<th>').append('Cinsiyyət'))
            .append($('<th>').append('Modul adı'))
            .append($('<th>').addClass('noExport').append('Delete'))

    thead.append(p);


    var table = $('#DoctorDataTable');
    table.html('');
    var obj = res.tbl[0].r;
    for (var i = 0; i < obj.length; i++) {
        var o = obj[i];
        var t = ($('<tr>')
                .append($('<td>')
                     .addClass('apd-table-td')
                    .append(startLimit_a +i + 1))

                .append($('<td>')
                    .addClass('apd-table-td')
                .append($('<a>')
                    .addClass('question-icon dropdown-toggle')
                         .attr('onclick', 'questioFnArea("' + obj[i].id + '")')
                         .attr('href', '#').attr('data-toggle', 'dropdown')
                         .attr('aria-haspopup', 'true')
                         .attr('aria-expanded', 'false')
                .append($('<i>')
                    .addClass('fa fa-question')))
                        .append($('<div>')
                        .addClass('dropdown-menu dropMenuQues')
                            .attr('id', 'dropMenuQues' + obj[i].id)
                            .attr('aria-labelledby', 'apdQuestions' + obj[i].id)
                                ) )

                .append($('<td>').addClass('_0c').append(o.status))
                .append($('<td>').addClass('_1c').append(o.purpose))
                .append($('<td>').addClass('_2c').append(convertDate(o.insertDate)))
                .append($('<td>').addClass('_3c').append(convertTimeSeconds(o.appointmentTime1)))
                .append($('<td>').addClass('_4c').append(convertTimeSeconds(o.appointmentTime2)))
                .append($('<td>').addClass('_5c').append(o.appointmentStatusName))
                .append($('<td>').addClass('_6c').append(o.patientName))
                .append($('<td>').addClass('_7c').append(o.doctorFullname))
                .append($('<td>').addClass('_8c').append(o.description))
                .append($('<td>').addClass('_9c').append(o.sexName))
                .append($('<td>').addClass('_10c').append(o.moduleName))
                .append($('<td>').addClass('_11c')
                .append($('<a>').attr('onclick','deleteAppointment("'+o.id+'")')
                .append($('<i>').addClass('fa fa-trash trash-icon'))))

                )

        table.append(t);

    }
}

//  Appointment MAIN TABLE end -----------------------------------------------

// Delete appointment İtem
function deleteAppointment(id ){

    var json = { kv: {} };
    try {
        json.kv.cookie = getToken();
    
    } catch (err) {

    }
    json.kv.id=id;

   
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrDeleteAppointment",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function () {
        alert('Məlumat silindi')
    
      $('#appointmentListTable').DataTable().destroy();

      GetAppointmentList(1, 10);                      
         
        }
    });


}