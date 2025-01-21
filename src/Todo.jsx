import React, { useState } from "react";

function Todo () {
    const [lists,setLists]= useState([]); //for array containig all the item
    const [items,setItems]= useState(""); //for current item
    const handelInputChnage = (e)=> {
        setItems(e.target.value)

    }
    function addItem(){
        const newValue = document.getElementById("enterList").value;
        document.getElementById("enterList").value = " ";
        setItems("");
        setLists([...lists , newValue])
            
    }
    function handleDelete(index){
        setLists(prevList => prevList.filter((_, i) => i !== index));
    }
    function handelUp(index){
        
        if (index > 0) {
            const newList = [...lists];
            // Swap the element with the one above it
            [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
            setLists(newList); // Update the state with the new list
          }
        
    }
    function handelDown(index){
        
        if (index !== lists.length - 1){
            const newList = [...lists];
            // Swap the element with the one above it
            [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
            setLists(newList); // Update the state with the new list
        }
            
          
        
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {  // Check if the key pressed is 'Enter'
            addItem();   // Trigger button click action
        }
      };

    
    return(
        <div className="wrap">
            <h2> TO DO LIST</h2>
            <input id="enterList" type=" text" placeholder=" Enter your list.." value={items} onChange={handelInputChnage}  onKeyDown={handleKeyDown}  />
            <button onClick={addItem}>Add</button>
            <ul>
                {lists.map((list , index) =>
                  <li key={index}>
                          <div className="item1">
                               <div className="itemdiv">{list} &nbsp;</div> 
                            
                             <div className="btns">
                                  <button id="upbtn" onClick={() => handleDelete(index)}>Delete</button>
                                  <button id="upbtn" onClick={() =>handelUp(index)}>↑</button>
                                  <button id="upbtn" onClick={() =>handelDown(index)} > ↓ </button>
                              </div>
                            
                          </div>
                 </li>)
                }
            </ul>
        </div>

    );
}
export default Todo