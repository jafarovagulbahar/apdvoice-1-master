// LOAD

function menuAppointmentListLoad() {
    $('.content-body-class').hide();
    $('.content-body-appointmentlist').show();
    GetAppointmentList();

 
}


function menuPatientListLoad() {

    $('.content-body-class').hide();
    $('.content-body-patientlist').show();
    GetPatientList();
 
  
}
 
//    --------------------------------------------------------------------------------
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



// Next Prev Modal Fn
function nextPrev() {
    $("div[id^='popup1']").each(function () {
        var currentModal = $(this);
        //click next
        currentModal.find('.btn-next').click(function () {
            currentModal.modal('hide');
            currentModal.closest("div[id^='popup1']")
              .nextAll("div[id^='popup1']").first().modal('show');
        });

        //click prev
        currentModal.find('.btn-prev').click(function () {
            currentModal.modal('hide');
            currentModal.closest("div[id^='popup1']")
               .prevAll("div[id^='popup1']").first().modal('show');
        });
    });
}


// patient selectbox value append
$(document).on("click", '#patinetlistcombo a', function (e) {
    ulVal = $(this).parent().find('input').val();
    //PasientName search inputuna elave olunur
    document.getElementById('pasientInput').value = ulVal;
    //PasientName Newsession area-ya elave olunur
    document.getElementById('patientSessiaId').value = ulVal;

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
function patientList(e) {
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
            getpatientList();
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


function getpatientList(e) {
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
    json.kv.patientName = $("#patientId").val();

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetPatientList4Combo",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            pasientComboFilter(res)
            pasientListCombo(res)
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });

}
// end ADD NEW PASIENT----------------------------------------------


//2. start SESSION TABLE-------------------------------------------------
function GetAppointmentList(e) {

    var json = initJSON();

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetAppointmentList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            doctorDataTable(res);
        
        },
        error: function (res, status) {
            lert(getMessage('somethingww'));
        }
    });
}


function doctorDataTable(res) {
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
                     .append(i + 1))


                .append($('<th>').addClass('noExport')
                     .append('Suallar')
                    .addClass('mobile-header'))              
                .append($('<td>')
                    .addClass('apd-table-td')
                .append($('<a>')
                    .addClass('question-icon dropdown-toggle')
                        .attr('onclick', 'questioFnArea("' + obj[i].id + '")')
                        .attr('href', '#').attr('data-toggle','dropdown')
                        .attr('aria-haspopup', 'true').attr('aria-expanded', 'false')
                .append($('<i>')
                    .addClass('fa fa-question')))
                .append($('<div>')
                    .addClass('dropdown-menu dropMenuQues')
                        .attr('id', 'dropMenuQues' + obj[i].id)
                        .attr('aria-labelledby', 'apdQuestions' + obj[i].id) ))


                .append($('<th>').append('Status').addClass('mobile-header'))
                .append($('<td>').addClass('_0c').append(o.status))

                .append($('<th>').append('Təyinat').addClass('mobile-header'))
                .append($('<td>').addClass('_1c').append(o.purpose))

                .append($('<th>').append('Tarix').addClass('mobile-header'))
                .append($('<td>').addClass('_2c').append(convertDate(o.insertDate)))

                .append($('<th>').append('Saat(dan)').addClass('mobile-header'))
                .append($('<td>').addClass('_3c').append(convertTimeSeconds(o.appointmentTime1)))

                .append($('<th>').append('Saat(a)').addClass('mobile-header'))
                .append($('<td>').addClass('_4c').append(convertTimeSeconds(o.appointmentTime2)))

                .append($('<th>').append('Status Adı').addClass('mobile-header'))
                .append($('<td>').addClass('_5c').append(o.appointmentStatusName))

                .append($('<th>').append('Patient ID').addClass('mobile-header'))
                .append($('<td>').addClass('_6c').append(o.patientName))

                .append($('<th>').append('Həkim').addClass('mobile-header'))
                .append($('<td>').addClass('_7c').append(o.doctorFullname))

                .append($('<th>').append('Izahat').addClass('mobile-header'))
                .append($('<td>').addClass('_8c').append(o.description))

                .append($('<th>').append('Cinsiyyət').addClass('mobile-header'))
                .append($('<td>').addClass('_9c').append(o.sexName))

                .append($('<th>').append('Modul adı').addClass('mobile-header'))
                .append($('<td>').addClass('_10c').append(o.moduleName))

                .append($('<th>').append('Silmək').addClass('mobile-header'))
                .append($('<td>').addClass('_11c').append($('<i>').addClass('fa fa-trash trash-icon')))

                )

        table.append(t);

    }
}

