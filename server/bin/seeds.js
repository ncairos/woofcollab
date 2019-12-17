require("dotenv").config();

const mongoose = require("../configs/mongoose.config");
const bcrypt = require("bcrypt");

//const User = require("../models/User.model");
//const Event = require("../models/Event.model");
const Dog = require("../models/Dog.model");
const Center = require("../models/Center.model");

const bcryptSalt = 10;

let center = [
  {
    username: "ciaacenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "Centro Integral de acogida de animales",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.ciaacenter.com",
    address: "Carretera de Colmenar Viejo, Madrid",
    zipcode: 28770,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "ciaacenter"
  },
  {
    username: "ecspcenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "El Campito Salvando Peludos",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.ecspcenter.com",
    address: "Calle del Ramiro, 21, Madrid",
    zipcode: 28459,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "ecspcenter"
  },
  {
    username: "caacenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "Centro de Atencion Animal Ayuntamiento de las Rozas",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.caacenter.com",
    address: "Paseo Tren Talgo, 4, Madrid",
    zipcode: 28290,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "caacenter"
  },
  {
    username: "gapcenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "Guarderia de Animales Patachueca",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.gapcenter.com",
    address: "Calle Hélade, 12, Madrid",
    zipcode: 28232,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "gapcenter"
  },
  {
    username: "rdacenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "Refugio de Animales",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.rdacenter.com",
    address: "Calle Castillo de Berlanga, 23-17, Madrid",
    zipcode: 28682,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "rdacenter"
  },
  {
    username: "cicamcenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "CICAM Majadahonda",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.cicamcenter.com",
    address: "Camino de la Dehesa, Madrid",
    zipcode: 28220,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "cicamcenter"
  },
  {
    username: "nvcenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "Nueva Vida - Adopciones",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.nvcenter.com",
    address: "Calle de Oriente, 7-9, Madrid",
    zipcode: 28220,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "nvcenter"
  },
  {
    username: "cpafcenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "CPA Fuenlabrada",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.cpafcenter.com",
    address: "Camino de la Mula, Madrid",
    zipcode: 28943,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "cpafcenter"
  },
  {
    username: "proacenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "Protectora de Animales",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.proacenter.com",
    address: "Calle Clara Campoamor, Leganés",
    zipcode: 28025,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "proacenter"
  },
  {
    username: "spapmfcenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "Sociedad Protectora de Animales y Plantas de Madrid",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.spapmfcenter.com",
    address: "Calle de Ochagavia, 34, Madrid",
    zipcode: 28039,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "spapmfcenter"
  },
  {
    username: "erefcenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "El Refugio",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.erefcenter.com",
    address: "Calle Roquetas de Mar, 21, Madrid",
    zipcode: 28033,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "erefcenter"
  },
  {
    username: "asfacenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "Albergue San Francisco de Asis",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.asfacenter.com",
    address: "Carretera de el Pardo a Fuencarral, Madrid",
    zipcode: 28049,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "asfacenter"
  },
  {
    username: "cpathcenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "CPA Torrejón Hoope",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.cpathcenter.com",
    address: "Camino de las Carretas, Madrid",
    zipcode: 28050,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "cpathcenter"
  },
  {
    username: "cimpaahcenter",
    email: "test@test",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: "CIMPA Alcalá de Henares",
    bio:
      "Magna velit sunt excepteur Lorem minim esse mollit fugiat deserunt exercitation ut anim culpa. Reprehenderit consectetur dolore nostrud tempor sunt amet reprehenderit aliqua laboris pariatur aliqua anim. Quis mollit quis aliqua proident.",
    contact: 987654321,
    webpage: "http://www.cimpaahcenter.com",
    address: "M-300, Km.25, Madrid",
    zipcode: 28803,
    imgPath:
      "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg",
    imgName: "cimpaahcenter"
  }
];

