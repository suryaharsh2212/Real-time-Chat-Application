const Images=["https://cdn-icons-png.flaticon.com/128/2202/2202112.png",
"https://cdn-icons-png.flaticon.com/128/15735/15735316.png",
"https://cdn-icons-png.flaticon.com/128/16157/16157826.png",
"https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
"https://cdn-icons-png.flaticon.com/128/16673/16673539.png",
"https://cdn-icons-png.flaticon.com/128/16673/16673574.png",
"https://cdn-icons-png.flaticon.com/128/15537/15537922.png",
"https://cdn-icons-png.flaticon.com/128/3006/3006899.png",
"https://cdn-icons-png.flaticon.com/128/15537/15537896.png",
"https://cdn-icons-png.flaticon.com/128/15537/15537920.png",
]

const UserandomImages = () => {
    return Images[Math.floor(Math.random() * 10)] ;
}

export {UserandomImages}