// end SESSION TABLE-----------------------------------------------


//3. start NEW SESSIA----------------------------------------------

function addNewSessiaArea() {

    console.log(GetNewSessiaDoctor());
    var doctor = GetNewSessiaDoctor().tbl[0].r;
    var purposes = GetNewSessiaPurpose().tbl[0].r;
//    var testPasent=testPasient().tbl[0].r[0];

    var table = $('#addNewSessia').html('');

    var t = ($('<div>').addClass('row')
            .append($('<div>')
                .addClass('form-group col-md-4 patientSelectBox')
            .append($('<label>')
                   .append('Həkim'))
            .append($('<select>')
                .addClass('noSearch selectStyle')
                    .attr('id', 'doctor')
                            //  .append($('<option>').append(doctor.userPersonName,  doctor.userPersonSurname, doctor.userPersonMiddlename))
                                  ))
             // -----------------------------------
            .append($('<div>')
                .addClass('form-group apd-form col-md-4')
            .append($('<label>')
                    .append('Patient'))
            .append($('<input>')
                .addClass('form-control apd-form-input')
                    .attr('id', 'patientSessiaId')
                    .attr('type', 'text')
                .prop('disabled', true)))

             // -----------------------------------
            .append($('<div>')
               .addClass('form-group apd-form col-md-4 patientSelectBox')
            .append($('<label>')
                    .append('Təyinat'))
            .append($('<select>')
                .addClass('noSearch selectStyle')
                    .attr('id', 'purposeSessia')
                            //  .append($('<option>').append(o.paymentName))
                            ))
                // -----------------------------------
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

             // -----------------------------------
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
            // -----------------------------------
            .append($('<div>')
                .addClass('form-group apd-form col-md-2')
                    .append($('<label>')
               .addClass('timesLabel Star3')
                    .append('Saat (a)')
            .append($('<span>')
                .addClass('mandatoryIcon ')
            .append('*')))
            .append($('<input>')
                .addClass('form-control apd-form-input patientMandatoryTime2')  .attr('type', 'time')
                .attr('id', 'time2')
                .prop('disabled', true)))
             // -----------------------------------
            .append($('<div>')
                .addClass('form-group apd-form col-md-2')
                    .append($('<label>')
                .addClass('isNowLabel')
            .append($('<input>')
                    .attr('type', 'checkbox')
                .addClass('toDoLi')
                    .attr('id', 'currentTime').prop('checked', true)
                    .attr('onclick', 'toggleSessionDate(this)'))
            .append($('<span>')
                .addClass('okay'))
            .append($('<label>')
            .append('İndi')) ))
            // -----------------------------------
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
        var p = $('<option>').attr('value', purposes[i].id).append(purposes[i].paymentName);
        List.append(p);
    }

    var doc = $('#doctor');
    for (var i = 0; i < doctor.length; i++) {
        var d = $('<option>').attr('value', doctor[i].id).append(doctor[i].userPersonName, doctor[i].userPersonSurname, doctor[i].userPersonMiddlename);
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


    var isnow = $(el).closest(".apd-form").find("#currentTime").prop('checked');
    console.log(isnow)
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
                            .attr('id', 'patientSurname')
                            .attr('value', patientSurname2)))

            .append($('<div>')
                    .addClass('form-group col-md-4')
                    .append($('<label>')
                            .append('Patient Middle Name'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'patientMiddleName')
                            .attr('value', patientMiddleName2)))

            .append($('<div>')
                    .addClass('form-group col-md-4')
                    .append($('<label>')
                            .append('Doğum Tarixi'))
                    .append($('<input>')
                            .addClass('form-control')
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
                            .append('mobile1'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'mobile1')
                            .val('')))


            .append($('<div>')
                    .addClass('form-group col-md-3')
                    .append($('<label>')
                            .append('mobile2'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'mobile2')
                            .val('')))


            .append($('<div>')
                    .addClass('form-group col-md-3')
                    .append($('<label>')
                            .append('telephone1'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'telephone1')
                            .val('')))


            .append($('<div>')
                    .addClass('form-group col-md-3')
                    .append($('<label>')
                            .append('telephone2'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'telephone2')
                            .val('')))

            .append($('<div>')
                    .addClass('form-group col-md-3')
                    .append($('<label>')
                            .append('email1'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'email1')
                            .val('')))

            .append($('<div>')
                    .addClass('form-group col-md-3')
                    .append($('<label>')
                            .append('email2'))
                    .append($('<input>')
                            .addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'email2')
                            .val('')))

            .append($('<div>').addClass('form-group col-md-3  ').
                    append($('<label>')
                            .append('country'))
                    .append($('<input>').addClass('form-control')
                            .attr('type', 'text')
                            .attr('id', 'country')
                            .val('')))

            .append($('<div>').addClass('form-group col-md-3  ').
                    append($('<label>')
                            .append('Şəhər'))
                    .append($('<input>').addClass('form-control   ')
                            .attr('type', 'text')
                            .attr('id', 'city')
                            .attr('value', city2)))

            .append($('<div>').addClass('form-group col-md-6').
                    append($('<label>')
                            .append('addressLine'))
                    .append($('<textarea>')
                            .attr('rows', '2')
                            .addClass('form-control ')
                            .attr('type', 'text')
                            .attr('id', 'addressLine')
                            .val('')))


            .append($('<div>')
                    .addClass('form-group col-md-6  ')
                    .append($('<label>')
                            .append('izahat'))
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
                var p = $('<option>').attr('value', occupatio[i].itemKey).append(occupatio[i].itemValue);
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

function GetPatientList(e) {

    var json = initJSON();

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetPatientList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            PasientDataTable(res);
          
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}
function PasientDataTable(res) {
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
            .append($('<th>').append('Ətraflı'))

            .append($('<th>').addClass('noExport').append('Silmək'))

    PasientThead.append(pT);

    var table = $('#PasinetTableBody');
    table.empty();

    var obj = res.tbl[0].r;
    for (var i = 0; i < obj.length; i++) {
        var o = obj[i];
        var t = ($('<tr>')
                .append($('<td>').addClass('apd-table-td').append(i + 1))
                
                 // -----------------------------------
                .append($('<th>')
                    .append('Patient ID')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_0p')
                    .append(o.patientName))
                 // -----------------------------------
                .append($('<th>')
                    .append('Dogum Tarixi')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_p')
                    .append(o.patientBirthDate))

                 // -----------------------------------
                .append($('<th>')
                    .append('Cinsiyyet')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_1p')
                    .append(o.sexName))
                 // -----------------------------------
                .append($('<th>')
                    .append('İxtisas')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_2p ')
                    .append(o.occupationName))
                // -----------------------------------
                .append($('<th>').
                    append('Occupation (Other)')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_3p ')
                    .append(o.occupationOther))
                 // -----------------------------------
                 
                .append($('<th>')
                    .append('Ailə vəziyyəti')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_4p')
                    .append(o.maritualStatusName))
                 // -----------------------------------
                .append($('<th>')
                    .append('Təhsil')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_5p')
                    .append(o.educationName))
                 // -----------------------------------
                .append($('<th>')
                    .append('Qan qrupu')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_6p')
                    .append(o.bloodGroupName))
                 // -----------------------------------
                .append($('<th>')
                    .append('Rh Faktor')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_7p')
                    .append(o.rhFactorName))
                 // -----------------------------------
                .append($('<th>')
                    .append('Ölkə')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_8p')
                    .append(''))
                 // -----------------------------------
                .append($('<th>')
                    .append('Şəhər')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_9p')
                    .append(o.city))
                 // -----------------------------------
                .append($('<th>')
                    .append('İzahat')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_10p')
                    .append(o.description))
                 // -----------------------------------
                .append($('<th>')
                    .append('Ətraflı')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_11p')
                    .append($('<a>')
                        .attr('data-toggle', 'modal')
                        .attr('data-target', '#pasientAddModal')
                        .attr("onclick", " updatePasient('" + o.id + "')")
                .append($('<i>')
                        .addClass('fa fa-pencil-square-o edit-icon edit-btn'))))
                // -----------------------------------
                .append($('<th>')
                    .addClass('noExport')
                    .append('Silmək')
                    .addClass('mobile-header'))
                .append($('<td>')
                    .addClass('_12p')
                .append($('<i>')
                    .addClass('fa fa-trash trash-icon')))
                )

        table.append(t);

    }
}


// bu funksiya api-si ferqli yerlerdede işlendiyi ucun generaldi (içinde ayri ayri funksiyalar çagirilıb)
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
                    .attr('onclick', 'questioModal(' + id + ')')
                    .attr('submodule_id', subModal)
                .addClass('apd-subm-attr-button dropdown-item')
                    .attr('data-toggle', 'modal')
                    .attr('data-target', '#popup1')
                .append(val.text()))

        list.append(l)
    });
}

