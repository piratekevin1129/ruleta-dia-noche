var usuario_data = {
    nombre:'',
    documento:'',
    historial:[]
}

var cartas_data = null;
//IMPORTANTE!!!
//no colocar punto final a la prefrase o será el fin del mundo
//todos los br deben llevar espacio adelante, nunca detrás
//los unicos signos de puntuación permitidos son: .,¡!¿?:

var instrucciones_txt = 'Hola, <div class="instrucciones-scene-card-frase-espacio-1"><span>Bienvenido</span></div> al juego de la ruleta <div class="instrucciones-scene-card-frase-espacio-2"><span>Interactiva</span></div>. <br> Pon a prueba tu <div class="instrucciones-scene-card-frase-espacio-3"><span>Creatividad</span></div>, tus conocimientos y juega con propósito'
/*rosado*/
var cartas_data_1 = [
    {
        prefrase:'• Elige siempre aportar al desarrollo de los territorios, procurando un buen relacionamiento con las comunidades. <br>• Cada inversión social debe generar bienestar real y sostenible. Construyamos proyectos que transformen vidas y fortalezcan nuestras relaciones con las comunidades. <br>• La inversión social es una oportunidad para generar confianza. Actuemos con transparencia, ética y respeto en cada iniciativa',
        frase:'',
        palabras:[],
        completed:false
    },
    {
        prefrase:'• Las mejores soluciones nacen del diálogo. Escuchemos a las comunidades y trabajemos juntos para impulsar proyectos que generen valor compartido. <br>• Cada peso invertido en proyectos sociales debe generar impacto positivo y sostenible. Hagamos que cada iniciativa cuente. <br>• Construir relaciones sólidas con líderes comunitarios y autoridades es clave. Actuemos con respeto, transparencia y compromiso en cada interacción',
        frase:'',
        palabras:[],
        completed:false
    },
    {
        prefrase:'• Apoyemos con convicción los proyectos educativos y de formación que impulsamos, para que fortalezcan el futuro de las comunidades. <br>• El trabajo legal y digno transforma vidas. Impulsemos y difundamos las iniciativas que promueven el emprendimiento local y el crecimiento económico sostenible. <br>• Cada proyecto que impulsamos debe ser ambientalmente responsable. Integremos prácticas sostenibles en nuestras inversiones para proteger el entorno',
        frase:'',
        palabras:[],
        completed:false
    },
    {
        prefrase:'• Las mejores inversiones sociales responden a las necesidades genuinas de las comunidades. Tu labor impacta el entorno. <br>• Fomenta el diálogo respuetuoso y constructivo con las comunidades para fortalecer la confianza y el desarrollo sostenible. <br>• Identificar y gestionar riesgos sociales, reduce confictos y fortalece la convivencia. Escucha, respeta y actúa con responsabilidad',
        frase:'',
        palabras:[],
        completed:false
    }
]

/*azul*/
var cartas_data_2 = [
    {
        prefrase:'• En Cenit nos mueve el cuidado por la vida. Por eso, velamos por el bienestar de todos nuestros colaboradores y aliados. Te invitamos a evitar el consumo de alcohol y sustancias psicoactivas. <br>• Elige cuidarte. Queremos que tomes conciencia de los efectos negativos y las alteraciones físicas que este tipo de consumo puede generar, impactando tu salud, el entorno laboral, tu familia y la seguridad en el trabajo',
        frase:'',
        palabras:[],
        completed:false
    },
    {
        prefrase:'En Cenit estamos comprometidos con el principio de Primero la Vida. Por eso, procuramos entornos de trabajo seguros y hábitos saludables, fomentando el bienestar de todos los colaboradores y aliados',
        frase:'',
        palabras:[],
        completed:false
    },
    {
        prefrase:'Regresar a casa seguro es el mejor regalo: para mí, para mi familia y para quienes me rodean. Es fácil lograrlo si: <br>• Reporto a tiempo todos los riesgos en mis actividades. <br>• Sigo paso a paso los procedimientos establecidos. <br>• Si surgen cambios en lo planeado, reaseguro los nuevos riesgos. <br>• Conduzco con precaución, sin prisa. <br>• El equipo de protección personal es mi mejor aliado. <br>• Cuidarnos es un trabajo en equipo: yo me cuido y cuido a mis compañeros',
        frase:'',
        palabras:[],
        completed:false
    },
    {
        prefrase:'Un equipo que cuida el medio ambiente es un equipo que piensa en el futuro. La sostenibilidad no es solo un compromiso, es también una oportunidad para innovar, liderar y transformar. Recuerda: un entorno saludable y sostenible comienza con decisiones conscientes, dentro y fuera del trabajo',
        frase:'',
        palabras:[],
        completed:false
    }
]

