import Car from "./CarClass.js"

const API_URL = `https://project-yarin.herokuapp.com/cars?perPage=99`
const select=document.querySelector('#id_select')
const categories=[]//משתנה גלובלילקוטגוריות מתוך הג'ייסון

let cars=[]


const init =()=>{
    doApi()//קריאה לפונקציייה שעושה בקשת איי פיי איי
}
const declareEvents=()=>{
    carsFilter()
}
//בקשת api
const doApi = async() => {
    //response
    const resp = await fetch(API_URL);
    // console.log(resp);

    //data to json
    const data = await resp.json();
    //פונקציה המייצרת קטוגוריות וסלסקט אינפוט בכדי שנוכל לפלט את הסוגי מכוניות 
    createCategories(data)
    // console.log(data);
    createCars(data)
    cars=data;
}


const createCars = (_arr) => {
    document.querySelector('#parent').innerHTML=""
    // for (let i = 0; i < _arr.length; i++) {
    //     const car = new Car('#parent', _arr[i].company, _arr[i].model, _arr[i].year, _arr[i].price, _arr[i].img_url, _arr[i].category);

    //     car.render()
    // }
    //רץ על מערך המכוניות שייתקבל מהבקשה
    _arr.forEach(item => {
        //מייצר לכל אחד מפריטים של מערך אובייקט מכונית
        const car = new Car('#parent', item);
        car.render()//קורא לשיטה רנדר לפעול ולהציג לי כל מכונית על המסך 
    });

}

//פוקציה המייצרת סלקט אינפוט 
const createCategories = (_arr) => {
    categories.push("All");

    _arr.forEach(item => {
        if (!categories.includes(item.category))
            categories.push(item.category)
    });

    console.log(categories)

    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.innerHTML = cat;
        select.append(opt)
    });
}
 //פונקציה המקסלתצ קטגוריה ומפלטרת בהתאם את המערך לאחר מכן מרנדרת למסך את המערך המפולטר בהתאם 
const carsFilltering=(_category)=>{
    let filterd=[];
    if(_category!='ALL'&& _category!=""){
    //פילטר פונקציה מובנת בגאווה סקריפט שמפלטרת מערך לפי תנאי ומחזריה מערך חדש
        filterd=cars.filter(car=>car.category==_category)
    }
    else{
        filterd=cars
    }
    //קריאה לפונקציה שמרנדרת למסך את המכוניות  
    createCars(filterd)
    console.log(filterd);
}
//פונקציה שמבצעת אירוע אונצ'יינג עבור בחירת קטוגריה בסלקט בעזרת שינוי
const carsFilter=()=>{
    //באירוע זה אני מעביר את האוונט בםונקצית קולבק
    select.addEventListener('change',(e)=>{
        // console.log(e.target.value);
        //תפסנו את הערך של האופשן של הסלקט
        const category=e.target.value;
        //קריאה לפונקציה שמפלטרת את המערך של המכוניות בעזרת הקטגוריה שנבחרה
        carsFilltering(category)
    })
}




declareEvents()
init()