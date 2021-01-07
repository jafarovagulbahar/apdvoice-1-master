

// LOAD


var current_modal = 'session';

function menuAppointmentListLoad() {
    
    current_modal = 'session';
    $('.content-body-appointmentlist').show();
    $('.content-body-patientlist').hide();
    $('.appointment-form-intro').show() // patient elave etmek buttonu
    $('.reportbtn').hide() //report button
    $('.content-body-updateCompanylist').hide() //update company info
    $('#filter-content').removeClass('open')  //patient Filter Close
    pasientFilterSection()  
    GetAppointmentList(1, 10);

}


function menuPatientListLoad() {
    
    current_modal = 'patient';
    $('.content-body-patientlist').show();
    $('.content-body-appointmentlist').hide();
    $('.appointment-form-intro').hide() // patient elave etmek buttonu
    $('.content-body-updateCompanylist').hide() //update company info
    $('.hide-content-pasient').show()
    $('#filter-content-appointment').removeClass('open') //appointmentList Filter Close
    appointmentFilterSection()
    GetPatientList(1, 10);
}
//    ----------------------------------------------------------
// ConvertDate
function convertDate(date) {
    date = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
    return date;
}

function convertTime(date) {
    date2 = date.substring(0, 2) + ':' + date.substring(2, 4);
    return date;
}
function convertTimeSeconds(date) {
    date = date.substring(0, 2) + ':' + date.substring(2, 4) + ':' + date.substring(4);
    return date;
}



//2th table.  PasientList DataTable
var pageRowCount = 10;

$(document).on('change', '#patientListTable_length select', function () {
    pageRowCount = $(this).val()
    $('#patientListTable').DataTable().clear().destroy();
    $('#PasinetTableThead').empty();
    $('#PasinetTableBody').empty();
    GetPatientList(1, pageRowCount);

});

var pageNumber = 1;
$(document).on("page", '#pagination-pasient', function (event, num) {
    $('#patientListTable').DataTable().clear().destroy();
    $('#PasinetTableThead').empty();
    $('#PasinetTableBody').empty();

    if ($('#patientSearch').val() === '') {
        GetPatientList(num, pageRowCount)
    } else {
        pageNumber = num;
    }

})

function patientListTableGen(currentPage, rowCount, pageRowCount) {



    $('#pagination-pasient').bootpag({
        total: Math.ceil(rowCount / pageRowCount),
        page: currentPage,
        maxVisible: 5,
        leaps: true,
    })
   $('#patientListTable').DataTable({
       
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


// patient selectbox value append
$(document).on("click", '#patinetlistcombo a', function (e) {
  var  ulVal = $(this).parent().find('input').val();
    //PasientName search inputuna elave olunur
    document.getElementById('pasientInput').value = ulVal;
 

});

$(document).on("click", '#sessiaBtn', function (e) {
  var  valSessia = $('#pasientInput').val();

  
  if(valSessia===''){
    // console.log('pasient daxil et')
  }else{
    document.getElementById('patientSessiaId').value = valSessia;
  }
 

});


//patient list search
$(document).on("keyup", '#pasientInput', function (e) {
    var input, filter, a, i;
    input = document.getElementById("pasientInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("patinetlistcombo");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
})

$(document).on("click", '.patient_li', function (e) {
    $(this).addClass('active-patient');
})

// "pasient add modal" Mandatory input
$(document).on("keyup", '.patientMandatory', function (e) {
    $(this).css('border', 'none');
    $('.mandatoryIcon').css('display', 'none')
})

$(document).on("click", '.patientMandatoryDate', function (e) {
    $('.patientMandatoryDate').css('border', 'none')
    $('.mandatoryIcon').css('display', 'none')
})
$(document).on("keyup", '.patientMandatoryTime1', function (e) {
    $('.patientMandatoryTime1').css('border', 'none')
    $('.mandatoryIcon').css('display', 'none')
})
$(document).on("keyup", '.patientMandatoryTime2', function (e) {
    $('.patientMandatoryTime2').css('border', 'none')
    $('.mandatoryIcon').css('display', 'none')
})
// otherOption input toggle

$(document).on("click", '.edit-btn', function () {
    console.log('ok')
    $('.addBtn').css('display', 'none')
})
$(document).on("click", '.add-patinet-btn', function () {
    $('.updateBtn').css('display', 'none')
})

//  AJAX CODING


//1. start ADD NEW PASIENT-------------------------------------------------
function patientList() {

    var patientId = $("#patientName").val();

    var json = initJSON();
    json.kv.patientName = $("#patientName").val();
    json.kv.patientSurname = $("#patientSurname").val();
    json.kv.patientMiddleName = $("#patientMiddleName").val();
    json.kv.patientBirthDate = Utility.GetConvertedDate("patientBirthDate");
    json.kv.city = $("#city").val();
    json.kv.description = $("#description").val();
    json.kv.occupationOther = $("#occupationOther").val();
    json.kv.maritualStatus = $("#maritualStatus").val();
    json.kv.education = $("#education").val();
    json.kv.bloodGroup = $("#bloodGroup").val();
    json.kv.occupation = $("#occupation").val();
    json.kv.sex = $("#sex").val();
    json.kv.rhFactor = $("#rhFactor").val();

    json.kv.addressLine = $("#addressLine").val();
    json.kv.country = $("#country").val();
    json.kv.email1 = $("#email1").val();
    json.kv.email2 = $("#email2").val();
    json.kv.mobile1 = $("#mobile1").val();
    json.kv.mobile2 = $("#mobile2").val();
    json.kv.telephone1 = $("#telephone1").val();
    json.kv.telephone2 = $("#telephone2").val();
    json.kv.patientBirthPlace = $("#patientBirthPlace").val();

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrInsertNewPatient",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            Utility.AJAXCallFeedback(res, 'patientName');
            
            if ($('#closeAfterInsert4Pasient').is(":checked")) {
                $('#pasientAddModal').modal('hide');
            } else {
                AddNewPasientArea();
                $('#closeAfterInsert4Pasient').prop("checked", false);
            }
      
                 
             $('#patientListTable').DataTable().destroy();                 
             
             GetPatientList(1, 10);
             
       
          

        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}
function pasientListCombo(res) {
    var patientList = $('#patinetlistcombo').html('');

    var obj = res.tbl[0].r;
    for (var i = 0; i < obj.length; i++) {
        var p = $('<span>')
        .append($('<a>')
                .attr('href', '#')
            .addClass('patient_li dropdown-item')
                .attr('data-value', obj[i].patientName)
            .append(obj[i].patientName)
                .attr('id', 'patentID' + obj[i].id)
                .attr('onclick', 'generalPatientFn("' + obj[i].id + '")')
        .append($('<input>')
                .attr('type', 'hidden')
                .attr('value', obj[i].patientName)))

        patientList.append(p);
    }

}


function getpatientList(e) { //deyesen lazimsiz funksiyadir
    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();
    } catch (err) {

    }

    json.kv.patientName = $("#patientId").val();
    json.kv.patientSurname = $("#param1").val();
    json.kv.patientMiddleName = $("#param2").val();

    json.kv.city = $("#city").val();
    json.kv.description = $("#PasientNote").val();
    json.kv.occupationOther = $("#occupationOther").val();
    json.kv.maritualStatus = $("#maritalStatus").val();
    json.kv.education = $("#edu").val();
    json.kv.bloodGroup = $("#bloodGroup").val();
    json.kv.patientBirthDate = $("#birthDate").val();
    json.kv.occupation = $("#occupation").val();
    json.kv.sex = $("#gender").val();
    json.kv.rhFactor = $("#rhFactor").val();

    // PasientNote
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetPatientList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            pasientListCombo(res)
         
            $("#patientId").val('');
            $("#param1").val('');
            $("#param2").val('');
            $("#city").val('');
            $("#PasientNote").val('');
            $("#occupationOther").val('');
            $("#maritalStatus").val('');
            $("#edu").val('');
            $("#bloodGroup").val('');
            $("#birthDate").val('');
            $("#occupation").val('');
            $("#gender").val('');
            $("#rhFactor").val('');
        },
        error: function (res, status) {
        }
    });

}

