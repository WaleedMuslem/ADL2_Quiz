let mathSum=0;
let computingSum=0;
let historySum=0;

let math= new Array();  
math[0]=1;
math[1]=2;
math[2]=3;
math[3]=4;
math[4]=5;

let computing = new Array();
computing[0]=1;
computing[1]=1;
computing[2]=1;
computing[3]=1;
computing[4]=1;
let history = new Array();
history[0]=1;
history[1]=1;
history[2]=1;
history[3]=1;
history[4]=1;

function sumMath(data){
    math.forEach(element => {
        if(data==element){
            mathSum++;
        }
    });
}
function sumComputing(data){
    computing.forEach(element => {
        if(data==element){
            mathSum++;
        }
    });
}

function sumHistory(data){
    history.forEach(element => {
        if(data==element){
            mathSum++;
        }
    });
}