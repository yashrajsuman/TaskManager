

function addTask(){

    const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const [key, value] = cookies[i].split('=');
            if (key === name) return decodeURIComponent(value);
        }
        return null;
    };

    if(!getCookie("name"))
        window.alert("Please SignIn")
    else{
    let task=prompt("Enter task name")
    if (task === null) {
        alert("You cancelled the prompt.");
        return;
    } else if (task.trim() === "") {
            alert("You didn't enter anything.");
            return;
    }

    if(sessionStorage.getItem("tempTask")===null)
        sessionStorage.setItem("tempTask",[`${task}`].toString());

    else{
    let oldtempt=sessionStorage.getItem("tempTask").split(",")
    oldtempt.push(task);
    sessionStorage.setItem("tempTask",oldtempt.toString());
    }

    updateTempTask();
    updateParmTask();
}
    
}

function updateTempTask(){
    
    let oldtempt=sessionStorage.getItem("tempTask").split(",")
    const tablebody=document.getElementById("taskTableBody");
    tablebody.innerHTML = "";

    for(let i=0;i<oldtempt.length;i++){
        const newRow=document.createElement("tr");
        newRow.innerHTML=`
                <td class="${i+1}">${i+1}</td>
                <td class="${i+1}">${oldtempt[i]}</td>
                <td class="${i+1}" id="${i+1}:time">0 min</td>
                <td class="${i+1}" id="${i+1}:isCompleted">No</td>
                <td class="${i+1}" id="${i+1}" onclick="save(this.id)"><button>Start/Stop</button></td>
        `;
        tablebody.appendChild(newRow);
    }
}

let togg=false;
function save(id){
    const time=document.getElementById(id+":time");
    const isCompleted=document.getElementById(id+":isCompleted");

    if(togg===false){
    time.innerHTML="Counting...."
    isCompleted.innerHTML="Ongoing"
    togg=true
    }

    else{
        time.innerHTML="10 min"
        isCompleted.innerHTML="Yes"
        togg=false
        let tempArr=sessionStorage.getItem("tempTask").split(",")

        if(localStorage.getItem("pTask")===null)
            localStorage.setItem("pTask",[`${tempArr[id-1]}`].toString());

        else{
            let pTask=localStorage.getItem("pTask").split(",")
            pTask.push(tempArr[id-1]);
            localStorage.setItem("pTask",pTask.toString());            
        }
        tempArr.splice(id-1,1);


        if(!tempArr.length==0){
            sessionStorage.setItem("tempTask",tempArr.toString());
            updateTempTask(); 
        }
        else{
            sessionStorage.removeItem("tempTask");
            const tablebody=document.getElementById("taskTableBody");
            tablebody.innerHTML = "";
        }
           
        updateParmTask();
    }
}

function updateParmTask(){
    
    let pramTask=localStorage.getItem("pTask").split(",")
    const tablebody=document.getElementById("taskTableBody");
    let len=sessionStorage.getItem("tempTask")===null?0:sessionStorage.getItem("tempTask").split(",").length;

    for(let i=0;i<pramTask.length;i++){
        const newRow=document.createElement("tr");
        newRow.innerHTML=`
                <td class="${i+1}">${i+1+len}</td>
                <td class="${i+1}">${pramTask[i]}</td>
                <td class="${i+1}" >10 min</td>
                <td class="${i+1}" >Yes</td>
                <td class="${i+1}" ><button>Done</button></td>
        `;
        tablebody.appendChild(newRow);
    }
}

function login() {
     const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const [key, value] = cookies[i].split('=');
            if (key === name) return decodeURIComponent(value);
        }
        return null;
    };
   
    let name = getCookie("name");
    
    if (!name) {
        name = prompt("Enter your name");
        if (!name) return;
        document.cookie = `name=${name}; path=/; max-age=${60*60*24*7}`;
    }

    const signin = document.getElementById("signin");
    if (signin) {
        signin.textContent = "Hi " + name+"!";
        signin.style.color = 'aqua';
    }
}

window.onload=function(){
     const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const [key, value] = cookies[i].split('=');
            if (key === name) return decodeURIComponent(value);
        }
        return null;
    };  
    let name = getCookie("name");
    if (name) {
        login();
    }

    if(sessionStorage.getItem("tempTask")!=null)
        updateTempTask();
    if(localStorage.getItem("pTask")!=null)
        updateParmTask();
}