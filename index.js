const inputs=document.querySelectorAll('input');
const buttn=document.querySelector('#buttn');
const list=document.querySelectorAll('ul');
const colmn=document.getElementById('col2');
const list1=document.getElementById('t1');
const list2=document.getElementById('t2');
const list3=document.getElementById('t3');
buttn.addEventListener('click', (e)=>{
    e.preventDefault();
    const price=document.getElementById('price').value;
    const dish=document.getElementById('dish').value;
    const table=document.getElementById('table').value;
    let obj={
        price, dish, table
    }
    axios.post("https://crudcrud.com/api/08f4a7bef0474ec2ba55f7183750f61b/menu", obj)
    .then((res)=>{
        axios.get(`https://crudcrud.com/api/08f4a7bef0474ec2ba55f7183750f61b/menu`)
        .then((r)=>{
            display(r.data[r.data.length-1]);
        }).catch((err)=>{console.log(err)})
    }).catch((er)=>{console.log(er)})
})
window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("https://crudcrud.com/api/08f4a7bef0474ec2ba55f7183750f61b/menu")
    .then((res)=>{
        for(let i=0;i<res.data.length;i++){
            display(res.data[i]);
        }
    }).catch((err)=>{console.log(err)})
})
function display(obj){
    const li=document.createElement("li");
    li.id=obj._id;
    li.textContent=obj.price+" - "+obj.dish+" - "+obj.table+" - ";
    let del=document.createElement("button");
    del.textContent="Delete";
    del.className="btn btn-danger btn-sm";
    li.appendChild(del);
    if(obj.table=='table 1')
    list1.appendChild(li);
    else if(obj.table=='table 2')
    list2.appendChild(li);
    else list3.appendChild(li);
}
colmn.addEventListener('click', (e)=>{
    e.preventDefault();
    var li=e.target.parentElement;
    var temp=li.textContent.split(" - ");
    axios.delete(`https://crudcrud.com/api/08f4a7bef0474ec2ba55f7183750f61b/menu/${li.id}`)
    .then((res)=>{
        if(temp[2]=='table 1')
        list1.removeChild(li);
        else if(temp[2]=='table 2')
        list2.removeChild(li);
        else list3.removeChild(li);
    })
}
)
