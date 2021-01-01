//  AppointmentList Section

var pageRowCountAppointment=10;

$(document).on('change', '#appointmentListTable_length select', function(){
    pageRowCountAppointment=$(this).val()
    $('#appointmentListTable').DataTable().clear().destroy();
    $('#DoctorDataTableHeader').empty();
    $('#DoctorDataTable').empty();     
    GetAppointmentList(1, pageRowCountAppointment)
  
 });

 var pageNumber_a=1;
$(document).on("page",'#pagination-appointment', function (event, num_a) {
   
    $('#appointmentListTable').DataTable().clear().destroy();
    $('#DoctorDataTableHeader').empty();
    $('#DoctorDataTable').empty();     
  
     
    if($('#sessionSearch').val()===''){
        GetAppointmentList(num_a, pageRowCountAppointment)

    }else{
        pageNumber_a=num;
    }
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


//=============== Appointment MAIN TABLE===============
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
            .append($('<th>').addClass('noExport').append('Sessionu bitir'))

    thead.append(p);


    var table = $('#DoctorDataTable');
    table.html('');

 if(res.tbl[0]!== undefined){

    var obj = res.tbl[0].r;
    for (var i = 0; i < obj.length; i++) {
        var o = obj[i];
        var t = ($('<tr>')
                .append($('<td>')
                     .addClass('apd-table-td')
                    .append(startLimit_a +i + 1))
// -------------------------------
                .append($('<td>')
                    .addClass('apd-table-td')
                .append($('<a>')
                    .addClass('question-icon dropdown-toggle')
                         .attr('onclick', 'questioFnArea("' + obj[i].id + '")')
                         .attr('href', '#')
                         .attr('data-toggle', 'dropdown')
                         .attr('aria-haspopup', 'true')
                         .attr('aria-expanded', 'false')
                .append($('<i>')
                    .addClass('fa fa-question')))
                        .append($('<div>')
                        .addClass('dropdown-menu dropMenuQues')
                            .attr('id', 'dropMenuQues' + obj[i].id)
                            .attr('aria-labelledby', 'apdQuestions' + obj[i].id)
                                ) )
// -------------------------------
                .append($('<td>')
                    .addClass('_0c')
                    .append(o.status))
// -------------------------------
                .append($('<td>')
                    .addClass('_1c')
                    .append(o.purpose))
// -------------------------------
                .append($('<td>')
                    .addClass('_2c')
                    .append(convertDate(o.insertDate)))
// -------------------------------
                .append($('<td>')
                    .addClass('_3c')
                    .append(convertTimeSeconds(o.appointmentTime1)))
// -------------------------------
                .append($('<td>')
                    .addClass('_4c')
                    .append(convertTimeSeconds(o.appointmentTime2)))
// -------------------------------
                .append($('<td>')
                    .addClass('_5c')
                    .append(o.appointmentStatusName))
// -------------------------------
                .append($('<td>')
                    .addClass('_6c')
                    .append(o.patientName))
// -------------------------------
                .append($('<td>')
                    .addClass('_7c')
                    .append(o.doctorFullname))
// -------------------------------
                .append($('<td>')
                    .addClass('_8c')
                    .append(o.description))
// -------------------------------
                .append($('<td>')
                    .addClass('_9c')
                    .append(o.sexName))
// -------------------------------
                .append($('<td>')
                    .addClass('_10c')
                    .append(o.moduleName))
// -------------------------------
                .append($('<td>')
                    .addClass('_11c')
                .append($('<a>')
                        .attr('onclick','deleteAppointment("'+o.id+'")')
                .append($('<i>')
                    .addClass('fa fa-trash trash-icon'))))
// -------------------------------
                .append($('<td>')
                    .addClass('_11c')
                .append($('<a>')
                      
                        .attr('onclick','FinishSession("'+o.id+'")')
                .append($('<i>')
                    .addClass('fa fa-medkit trash-icon'))))

                )

        table.append(t);

    }
}
}

// ==================Delete appointment İtem==============
function deleteAppointment(id ){
    if (confirm('Are you sure ?')) {
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
     
    
      $('#appointmentListTable').DataTable().destroy();

      GetAppointmentList(1, 10);                      
         
        }
    });
    }

}

// ==================Appointment Filter================
var objFilterApp={
    purposeA:[],
    patientApp:[],
    doctor:[],
    status:[],
    sex:[]
}
// 1---------------purposeFn Filter--------------------

function purposeFnFilter() {

    var json = initJSON();
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetPriceListList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var List = $('#purposeFilter').html('');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<a>')
                        .attr('href','#')
                    .addClass('dropdown-item')
                    .attr('onclick','PurposeFnItemClick("'+obj[i].id+'")')
                    .attr('id', 'purpose'+ obj[i].id)
                    .val(obj[i].id)
                    .append(obj[i].paymentName);
                List.append(p);
            }
         
        }
    });
}

function PurposeFnItemClick(id){
    if($('#purpose'+ id).hasClass('active') && id==id){ 
 
       $('#spanPurpose'+id).remove()  
    }
 
    $('#purpose'+ id).addClass('active'); 
 
    // let purposeVal=$('#purpose'+ id).val();  

    let purposeText=$('#purpose'+ id).text();  
 
    
  
    objFilterApp.purposeA[id]=purposeText;

    getFilterAppointment(objFilterApp)
   
      var filter=$('#purpose-content');
    
       var full=($('<div>')
            .addClass('d-flex justify-content-center align-items-center')
            .addClass('patinet-filter-content-toggle')
                .attr('id','spanPurpose'+id)
        .append($('<span>')
            .append(purposeText))
        .append($('<span>')
              .attr('onclick','purposeItemDelete("'+id+'")')
            .addClass('filter-buttons-close')  ))
 
       $('#badge-purpose').show()
 
       filter.append(full)
 
      var purposeCount = $("#purpose-content .patinet-filter-content-toggle");
      var purpose1=$('#badge-purpose').html('');
      var purpose2=$('<span>').addClass('count-style').attr('id','purpose-count').append(purposeCount.length)
      purpose1.append(purpose2)
 }
 
function purposeItemDelete(id){
 
    delete objFilterApp.purposeA[id];
     
    getFilterAppointment(objFilterApp)
 
     $('#spanPurpose'+id).remove()
     $('#purpose'+ id).removeClass('active'); 
 
     var a=Number($('#badge-purpose span').text())-1;
     document.getElementById('purpose-count').innerHTML=a;
 
        if(a===0){
          $('#badge-purpose').hide()
        }
 } 

// --------------doctorFn Filter--------------------

