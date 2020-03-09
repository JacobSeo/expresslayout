var dbConObj = require('../../../config/db_info');	//사용자 정의한 함수 사용
var dbconn = dbConObj.init();

var maindto = {
    //클럽목록
    list : function(req, res){
      	dbConObj.dbopen(dbconn);
      	var sql = 'select a.*,(select count(*) cnt from t_category where a.cate_no=cate_no) cnt from t_all_category a'; // 클럽목록
  	    dbconn.query(sql, function(err, results, field){
    			if(err){
    				console.log(err);
    				console.log("The query has problem");
    			}else{
    				console.log("succesfully");
    			}
    			//console.log(results);
    			/*
    			for(var i=0; i<results.length; i++){
    				for(var keyNm in results[i]){
    					console.log("key : "+keyNm+", value : "+ results[i][keyNm]);
    				}
    			}
    			*/
  	     res.render('main/main', {title : 'testData list ejs', clubList : results});
  	   });
    },
    detail : function(req, res){
      return{
              list : function(data, req, res){
                  var ele = data;
                  console.log("ele : " + ele);
              		dbConObj.dbopen(dbconn);
                	var sql = "select cate_title from t_all_category where cate_no =? ;";
                	var sql2 = "select a.cate_seq, (select z.user_nm from t_user z where a.cate_ownner = z.user_id ) as cate_ownner,a.cate_title,b.user_nm";
                	sql2+=" from t_category a, t_user b where a.user_id = b.user_id and a.cate_no=? group by a.user_id ;"; // 클럽목록
                		var cateTitle = "";
                		dbconn.query(sql+sql2,[ele, ele], function(err, rows, field){
            				if(err){
            					console.log(err);
            					console.log("The query has problem");
            				}else{
            					console.log("detail list succesfully : ", rows);
            				}

            				res.render('main/mainV', {title : "detail", data : rows[0], clubList : rows[1]});
                		});
              },
              view : function(req, res){
                var ele = data;
                dbConObj.dbopen(dbconn);
                var sql = "select b.user_nm from t_category a, t_user b where a.user_id = b.user_id and a.cate_no='"+ele+"'group by a.user_id"; // 클럽목록
                dbconn.query(sql, function(err, results, field){
                  if(err){
                    console.log(err);
                    console.log("The query has problem");
                  }else{
                    console.log("succesfully");
                  }
                  res.json({clubList : results});
                });
              }
          }
    }
};

module.exports = maindto;