function pasientFilter() {

    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();
    } catch (err) {

    }
    json.kv.patientName = $("#patientName").val();

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetPatientList4Combo",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            pasientListCombo(res)
            pasientComboFilter(res)
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });

}
// end ADD NEW PASIENT----------------------------------------------


//3. start NEW SESSIA----------------------------------------------

function addNewSessiaArea() {

    var doctor = GetNewSessiaDoctor().tbl[0].r;
    var purposes = GetNewSessiaPurpose().tbl[0].r;
//    var testPasent=testPasient().tbl[0].r[0];

    var table = $('#addNewSessia').html('');

    var t = ($('<div>').addClass('row')
            .append($('<div>').
                addClass('form-group col-md-4 patientSelectBox')
            .append($('<label>')
                .append('Həkim'))
             .append($('<select>')
                .addClass('noSearch selectStyle form-control')
                .attr('id', 'doctor')  ))
  // ---------------------------------------

            .append($('<div>')
                .addClass('form-group apd-form col-md-4')
            .append($('<label>')
                .append('Patient'))
           .append($('<input>')
                .addClass('form-control apd-form-input')
                    .attr('id', 'patientSessiaId')
                    .attr('type', 'text')
                    .prop('disabled', true)))
// ---------------------------------------
            .append($('<div>')
                .addClass('form-group apd-form col-md-4 patientSelectBox')
            .append($('<label>')
                .append('Təyinat'))
            .append($('<select>')
                .addClass('noSearch selectStyle')
                    .attr('id', 'purposeSessia')  ))
// ---------------------------------------
            .append($('<div>')
                .addClass('form-group apd-form col-md-4')
            .append($('<label>')
                .addClass('timesLabel Star1')
                .append('Tarix')
                .append($('<span>')
                .addClass('mandatoryIcon')
                .append('*')))
            .append($('<input>')
                .addClass('form-control apd-form-input patientMandatoryDate')
                    .attr('type', 'date')
                    .attr('id', 'dateSessia')
                    .prop('disabled', true)))
// ---------------------------------------
            .append($('<div>')
                .addClass('form-group apd-form col-md-2')
            .append($('<label>')
                .addClass('timesLabel  Star2')
                .append('Saat (dan)')
                .append($('<span>')
                .addClass('mandatoryIcon')
                .append('*')))
            .append($('<input>')
                .addClass('form-control apd-form-input patientMandatoryTime1')
                    .attr('type', 'time')
                    .attr('id', 'time1')
                    .prop('disabled', true)))
// ---------------------------------------
            .append($('<div>')
                .addClass('form-group apd-form col-md-2')
            .append($('<label>')
                .addClass('timesLabel Star3')
                .append('Saat (a)')
            .append($('<span>')
                .addClass('mandatoryIcon ')
                .append('*')))
            .append($('<input>')
                .addClass('form-control apd-form-input patientMandatoryTime2')
                    .attr('type', 'time')
                    .attr('id', 'time2')
                    .prop('disabled', true)))
// ---------------------------------------
            .append($('<div>')
                .addClass('form-group apd-form col-md-2')
            .append($('<label>')
                .addClass('isNowLabel')
                .append($('<input>')
                    .attr('type', 'checkbox')
                .addClass('toDoLi')
                    .attr('id', 'currentTime')
                    .prop('checked', true)
                    .attr('onclick', 'toggleSessionDate(this)'))
            .append($('<span>')
                .addClass('okay'))
            .append($('<label>')
            .append('İndi'))
                            ))
// ---------------------------------------
            .append($('<div>')
                .addClass('form-group apd-form col-md-12')
            .append($('<label>')
               .append('İzahat'))
            .append($('<input>')
                .addClass('form-control apd-form-input')
                    .attr('type', 'text')
                    .attr('id', 'sessiaText')))

            )

    table.append(t);

    var List = $('#purposeSessia');
    for (var i = 0; i < purposes.length; i++) {
        var p = $('<option>')
            .attr('value', purposes[i].id)
            .append(purposes[i].paymentName);
        List.append(p);
    }

    var doc = $('#doctor');
    for (var i = 0; i < doctor.length; i++) {
        var d = $('<option>')
            .attr('value', doctor[i].id)
            .append(doctor[i].userPersonName, 
                    doctor[i].userPersonSurname,
                    doctor[i].userPersonMiddlename);
        doc.append(d);
    }

}


function GetNewSessiaDoctor() {

    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }

    var data = JSON.stringify(json);
    var resData = $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetDoctorList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false
    });

    return resData.responseJSON;
}

function GetNewSessiaPurpose() {

    var json = {kv: {}};
    try {
        json.kv.cookie = getToken();
    } catch (err) {
    }

    var data = JSON.stringify(json);
    var resData = $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetPriceListList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false
    });

    return resData.responseJSON
}


function InsertNewSessia() {
    var isNow = $("#currentTime").prop('checked');
    var date = $('#dateSessia').val()
    var Time1 = $('#time1').val();
    var Time2 = $('#time2').val();
    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();
    } catch (err) {

    }

    json.kv.fkPatientId = $("#patientSessiaId").val();
    json.kv.fkDoctorUserId = $("#doctor").val();
    json.kv.appointmentDate = $('#dateSessia').val();
    json.kv.appointmentTime1 = $('#time1').val();
    json.kv.appointmentTime2 = $('#time2').val();
    json.kv.isNow = $("#currentTime").prop('checked');
    json.kv.description = $('#sessiaText').val();
    json.kv.fkPriceListId = $('#purposeSessia').val();

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrInsertNewAppointment",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {

            if (isNow == false && (date == '' || Time1 == '' || Time2 == '')) {
                $('.mandatoryIcon').css('display', 'block')
                $('.patientMandatoryDate').css('border', '2px solid red')
                $('.patientMandatoryTime1').css('border', '2px solid red')
                $('.patientMandatoryTime2').css('border', '2px solid red')

            } else {
                $('.patientMandatoryDate').css('border', 'none')
                $('.patientMandatoryTime1').css('border', 'none')
                $('.patientMandatoryTime2').css('border', 'none')
                $('.patientMandatory').css('none')
            }


            $('#dateSessia').val('');
            $('#time1').val('');
            $('#time2').val('');
            $('#sessiaText').val('');

        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}

function toggleSessionDate(el) {


    var isnow = $(el).closest(".apd-form")
        .find("#currentTime")
        .prop('checked');

    if (isnow === false) {
        $("#dateSessia").prop('disabled', false);
        $("#time1").prop('disabled', false);
        $("#time2").prop('disabled', false);

    } else {
        $("#dateSessia").prop('disabled', true);
        $("#time1").prop('disabled', true);
        $("#time2").prop('disabled', true);
        $('#dateSessia').val('');
        $('#time1').val('');
        $('#time2').val('');
    }

}
// end NEW SESSIA-------------------------------------------


