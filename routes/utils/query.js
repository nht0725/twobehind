var mysql = require('mysql');
var opt = {
    user: 'root',
    password: 'root',
    database: 'nht',
    connectLimit: 100
}

var pool = mysql.createPool(opt);
module.exports = function(sql, arr, ck) {
    pool.getConnection(function(err, con) {
        if (err) {
            return ck && ck(err);
        }
        con.query(sql, arr, function(err, result) {
            if (err) {
                return ck && ck(err);
            }
            ck && ck(null, result);
            con.release();
        })
    })
}