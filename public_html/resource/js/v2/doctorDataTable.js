



function PatientQuestion(){

     var patient=$('#patinetAddModalBody');
     var p=$('<div>').addClass('row')
     
         .append($('<div>').addClass('form-group col-md-4').append($('<label>').append('Patient ID'))
         .append($('<input>').addClass('form-control  apd-form-input').attr('type','text').attr('id','patientName')))
          
    
        .append($('<div>').addClass('form-group col-md-4 patientSelectBox').append($('<label>').append('Səsdə Yorulma'))
        .append($('<select>').addClass('noSearch selectStyle')
        .append($('<option>').addClass('active').append(''))
        .append($('<option>').append('Xeyir'))
        .append($('<option>').append('Beli'))
        .append($('<option>').append('---')) ) )
    
    
        .append($('<div>').addClass('form-group col-md-4 patientSelectBox').append($('<label>').append('Səsdə İncələmə'))
        .append($('<select>').addClass('noSearch selectStyle')
        .append($('<option>').addClass('active').append(''))
        .append($('<option>').append('Xeyir'))
        .append($('<option>').append('Beli'))
        .append($('<option>').append('---')) ) )
    
    
        .append($('<div>').addClass('form-group col-md-4 patientSelectBox').append($('<label>').append('Səsdə Gərginlik'))
        .append($('<select>').addClass('noSearch selectStyle')
        .append($('<option>').addClass('active').append(''))
        .append($('<option>').append('Xeyir'))
        .append($('<option>').append('Beli'))
        .append($('<option>').append('---')) ) )
     
        .append($('<div>').addClass('form-group col-md-4 patientSelectBox').append($('<label>').append('Udqunmanın Çətinləşməsi'))
        .append($('<select>').addClass('noSearch selectStyle')
        .append($('<option>').addClass('active').append(''))
        .append($('<option>').append('Xeyir'))
        .append($('<option>').append('Beli'))
        .append($('<option>').append('---')) ) )
    
        .append($('<div>').addClass('form-group col-md-4 patientSelectBox').append($('<label>').append('Boğazda ağrı, batma hissi'))
        .append($('<select>').addClass('noSearch selectStyle')
        .append($('<option>').addClass('active').append(''))
        .append($('<option>').append('Xeyir'))
        .append($('<option>').append('Beli'))
        .append($('<option>').append('---')) ) )
      
        .append($('<div>').addClass('form-group col-md-4 patientSelectBox').append($('<label>').append('Səs batması'))
        .append($('<select>').addClass('noSearch selectStyle')
        .append($('<option>').addClass('active').append(''))
        .append($('<option>').append('Xeyir'))
        .append($('<option>').append('Beli'))
        .append($('<option>').append('---')) ) )

        .append($('<div>').addClass('form-group col-md-4 patientSelectBox').append($('<label>').append('Səsdə qalınlaşma'))
        .append($('<select>').addClass('noSearch selectStyle')
        .append($('<option>').addClass('active').append(''))
        .append($('<option>').append('Xeyir'))
        .append($('<option>').append('Beli'))
        .append($('<option>').append('---')) ) )

        .append($('<div>').addClass('form-group col-md-4 patientSelectBox').append($('<label>').append('Səsdə boğuqluq'))
        .append($('<select>').addClass('noSearch selectStyle')
        .append($('<option>').addClass('active').append(''))
        .append($('<option>').append('Xeyir'))
        .append($('<option>').append('Beli'))
        .append($('<option>').append('---')) ) )
    
        .append($('<div>').addClass('form-group col-md-4 patientSelectBox').append($('<label>').append('Səsdə Kobudluq'))
        .append($('<select>').addClass('noSearch selectStyle')
        .append($('<option>').addClass('active').append(''))
        .append($('<option>').append('Xeyir'))
        .append($('<option>').append('Beli'))
        .append($('<option>').append('---')) ) )
    
        .append($('<div>').addClass('form-group col-md-4 patientSelectBox').append($('<label>').append('Tənginəfəslik'))
        .append($('<select>').addClass('noSearch selectStyle')
        .append($('<option>').addClass('active').append(''))
        .append($('<option>').append('Xeyir'))
        .append($('<option>').append('Beli'))
        .append($('<option>').append('---')) ) )
    
        .append($('<div>').addClass('form-group col-md-4').append($('<label>').append('İzahat'))
        .append($('<input>').addClass('form-control  apd-form-input').attr('type','text').attr('id','')))
         
    
    
        patient.append(p); 
     }
    