$(document).on("keyup", '#doctor-filter', function (e) {
    var input, filter, a, i;
    input = document.getElementById("doctor-filter");
    filter = input.value.toUpperCase();
    div = document.getElementById("doctor-combo");
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


function doctorFnFilter() {

    var json = initJSON();
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetDoctorList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var List = $('#doctor-combo').html('');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<span>')  
                         .append($('<a>')
                        .attr('href','#')
                    .addClass('patient_li dropdown-item')
                        .attr('onclick','DoctorFnItemClick("'+obj[i].id+'")')
                        .attr('id', 'doctor'+ obj[i].id)
                        .val(obj[i].fkDoctorUserId)
                    .append(obj[i].userPersonName, obj[i].userPersonMiddlename, obj[i].userPersonSurname)
                    .append($('<input>')
                        .attr('type', 'hidden')
                        .attr('value', obj[i].userPersonName)) );
                List.append(p);

            
            }
         
        }
    });
}

function DoctorFnItemClick(id){
    if($('#doctor'+ id).hasClass('active') && id==id){ 
 
       $('#spandoctor'+id).remove()  
    }
 
    $('#doctor'+ id).addClass('active'); 
 
    let doctorVal=$('#doctor'+ id).text();  
 
    objFilterApp.doctor[id]=doctorVal;

    getFilterAppointment(objFilterApp)
   
      var filter=$('#doctor-content');
    
       var full=($('<div>')
            .addClass('d-flex justify-content-center align-items-center')
            .addClass('patinet-filter-content-toggle')
                .attr('id','spandoctor'+id)
        .append($('<span>')
            .append(doctorVal))
        .append($('<span>')
              .attr('onclick','doctorItemDelete("'+id+'")')
            .addClass('filter-buttons-close')  ))
 
       $('#badge-doctor').show()
 
       filter.append(full)
 
      var doctorCount = $("#doctor-content .patinet-filter-content-toggle");
      var doctor1=$('#badge-doctor').html('');
      var doctor2=$('<span>')
          .addClass('count-style')
                .attr('id','doctor-count')
          .append(doctorCount.length)
      doctor1.append(doctor2)
 }
 
function doctorItemDelete(id){
 
    delete objFilterApp.doctor[id];
    getFilterAppointment(objFilterApp)
 
     $('#spandoctor'+id).remove()
     $('#doctor'+ id).removeClass('active'); 
 
     var a=Number($('#badge-doctor span').text())-1;
     document.getElementById('doctor-count').innerHTML=a;
 
        if(a===0){
          $('#badge-doctor').hide()
        }
 } 

 // --------------patientSessionFn Filter--------------------
 $(document).on("keyup", '#patientApp-filter', function (e) {
    var input, filter, a, i;
    input = document.getElementById("patientApp-filter");
    filter = input.value.toUpperCase();
    div = document.getElementById("patientApp-combo");
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

function patientAppFnFilter() {

    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();
    } catch (err) {

    }   

    // var json = initJSON();
    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetPatientList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {
            var List = $('#patientApp-combo').html('');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<span>')  
                .append($('<a>')
                        .attr('href','#')
                    .addClass('dropdown-item')
                        .attr('onclick','patientAppFnItemClick("'+obj[i].id+'")')
                        .attr('id', 'patientApp'+ obj[i].id)
                        .attr('value', obj[i].id)
                    .append(obj[i].patientName)
                .append($('<input>')
                    .attr('type', 'hidden')
                    .attr('value', obj[i].patientName))
                    
                    );
                List.append(p);
            }
         
        }
    });
}

function patientAppFnItemClick(id){

    console.log(id)
    if($('#patientApp'+ id).hasClass('active') && id==id){ 
 
       $('#spanpatientApp'+id).remove()  
    }
 
    $('#patientApp'+ id).addClass('active'); 
 
    let patientVal=$('#patientApp'+ id).text();  
 
    objFilterApp.patientApp[id]=patientVal;

    getFilterAppointment(objFilterApp)

      var filter=$('#patientApp-content');
    
       var full=($('<div>')
            .addClass('d-flex justify-content-center align-items-center')
            .addClass('patinet-filter-content-toggle')
                .attr('id','spanpatientApp'+id)
        .append($('<span>')
            .append(patientVal))
        .append($('<span>')
              .attr('onclick','patientAppItemDelete("'+id+'")')
            .addClass('filter-buttons-close')  ))
 
       $('#badge-patientApp').show()
 
       filter.append(full)
 
      var patientAppCount = $("#patientApp-content .patinet-filter-content-toggle");
      var patient1=$('#badge-patientApp').html('');
      var patient2=$('<span>')
          .addClass('count-style')
                .attr('id','patientApp-count')
          .append(patientAppCount.length)
        patient1.append(patient2)
 }
 
function patientAppItemDelete(id){
 
    delete objFilterApp.patientApp[id];

    getFilterAppointment(objFilterApp)
 
     $('#spanpatientApp'+id).remove()
     $('#patientApp'+ id).removeClass('active'); 
 
     var a=Number($('#badge-patientApp span').text())-1;
     document.getElementById('patientApp-count').innerHTML=a;
 
        if(a===0){
          $('#badge-patientApp').hide()
        }
 } 

//-----------------Filter Date--------------------------
$(document).on('change', '.dateOneApp', function(){
    let date1=$('#date1App').val().replaceAll('-',''); 
    let date2=$('#date2App').val().replaceAll('-',''); 
    let date=date1+'%IN%'+date2;
    objFilter.date=date;
    getFilter(objFilter);
})

function removeDateOneApp(){
    // delete objFilter.date;
    // getFilter(objFilter) 
    $('#date1App').val('')
    .attr('type', 'date');
    
}
function removeDateTwoApp(){
    // delete objFilter.date;
    // getFilter(objFilter) 
    $('#date2App').val('')
    .attr('type', 'date');
}

//-----------------Filter Time--------------------------
$(document).on('change', '.timeOne', function(){
    let date1=$('#time1App').val().replaceAll('-',''); 
    let date2=$('#time2App').val().replaceAll('-',''); 
    let date=date1+'%IN%'+date2;
    objFilter.date=date;
    getFilter(objFilter);
})

function removeTimeOneApp(){
    // delete objFilter.date;
    // getFilter(objFilter) 
    $('#time1App').val('')
    .attr('type', 'time');
    
}
function removeTimeTwoApp(){
    // delete objFilter.date;
    // getFilter(objFilter) 
    $('#time2App').val('')
    .attr('type', 'time');
}

// 1---------------statusFn Filter--------------------

function statusFnFilter() {
var List = $('#statusFilter').html('');

    var p =$('<div>')
    .append($('<a>')
            .attr('href','#')
        .addClass('dropdown-item')
        .attr('onclick','statusFnItemClick("'+"24816"+'")')
        .attr('id', 'status'+ "24816")
        // .attr('value', "24816")
        .append('In Process'))

    .append($('<a>')
            .attr('href','#')
        .addClass('dropdown-item')
        .attr('onclick','statusFnItemClick("'+"392781"+'")')
        .attr('id', 'status'+ "392781")
        // .attr('value', "392781")
        .append('In Queue'))

    .append($('<a>')
            .attr('href','#')
        .addClass('dropdown-item')
        .attr('onclick','statusFnItemClick("'+"41664256"+'")')
        .attr('id', 'status'+ "41664256")
        // .attr('value', "41664256") 
        .append('In Active') );

    List.append(p);
   

}

