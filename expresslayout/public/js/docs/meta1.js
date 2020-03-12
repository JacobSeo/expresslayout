var meta = function(){
    function setSeq(val){
        return "<seq>"+val+"</seq>";
    }
    function setMetaId(val){
        return "<meta_id>"+val+"</meta_id>";
    }
    function setMetaNm(val){
        return "<meta_nm>"+val+"</meta_nm>";
    }
    function setMetaClob(val){
        var t = "<metaclob>";
        var val = JSON.parse(val);
        for(var key in val){ 
            if(key == 'custom'){
                t+="<custom>"+val[key]+"</custom>";
            }else if(key == 'lan'){
                t+="<language>"+val[key]+"</language>";
            }else if(key == 'own'){
                t+="<ownner>"+val[key]+"</ownner>";
            }else if(key == 'net'){
                t+="<brand>"+val[key]+"</brand>";
            }
        }

        t+="</metaclob>";
        return t;
    }

    function setCompanySeq(val){
        return "<companyseq>"+val+"</companyseq>";
    }
    function setCi(val){
        return "<ci>"+val+"</ci>";
    }
    function setUrl(val){
        return "<url>"+val+"</url>";
    }
    function setAddr(val){
        return "<address>"+val+"</address>";
    }
    function setBusiness(val){
        console.log("business " , val);
        var t = "<business>";
        var val = JSON.parse(val);
        for(var key in val){
            if(key == 'kinds'){
                t+="<kinds>"+val[key]+"</kinds>";
            }
        }
        t+="</business>";
        return t; 
    }

    function makeMeta(contents){
        var data = "<read1>";
        var len = contents.read1;
        for(var i=0; i<len.length; i++){
            for(var key in len[i]){
                if(key =='seq'){
                    data += setSeq(len[i][key]);
                }else if(key =='meta_id'){
                    data += setMetaId(len[i][key]);
                }else if(key =='meta_nm'){
                    data += setMetaNm(len[i][key]);
                }else if(key =='meta_clob'){
                    data += setMetaClob(len[i][key]);
                }
            }
        }
        data+="</read1>";
        return data;
    }

    function makeMeta2(contents){
        var data = "<read2>";
        var len = contents.read2;
        for(var i=0; i<len.length; i++){
            for(var key in len[i]){
                if(key =='company_seq'){
                    data += setCompanySeq(len[i][key]);
                }else if(key =='ci'){
                    data += setCi(len[i][key]);
                }else if(key =='url'){
                    data += setUrl(len[i][key]);
                }else if(key =='addr'){
                    data += setAddr(len[i][key]);
                }else if(key =='business'){
                    data += setBusiness(len[i][key]);
                }
            }
        }
        data+="</read2>";
        return data;
    }

    return {
        setData : function(contents){
            var allMeta = '<?xml version="1.0" encoding="UTF-8" ?>';
            allMeta +="<meta>";
            for(var i=0; i<contents.length; i++){
                for(var key in contents[i]){
                    if(key == 'read1'){
                        allMeta += makeMeta(contents[i]);
                    }else if(key == 'read2'){
                        allMeta += makeMeta2(contents[i]);
                    }
                }
            }allMeta +="</meta>";
            return allMeta;
        }
    }
}

module.exports=meta