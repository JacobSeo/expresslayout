var dbConObj = require('../../../config/db_info');	//사용자 정의한 함수 사용
var dbconn = dbConObj.init();

var maindto = {
  insert : function(req, res){
      dbConObj.dbopen(dbconn);
      var sql = 'select * from t_all_category'; // 클럽목록
      dbconn.query(sql, function(err, results, field){
        if(err){
          console.log(err);
          console.log("The query has problem");
        }else{
          console.log("succesfully");
        }
        res.render('main/mainI', {title : "insert", data:"insert page", cateList : results});
      });
  },
  insertDB : function(data, req, res){
      var sql = "select cate_title from t_all_category where cate_no='"+data['select']+"'"; // 클럽목록
      dbconn.query(sql, function(err, results, field){
        if(err){
          console.log(err);
          console.log("The query has problem");
        }else{
          console.log("succesfully");
        }

        _title(results);

      });

      var _title = function(val){
      var cate_title = "";
        for(var i=0; i<val.length; i++){
          cate_title = val[i]['cate_title'];
          break;
        }

        var sql = 'INSERT INTO t_category(cate_no, cate_title, cate_ownner, cate_level, user_id)VALUES(?,?,?,?,?)';
        var params = [data['select'], cate_title, '1','1',data['user_id']];
        dbconn.query(sql,params,function(err,rows,fields) {
          if(err){
            console.log(err);
          }else{
            console.log(rows.insertId);
          }
        });

        var sql = 'INSERT INTO t_user(user_id, user_nm, user_pw)VALUES(?,?,?)';
        var params = [data['user_id'], data['user_nm'], ''];
        dbconn.query(sql,params,function(err,rows,fields) {
          if(err){
            console.log(err);
          }else{
            console.log(rows.insertId);
          }
        });
      }
    res.json({data : "succes save"});
  }
};

module.exports = maindto;
