<?php
 chdir(dirname(__FILE__));include "../../../developerTools/jsPacker/class.JavaScriptPacker.php";include "../../../developerTools/jsPacker/jsPacker.php";$v0f635d0e0f3874fff8b581c132e6c7a7 = @simplexml_load_file('compress.xml');if (!$v0f635d0e0f3874fff8b581c132e6c7a7) {die('// No valid source for packer');}$v1ae02e84bc3aada5be57087069ecb637 = ((string)$v0f635d0e0f3874fff8b581c132e6c7a7->pack['path']);$v45b963397aa40d4a0063e0d85e4fe7a1 = array();foreach($v0f635d0e0f3874fff8b581c132e6c7a7->pack->file as $v8ce4b16b22b58894aa86c421e8759df3=>$v9e3669d19b675bd57058fd4664205d2a) {$v45b963397aa40d4a0063e0d85e4fe7a1[] = (string)$v9e3669d19b675bd57058fd4664205d2a['path'];}$v0b0f137f17ac10944716020b018f8126 = new jsPacker($v45b963397aa40d4a0063e0d85e4fe7a1);$v0b0f137f17ac10944716020b018f8126->pack($v1ae02e84bc3aada5be57087069ecb637, isset($_REQUEST['compress']));?>
