import UseData from "@/hooks/useData";

// initialize local storage:
if(!localStorage.getItem('currentLife')){
    localStorage.setItem('currentLife', UseData().DEFAULT_LIFE.toString());
}
if(!localStorage.getItem('latestIncreaseLifeTime')){
    localStorage.setItem('latestIncreaseLifeTime', new Date().getTime().toString())
}

export default function increaseLife(){
    setInterval(()=>{
        const currentTime = new Date().getTime();
        const latestIncreaseLifeTime = parseInt(localStorage.getItem('latestIncreaseLifeTime') || '0');
        const diff = currentTime - latestIncreaseLifeTime;
        if(diff >= UseData().DEFAULT_LIFE_INCREASE_INTERVAL){
            const increaseLifeCount = Math.trunc(diff / UseData().DEFAULT_LIFE_INCREASE_INTERVAL);
            let currentLife = parseInt(localStorage.getItem('currentLife') || '0');
            currentLife += increaseLifeCount;
            if(currentLife > UseData().DEFAULT_LIFE){
                currentLife = UseData().DEFAULT_LIFE;
            }
            localStorage.setItem('currentLife', currentLife.toString());
            localStorage.setItem('latestIncreaseLifeTime', (currentTime-(diff%UseData().DEFAULT_LIFE_INCREASE_INTERVAL)).toString());
        }
    }, 10000);
}