let dog = [
  {
    centerName: "ciaacenter",
    name: "vitina",
    breed: "pointer",
    sex: "female",
    age: 01,
    weight: 15,
    color: "white and brown",
    size: "medium",
    personality: "affectionate",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/pointer_01.png",
    imgName: "vitina"
  },
  {
    centerName: "ciaacenter",
    name: "bodhi",
    breed: "boykin spaniel",
    sex: "male",
    age: 03,
    weight: 10,
    color: "dark brown",
    size: "small",
    personality: "friendly",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/boykin_spaniel_01.png",
    imgName: "bodhi"
  },
  {
    centerName: "ciaacenter",
    name: "haruka",
    breed: "old english sheepdog",
    sex: "female",
    age: 05,
    weight: 30,
    color: "grey and white",
    size: "big",
    personality: "energetic",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/old_english_sheepdog_01.png",
    imgName: "haruka"
  },
  {
    centerName: "ciaacenter",
    name: "uva",
    breed: "maltese",
    sex: "female",
    age: 01,
    weight: 7,
    color: "white",
    size: "small",
    personality: "intelligent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/maltese_01.png",
    imgName: "uva"
  },
  {
    centerName: "ciaacenter",
    name: "chanay",
    breed: "chow chow",
    sex: "male",
    age: 03,
    weight: 10,
    color: "brown",
    size: "small",
    personality: "confident",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/chow_chow_01.png",
    imgName: "chanay"
  },
  {
    centerName: "ecspcenter",
    name: "dash",
    breed: "keeshond",
    sex: "male",
    age: 01,
    weight: 10,
    color: "grey",
    size: "medium",
    personality: "timid",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/keeshond_01.png",
    imgName: "dash"
  },
  {
    centerName: "ecspcenter",
    name: "ilean",
    breed: "havanese",
    sex: "male",
    age: 03,
    weight: 7,
    color: "white",
    size: "small",
    personality: "independent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/havanese_01.png",
    imgName: "ilean"
  },
  {
    centerName: "ecspcenter",
    name: "lao",
    breed: "redbone coonhound",
    sex: "male",
    age: 05,
    weight: 15,
    color: "brown",
    size: "big",
    personality: "happy",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/redbone_coonhound_01.png",
    imgName: "lao"
  },
  {
    centerName: "ecspcenter",
    name: "teto",
    breed: "rhodesian ridgeback",
    sex: "male",
    age: 01,
    weight: 15,
    color: "brown",
    size: "big",
    personality: "adaptable",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/rhodesian_ridgeback_01.png",
    imgName: "teto"
  },
  {
    centerName: "ecspcenter",
    name: "sage",
    breed: "australian cattle dog",
    sex: "female",
    age: 03,
    weight: 15,
    color: "black",
    size: "medium",
    personality: "adaptable",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/australian_cattle_dog_01.png",
    imgName: "sage"
  },
  {
    centerName: "caacenter",
    name: "ice",
    breed: "american pit bull terrier",
    sex: "male",
    age: 01,
    weight: 15,
    color: "white and brown",
    size: "medium",
    personality: "independent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/american_pit_bull_terrier_01.png",
    imgName: "ice"
  },
  {
    centerName: "caacenter",
    name: "medea",
    breed: "staffordshire bull terrier",
    sex: "female",
    age: 03,
    weight: 15,
    color: "black",
    size: "medium",
    personality: "happy",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/staffordshire_bull_terrier_01.png",
    imgName: "medea"
  },
  {
    centerName: "caacenter",
    name: "terra",
    breed: "norfolk terrier",
    sex: "female",
    age: 05,
    weight: 10,
    color: "cream",
    size: "small",
    personality: "timid",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/norfolk_terrier_01.png",
    imgName: "terra"
  },
  {
    centerName: "caacenter",
    name: "quilate",
    breed: "berger picard",
    sex: "male",
    age: 01,
    weight: 15,
    color: "white, grey and cream",
    size: "medium",
    personality: "confident",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/berger_picard_01.png",
    imgName: "quilate"
  },
  {
    centerName: "caacenter",
    name: "saran",
    breed: "bernese mountain dog",
    sex: "male",
    age: 03,
    weight: 30,
    color: "black",
    size: "big",
    personality: "intelligent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/bernese_mountain_dog_01.png",
    imgName: "saran"
  },
  {
    centerName: "gapcenter",
    name: "elsa",
    breed: "cirneco dell etna",
    sex: "female",
    age: 01,
    weight: 15,
    color: "orange",
    size: "medium",
    personality: "energetic",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/cirneco_dell_etna_01.png",
    imgName: "elsa"
  },
  {
    centerName: "gapcenter",
    name: "fama",
    breed: "american water spaniel",
    sex: "male",
    age: 03,
    weight: 10,
    color: "cream",
    size: "small",
    personality: "friendly",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/american_water_spaniel_01.png",
    imgName: "fama"
  },
  {
    centerName: "gapcenter",
    name: "bonsai",
    breed: "silky terrie",
    sex: "male",
    age: 05,
    weight: 5,
    color: "grey and cream",
    size: "small",
    personality: "affectionate",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/silky_terrier_01.png",
    imgName: "bonsai"
  },
  {
    centerName: "gapcenter",
    name: "baby",
    breed: "parson russell terrier",
    sex: "male",
    age: 01,
    weight: 5,
    color: "brown and white",
    size: "small",
    personality: "affectionate",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/parson_russell_terrier_01.png",
    imgName: "baby"
  },
  {
    centerName: "gapcenter",
    name: "agnes",
    breed: "american foxhound",
    sex: "female",
    age: 03,
    weight: 7,
    color: "white, black and brown",
    size: "small",
    personality: "energetic",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/american_foxhound_01.png",
    imgName: "agnes"
  },
  {
    centerName: "proacenter",
    name: "scully",
    breed: "bouvier des flandres",
    sex: "male",
    age: 01,
    weight: 10,
    color: "black",
    size: "small",
    personality: "friendly",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/bouvier_des_flandres_01.png",
    imgName: "scully"
  },
  {
    centerName: "proacenter",
    name: "carola",
    breed: "great pyrenees",
    sex: "female",
    age: 03,
    weight: 20,
    color: "white",
    size: "big",
    personality: "energetic",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/great_pyrenees_01.png",
    imgName: "carola"
  },
  {
    centerName: "proacenter",
    name: "zitron",
    breed: "swedish valhund",
    sex: "male",
    age: 05,
    weight: 7,
    color: "grey",
    size: "small",
    personality: "intelligent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/swedish_vallhund_01.png",
    imgName: "zitron"
  },
  {
    centerName: "proacenter",
    name: "hipp",
    breed: "american eskimo dog",
    sex: "male",
    age: 01,
    weight: 15,
    color: "white",
    size: "medium",
    personality: "confident",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/american_eskimo_dog_01.png",
    imgName: "hipp"
  },
  {
    centerName: "proacenter",
    name: "humita",
    breed: "blue lacy",
    sex: "female",
    age: 03,
    weight: 15,
    color: "grey",
    size: "medium",
    personality: "timid",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/blue_lacy_01.png",
    imgName: "humita"
  },
  {
    centerName: "erefcenter",
    name: "riko",
    breed: "bergamasco",
    sex: "male",
    age: 01,
    weight: 15,
    color: "grey",
    size: "medium",
    personality: "independent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/bergamasco_01.png",
    imgName: "riko"
  },
  {
    centerName: "erefcenter",
    name: "miuc",
    breed: "newfoundland",
    sex: "male",
    age: 03,
    weight: 25,
    color: "dark brown",
    size: "big",
    personality: "happy",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/newfoundland_01.png",
    imgName: "miuc"
  },
  {
    centerName: "erefcenter",
    name: "shiva",
    breed: "coton de tulear",
    sex: "female",
    age: 05,
    weight: 10,
    color: "white",
    size: "small",
    personality: "adaptable",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/coton_de_tulear_01.png",
    imgName: "shiva"
  },
  {
    centerName: "erefcenter",
    name: "kit",
    breed: "finnish splitz",
    sex: "male",
    age: 01,
    weight: 10,
    color: "orange",
    size: "medium",
    personality: "adaptable",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/finnish_spitz_01.png",
    imgName: "kit"
  },
  {
    centerName: "erefcenter",
    name: "luft",
    breed: "english setter",
    sex: "male",
    age: 03,
    weight: 15,
    color: "white and orange",
    size: "big",
    personality: "happy",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/english_setter_01.png",
    imgName: "luft"
  },
  {
    centerName: "cpathcenter",
    name: "galilea",
    breed: "german wirehaired pointer",
    sex: "female",
    age: 01,
    weight: 10,
    color: "dark brown",
    size: "small",
    personality: "independent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/german_wirehaired_pointer_01.png",
    imgName: "galilea"
  },
  {
    centerName: "cpathcenter",
    name: "dakota",
    breed: "basset hound",
    sex: "female",
    age: 03,
    weight: 10,
    color: "brown",
    size: "medium",
    personality: "timid",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/basset_hound_01.png",
    imgName: "dakota"
  },
  {
    centerName: "cpathcenter",
    name: "canica",
    breed: "maltipoo",
    sex: "male",
    age: 05,
    weight: 5,
    color: "white",
    size: "small",
    personality: "confident",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/maltipoo_01.png",
    imgName: "canica"
  },
  {
    centerName: "cpathcenter",
    name: "yaya",
    breed: "boxer",
    sex: "female",
    age: 01,
    weight: 15,
    color: "brown",
    size: "big",
    personality: "intelligent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/boxer_01.png",
    imgName: "yaya"
  },
  {
    centerName: "cpathcenter",
    name: "kit-kat",
    breed: "italian greyhound",
    sex: "male",
    age: 03,
    weight: 10,
    color: "brown",
    size: "medium",
    personality: "energetic",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/italian_greyhound_01.png",
    imgName: "kit-kat"
  },
  {
    centerName: "rdacenter",
    name: "runa",
    breed: "jack russell terrier",
    sex: "female",
    age: 01,
    weight: 7,
    color: "white and brown",
    size: "small",
    personality: "friendly",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/jack_russell_terrier_01.png",
    imgName: "runa"
  },
  {
    centerName: "rdacenter",
    name: "finca",
    breed: "bolognese",
    sex: "male",
    age: 03,
    weight: 7,
    color: "white",
    size: "small",
    personality: "affectionate",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/bolognese_01.png",
    imgName: "finca"
  },
  {
    centerName: "rdacenter",
    name: "gin",
    breed: "miniature schnauzer",
    sex: "male",
    age: 05,
    weight: 7,
    color: "grey",
    size: "small",
    personality: "affectionate",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/miniature_schnauzer_01.png",
    imgName: "gin"
  },
  {
    centerName: "rdacenter",
    name: "bee",
    breed: "havanese",
    sex: "female",
    age: 01,
    weight: 7,
    color: "white",
    size: "small",
    personality: "friendly",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/havanese_01.png",
    imgName: "bee"
  },
  {
    centerName: "rdacenter",
    name: "avery",
    breed: "coton de tulear",
    sex: "female",
    age: 03,
    weight: 7,
    color: "white",
    size: "small",
    personality: "energetic",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/coton_de_tulear_01.png",
    imgName: "avery"
  },
  {
    centerName: "cicamcenter",
    name: "michico",
    breed: "german sheperd",
    sex: "male",
    age: 01,
    weight: 20,
    color: "black and brown",
    size: "big",
    personality: "intelligent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/german_shepherd_01.png",
    imgName: "michico"
  },
  {
    centerName: "cicamcenter",
    name: "natia",
    breed: "irish terrier",
    sex: "female",
    age: 03,
    weight: 10,
    color: "orange ",
    size: "small",
    personality: "confident",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/irish_terrier_01.png",
    imgName: "natia"
  },
  {
    centerName: "cicamcenter",
    name: "holland",
    breed: "tibetan spaniel",
    sex: "male",
    age: 05,
    weight: 7,
    color: "cream",
    size: "small",
    personality: "timid",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/tibetan_spaniel_01.png",
    imgName: "holland"
  },
  {
    centerName: "cicamcenter",
    name: "tito",
    breed: "black mouth cur",
    sex: "male",
    age: 01,
    weight: 10,
    color: "cream",
    size: "medium",
    personality: "independent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/black_mouth_cur_01.png",
    imgName: "tito"
  },
  {
    centerName: "cicamcenter",
    name: "bunny",
    breed: "great dane",
    sex: "male",
    age: 03,
    weight: 30,
    color: "grey and white",
    size: "big",
    personality: "happy",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/great_dane_01.png",
    imgName: "bunny"
  },
  {
    centerName: "nvcenter",
    name: "taffy",
    breed: "lancashire heeler",
    sex: "female",
    age: 01,
    weight: 7,
    color: "black",
    size: "small",
    personality: "adaptable",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/lancashire_heeler_01.png",
    imgName: "taffy"
  },
  {
    centerName: "nvcenter",
    name: "cake",
    breed: "welsh terrier",
    sex: "female",
    age: 03,
    weight: 10,
    color: "brown and black",
    size: "small",
    personality: "happy",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/welsh_terrier_01.png",
    imgName: "cake"
  },
  {
    centerName: "nvcenter",
    name: "myth",
    breed: "anatolian shepherd dog",
    sex: "male",
    age: 05,
    weight: 30,
    color: "cream",
    size: "big",
    personality: "independent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/anatolian_shepherd_dog_01.png",
    imgName: "myth"
  },
  {
    centerName: "nvcenter",
    name: "tatze",
    breed: "miniature bull terrier",
    sex: "male",
    age: 01,
    weight: 15,
    color: "orange",
    size: "medium",
    personality: "timid",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/miniature_bull_terrier_01.png",
    imgName: "tatze"
  },
  {
    centerName: "nvcenter",
    name: "inifita",
    breed: "schipperke",
    sex: "female",
    age: 03,
    weight: 7,
    color: "black",
    size: "small",
    personality: "confident",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/schipperke_01.png",
    imgName: "inifita"
  },
  {
    centerName: "cpafcenter",
    name: "fresca",
    breed: "belgian malinois",
    sex: "female",
    age: 01,
    weight: 20,
    color: "orange",
    size: "big",
    personality: "intelligent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/belgian_malinois_01.png",
    imgName: "fresca"
  },
  {
    centerName: "cpafcenter",
    name: "ambar",
    breed: "brittany",
    sex: "female",
    age: 03,
    weight: 10,
    color: "white and orange",
    size: "medium",
    personality: "friendly",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/brittany_01.png",
    imgName: "ambar"
  },
  {
    centerName: "cpafcenter",
    name: "ona",
    breed: "greyhound",
    sex: "male",
    age: 05,
    weight: 15,
    color: "brown",
    size: "big",
    personality: "affectionate",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/greyhound_01.png",
    imgName: "ona"
  },
  {
    centerName: "cpafcenter",
    name: "gines",
    breed: "begale",
    sex: "male",
    age: 01,
    weight: 10,
    color: "white, brown and black",
    size: "small",
    personality: "friendly",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/beagle_01.png",
    imgName: "gines"
  },
  {
    centerName: "cpafcenter",
    name: "liberty",
    breed: "irish soft coated wheaten terrier",
    sex: "female",
    age: 03,
    weight: 12,
    color: "cream",
    size: "medium",
    personality: "energetic",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/irish_soft_coated_wheaten_terrier_01.png",
    imgName: "liberty"
  },
  {
    centerName: "spapmfcenter",
    name: "ceres",
    breed: "curly coated retriever",
    sex: "male",
    age: 01,
    weight: 20,
    color: "dark brown",
    size: "big",
    personality: "intelligent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/curly-coated_retriever_01.png",
    imgName: "ceres"
  },
  {
    centerName: "spapmfcenter",
    name: "bine",
    breed: "wirehaired vizsla",
    sex: "female",
    age: 03,
    weight: 15,
    color: "brown",
    size: "big",
    personality: "confident",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/wirehaired_vizsla_01.png",
    imgName: "bine"
  },
  {
    centerName: "spapmfcenter",
    name: "lana",
    breed: "fila brasileiro",
    sex: "female",
    age: 05,
    weight: 10,
    color: "cream",
    size: "medium",
    personality: "timid",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/fila_brasileiro_01.png",
    imgName: "lana"
  },
  {
    centerName: "spapmfcenter",
    name: "seda",
    breed: "puli",
    sex: "male",
    age: 01,
    weight: 15,
    color: "white",
    size: "medium",
    personality: "independent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/puli_01.png",
    imgName: "seda"
  },
  {
    centerName: "spapmfcenter",
    name: "monse",
    breed: "pharaoh hound",
    sex: "male",
    age: 03,
    weight: 15,
    color: "orange",
    size: "big",
    personality: "happy",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/pharaoh_hound_01.png",
    imgName: "monse"
  },
  {
    centerName: "asfacenter",
    name: "saray",
    breed: "golden retriever",
    sex: "female",
    age: 01,
    weight: 20,
    color: "cream",
    size: "big",
    personality: "adaptable",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/golden_retriever_01.png",
    imgName: "saray"
  },
  {
    centerName: "asfacenter",
    name: "nakoma",
    breed: "lakeland terrier",
    sex: "male",
    age: 03,
    weight: 10,
    color: "cream",
    size: "medium",
    personality: "intelligent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/lakeland_terrier_01.png",
    imgName: "nakoma"
  },
  {
    centerName: "asfacenter",
    name: "maisy",
    breed: "nova scotia duck tolling",
    sex: "female",
    age: 05,
    weight: 15,
    color: "orange",
    size: "big",
    personality: "energetic",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/nova_scotia_duck_tolling_01.png",
    imgName: "maisy"
  },
  {
    centerName: "asfacenter",
    name: "batik",
    breed: "icelandic sheepdog",
    sex: "male",
    age: 01,
    weight: 15,
    color: "white",
    size: "medium",
    personality: "friendly",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/icelandic_sheepdog_01.png",
    imgName: "batik"
  },
  {
    centerName: "asfacenter",
    name: "terra",
    breed: "whippet",
    sex: "male",
    age: 03,
    weight: 10,
    color: "grey and white",
    size: "medium",
    personality: "affectionate",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/whippet_01.png",
    imgName: "terra"
  },
  {
    centerName: "cimpaahcenter",
    name: "franco",
    breed: "boston terrier",
    sex: "male",
    age: 01,
    weight: 10,
    color: "black and white",
    size: "small",
    personality: "adaptable",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/boston_terrier_01.png",
    imgName: "franca"
  },
  {
    centerName: "cimpaahcenter",
    name: "cherry",
    breed: "bichon frise",
    sex: "female",
    age: 03,
    weight: 7,
    color: "white",
    size: "small",
    personality: "happy",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/bichon_frise_01.png",
    imgName: "cherry"
  },
  {
    centerName: "cimpaahcenter",
    name: "rosie",
    breed: "bloodhound",
    sex: "female",
    age: 05,
    weight: 25,
    color: "brown and black",
    size: "big",
    personality: "independent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/bloodhound_01.png",
    imgName: "rosie"
  },
  {
    centerName: "cimpaahcenter",
    name: "magy",
    breed: "norwegian lundehund",
    sex: "female",
    age: 01,
    weight: 15,
    color: "white and orange",
    size: "medium",
    personality: "timid",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/norwegian_lundehund_01.png",
    imgName: "magy"
  },
  {
    centerName: "cimpaahcenter",
    name: "maddie",
    breed: "belgium tervuren",
    sex: "female",
    age: 03,
    weight: 25,
    color: "black and brown",
    size: "big",
    personality: "confident",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/belgian_tervuren_01.png",
    imgName: "maddie"
  },
  {
    centerName: "ciaacenter",
    name: "ume",
    breed: "pug",
    sex: "male",
    age: 05,
    weight: 10,
    color: "cream",
    size: "small",
    personality: "affectionate",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/pug_01.png",
    imgName: "ume"
  },
  {
    centerName: "ecspcenter",
    name: "vidia",
    breed: "treeing walker coonhound",
    sex: "female",
    age: 05,
    weight: 10,
    color: "white black and brown",
    size: "small",
    personality: "friendly",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/treeing_walker_coonhound_01.png",
    imgName: "vidia"
  },
  {
    centerName: "caacenter",
    name: "girly",
    breed: "black russian terrier",
    sex: "female",
    age: 05,
    weight: 15,
    color: "black",
    size: "medium",
    personality: "confident",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/black_russian_terrier_01.png",
    imgName: "girly"
  },
  {
    centerName: "gapcenter",
    name: "ashly",
    breed: "shar pei",
    sex: "female",
    age: 05,
    weight: 10,
    color: "cream",
    size: "medium",
    personality: "timid",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/shar_pei_01.png",
    imgName: "ashly"
  },
  {
    centerName: "proacenter",
    name: "hero",
    breed: "bluetick coonhound",
    sex: "male",
    age: 05,
    weight: 20,
    color: "black and white",
    size: "big",
    personality: "energetic",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/bluetick_coonhound_01.png",
    imgName: "hero"
  },
  {
    centerName: "erefcenter",
    name: "carioca",
    breed: "german pinscher",
    sex: "female",
    age: 05,
    weight: 5,
    color: "black",
    size: "small",
    personality: "independent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/german_pinscher_01.png",
    imgName: "carioca"
  },
  {
    centerName: "cpathcenter",
    name: "nidal",
    breed: "dogue de bordeaux",
    sex: "male",
    age: 05,
    weight: 30,
    color: "orange",
    size: "big",
    personality: "happy",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath:
      "https://pickrandom.com/files/images/dogs/dogue_de_bordeaux_01.png",
    imgName: "nidal"
  },
  {
    centerName: "rdacenter",
    name: "olaya",
    breed: "sealyham terrier",
    sex: "female",
    age: 05,
    weight: 10,
    color: "grey",
    size: "small",
    personality: "adaptable",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/sealyham_terrier_01.png",
    imgName: "olaya"
  },
  {
    centerName: "cicamcenter",
    name: "noche",
    breed: "belgian sheepdog",
    sex: "male",
    age: 05,
    weight: 20,
    color: "black and brown",
    size: "big",
    personality: "happy",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/belgian_sheepdog_01.png",
    imgName: "noche"
  },
  {
    centerName: "nvcenter",
    name: "saft",
    breed: "tibetan terrier",
    sex: "female",
    age: 05,
    weight: 15,
    color: "cream",
    size: "medium",
    personality: "independent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/tibetan_terrier_01.png",
    imgName: "saft"
  },
  {
    centerName: "cpafcenter",
    name: "nomi",
    breed: "komondor",
    sex: "male",
    age: 05,
    weight: 20,
    color: "white",
    size: "big",
    personality: "timid",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/komondor_01.png",
    imgName: "nomi"
  },
  {
    centerName: "spapmfcenter",
    name: "carlota",
    breed: "am staff",
    sex: "female",
    age: 05,
    weight: 15,
    color: "white and orange",
    size: "medium",
    personality: "confident",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/am_staff_01.png",
    imgName: "carlota"
  },
  {
    centerName: "asfacenter",
    name: "pud",
    breed: "english bulldog",
    sex: "male",
    age: 05,
    weight: 15,
    color: "orange",
    size: "medium",
    personality: "intelligent",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/english_bulldog_01.png",
    imgName: "pud"
  },
  {
    centerName: "cimpaahcenter",
    name: "rosie",
    breed: "pekingese",
    sex: "female",
    age: 05,
    weight: 7,
    color: "cream",
    size: "small",
    personality: "energetic",
    description:
      "Fugiat adipisicing cillum labore ipsum ad occaecat ipsum deserunt",
    imgPath: "https://pickrandom.com/files/images/dogs/pekingese_01.png",
    imgName: "rosie"
  }
];

