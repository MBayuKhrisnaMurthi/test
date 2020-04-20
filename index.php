<!doctype html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author"
	content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
<meta name="generator" content="Jekyll v3.8.6">
<title>Mini Project</title>

<!-- Bootstrap core CSS -->
<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
<link href="css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
<link href="css/dashboard.css" rel="stylesheet">

<meta name="theme-color" content="#563d7c">
<style>
.bd-placeholder-img {
	font-size: 1.125rem;
	text-anchor: middle;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

@media ( min-width : 768px) {
	.bd-placeholder-img-lg {
		font-size: 3.5rem;
	}
}
</style>

<!-- Custom styles for this template -->
</head>
<body>
<div class="card text-center" style="width : 500px">
  <div class="card-header bg-primary">Hi, Chalid</div>
  <div class="card-body">
  <div class="card-body text-center">
    <h6 class="card-title">Selamat Datang Di Xsis 2.0, silahkan pilih akses anda</h6>
  </div>
</div>
  <div class="card-footer">
  <div class="card-footer text-center">
  <h6 class="card-title">Footer</h6>
  </div>
     <p class="card-text">Some example text. Some example text.</p>
    <a th:href="@{/home}" class="card-link">Card link</a>
    <a th:href="@{/home}" class="card-link">Another link</a>
    </div>
</div>
</body>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/product-rest.js"></script>
<script src="js/swal.js"></script>
</html>