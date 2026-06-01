import { Question, Country } from './types';

export const countriesData: Country[] = [
  // Западная Азия
  { country: "Азербайджан", capital: "Баку", region: "Западная Азия" },
  { country: "Армения", capital: "Ереван", region: "Западная Азия" },
  { country: "Грузия", capital: "Тбилиси", region: "Западная Азия" },
  { country: "Израиль", capital: "Иерусалим", region: "Западная Азия" },
  { country: "Иордания", capital: "Амман", region: "Западная Азия" },
  { country: "Ирак", capital: "Багдад", region: "Западная Азия" },
  { country: "Иран", capital: "Тегеран", region: "Западная Азия" },
  { country: "Йемен", capital: "Сана", region: "Западная Азия" },
  { country: "Катар", capital: "Доха", region: "Западная Азия" },
  { country: "Кипр", capital: "Никосия", region: "Западная Азия" },
  { country: "Кувейт", capital: "Эль-Кувейт", region: "Западная Азия" },
  { country: "Ливан", capital: "Бейрут", region: "Западная Азия" },
  { country: "ОАЭ", capital: "Абу-Даби", region: "Западная Азия" },
  { country: "Оман", capital: "Маскат", region: "Западная Азия" },
  { country: "Палестина", capital: "Рамалла", region: "Западная Азия" },
  { country: "Саудовская Аравия", capital: "Эр-Рияд", region: "Западная Азия" },
  { country: "Сирия", capital: "Дамаск", region: "Западная Азия" },
  { country: "Турция", capital: "Анкара", region: "Западная Азия" },
  { country: "Бахрейн", capital: "Манама", region: "Западная Азия" },
  
  // Западная Европа
  { country: "Австрия", capital: "Вена", region: "Западная Европа" },
  { country: "Андорра", capital: "Андорра-ла-Велья", region: "Западная Европа" },
  { country: "Бельгия", capital: "Брюссель", region: "Западная Европа" },
  { country: "Великобритания", capital: "Лондон", region: "Западная Европа" },
  { country: "Германия", capital: "Берлин", region: "Западная Европа" },
  { country: "Ирландия", capital: "Дублин", region: "Западная Европа" },
  { country: "Испания", capital: "Мадрид", region: "Западная Европа" },
  { country: "Италия", capital: "Рим", region: "Западная Европа" },
  { country: "Лихтенштейн", capital: "Вадуц", region: "Западная Европа" },
  { country: "Люксембург", capital: "Люксембург", region: "Западная Европа" },
  { country: "Монако", capital: "Монако", region: "Западная Европа" },
  { country: "Нидерланды", capital: "Амстердам", region: "Западная Европа" },
  { country: "Португалия", capital: "Лиссабон", region: "Западная Европа" },
  { country: "Сан-Марино", capital: "Сан-Марино", region: "Западная Европа" },
  { country: "Франция", capital: "Париж", region: "Западная Европа" },
  { country: "Швейцария", capital: "Берн", region: "Западная Европа" },
  { country: "Ватикан", capital: "Ватикан", region: "Западная Европа" }
];

export const regionsList = [
  ...Array.from(new Set(countriesData.map(c => c.region)))
];

export function generateQuestions(region: string | 'ALL'): Question[] {
  let selected = countriesData;
  if (region !== 'ALL') {
    selected = countriesData.filter(c => c.region === region);
  }
  
  // Копируем и перемешиваем выбранные страны, берем их все для теста
  const shuffledCountries = [...selected].sort(() => 0.5 - Math.random());

  return shuffledCountries.map(countryItem => {
    const correctCapital = countryItem.capital;
    
    // Создаем массив с неправильными столицами
    const wrongCapitals = countriesData
      .filter(c => c.capital !== correctCapital)
      .map(c => c.capital)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
      
    // Добавляем правильный ответ и перемешиваем варианты
    const options = [correctCapital, ...wrongCapitals].sort(() => 0.5 - Math.random());
    
    return {
      country: countryItem.country,
      correctCapital: correctCapital,
      options: options
    };
  });
}
