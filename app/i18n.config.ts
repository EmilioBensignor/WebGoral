export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'es',
    fallbackLocale: 'es',
    availableLocales: ['es', 'en', 'pt', 'fr', 'ru'],
    messages: {
        es: {
            title: 'Calidad. Frescura. Consistencia.',
            pomegranates: 'Granadas',
            subtitle: ' seleccionadas con entregas rápidas y consistentes.',
            ctaHero: 'Reservá tus granadas',
            globalGap: 'Certificados por Global GAP',
            variationsTitle: 'Nuestras variedades',
            acco: {
                feature1: 'Color rojo brillante y atractivo',
                feature2: 'Dulce y menos ácido, ideal para disfrutar fresca',
                feature3: 'Granos jugosos y textura suave al paladar',
                feature4: 'Maduración temprana, disponible al inicio de la temporada',
                feature5: 'Semillas pequeñas y blandas, más fáciles de comer'
            },
            wonderful: {
                feature1: 'Intenso color rojo oscuro y granos grandes',
                feature2: 'Combinación perfecta entre dulzura y acidez',
                feature3: 'Muy jugosa, rica en antioxidantes y nutrientes',
                feature4: 'Maduración tardía, disponible al final de la temporada',
                feature5: 'Se conserva en excelente estado por más tiempo después de la cosecha'
            },
            calendar: {
                title: 'Calendario de cosecha',
                months: {
                    1: 'ENE',
                    2: 'FEB',
                    3: 'MAR',
                    4: 'ABR',
                    5: 'MAY',
                    6: 'JUN-DIC'
                },
                timeLeftText: 'Faltan {months} meses y {days} días',
                cta: 'Pedí más información',
                harvestMonth: {
                    acco: 'MAR',
                    wonderful: 'ABR'
                }
            },
            about: {
                title: 'El corazón de nuestro cultivo',
                description: 'Ubicada en San Juan, Argentina, nuestra finca se encuentra en un entorno ideal para el cultivo de granadas de alta calidad.',
                info: {
                    climate: {
                        name: 'Clima',
                        title: 'Clima ideal para el cultivo',
                        video: 'Video clima'
                    },
                    quality: {
                        name: 'Calidad',
                        title: 'Calidad garantizada',
                        video: 'Video calidad'
                    },
                    location: {
                        name: 'Ubicacion',
                        title: 'Ubicación estratégica',
                        video: 'Video ubicación'
                    }
                }
            },
            services: {
                title: 'Impulsá tu negocio con productos de calidad',
                cta: 'Consultá ahora',
                items: {
                    globalGap: {
                        title: 'Certificados por Global GAP',
                        text: '*Cumplimos con los más altos estándares.* Nuestras prácticas agrícolas están certificadas por Global GAP, garantizando productos seguros y responsables.'
                    },
                    consistency: {
                        title: 'Consistencia en tus pedidos',
                        text: 'Granadas con el mismo estándar, siempre. Garantizamos que cada lote tenga la *misma calidad y tamaño* siempre recibas el producto que esperas.'
                    },
                    export: {
                        title: 'Exporta granadas al mundo',
                        text: '*Desde San Juan al mundo.* Proveemos un servicio de exportación confiable para que puedas llevar el mejor producto a tu mercado.'
                    },
                    harvest: {
                        title: 'Cosechas en Marzo y Abril',
                        text: '*Planificación perfecta para tu negocio.* Nuestras cosechas están programadas estratégicamente en los meses de marzo y abril, garantizando el mejor momento para cada variedad.'
                    }
                }
            },
            menu: {
                contact: 'Contacto'
            },
            footer: {
                rights: 'Todos los derechos reservados.'
            },
            contact: {
                title: '¡Deja tus datos y nos pondremos en contacto!',
                name: {
                    label: 'Nombre',
                    placeholder: 'Ingrese su nombre',
                    required: 'Debe ingresar su nombre',
                    minLength: 'El nombre debe tener al menos 2 caracteres',
                    maxLength: 'El nombre no puede superar los 20 caracteres',
                    onlyText: 'El nombre debe ser texto'
                },
                email: {
                    label: 'Correo electrónico',
                    placeholder: 'Ingrese su correo electrónico',
                    required: 'Debe ingresar su correo electrónico',
                    invalid: 'Formato de correo electrónico inválido'
                },
                phone: {
                    label: 'Número de teléfono',
                    prefix: 'Prefijo',
                    placeholder: 'Ingrese su número de teléfono',
                    required: 'Debe ingresar un número de teléfono',
                    onlyNumbers: 'El número de teléfono debe ser un número'
                },
                message: {
                    label: 'Mensaje',
                    placeholder: 'Ingrese su mensaje',
                    required: 'Debe ingresar su mensaje',
                    minLength: 'El mensaje debe tener al menos 10 caracteres',
                    maxLength: 'El mensaje no puede superar los 500 caracteres'
                },
                submit: 'Enviar mensaje',
                success: {
                    title: '¡Tus datos se enviaron correctamente!',
                    message: 'Nos pondremos en contacto contigo en la brevedad.'
                }
            }
        },
        en: {
            title: 'Quality. Freshness. Consistency.',
            pomegranates: 'Pomegranates',
            subtitle: ' selected with fast and consistent deliveries.',
            ctaHero: 'Reserve your pomegranates',
            globalGap: 'Global GAP Certified',
            variationsTitle: 'Our varieties',
            acco: {
                feature1: 'Bright and attractive red color',
                feature2: 'Sweet and less acidic, ideal for fresh consumption',
                feature3: 'Juicy grains with smooth texture',
                feature4: 'Early ripening, available at the start of the season',
                feature5: 'Small and soft seeds, easier to eat'
            },
            wonderful: {
                feature1: 'Intense dark red color and large grains',
                feature2: 'Perfect balance between sweetness and acidity',
                feature3: 'Very juicy, rich in antioxidants and nutrients',
                feature4: 'Late ripening, available at the end of the season',
                feature5: 'Maintains excellent condition longer after harvest'
            },
            calendar: {
                title: 'Harvest calendar',
                months: {
                    1: 'JAN',
                    2: 'FEB',
                    3: 'MAR',
                    4: 'APR',
                    5: 'MAY',
                    6: 'JUN-DEC'
                },
                timeLeftText: '{months} months and {days} days left',
                cta: 'Request more information',
                harvestMonth: {
                    acco: 'MAR',
                    wonderful: 'APR'
                }
            },
            about: {
                title: 'The heart of our cultivation',
                description: 'Located in San Juan, Argentina, our farm is in an ideal environment for growing high-quality pomegranates.',
                info: {
                    climate: {
                        name: 'Climate',
                        title: 'Ideal growing climate',
                        video: 'Climate video'
                    },
                    quality: {
                        name: 'Quality',
                        title: 'Guaranteed quality',
                        video: 'Quality video'
                    },
                    location: {
                        name: 'Location',
                        title: 'Strategic location',
                        video: 'Location video'
                    }
                }
            },
            services: {
                title: 'Boost your business with quality products',
                cta: 'Consult now',
                items: {
                    globalGap: {
                        title: 'Global GAP Certified',
                        text: '*We meet the highest standards.* Our agricultural practices are certified by Global GAP, ensuring safe and responsible products.'
                    },
                    consistency: {
                        title: 'Consistency in your orders',
                        text: 'Pomegranates with the same standard, always. We guarantee that each batch has the *same quality and size* you always receive the product you expect.'
                    },
                    export: {
                        title: 'Export pomegranates to the world',
                        text: '*From San Juan to the world.* We provide a reliable export service so you can take the best product to your market.'
                    },
                    assistance: {
                        title: 'Personalized assistance',
                        text: 'Our team accompanies you at every stage with *personalized attention*, so you\'re never alone in the process.'
                    },
                    harvest: {
                        title: 'Harvests in March and April',
                        text: '*Perfect planning for your business.* Our harvests are strategically scheduled in March and April, ensuring the best timing for each variety.'
                    }
                }
            },
            menu: {
                contact: 'Contact'
            },
            footer: {
                rights: 'All rights reserved.'
            },
            contact: {
                title: 'Leave your details and we\'ll get in touch!',
                name: {
                    label: 'Name',
                    placeholder: 'Enter your name',
                    required: 'You must enter your name',
                    minLength: 'Name must be at least 2 characters long',
                    maxLength: 'Name cannot exceed 20 characters',
                    onlyText: 'Name must be text only'
                },
                email: {
                    label: 'Email',
                    placeholder: 'Enter your email',
                    required: 'You must enter your email',
                    invalid: 'Invalid email format'
                },
                phone: {
                    label: 'Phone number',
                    prefix: 'Prefix',
                    placeholder: 'Enter your phone number',
                    required: 'You must enter a phone number',
                    onlyNumbers: 'Phone number must be a number'
                },
                message: {
                    label: 'Message',
                    placeholder: 'Enter your message',
                    required: 'You must enter your message',
                    minLength: 'Message must be at least 10 characters long',
                    maxLength: 'Message cannot exceed 500 characters'
                },
                submit: 'Send message',
                success: {
                    title: 'Your data has been sent successfully!',
                    message: 'We will contact you shortly.'
                }
            }
        },
        pt: {
            title: 'Qualidade. Frescura. Consistência.',
            pomegranates: 'Romãs',
            subtitle: ' selecionadas com entregas rápidas e consistentes.',
            ctaHero: 'Reserve suas romãs',
            globalGap: 'Certificado Global GAP',
            variationsTitle: 'Nossas variedades',
            acco: {
                feature1: 'Cor vermelha brilhante e atraente',
                feature2: 'Doce e menos ácida, ideal para consumo fresco',
                feature3: 'Grãos suculentos com textura suave',
                feature4: 'Amadurecimento precoce, disponível no início da temporada',
                feature5: 'Sementes pequenas e macias, mais fáceis de comer'
            },
            wonderful: {
                feature1: 'Cor vermelha escura intensa e grãos grandes',
                feature2: 'Equilíbrio perfeito entre doçura e acidez',
                feature3: 'Muito suculenta, rica em antioxidantes e nutrientes',
                feature4: 'Amadurecimento tardio, disponível no final da temporada',
                feature5: 'Mantém excelente condição por mais tempo após a colheita'
            },
            calendar: {
                title: 'Calendário de colheita',
                months: {
                    1: 'JAN',
                    2: 'FEV',
                    3: 'MAR',
                    4: 'ABR',
                    5: 'MAI',
                    6: 'JUN-DEZ'
                },
                timeLeftText: 'Faltam {months} meses e {days} dias',
                cta: 'Peça mais informações',
                harvestMonth: {
                    acco: 'MAR',
                    wonderful: 'ABR'
                }
            },
            about: {
                title: 'O coração do nosso cultivo',
                description: 'Localizada em San Juan, Argentina, nossa fazenda está em um ambiente ideal para o cultivo de romãs de alta qualidade.',
                info: {
                    climate: {
                        name: 'Clima',
                        title: 'Clima ideal para cultivo',
                        video: 'Vídeo clima'
                    },
                    quality: {
                        name: 'Qualidade',
                        title: 'Qualidade garantida',
                        video: 'Vídeo qualidade'
                    },
                    location: {
                        name: 'Localização',
                        title: 'Localização estratégica',
                        video: 'Vídeo localização'
                    }
                }
            },
            services: {
                title: 'Impulsione seu negócio com produtos de qualidade',
                cta: 'Consulte agora',
                items: {
                    globalGap: {
                        title: 'Certificado Global GAP',
                        text: '*Cumprimos com os mais altos padrões.* Nossas práticas agrícolas são certificadas pelo Global GAP, garantindo produtos seguros e responsáveis.'
                    },
                    consistency: {
                        title: 'Consistência em seus pedidos',
                        text: 'Romãs com o mesmo padrão, sempre. Garantimos que cada lote tenha a *mesma qualidade e tamanho* você sempre recebe o produto que espera.'
                    },
                    export: {
                        title: 'Exporte romãs para o mundo',
                        text: '*De San Juan para o mundo.* Fornecemos um serviço de exportação confiável para que você possa levar o melhor produto ao seu mercado.'
                    },
                    assistance: {
                        title: 'Assistência personalizada',
                        text: 'Nossa equipe acompanha você em cada etapa com *atenção personalizada*, para que você nunca esteja sozinho no processo.'
                    },
                    harvest: {
                        title: 'Colheitas em Março e Abril',
                        text: '*Planejamento perfeito para seu negócio.* Nossas colheitas são programadas estrategicamente nos meses de março e abril, garantindo o melhor momento para cada variedade.'
                    }
                }
            },
            menu: {
                contact: 'Contato'
            },
            footer: {
                rights: 'Todos os direitos reservados.'
            },
            contact: {
                title: 'Deixe seus dados e entraremos em contato!',
                name: {
                    label: 'Nome',
                    placeholder: 'Digite seu nome',
                    required: 'O nome é obrigatório',
                    minLength: 'O nome deve ter pelo menos 2 caracteres',
                    maxLength: 'O nome não pode exceder 20 caracteres',
                    onlyText: 'O nome deve ser apenas texto'
                },
                email: {
                    label: 'Email',
                    placeholder: 'Digite seu email',
                    required: 'O email é obrigatório',
                    invalid: 'Formato de email inválido'
                },
                phone: {
                    label: 'Número de telefone',
                    prefix: 'Prefixo',
                    placeholder: 'Digite seu número de telefone',
                    required: 'O telefone é obrigatório',
                    onlyNumbers: 'O número de telefone deve ser um número'
                },
                message: {
                    label: 'Mensagem',
                    placeholder: 'Digite sua mensagem',
                    required: 'A mensagem é obrigatória',
                    minLength: 'A mensagem deve ter pelo menos 10 caracteres',
                    maxLength: 'A mensagem não pode exceder 500 caracteres'
                },
                submit: 'Enviar mensagem',
                success: {
                    title: 'Seus dados foram enviados com sucesso!',
                    message: 'Entraremos em contato em breve.'
                }
            }
        },
        fr: {
            title: 'Qualité. Fraîcheur. Constance.',
            pomegranates: 'Grenades',
            subtitle: ' sélectionnées avec des livraisons rapides et régulières.',
            ctaHero: 'Réservez vos grenades',
            globalGap: 'Certifié Global GAP',
            variationsTitle: 'Nos variétés',
            acco: {
                feature1: 'Couleur rouge vif et attrayante',
                feature2: 'Douce et moins acide, idéale pour la consommation fraîche',
                feature3: 'Grains juteux à texture douce',
                feature4: 'Maturation précoce, disponible en début de saison',
                feature5: 'Petites graines tendres, plus faciles à manger'
            },
            wonderful: {
                feature1: 'Couleur rouge foncé intense et gros grains',
                feature2: 'Équilibre parfait entre douceur et acidité',
                feature3: 'Très juteuse, riche en antioxydants et nutriments',
                feature4: 'Maturation tardive, disponible en fin de saison',
                feature5: 'Conserve une excellente condition plus longtemps après la récolte'
            },
            calendar: {
                title: 'Calendrier de récolte',
                months: {
                    1: 'JAN',
                    2: 'FÉV',
                    3: 'MAR',
                    4: 'AVR',
                    5: 'MAI',
                    6: 'JUN-DÉC'
                },
                timeLeftText: 'Il reste {months} mois et {days} jours',
                cta: 'Demander plus d\'informations',
                harvestMonth: {
                    acco: 'MAR',
                    wonderful: 'AVR'
                }
            },
            about: {
                title: 'Le cœur de notre culture',
                description: 'Située à San Juan, Argentine, notre ferme se trouve dans un environnement idéal pour la culture de grenades de haute qualité.',
                info: {
                    climate: {
                        name: 'Climat',
                        title: 'Climat idéal pour la culture',
                        video: 'Vidéo climat'
                    },
                    quality: {
                        name: 'Qualité',
                        title: 'Qualité garantie',
                        video: 'Vidéo qualité'
                    },
                    location: {
                        name: 'Localisation',
                        title: 'Localisation stratégique',
                        video: 'Vidéo localisation'
                    }
                }
            },
            services: {
                title: 'Boostez votre entreprise avec des produits de qualité',
                cta: 'Consultez maintenant',
                items: {
                    globalGap: {
                        title: 'Certifié Global GAP',
                        text: '*Nous respectons les normes les plus élevées.* Nos pratiques agricoles sont certifiées par Global GAP, garantissant des produits sûrs et responsables.'
                    },
                    consistency: {
                        title: 'Cohérence dans vos commandes',
                        text: 'Grenades avec le même standard, toujours. Nous garantissons que chaque lot a la *même qualité et taille* vous recevez toujours le produit que vous attendez.'
                    },
                    export: {
                        title: 'Exportez des grenades dans le monde',
                        text: '*De San Juan au monde.* Nous fournissons un service d\'exportation fiable pour que vous puissiez apporter le meilleur produit à votre marché.'
                    },
                    assistance: {
                        title: 'Assistance personnalisée',
                        text: 'Notre équipe vous accompagne à chaque étape avec une *attention personnalisée*, pour que vous ne soyez jamais seul dans le processus.'
                    },
                    harvest: {
                        title: 'Récoltes en Mars et Avril',
                        text: '*Planification parfaite pour votre entreprise.* Nos récoltes sont programmées stratégiquement en mars et avril, garantissant le meilleur moment pour chaque variété.'
                    }
                }
            },
            menu: {
                contact: 'Contact'
            },
            footer: {
                rights: 'Tous droits réservés.'
            },
            contact: {
                title: 'Laissez vos coordonnées et nous vous contacterons!',
                name: {
                    label: 'Nom',
                    placeholder: 'Entrez votre nom',
                    required: 'Le nom est requis',
                    minLength: 'Le nom doit comporter au moins 2 caractères',
                    maxLength: 'Le nom ne peut pas dépasser 20 caractères',
                    onlyText: 'Le nom doit être uniquement du texte'
                },
                email: {
                    label: 'Email',
                    placeholder: 'Entrez votre email',
                    required: 'L\'email est requis',
                    invalid: 'Format d\'email invalide'
                },
                phone: {
                    label: 'Numéro de téléphone',
                    prefix: 'Préfixe',
                    placeholder: 'Entrez votre numéro de téléphone',
                    required: 'Le téléphone est requis',
                    onlyNumbers: 'Le numéro de téléphone doit être un nombre'
                },
                message: {
                    label: 'Message',
                    placeholder: 'Entrez votre message',
                    required: 'Le message est requis',
                    minLength: 'Le message doit comporter au moins 10 caractères',
                    maxLength: 'Le message ne peut pas dépasser 500 caractères'
                },
                submit: 'Envoyer le message',
                success: {
                    title: 'Vos données ont été envoyées avec succès !',
                    message: 'Nous vous contacterons sous peu.'
                }
            }
        },
        ru: {
            title: 'Качество. Свежесть. Стабильность.',
            pomegranates: 'Гранаты',
            subtitle: ' отборные с быстрой и надежной доставкой.',
            ctaHero: 'Заказать гранаты',
            globalGap: 'Сертификат Global GAP',
            variationsTitle: 'Наши сорта',
            acco: {
                feature1: 'Яркий и привлекательный красный цвет',
                feature2: 'Сладкий и менее кислый, идеален для свежего потребления',
                feature3: 'Сочные зерна с нежной текстурой',
                feature4: 'Раннее созревание, доступен в начале сезона',
                feature5: 'Мелкие и мягкие семена, легче есть'
            },
            wonderful: {
                feature1: 'Насыщенный темно-красный цвет и крупные зерна',
                feature2: 'Идеальный баланс между сладостью и кислотностью',
                feature3: 'Очень сочный, богат антиоксидантами и питательными веществами',
                feature4: 'Позднее созревание, доступен в конце сезона',
                feature5: 'Сохраняет отличное состояние дольше после сбора урожая'
            },
            calendar: {
                title: 'Календарь сбора урожая',
                months: {
                    1: 'ЯНВ',
                    2: 'ФЕВ',
                    3: 'МАР',
                    4: 'АПР',
                    5: 'МАЙ',
                    6: 'ИЮН-ДЕК'
                },
                timeLeftText: 'Осталось {months} месяцев и {days} дней',
                cta: 'Запросить информацию',
                harvestMonth: {
                    acco: 'МАР',
                    wonderful: 'АПР'
                }
            },
            about: {
                title: 'Сердце нашего производства',
                description: 'Расположенная в Сан-Хуане, Аргентина, наша ферма находится в идеальных условиях для выращивания высококачественных гранатов.',
                info: {
                    climate: {
                        name: 'Климат',
                        title: 'Идеальный климат для выращивания',
                        video: 'Видео о климате'
                    },
                    quality: {
                        name: 'Качество',
                        title: 'Гарантированное качество',
                        video: 'Видео о качестве'
                    },
                    location: {
                        name: 'Расположение',
                        title: 'Стратегическое расположение',
                        video: 'Видео о расположении'
                    }
                }
            },
            services: {
                title: 'Укрепите свой бизнес качественной продукцией',
                cta: 'Консультируйтесь сейчас',
                items: {
                    globalGap: {
                        title: 'Сертификат Global GAP',
                        text: '*Мы соответствуем самым высоким стандартам.* Наши сельскохозяйственные практики сертифицированы Global GAP, что гарантирует безопасную и ответственную продукцию.'
                    },
                    consistency: {
                        title: 'Стабильность в ваших заказах',
                        text: 'Гранаты с одинаковым стандартом, всегда. Мы гарантируем, что каждая партия имеет *одинаковое качество и размер*, и вы всегда получаете ожидаемый продукт.'
                    },
                    export: {
                        title: 'Экспортируйте гранаты в мир',
                        text: '*Из Сан-Хуана в мир.* Мы предоставляем надежный экспортный сервис, чтобы вы могли поставлять лучший продукт на свой рынок.'
                    },
                    assistance: {
                        title: 'Персонализированная помощь',
                        text: 'Наша команда сопровождает вас на каждом этапе с *персонализированным вниманием*, чтобы вы никогда не были одни в процессе.'
                    },
                    harvest: {
                        title: 'Сбор урожая в марте и апреле',
                        text: '*Идеальное планирование для вашего бизнеса.* Наш сбор урожая стратегически запланирован на март и апрель, обеспечивая лучшее время для каждого сорта.'
                    }
                }
            },
            menu: {
                contact: 'Контакты'
            },
            footer: {
                rights: 'Все права защищены.'
            },
            contact: {
                title: 'Оставьте свои данные, и мы свяжемся с вами!',
                name: {
                    label: 'Имя',
                    placeholder: 'Введите ваше имя',
                    required: 'Имя обязательно',
                    minLength: 'Имя должно быть не менее 2 символов',
                    maxLength: 'Имя не должно превышать 20 символов',
                    onlyText: 'Имя должно быть только текстом'
                },
                email: {
                    label: 'Электронная почта',
                    placeholder: 'Введите вашу электронную почту',
                    required: 'Электронная почта обязательна',
                    invalid: 'Неверный формат электронной почты'
                },
                phone: {
                    label: 'Номер телефона',
                    prefix: 'Префикс',
                    placeholder: 'Введите ваш номер телефона',
                    required: 'Телефон обязателен',
                    onlyNumbers: 'Номер телефона должен быть числом'
                },
                message: {
                    label: 'Сообщение',
                    placeholder: 'Введите ваше сообщение',
                    required: 'Сообщение обязательно',
                    minLength: 'Сообщение должно быть не менее 10 символов',
                    maxLength: 'Сообщение не должно превышать 500 символов'
                },
                submit: 'Отправить сообщение',
                success: {
                    title: 'Ваши данные успешно отправлены!',
                    message: 'Мы свяжемся с вами в ближайшее время.'
                }
            }
        }
    }
}))