//4. start All pasientList add-------------------------------
function updatePasientNew(_id) {

    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();

    } catch (err) {

    }

    json.kv.id = _id
    json.kv.patientName = $("#patientId").val();
    json.kv.patientSurname = $("#param1").val();
    json.kv.patientMiddleName = $("#param2").val();

    json.kv.city = $("#city").val();
    json.kv.description = $("#PasientNote").val();

    json.kv.occupationOther = $("#occupationOther").val();
    json.kv.maritualStatus = $("#maritalStatus").val();
    json.kv.education = $("#edu").val();
    json.kv.bloodGroup = $("#bloodGroup").val();
    json.kv.patientBirthDate = $("#birthDate").val();
    json.kv.occupation = $("#occupation").val();
    json.kv.sex = $("#gender").val();
    json.kv.rhFactor = $("#rhFactor").val();


    var data = JSON.stringify(json);

    $.ajax({
        url: urlGl + "api/post/srv/serviceCrUpdatePatient",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {

            $("#patientId").val('');
            $("#param1").val('');
            $("#param2").val('');
            $("#city").val('');
            $("#PasientNote").val('');
            $("#occupationOther").val('');
            $("#maritalStatus").val('');
            $("#edu").val('');
            $("#bloodGroup").val('');
            $("#birthDate").val('');
            $("#occupation").val('');
            $("#gender").val('');
            $("#rhFactor").val('');

        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });


}
function updatePasient(_id) {
    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();
        json.kv.id = _id;
    } catch (err) {

    }

    var data = JSON.stringify(json);

    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetPatientList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            AddNewPasientArea(res.tbl[0].r)
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });


}

function AddNewPasientArea(resData) {
    var patient = '';
    var patientSurname2 = '';
    var patientMiddleName2 = '';
    var patientBirthDate2 = '';
    var maritualStatus2 = '';
    var occupation2 = '';
    var occupationOther2 = '';
    var sex2 = '';
    var bloodGroup2 = '';
    var rhFactor2 = '';
    var city2 = '';
    var desc2 = '';
    var edu2 = '';
    var _id = '';

    if (resData !== undefined) {
        patient = resData[0].patientName;
        patientSurname2 = resData[0].patientSurname;
        patientMiddleName2 = resData[0].patientMiddleName;
        patientBirthDate2 = resData[0].patientBirthDate;
        maritualStatus2 = resData[0].maritualStatus;
        occupation2 = resData[0].occupation;
        occupationOther2 = resData[0].occupationOther;
        sex2 = resData[0].sex;
        bloodGroup2 = resData[0].bloodGroup;
        rhFactor2 = resData[0].rhFactor;
        city2 = resData[0].city;
        desc2 = resData[0].description;
        edu2 = resData[0].education;
        _id = resData[0].id

    }




    var patientadd = $('#patinetAddModalBody').html('');
    var body = $('<div>')
            .addClass('main-form')
            .addClass('row')
            .append($('<div>').addClass('form-group col-md-4')
                    .append($('<label>')
                            .append('Patient Name')
                            .append($('<span>')
                                    .addClass('mandatoryIcon')
                                    .append('*')))
                    .append($('<input>')
                            .addClass('form-control')
                            .addClass('patient_mandatory')
                            .attr('type', 'text')
                            .attr('id', 'patientName')
                            .attr('value', patient)))

            .append($('<div>')
                    .addClass('form-group col-md-4')
                    .append($('<label>').
                            append('Patient Surname'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'patient Surname')
                            .attr('value', patientSurname2)))

            .append($('<div>')
                    .addClass('form-group col-md-4')
                    .append($('<label>')
                            .append('Patient Middle Name'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'patient MiddleName')
                            .attr('value', patientMiddleName2)))

            .append($('<div>')
                    .addClass('form-group col-md-4')
                    .append($('<label>')
                            .append('Doğum Tarixi')
                    .append($('<span>')
                            .addClass('mandatoryIcon')
                            .append('*')))
                    .append($('<input>')
                            .addClass('form-control')
                            .addClass('birthday_mandatory')
                            .attr('type', 'date')
                            .attr('id', 'patientBirthDate')
                            .attr('value', patientBirthDate2)))

            .append($('<div>')
                    .addClass('form-group col-md-4')
                    .append($('<label>')
                            .append('patientBirthPlace'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'patientBirthPlace')
                            .val('')))

            .append($('<div>')
                    .addClass('form-group col-md-4')
                    .append($('<label>')
                            .append('patientBirthPlace'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'patientBirthPlace')
                            .val('')))

            .append($('<div>')
                    .addClass('form-group col-md-3')
                    .append($('<label>')
                            .append('Mobile Tel'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'number')
                            .attr('id', 'Mobile Tel')
                            .val('')))


            .append($('<div>')
                    .addClass('form-group col-md-3')
                    .append($('<label>')
                            .append('Mobile Tel-2'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'number')
                            .attr('id', 'Mobile Tel-2')
                            .val('')))


            .append($('<div>')
                    .addClass('form-group col-md-3')
                    .append($('<label>')
                            .append('Telefon-1'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'number')
                            .attr('id', 'Telefon-1')
                            .val('')))


            .append($('<div>')
                    .addClass('form-group col-md-3')
                    .append($('<label>')
                            .append('Telefon-2'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'number')
                            .attr('id', 'Telefon-2')
                            .val('')))

            .append($('<div>')
                    .addClass('form-group col-md-3')
                    .append($('<label>')
                            .append('Email-1'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'email')
                            .attr('id', 'Email-1')
                            .val('')))

            .append($('<div>')
                    .addClass('form-group col-md-3')
                    .append($('<label>')
                            .append('Email-2'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'email')
                            .attr('id', 'Email-2')
                            .val('')))

            .append($('<div>').addClass('form-group col-md-3  ').
                    append($('<label>')
                            .append('country'))
                    .append($('<input>').addClass('form-control   ')
                            .attr('type', 'text')
                            .attr('id', 'country')
                            .val('')))

            .append($('<div>').addClass('form-group col-md-3').
                    append($('<label>')
                            .append('Şəhər'))
                    .append($('<input>').addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'city')
                            .attr('value', city2)))

            .append($('<div>').addClass('form-group col-md-6').
                    append($('<label>')
                            .append('Ünvan'))
                    .append($('<textarea>')
                            .attr('rows', '2')
                            .addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'Ünvan')
                            .val('')))


            .append($('<div>')
                    .addClass('form-group col-md-6  ')
                    .append($('<label>')
                            .append('İzahat'))
                    .append($('<textarea>')
                            .addClass('form-control ')
                            .attr('rows', '2')
                            .attr('id', 'description')
                            .attr('value', desc2)))


            .append($('<div>')
                    .addClass('form-group col-md-3   ')
                    .append($('<label>')
                            .append('Ailə Vəziyyəti'))
                    .append($('<select>')
                            .addClass('form-control')
                            .attr('id', 'maritualStatus')
                            .append($('<option>')
                                    .addClass('active')
                                    .append(maritualStatus2))
                            ))


            .append($('<div>').addClass('form-group col-md-3  ')
                    .append($('<label>')
                            .append('İxtisas'))
                    .append($('<select>')
                            .addClass('form-control')
                            .attr('id', 'occupation')
                            .append($('<option>')
                                    .addClass('active')
                                    .append(occupation2))
                            ))

            .append($('<div>')
                    .addClass('form-group col-md-3')
                    .append($('<label>')
                            .append('Occupation (Other)'))
                    .append($('<input>')
                            .addClass('form-control  ')
                            .attr('type', 'text')
                            .attr('id', 'occupationOther')
                            .attr('value', occupationOther2)))


            .append($('<div>')
                    .addClass('form-group col-md-3  ')
                    .append($('<label>').append('Təhsil'))
                    .append($('<select>')
                            .addClass('form-control')
                            .attr('id', 'education')
                            .append($('<option>')
                                    .addClass('active')
                                    .append(edu2))))

            .append($('<div>').addClass('form-group col-md-3 ')
                    .append($('<label>')
                            .append('Cinsiyyət'))
                    .append($('<select>')
                            .addClass('form-control')
                            .attr('id', 'sex')
                            .append($('<option>')
                                    .addClass('active')
                                    .append(sex2))
                            ))

            .append($('<div>')
                    .addClass('form-group col-md-3   ')
                    .append($('<label>').append('Qan qrupu'))
                    .append($('<select>')
                            .addClass('form-control')
                            .attr('id', 'bloodGroup')
                            .append($('<option>')
                                    .addClass('active')
                                    .append(bloodGroup2))
                            ))

            .append($('<div>')
                    .addClass('form-group col-md-3  ')
                    .append($('<label>')
                            .append('RH faktor'))
                    .append($('<select>')
                            .addClass('form-control')
                            .attr('id', 'rhFactor')
                            .append($('<option>')
                                    .addClass('active')
                                    .append(rhFactor2))
                            ))

            .append($('<div>')
                    .addClass('form-group col-md-12  ')
                    .append($('<input>')
                            .attr('type', 'checkbox')
                            .attr('checked', 'true')
                            .attr('id', 'closeAfterInsert4Pasient'))
                    .append('closeAfterInsert')
                    )




    patientadd.append(body);

    maritalStatusFn();
    occupationFn();
    educationFn();
    genderFn();
    bloodGroupFn();
    rhFactorFn();

    GetPatientList(1, 10);
}

