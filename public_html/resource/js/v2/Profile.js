// load

// LOAD PROFILE SECTION MENUS
// Report load
function menuReportListLoad() {
    $('.content-body-patientlist').hide();
    $('.content-body-appointmentlist').hide();
    $('.appointment-form-intro').hide() // patient add btn
    $('.content-body-reportlist').show();  // reportList
    $('.reportbtn').show() //report button
    $('.content-body-updateCompanylist').hide() //update company info
    $('#filter-content').removeClass('open')  //patient Filter Close
    $('#filter-content-appointment').removeClass('open') //appointmentList Filter Close
    GetReportList(1,10)
}
// Company info load
 function updateCompanyInfoLoad() {
    $('.content-body-patientlist').hide();
    $('.content-body-appointmentlist').hide();
    $('.appointment-form-intro').hide() // patient add btn
    $('.reportbtn').hide() //report button
    $('.content-body-reportlist').hide();  // reportList
    $('.content-body-updateCompanylist').show() //update company info
    $('#filter-content').removeClass('open')  //patient Filter Close
    $('#filter-content-appointment').removeClass('open') //appointmentList Filter Close
    getOwnCompanyInfo() 
}

// ================== 1 =====================
// Report List
// ==========================================

function ReportListTableGen(currentPage, rowCount, pageRowCount) {



    $('#pagination-report').bootpag({
        total: Math.ceil(rowCount / pageRowCount),
        page: currentPage,
        maxVisible: 5,
        leaps: true,
    })
   $('#reportListTable').DataTable({
       
        destroy: true,
        "dom": 'Bfrl',
        "pageLength": pageRowCount,    
        responsive: true,
        "paging": true,
        "autoWidth": true,
        "searching":false,
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
                exportOptions: {
                    columns: "thead th:not(.noExport)",
                    pageSize: 'A4',
                   

                }
            },
            {
                extend: 'print',
                customize: function ( win ) {
                    $(win.document.body)
                        .css( 'font-size', '12px' )

                    $(win.document.body).find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', 'inherit' );
                    
                },
                exportOptions: {
                    columns: "thead th:not(.noExport)",
                    // pageSize: 'A4',
                  
                    modifier: {
                        page: 'current'
                    }

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
        }


    });

}
var pageRowCount = 10;

$(document).on('change', '#reportListTable_length select', function () {
    pageRowCount = $(this).val()
    $('#reportListTable').DataTable().clear().destroy();
    $('#ReportTableThead').empty();
    $('#ReportTableBody').empty();
    GetReportList(1, pageRowCount);

});

var pageNumber = 1;
$(document).on("page", '#pagination-report', function (event, num) {
    $('#reportListTable').DataTable().clear().destroy();
    $('#ReportTableThead').empty();
    $('#ReportTableBody').empty();

    // if ($('#patientSearch').val() === '') {
    //     GetPatientList(num, pageRowCount)
    // } else {
        pageNumber = num;
    // }

})

function GetReportList(currentPage, pageRowCount) {

    var startLimit= currentPage * pageRowCount - pageRowCount;
        

    var json = { kv: {} };
    try {
        json.kv.cookie = getToken();
        json.kv.startLimit = startLimit; 
        json.kv.endLimit = currentPage * pageRowCount; 
    } catch (err) {
   
    }

    var data = JSON.stringify(json);
    console.log(data);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetReportLineList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
        
            ReportDataTable(res, startLimit);  
            ReportListTableGen(currentPage, res.tbl[0].rowCount, pageRowCount);
        
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}

function ReportDataTable(res, startLimit) {

    var reportThead = $('#ReportTableThead')
    reportThead.html('');

    var rT = $('<tr>')
            .append($('<th>').append('№'))
            .append($('<th>').append(res.tbl[0].c[0].reportName))
            .append($('<th>').append(res.tbl[0].c[2].moduleName))
            .append($('<th>').append(res.tbl[0].c[8].reportDesc))
          

        reportThead.append(rT);

    var table = $('#ReportTableBody');
    table.empty();

    var obj = res.tbl[0].r;
    
    for (var i = 0; i < obj.length; i++) {
        var o = obj[i];

    var t = ($('<tr>').attr('id', 'patinet_tr'+o.id)
                .append($('<td>').addClass('apd-table-td').append(startLimit+i + 1))
                .append($('<td>').addClass('_0p').append(o.reportName))
                .append($('<td>').addClass('_0p').append(o.moduleName))
                .append($('<td>').addClass('_1p').append(o.reportDesc)))
     

        table.append(t);
    }
}

// ===========Insert Modal===========

function insertReportCombo() {

    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();

    } catch (err) {

    }

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetModuleList4Combo",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            ReportTypeFn()
           
        }
    });

}

function ReportTypeFn() {

    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();

    } catch (err) {

    }

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/li/reportType",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            insertReportBody(res)
            var List2 = $('#reportTypeId');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<option>').attr('value', obj[i].itemKey).append(obj[i].itemValue);
                List2.append(p);
            }

            new FroalaEditor("#edit", {
                theme: 'gray'
              })
        }
    });

}