Dog.collection
  .drop()
  .then(() => {
    Center.collection
      .drop()
      .then(() => {
        return Center.create(center);
      })

      .catch(err => console.log(err, "center create"))
      .then(centerCreated => {
        console.log(`${centerCreated.length} Centers created`);
        return Dog.create(dog)
          .then(dogsCreated => {
            console.log(`${dogsCreated.length} Dogs created`);
            dogsCreated.forEach(dogs => {
              Center.findOne({ username: dogs.centerName })
                .then(center => {
                  console.log("ESTA ENTANDO AQUIIIII");
                  dogs.center = new mongoose.Types.ObjectId(center._id);

                  dogs
                    .save()
                    .then(dgs => {
                      Center.findByIdAndUpdate(
                        center._id,
                        {
                          $addToSet: { walks: dgs._id }
                        },
                        { new: true }
                      )
                        .then(center => {
                          console.log("ENTRA EN EL THEN DE UPDATE " + center);
                          // mongoose.disconnect();
                        })
                        .catch(err => console.log(err, "foking update center"));

                      // console.log("ID DEL PERRO " + dgs.center);
                      // console.log("ID DEL CENTRO " + center._id);
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err, "puto findOne and catch"));
            });
            // mongoose.disconnect();
          })
          .catch(err => console.log(err));
      });
  })
  .catch(err => {
    console.log(err);
  });
