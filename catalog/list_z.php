    <?php
    $search=trim($_GET["search"]);
    if ($_GET["sort"] == "h0") {$query = "SELECT id, name, full_name, img FROM zapravka ORDER BY full_name ";}
    elseif ($_GET["sort"] == "h1"){$query = "SELECT id, name, full_name, img FROM zapravka ORDER BY full_name DESC";}
    elseif ($_GET["search"] ){$query = "SELECT id, name, full_name, img FROM zapravka WHERE full_name LIKE '%$search%'";}
    else {$query = "SELECT id, name, full_name, img FROM zapravka ORDER BY full_name ";}
$result = mysqli_query($con, $query);
if ($check == 'ok'){
echo '<table>';
echo '<tr>';
echo '<td>';
echo '<div class="login-link">';
echo '<a href="/catalog/new.php?new=zapravka" class="tspt-btn">';
echo '<span>Добавить</span>';
echo '</a>';
echo '</div>';
echo '</td>';
echo '</tr>';
while($row = mysqli_fetch_array($result)){
echo '<tr>';
echo '<td>';
echo '<a class="white" href="/catalog/zapravka.php?name=',$row['name'],'">';
echo '<div class="img img-small">';
echo '<img src="/images/catalog/',$row['img'],'" alt="" height="50" width="50" />';
echo '</div>';
echo '<span>',$row['full_name'],'</span>';
echo '</a>';
echo '</td>';
echo '<td>';
echo '<a href="/catalog/edit.php?edit=zapravka&id=',$row['id'],'">Изменить</a>';
echo '</td>';
echo '<td>';
echo '<a href="/catalog/delete.php?del=zapravka&id=',$row['id'],'">Удалить</a>';
echo '</td>';
echo '</tr>';
    }
echo '</table>';    
}
else {
echo '<ul>';
while($row = mysqli_fetch_array($result)){
echo '<li>';
echo '<a class="white" href="/catalog/zapravka.php?name=',$row['name'],'">';
echo '<div class="img img-small">';
echo '<img src="/images/catalog/',$row['img'],'" alt="" height="50" width="50" />';
echo '</div>';
echo '<span>',$row['full_name'],'</span>';
echo '</a>';
echo '</li>';
    }
echo '</ul>';
}
    ?>