function questioFnArea(id) {

    console.log(id)
    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();

    } catch (err) {

    }
    json.kv.fkSessionId = id;

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
                .append("Close"))   )


    bodyFn2.append(b2)

    $('.quastionBodyModalClass').children().addClass('row')
    $('.dropMenuQues').children().addClass('selectStyle')
}

function questioModal(id) {


    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();

    } catch (err) {

    }

    json.kv.fkSessionId = id;
    json.kv.fkSubmoduleId = subModal;


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
            nextPrev()
            console.log()
            console.log('-------->', res)
            // console.log('===>', res.kv.body)
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}


// ================== Müayinə Siyahisi=================
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
                .append($('<td>').addClass('apd-table-td').append(i + 1))
                .append($('<td>').addClass('apd-table-td').append(o.attributeName))
                .append($('<td>').addClass('apd-table-td').append(o.finalValue))
                .append($('<td>').addClass('apd-table-td').append(o.submoduleName))

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
            dataTable3()
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}

// ============= FILTER section======================

// pasientName add filter content

$(document).on("click", '#pastient-combo a', function () {  

    let Val = $(this).parent().find('input').val();
  
     var filter=$('#fiter-content');
   
      var full=($('<div>')
      .addClass('d-flex justify-content-center align-items-center')
      .addClass('patinet-filter-content-toggle')
   .append($('<span>')
      .append(Val))
   .append($('<span>')
      .addClass('filter-buttons-close')  ))
   
      filter.append(full)

     var patientCount = $("#fiter-content .patinet-filter-content-toggle");
     var badge=$('#badge-patient').html('');
     var badge2=$('<span>').addClass('count-style').append(patientCount.length)
     badge.append(badge2)
  
   });