function maritalStatusFn() {
    var json = initJSON();
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/li/maritualStatus",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var List2 = $('#maritualStatus');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<option>').attr('value', obj[i].itemKey).append(obj[i].itemValue);
                List2.append(p);
            }
        }
    });
}
function occupationFn() {

    var json = initJSON();
    json.kv.occupation = $("#occupation").val();

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/li/occupation",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var List3 = $('#occupation');
            var occupatio = res.tbl[0].r;
            for (var i = 0; i < occupatio.length; i++) {
                var p = $('<option>')
                    .attr('value', occupatio[i].itemKey)
                    .append(occupatio[i].itemValue);
                List3.append(p);
            }
        }
    });


}

function educationFn() {

    var json = initJSON();
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/li/educationType",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var List = $('#education');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<option>')
                        .val(obj[i].itemKey)
                        .text(obj[i].itemValue);
                List.append(p);
            }
        }
    });
}

function genderFn() {
    var json = initJSON();
    json.kv.sex = $("#sex").val();
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/li/sex",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var List = $('#sex');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<option>')
                        .val(obj[i].itemKey)
                        .text(obj[i].itemValue);
                List.append(p);
            }
        }
    });


}

function bloodGroupFn() {
    var json = initJSON();
    json.kv.bloodGroup = $("#bloodGroup").val();

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/li/bloodGroup",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var List = $('#bloodGroup');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<option>')
                        .val(obj[i].itemKey)
                        .text(obj[i].itemValue);
                List.append(p);
            }
        }
    });


}

function rhFactorFn() {
    var json = initJSON();
    json.kv.rhFactor = $("#rhFactor").val();

    var data = JSON.stringify(json);
    var resData = $.ajax({
        url: urlGl + "api/post/li/rhFactor",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var List = $('#rhFactor');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<option>')
                        .val(obj[i].itemKey)
                        .text(obj[i].itemValue);
                List.append(p);
            }
        }
    });
}


// end All pasientList add---------------------------------


//5. start Pasient DataTable----------------------------------------

// var maxPageLimit;

function GetPatientList(currentPage, pageRowCount) {

    var startLimit= currentPage * pageRowCount - pageRowCount;
        

    var json = { kv: {} };
    try {
        json.kv.cookie = getToken();
        json.kv.startLimit = startLimit; 
        json.kv.endLimit = currentPage * pageRowCount; 
    } catch (err) {
   
    }

//    if(maxPageLimit < currentPage * pageRowCount){
//     json.kv.startLimit = startLimit-1; 
//        json.kv.endLimit=maxPageLimit-1;
//    }


    var data = JSON.stringify(json);
    console.log(data);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetPatientList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            // maxPageLimit=res.tbl[0].rowCount
            PasientDataTable(res, startLimit);  
            patientListTableGen(currentPage, res.tbl[0].rowCount, pageRowCount);
        
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}
function PasientDataTable(res, startLimit) {
    var PasientThead = $('#PasinetTableThead')
    PasientThead.html('');

    var pT = $('<tr>')
            .append($('<th>').append('№'))
            .append($('<th>').append('Patient ID'))
            .append($('<th>').append('Dogum Tarixi'))
            .append($('<th>').append('Cinsiyyet'))
            .append($('<th>').append('İxtisas'))
            .append($('<th>').append('Occupation (Other)'))
            .append($('<th>').append('Ailə vəziyyəti'))
            .append($('<th>').append('Təhsil'))
            .append($('<th>').append('Qan qrupu'))
            .append($('<th>').append('Rh Faktor'))
            .append($('<th>').append('Ölkə'))
            .append($('<th>').append('Şəhər'))
            .append($('<th>').append('İzahat'))
            .append($('<th>').addClass('noExport').append('Ətraflı'))
            .append($('<th>').addClass('noExport').append('Silmək'))

    PasientThead.append(pT);

    var table = $('#PasinetTableBody');
    table.empty();


    if(res.tbl[0]!== undefined){

    var obj = res.tbl[0].r;
    
    for (var i = 0; i < obj.length; i++) {
        var o = obj[i];
        var t = ($('<tr>').attr('id', 'patinet_tr'+o.id)
                .append($('<td>').addClass('apd-table-td').append(startLimit+i + 1))
                .append($('<td>').addClass('_0p').append(o.patientName))
                .append($('<td>').addClass('_0p').append(convertDate(o.patientBirthDate)))
                .append($('<td>').addClass('_1p').append(o.sexName))
                .append($('<td>').addClass('_2p ').append(o.occupationName))
                .append($('<td>').addClass('_3p ').append(o.occupationOther))
                .append($('<td>').addClass('_4p').append(o.maritualStatusName))
                .append($('<td>').addClass('_5p').append(o.educationName))
                .append($('<td>').addClass('_6p').append(o.bloodGroupName))
                .append($('<td>').addClass('_7p').append(o.rhFactorName))
                .append($('<td>').addClass('_8p').append(''))
                .append($('<td>').addClass('_9p').append(o.city))
                .append($('<td>').addClass('_10p').append(o.description))

                .append($('<td>').addClass('_11p').append($('<a>')
                        .attr('data-toggle', 'modal')
                        .attr('data-target', '#pasientAddModal')
                        .attr("onclick", " updatePasient('" + o.id + "')")
                .append($('<i>')
                        .addClass('fa fa-pencil-square-o edit-icon edit-btn'))))

                .append($('<td>')
                        .addClass('_12p')
                .append($('<a>')
                        .attr('onclick','deletePatient("'+o.id+'")')
                        .attr('id', 'delete_p'+o.id)
                        .append($('<i>')
                        .addClass('fa fa-trash trash-icon'))))
                )

        table.append(t);

    }
}
}