function statusFnItemClick(id){
    if($('#status'+ id).hasClass('active') && id==id){ 
 
       $('#spanstatus'+id).remove()  
    }
 
    $('#status'+ id).addClass('active'); 
 
    let statusVal=$('#status'+ id).text();  
 
    objFilterApp.status[id]=statusVal;

    getFilterAppointment(objFilterApp)
   
      var filter=$('#status-content');
    
       var full=($('<div>')
            .addClass('d-flex justify-content-center align-items-center')
            .addClass('patinet-filter-content-toggle')
                .attr('id','spanstatus'+id)
        .append($('<span>')
            .append(statusVal))
        .append($('<span>')
              .attr('onclick','statusItemDelete("'+id+'")')
            .addClass('filter-buttons-close')  ))
 
       $('#badge-status').show()
 
       filter.append(full)
 
      var statusCount = $("#status-content .patinet-filter-content-toggle");
      var status1=$('#badge-status').html('');
      var status2=$('<span>').addClass('count-style').attr('id','status-count').append(statusCount.length)
      status1.append(status2)
 }
 
function statusItemDelete(id){
 
    
    delete objFilterApp.status[id];
     
    getFilterAppointment(objFilterApp)
 
     $('#spanstatus'+id).remove()
     $('#status'+ id).removeClass('active'); 
 
     var a=Number($('#badge-status span').text())-1;
     document.getElementById('status-count').innerHTML=a;
 
        if(a===0){
          $('#badge-status').hide()
        }
 } 
// 1---------------SexFn Filter--------------------

function sexFnFilter() {
       
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
          
            var List = $('#sexFilter').html('');
            var obj = res.tbl[0].r;
            for (var i = 0; i < obj.length; i++) {
                var p = $('<a>')
                         .attr('href','#')
                    .addClass('dropdown-item')
                    .attr('onclick','sexFnItemClick("'+obj[i].id+'")')
                    .attr('id', 'sex'+ obj[i].id)
                    .val(obj[i].itemKey)
                        .text(obj[i].itemValue);
                List.append(p);
            }
           
           
        }
    });
    
    }
    
function sexFnItemClick(id){
    if($('#sex'+ id).hasClass('active') && id==id){ 
    
        $('#spansex'+id).remove()  
    }
    
    $('#sex'+ id).addClass('active'); 
    
    let sex=$('#sex'+ id).text();  
    let sexVal=$('#sex'+ id).val();  
    
    objFilterApp.sex[id]=sexVal;
    getFilterAppointment(objFilterApp)
    
        var filter=$('#sex-content');
    
        var full=($('<div>')
            .addClass('d-flex justify-content-center align-items-center')
            .addClass('patinet-filter-content-toggle')
                .attr('id','spansex'+id)
        .append($('<span>')
            .append(sex))
        .append($('<span>')
                .attr('onclick','sexItemDelete("'+id+'")')
            .addClass('filter-buttons-close')  ))
    
        $('#badge-sex').show()
    
        filter.append(full)
    
        var statusCount = $("#sex-content .patinet-filter-content-toggle");
        var status1=$('#badge-sex').html('');
        var status2=$('<span>').addClass('count-style').attr('id','sex-count').append(statusCount.length)
        status1.append(status2)
    }
    
function sexItemDelete(id){
    
    
    delete objFilterApp.sex[id];
        
    getFilterAppointment(objFilterApp)
    
        $('#spansex'+id).remove()
        $('#sex'+ id).removeClass('active'); 
    
        var a=Number($('#badge-sex span').text())-1;
        document.getElementById('sex-count').innerHTML=a;
    
        if(a===0){
            $('#badge-sex').hide()
        }
    } 




