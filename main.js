$(function(){
	var $donors = $('#donors');
	$.ajax({
		type:'GET',
		url;'/api/donors',
		success: function(donors){
			$.each(donors, function(i, donor){
				$donors.append('<li>name:'donor.name+',area:'+donor.area+'</li>');
			});
		},
		error: function(){
			alert('error loading donor');
		}
	});
});
$('#SubmitButton').on('click',function(){
	var dinor={
		name=$donorname.val();
		mobile=$mobile.val();
	};
	$ajax({
		type: 'POST',
		url: '/api/donors',
		data: donor,
		success: function(newDonor){
			$donors.append('<li>name: '+newDonor.name+',mobile: '+newDonor.moblie+'</li>');
		},
		error: function(){
			alert('error saving donor');
		}
	});
});