function generalPatientFn(id) {

    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();
        json.kv.fkPatientId = id;
    } catch (err) {

    }

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetAppointmentList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            addNewSessiaArea()
            
        }
    });

}





// Müayinə Siyahisi
function incspectionTable(res) {


    var obj = res.tbl[0].r;
    var tableConst = $('#constHeader').html('');
    var c = $('<div>').addClass('row constHeader')

            .append($('<div>')
                .addClass('form-group apd-form col-md-6')
            .append($('<label>')
                    .addClass('')
                    .append('Patient ID'))
            .append($('<div>')
                    .addClass('form-control apd-form-input_constHeader ')
                    .append(obj[0].patientName)))


            .append($('<div>')
               .addClass('form-group apd-form col-md-6')
            .append($('<label>')
                    .addClass('')
                    .append('Həkim'))
            .append($('<div>')
                    .addClass('form-control apd-form-input_constHeader ')
                    .append(obj[0].doctorFullname)))


            .append($('<div>')
                .addClass('form-group apd-form col-md-6')
            .append($('<label>')
                .addClass('')
                .append('Modul adı'))
            .append($('<div>')
                    .addClass('form-control apd-form-input_constHeader ')
                    .append(obj[0].moduleName)))

            .append($('<div>')
                .addClass('form-group apd-form col-md-4')
            .append($('<label>')
                .addClass('')
                .append('Tarix'))
            .append($('<div>')
                .addClass('form-control apd-form-input_constHeader ')
                .append(convertDate(obj[0].inspectionDate))))


            .append($('<div>')
                .addClass('form-group apd-form col-md-2')
            .append($('<label>')
                .addClass('timsLabel')
                .append('Saat'))
            .append($('<div>')
                .addClass('form-control apd-form-input_constHeader ')
                .append(convertTimeSeconds(obj[0].inspectionTime))))

    tableConst.append(c)

    var incTable = $('#incHead').html('')
    var inc = $('<tr>')
            .append($('<th>').append('№'))
            .append($('<th>').append('Attribute'))
            .append($('<th>').append('Final Dəyər'))
            .append($('<th>').append('Submodul adı'))

    incTable.append(inc)

    var incBodytable = $('#incBody').html('');
    var obj = res.tbl[0].r;
    for (var i = 0; i < obj.length; i++) {
        var o = obj[i];
        var t = ($('<tr>')
                .append($('<td>')
                    .addClass('apd-table-td')
                    .append(i + 1))
                .append($('<td>')
                    .addClass('apd-table-td')
                    .append(o.attributeName))
                .append($('<td>')
                    .addClass('apd-table-td')
                    .append(o.finalValue))
                .append($('<td>')
                    .addClass('apd-table-td')
                    .append(o.submoduleName))

                )

        incBodytable.append(t);

    }


}

function getIncspection() {
    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();

    } catch (err) {

    }


    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetInspectionList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            incspectionTable(res)
          
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}
    

// ============= FILTER section======================

// 1.=======================PASIENT FILTER====================
//patientName filter search
$(document).on("keyup", '#pasient-filter', function (e) {
    var input, filter, a, i;
    input = document.getElementById("pasient-filter");
    filter = input.value.toUpperCase();
    div = document.getElementById("pastient-combo");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
})

// pasientName add filter content

var objFilter={
    pasient: [],
    gender: [],
    edu: [],
    maritual: [],
    occu: [],
    bloodGroup: []
}

function pasientFnItemClick(id, e11){


    if($('#pasient'+ id).hasClass('active') && id==id){ 

        $('#spanPas'+id).remove()  
     }
  
     $('#pasient'+ id).addClass('active'); 

    let text1 = $('#pasient'+ id).text();   

    objFilter.pasient[id]=text1;

    getFilter(objFilter)
  

     var filter=$('#fiter-content');
   
      var full=($('<div>')
      .addClass('d-flex justify-content-center align-items-center')
      .addClass('patinet-filter-content-toggle')
      .attr('id','spanPas'+id)
   .append($('<span>')
      .append(text1))
   .append($('<span>')
   .attr('onclick','pasientItem("'+id+'")')
      .addClass('filter-buttons-close')  ))
   
      $('#badge-patient').show()

      filter.append(full)

     var patientCount = $("#fiter-content .patinet-filter-content-toggle");
     var badge=$('#badge-patient').html('');
     var badge2=$('<span>')
        .addClass('count-style')
            .attr('id','pasient-count')
        .append(Number(patientCount.length))
     badge.append(badge2)

     
}

function pasientItem(id, e11){
    delete objFilter.pasient[id];
    getFilter(objFilter)

    $('#spanPas'+id).remove()
    $('#pasient'+ id).removeClass('active'); 
     var a=Number($('#badge-patient span').text())-1;
     document.getElementById('pasient-count').innerHTML=a;

        if(a===0){
            $('#badge-patient').hide()
        }

  
} 
// pasientName filter combo
function pasientComboFilter(res) {
    $(this).toggleClass('active') 
    
    var patientList = $('#pastient-combo').html('');

    var obj = res.tbl[0].r;
    for (var i = 0; i < obj.length; i++) {
        var p = $('<span>')       
        .append($('<a>')
            .attr('href', '#')
                .addClass('patient_li dropdown-item')
            .attr('value', obj[i].patientName)
            .attr('onclick','pasientFnItemClick("'+obj[i].id+'")')
                .append(obj[i].patientName)
            .attr('id','pasient'+ obj[i].id)
        .append($('<input>')
            .attr('type', 'hidden')
            .attr('value', obj[i].patientName)))
        patientList.append(p);
    }

    
}
// 2 .------------GenderFn filter-----------------------------------
// =================================================================
function genderFnFilter(e) {
    
    var json = initJSON();
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/li/sex",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
          
            var List = $('#gender-filter').html('');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<a>')
                         .attr('href','#')
                    .addClass('dropdown-item')
                    .attr('onclick','genderFnItemClick("'+obj[i].id+'")')
                    .attr('id', 'g'+ obj[i].id)
                    .val(obj[i].itemKey)
                        .text(obj[i].itemValue);
                List.append(p);
            }
           
           
        }
    });
    
}

function genderFnItemClick(id){
   
   if($('#g'+ id).hasClass('active') && id==id){ 

      $('#spanGen'+id).remove()   
   }

   $('#g'+ id).addClass('active'); 

   let text = $('#g'+ id).text();   
   let textVal = $('#g'+ id).val();   

   objFilter.gender[id]=textVal;

   getFilter(objFilter)

   var filter=$('#gender-content2');
    var full=($('<div>') 
    .addClass('d-flex justify-content-center align-items-center')
    .addClass('patinet-filter-content-toggle')
    .attr('id','spanGen'+id)
 .append($('<span>')
    .append(text))
 .append($('<span>')
    .attr('onclick','genderItem("'+id+'")')
    .addClass('filter-buttons-close')  ))
 
    $('#badge-gender-main').show()

    filter.append(full)

    var genderCount = $("#gender-content2 .patinet-filter-content-toggle");
    var gender=$('#badge-gender-main').html('');
    var gender2=$('<span>').
        addClass('count-style')
            .attr('id','gender-count')
        .append(genderCount.length)
    gender.append(gender2)
}

