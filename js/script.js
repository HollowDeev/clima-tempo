// variaveis
const apikey = '50a464467f3d2a569c15d5e966eafc01'

const inputCidade = document.getElementById('input-cidade')
const pesquisarBtn = document.getElementById('pesquisar')
const climaDataContainer = document.getElementById('clima-data')
const carregamento = document.getElementById('carregando')

const nomeCidade = document.querySelector('#cidade')
const bandeiraPais = document.querySelector('#pais')
const temperatura = document.querySelector('#temperatura span')
const descricao = document.querySelector('#descricao')
const descicaoIcone = document.querySelector('#clima-icone')
const umidade = document.querySelector('#umidade span')
const vento = document.querySelector('#vento span')


// Funcoes
const pegarClimaData = async(cidade) => {
    const apiClimaURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${apikey}`

    const res = await fetch(apiClimaURL)
    const data = await res.json()
    return data

    
}

const mostrarClimaData = async (cidade) => {

    const data = await pegarClimaData(cidade)

    nomeCidade.innerText = data.name
    temperatura.innerText = parseInt(data.main.temp)
    descricao.innerText = data.weather[0].description
    descicaoIcone.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    umidade.innerText = `${data.main.humidity}%`
    vento.innerText = `${data.wind.speed} km/h`
    bandeiraPais.src = `https://flagsapi.com/${data.sys.country}/flat/24.png`

    climaDataContainer.classList.remove('escondido')
    carregamento.classList.add('escondido')
}


// Eventos
pesquisarBtn.addEventListener('click', (e) => {

    e.preventDefault()

    const cidade = inputCidade.value.toLowerCase()
    
    mostrarClimaData(cidade)

    inputCidade.value = ''

    carregamento.classList.remove('escondido')

})

inputCidade.addEventListener('keyup', (e) => {

    if (e.code === 'Enter') {
        const cidade = e.target.value 

        mostrarClimaData(cidade)

        inputCidade.value = ''
        carregamento.classList.remove('escondido')
    }

})