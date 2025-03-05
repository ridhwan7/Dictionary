var slo;


console.log(slo);
function enter(){
    
     slo = document.getElementById("abcdefgh").value;
    
    
}



async function wrd(){
    
    
url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+slo;
let result = await fetch(url);
finalwrd= await result.json();

let word= finalwrd[0]["word"];
let phonetics = finalwrd[0]["phonetic"];

let meaning=finalwrd[0]["meanings"][0]["definitions"][0]["definition"];
let audio= finalwrd[0]["phonetics"][0]["audio"];
document.getElementById("Word").innerText=word;

document.getElementById("Phonetics").innerText=phonetics;
document.getElementById("Definition").innerText=meaning;

console.log(audio);



 if(Object.keys(audio).length == 0){
     
     document.getElementById("audio").style.visibility='hidden';
     document.getElementById("unavailable").style.visibility='visible';

    
   
}
if(Object.keys(audio).length > 0){
     document.getElementById("audio").style.visibility='visible';
     
     let audiosource =  document.getElementById("audio");
    
     audiosource.src=audio;
     document.getElementById("unavailable").style.visibility='hidden';
   
}

}




