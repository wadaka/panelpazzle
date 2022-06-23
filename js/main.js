//厳格モード（エラーを見つけやすくなる)
'use strict';
//全部の文章を読み終わったら〇〇してください的なやつ。
document.addEventListener("DOMContentLoaded",()=>{
    const size=4;
    const difficulty=1000;
    const shuffleCount= size*difficulty;
    const table = document.getElementById("table");
    const msgBox = document.getElementById("msgBox");
    const startBr = document.getElementById("startBt");
    let panels;//td要素を格納するへーれつ
    let emptyIdx;//現在の空のindexを保持
    //初期化処理
    const init=()=>{
        panels=[];
        table.textContent=null;
        msgBox.textContent=null;
        createStage();
    };
    const createStage=()=>{
        for(let i=0;i<size;i++){
            const tr= document.createElement("tr");
            for(let j=0;j<size;j++){
                const td = document.createElement("td");
                td.posId = i*size + j;
                td.textContent = td.posId+1;
                if(td.posId === size*size-1){
                    td.textContent="";
                    td.classList.add("empty");
                    emptyIdx=td.posId;
                }
                panels.push(td);
                tr.append(td); 
                td.onclick=click;
            }
            table.append(tr);
        }  
    };

    startBt.addEventListener("click",()=>{
        init();
        for(let i=0;i<shuffleCount;i++){
            const dir=Math.floor(Math.random()*4);//0が↑、1が→、2が↓、3が←
            switch(dir){
                case 0:
                    if(emptyIdx < size) continue;
                    swap(emptyIdx-size,emptyIdx);
                    emptyIdx-=size;
                    break;
                case 1:
                    if((emptyIdx+1)% size === 0) continue;
                    swap(emptyIdx+1,emptyIdx);
                    emptyIdx++;
                    break;
                case 2:
                    if(emptyIdx >= size*(size-1)) continue;
                    swap(emptyIdx+size,emptyIdx);
                    emptyIdx+=size;
                    break;
                case 3:
                    if(emptyIdx % size === 0) continue;
                    swap(emptyIdx-1,emptyIdx);
                    emptyIdx--;
                    break;
            }
        }
        check();
    });

    const swap=(numPos,empPos)=>{
        panels[empPos].textContent=panels[numPos].textContent;
        panels[empPos].classList.remove("empty");
        panels[numPos].textContent="";
        panels[numPos].classList.add("empty");
    }

    const click=(e)=>{
        const pos=e.target.posId;
        if (pos >= size && panels[pos-size].textContent === ""){
            swap(pos,pos-size);
        }else if((pos+1)%size !==0 && panels[pos+1].textContent === ""){
            swap(pos,pos+1);
        }else if(pos < size*(size-1) && panels[pos+size].textContent === ""){
            swap(pos,pos+size);
        }else if(pos%size !== 0 && panels[pos-1].textContent === ""){
            swap(pos,pos-1);
        }
        check();
    };

    const check=()=>{
        let okCount=0;
        for(let i=0;i<panels.length;i++){
            if(panels[i].textContent === "") continue;
            if(panels[i].posId === parseInt(panels[i].textContent)-1){
                okCount++;
                panels[i].classList.add("ok");
            }else{
                panels[i].classList.remove("ok");
            }
        }
        if(okCount === size*size-1){
            msgBox.textContent="Complete!"
        }
    }
    init();
});