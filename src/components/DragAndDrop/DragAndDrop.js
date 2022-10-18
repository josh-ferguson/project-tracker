import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';

import "./DragAndDrop.css";

const itemsFromBackend = [
    {id: uuidv4(), content: "first task"},
    {id: uuidv4(), content: "second task"},
    {id: uuidv4(), content: "third task"},
    {id: uuidv4(), content: "fourth task"},
    {id: uuidv4(), content: "fith task"},
    {id: uuidv4(), content: "sixth task sixth task sixth task sixth task sixth task sixth task sixth task"},
    {id: uuidv4(), content: "eith task"},
]

const columnsFromBackend = {
    [uuidv4()]: {
        name: "Todo",
        items: itemsFromBackend
    },
    [uuidv4()]: {
        name: "In Progress",
        items: []
    },
    [uuidv4()]: {
        name: "Done",
        items: []
    }
}

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

export const DragAndDrop = () => {
    
    const [columns, setColumns] = useState(columnsFromBackend);

    return (
        <div className="DragDropContainer">
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return(
                        <div
                            className="columnsContainer"
                        >
                            <h2>{column.name}</h2>
                            <div style={{ margin: 8 }}>
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                className="columnSelector"
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver
                                                    ? "lightblue"
                                                    : "lightgrey"
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        className="featureBox"
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: "none",
                                                                            backgroundColor: snapshot.isDragging
                                                                                ? "#263B4A"
                                                                                : "#456C86",
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        {item.content}
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    )
                })}
            </DragDropContext>
        </div>
    );
}