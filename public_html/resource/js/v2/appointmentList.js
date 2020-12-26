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