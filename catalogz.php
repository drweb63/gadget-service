<?php
include "/class/page.php";
$page=new Page();
$text='zapravka';
echo $page->get_body($text, 'catalogz');
?>