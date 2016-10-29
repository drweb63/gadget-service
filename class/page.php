<?php
class Page{
    public $text;

    public function get_body($text, $file)
    {
        ob_start();
        $kartridzhi = "./catalog/list_k.php";
        $zapravki = "./catalog/list_z.php";
        $news = "./tpl/news.tpl";
        include "./check.php";
        include "./tpl/head.tpl";
        include "./tpl/nologin.tpl";
        include "./tpl/menu.tpl";
        include "./tpl/contacts_main.tpl";
        include "./tpl/" . $file . ".tpl";
        include "./tpl/footer.tpl";
        return ob_get_clean();
    }
}
?>