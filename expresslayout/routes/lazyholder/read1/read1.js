var dbConObj = require('../../../config/db_info');	//사용자 정의한 함수 사용
var dbconn = dbConObj.init();

function returnData(data){
    console.log("data : " + data);
    module.exports=data;
}

module.exports.read1 = function(){
  dbConObj.dbopen(dbconn);
  var sql = 'select seq, meta_id, meta_nm, meta_clob from t_meta'; // 클럽목록
  dbconn.query(sql, function(err, results, field){
    if(err){
      console.log(err);
      console.log("The query has problem");
    }else{
      console.log("succesfully : ", results);
    }
    returnData(results);
  });
}
/*
module.exports = {
    read1(seq){
      dbConObj.dbopen(dbconn);
      var sql = 'select seq, meta_id, meta_nm, meta_clob from t_meta'; // 클럽목록
      dbconn.query(sql, function(err, results, field){
        if(err){
          console.log(err);
          console.log("The query has problem");
        }else{
          console.log("succesfully");
        }
        return results;
      });
    }

};
*/
