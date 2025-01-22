import React, { useState } from "react";

function Todo() {
  const [lists, setLists] = useState([]); // Array containing all items
  const [items, setItems] = useState(""); // Current item input

  const handleInputChange = (e) => {
    setItems(e.target.value);
  };

  function addItem() {
    const newValue = document.getElementById("enterList").value.trim();
    if (newValue !== "") {
      setLists([...lists, { text: newValue, isTicked: false }]); // Add as object
      setItems("");
      document.getElementById("enterList").value = "";
    }
  }

  function handleDelete(index) {
    setLists((prevList) => prevList.filter((_, i) => i !== index));
  }

  function handleUp(index) {
    if (index > 0) {
      const newList = [...lists];
      [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
      setLists(newList); // Update the state with the new list
    }
  }

  function handleDown(index) {
    if (index < lists.length - 1) {
      const newList = [...lists];
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
      setLists(newList); // Update the state with the new list
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const handleTickedItem = (index) => {
    setLists((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, isTicked: !item.isTicked } : item
      )
    );
  };

  return (
    <div className="wrap">
      <h2>TO DO LIST</h2>
      <input
        id="enterList"
        type="text"
        placeholder="Enter your list..."
        value={items}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {lists.map((list, index) => (
          <li key={index}>
            <div className="item1">
              <input
                type="checkbox"
                checked={list.isTicked}
                onChange={() => handleTickedItem(index)}
                style={{ marginRight: "10px" }}
              />
              <div
                className="itemdiv"
                style={{
                  textDecoration: list.isTicked ? "line-through" : "none",
                }}
              >
                {list.text}
              </div>
              <div className="btns">
                <button id="upbtn" onClick={() => handleDelete(index)}>
                  Delete
                </button>
                <button id="upbtn" onClick={() => handleUp(index)}>↑</button>
                <button id="upbtn" onClick={() => handleDown(index)}>↓</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
