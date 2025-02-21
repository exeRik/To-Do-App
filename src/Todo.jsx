import React, { useState, useEffect } from "react";

function Todo() {
  // Load tasks from local storage if available
  const savedLists = JSON.parse(localStorage.getItem("tasks")) || [];

  const [lists, setLists] = useState(savedLists); // Array containing all items
  const [items, setItems] = useState(""); // Current item input

  const handleInputChange = (e) => {
    setItems(e.target.value);
  };

  function addItem() {
    const newValue = document.getElementById("enterList").value.trim();
    if (newValue !== "") {
      setLists((prevLists) => {
        const updatedLists = [...prevLists, { text: newValue, isTicked: false }];
        // Save updated tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(updatedLists));
        return updatedLists;
      });
      setItems("");
      document.getElementById("enterList").value = "";
    }
  }

  function handleDelete(index) {
    setLists((prevList) => {
      const updatedLists = prevList.filter((_, i) => i !== index);
      // Save updated tasks to local storage
      localStorage.setItem("tasks", JSON.stringify(updatedLists));
      return updatedLists;
    });
  }

  function handleUp(index) {
    if (index > 0) {
      const newList = [...lists];
      [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
      setLists(newList); // Update the state with the new list
      localStorage.setItem("tasks", JSON.stringify(newList)); // Save to local storage
    }
  }

  function handleDown(index) {
    if (index < lists.length - 1) {
      const newList = [...lists];
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
      setLists(newList); // Update the state with the new list
      localStorage.setItem("tasks", JSON.stringify(newList)); // Save to local storage
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
    // Save to local storage after ticking an item
    localStorage.setItem("tasks", JSON.stringify(lists));
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
