const inputZIP = document.querySelector("#input_CEP");
const inputStreet = document.querySelector("#input_logradouro");
const inputNumber = document.querySelector("#input_numero");
const inputCity = document.querySelector("#input_cidade");
const inputUF = document.querySelector("#input_uf");
const warning = document.querySelector("#warning");
const btnSubmit = document.querySelector("#btn_enviar");

const configs = {
  method: 'GET',
  headers: {}
} 


function codeZIP () {
  return parseInt(inputZIP.value);
}


function checkContent (isContent, inputValue){
  if(!isContent){
    return inputValue.value = "Sem conteúdo"
  }
  return inputValue.value = isContent;
}

inputZIP.addEventListener('keyup', () => {
  if (inputZIP.value.length === 8) {
    warning.classList.remove('visibled');

    url = `https://viacep.com.br/ws/${codeZIP()}/json/`;
   
    fetch(url, configs)
     .then((item)=>{
      const itemJSON = item.json();
      return itemJSON;
    })
    .then(item=> {
      getData(item).map(el => {
        if(el.input === inputNumber){
          el.data = `(${el.data})`
        }
        checkContent(el.data, el.input);
      });
    })
    .catch(e => {
      console.log("ERROR" + e);
    })
  }
})

inputZIP.addEventListener('blur', () =>{
  if(inputZIP.value.length !== 8 && inputZIP.value.length){
    warning.classList.add('visibled');
    warning.classList.remove('removed');

    btnSubmit.classList.add('disabled');
    btnSubmit.classList.remove('enabled')
  }
  else{
    warning.classList.remove('visibled');
    warning.classList.add('removed');

    btnSubmit.classList.remove('disabled');
    btnSubmit.classList.add('enabled')
  }
})

function getData(data) {
  const inforItem =[
    {
      data: data.logradouro,
      input: inputStreet
    },
    {
      data: data.ddd,  
      input: inputNumber
    },
    {
      data: data.localidade,
      input: inputCity 
    },
    {
      data: data.uf,
      input: inputUF
    }
  ]
  return inforItem;
}

