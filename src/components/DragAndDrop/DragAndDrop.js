import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';

import "./DragAndDrop.css";

const itemsFromBackend = []

const columnsFromBackend = {
    todo: {
        name: "Todo",
        items: itemsFromBackend
    },
    inProgress: {
        name: "In Progress",
        items: []
    },
    done: {
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

export const DragAndDrop = ({features, projectName, changeFeatureProgress}) => {

    const [featuresList, setFeaturesList] = useState([]);
    const [columns, setColumns] = useState(columnsFromBackend);

    useEffect(() => {
        if (features !== undefined) {
            if (featuresList.length === 0 && features.length !== 0) {

                const todoList = [];
                const inProgressList = [];
                const doneList = [];
                features.map(feature => {
                    if (feature.progress === "Todo") {
                        todoList.push({id: uuidv4(), content: feature.feature});
                        setFeaturesList(prevArray => [...prevArray, {feature: feature.feature, progress: 'Todo'}])
                    } else if (feature.progress === "inProgress") {
                        inProgressList.push({id: uuidv4(), content: feature.feature});
                        setFeaturesList(prevArray => [...prevArray, {feature: feature.feature, progress: 'inProgress'}])
                    } else if (feature.progress === "done") {
                        doneList.push({id: uuidv4(), content: feature.feature});
                        setFeaturesList(prevArray => [...prevArray, {feature: feature.feature, progress: 'done'}]);
                    }
                })
                setColumns({
                    todo: {
                        name: "Todo",
                        items: todoList
                    },
                    inProgress: {
                        name: "In Progress",
                        items: inProgressList
                    },
                    done: {
                        name: "Done",
                        items: doneList
                    }
                }) 
            } else if (featuresList.length !== features.length) {
                setFeaturesList([])

                const todoList = [];
                const inProgressList = [];
                const doneList = [];
                features.map(feature => {
                    if (feature.progress === "Todo") {
                        todoList.push({id: uuidv4(), content: feature.feature});
                        setFeaturesList(prevArray => [...prevArray, {feature: feature.feature, progress: 'Todo'}])
                    } else if (feature.progress === "inProgress") {
                        inProgressList.push({id: uuidv4(), content: feature.feature});
                        setFeaturesList(prevArray => [...prevArray, {feature: feature.feature, progress: 'inProgress'}])
                    } else if (feature.progress === "done") {
                        doneList.push({id: uuidv4(), content: feature.feature});
                        setFeaturesList(prevArray => [...prevArray, {feature: feature.feature, progress: 'done'}]);
                    }
                })
                setColumns({
                    todo: {
                        name: "Todo",
                        items: todoList
                    },
                    inProgress: {
                        name: "In Progress",
                        items: inProgressList
                    },
                    done: {
                        name: "Done",
                        items: doneList
                    }
                }) 
            } else {
                setFeaturesList([])
                features.map(feature => {
                    if (feature.progress === "Todo") {
                        setFeaturesList(prevArray => [...prevArray, {feature: feature.feature, progress: 'Todo'}])
                    } else if (feature.progress === "inProgress") {
                        setFeaturesList(prevArray => [...prevArray, {feature: feature.feature, progress: 'inProgress'}])
                    } else if (feature.progress === "done") {
                        setFeaturesList(prevArray => [...prevArray, {feature: feature.feature, progress: 'done'}]);
                    }
                })
            }
        }
    }, [features]);

    useEffect(() => {
        const newList = [];
        columns.todo.items.map(feature => {
            newList.push({feature: feature.content, progress: "Todo"})
        });
        columns.inProgress.items.map(feature => {
            newList.push({feature: feature.content, progress: "inProgress"})
        });
        columns.done.items.map(feature => {
            newList.push({feature: feature.content, progress: "done"})
        });
        changeFeatureProgress(newList, projectName);
    }, [columns])

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