// 1.--------------------------------------------------
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
// pasientName filter combo
function pasientComboFilter(res) {
    var patientList = $('#pastient-combo').html('');

    var obj = res.tbl[0].r;
    for (var i = 0; i < obj.length; i++) {
        var p = $('<span>')       
        .append($('<a>')
            .attr('href', '#')
                .addClass('patient_li dropdown-item')
            .attr('value', obj[i].patientName)
                .append(obj[i].patientName)
            .attr('id','filter'+ obj[i].id)
        .append($('<input>')
            .attr('type', 'hidden')
            .attr('value', obj[i].patientName)))
        patientList.append(p);
    }
}
// 2 .------------GenderFn filter-----------------------------------
function genderFnFilter() {
    
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
                        .val(obj[i].itemKey)
                        .text(obj[i].itemValue);
                List.append(p);
            }
           
           
        }
    });
}


$(document).on("click", '#gender-filter .dropdown-item', function () {  
    let Val2 = $(this).text();
  
     var filter=$('#gender-content');
   
      var full=($('<div>')
      .addClass('d-flex justify-content-center align-items-center')
      .addClass('patinet-filter-content-toggle')
   .append($('<span>')
      .append(Val2))
   .append($('<span>')
      .addClass('filter-buttons-close')  ))
   
      filter.append(full)

     var patientCount = $("#gender-content .patinet-filter-content-toggle");
     var badge=$('#badge-gender').html('');
     var badge2=$('<span>').addClass('count-style').append(patientCount.length)
     badge.append(badge2)
  
   });