// ==============APPOINTMENT ALL DATA=======================================
function appointmentFilterSection(){

    var appointmentContent=$('#appointmentFilterAccordion').html('')
    var filterBody=$('<div>')
 
//  ---------------purposeFn------------------------
    .append($('<div>')
          .addClass('panel-default')
    .append($('<div>')
          .addClass('panel-heading')
          .addClass('d-flex')
    .append($('<div>')
              .attr('data-toggle', 'collapse')
              .attr('href','#appointmentFilterPurpose')
              .attr('aria-expanded','false')
              .attr('id','purposeOneClick')
            .addClass('panel-witdh')
          .append('Təyinat'))
    .append($('<span>')
         .attr('id','badge-purpose'))
          )
      .append($('<div>')
              .attr('id','appointmentFilterPurpose')
          .addClass('panel-collapse')
          .addClass('collapse in')
      .append($('<div>')
          .addClass('panel-body')

    .append($('<div>')
                .attr('id','purposeFilter')
            .addClass(''))
    .append($('<div>')
        .addClass('pasient-field')
            .attr('id','purpose-content')
        .addClass('row m-auto'))
          )  ))

 //  ---------------doctorFn------------------------
          .append($('<div>')
            .addClass('panel-default')
        .append($('<div>')
            .addClass('panel-heading')
            .addClass('d-flex')
        .append($('<div>')
                .attr('data-toggle', 'collapse')
                .attr('href','#doctorfilterName')
                .attr('aria-expanded','false')
                .attr('id','doctorOneClick')
            .addClass('panel-witdh')
            .append('Həkim') )

            .append($('<span>')
                    .attr('id','badge-doctor'))
                )

        .append($('<div>')
                .attr('id','doctorfilterName')
            .addClass('panel-collapse')
            .addClass('collapse in')
        .append($('<div>')
            .addClass('panel-body input-search')
        .append($('<input>')
            .addClass('form-control filter-input')
            .addClass('dropdown-toggle')
                .attr('placeholder','Search..')
                .attr('id','doctor-filter')
                .attr('data-toggle','dropdown')
                .attr('aria-expanded',false)
                .attr('autocomplete','off'))
        .append($('<div>')
                .attr('id','doctor-combo')
            .addClass('dropdown-menu'))        
        .append($('<div>')
             .addClass('pasient-field')
            .attr('id','doctor-content')
            .addClass('row m-auto'))
      ) 
    )
)
    //  ---------------patientAppFn------------------------
               .append($('<div>')
            .addClass('panel-default')
        .append($('<div>')
            .addClass('panel-heading')
            .addClass('d-flex')
        .append($('<div>')
                .attr('data-toggle', 'collapse')
                .attr('href','#patientAppfilterName')
                .attr('aria-expanded','false')
                .attr('id','patientAppOneClick')
            .addClass('panel-witdh')
            .append('Pasient') )

            .append($('<span>')
                    .attr('id','badge-patientApp'))
                )

        .append($('<div>')
                .attr('id','patientAppfilterName')
            .addClass('panel-collapse')
            .addClass('collapse in')
        .append($('<div>')
            .addClass('panel-body input-search')
        .append($('<input>')
            .addClass('form-control filter-input')
            .addClass('dropdown-toggle')
                .attr('placeholder','Search..')
                .attr('id','patientApp-filter')
                .attr('data-toggle','dropdown')
                .attr('aria-expanded',false)
                .attr('autocomplete','off'))
        .append($('<div>')
                .attr('id','patientApp-combo')
            .addClass('dropdown-menu'))        
        .append($('<div>')
             .addClass('pasient-field')
            .attr('id','patientApp-content')
            .addClass('row m-auto'))
      ) 
    )
)
    
// --------------Date Filter---------------------------
        .append($('<div>')
        .addClass('panel-default')
    .append($('<div>')
        .addClass('panel-heading')
    .append($('<div>')
            .attr('data-toggle', 'collapse')
            .attr('href','#appointmentfilterDate')
            .attr('aria-expanded','false')
        .append('Tarix')) )
    .append($('<div>')
            .attr('id','appointmentfilterDate')
        .addClass('panel-collapse')
        .addClass('collapse in')
    .append($('<div>')
        .addClass('panel-body row')
    
    .append($('<div>')
    .addClass('col-10 mt-1 mb-1 d-flex')
    .append($('<input>')
            .attr('type','date')
            .addClass('dateOneApp')
            .attr("id","date1App")
        .addClass('form-control')
            )
    .append($('<div>')
        .addClass('col-1 menu-filter-close ml-1 mt-1')
            .attr('onclick', 'removeDateOneApp()')) )

     .append($('<div>')
     .addClass('col-10 mt-1 mb-1 d-flex')
    .append($('<input>')
            .attr('type','date')
            .addClass('dateOneApp')
            .attr("id","date2App")
        .addClass('form-control')
            )
    .append($('<div>')
        .addClass('col-1 menu-filter-close  ml-1 mt-1')
            .attr('onclick', 'removeDateTwoApp()'))
            )
         )))
    
   // --------------Time Filter---------------------------
        .append($('<div>')
        .addClass('panel-default')
    .append($('<div>')
        .addClass('panel-heading')
    .append($('<div>')
            .attr('data-toggle', 'collapse')
            .attr('href','#appointmentfilterTime')
            .attr('aria-expanded','false')
        .append('Saat')) )
    .append($('<div>')
            .attr('id','appointmentfilterTime')
        .addClass('panel-collapse')
        .addClass('collapse in')
    .append($('<div>')
        .addClass('panel-body row')
    
    .append($('<div>')
    .addClass('col-10 mt-1 mb-1 d-flex')
    .append($('<input>')
            .attr('type','time')
            .addClass('timeOne')
            .attr("id","time1App")
        .addClass('form-control')
            )
    .append($('<div>')
        .addClass('col-1 menu-filter-close ml-1 mt-1')
            .attr('onclick', 'removeTimeOneApp()')) )

     .append($('<div>')
     .addClass('col-10 mt-1 mb-1 d-flex')
    .append($('<input>')
            .attr('type','time')
            .addClass('timeOne')
            .attr("id","time2App")
        .addClass('form-control')
            )
    .append($('<div>')
        .addClass('col-1 menu-filter-close  ml-1 mt-1')
            .attr('onclick', 'removeTimeTwoApp()'))
            )
         )))
    
 //  ---------------statusFn------------------------
        .append($('<div>')
            .addClass('panel-default')
        .append($('<div>')
            .addClass('panel-heading')
            .addClass('d-flex')
        .append($('<div>')
                .attr('data-toggle', 'collapse')
                .attr('href','#appointmentFilterstatus')
                .attr('aria-expanded','false')
                .attr('id','statusOneClick')
            .addClass('panel-witdh')
        .append('Status'))
        .append($('<span>')
               .attr('id','badge-status'))
        )
        .append($('<div>')
                .attr('id','appointmentFilterstatus')
            .addClass('panel-collapse')
            .addClass('collapse in')
        .append($('<div>')
           .addClass('panel-body')

        .append($('<div>')
                .attr('id','statusFilter')
            .addClass(''))
        .append($('<div>')
        .addClass('pasient-field')
            .attr('id','status-content')
        .addClass('row m-auto'))
        )  ))
 //  ---------------sexFn------------------------
        .append($('<div>')
            .addClass('panel-default')
        .append($('<div>')
            .addClass('panel-heading')
            .addClass('d-flex')
        .append($('<div>')
                .attr('data-toggle', 'collapse')
                .attr('href','#appointmentFiltersex')
                .attr('aria-expanded','false')
                .attr('id','sexOneClick')
            .addClass('panel-witdh')
        .append('Sex'))
        .append($('<span>')
               .attr('id','badge-sex'))
        )
        .append($('<div>')
                .attr('id','appointmentFiltersex')
            .addClass('panel-collapse')
            .addClass('collapse in')
        .append($('<div>')
           .addClass('panel-body')

        .append($('<div>')
                .attr('id','sexFilter')
            .addClass(''))
        .append($('<div>')
        .addClass('pasient-field')
            .attr('id','sex-content')
        .addClass('row m-auto'))
        )  ))
         

            
    appointmentContent.append(filterBody) 
    
}

function getFilterAppointment(objFilterApp, currentPage){
    
     
    var startLimit_a= currentPage * pageRowCountAppointment - pageRowCountAppointment

    var json = { kv: {} };
    try {
        json.kv.cookie = getToken();
        json.kv.startLimit = startLimit_a; 
        json.kv.endLimit = currentPage * pageRowCountAppointment; 
    } catch (err) {
   
    }

  
    var concatPurpose="";
    var concatPatientApp="";
    var concatDoctor="";
    var concatStatus="";
    var concatSex="";

  
    for (var key in objFilterApp.purposeA) {
        concatPurpose+=objFilterApp.purposeA[key]+'%IN%';
    }
    
    for (var key in objFilterApp.patientApp) {
        concatPatientApp+=key+'%IN%';
    }

    for (var key in objFilterApp.doctor) {
        concatDoctor+=key+'%IN%';
    }

       
    for (var key in objFilterApp.status) {
        concatStatus+=objFilterApp.status+'%IN%';
    }

    for (var key in objFilterApp.sex) {
        concatSex+=objFilterApp.sex[key]+'%IN%';
    }


     json.kv.purpose=concatPurpose;

     json.kv.fkDoctorUserId=concatDoctor;
     json.kv.fkPatientId=concatPatientApp;


     json.kv.appointmentStatusName=concatStatus

     json.kv.sex=concatSex
  

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetAppointmentList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            console.log(res)
            $('#appointmentListTable').DataTable().destroy();  

             doctorDataTable(res, 0)    
                     
              if(res.tbl[0]=== undefined){        
                appointmentListTableGen(currentPage, 10, pageRowCountAppointment);
                
            } else{
                appointmentListTableGen(currentPage, res.tbl[0].rowCount, pageRowCountAppointment);
            }

            },
        error: function (res, status) {
            lert(getMessage('somethingww'));
        }
    });

    

}

