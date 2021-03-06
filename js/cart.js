$(document).ready(function(){
	
	load_cart_data();
    //load minicart
	function load_cart_data()
	{
		$.ajax({
			url:"./pages/main/fetch_minicart.php",
			method:"POST",
			dataType:"json",
			success:function(data)
			{
				$('#cart_details').html(data.cart_details);
				$('.badge').text(data.total_item);
			}
		});
	}

	$(document).on('click','#check_out_cart_notlogin',function(){
		alert("Bạn phải đăng nhập để xem chi tiết giỏ hàng");
	})

	//them gio hang
	$(document).on('click', '.add_to_cart', function(){
		var product_id = $(this).attr("id");
		var product_name = $('#name'+product_id+'').val();
		var product_image = $('#image'+product_id+'').attr('src');
		var product_price = $('#price'+product_id+'').val();
		var product_quantity = $('#quantity'+product_id).val();
		var product_soluong = $('#soluong'+product_id).val();
		var action = "add";
		if(product_quantity > 0)
		{
			$.ajax({
				url:"./pages/main/action.php",
				method:"POST",
				data:{product_id:product_id, product_name:product_name, product_image : product_image, product_price:product_price, product_quantity:product_quantity, product_soluong:product_soluong , action:action},
				success:function(data)
				{
					load_cart_data();
					alert("Sản phẩm đã được thêm vào giỏ hàng");
				}
			});
		}
		else
		{
			alert("Bạn chưa nhập số lượng cần mua vào sản phẩm");
		}
	});
	//xoa mini gio hang
	$(document).on('click', '.delete', function(){
		var product_id = $(this).attr("id");
		var action = 'remove';
		if(confirm("Bạn có chắc là muốn xóa sản phẩm này ?"))
		{
			$.ajax({
				url:"./pages/main/action.php",
				method:"POST",
				data:{product_id:product_id, action:action},
				success:function()
				{
					load_cart_data();
					alert("Sản phẩm đã được xóa khỏi giỏ hàng");
				}
			})
		}
		else
		{
			return false;
		}
	});

	//xoa mini gio hang thi xoa luon o gio hang
	$(document).on('click', '.delete', function(){  
		var product_id = $(this).attr("id");
		var action = "remove";  
		$.ajax({  
			url:"./pages/main/fetch_cart.php",
			method:"POST",  
			dataType:"json",  
			data:{product_id:product_id, action:action},  
			success:function(data){ 
				$('#order_table').html(data.order_table);  
				$('.badge').text(data.total_item);
			}  
		});  
   	});  

	//xoa het tat ca san pham o mini gio hang
	$(document).on('click', '#clear_cart', function(){
		var action = 'empty';
		if(confirm("Bạn có chắc là bạn muốn xóa ?")){
			$.ajax({
				url:"./pages/main/action.php",
				method:"POST",
				data:{action:action},
				success:function()
				{
					load_cart_data();
					alert("Giỏ hàng của bạn đã được xóa sạch");
				}
			});
		}
	});
	

	//xoa o gio hang
	$(document).on('click', '.deletecart', function(){  
		var product_id = $(this).attr("id");  
		var action = "removecart";  
		if(confirm("Bạn có chắc là muốn xóa sản phẩm này ?"))  
		{  
			 $.ajax({  
				  url:"./pages/main/fetch_cart.php",
				  method:"POST",  
				  dataType:"json",  
				  data:{product_id:product_id, action:action},  
				  success:function(data){ 
						alert("Sản phẩm đã được xóa khỏi giỏ hàng");
						$('#order_table').html(data.order_table);  
						$('.badge').text(data.total_item);
					}  
			 });  
		}  
		else  
		{  
			 return false;  
		}  
   });  

    //xoa o gio hang thi gio hang mini cung bi xoa
	$(document).on('click','.deletecart',function(){
		var product_id = $(this).data("product_id"); 
		var action = "removecart";  
		$.ajax({  
			url :"./pages/main/fetch_minicart.php",  
			method:"POST",  
			dataType:"json",  
			data:{product_id:product_id, action:action},  
			success:function(data){  
				load_cart_data();
			}  
		});
   })
   
   //thay doi so luong o gio hang
	$(document).on('keyup', '.quantity', function(){  
		var product_id = $(this).data("product_id");
		var product_soluong = $('#soluong'+product_id).val();
		if($('#quantity'+product_id).val() < 1 || $('#quantity'+product_id).val() == null ){
			$('#quantity'+product_id).val(1); 
		}
		if(parseInt($('#quantity'+product_id).val()) > parseInt($('#soluong'+product_id).val()) ){
			$('#quantity'+product_id).val($('#soluong'+product_id).val());
			
		} 
		var quantity = $('#quantity'+product_id).val();
		var action = "quantity_change";  
		if(quantity != '')  
		{  
			 $.ajax({  
				  url :"./pages/main/fetch_cart.php",  
				  method:"POST",  
				  dataType:"json",  
				  data:{product_id:product_id, quantity:quantity,product_soluong:product_soluong, action:action},  
				  success:function(data){  
					   $('#order_table').html(data.order_table);  
				  }  
			 });  
		}

   }); 
   //gio hang thay doi thi soluong o  mini cung thay doi
   $(document).on('change','.quantity',function(){
		var product_id = $(this).data("product_id"); 
		var quantity = $('.quantity').val();
		var action = "change_quantity";  
		$.ajax({  
			url :"./pages/main/fetch_minicart.php",  
			method:"POST",  
			dataType:"json",  
			data:{product_id:product_id, quantity:quantity, action:action},  
			success:function(){  
				load_cart_data();
			}  
		});
   })
});