function genderItem(id){
    delete objFilter.gender[id];
    getFilter(objFilter)

    $('#spanGen'+id).remove()
    $('#g'+ id).removeClass('active'); 

    var a=Number($('#badge-gender-main span').text())-1;
    document.getElementById('gender-count').innerHTML=a;

       if(a===0){
         $('#badge-gender-main').hide()
       }
} 

// 3---------------EduFn Filter------------------------------------
// =================================================================
function educationFnFilter() {

    var json = initJSON();
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/li/educationType",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var List = $('#eduFilter').html('');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<a>')
                        .attr('href','#')
                    .addClass('dropdown-item')
                    .attr('onclick','eduFnItemClick("'+obj[i].id+'")')
                    .attr('id', 'edu'+ obj[i].id)
                        .val(obj[i].itemKey)
                        .text(obj[i].itemValue);
                List.append(p);
            }
         
        }
    });
}

function eduFnItemClick(id){
   if($('#edu'+ id).hasClass('active') && id==id){ 

      $('#spanEdu'+id).remove()  
   }

   $('#edu'+ id).addClass('active'); 

   let text2 =$('#edu'+ id).text();  

   let text2Val =$('#edu'+ id).val();  

   objFilter.edu[id]=text2Val;

   getFilter(objFilter)
  
     var filter=$('#edu-content');
   
      var full=($('<div>')
      .addClass('d-flex justify-content-center align-items-center')
      .addClass('patinet-filter-content-toggle')
      .attr('id','spanEdu'+id)
   .append($('<span>')
      .append(text2))
   .append($('<span>')
     .attr('onclick','eduItem("'+id+'")')
      .addClass('filter-buttons-close')  ))

      $('#badge-edu').show()

      filter.append(full)

     var eduCount = $("#edu-content .patinet-filter-content-toggle");
     var edu=$('#badge-edu').html('');
     var edu2=$('<span>').addClass('count-style').attr('id','edu-count').append(eduCount.length)
     edu.append(edu2)
}

   function eduItem(id){

    delete objFilter.edu[id];
    getFilter(objFilter)

    $('#spanEdu'+id).remove()
    $('#edu'+ id).removeClass('active'); 

    var a=Number($('#badge-edu span').text())-1;
    document.getElementById('edu-count').innerHTML=a;

       if(a===0){
         $('#badge-edu').hide()
       }
} 
// 4--------------MaritualStatusFn filter---------------------------
// =================================================================
function maritalStatusFnFilter() {
    var json = initJSON();
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/li/maritualStatus",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var List2 = $('#maritualStatusFilter').html('');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<a>')
                        .attr('href','#')
                    .addClass('dropdown-item')
                    .attr('onclick','maritualFnItemClick("'+obj[i].id+'")')
                        .attr('id', 'marturial'+ obj[i].id)
                        .val(obj[i].itemKey)
                    .append(obj[i].itemValue);
                List2.append(p);
            }
           
        }
    });
}

function maritualFnItemClick(id){
    if($('#marturial'+ id).hasClass('active') && id==id){ 

        $('#spanMar'+id).remove()  
     }
  
     $('#marturial'+ id).addClass('active'); 

    let text3 =$('#marturial'+ id).text();
    let text3Val =$('#marturial'+ id).val();  
  
    objFilter.maritual[id]=text3Val;

    getFilter(objFilter)

     var filter=$('#maritalStatus-content');
   
      var full=($('<div>')
      .addClass('d-flex justify-content-center align-items-center')
      .addClass('patinet-filter-content-toggle')
      .attr('id','spanMar'+id)
   .append($('<span>')
      .append(text3))
   .append($('<span>')
      .attr('onclick','marItem("'+id+'")')
      .addClass('filter-buttons-close')  ))
   
      $('#badge-maritalStatus').show()

      filter.append(full)

     var marCount = $("#maritalStatus-content .patinet-filter-content-toggle");
     var mar=$('#badge-maritalStatus').html('');
     var mar2=$('<span>').addClass('count-style').attr('id','mar-count').append(marCount.length)
     mar.append(mar2)
}

   function marItem(id){
    delete objFilter.maritual[id];
    getFilter(objFilter)

    $('#spanMar'+id).remove()
    $('#marturial'+ id).removeClass('active'); 

    var a=Number($('#badge-maritalStatus span').text())-1;
    document.getElementById('mar-count').innerHTML=a;

       if(a===0){
         $('#badge-maritalStatus').hide()
       }
} 
// 5------------OcuupationFn filter------------------------------
// ==============================================================
function occupationFnFilter() {

    var json = initJSON();

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/li/occupation",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var List3 = $('#occupationFilter').html('')
                  
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<a>')
                    .attr('href','#')
                    .addClass('dropdown-item')
                    .attr('id', 'occu'+ obj[i].id)
                    .attr('onclick','occuFnItemClick("'+obj[i].id+'")')
                    .val(obj[i].itemKey)
                .append(obj[i].itemValue);
                List3.append(p);
            }
         
        }
    });
}

function occuFnItemClick(id){
    if($('#occu'+ id).hasClass('active') && id==id){ 

        $('#spanOccu'+id).remove()  
     }
  
     $('#occu'+ id).addClass('active'); 

    let text4 =$('#occu'+ id).text();  
    let text4Val =$('#occu'+ id).val();  
    
    objFilter.occu[id]=text4Val;

    getFilter(objFilter)

     var filter=$('#occupation-content');
   
      var full=($('<div>')
      .addClass('d-flex justify-content-center align-items-center')
      .addClass('patinet-filter-content-toggle')
      .attr('id','spanOccu'+id)
   .append($('<span>')
      .append(text4))
   .append($('<span>')
      .attr('onclick','occuItem("'+id+'")')
      .addClass('filter-buttons-close')  ))
   
      $('#badge-occu').show()

      filter.append(full)

     var occuCount = $("#occupation-content .patinet-filter-content-toggle");
     var occu=$('#badge-occu').html('');
     var occu2=$('<span>').addClass('count-style').attr('id','occu-count').append(occuCount.length)
     occu.append(occu2)
}

   function occuItem(id){
    delete objFilter.occu[id];
    getFilter(objFilter)

    $('#spanOccu'+id).remove()
    $('#occu'+ id).removeClass('active'); 
    var a=Number($('#badge-occu span').text())-1;

    document.getElementById('occu-count').innerHTML=a;

       if(a===0){
         $('#badge-occu').hide()
       }
} 
// 6---------------------------------------------------------------
// =================================================================
function bloodGroupFnFilter() {
    var json = initJSON();
   

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/li/bloodGroup",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            
            var List = $('#bloodGroupFilter').html('')
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<a>')
                        .attr('href','#')
                    .addClass('dropdown-item')
                        .val(obj[i].itemKey)
                        .attr('id', 'blood'+ obj[i].id)
                        .attr('onclick','bloodFnItemClick("'+obj[i].id+'")')
                        .text(obj[i].itemValue);
                List.append(p);
            }
          
        }
    });


}
function bloodFnItemClick(id){
    
    if($('#blood'+ id).hasClass('active') && id==id){ 

        $('#spanBlood'+id).remove()  
     }
  
     $('#blood'+ id).addClass('active'); 

    let text5 =$('#blood'+ id).text(); 
    let text5Val =$('#blood'+ id).val(); 

    objFilter.bloodGroup[id]=text5Val;

    getFilter(objFilter)

     var filter=$('#blood-content');
   
      var full=($('<div>')
      .addClass('d-flex justify-content-center align-items-center')
      .addClass('patinet-filter-content-toggle')
      .attr('id','spanBlood'+id)
   .append($('<span>')
      .append(text5))
   .append($('<span>')
      .attr('onclick','bloodItem("'+id+'")')
      .addClass('filter-buttons-close')  ))
   
      $('#badge-blood').show()

      filter.append(full)

     let bloodCount = $("#blood-content .patinet-filter-content-toggle");
     let blood=$('#badge-blood').html('');
     let blood2=$('<span>').addClass('count-style').attr('id','blood-count').append(bloodCount.length)
     blood.append(blood2)
}

