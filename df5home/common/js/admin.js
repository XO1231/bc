function btnClick($url) {
    location.href = $url;
}

function delBonus(bid) {
    if(confirm("确定要删除此礼品吗？")){
        location.href = 'bonus.php?action=del&bid='+bid;
    }
}

function gradeDel(gid) {
    if (confirm("确定要删除此等级吗？")) {
        location.href = 'grade.php?action=del&gid=' + gid;
    }
}

function orderDel(oid) {
    if (confirm("确定要删除此订单吗？")) {
        location.href = 'order.php?action=del&oid=' + oid;
    }
}

function adminDel(aid) {
    console.log(aid);
    if (confirm("确定要删除此管理员吗？")) {
        location.href = 'admin.php?action=del&aid=' + aid;
    }
}
function orderLogDel(olid) {
    if (confirm("确定要删除吗？")) {
        location.href = 'orderLog.php?action=del&olid=' + olid;
    }
}

function oneKeySend($url) {
    if (confirm("你确定要一键派送查询到的中奖会员吗？")) {
        location.href = $url;
    }
}

function export_excel($url) {
    location.href = $url;
}