/*amarillo*/
var cartas_data_3 = [
    {
        prefrase:'• No des oportunidad para que algo te ocurra. Evita exponerte y no tomes riesgos innecesarios. Conductas como el descuido, la imprudencia, la inocencia y la falta de previsión le dan ventaja a la delincuencia. <br>• La seguridad personal debe estar presente en todas nuestras actividades. Sin que lo percibas puede estar al alcance de la delincuencia, protégete y adopta hábitos de autocuidado. <br>• Cuidarte ayuda a evitar la materialización de los riesgos. Prepararte para una emergencia disminuye tus implicaciones. Prevenirlos, los elimina',
        frase:'',
        palabras:[],
        completed:false
    },
    {
        prefrase:'• La continuidad del negocio es esencial. Con planes de continuidad efectivos, protegemos lo que hacemos, a quienes servimos y a nuestra organización. Prevenir hoy es asegurar el mañana. No olvidemos que somos la empresa que garantiza que el país siga en movimiento. <br>• La seguridad es un compromiso de todos. Respeta los protocolos de acceso, identifica las rutas de evacuación y reporta cualquier actividad sospechosa. <br>• Conocer el entorno es clave. Evalúa siempre los riesgos en tu área de trabajo y sigue las medidas de seguridad para prevenir incidentes',
        frase:'',
        palabras:[],
        completed:false
    },
    {
        prefrase:'• Notifica cualquier persona o actividad inusual en zonas operativas y sigue los protocolos de seguridad. <br>• Tu seguridad durante el traslado también es importante. Usa rutas seguras, mantente informado sobre condiciones del área y sigue las recomendaciones de seguridad. <br>• La información estratégica debe manejarse con precaución. Evita compartir datos operativos con personas no autorizadas y utiliza canales oficiales',
        frase:'',
        palabras:[],
        completed:false
    },
    {
        prefrase:'• Conoce los procedimientos de evacuación y de emergencia en tu zona y participa en simulacros. <br>• El buen uso de los equipos y la infraestructura garantiza seguridad y continuidad. Respeta los procedimientos y notifica cualquier anomalía en los activos de la compañía. <br>• Tu seguridad es lo más importante. Usa siempre los equipos de protección personal, sigue las normas y evita riesgos innecesarios',
        frase:'',
        palabras:[],
        completed:false
    }
]

/*verde*/
var cartas_data_4 = [
    {
        prefrase:'• La sostenibilidad está en tus manos. Desde el uso responsable de los recursos hasta la reducción de residuos, cada decisión que tomas tiene el poder de transformar el planeta. Juntos, podemos construir un mundo más verde, saludable y sostenible. <br>• Elige cuidarte siendo consciente de los impactos ambientales de tus actividades. Solo así podremos establecer controles que permitan prevenir, mitigar y corregir los efectos sobre recursos como el aire, el suelo y el agua',
        frase:'',
        palabras:[],
        completed:false
    },
    {
        prefrase:'• La sostenibilidad no es solo un concepto, sino un desafío compartido. Al unirte, no solo transformas tu entorno, sino que aceleras un futuro más justo y sostenible para todos. <br>• Elige el planeta, entendiendo que nuestras operaciones están vinculadas con el territorio y los ecosistemas que lo conforman. Cada acción que tomamos puede incidir la calidad de estos entornos, y con ello, el desarrollo de nuestras actividades. Cuidar el ecosistema es cuidar la vida y la sostenibilidad de nuestra operación',
        frase:'',
        palabras:[],
        completed:false
    },
    {
        prefrase:'Cada paso que damos hacia la sostenibiidad es una inversión en un mañana mejor. Únete a este viaje donde cada acción cuenta, y juntos transformamos lo posible en real',
        frase:'',
        palabras:[],
        completed:false
    },
    {
        prefrase:'• La sostenibilidad no es solo un objetivo a largo plazo, es una misión diaria que transforma tu entorno y tu vida. ¡Haz la diferencia desde ahora y construyamos el futuro que merecemos! <br>• Cada elección cuenta, cada acción tiene impacto. La sostenibilidad es el camino que recorremos juntos, pero el primer paso empieza contigo. Sé el agente de cambio que tu entorno necesita',
        frase:'',
        palabras:[],
        completed:false
    }
]