function FinishSession(id){
    if (confirm('Are you sure ?')) {
    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();
       
    } catch (err) {

    }
  
    json.kv.id=id
    var data = JSON.stringify(json);

    $.ajax({
        url: urlGl + "api/post/srv/serviceCrFinishSession",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: true,
        success: function (res) {

           
               
                    $('#appointmentListTable').DataTable().destroy();

                    GetAppointmentList(1, 10);  
                
       
        
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}
}



// Session search
$(document).on('keyup','#sessionSearch', function(){
    let val =$(this).val(); 
    let allData='%%'+val+'%%';
    

    var startLimit_a= pageNumber * pageRowCountAppointment - pageRowCountAppointment
 
    var json = { kv: {} };
    try {
        json.kv.cookie = getToken();
        json.kv.startLimit = startLimit_a; 
        json.kv.endLimit = pageNumber_a*pageRowCountAppointment; 
    } catch (err) {
   
    }
    // json.kv.patientName=allData;
    //  json.kv.purpose=allData;
    //  json.kv.moduleName=allData;
    //  json.kv.doctorFullname=allData;
    //  json.kv.appointmentStatusName=allData;
     
  

    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetAppointmentList",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
            $('#appointmentListTable').DataTable().destroy();  

            doctorDataTable(res, 0)                    
              if( res.tbl[0] === undefined){        
                appointmentListTableGen(pageNumber_a, 10, pageRowCountAppointment);
                
            } else{
                appointmentListTableGen(pageNumber_a, res.tbl[0].rowCount, pageRowCountAppointment);
            }
         
            },
        error: function (res, status) {
            lert(getMessage('somethingww'));
        }
    });

})



