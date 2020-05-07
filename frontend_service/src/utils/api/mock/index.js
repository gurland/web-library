export function getAuthors(query = '') {
  return ['Тарас Шевченко', 'Михайло Коцюбинський', 'Микола Гоголь', 'Лесь Подервянський', 'Говно Говно'];
}

export function getGenres() {
  return [
    {
      "group_1": {
        "title": "Фантастика (Научная фантастика и Фэнтези)",
        "genres": [
          {
            "code": "sf_history",
            "rus": "Альтернативная история"
          },
          {
            "code": "sf_action",
            "rus": "Боевая фантастика"
          },
          {
            "code": "sf_epic",
            "rus": "Эпическая фантастика"
          },
          {
            "code": "sf_heroic",
            "rus": "Героическая фантастика"
          },
          {
            "code": "sf_detective",
            "rus": "Детективная фантастика"
          },
          {
            "code": "sf_cyberpunk",
            "rus": "Киберпанк"
          },
          {
            "code": "sf_space",
            "rus": "Космическая фантастика"
          },
          {
            "code": "sf_social",
            "rus": "Социально-психологическая фантастика"
          },
          {
            "code": "sf_horror",
            "rus": "Ужасы и Мистика"
          },
          {
            "code": "sf_humor",
            "rus": "Юмористическая фантастика"
          },
          {
            "code": "sf_fantasy",
            "rus": "Фэнтези"
          },
          {
            "code": "sf",
            "rus": "Научная Фантастика"
          }
        ]
      },
      "group_2": {
        "title": "Детективы и Триллеры",
        "genres": [
          {
            "code": "det_classic",
            "rus": "Классический детектив"
          },
          {
            "code": "det_police",
            "rus": "Полицейский детектив"
          },
          {
            "code": "det_action",
            "rus": "Боевик"
          },
          {
            "code": "det_irony",
            "rus": "Иронический детектив"
          },
          {
            "code": "det_history",
            "rus": "Исторический детектив"
          },
          {
            "code": "det_espionage",
            "rus": "Шпионский детектив"
          },
          {
            "code": "det_crime",
            "rus": "Криминальный детектив"
          },
          {
            "code": "det_political",
            "rus": "Политический детектив"
          },
          {
            "code": "det_maniac",
            "rus": "Маньяки"
          },
          {
            "code": "det_hard",
            "rus": "Крутой детектив"
          },
          {
            "code": "thriller",
            "rus": "Триллер"
          },
          {
            "code": "detective",
            "rus": "Детектив (не относящийся в прочие категории)."
          }
        ]
      },
      "group_3": {
        "title": "Проза",
        "genres": [
          {
            "code": "prose_classic",
            "rus": "Классическая проза"
          },
          {
            "code": "prose_history",
            "rus": "Историческая проза"
          },
          {
            "code": "prose_contemporary",
            "rus": "Современная проза"
          },
          {
            "code": "prose_counter",
            "rus": "Контркультура"
          },
          {
            "code": "prose_rus_classic",
            "rus": "Русская классическая проза"
          },
          {
            "code": "prose_su_classics",
            "rus": "Советская классическая проза"
          }
        ]
      },
      "group_4": {
        "title": "Любовные романы",
        "genres": [
          {
            "code": "love_contemporary",
            "rus": "Современные любовные романы"
          },
          {
            "code": "love_history",
            "rus": "Исторические любовные романы"
          },
          {
            "code": "love_detective",
            "rus": "Остросюжетные любовные романы"
          },
          {
            "code": "love_short",
            "rus": "Короткие любовные романы"
          },
          {
            "code": "love_erotica",
            "rus": "Эротика"
          }
        ]
      },
      "group_5": {
        "title": "Приключения",
        "genres": [
          {
            "code": "adv_western",
            "rus": "Вестерн"
          },
          {
            "code": "adv_history",
            "rus": "Исторические приключения"
          },
          {
            "code": "adv_indian",
            "rus": "Приключения про индейцев"
          },
          {
            "code": "adv_maritime",
            "rus": "Морские приключения"
          },
          {
            "code": "adv_geo",
            "rus": "Путешествия и география"
          },
          {
            "code": "adv_animal",
            "rus": "Природа и животные"
          },
          {
            "code": "adventure",
            "rus": "Прочие приключения (то, что не вошло в другие категории)"
          }
        ]
      },
      "group_6": {
        "title": "Детское",
        "genres": [
          {
            "code": "child_tale",
            "rus": "Сказка"
          },
          {
            "code": "child_verse",
            "rus": "Детские стихи"
          },
          {
            "code": "child_prose",
            "rus": "Детскиая проза"
          },
          {
            "code": "child_sf",
            "rus": "Детская фантастика"
          },
          {
            "code": "child_det",
            "rus": "Детские остросюжетные"
          },
          {
            "code": "child_adv",
            "rus": "Детские приключения"
          },
          {
            "code": "child_education",
            "rus": "Детская образовательная литература"
          },
          {
            "code": "children",
            "rus": "Прочая детская литература (то, что не вошло в другие категории)"
          }
        ]
      },
      "group_7": {
        "title": "Поэзия, Драматургия",
        "genres": [
          {
            "code": "poetry",
            "rus": "Поэзия"
          },
          {
            "code": "dramaturgy",
            "rus": "Драматургия"
          }
        ]
      },
      "group_8": {
        "title": "Старинное",
        "genres": [
          {
            "code": "antique_ant",
            "rus": "Античная литература"
          },
          {
            "code": "antique_european",
            "rus": "Европейская старинная литература"
          },
          {
            "code": "antique_russian",
            "rus": "Древнерусская литература"
          },
          {
            "code": "antique_east",
            "rus": "Древневосточная литература"
          },
          {
            "code": "antique_myths",
            "rus": "Мифы. Легенды. Эпос"
          },
          {
            "code": "antique",
            "rus": "Прочая старинная литература (то, что не вошло в другие категории)"
          }
        ]
      },
      "group_9": {
        "title": "Наука, Образование",
        "genres": [
          {
            "code": "sci_history",
            "rus": "История"
          },
          {
            "code": "sci_psychology",
            "rus": "Психология"
          },
          {
            "code": "sci_culture",
            "rus": "Культурология"
          },
          {
            "code": "sci_religion",
            "rus": "Религиоведение"
          },
          {
            "code": "sci_philosophy",
            "rus": "Философия"
          },
          {
            "code": "sci_politics",
            "rus": "Политика"
          },
          {
            "code": "sci_business",
            "rus": "Деловая литература"
          },
          {
            "code": "sci_juris",
            "rus": "Юриспруденция"
          },
          {
            "code": "sci_linguistic",
            "rus": "Языкознание"
          },
          {
            "code": "sci_medicine",
            "rus": "Медицина"
          },
          {
            "code": "sci_phys",
            "rus": "Физика"
          },
          {
            "code": "sci_math",
            "rus": "Математика"
          },
          {
            "code": "sci_chem",
            "rus": "Химия"
          },
          {
            "code": "sci_biology",
            "rus": "Биология"
          },
          {
            "code": "sci_tech",
            "rus": "Технические науки"
          },
          {
            "code": "science",
            "rus": "Прочая научная литература (то, что не вошло в другие категории)"
          }
        ]
      },
      "group_10": {
        "title": "Компьютеры и Интернет",
        "genres": [
          {
            "code": "comp_www",
            "rus": "Интернет"
          },
          {
            "code": "comp_programming",
            "rus": "Программирование"
          },
          {
            "code": "comp_hard",
            "rus": "Компьютерное \"железо\" (аппаратное обеспечение)"
          },
          {
            "code": "comp_soft",
            "rus": "Программы"
          },
          {
            "code": "comp_db",
            "rus": "Базы данных"
          },
          {
            "code": "comp_osnet",
            "rus": "ОС и Сети"
          },
          {
            "code": "computers",
            "rus": "Прочая околокомпьтерная литература (то, что не вошло в другие категории)"
          }
        ]
      },
      "group_11": {
        "title": "Справочная литература",
        "genres": [
          {
            "code": "ref_encyc",
            "rus": "Энциклопедии"
          },
          {
            "code": "ref_dict",
            "rus": "Словари"
          },
          {
            "code": "ref_ref",
            "rus": "Справочники"
          },
          {
            "code": "ref_guide",
            "rus": "Руководства"
          },
          {
            "code": "reference",
            "rus": "Прочая справочная литература (то, что не вошло в другие категории)"
          }
        ]
      },
      "group_12": {
        "title": "Документальная литература",
        "genres": [
          {
            "code": "nonf_biography",
            "rus": "Биографии и Мемуары"
          },
          {
            "code": "nonf_publicism",
            "rus": "Публицистика"
          },
          {
            "code": "nonf_criticism",
            "rus": "Критика"
          },
          {
            "code": "design",
            "rus": "Искусство и Дизайн"
          },
          {
            "code": "nonfiction",
            "rus": "Прочая документальная литература (то, что не вошло в другие категории)"
          }
        ]
      },
      "group_13": {
        "title": "Религия и духовность",
        "genres": [
          {
            "code": "religion_rel",
            "rus": "Религия"
          },
          {
            "code": "religion_esoterics",
            "rus": "Эзотерика"
          },
          {
            "code": "religion_self",
            "rus": "Самосовершенствование"
          },
          {
            "code": "religion",
            "rus": "Прочая религионая литература (то, что не вошло в другие категории)"
          }
        ]
      },
      "group_14": {
        "title": "Юмор",
        "genres": [
          {
            "code": "humor_anecdote",
            "rus": "Анекдоты"
          },
          {
            "code": "humor_prose",
            "rus": "Юмористическая проза"
          },
          {
            "code": "humor_verse",
            "rus": "Юмористические стихи"
          },
          {
            "code": "humor",
            "rus": "Прочий юмор (то, что не вошло в другие категории)"
          }
        ]
      },
      "group_15": {
        "title": "Домоводство (Дом и семья)",
        "genres": [
          {
            "code": "home_cooking",
            "rus": "Кулинария"
          },
          {
            "code": "home_pets",
            "rus": "Домашние животные"
          },
          {
            "code": "home_crafts",
            "rus": "Хобби и ремесла"
          },
          {
            "code": "home_entertain",
            "rus": "Развлечения"
          },
          {
            "code": "home_health",
            "rus": "Здоровье"
          },
          {
            "code": "home_garden",
            "rus": "Сад и огород"
          },
          {
            "code": "home_diy",
            "rus": "Сделай сам"
          },
          {
            "code": "home_sport",
            "rus": "Спорт"
          },
          {
            "code": "home_sex",
            "rus": "Эротика, Секс"
          },
          {
            "code": "home",
            "rus": "Прочиее домоводство (то, что не вошло в другие категории)"
          }
        ]
      }
    }
  ]
}

export function getLangs() {
  return ['English', 'Spanish', 'Japanese', 'German'];
}

export function getBooks() {
  return [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "authors": [
        "string"
      ],
      "genres": [
        "string"
      ],
      "src_lang": "string",
      "lang": "string",
      "cover": "string"
    }
  ]
}