function insertReportBody(res) {

    var incBodytable = $('#insertReportBody').html('');
        var t = ($('<div>').addClass('row')
// ----------------------------------------

            .append($('<div>')
                .addClass('form-group apd-form col-md-3')
            .append($('<label>')
                .append('Name'))
           .append($('<input>')
                .addClass('form-control selectStyle apd-form-input')
                    .attr('type', 'text')
                   ))
// ----------------------------------------
         .append($('<div>').
                addClass('form-group col-md-3')
            .append($('<label>')
                .append('Module Name'))
            .append($('<select>')
                .addClass('noSearch selectStyle form-control')
                ))
// ----------------------------------------
         .append($('<div>').
                addClass('form-group col-md-3')
            .append($('<label>')
                .append(res.tbl[0].r[0].itemCodeName))
            .append($('<select>')
                .addClass('noSearch selectStyle form-control')
                .attr('id', 'reportTypeId')  
                ))
// ----------------------------------------

            .append($('<div>')
            .addClass('form-group apd-form col-md-3')
        .append($('<label>')
            .append('Description'))
       .append($('<input>')
            .addClass('form-control selectStyle apd-form-input')
                .attr('type', 'text')
               ))
               
// ----------------------------------------
            .append($('<div>')
            .addClass('col-md-12')
            .attr('id','editor')
        .append($('<label>')
            .append('Report HTML'))
       .append($('<div>')
            .attr('id','edit')
         
               ))
        )

        incBodytable.append(t);

}

// ================== 2 =====================
// Update Company Information
// ==========================================

function getOwnCompanyInfo() {

    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();

    } catch (err) {

    }

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetOwnCompanyInfo",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            companyInfoBody(res) 
        }
    });

}


function companyInfoBody(res) {

    var incBodytable = $('#updateCompanyList').html('');
        var t = ($('<div>').addClass('row')
// ----------------------------------------

            .append($('<div>')
                .addClass('form-group apd-form col-md-12')
            .append($('<label>')
                .append(res.tbl[0].c[3].companyName)
            .append($('<span>')
                .addClass('mandatoryIcon')
                .append('*'))
                )
           .append($('<input>')
                .addClass('form-control selectStyle apd-form-input')
                    .attr('type', 'text')
                    .val(res.tbl[0].r[0].companyName)
                    .attr('id', 'companyName')
                   ))
// ----------------------------------------
         .append($('<div>').
                addClass('form-group col-md-12')
            .append($('<label>')
                .append('Country')
            .append($('<span>')
                .addClass('mandatoryIcon')
                .append('*'))
                )
            .append($('<select>')
                .addClass('noSearch selectStyle form-control')
                .attr('id','companyCountry')
            .append($('<option>')
                .append('Azerbaijan')
                .attr('value','1'))
            .append($('<option>')
                .append('Turkey')
                .attr('value','2'))
            .append($('<option>')
                .append('Other')
                .attr('value','3'))
                ))
// ----------------------------------------
         .append($('<div>').
                addClass('form-group col-md-12')
            .append($('<label>')
                .append("Currency")
            .append($('<span>')
                .addClass('mandatoryIcon')
                .append('*')))
            .append($('<select>')
                .addClass('noSearch selectStyle form-control')
                .attr('id','companyCurrency')
            .append($('<option>')
                .append(res.tbl[0].r[0].companyCurrency)
                .addClass('selected')
                .addClass('mainOption')
                .attr('value', '')) 
            .append($('<option>')
                .append('AZE')
                .attr('value','AZE')) 
            .append($('<option>')
                .append('USD')
                .attr('value','USD')) 
            .append($('<option>')
                .append('TL')
                .attr('value','TL')) 
               
                ))
// ----------------------------------------

            .append($('<div>')
            .addClass('form-group apd-form col-md-12')
        .append($('<label>')
            .append('Time Zone')
        .append($('<span>')
            .addClass('mandatoryIcon')
            .append('*'))
            )        
        .append($('<select>')
            .addClass('noSearch selectStyle form-control')
            .attr('id','companyTimeZone')
        .append($('<option>')
            .append(res.tbl[0].r[0].companyTimeZone))     
            ))
               
// ----------------------------------------
           .append($('<div>')
                .addClass('form-group apd-form col-md-12')
            .append($('<label>')
                .append("Address"))
           .append($('<input>')
                .addClass('form-control selectStyle apd-form-input')
                    .attr('type', 'text')
                    .val(res.tbl[0].r[0].companyAddress)
                    .attr('id','companyAddress')
                   ))
// ----------------------------------------
           .append($('<div>')
                .addClass('form-group apd-form col-md-12')
            .append($('<label>')
                .append(res.tbl[0].c[8].logoUrl))
           .append($('<input>')
                .addClass('form-control selectStyle apd-form-input')
                    .attr('type', 'file')
                    .attr('value',res.tbl[0].r[0].logoUrl)
                   ))
// ----------------------------------------
            .append($('<div>')
               .addClass('form-group apd-form col-md-6')
            .append($('<label>')
            .append($('<span>')
                .addClass('mandatoryIcon')
                .append('*'))
            .append('Required Fields')
            ))
// ----------------------------------------
        .append($('<div>')
            .addClass('form-group apd-form col-md-6')
            .addClass('d-flex')
            .addClass('justify-content-end')
        .append($('<button>')
            .addClass('btn btn-primary')
        .append($('<a>')
            .attr('href','#')
            .attr('onclick','UpdateCompanyInfo()')
            .append('Update')
        )))
        )
        incBodytable.append(t);

}

function UpdateCompanyInfo() {

    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();

    } catch (err) {

    }
  json.kv.companyName=$('#companyName').val()
   json.kv.companyAddress=$('#companyAddress').val()
   json.kv.companyCountry=$('#companyCountry').val()
   json.kv.companyCurrency=$('#companyCurrency').val()
   json.kv.companyTimezone=$('#companyTimeZone').val()
     
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrUpdateCompanyInfo",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
          
        }
    });

}

