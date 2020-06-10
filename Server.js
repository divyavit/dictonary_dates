var express = require('express');
var app = express();
let moment = require('moment');
var bodyParser = require('body-parser')
const router = express.Router();
app.engine('pug', require('pug').__express)
app.set('view engine','pug');
app.set('views','./views');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
let input_dict=[],actual_input = [],output_dict=[];

router.get('/', function (req, res) { 
   console.log("here");
   input_dict=[];
   output_dict=[];
   actual_input = []
   res.render('index',{ output:"",input:"", title:'app'});
});
router.post('/date', function (req, res) {
   console.log("yipee");
   //console.log(req.body);
   
   if(req.body.input_date!=undefined && req.body.value!=undefined && req.body.input_date!= {} && req.body.value!={}) {
      input_dict.push({
         key: req.body.input_date,
         value: parseInt(req.body.value)
      });
      actual_input.push({
         key: req.body.input_date,
         value: parseInt(req.body.value)
      });
      output_dict = findOutput(input_dict);
      
      //console.log(moment(input_dict[0].key,'YYYY-MM-DD').add(1,'day').format('YYYY-MM-DD'));
   }
   //console.log(input_dict);
   res.render('index',{ output:output_dict,input:actual_input, title:'app'});
})
function sortByProperty(property){  
   return function(a,b){  
      if(a[property] > b[property])  
         return 1;  
      else if(a[property] < b[property])  
         return -1;  
  
      return 0;  
   }  
}

function findOutput(input_dict) {
   output_dict = input_dict.sort(sortByProperty("key"));
   for(let i=0;i<output_dict.length-1;i++) {
      let first = moment(output_dict[i+1].key,'YYYY-MM-DD');
      let next = (moment(output_dict[i].key,'YYYY-MM-DD'));
      let diff = Math.abs(first.diff(next,'days'));
      let x;
      if(diff>1) {
         x = (parseInt(output_dict[i].value) + parseInt((output_dict[i+1].value) * diff) - parseInt(output_dict[i+1].value)) / diff;
         output_dict.push({
            key: moment(output_dict[i+1].key,'YYYY-MM-DD').subtract(1,'day').format('YYYY-MM-DD'),
            value: x
         });
         for(let j = 1;j<diff-1;j++) {
            //output_dict[moment(output_dict[i].key,'YYYY-MM-DD').add(j,'day').format('YYYY-MM-DD')] = ((diff - j) * x) -((diff-j-1) * output_dict[i+1].value);
            output_dict.push({
               key: moment(output_dict[i].key,'YYYY-MM-DD').add(j,'day').format('YYYY-MM-DD'),
               value: ((diff - j) * x) -((diff-j-1) * output_dict[i+1].value)
            });
         }
         output_dict.sort(sortByProperty("key"));
      }    
   } 
   return output_dict;
   }
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
exports.findOutput = findOutput;