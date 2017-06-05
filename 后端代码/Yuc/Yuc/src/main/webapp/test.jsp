<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="./resources/js/lib/sockjs.min.js"></script>
<script type="text/javascript" src="./resources/js/lib/stomp.min.js"></script>
<title>Insert title here</title>
</head>
<body>
	<button onclick="btn()">test</button>
</body>
<script>
		function btn(){
			$.ajax({
				type:"POST",
                url:"http://localhost:8080/Yuc/user/login",//路径  
                data:{
                	"json":"{'userName':'roo1','password':'root'}"
                },
                dataType:'json',
                success:function(result) {//返回数据根据结果进行相应的处理  
					alert(result);                
                }
			});
		}
		
	</script>
</html>