function bloodItem(id){
    delete objFilter.bloodGroup[id];
    getFilter(objFilter)

    $('#spanBlood'+id).remove()
    $('#blood'+ id).removeClass('active'); 

    var a=Number($('#badge-blood span').text())-1;

    document.getElementById('blood-count').innerHTML=a;

       if(a===0){
         $('#badge-blood').hide()
       }
}

// ================Filter Date==============================
$(document).on('change', '.dateOne', function(){
    let date1=$('#date1').val().replaceAll('-',''); 
    let date2=$('#date2').val().replaceAll('-',''); 
    let date=date1+'%IN%'+date2;
    objFilter.date=date;
    getFilter(objFilter);
})

function removeDateOne(){
    delete objFilter.date;
    getFilter(objFilter) 
    $('#date1').val('')
    .attr('type', 'text')
    .attr('type', 'date');
    
}
function removeDateTwo(){
    delete objFilter.date;
    getFilter(objFilter) 
    $('#date2').val('')
    .attr('type', 'text')
    .attr('type', 'date');
    $('#pagination-pasient').show()
}
// ================================================================
// =================================================================


function pasientFilterSection(){

    var pasientContent=$('#pasientFilterAccordion').html('')
    var filterBody=$('<div>')
             
        .append($('<div>')
            .addClass('panel-default')
        .append($('<div>')
            .addClass('panel-heading')
            .addClass('d-flex')
        .append($('<div>')
                .attr('data-toggle', 'collapse')
                .attr('href','#pasientfilterName')
                .attr('aria-expanded','false')
                .attr('id','pasientOneClick')
            .addClass('panel-witdh')
            .append('Pasient ID') )

            .append($('<span>')
                    .attr('id','badge-patient'))
                )

        .append($('<div>')
                .attr('id','pasientfilterName')
            .addClass('panel-collapse')
            .addClass('collapse in')
        .append($('<div>')
            .addClass('panel-body input-search')
        .append($('<input>')
            .addClass('form-control filter-input')
            .addClass('dropdown-toggle')
                .attr('placeholder','Search..')
                .attr('id','pasient-filter')
                .attr('data-toggle','dropdown')
                .attr('aria-expanded',false)
                .attr('autocomplete','off'))
        .append($('<div>')
                .attr('id','pastient-combo')
            .addClass('dropdown-menu'))        
        .append($('<div>')
             .addClass('pasient-field')
            .attr('id','fiter-content')
            .addClass('row m-auto'))
      ) 
    )
)
// --------------Date---------------------------
        .append($('<div>')
        .addClass('panel-default')
    .append($('<div>')
        .addClass('panel-heading')
    .append($('<div>')
            .attr('data-toggle', 'collapse')
            .attr('href','#pasientfilterDate')
            .attr('aria-expanded','false')
        .append('Doğum Tarixi')) )
    .append($('<div>')
            .attr('id','pasientfilterDate')
        .addClass('panel-collapse')
        .addClass('collapse in')
    .append($('<div>')
        .addClass('panel-body row')
    
    .append($('<div>')
    .addClass('col-10 mt-1 mb-1 d-flex')
    .append($('<input>')
            .attr('type','date')
            .addClass('dateOne')
            .attr("id","date1")
        .addClass('form-control')
            )
    .append($('<div>')
        .addClass('col-1 menu-filter-close ml-1 mt-1')
            .attr('onclick', 'removeDateOne()'))        
            
            )

     .append($('<div>')
     .addClass('col-10 mt-1 mb-1 d-flex')
    .append($('<input>')
            .attr('type','date')
            .addClass('dateOne')
            .attr("id","date2")
        .addClass('form-control')
            )
    .append($('<div>')
        .addClass('col-1 menu-filter-close  ml-1 mt-1')
            .attr('onclick', 'removeDateTwo()'))
            )
         )))
 //  -----------Gender------------------------------

         .append($('<div>')
         .addClass('panel-default')
     .append($('<div>')
         .addClass('panel-heading')
         .addClass('d-flex')
     .append($('<div>')
             .attr('data-toggle', 'collapse')
             .attr('href','#pasientfilterGender')
             .attr('aria-expanded','false')
             .attr('id','genderOneClick')         
             
        .addClass('panel-witdh')
        .append('Cinsiyyət'))

         .append($('<span>')
         .attr('id','badge-gender-main'))
         )
     .append($('<div>')
             .attr('id','pasientfilterGender')
         .addClass('panel-collapse')
         .addClass('collapse in')
     .append($('<div>')
    .append($('<div>')
            .attr('id','gender-filter')
        .addClass('')
            ) 
    .append($('<div>')
        .addClass('pasient-field')
           .attr('id','gender-content2')
        .addClass('row m-auto'))
       )
    ) )


 //  -------------Occupation----------------------------

           .append($('<div>')
           .addClass('panel-default')
       .append($('<div>')
           .addClass('panel-heading')
           .addClass('d-flex')
       .append($('<div>')
               .attr('data-toggle', 'collapse')
               .attr('href','#pasientfilterOccu')
               .attr('aria-expanded','false')
               .attr('id','occuOneClick')   
            .addClass('panel-witdh')
            .append('İxtisas'))
           
        .append($('<span>')
         .attr('id','badge-occu'))
           )
       .append($('<div>')
               .attr('id','pasientfilterOccu')
           .addClass('panel-collapse')
           .addClass('collapse in')
       .append($('<div>')
           .addClass('panel-body')
      
   .append($('<div>')
           .attr('id','occupationFilter')
       .addClass('')  ) 
    .append($('<div>')
       .addClass('pasient-field')
          .attr('id','occupation-content')
       .addClass('row m-auto'))
        ) 
     ))
 //  -------------MaritalStatus Filter----------------------------

        .append($('<div>')
            .addClass('panel-default')
        .append($('<div>')
            .addClass('panel-heading')
            .addClass('d-flex')
        .append($('<div>')
                .attr('data-toggle', 'collapse')
                .attr('href','#pasientfilterFamily')
                .attr('aria-expanded','false')
                .addClass('panel-witdh')
                .attr('id','maritualOneClick')
            .append('Ailə vəziyyəti'))
        .append($('<span>')
                .attr('id','badge-maritalStatus'))
            )
        .append($('<div>')
                .attr('id','pasientfilterFamily')
            .addClass('panel-collapse')
            .addClass('collapse in')
        .append($('<div>')
            .addClass('panel-body')
   
        .append($('<div>')
                .attr('id','maritualStatusFilter')
            .addClass('') )
        .append($('<div>')
            .addClass('pasient-field')
               .attr('id','maritalStatus-content')
            .addClass('row m-auto'))
                )
             ))
  //  ------------EduFn Filter-----------------------------

    .append($('<div>')
          .addClass('panel-default')
    .append($('<div>')
          .addClass('panel-heading')
          .addClass('d-flex')
    .append($('<div>')
              .attr('data-toggle', 'collapse')
              .attr('href','#pasientfilterEdu')
              .attr('aria-expanded','false')
              .attr('id','eduOneClick')
            .addClass('panel-witdh')
          .append('Təhsil'))
    .append($('<span>')
         .attr('id','badge-edu'))
          )
      .append($('<div>')
              .attr('id','pasientfilterEdu')
          .addClass('panel-collapse')
          .addClass('collapse in')
      .append($('<div>')
          .addClass('panel-body')

    .append($('<div>')
                .attr('id','eduFilter')
            .addClass(''))
    .append($('<div>')
        .addClass('pasient-field')
            .attr('id','edu-content')
        .addClass('row m-auto'))
          )
          
    ))
   
 //  --------------BloodGroup Filter---------------------------
        
    .append($('<div>')
            .addClass('panel-default')
    .append($('<div>')
            .addClass('panel-heading')
            .addClass('d-flex')
    .append($('<div>')
                  .attr('data-toggle', 'collapse')
                  .attr('href','#pasientfilterBlood')
                  .attr('aria-expanded','false')
                  .attr('id','bloodOneClick')
            .addClass('panel-witdh')
              .append('Qan qrupu'))
            .append($('<span>')
              .attr('id','badge-blood'))  
            )
     .append($('<div>')
                  .attr('id','pasientfilterBlood')
              .addClass('panel-collapse')
              .addClass('collapse in')
    .append($('<div>')
              .addClass('panel-body')
 
    .append($('<div>')
              .attr('id','bloodGroupFilter')
          .addClass(''))
    .append($('<div>')
          .addClass('pasient-field')
              .attr('id','blood-content')
          .addClass('row m-auto'))
              )
               ))

            
    pasientContent.append(filterBody) 
    
}


