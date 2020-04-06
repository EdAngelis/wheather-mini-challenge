const router = require('express').Router();
const axios = require('axios');
const moment = require('moment');

API_URL = "https://api.openweathermap.org/data/2.5/onecall?lat=-9.66583&lon=-35.735279&appid=b6efaf6d8cb1fd413fa4350978c166c1"

router.get ('/', async (req, res, next) => {

  const badDays = [];
  var msg = 'Não vai dá praia nos seguintes dias: '
  
  await axios.get( API_URL)
  .then( response => {

    const data = response.data.daily;
    
    // Recolhendo data e humidade e adcionando para lista de dias ruins caso humidade maior de 70
    for (let i = 1; i < 6; i++) {
      
      const date = moment.unix(data[i].dt).format('dddd');
      const humidity = data[i].humidity;

      if ( humidity < 70 ){
        badDays.push(date);
      }
    
    }

    // Traduzindo os dias para o Portugues
    for (let i = 0; i < badDays.length; i++) {
      
      if      ( badDays[i] == 'Monday')    { badDays[i] = ' Segunda-Feira'}
      else if ( badDays[i] == 'Tuesday')   { badDays[i] = ' Terça-Feira'}
      else if ( badDays[i] == 'Wednesday') { badDays[i] = ' Quarta-Feira'}
      else if ( badDays[i] == 'Thursday')  { badDays[i] = ' Quinta-Feira'}
      else if ( badDays[i] == 'Friday')    { badDays[i] = ' Sexta-Feira'}
      else if ( badDays[i] == 'Saturday')  { badDays[i] = ' Sábado'}
      else                                 { badDays[i] = ' Domingo'}

      // Concatenando os dias ruins na menssagem Original, e verificando se é o último intem da lista
      // para saber se e para por , ou .
      if ( i == badDays.length - 1 ) {
        msg += `${badDays[i]}. `;
      }
      else {
        msg += `${badDays[i]}, `;
      }
      
    }

    // Enviando resultado 
    if ( badDays.length === 0 ){
      res.send( { msg : 'Os próximos 5 dias estão bons para praia.' } )
    }
    else{
      res.send( { msg : msg } )
    }  

  }).catch( error => {

    console.log(error);

  })
   
 });


module.exports = router;