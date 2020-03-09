<script>
$(function(){
    $('.ulli').click(function(){
      var seq = $(this).data('seq');
        location.href="/main/detail/list/"+seq;
    });

    $('#gosave').click(function(){
        var obj = new Object();
    		obj['select'] = $('#select').val();
    		obj['user_id'] = $('#user_id').val();
    		obj['user_nm'] = $('#user_nm').val();

    		$.ajax({
    			url: "/main/insert/ajax",
    			type: "POST",
    			data : {data : obj},
    			dataType: "json",
    			success:function(data){
    				var contents = data['data'];
    				alert(contents);
            location.href="/main";
    			}
    		});
    });

    $('#golazyholder').click(function(){
      $.ajax({
        url: "/lazyholder",
        type: "get",
        data : {data : 1},
        dataType: "json",
        success:function(data){
          
        }
      });
    });
});
</script>
