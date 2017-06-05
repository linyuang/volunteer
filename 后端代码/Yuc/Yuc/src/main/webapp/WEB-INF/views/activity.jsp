<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type=text/javascript
		src=./resources/js/lib/jquery-3.2.1.js></script>
<title>Insert title here</title>
</head>
<body>
	<div class="spittleView">
      <div class="spittleMessage"><c:out value="${activity.name}" /></div>
      <div>
        <span class="spittleTime"><c:out value="${activity.address}" /></span>
      </div>
    </div>
</body>
</html>