// 3---------------EduFn Filter------------------------------------
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
                        .val(obj[i].itemKey)
                        .text(obj[i].itemValue);
                List.append(p);
            }
         
        }
    });
}

$(document).on("click", '#eduFilter .dropdown-item', function() { 
    
    console.log('ok')
    let Val3 = $(this).text();
  
     var filter=$('#edu-content');
   
      var full=($('<div>')
      .addClass('d-flex justify-content-center align-items-center')
      .addClass('patinet-filter-content-toggle')
   .append($('<span>')
      .append(Val3))
   .append($('<span>')
      .addClass('filter-buttons-close')  ))
   
      filter.append(full)

     var patientCount = $("#edu-content .patinet-filter-content-toggle");
     var badge=$('#badge-edu').html('');
     var badge2=$('<span>').addClass('count-style').append(patientCount.length)
     badge.append(badge2)
  
   });
// 4--------------MaritualStatusFn filter--------------------------------
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
                        .attr('value', obj[i].itemKey)
                    .append(obj[i].itemValue);
                List2.append(p);
            }
           
        }
    });
}

$(document).on("click", '#maritualStatusFilter .dropdown-item', function() { 
    
    console.log('ok')
    let Val3 = $(this).text();
  
     var filter=$('#maritalStatus-content');
   
      var full=($('<div>')
      .addClass('d-flex justify-content-center align-items-center')
      .addClass('patinet-filter-content-toggle')
   .append($('<span>')
      .append(Val3))
   .append($('<span>')
      .addClass('filter-buttons-close')  ))
   
      filter.append(full)

     var patientCount = $("#maritalStatus-content .patinet-filter-content-toggle");
     var badge=$('#badge-maritalStatus').html('');
     var badge2=$('<span>').addClass('count-style').append(patientCount.length)
     badge.append(badge2)
  
   });
// 5------------OcuupationFn filter------------------------------
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
                  
            var occupatio = res.tbl[0].r;
            for (var i = 0; i < occupatio.length; i++) {
                var p = $('<a>')
                    .attr('href','#')
                    .addClass('dropdown-item')
                    .attr('value', occupatio[i].itemKey)
                .append(occupatio[i].itemValue);
                List3.append(p);
            }
         
        }
    });
}

$(document).on("click", '#occupationFilter .dropdown-item', function() { 
    
    console.log('ok')
    let Val4 = $(this).text();
  
     var filter=$('#occupation-content');
   
      var full=($('<div>')
      .addClass('d-flex justify-content-center align-items-center')
      .addClass('patinet-filter-content-toggle')
   .append($('<span>')
      .append(Val4))
   .append($('<span>')
      .addClass('filter-buttons-close')  ))
   
      filter.append(full)

     var patientCount = $("#occupation-content .patinet-filter-content-toggle");
     var badge=$('#badge-occu').html('');
     var badge2=$('<span>').addClass('count-style').append(patientCount.length)
     badge.append(badge2)
  
   });
