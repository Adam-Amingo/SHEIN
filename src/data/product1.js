const PRODUCTS = [
    // Already translated first 5 items...
    {
        id: '1',
        name: {
            en: 'Ladies Official Dress',
            tw: 'Mmaa ɔfese ataaadeɛ',
            ga: 'Yei ɔ fis atale',
            ewe: 'nyɔnuwo ƒe ɔfis awudodo'
        },
        category: {
            en: 'Women',
            tw: 'Mmaa',
            ga: 'Yie',
            ewe: 'nyɔnuwo'
        },
        subcategory: {
            en: 'Official dress',
            tw: 'ɔfese ataaadeɛ',
            ga: 'ɔfis atale',
            ewe: 'ɔfis ƒe awudodo'
        },
        price: 29.99,
        rating: 4.5,
        image: 'https://s.alicdn.com/@sc04/kf/H86323f72edd0495d8ac47e1627b2a67en.jpg',
        tag: {
            en: 'Bestseller',
            twi: 'wɔtɔn sen biara',
            ga: 'Bestseller',
            ewe: 'nu vɔ̃ feɖeƒe',
        },
    },
    {
        id: '40',
        name: {
            en: 'Ladies Official Dress',
            tw: 'Mmaa ɔfese ataaadeɛ',
            ga: 'Yei ɔfis atale',
            ewe: 'nyɔnuwo ƒe ɔfis awudodo'
        },
        category: {
            en: 'Women',
            tw: 'Mmaa',
            ga: 'Yie',
            ewe: 'nyɔnuwo'
        },
        subcategory: {
            en: 'Official dress',
            tw: 'ɔfese ataaadeɛ',
            ga: 'ɔfis atale',
            ewe: 'ɔfis ƒe awudodo'
        },
        price: 29.99,
        rating: 4.5,
        image: 'https://i.pinimg.com/736x/04/11/51/041151711cc50ff4534acebfd799393b.jpg',
        tag: {
            en: 'Bestseller',
            twi: 'wɔtɔn sen biara',
            ga: 'Bestseller',
            ewe: 'nu vɔ̃ feɖeƒe',
        },
    }
    ,
    {
        id: '3',
        name: {
            en: 'Ladies Winter Suit',
            tw: 'Mmaa awɔw bere atadeɛ',
            ga: 'Yei shishi kpakpa atale',
            ewe: 'nyɔnuwo ƒe jacket'
        },
        category: {
            en: 'Women',
            tw: 'Mmaa',
            ga: 'Yie',
            ewe: 'nyɔnuwo'
        },
        subcategory: {
            en: 'Casual dress',
            tw: 'efie ataaadeɛ',
            ga: 'efie atale',
            ewe: 'awu si wodona le vome'
        },
        price: 29.99,
        rating: 4.5,
        image: 'https://i.pinimg.com/736x/db/a0/8d/dba08df2d10beda558ae1b74b5c165e7.jpg',
        tag: {
            en: 'Bestseller',
            twi: 'wɔtɔn sen biara',
            ga: 'Bestseller',
            ewe: 'nu vɔ̃ feɖeƒe',
        },
    },
    {
        id: '4',
        name: {
            en: 'Ladies Dress',
            tw: 'Mmaa ataaadeɛ',
            ga: 'Yei atale',
            ewe: 'nyɔnuwo ƒe awudodo'
        },
        category: {
            en: 'Women',
            tw: 'Mmaa',
            ga: 'Yie',
            ewe: 'nyɔnuwo'
        },
        subcategory: {
            en: 'Casual dress',
            tw: 'efie ataaadeɛ',
            ga: 'efie atale',
            ewe: 'awu si wodona le vome'
        },
        price: 29.99,
        rating: 4.5,
        image: 'https://i.pinimg.com/736x/7c/cb/db/7ccbdb5a00ff80a216fed28716193a4b.jpg',
        tag: {
            en: 'Bestseller',
            twi: 'wɔtɔn sen biara',
            ga: 'Bestseller',
            ewe: 'nu vɔ̃ feɖeƒe',
        },
    },
    {
        id: '48',
        name: {
            en: 'Men Official',
            tw: 'Mmarima  atadeɛ',
            ga: 'Hii ɔfis atale',
            ewe: 'ŋutsuwo ƒe ɔfis'
        },
        category: {
            en: 'Men',
            tw: 'Mmarima',
            ga: 'Hii',
            ewe: 'Ŋutsu'
        },
        subcategory: {
            en: 'Men Official',
            tw: 'Mmarima ɔfese',
            ga: 'Hii ɔfis',
            ewe: 'ŋutsuwo ƒe ɔfis'
        },
        price: 29.99,
        rating: 4.5,
        image: 'https://i.pinimg.com/1200x/af/c6/88/afc688001683a776358194f1bdd1bee3.jpg',
        tag: {
            en: 'Bestseller',
            twi: 'wɔtɔn sen biara',
            ga: 'Bestseller',
            ewe: 'nu vɔ̃ feɖeƒe',
        },
    },
    {
        id: '49',
        name: {
            en: 'Men Winter Suit',
            tw: 'Mmarima awɔw atadeɛ',
            ga: 'Hii ɔfis atale',
            ewe: 'Men Winter Suit'
        },
        category: {
            en: 'Men',
            tw: 'Mmarima',
            ga: 'Hii',
            ewe: 'Ŋutsu'
        },
        subcategory: {
            en: 'Men Official',
            tw: 'Mmarima ɔfese',
            ga: 'Hii ɔfis',
            ewe: 'ŋutsuwo ƒe ɔfis'
        },
        price: 29.99,
        rating: 4.5,
        image: 'https://i.pinimg.com/1200x/3d/81/f3/3d81f3fdedc9a9e9452bad1ca354489c.jpg',
        tag: {
            en: 'Bestseller',
            twi: 'wɔtɔn sen biara',
            ga: 'Bestseller',
            ewe: 'nu vɔ̃ feɖeƒe',
        },
    },
    {
        id: '49',
        name: {
            en: 'Men Winter Suit',
            twi: 'Mmarima awɔw atadeɛ',
            ga: 'Hii abɔmɔ ni atade',
            ewe: 'Tɔgbui xexeme ɖoɖo'
        },

        ////CATEORY FOR MEN ////////////////////////
        category: {
            en: 'Men',
            tw: 'Mmarima',
            ga: 'Hii',
            ewe: 'Ŋutsu'
        },

        ////MEN OFFICIAL///////////
        ///////////////////////////
        subcategory: {
            en: 'Men Official',
            tw: 'Mmarima ɔfese',
            ga: 'Hii ɔfis',
            ewe: 'ŋutsuwo ƒe ɔfis'
        },
        price: 29.99,
        rating: 4.5,
        image: 'https://i.pinimg.com/1200x/3d/81/f3/3d81f3fdedc9a9e9452bad1ca354489c.jpg',

        tag: {
            en: 'Bestseller',
            twi: 'wɔtɔn sen biara',
            ga: 'Bestseller',
            ewe: 'nu vɔ̃ feɖeƒe',
        },
    },
    {
        id: '50',
        name: {
            en: 'Men Winter Suit',
            tw: 'Mmarima Awareɛ Ataaadeɛ',
            ga: 'Hii gbɛjɛ atale',
            ewe: 'Menɔvi ƒuƒu atade',
        },
        category: {
            en: 'Men',
            tw: 'Mmarima',
            ga: 'Hii',
            ewe: 'Ŋutsu'
        },
        subcategory: {
            en: 'Men Official',
            tw: 'Mmarima ɔfese',
            ga: 'Hii ɔfis',
            ewe: 'ŋutsuwo ƒe ɔfis'
        },
        price: 29.99,
        rating: 4.5,
        image: 'https://i.pinimg.com/736x/cc/e5/d7/cce5d7d2f627ce19c5fa4633fca1e607.jpg',
        /////////BEST SELLER////////////////////
        /////////////////////////////////
        tag: {
            en: 'Bestseller',
            tw: 'wɔtɔn sen biara',
            ga: 'Bestseller',
            ewe: 'nu vɔ̃ feɖeƒe',
        },
    },

    {
        id: '51',
        name: {
            en: 'Men Winter Suit',
            tw: 'Mmarima Awɔw Ataaadeɛ',  // updated "Winter" to "Awɔw"
            ga: 'Hii gbɛjɛ atale',
            ewe: 'Menɔvi ƒuƒu atade',
        },
        category: {
            en: 'Men',
            tw: 'Mmarima',
            ga: 'Hii',
            ewe: 'Ŋutsu'
        },
        subcategory: {
            en: 'Men Official',
            tw: 'Mmarima ɔfese',
            ga: 'Hii ɔfis',
            ewe: 'ŋutsuwo ƒe ɔfis'
        },
        price: 29.99,
        rating: 4.5,
        image: 'https://i.pinimg.com/1200x/ec/21/51/ec21511c92fd6ed8a1e1018c6e3aa83f.jpg',
        tag: {
            en: 'Bestseller',
            tw: 'wɔtɔn sen biara',
            ga: 'Bestseller',
            ewe: 'nu vɔ̃ feɖeƒe',
        },
    },
    {
        id: '52',
        name: {
            en: 'Men Winter Suit',
            tw: 'Mmarima Awɔw Ataaadeɛ',
            ga: 'Hii gbɛjɛ atale',
            ewe: 'Menɔvi ƒuƒu atade',
        },
        category: 'Men',
        subcategory: 'Men Official',
        price: 29.99,
        rating: 4.5,
        image: 'https://i.pinimg.com/736x/37/94/d1/3794d1feb9cb2e45b0d454a07a6ab194.jpg',
        tag: {
            en: 'Bestseller',
            tw: 'Wɔtɔn sen biara',
            ga: 'Bestseller',
            ewe: 'nu vɔ̃ feɖeƒe',
        },
    }






];


export default PRODUCTS;
