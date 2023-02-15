import "./css/app.css";
import {
  BiBookAlt as Libro,
  BiMoon as Luna,
  BiSearchAlt2 as Lupa,
} from "react-icons/bi";
import { useState } from "react";
import Result from "./components/Result";

function App() {
  const [search, setSearch] = useState([
    { shortdef: ["Person or thing worthy of being imitated for its good qualities."] }
  ]);

  const searchWord = (e) => {
    e.preventDefault();
    const word = document.querySelector(".form__input").value;
    if (word.trim().length !== 0) {
      fetch(
        `https://www.dictionaryapi.com/api/v3/references/sd2/json/${word}?key=d11cf466-79c2-40fc-9fc5-4e4877ee271a`
      )
        .then((response) => response.json())
        .then((json) => {
          setSearch(json)
        })
        .catch((error) => console.log(error));
    } else {
      setSearch([])
    }
  };

  const translate = async (text) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", "en");
    encodedParams.append("target_language", "es");
    encodedParams.append("text", text);

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '7f4c46c045msh96853366662a461p1180eajsn5dcaddc319ea',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      body: encodedParams
    };

    try {
      const response = await fetch('https://text-translator2.p.rapidapi.com/translate', options)
      const json = await response.json()
      return json;
    } catch (err) {
      console.log(err);
    }
  }

  const definitionsTranslate = () => {
    const words = document.querySelectorAll('.resultado__h2')
    const word = document.querySelector('.resultado__h2').textContent
    const wordSpanish = translate(word)
    words.forEach(x => {
      wordSpanish.then(result => {
        x.textContent = result.data.translatedText
      })
    })

    const definitions = document.querySelectorAll('.resultado__p')
    definitions.forEach(x => {
      const spanish = translate(x.textContent)
      spanish.then(result => {
        x.textContent = result.data.translatedText
      })
    })
  }

  const elements = document.querySelectorAll('html')
  const changeFont = (e) => {
    const font = e.target.value;
    elements.forEach(x => {
      x.style.fontFamily = font
    })
  }

  const changeBackground = () => {
    document.querySelector("html").classList.toggle('backgroundDark')
    document.querySelector('.header__letra').classList.toggle('colorDark')
    document.querySelector('.form__input').classList.toggle('buscadorDark')
    document.querySelector('.container-dark__luna').classList.toggle('lunaDark')
    document.querySelector('.header__linea').classList.toggle('header__lineaDark')
    if (search.length > 0) {
      document.querySelectorAll(".resultado__p").forEach(x => {
        x.classList.toggle('resultado__pDark')
      })
      document.querySelectorAll('.resultado__linea').forEach(x => {
        x.classList.toggle('lineaDark')
      })
    }
  }

  return (
    <div className="contenedor">
      <header className="header">
        <div className="header__icon">
          <Libro />
        </div>
        <select className="header__letra" onChange={changeFont}>
          <option className="letra__opcion" value="Serif">
            Serif
          </option>
          <option className="letra__opcion" value="Sans Serif">
            Sans Serif
          </option>
          <option className="letra__opcion" value="Times New Roman">
            Times New Roman
          </option>
          <option className="letra__opcion" value="Segoe UI">Defecto</option>
        </select>
        <div className="header__linea"></div>
        <div className="header__container-dark">
          <div className="container-dark__darkmode">
            <input id="darkmode__check" type="checkbox" onChange={changeBackground} />
            <label htmlFor="darkmode__check"></label>
          </div>
          <div className="container-dark__luna" >
            <Luna />
          </div>
        </div>
      </header>
      <div className="buscador">
        <form className="buscador__form">
          <input className="form__input" placeholder="Type a word..." type="search" />
          <button className="form__buscar" type="submit" onClick={searchWord}>
            <Lupa />
          </button>
        </form>
      </div>
      {
        search.length > 0
          ?
          <button className="traducir" onClick={definitionsTranslate}>Traducir</button>
          :
          <></>
      }

      <div className="resultados">
        {search.length > 0
          ? (
            search.map((result, index) => {
              return (
                <Result
                  key={index}
                  word={document.querySelector('.form__input') ? document.querySelector('.form__input').value : "Example"}
                  definition={result.shortdef[0]}
                />
              );
            })
          )
          : (
            <></>
          )}
      </div>
    </div>
  );
}

export default App;