// 6----------------------------------------
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
                        .text(obj[i].itemValue);
                List.append(p);
            }
          
        }
    });


}

$(document).on("click", '#bloodGroupFilter .dropdown-item', function() { 
  
    let Val5 = $(this).text();
  
     var filter=$('#blood-content');
   
      var full=($('<div>')
      .addClass('d-flex justify-content-center align-items-center')
      .addClass('patinet-filter-content-toggle')
   .append($('<span>')
      .append(Val5))
   .append($('<span>')
      .addClass('filter-buttons-close')  ))
   
      filter.append(full)

     var patientCount = $("#blood-content .patinet-filter-content-toggle");
     var badge=$('#badge-blood').html('');
     var badge2=$('<span>').addClass('count-style').append(patientCount.length)
     badge.append(badge2)
  
   });

// ======================================================


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
                .attr('onclick','pasientFilter()')
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
    .addClass('col-6 pl-1 pr-1')
    .append($('<input>')
            .attr('type','date')
        .addClass('form-control filter-input')
            ))

     .append($('<div>')
     .addClass('col-6 pl-1 pr-1')
    .append($('<input>')
            .attr('type','date')
        .addClass('form-control filter-input')
            ))
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
             .attr('onclick','genderFnFilter()')
        .addClass('panel-witdh')
        .append('Cinsiyyət'))

         .append($('<span>')
         .attr('id','badge-gender'))
         )
     .append($('<div>')
             .attr('id','pasientfilterGender')
         .addClass('panel-collapse')
         .addClass('collapse in')
     .append($('<div>')
    .append($('<button>')
            .attr('data-toggle','dropdown')
            .attr('aria-haspopup',true)
            .attr('aria-expanded', false)
        .addClass('filter-input')
        .addClass('form-control')
        
         .append('Axtar')
         )
    .append($('<div>')
            .attr('id','gender-filter')
        .addClass('dropdown-menu')
            ) 
    .append($('<div>')
        .addClass('pasient-field')
           .attr('id','gender-content')
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
               .attr('onclick','occupationFnFilter()')
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
        .append($('<button>')
                .attr('data-toggle','dropdown')
                .attr('aria-haspopup',true)
                .attr('aria-expanded', false)
            .addClass('filter-input')
            .addClass('form-control')
        .append('Axtar'))
   .append($('<div>')
           .attr('id','occupationFilter')
       .addClass('dropdown-menu')  ) 
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
                .attr('onclick','maritalStatusFnFilter()')
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
   
        .append($('<button>')
                .attr('data-toggle','dropdown')
                .attr('aria-haspopup',true)
                .attr('aria-expanded', false)
            .addClass('filter-input')
            .addClass('form-control')
           .append('Axtar'))
        .append($('<div>')
                .attr('id','maritualStatusFilter')
            .addClass('dropdown-menu') )
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
              .attr('onclick','educationFnFilter()')
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

    .append($('<button>')
        .addClass('form-control')
            .attr('data-toggle','dropdown')
            .attr('aria-haspopup',true)
            .attr('aria-expanded', false)
         .addClass('filter-input')
         .addClass('form-control')
        .append('Axtar'))
    .append($('<div>')
                .attr('id','eduFilter')
            .addClass('dropdown-menu'))
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
                  .attr('onclick','bloodGroupFnFilter()')
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
    .append($('<button>')
              .attr('data-toggle','dropdown')
              .attr('aria-haspopup',true)
              .attr('aria-expanded', false)
            .addClass('filter-input')
            .addClass('form-control')
         .append('Axtar'))
    .append($('<div>')
              .attr('id','bloodGroupFilter')
          .addClass('dropdown-menu'))
    .append($('<div>')
          .addClass('pasient-field')
              .attr('id','blood-content')
          .addClass('row m-auto'))
              )
               ))

            
    pasientContent.append(filterBody) 
    
}

