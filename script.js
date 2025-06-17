const btn = document.getElementById('random-btn');
const card = document.getElementById('cocktail-card');

let firstClick = true;

btn.addEventListener('click', () => {
  if (firstClick) {
    // Primo click → Royal Bitch
    fetchCocktailByName('royal bitch');
    firstClick = false;
  } else {
    // Click successivi → Random cocktail
    fetchRandomCocktail();
  }
});

function fetchCocktailByName(name) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`)
    .then(res => res.json())
    .then(data => {
      const drink = data.drinks[0];
      displayCocktail(drink);
      card.style.display = 'block';
    })
    .catch(err => {
      console.error('Errore nel fetch di Royal Bitch:', err);
    });
}

function fetchRandomCocktail() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
      const drink = data.drinks[0];
      displayCocktail(drink);
      card.style.display = 'block';
    })
    .catch(err => {
      console.error('Errore nel fetch:', err);
      alert('https://aazurich.org/');
    });
}

function displayCocktail(cocktail) {
  document.getElementById('cocktail-name').textContent = cocktail.strDrink;

  const imgEl = document.getElementById('cocktail-img');
  imgEl.src = cocktail.strDrinkThumb;
  imgEl.alt = cocktail.strDrink;

  document.getElementById('cocktail-category').textContent = cocktail.strCategory || 'N/A';
  document.getElementById('cocktail-instructions').textContent = cocktail.strInstructions || 'Nessuna istruzione disponibile.';

  const ul = document.getElementById('cocktail-ingredients');
  ul.innerHTML = '';

  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient) {
      const li = document.createElement('li');
      li.textContent = measure ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim();
      ul.appendChild(li);
    } else {
      break;
    }
  }
}
