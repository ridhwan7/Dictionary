var slo;

function enter() {
    slo = document.getElementById("abcdefgh").value;
}

async function wrd() {
    // Get the word from the input
    enter();

    if (!slo || slo.trim() === "") {
        console.log("No word entered.");
        return;
    }

    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + slo;
    
    try {
        let result = await fetch(url);
        let finalwrd = await result.json();
         
        if (!finalwrd || finalwrd.length === 0) {
          
            console.log("Word not found.");
            return;
        }
         else{
        let word = finalwrd[0]["word"];
        
        let phonetics = finalwrd[0]["phonetic"] || "";
        let definitions = finalwrd[0]["meanings"][0]["definitions"];

        let meaning = definitions[1]?.definition || definitions[0]?.definition || "Definition not available";

        let audio = finalwrd[0]["phonetics"][0]?.audio || "";

        document.getElementById("Word").innerText = word;
        document.getElementById("err").style.visibility='hidden';
        if (phonetics) {
            document.getElementById("Phonetics").innerText = phonetics;
        }
        if (!phonetics) {
          document.getElementById("Phonetics").innerText = "Phonetics not available";
          document.getElementById("Phonetics").style.color="red";
       
          document.getElementById("Phonetics").style.fontSize="10px";
      }


        document.getElementById("Definition").innerText = meaning;

        console.log("Audio URL:", audio);

        let audioElement = document.getElementById("audio");
        let unavailableElement = document.getElementById("unavailable");

        if (!audio.trim()) {
            audioElement.style.visibility = 'hidden';
            unavailableElement.style.visibility = 'visible';
            
        } else {
            audioElement.style.visibility = 'visible';
            audioElement.src = audio;
            unavailableElement.style.visibility = 'hidden';
        }
     }
    } catch (error) {
     document.getElementById("err").style.visibility='visible';
      
     document.getElementById("Word").innerText = "---";
     document.getElementById("Phonetics").innerText = "---";
     document.getElementById("Definition").innerText = "Word does not Exist";
     document.getElementById("message").innerText = "Error fetching data: Word does not exist";
        console.log("Error fetching data:", error);
    }
    }

