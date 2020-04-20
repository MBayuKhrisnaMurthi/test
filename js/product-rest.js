

// initial variable action type default new
	let actionType='new';
	let pageNo=0,
		pageSize=5,
		sortBy='productId',
		sortType='asc';
	let variantId=0,categoryId=0;
	let apiUrlRest ='/api/product/fetchDto';
	let pageable = '?&pageNo='+pageNo+'&pageSize='+pageSize+'&sortBy='+sortBy+'&sortType='+sortType;
	let apiFilter = apiUrlRest+ pageable;
	
	// let wait until document ready, then show data
	$('document').ready(function(){
		loadData(apiFilter);
		
	});
	

	
	
	function loadData(apiUrl){
		$.ajax({
			url: apiUrl,
			type: 'get',
			contentType: 'application/json',
			success : (respond) =>{
				console.log(respond);
				generateTable(respond);
				
			},
			error:()=>{
				console.log('Failed to fetch data');
			}
		});
	}
	
	// *** These code below for Searching, FetchRow, Sorting ****//

	// create parameter filter for pagination
	function setFilter(pageNo,pageSize,sortBy,sortType){
		filter='?&pageNo='+pageNo+'&pageSize='+pageSize+'&sortBy='+sortBy+'&sortType='+sortType;
        return filter;
	}
	
	// trigger when input search keydown enter
	$("#inputSearch").on("keydown", function (e) {
		
        if (e.which == 13) {
			paramSearch = $('#searchBy').val();
            paramName = $("#inputSearch").val();
         //   alert(paramSearch);
            $.ajax({
				url : '/api/product/searchBy'+pageable+'&initial='+paramName+'&name='+paramName+'&description='+paramName,
				type : 'get',
				contentType : 'application/json',
				success: (respond) =>{
					//alert('Data has been save');
					generateTable(respond);
	
					
				},
				error:()=>{
					console.log('Failed to load data');
				}
			});   
        }
    });
	
	// trigger when button search click
	$("#btnSearch").click(function(e){
		 paramSearch = $('#searchBy').val();
         paramName = $("#inputSearch").val();
      //   alert(paramSearch);
         $.ajax({
				url : '/api/product/searchBy'+pageable+'&initial='+paramName+'&name='+paramName+'&description='+paramName,
				type : 'get',
				contentType : 'application/json',
				success: (respond) =>{
					//alert('Data has been save');
					generateTable(respond);
	
					
				},
				error:()=>{
					console.log('Failed to load data');
				}
			});   
		 
	 });
	
	// trigger when select fetch record change
	 $('#maxRows').change(function(e){
		 let maxrows = $("#maxRows option:selected").text();
		 if (maxrows === 'Show All') { 
			 maxrows=100;
		 }
       	 pageNo=0;
         pageSize=maxrows;
         sortBy='productId';
         sortType='asc';	
       	 loadData(apiFilter);
	 });
	 
	 // trigger when button sorting click, don't forget to add link fontawesome at <head> element
	 let btnSortType='asc';
	 $("#btnSort").click(function(){
		if (btnSortType === 'asc'){
			 $(this).find('span').removeClass('fa fa-sort-alpha-asc');
		     $(this).find('span').addClass('fa fa-sort-alpha-desc');	
		     btnSortType='desc';
        	
		}else{
			 $(this).find('span').removeClass('fa fa-sort-alpha-desc');
		     $(this).find('span').addClass('fa fa-sort-alpha-asc');
		     btnSortType='asc';
		}
		let maxrows = $("#maxRows option:selected").text();
		
		if (maxrows === 'Show All') {
			maxrows=100; 
		 }
		

		pageNo=0;
        pageSize=maxrows;
        sortBy='productId';
        sortType=btnSortType;	
        filter = setFilter(pageNo,pageSize,sortBy,sortType);
		//console.log(apiUrlRest+filter);
    	loadData(apiUrlRest+filter);

	});
	 
	 // pagination
	 $('#pagination li').click(function(){// search id pagination, then find li, then get text
			let pageNumber = $(this).text();
	 		// variabel pageNo already declare so let change it's value
			if (pageNumber === 'Previous'){
				pageNo=0;
			}else if (pageNumber === 'Next'){
				pageNo=4;
			}else{
				pageNo=pageNumber;
			}
			
			
			// let check how fetch record we goint to pick
			let maxrows = $("#maxRows option:selected").text();
			
			if (maxrows === 'Show All') {
				maxrows=100; 
			 }
			
			//pageNo=0;// variabel pageNo already declare so let change it's value
	        pageSize=maxrows;
	        sortBy='productId';
	        sortType=btnSortType;	
	    	loadData(apiFilter);

		});
	 
	// *** End of code for Searching, FetchRow, Sorting ****//
	
	// *** these code below for crud ***//
	
	 $("#btnNew").click(function(e){
			
		 actionType='new';
		$.ajax({
			url : '/rest/product/newModal',
			type : 'get',
			dataType: 'html',
			success: (response) =>{
				//console.log(response);
				//alert('Edit data');
				$('.modal-body').html(response);
				 getCategory();
				 $("#h3Title").text("Add Product");
				 $("#formAddEdit")[0].reset();
				$("#modalAdd").modal("show");
				
			},
			error:(err)=>{
				console.log(err);
				//alert('Data gagal tersimpan')
			}
		});
		
	}); 
	

	// create function to fetch category
	function getCategory(cateId){
        $.ajax({
            url: '/api/category/',
            type: 'get',
            contentType: "application/json",
            success: function (response) {

                
                 var optValue = "";
	           	 optValue += `<option value="">-Select-</option>`;
	           	 response.map((cate)=>{
	           		 optValue += `<option value = "${cate.id}">${cate.name}</option>`;
	           	 });
           	 
                $("#category").html(optValue);
               
            
            	//alert(cateId);
            	$('#category').val(cateId);   
            	 if (actionType==='edit'){
            		 $('#category').trigger('change'); 
            	 }
            	
               
                
            },
            error: function () {
               console.log('failed to fetch data')
            }
        });
    }
	//trigger when edit modal open then get value category
	function categoryChange(e){
        let cate = $("#category option:selected").val();
   		//alert(cate);
        $("#variant").empty(); // reset variant
       
        $.ajax({
            url: '/api/variant/editDto/'+cate,
            type: 'get',
            contentType: "application/json",
            success: function (result) {
            	
            	 var optValue = "";
            	 optValue += `<option value="">- Pilih -</option>`;
            	 result.map((vari)=>{
            		 optValue += `<option value = "${vari.varnId}">${vari.name}</option>`;
            	 });
            	 $('#variant').append(optValue);
            	 //tricky when clik edit button, we set variant
            	 if (actionType==='edit'){
                	 $('#variant').val(variantId);            		 
            	 }


            	
            },
            error: function () {
               console.log('error fetch data')
            }
        });
	}
	
	
	
	

	function saveAction(e){

		if (actionType === 'new'){
			insertData();
		}else{
			updateData();
		}
		event.preventDefault()
	}

	 
	 

 
	 function insertData() {

		 	let data ={
		 			
					initial : $("#initial").val() ,
					name : $("#name").val() ,
					description : $("#description").val(),
					price : $("#price").val(),
				    stock : $("#stock").val(),
					active: $("#active").is(':checked')=== true ? true : false,
				    varnId : $("#variant").val(),
				    varnName:'' ,// diberi null, sesuaikan sama attribute di dto
			        categoryId: $("#category").val(),
			        categoryName: '' // diberi null, sesuaikan sama attribute di dto
			}
		 	
		 	//alert(JSON.stringify(data));
		 	
			    $.ajax({
				url : '/api/product/saveDto',
				type : 'post',
				contentType : 'application/json',
				data: JSON.stringify(data),
				success: (respond) =>{
					//alert('Data has been save');
					
					$('#modalAdd').modal('hide');
					
					Swal.fire({
		           		  position: 'top-center',
		           		  icon: 'success',
		           		  width: 300,
		           		  title: 'Your work has been saved',
		           		  showConfirmButton: false,
		           		  timer: 1500
		           		});
					
					loadData(apiFilter);
					
					
				},
				error:()=>{
					console.log('Failed to save data');
				}
			});    
		};
		
		function updateData() {
			console.log('update data');
			let data ={
					productId : $("#productId").val(),
					initial : $("#initial").val() ,
					name : $("#name").val() ,
					description : $("#description").val(),
					price : $("#price").val(),
				    stock : $("#stock").val(),
					active: $("#active").is(':checked')=== true ? true : false,
				    varnId : $("#variant").val(),
				    varnName:'' ,// diberi null, sesuaikan sama attribute di dto
			        categoryId: $("#category").val(),
			        categoryName: '' // diberi null, sesuaikan sama attribute di dto
			}
			
			 console.log(JSON.stringify(data));
			  $.ajax({
				url : '/api/product/saveDto',
				type : 'put',
				contentType : 'application/json',
				data: JSON.stringify(data),
				success: (respond) =>{
					//alert('Data has been save');
					loadData();
					$('#modalAdd').modal('hide');
					
					Swal.fire({
		           		  position: 'top-center',
		           		  icon: 'success',
		           		  width: 300,
		           		  title: 'Your work has been saved',
		           		  showConfirmButton: false,
		           		  timer: 1500
		           		});
					
				},
				error:()=>{
					console.log('Failed to save data');
				}
			});  
		};

		function editAction(e){
			
			 actionType='edit';
			 $.ajax({
					url : '/rest/product/newModal',
					type : 'get',
					dataType: 'html',
					success: (response) =>{
						console.log(response);
						 
						  $.ajax({
								url : '/api/product/findProductByDto/'+e.value,
								type : 'get',
								contentType: 'application/json',
								success: (result) =>{
									//call result .modal-body first agar bisa diupdate element html nya
									console.log(result);
									
									$('.modal-body').html(response);
					
					 				// udpate value element tiap element html
								    $('#productId').val(result.productId);
						            $('#initial').val(result.initial)
						            $('#name').val(result.name)
						            $('#description').val(result.description)
						            $('#price').val(result.price)
						            $('#stock').val(result.stock)
						            if (result.active === true){
						            	$("#active").prop("checked", true);
						            }else{
						            	$("#active").prop("checked", false);
						            } 
						             
						            variantId=result.varnId;
						            console.log('variant : '+variantId);
						            categoryId= result.categoryId;		
						            console.log('category : '+categoryId);
						            getCategory(result.categoryId);
						            // not working, 
						            //$('#category').val(result.categoryId).trigger('change'); 
						          
						    		 $("#h3Title").text("Edit Product");
									$("#modalAdd").modal("show"); 

								},
								error:(err)=>{
									console.log(err);
									//alert('Data gagal tersimpan')
								}
							});  
						
					},
					error:(err)=>{
						console.log(err);
						//alert('Data gagal tersimpan')
					}
				});
			
		} 
	
	
 	function deleteAction(e){
		Swal.fire({
			  title: 'Are you sure?',
			  text: "You won't be able to revert this!",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
			  if (result.value) {
				
				  $.ajax({
						url : '/api/product/updateIsDelete/'+e.value,
						type : 'get',
						dataType: 'html',
						success: (response) =>{
							console.log(response);
							location.reload();
						},
						error:(err)=>{
							location.reload();
							//alert('Data gagal tersimpan')
						}
					});
			   
			  }
			})
	} 
	

	// generate table
	function generateTable(resdata){
		var tr;
		// jquery will search variant_body id
		$('#tbody-data').html('');
		 tbody = $('#tbody-data');
		 resdata.map((res)=>{
			 tr = $('<tr/>');
			 
			 var actions = '<div class="input-group-btn">' +
	         '            <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Action' +
	         '               </button>' +
	         '            <ul class="dropdown-menu">' +
	         '                <li onclick="editAction(this)" value='+res.productId+'><a href="#">Edit</a></li>' +
	         '                <li onclick="deleteAction(this)" value='+res.productId+'><a href="#">Delete</a></li>\n' +
	         '            </ul>\n' +
	         '        </div>';
	         
	         tr.append("<td>" + res.productId+ "</td>");
	         tr.append("<td>" + res.initial+ "</td>");
	         tr.append("<td>" + res.name+ "</td>");
	         tr.append("<td>" + res.description+ "</td>");
	         tr.append("<td>" + res.price+ "</td>");
	         tr.append("<td>" + res.stock+ "</td>");
	         tr.append("<td>" + res.active+ "</td>");
	         tr.append("<td>" + res.varnName+ "</td>");
	         tr.append("<td>" + res.categoryName+ "</td>");
	         tr.append("<td>" + actions+ "</td>");
	  
	
			
			
			
			$("#tbody-data").append(tr);
		}); 
	}

	