<?php
/*配置文件*/
    error_reporting(E_ALL ^E_DEPRECATED);
    date_default_timezone_set("PRC");

    $link = mysql_connect('localhost','root','971115577') or die('连接数据库失败！！！'.mysql_error());

    mysql_query('set names utf8');
    mysql_query('use BBS') or die('打开数据库失败！！！'.mysql_error());