function getFilter(objFilter, currentPage){
     
    var startLimit= currentPage * pageRowCount - pageRowCount

    var json = { kv: {} };
    try {
        json.kv.cookie = getToken();
        json.kv.startLimit = startLimit; 
        json.kv.endLimit = currentPage*pageRowCount; 
    } catch (err) {
   
    }

  
    var concatPatient="";
    var concatGender="";
    var concatEdu="";
    var concatMaritual="";
    var concatOccu="";
    var concatBlood=""; 

  

    for (var key in objFilter.pasient) {
        concatPatient+=key+'%IN%';
    }

    for (var key in objFilter.gender) {
        concatGender+= objFilter.gender[key]+'%IN%';
    } 
     for (var key in objFilter.edu) {
        concatEdu+=objFilter.edu[key]+'%IN%';
    }

    for (var key in objFilter.maritual) {
        concatMaritual+=objFilter.maritual[key]+'%IN%';
    }
    for (var key in objFilter.bloodGroup) {
        concatBlood+=objFilter.bloodGroup[key]+'%IN%';
    }

    for (var key in objFilter.occu) {
        concatOccu+=objFilter.occu[key]+'%IN%';
    }

 

     json.kv.fkPatientId=concatPatient;
     json.kv.sex=concatGender;
     json.kv.education=concatEdu;
     json.kv.maritualStatus=concatMaritual;
     json.kv.occupation=concatOccu;
     json.kv.bloodGroup=concatBlood;

     json.kv.patientBirthDate=objFilter.date;
   

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetPatientList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            $('#patientListTable').DataTable().destroy();  
            
            PasientDataTable(res, 0)    
                     
              if( res.tbl[0] === undefined){        
                patientListTableGen(currentPage, 10, pageRowCount);
                
            } else{
                patientListTableGen(currentPage, res.tbl[0].rowCount, pageRowCount);
            }
         
            },
        error: function (res, status) {
            lert(getMessage('somethingww'));
        }
    });

    

}

// Patient search
$(document).on('keyup','#patientSearch', function(){
    let val =$(this).val(); 
    let allData='%%'+val+'%%';
    

    var startLimit= pageNumber * pageRowCount - pageRowCount
 
    var json = { kv: {} };
    try {
        json.kv.cookie = getToken();
        json.kv.startLimit = startLimit; 
        json.kv.endLimit = pageNumber*pageRowCount; 
    } catch (err) {
   
    }
     json.kv.patientName=allData;
  

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetPatientList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            $('#patientListTable').DataTable().destroy();  

            PasientDataTable(res, 0)                    
              if( res.tbl[0] === undefined){        
                patientListTableGen(pageNumber, 10, pageRowCount);
                
            } else{
                patientListTableGen(pageNumber, res.tbl[0].rowCount, pageRowCount);
            }
         
            },
        error: function (res, status) {
            lert(getMessage('somethingww'));
        }
    });

})
     
function deletePatient(id ){
    if (confirm('Are you sure ?')) {
    var json = { kv: {} };
    try {
        json.kv.cookie = getToken();
    
    } catch (err) {

    }
    json.kv.id=id;

   
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrDeletePatient",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function () {

      $('#patientListTable').DataTable().destroy();

       GetPatientList(1, 10);                       
         
        }
    });
    }

}




// ekrana gelen buttonlar
function questionDropMenu(res, id) {

    document.getElementById('bodyDiv').innerHTML = res.kv.body


    subModal = $(".apd-subm-attr-button").first().attr("submodule_id");


    $(".apd-page-btn button").each(function () {
        var val = $(this);
        var subModal = val.attr("submodule_id")
        
        var list = $("#dropMenuQues" + id);
        var l = $('<div>')
        .append($('<a>')
                .attr('href', '#')
                .attr('onclick', 'questioModal("'+id+'")')
                .attr('submodule_id', subModal)
            .addClass('apd-subm-attr-button dropdown-item')
                .attr('data-toggle', 'modal')
                .attr('data-target', '#popup1')
                .append(val.text()))
        list.append(l)
    });
}

function questioFnArea(id) {

    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();

    } catch (err) {

    }

    json.kv.fkSessionId = id;

    console.log(id, 'quseion')

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGenSubmoduleButtonList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            questionDropMenu(res, id)
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}


// end // ekrana gelen buttonlar

function questionBody(res) {
    
    var bodyFn2 = $('#questionBody').html('')
    var b2 = $('<div>')
            .append($('<div>')
                .addClass('modal-header')
                .append($('<h5>')
                .append(res.kv.header)))
            .append($('<div>')
                .addClass('quastionBodyModalClass col-12')
                .append(res.kv.body))

            .append($('<div>')
                .addClass('modal-footer col-12')
            .append($('<button>')
                    .attr('type', "button")
                .addClass('btn btn-light btn-prev')
                .append("Prev"))
            .append($('<button>')
                    .attr('type', "button")
                .addClass('btn btn-light btn-next')
                .append("Next"))
            .append($('<button>')
                    .attr('type', "button")
                .addClass('btn btn-light')
                 .append("Insert"))
            .append($('<button>')
                    .attr('type', "button")
                .addClass('btn btn-light')
                .append("Close"))
                    )


    bodyFn2.append(b2)

    $('.quastionBodyModalClass').children().addClass('row')
    $('.dropMenuQues').children().addClass('selectStyle')
}

function questioModal(id) {

    console.log(id, "jjsjs")
 
    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();
      

    } catch (err) {

    }
    json.kv.fkSubmoduleId = subModal;
    json.kv.fkSessionId =id;


    console.log(id, subModal, 'modal pis')

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetSubmoduleFormBody",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            questionBody(res)
           
           
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}

   

  