// ekrana gelen buttonlar
function questionDropMenu(res, id) {

    document.getElementById('bodyDiv').innerHTML = res.kv.body

    subModal = $(".apd-subm-attr-button").first().attr("submodule_id");


    $(".apd-page-btn button").each(function () {
        var val = $(this);
        var subModalId = val.attr("submodule_id")
        
        var list = $("#dropMenuQues" + id);
   
      
        var l = $('<div>')
        .append($('<a>')
                .attr('href', '#')
                .attr('onclick', 'questioModal("'+id+'","'+subModalId+'")')
                .attr('submodule_id', subModalId)
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

function questionBody(res, id)  {
    
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
                    .addClass('apd-form-submodule-attr-prvs')
                .addClass('btn btn-light btn-prev')
                .append("Prev"))
            .append($('<button>')
                    .attr('type', "button")
                    .attr('onclick', 'questioModal("'+res.kv.fkSessionId+'", "'+res.kv.fkSubmoduleId+'")')
                .addClass('btn btn-light btn-next')
                .append("Next"))
            .append($('<button>')
                    .attr('type', "button")
                    .attr('onclick', 'serviceCrInsertNewInspection("'+id+'")')
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

$(document).on('click', '.btn-next', function () {
    $(this).next().click()  
})
 

function questioModal(id, subModalId) {
 
    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();
      

    } catch (err) {

    }
 
    json.kv.fkSubmoduleId = subModalId;
    json.kv.fkSessionId =id;



    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrGetSubmoduleFormBody",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
         
            questionBody(res, id)
           
           
           
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}

function serviceCrInsertNewInspection(id) {
    
    var json = {kv: {}};

    try {
        json.kv.cookie = getToken();
      

    } catch (err) {

    }
 
    json.kv.fkPatientId = $("#fkPatientId").val();
    json.kv.fkSessionId =id;

    // 1 ----------Complaint ~ 12 section---------

    json.kv.sa_201707080509000656= $('#sa_201707080509000656').val()
    json.kv.sa_201707080509310650= $('#sa_201707080509310650').val()
    json.kv.sa_201707080529280920= $('#sa_201707080529280920').val()
    json.kv.sa_201707080531520044= $('#sa_201707080531520044').val() 
    json.kv.sa_201707080532240754= $('#sa_201707080532240754').val()
    json.kv.sa_201707080533500484= $('#sa_201707080533500484').val()
    json.kv.sa_201707080534180429= $('#sa_201707080534180429').val()
    json.kv.sa_201707080534510306= $('#sa_201707080534510306').val()
    json.kv.sa_201707080535300112= $('#sa_201707080535300112').val()
    json.kv.sa_201707080535570145= $('#sa_201707080535570145').val()
    json.kv.sa_201707080536180560= $('#sa_201707080536180560').val()
    json.kv.sa_201707080537180694= $('#sa_201707080537180694').val()

    // 2 ----------Anamnesis ~ 7 section-------

    json.kv.ha_201707080758160844= $('#ha_201707080758160844').val()
    json.kv.sa_201707080746130587= $('#sa_201707080746130587').val()
    json.kv.sa_201707080757210024= $('#sa_201707080757210024').val()
    json.kv.sa_201707080757430530= $('#sa_201707080757430530').val()
    json.kv.sa_201707080758160844= $('#sa_201707080758160844').val()
    json.kv.sa_201707080759380481= $('#sa_201707080759380481').val()
    json.kv.sa_201707080800070137= $('#sa_201707080800070137').val()

    //  3 ------------An.Vitae ~ 7 section--------

    json.kv.ha_201707080911500656= $('#ha_201707080911500656').val()
    json.kv.sa_201707080911500656= $('#sa_201707080911500656').val()
    json.kv.sa_201707080912180103= $('#sa_201707080912180103').val()
    json.kv.sa_201707080937400306= $('#sa_201707080937400306').val()
    json.kv.sa_201707080938360863= $('#sa_201707080938360863').val()
    json.kv.sa_201707080938520866= $('#sa_201707080938520866').val()
    json.kv.sa_201707080940250187= $('#sa_201707080940250187').val()

    // 4 --------------Voice hygiene ~ 17 section-----

    json.kv.sa_201707081204060324 = $('#sa_201707081204060324').val()
    json.kv.sa_201707081204310168 = $('#sa_201707081204310168').val()
    json.kv.sa_201707081205000621 = $('#sa_201707081205000621').val()
    json.kv.sa_201707081206150191 = $('#sa_201707081206150191').val()
    json.kv.sa_201707081206360964 = $('#sa_201707081206360964').val()
    json.kv.sa_201707081206540679 = $('#sa_201707081206540679').val()
    json.kv.sa_201707081207110470 = $('#sa_201707081207110470').val()
    json.kv.sa_201707081207330345 = $('#sa_201707081207330345').val()
    json.kv.sa_201707081207520799 = $('#sa_201707081207520799').val()
    json.kv.sa_201707081208140190 = $('#sa_201707081208140190').val()
    json.kv.sa_201707081208440250 = $('#sa_201707081208440250').val()
    json.kv.sa_201707081209040689 = $('#sa_201707081209040689').val()
    json.kv.sa_201707081209290003 = $('#sa_201707081209290003').val()
    json.kv.sa_201707081209460375 = $('#sa_201707081209460375').val()
    json.kv.sa_201707081210060388 = $('#sa_201707081210060388').val()
    json.kv.sa_201707081210230519 = $('#sa_201707081210230519').val()
    json.kv.sa_201707081210390932 = $('#sa_201707081210390932').val()

    // 5 -----------Acoustic Analysis ~-------

    json.kv.sa_201707081329440581 = $('#sa_201707081329440581').val()
    json.kv.sa_201707081330020388 = $('#sa_201707081330020388').val()
    json.kv.sa_201707081330200120 = $('#sa_201707081330200120').val()
    json.kv.sa_201707081330340526 = $('#sa_201707081330340526').val()
    json.kv.sa_201707081403160657 = $('#sa_201707081403160657').val()
    json.kv.sa_201707081403510470 = $('#sa_201707081403510470').val()
    json.kv.sa_201707081540110846 = $('#sa_201707081540110846').val()
    json.kv.sa_201707081541050591 = $('#sa_201707081541050591').val()
    json.kv.sa_201707081541200471 = $('#sa_201707081541200471').val()
    json.kv.sa_201707081541560035 = $('#sa_201707081541560035').val()
    json.kv.sa_201707081542080285 = $('#sa_201707081542080285').val()
    json.kv.sa_201707081542250437 = $('#sa_201707081542250437').val()
    // images
    json.kv.sa_201707081543050682 = $('#sa_201707081543050682').val()
    json.kv.sa_201707081543170445 = $('#sa_201707081543170445').val()
    json.kv.sa_201707081543290929 = $('#sa_201707081543290929').val()
    json.kv.sa_201707081543400313 = $('#sa_201707081543400313').val()
    // sound
    json.kv.sa_201707081544140842 = $('#sa_201707081544140842').val()
    json.kv.sa_201707081547210087 = $('#sa_201707081547210087').val()
    json.kv.sa_201707081547290329 = $('#sa_201707081547290329').val()
    json.kv.sa_201707081547390697 = $('#sa_201707081547390697').val()

   // 6 -----------Aerodynamic analysis (Spirometry test) ----------
     
     json.kv.sa_201707081757570407 = $('#sa_201707081757570407').val()
     json.kv.sa_201707081758130827 = $('#sa_201707081758130827').val()
     json.kv.sa_201707081758300778 = $('#sa_201707081758300778').val()
     json.kv.sa_201707081758430552 = $('#sa_201707081758430552').val()
     json.kv.sa_201707081758570835 = $('#sa_201707081758570835').val()
     json.kv.sa_201707081759150004 = $('#sa_201707081759150004').val()
    //  image
     json.kv.sa_201707081759450703 = $('#sa_201707081759450703').val()
  
    // 7 ------------Perceptual analysis -----------------------------
    json.kv.sa_201707081808490416 = $('#sa_201707081808490416').val()
    json.kv.sa_201707081809050824 = $('#sa_201707081809050824').val()
    json.kv.sa_201707081809240710 = $('#sa_201707081809240710').val()
    json.kv.sa_201707081809450457 = $('#sa_201707081809450457').val()
    json.kv.sa_201707081811090169 = $('#sa_201707081811090169').val()
  
    // 8 ---------------------- VHI ----------------------------------
    json.kv.sa_201707081853050296 = $('#sa_201707081853050296').val()
    json.kv.sa_201707081853220308 = $('#sa_201707081853220308').val()
    json.kv.sa_201707081854360183 = $('#sa_201707081854360183').val()
    json.kv.sa_201707081855030107 = $('#sa_201707081855030107').val()
    json.kv.sa_201707081857160915 = $('#sa_201707081857160915').val()
    json.kv.sa_201707081857440748 = $('#sa_201707081857440748').val()
    json.kv.sa_201707081858150161 = $('#sa_201707081858150161').val()
    json.kv.sa_201707081858560803 = $('#sa_201707081858560803').val()
    json.kv.sa_201707081859250698 = $('#sa_201707081859250698').val()
    json.kv.sa_201707081859500713 = $('#sa_201707081859500713').val()
    json.kv.sa_201707081900150802 = $('#sa_201707081900150802').val()
  
    // 9---------------Voice-related quality of life index-----------

    json.kv.sa_201707081916060108 = $('#sa_201707081916060108').val()
    json.kv.sa_201707081918330073 = $('#sa_201707081918330073').val()
    json.kv.sa_201707081918500883 = $('#sa_201707081918500883').val()
    json.kv.sa_201707081919440918 = $('#sa_201707081919440918').val()
    json.kv.sa_201707081920070152 = $('#sa_201707081920070152').val()
    json.kv.sa_201707081920410812 = $('#sa_201707081920410812').val()
    json.kv.sa_201707081924400395 = $('#sa_201707081924400395').val()
    json.kv.sa_201707081925010438 = $('#sa_201707081925010438').val()
    json.kv.sa_201707081925380577 = $('#sa_201707081925380577').val()
    json.kv.sa_201707081926000264 = $('#sa_201707081926000264').val()
  
    // 10 -------------------------RSI---------------------------

    json.kv.sa_201707090727460512 = $('#sa_201707090727460512').val()
    json.kv.sa_201707090728020940 = $('#sa_201707090728020940').val()
    json.kv.sa_201707090728150522 = $('#sa_201707090728150522').val()
    json.kv.sa_201707090728440440 = $('#sa_201707090728440440').val()
    json.kv.sa_201707090729070145 = $('#sa_201707090729070145').val()
    json.kv.sa_201707090729320757 = $('#sa_201707090729320757').val()
    json.kv.sa_201707090729580671 = $('#sa_201707090729580671').val()
    json.kv.sa_201707090730240313 = $('#sa_201707090730240313').val()
    json.kv.sa_201707090730440948 = $('#sa_201707090730440948').val()
    
    // 11 ---------------------RFS ------------------------

    json.kv.sa_201707090739420539 = $('#sa_201707090739420539').val()
    json.kv.sa_201707090740040057 = $('#sa_201707090740040057').val()
    json.kv.sa_201707090740210474 = $('#sa_201707090740210474').val()
    json.kv.sa_201707090740510217 = $('#sa_201707090740510217').val()
    json.kv.sa_201707090745450854 = $('#sa_201707090745450854').val()
    json.kv.sa_201707090746060893 = $('#sa_201707090746060893').val()
    json.kv.sa_201707090746250265 = $('#sa_201707090746250265').val()
    json.kv.sa_201707090746480276 = $('#sa_201707090746480276').val()
 
    // 12 ---------------------------SVHI-----------------------

    json.kv.sa_201707090753170234 = $('#sa_201707090753170234').val()
    json.kv.sa_201707090753420079 = $('#sa_201707090753420079').val()
    json.kv.sa_201707090754030395 = $('#sa_201707090754030395').val()
    json.kv.sa_201707090754190766 = $('#sa_201707090754190766').val()
    json.kv.sa_201707090754450749 = $('#sa_201707090754450749').val()
    json.kv.sa_201707090755130312 = $('#sa_201707090755130312').val()
    json.kv.sa_201707090810400542 = $('#sa_201707090810400542').val()
    json.kv.sa_201707090810570675 = $('#sa_201707090810570675').val()
    json.kv.sa_201707090811240258 = $('#sa_201707090811240258').val()
    json.kv.sa_201707090811590491 = $('#sa_201707090811590491').val()


    //  13 -------------------------PVHI Part I-F------------------

    json.kv.sa_54100001 = $('#sa_54100001').val()
    json.kv.sa_54100002 = $('#sa_54100002').val()
    json.kv.sa_54100003 = $('#sa_54100003').val()
    json.kv.sa_54100004 = $('#sa_54100004').val()
    json.kv.sa_54100005 = $('#sa_54100005').val()
    json.kv.sa_54100006 = $('#sa_54100006').val()
    json.kv.sa_54100007 = $('#sa_54100007').val()
    
//    14 --------------------PVHI Part II-P----------------------------

    json.kv.sa_54100008 = $('#sa_54100008').val()
    json.kv.sa_54100009 = $('#sa_54100009').val()
    json.kv.sa_54100010 = $('#sa_54100010').val()
    json.kv.sa_54100011 = $('#sa_54100011').val()
    json.kv.sa_54100012 = $('#sa_54100012').val()
    json.kv.sa_54100013 =  $('#sa_54100013').val()
    json.kv.sa_54100014 =  $('#sa_54100014').val()
    json.kv.sa_54100015 =  $('#sa_54100015').val()
    json.kv.sa_54100016 =  $('#sa_54100016').val()

//  15 ----------------------PVHI Part III-E------------------------------
      
    json.kv.sa_54100017 = $('#sa_54100017').val()
    json.kv.sa_54100018 = $('#sa_54100018').val()
    json.kv.sa_54100019 =  $('#sa_54100019').val()
    json.kv.sa_54100020 =  $('#sa_54100020').val()
    json.kv.sa_54100021 =  $('#sa_54100021').val()
    json.kv.sa_54100022 =  $('#sa_54100022').val()
    json.kv.sa_54100023 =  $('#sa_54100023').val()


//  16 -------------------------------DI---------------------


    json.kv.sa_54100024=  $('#sa_54100024').val()
    json.kv.sa_54100025=  $('#sa_54100025').val()
    json.kv.sa_54100026=  $('#sa_54100026').val()
    json.kv.sa_54100027=  $('#sa_54100027').val()
    json.kv.sa_54100028=  $('#sa_54100028').val()
    json.kv.sa_54100029=  $('#sa_54100029').val()
    json.kv.sa_54100030=  $('#sa_54100030').val()
    json.kv.sa_54100031=  $('#sa_54100031').val()
    json.kv.sa_54100032=  $('#sa_54100032').val()
    json.kv.sa_54100033=  $('#sa_54100033').val()


//  17 ----------------------------CSI------------------------

    json.kv.sa_54100034 =  $('#sa_54100034').val()
    json.kv.sa_54100035 =  $('#sa_54100035').val()
    json.kv.sa_54100036 =  $('#sa_54100036').val()
    json.kv.sa_54100037 =  $('#sa_54100037').val()
    json.kv.sa_54100038 =  $('#sa_54100038').val()
    json.kv.sa_54100039 =  $('#sa_54100039').val()
    json.kv.sa_54100040 =  $('#sa_54100040').val()
    json.kv.sa_54100041 =  $('#sa_54100041').val()
    json.kv.sa_54100042 =  $('#sa_54100042').val()
    json.kv.sa_54100043 =  $('#sa_54100043').val()
 
    // 18 --------------------EAT------------------------------

    json.kv.sa_54100044 =  $('#sa_54100044').val()
    json.kv.sa_54100045 =  $('#sa_54100045').val()
    json.kv.sa_54100046 =  $('#sa_54100046').val()
    json.kv.sa_54100047 =  $('#sa_54100047').val()
    json.kv.sa_54100048 =  $('#sa_54100048').val()
    json.kv.sa_54100049 =  $('#sa_54100049').val()
    json.kv.sa_54100050 =  $('#sa_54100050').val()
    json.kv.sa_54100051 =  $('#sa_54100051').val()
    json.kv.sa_54100052 =  $('#sa_54100052').val()
    json.kv.sa_54100053 =  $('#sa_54100053').val()

// 19 ------------General ENT assesment-------------------------

    json.kv.sa_54100054 =  $('#sa_54100054').val()
    json.kv.sa_54100055 =  $('#sa_54100055').val()
    json.kv.sa_54100056 =  $('#sa_54100056').val()
    json.kv.sa_54100057 =  $('#sa_54100057').val()
    json.kv.sa_54100058 =  $('#sa_54100058').val()
    json.kv.sa_54100059 =  $('#sa_54100059').val()
 
// 20 -----------------VLS results----------------------------

    json.kv.ha_201707091026100125 = $('#ha_201707091026100125').val()
    json.kv.ha_201707091026230385 = $('#ha_201707091026230385 ').val()
    json.kv.ha_201707091026440955 = $('#ha_201707091026440955').val()
    json.kv.ha_201707091044100507 = $('#ha_201707091044100507').val()
    json.kv.sa_201707091025010320 = $('#sa_201707091025010320 ').val()
    json.kv.sa_201707091026100125 = $('#sa_201707091026100125').val()
    json.kv.sa_201707091026230385 = $('#sa_201707091026230385').val()
    json.kv.sa_201707091026440955 = $('#sa_201707091026440955').val()
    json.kv.sa_201707091027250204 = $('#sa_201707091027250204').val()
    json.kv.sa_201707091027360966 = $('#sa_201707091027360966').val()
    json.kv.sa_201707091042420639 = $('#sa_201707091042420639').val()
    json.kv.sa_201707091043020621 = $('#sa_201707091043020621').val()
    json.kv.sa_201707091043290003 = $('#sa_201707091043290003').val()
    json.kv.sa_201707091043400966 = $('#sa_201707091043400966').val()
    json.kv.sa_201707091044100507 = $('#sa_201707091044100507').val()
    json.kv.sa_201707091044310552 = $('#sa_201707091044310552').val()
    json.kv.sa_201707091044540675 = $('#sa_201707091044540675').val()
    json.kv.sa_201707091046570006 = $('#sa_201707091046570006').val()

    // 21 ----------------------EMG-------------------------

    json.kv.sa_201707091102310916 = $('#sa_201707091102310916').val()
    json.kv.sa_201707091102530158 = $('#sa_201707091102530158 ').val()
    json.kv.sa_201707091103350669 = $('#sa_201707091103350669 ').val()
    json.kv.sa_201707091103470781 = $('#sa_201707091103470781 ').val()
    json.kv.sa_201707091103580678 = $('#sa_201707091103580678 ').val()
    json.kv.sa_201707091104090109 = $('#sa_201707091104090109 ').val()

    // 22--------------------Add video file----------------------

    json.kv.sa_201707091112320083 = $('#sa_201707091112320083 ').val()
    json.kv.sa_201707091112520288 = $('#sa_201707091112520288 ').val()
    json.kv.sa_201707091113060905 = $('#sa_201707091113060905 ').val()
    json.kv.sa_201707091113160902 = $('#sa_201707091113160902 ').val()
    json.kv.sa_201707091113330477 = $('#sa_201707091113330477 ').val()
    json.kv.sa_201707091113560075 = $('#sa_201707091113560075 ').val()
    json.kv.sa_201707091114120465 = $('#sa_201707091114120465 ').val()

    // 23 ---------------------------Add photo------------------
    json.kv.sa_201707091117240999 = $('#sa_201707091117240999 ').val()
    json.kv.sa_201707091117350392 = $('#sa_201707091117350392 ').val()
    json.kv.sa_201707091117470512 = $('#sa_201707091117470512 ').val()
    json.kv.sa_201707091117560360 = $('#sa_201707091117560360 ').val()

    // 24 -----------------------General Comment---------------

    json.kv.sa_201707091119350948 = $('#sa_201707091119350948').val()
    json.kv.sa_201707091119490853 = $('#sa_201707091119490853').val()
    json.kv.sa_201707091120030021 = $('#sa_201707091120030021').val()
    json.kv.sa_201707091120190069 = $('#sa_201707091120190069').val()
    json.kv.smOrderNo= "-800"

    // 25 ------------------Diagnose------------------------

    json.kv.sa_201707091222000003 = $('#sa_201707091222000003').val()
    json.kv.sa_201707091222110625 = $('#sa_201707091222110625').val()
    json.kv.sa_201707091222380096 = $('#sa_201707091222380096').val()
    json.kv.sa_201707091222560337 = $('#sa_201707091222560337').val()
    json.kv.smOrderNo= "-790"

    // 26 ----------------Treatment (Conservative therapy)---------
    json.kv.sa_201707091122440428 = $('#sa_201707091122440428').val()
    json.kv.sa_201707091127400904 = $('#sa_201707091127400904').val()
    json.kv.smOrderNo= "-600"

    // 27 -------------Treatment (Voice therapy)-----------------

    json.kv.sa_201707091128310713 = $('#sa_201707091128310713').val()
    json.kv.sa_201707091128470014 = $('#sa_201707091128470014').val()
    json.kv.sa_201707091129440243 = $('#sa_201707091129440243').val()
    json.kv.smOrderNo= "-500"

    // 28 --------------------Treatment (Surgical)-----------------
    json.kv.ha_201707091157450484 = $('#ha_201707091157450484').val()
    json.kv.ha_201707091158140827 = $('#ha_201707091158140827').val()
    json.kv.ha_201707091158530890 = $('#ha_201707091158530890').val()
    json.kv.ha_201707091201030869 = $('#ha_201707091201030869').val()
    json.kv.ha_201707091201350561 = $('#ha_201707091201350561').val()
    json.kv.ha_201707091202100265 = $('#ha_201707091202100265').val()
    json.kv.ha_201707091202280314 = $('#ha_201707091202280314').val()
    json.kv.ha_201707091203160657 = $('#ha_201707091203160657').val()
    json.kv.ha_201707091203350188 = $('#ha_201707091203350188').val()
    json.kv.ha_201707091211520405 = $('#ha_201707091211520405').val()
    json.kv.sa_201707091153170033 = $('#sa_201707091153170033').val()
    json.kv.sa_201707091153420676 = $('#sa_201707091153420676').val()
    json.kv.sa_201707091154200357 = $('#sa_201707091154200357').val()
    json.kv.sa_201707091154570584 = $('#sa_201707091154570584').val()
    json.kv.sa_201707091155310581 = $('#sa_201707091155310581').val()
    json.kv.sa_201707091155480487 = $('#sa_201707091155480487').val()
    json.kv.sa_201707091156260565 = $('#sa_201707091156260565').val()
    json.kv.sa_201707091156370069 = $('#sa_201707091156370069').val()
    json.kv.sa_201707091157450484 = $('#sa_201707091157450484').val()
    json.kv.sa_201707091158140827 = $('#sa_201707091158140827').val()
    json.kv.sa_201707091158530890 = $('#sa_201707091158530890').val()
    json.kv.sa_201707091159260620 = $('#sa_201707091159260620').val()
    json.kv.sa_201707091159420955 = $('#sa_201707091159420955').val()
    json.kv.sa_201707091201030869 = $('#sa_201707091201030869').val()
    json.kv.sa_201707091201350561 = $('#sa_201707091201350561').val()
    json.kv.sa_201707091202100265 = $('#sa_201707091202100265').val()
    json.kv.sa_201707091202280314 = $('#sa_201707091202280314').val()
    json.kv.sa_201707091203160657 = $('#sa_201707091203160657').val()
    json.kv.sa_201707091203350188 = $('#sa_201707091203350188').val()
    json.kv.sa_201707091211520405 = $('#sa_201707091211520405').val()
    json.kv.sa_201707091205320964 = $('#sa_201707091205320964').val()
    json.kv.sa_201707091214550838 = $('#sa_201707091214550838').val()
    json.kv.smOrderNo="-400"


    var data = JSON.stringify(json);
    $.ajax({
        url: urlGl + "api/post/srv/serviceCrInsertNewInspection",
        type: "POST",
        data: data,
        contentType: "application/json",
        crossDomain: true,
        async: false,
        success: function (res) {
          
          alert('Operation finished successfully')
           
        },
        error: function (res, status) {
            //  lert(getMessage('somethingww'));
        }
    });
}
   
