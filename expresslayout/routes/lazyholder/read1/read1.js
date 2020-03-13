var dbConObj = require('../../../config/db_info');	//사용자 정의한 함수 사용
var dbconn = dbConObj.init();
const fs = require('fs');
var result = new Array();

function makeRead1(seq){
  //dbConObj.dbopen(dbconn);
  var sql = 'select seq, meta_id, meta_nm, meta_clob from t_meta'; // 클럽목록
  dbconn.query(sql, function(err, results, field){    
    var t ={};
    if(err){
      console.log(err);
      console.log("The query has problem");
    }else{
      var parsed = JSON.parse(JSON.stringify(results));
      //console.log("makeRead1 succesfully : ", parsed);
    }
    t.read1 =  parsed;
    result.push(t);
    
    makeRead2(seq);
  });
}

function makeRead2(seq){
  //dbConObj.dbopen(dbconn);
  var sql = 'select company_seq,ci,url,addr,business from t_company_info where company_seq =?'; // 클럽목록
  dbconn.query(sql, [seq],function(err, results, field){    
    var t = {};
    if(err){
      console.log(err);
      console.log("The query has problem");
    }else{
      //console.log("makeRead2 succesfully : ", results);      
      var parsed = JSON.parse(JSON.stringify(results));
    }
    t.read2 =  parsed;
    result.push(t);

    makeMeta();
  });  
}

function makeMeta(){   
  dbConObj.release;
  require('date-utils');
  var newDate = new Date();
  var time = newDate.toFormat('YYYY-MM-DD_HH24MISS');

  var meta = require('../../../public/js/docs/meta1.js');  
  var contents = '';
  //console.log("result : ",result);
  /*
  var read1Len = result.read1;  
  for(var i=0; i<read1Len.length; i++){
    for ( var keyNm in read1Len[i]) {
      //console.log("key : " + keyNm + ", value : " + read1Len[i][keyNm]);      
      contents += meta().setData(keyNm, read1Len[i][keyNm]);
    }
  }
  */

  contents += meta().setData(result);

  var filename = time+".xml";
  fs.writeFile('./public/file/'+filename,contents, 'utf8', function(err){
      if(err){
        throw err;
      }      
      result = new Array();
      console.log(filename + 'wirteFile OK');
  });  
}

module.exports.read1 = function(seq){
    makeRead1(seq); 
}
